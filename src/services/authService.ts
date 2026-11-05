import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';

export interface UserProfile {
  uid: string;
  username: string;
  usernameLower: string;
  createdAt: string;
  lastLoginAt?: string;
  streak: number;
  lastActiveDate: string;
  lastVisited?: string;
  photoURL?: string;
}

// Convert username to hidden internal email format
export function usernameToEmail(username: string): string {
  const cleaned = username.trim().toLowerCase();
  return `${cleaned}@ctracker.local`;
}

const LOCAL_USERS_KEY = 'c_tracker_local_users';
const LOCAL_SESSION_KEY = 'c_tracker_active_session';

interface LocalUserRecord {
  uid: string;
  username: string;
  usernameLower: string;
  passwordHash: string;
  createdAt: string;
  lastLoginAt?: string;
  streak: number;
  lastActiveDate: string;
}

async function hashPassword(pass: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(pass + '_c_tracker_salt_v1');
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    // Basic fallback if subtle crypto is somehow not supported
    return btoa(pass);
  }
}

function getLocalUsers(): Record<string, LocalUserRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUsers(map: Record<string, LocalUserRecord>): void {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(map));
  } catch {}
}

// Rate limiting state: failed attempts per username stored in localStorage
const LOCKOUT_KEY = 'c_tracker_auth_lockouts';

interface LockoutData {
  attempts: number;
  lockedUntil: number; // timestamp in ms
}

