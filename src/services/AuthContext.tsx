import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { authService, UserProfile } from './authService';

type AuthUser = Pick<FirebaseUser, 'uid' | 'displayName' | 'email'>;

interface AuthContextType {
  currentUser: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<UserProfile>;
  signup: (username: string, pass: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    try {
      const p = await authService.getCurrentUserProfile();
      setProfile(p);
    } catch {
      setProfile(null);
    }
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        await loadProfile(user.uid);
      } else {
        // Check for local session
        const local = authService.getLocalSession();
        if (local) {
          setCurrentUser({
            uid: local.uid,
            displayName: local.username,
            email: `${local.usernameLower}@ctracker.local`,
          });
          setProfile(local);
        } else {
          setCurrentUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (username: string, pass: string) => {
    const prof = await authService.login(username, pass);
    if (prof.uid.startsWith('local_')) {
      setCurrentUser({
        uid: prof.uid,
        displayName: prof.username,
        email: `${prof.usernameLower}@ctracker.local`,
      });
    }
    setProfile(prof);
    return prof;
  };

  const signup = async (username: string, pass: string) => {
    const prof = await authService.signup(username, pass);
    if (prof.uid.startsWith('local_')) {
      setCurrentUser({
        uid: prof.uid,
        displayName: prof.username,
        email: `${prof.usernameLower}@ctracker.local`,
      });
    }
    setProfile(prof);
    return prof;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await loadProfile(currentUser.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        profile,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
