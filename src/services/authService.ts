import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

    const snap = await getDoc(doc(db, 'usernames', usernameLower));
    return snap.exists();
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
    if (current.lockedUntil > 0 && current.lockedUntil <= Date.now()) {
      current.attempts = 0;
      current.lockedUntil = 0;
    }

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
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        return this.signupLocal(usernameTrimmed, password);
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

    await signOut(auth);
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
    const remaining = this.getRemainingLockout(usernameTrimmed);
    if (remaining > 0) {
      throw new Error(`Too many failed attempts. Account locked for ${remaining}s.`);
    }

    const usernameLower = usernameTrimmed.toLowerCase();
    const localUsers = getLocalUsers();
    const user = localUsers[usernameLower];

    if (!user) {
      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }

    await signOut(auth);
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

  // LOGIN (Uses a local account when one exists, otherwise Firebase)
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

    let uid: string;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      uid = cred.user.uid;
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        return this.loginLocal(usernameTrimmed, password);
      }

      if (err?.code === 'auth/network-request-failed') {
        throw new Error('Unable to connect. Check your internet connection and try again.');
      }

      if (err?.code === 'auth/too-many-requests') {
        throw new Error('Too many sign-in attempts. Please wait and try again.');
      }

      if (
        err?.code === 'auth/user-not-found' ||
        err?.code === 'auth/wrong-password' ||
        err?.code === 'auth/invalid-credential' ||
        err?.code === 'auth/invalid-email'
      ) {
        this.recordFailedLogin(usernameTrimmed);
        throw new Error('Invalid username or password');
      }

      throw new Error('Unable to sign in right now. Please try again.');
    }

    const userDoc = await getDoc(doc(db, 'users', uid));
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    let profile: UserProfile;
    if (userDoc.exists()) {
      profile = userDoc.data() as UserProfile;
      try {
        await updateDoc(doc(db, 'users', uid), { lastLoginAt: now });
      } catch {
        // Profile metadata updates are non-critical to sign-in.
      }
    } else {
      profile = {
        uid,
        username: usernameTrimmed,
        usernameLower,
        createdAt: now,
        lastLoginAt: now,
        streak: 1,
        lastActiveDate: today,
      };
      await setDoc(doc(db, 'users', uid), profile);
    }

    this.clearFailedLogins(usernameTrimmed);
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