function getLockoutMap(): Record<string, LockoutData> {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLockoutMap(map: Record<string, LockoutData>): void {
  try {
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export const authService = {
  // Validate username rules
  validateUsername(username: string): { valid: boolean; error?: string } {
    if (!username) {
      return { valid: false, error: 'Username is required' };
    }
    if (username.length < 4 || username.length > 20) {
      return { valid: false, error: 'Username must be 4 to 20 characters' };
    }
    if (!/^[a-zA-Z]/.test(username)) {
      return { valid: false, error: 'Username must start with a letter' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { valid: false, error: 'Only letters, numbers, and underscores allowed' };
    }
    return { valid: true };
  },

  // Validate password rules
  validatePassword(password: string, username?: string): {
    valid: boolean;
    hasLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    noSpaces: boolean;
    notUsername: boolean;
    error?: string;
  } {
    const hasLength = password.length >= 8 && password.length <= 64;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);
    const notUsername = !username || password.toLowerCase() !== username.toLowerCase();

    const valid = hasLength && hasLetter && hasNumber && noSpaces && notUsername;
    let error: string | undefined;

    if (!hasLength) {
      error = 'Password must be 8 to 64 characters';
    } else if (!hasLetter) {
      error = 'Password must contain at least 1 letter';
    } else if (!hasNumber) {
      error = 'Password must contain at least 1 number';
    } else if (!noSpaces) {
      error = 'Password must not contain spaces';
    } else if (!notUsername) {
      error = 'Password must not equal username';
    }

    return {
      valid,
      hasLength,
      hasLetter,
      hasNumber,
      noSpaces,
      notUsername,
      error,
    };
  },

  // Check if username is already taken via local storage or Firestore /usernames/{usernameLower}
  async isUsernameTaken(username: string): Promise<boolean> {
    const val = this.validateUsername(username);
    if (!val.valid) return false;
    const usernameLower = username.trim().toLowerCase();

    // Check local users
    const localUsers = getLocalUsers();
    if (localUsers[usernameLower]) {
      return true;
    }

    try {
      const snap = await getDoc(doc(db, 'usernames', usernameLower));
      return snap.exists();
    } catch (e) {
      // In case rules block or offline, assume available or handle error
      console.warn('Error checking username availability:', e);
      return false;
    }
  },

  // Check remaining lockout seconds for a given username
  getRemainingLockout(username: string): number {
    const lower = username.trim().toLowerCase();
    const map = getLockoutMap();
    const entry = map[lower];
    if (!entry || !entry.lockedUntil) return 0;
    const diff = Math.ceil((entry.lockedUntil - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  },

  recordFailedLogin(username: string): { locked: boolean; remainingSeconds: number } {
    const lower = username.trim().toLowerCase();
    const map = getLockoutMap();
    const current = map[lower] || { attempts: 0, lockedUntil: 0 };

    current.attempts += 1;
    let remainingSeconds = 0;

    if (current.attempts >= 5) {
      current.lockedUntil = Date.now() + 60 * 1000;
      remainingSeconds = 60;
    }

    map[lower] = current;
    saveLockoutMap(map);

    return {
      locked: current.attempts >= 5,
      remainingSeconds,
    };
  },

  clearFailedLogins(username: string): void {
    const lower = username.trim().toLowerCase();
    const map = getLockoutMap();
    delete map[lower];
    saveLockoutMap(map);
  },

  // SIGNUP with Firebase Email/Password
  async signup(username: string, password: string): Promise<UserProfile> {
    const uVal = this.validateUsername(username);
    if (!uVal.valid) throw new Error(uVal.error);

    const pVal = this.validatePassword(password, username);
    if (!pVal.valid) throw new Error(pVal.error);

    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();

    // Check availability
    const taken = await this.isUsernameTaken(usernameLower);
    if (taken) {
      throw new Error('Username is already taken');
    }

    const email = usernameToEmail(usernameTrimmed);

    try {
      // 1. Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      const now = new Date().toISOString();
      const today = now.split('T')[0];

      const profile: UserProfile = {
        uid,
        username: usernameTrimmed,
        usernameLower,
        createdAt: now,
        lastLoginAt: now,
        streak: 1,
        lastActiveDate: today,
      };

      // 2. Claim username in /usernames
      try {
        await setDoc(doc(db, 'usernames', usernameLower), {
          uid,
          createdAt: now,
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `usernames/${usernameLower}`);
      }

      // 3. Write User Profile in /users/{uid}
      try {
        await setDoc(doc(db, 'users', uid), profile);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
      }

      this.clearFailedLogins(usernameTrimmed);
      return profile;
    } catch (err: any) {
      // Re-throw with code preserved so the UI can detect auth/operation-not-allowed
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        const notAllowedErr: any = new Error('Firebase: Error (auth/operation-not-allowed)');
        notAllowedErr.code = 'auth/operation-not-allowed';
        throw notAllowedErr;
      }
      throw err;
    }
  },

  // SIGNUP Local / Instant Fallback
  async signupLocal(username: string, password: string): Promise<UserProfile> {
    const uVal = this.validateUsername(username);
    if (!uVal.valid) throw new Error(uVal.error);

    const pVal = this.validatePassword(password, username);
    if (!pVal.valid) throw new Error(pVal.error);

    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();

    const localUsers = getLocalUsers();
    if (localUsers[usernameLower]) {
      throw new Error('Username is already taken');
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const today = now.split('T')[0];
    const uid = `local_${usernameLower}`;

    const profile: UserProfile = {
      uid,
      username: usernameTrimmed,
      usernameLower,
      createdAt: now,
      lastLoginAt: now,
      streak: 1,
      lastActiveDate: today,
    };

    localUsers[usernameLower] = {
      ...profile,
      passwordHash,
    };
    saveLocalUsers(localUsers);

    this.saveLocalSession(profile);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  // LOGIN Local
  async loginLocal(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();
    const localUsers = getLocalUsers();
    const user = localUsers[usernameLower];

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }

    const now = new Date().toISOString();
    user.lastLoginAt = now;
    localUsers[usernameLower] = user;
    saveLocalUsers(localUsers);

    const profile: UserProfile = {
      uid: user.uid,
      username: user.username,
      usernameLower: user.usernameLower,
      createdAt: user.createdAt,
      lastLoginAt: now,
      streak: user.streak,
      lastActiveDate: user.lastActiveDate,
    };

    this.saveLocalSession(profile);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  // LOGIN (Tries Firebase first, then fallback to local)
  async login(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const remaining = this.getRemainingLockout(usernameTrimmed);
    if (remaining > 0) {
      throw new Error(`Too many failed attempts. Account locked for ${remaining}s.`);
    }

    // Check if local account exists first
    const localUsers = getLocalUsers();
    const usernameLower = usernameTrimmed.toLowerCase();
    if (localUsers[usernameLower]) {
      return this.loginLocal(username, password);
    }

    const email = usernameToEmail(usernameTrimmed);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Fetch user profile
      const userDoc = await getDoc(doc(db, 'users', uid));
      let profile: UserProfile;

      const now = new Date().toISOString();
      const today = now.split('T')[0];

      if (userDoc.exists()) {
        profile = userDoc.data() as UserProfile;
        try {
          await updateDoc(doc(db, 'users', uid), {
            lastLoginAt: now,
          });
        } catch {
          // non-fatal
        }
      } else {
        profile = {
          uid,
          username: usernameTrimmed,
          usernameLower: usernameTrimmed.toLowerCase(),
          createdAt: now,
          lastLoginAt: now,
          streak: 1,
          lastActiveDate: today,
        };
        await setDoc(doc(db, 'users', uid), profile);
      }

      this.clearFailedLogins(usernameTrimmed);
      return profile;
    } catch (err: any) {
      // If operation is not allowed, check local user fallback or re-throw
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        const notAllowedErr: any = new Error('Firebase: Error (auth/operation-not-allowed)');
        notAllowedErr.code = 'auth/operation-not-allowed';
        throw notAllowedErr;
      }

      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }
  },

  // GOOGLE SIGN IN
  async loginWithGoogle(): Promise<UserProfile> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const uid = user.uid;

    const userDoc = await getDoc(doc(db, 'users', uid));
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    if (userDoc.exists()) {
      const profile = userDoc.data() as UserProfile;
      try {
        await updateDoc(doc(db, 'users', uid), { lastLoginAt: now });
      } catch {}
      this.clearLocalSession();
      return profile;
    }

    // Generate safe username
    let base = (user.displayName || user.email?.split('@')[0] || 'c_developer')
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .slice(0, 15);
    if (base.length < 4) base = `${base}_dev`;
    if (!/^[a-z]/.test(base)) base = `u_${base}`;

    let candidate = base;
    let count = 1;
    while (await this.isUsernameTaken(candidate)) {
      candidate = `${base.slice(0, 13)}_${count}`;
      count++;
    }

    const profile: UserProfile = {
      uid,
      username: candidate,
      usernameLower: candidate.toLowerCase(),
      createdAt: now,
      lastLoginAt: now,
      streak: 1,
      lastActiveDate: today,
      photoURL: user.photoURL || undefined,
    };

    try {
      await setDoc(doc(db, 'usernames', candidate.toLowerCase()), {
        uid,
        createdAt: now,
      });
    } catch (err) {
      console.warn('Could not write username mapping:', err);
    }

    try {
      await setDoc(doc(db, 'users', uid), profile);
    } catch (err) {
      console.warn('Could not write user profile:', err);
    }

    this.clearLocalSession();
    return profile;
  },

  // Local Session Management
  saveLocalSession(profile: UserProfile): void {
    try {
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
    } catch {}
  },

  getLocalSession(): UserProfile | null {
    try {
      const raw = localStorage.getItem(LOCAL_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearLocalSession(): void {
    try {
      localStorage.removeItem(LOCAL_SESSION_KEY);
    } catch {}
  },

  // LOGOUT
  async logout(): Promise<void> {
    this.clearLocalSession();
    await signOut(auth);
  },

  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const user = auth.currentUser;
    if (user) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          return snap.data() as UserProfile;
        }
      } catch (e) {
        console.warn('Could not load user profile from Firestore:', e);
      }
    }

    // Check local session
    return this.getLocalSession();
  },

  // Auth state observer
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
