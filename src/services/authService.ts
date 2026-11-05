import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from './supabase';

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

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const LOCAL_USERS_KEY = 'c_tracker_local_users';
const LOCAL_SESSION_KEY = 'c_tracker_active_session';
const LOCKOUT_KEY = 'c_tracker_auth_lockouts';

interface LocalUserRecord extends UserProfile {
  passwordHash: string;
}

interface LockoutData {
  attempts: number;
  lockedUntil: number;
}

function getLocalUsers(): Record<string, LocalUserRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUsers(users: Record<string, LocalUserRecord>): void {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getLockoutMap(): Record<string, LockoutData> {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLockoutMap(lockouts: Record<string, LockoutData>): void {
  localStorage.setItem(LOCKOUT_KEY, JSON.stringify(lockouts));
}

async function hashPassword(password: string): Promise<string> {
  const input = new TextEncoder().encode(`${password}_c_tracker_salt_v1`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function toAuthUser(profile: UserProfile): AuthUser {
  return {
    uid: profile.uid,
    email: `${profile.usernameLower}@ctracker.local`,
    displayName: profile.username,
    user_metadata: { username: profile.username },
  } as AuthUser;
}

function toAuthUserFromSupabase(user: SupabaseUser): AuthUser {
  return {
    uid: user.id,
    email: user.email ?? null,
    displayName: user.user_metadata.username ?? null,
  };
}

function normalizeProfile(profile: Record<string, unknown>, uid: string): UserProfile {
  const username = String(profile.username ?? '');
  return {
    uid,
    username,
    usernameLower: String(profile.username_lower ?? username.toLowerCase()),
    createdAt: String(profile.created_at ?? new Date().toISOString()),
    lastLoginAt: profile.last_login_at ? String(profile.last_login_at) : undefined,
    streak: Number(profile.streak ?? 1),
    lastActiveDate: String(profile.last_active_date ?? new Date().toISOString().slice(0, 10)),
    lastVisited: profile.last_visited ? String(profile.last_visited) : undefined,
  };
}

function getLocalProfile(username: string): LocalUserRecord | undefined {
  return getLocalUsers()[username.trim().toLowerCase()];
}

async function getProfile(uid: string): Promise<UserProfile> {
  if (!supabase) throw new Error('Cloud accounts are not configured.');

  const { data, error } = await supabase
    .from('profiles')
    .select('username, username_lower, created_at, last_login_at, streak, last_active_date, last_visited')
    .eq('id', uid)
    .single();

  if (error) throw new Error(`Could not load account profile: ${error.message}`);
  return normalizeProfile(data, uid);
}

function getSessionProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSessionProfile(profile: UserProfile): void {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
}

export const authService = {
  validateUsername(username: string): { valid: boolean; error?: string } {
    if (!username) return { valid: false, error: 'Username is required' };
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
    if (!hasLength) error = 'Password must be 8 to 64 characters';
    else if (!hasLetter) error = 'Password must contain at least 1 letter';
    else if (!hasNumber) error = 'Password must contain at least 1 number';
    else if (!noSpaces) error = 'Password must not contain spaces';
    else if (!notUsername) error = 'Password must not equal username';

    return { valid, hasLength, hasLetter, hasNumber, noSpaces, notUsername, error };
  },

  async isUsernameTaken(username: string): Promise<boolean> {
    if (!this.validateUsername(username).valid) return false;
    const usernameLower = username.trim().toLowerCase();
    if (getLocalUsers()[usernameLower]) return true;
    if (!supabase) return false;

    const { data, error } = await supabase.rpc('is_username_available', {
      candidate: usernameLower,
    });
    if (error) throw new Error(`Could not check username availability: ${error.message}`);
    return !data;
  },

  getRemainingLockout(username: string): number {
    const entry = getLockoutMap()[username.trim().toLowerCase()];
    if (!entry?.lockedUntil) return 0;
    return Math.max(0, Math.ceil((entry.lockedUntil - Date.now()) / 1000));
  },

  recordFailedLogin(username: string): { locked: boolean; remainingSeconds: number } {
    const key = username.trim().toLowerCase();
    const lockouts = getLockoutMap();
    const current = lockouts[key] ?? { attempts: 0, lockedUntil: 0 };
    if (current.lockedUntil && current.lockedUntil <= Date.now()) {
      current.attempts = 0;
      current.lockedUntil = 0;
    }
    current.attempts += 1;
    if (current.attempts >= 5) current.lockedUntil = Date.now() + 60_000;
    lockouts[key] = current;
    saveLockoutMap(lockouts);
    return {
      locked: current.attempts >= 5,
      remainingSeconds: this.getRemainingLockout(username),
    };
  },

  clearFailedLogins(username: string): void {
    const lockouts = getLockoutMap();
    delete lockouts[username.trim().toLowerCase()];
    saveLockoutMap(lockouts);
  },

  async signup(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();
    const usernameValidation = this.validateUsername(usernameTrimmed);
    if (!usernameValidation.valid) throw new Error(usernameValidation.error);
    const passwordValidation = this.validatePassword(password, usernameTrimmed);
    if (!passwordValidation.valid) throw new Error(passwordValidation.error);
    if (await this.isUsernameTaken(usernameLower)) throw new Error('Username is already taken');

    if (!supabase) return this.signupLocal(usernameTrimmed, password);

    const { data, error } = await supabase.auth.signUp({
      email: `${usernameLower}@ctracker.local`,
      password,
      options: { data: { username: usernameTrimmed, username_lower: usernameLower } },
    });
    if (error) {
      if (
        error.code === '23505' ||
        error.message.toLowerCase().includes('user already registered')
      ) {
        throw new Error('Username is already taken');
      }
      throw new Error(`Could not create account: ${error.message}`);
    }
    if (!data.session || !data.user) {
      throw new Error('Account created, but sign-in is pending. Disable email confirmation in Supabase Auth to use username-based accounts.');
    }

    const profile = await getProfile(data.user.id);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  async signupLocal(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();
    const usernameValidation = this.validateUsername(usernameTrimmed);
    if (!usernameValidation.valid) throw new Error(usernameValidation.error);
    const passwordValidation = this.validatePassword(password, usernameTrimmed);
    if (!passwordValidation.valid) throw new Error(passwordValidation.error);

    const users = getLocalUsers();
    if (users[usernameLower]) throw new Error('Username is already taken');

    const now = new Date().toISOString();
    const profile: UserProfile = {
      uid: `local_${usernameLower}`,
      username: usernameTrimmed,
      usernameLower,
      createdAt: now,
      lastLoginAt: now,
      streak: 1,
      lastActiveDate: now.slice(0, 10),
    };
    users[usernameLower] = { ...profile, passwordHash: await hashPassword(password) };
    saveLocalUsers(users);
    saveSessionProfile(profile);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  async login(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();
    const remaining = this.getRemainingLockout(usernameTrimmed);
    if (remaining > 0) throw new Error(`Too many failed attempts. Account locked for ${remaining}s.`);

    const localUser = getLocalProfile(usernameLower);
    if (localUser) return this.loginLocal(usernameTrimmed, password);
    if (!supabase) {
      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${usernameLower}@ctracker.local`,
      password,
    });
    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        this.recordFailedLogin(usernameTrimmed);
        throw new Error('Invalid username or password');
      }
      throw new Error(`Unable to sign in: ${error.message}`);
    }
    if (!data.user) throw new Error('Unable to sign in: Supabase returned no user.');

    const profile = await getProfile(data.user.id);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  async loginLocal(username: string, password: string): Promise<UserProfile> {
    const usernameTrimmed = username.trim();
    const usernameLower = usernameTrimmed.toLowerCase();
    const remaining = this.getRemainingLockout(usernameTrimmed);
    if (remaining > 0) throw new Error(`Too many failed attempts. Account locked for ${remaining}s.`);

    const users = getLocalUsers();
    const user = users[usernameLower];
    if (!user || user.passwordHash !== await hashPassword(password)) {
      this.recordFailedLogin(usernameTrimmed);
      throw new Error('Invalid username or password');
    }

    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(`Could not switch to the local account: ${error.message}`);
    }

    const now = new Date().toISOString();
    user.lastLoginAt = now;
    saveLocalUsers(users);
    const { passwordHash: _passwordHash, ...profile } = user;
    saveSessionProfile(profile);
    this.clearFailedLogins(usernameTrimmed);
    return profile;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(`Could not sign out: ${error.message}`);
    }
  },

  getLocalSession(): UserProfile | null {
    return getSessionProfile();
  },

  async getCurrentUserProfile(): Promise<UserProfile | null> {
    if (supabase) {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw new Error(`Could not read the current session: ${error.message}`);
      if (session?.user) return getProfile(session.user.id);
    }
    return getSessionProfile();
  },

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    let active = true;
    const emitLocal = () => {
      if (!active) return;
      const localProfile = getSessionProfile();
      callback(localProfile ? toAuthUser(localProfile) : null);
    };

    if (!supabase) {
      queueMicrotask(emitLocal);
      return () => { active = false; };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        callback(toAuthUserFromSupabase(session.user));
      } else {
        emitLocal();
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  },

};
