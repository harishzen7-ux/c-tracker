import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NeuCard } from '../components/common/NeuCard';
import { NeuButton } from '../components/common/NeuButton';
import { authService } from '../services/authService';
import { useAuth } from '../services/AuthContext';

export const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Live validation states
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthNotAllowed, setIsAuthNotAllowed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const { signup, signupLocally, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsAuthNotAllowed(false);
    setIsGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign in failed. Please try again.');
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleContinueLocally = async () => {
    setIsSubmitting(true);
    try {
      await signupLocally(username.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to initialize local session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debounced check for username availability
  useEffect(() => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      setUsernameError(null);
      return;
    }

    const val = authService.validateUsername(username.trim());
    if (!val.valid) {
      setUsernameError(val.error || 'Invalid username');
      setUsernameAvailable(null);
      return;
    }

    setUsernameError(null);
    setIsCheckingUsername(true);

    const timer = setTimeout(async () => {
      try {
        const taken = await authService.isUsernameTaken(username.trim());
        setUsernameAvailable(!taken);
        if (taken) {
          setUsernameError('Username already taken');
        }
      } catch {
        setUsernameAvailable(true);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  // Live password validation checklist
  const passwordRules = authService.validatePassword(password, username);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthNotAllowed(false);

    // Final checks
    const uVal = authService.validateUsername(username.trim());
    if (!uVal.valid) {
      setError(uVal.error || 'Invalid username');
      return;
    }

    if (!passwordRules.valid) {
      setError(passwordRules.error || 'Please meet all password requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (usernameAvailable === false) {
      setError('Username already taken. Please choose another.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(username.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        setIsAuthNotAllowed(true);
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
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
            Create an account to persist your progress
          </p>
        </div>

        {/* Card Form */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Quick Google Sign In */}
          <NeuButton
            type="button"
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isGoogleSubmitting}
            className="flex items-center justify-center gap-3 font-semibold text-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isGoogleSubmitting ? 'Connecting with Google...' : 'Continue with Google'}</span>
          </NeuButton>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--neu-border)]" />
            <span className="text-[11px] font-mono uppercase text-[var(--neu-text-muted)] tracking-wider">
              or with username
            </span>
            <div className="flex-1 h-px bg-[var(--neu-border)]" />
          </div>

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
                    Start as {username.trim() || 'Harish'} (Instant Session)
                  </NeuButton>
                  <NeuButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleSubmitting}
                    className="text-xs"
                  >
                    Use Google
                  </NeuButton>
                </div>

                <a
                  href="https://console.firebase.google.com/project/gen-lang-client-0291912121/authentication/providers"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[var(--neu-accent)] hover:underline flex items-center gap-1 font-mono mt-1"
                >
                  Enable Email/Password in Firebase Console ↗
                </a>
              </div>
            )}

            {/* Standard Error Message */}
            {error && !isAuthNotAllowed && (
              <div className="p-3.5 rounded-xl neu-inset bg-red-500/10 border border-red-500/30 text-rose-700 dark:text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="font-semibold uppercase text-[var(--neu-text-muted)]">
                  Username
                </label>
                {/* Live Username Availability Hint */}
                {isCheckingUsername ? (
                  <span className="text-[11px] text-[var(--neu-text-muted)]">Checking...</span>
                ) : usernameAvailable === true ? (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Available
                  </span>
                ) : usernameError ? (
                  <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    {usernameError}
                  </span>
                ) : null}
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. c_coder_99"
                  autoCapitalize="off"
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl neu-inset bg-[var(--neu-base)] text-[var(--neu-text-primary)] text-sm outline-none border border-transparent focus:border-[var(--neu-accent)]/50"
                />
              </div>
            </div>

            {/* Password Field with show/hide toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-[var(--neu-text-muted)]">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a strong password"
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
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

              {/* Live Password Rule Checklist */}
              {password.length > 0 && (
                <div className="p-3 rounded-xl neu-inset bg-black/10 dark:bg-black/25 flex flex-col gap-1.5 text-[11px] font-mono mt-1">
                  <div className="flex items-center gap-2">
                    <span className={passwordRules.hasLength ? 'text-emerald-500 font-bold' : 'text-[var(--neu-text-muted)]'}>
                      {passwordRules.hasLength ? '✓' : '•'}
                    </span>
                    <span className={passwordRules.hasLength ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-[var(--neu-text-muted)]'}>
                      8 to 64 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={passwordRules.hasLetter ? 'text-emerald-500 font-bold' : 'text-[var(--neu-text-muted)]'}>
                      {passwordRules.hasLetter ? '✓' : '•'}
                    </span>
                    <span className={passwordRules.hasLetter ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-[var(--neu-text-muted)]'}>
                      At least 1 letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={passwordRules.hasNumber ? 'text-emerald-500 font-bold' : 'text-[var(--neu-text-muted)]'}>
                      {passwordRules.hasNumber ? '✓' : '•'}
                    </span>
                    <span className={passwordRules.hasNumber ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-[var(--neu-text-muted)]'}>
                      At least 1 number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={passwordRules.noSpaces && passwordRules.notUsername ? 'text-emerald-500 font-bold' : 'text-[var(--neu-text-muted)]'}>
                      {passwordRules.noSpaces && passwordRules.notUsername ? '✓' : '•'}
                    </span>
                    <span className={passwordRules.noSpaces && passwordRules.notUsername ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-[var(--neu-text-muted)]'}>
                      No spaces & not equal to username
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field with show/hide toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-[var(--neu-text-muted)]">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  className="w-full py-2.5 pl-4 pr-16 rounded-xl neu-inset bg-[var(--neu-base)] text-[var(--neu-text-primary)] text-sm outline-none border border-transparent focus:border-[var(--neu-accent)]/50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 text-xs font-mono text-[var(--neu-text-muted)] hover:text-[var(--neu-accent)] cursor-pointer"
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 mt-0.5">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Submit Button */}
            <NeuButton
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account & Start Learning'}
            </NeuButton>
          </form>

          {/* Link to Login */}
          <div className="pt-4 border-t border-[var(--neu-border)] text-center text-xs text-[var(--neu-text-secondary)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--neu-accent)] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </NeuCard>
      </div>
    </div>
  );
};
