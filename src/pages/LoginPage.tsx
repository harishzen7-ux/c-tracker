import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NeuCard } from '../components/common/NeuCard';
import { NeuButton } from '../components/common/NeuButton';
import { authService } from '../services/authService';
import { useAuth } from '../services/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthNotAllowed, setIsAuthNotAllowed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const { login, loginLocally } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinueLocally = async () => {
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setIsSubmitting(true);
    try {
      await loginLocally(username.trim(), password);
      const destination = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Local login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check lockout on mount and when username changes
  useEffect(() => {
    if (username.trim()) {
      const remaining = authService.getRemainingLockout(username.trim());
      setLockoutSeconds(remaining);
    } else {
      setLockoutSeconds(0);
    }
  }, [username]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthNotAllowed(false);

    if (lockoutSeconds > 0) {
      setError(`Account locked. Please wait ${lockoutSeconds}s before retrying.`);
      return;
    }

    if (!username.trim() || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      const destination = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        setIsAuthNotAllowed(true);
      } else {
        const rem = authService.getRemainingLockout(username.trim());
        if (rem > 0) {
          setLockoutSeconds(rem);
          setError(`Too many failed attempts. Account locked for ${rem}s.`);
        } else if (
          err?.message?.startsWith('Unable to ') ||
          err?.message?.startsWith('Too many sign-in attempts')
        ) {
          setError(err.message);
        } else {
          setError('Invalid username or password');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Link to="/" className="flex items-center gap-2.5 text-2xl font-black text-[var(--neu-text-primary)]">
            <div className="w-10 h-10 rounded-xl neu-raised flex items-center justify-center font-mono font-bold text-lg text-[var(--neu-accent)]">
              C
            </div>
            <span>
              C <span className="text-[var(--neu-accent)]">Tracker</span>
            </span>
          </Link>
          <p className="text-xs font-mono text-[var(--neu-text-muted)] tracking-wider uppercase">
            Sign in to continue your skill tracking
          </p>
        </div>

        {/* Card Form */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Helpful resolution banner when Firebase Email/Password is disabled */}
            {isAuthNotAllowed && (
              <div className="p-4 rounded-xl neu-inset bg-amber-500/10 border border-amber-500/30 flex flex-col gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-500 text-base leading-none">ℹ️</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      Firebase Email/Password Auth Disabled
                    </span>
                    <p className="text-[var(--neu-text-secondary)] leading-relaxed">
                      Your Firebase project hasn't enabled Email/Password sign-ins in the console yet. You can continue instantly below:
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <NeuButton
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleContinueLocally}
                    disabled={isSubmitting}
                    className="flex-1 text-xs"
                  >
                    Log In Locally
                  </NeuButton>
                </div>
              </div>
            )}

            {/* Inline Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl neu-inset bg-red-500/10 border border-red-500/30 text-rose-700 dark:text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Lockout Warning */}
            {lockoutSeconds > 0 && (
              <div className="p-3.5 rounded-xl neu-inset bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono flex items-center justify-between">
                <span>Account locked for security</span>
                <span className="font-bold text-[var(--neu-accent)]">{lockoutSeconds}s</span>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-[var(--neu-text-muted)]">
                Username
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoCapitalize="off"
                  autoComplete="username"
                  required
                  disabled={isSubmitting || lockoutSeconds > 0}
                  className="w-full py-2.5 px-4 rounded-xl neu-inset bg-[var(--neu-base)] text-[var(--neu-text-primary)] text-sm outline-none border border-transparent focus:border-[var(--neu-accent)]/50"
                />
              </div>
            </div>

            {/* Password with show/hide toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-[var(--neu-text-muted)]">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting || lockoutSeconds > 0}
                  className="w-full py-2.5 pl-4 pr-16 rounded-xl neu-inset bg-[var(--neu-base)] text-[var(--neu-text-primary)] text-sm outline-none border border-transparent focus:border-[var(--neu-accent)]/50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 text-xs font-mono text-[var(--neu-text-muted)] hover:text-[var(--neu-accent)] cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <NeuButton
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isSubmitting || lockoutSeconds > 0}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </NeuButton>
          </form>

          {/* Link to Signup */}
          <div className="pt-4 border-t border-[var(--neu-border)] text-center text-xs text-[var(--neu-text-secondary)]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--neu-accent)] font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </NeuCard>
      </div>
    </div>
  );
};
