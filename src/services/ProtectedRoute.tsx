import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full neu-inset flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 rounded-full bg-[var(--neu-accent)] shadow-[0_0_12px_var(--neu-accent)]" />
        </div>
        <p className="font-mono text-xs text-[var(--neu-text-muted)] tracking-wider uppercase">
          Authenticating session...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect unauthenticated visitors to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
