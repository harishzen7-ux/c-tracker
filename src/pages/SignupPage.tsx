import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NeuCard } from '../components/common/NeuCard';
import { NeuButton } from '../components/common/NeuButton';
import { authService } from '../services/authService';
import { useAuth } from '../services/AuthContext';
import { ContactCredit } from '../components/layout/ContactCredit';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Debounced check for username availability
  useEffect(() => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      setUsernameError(null);
      setIsCheckingUsername(false);
      return;
    }

    const val = authService.validateUsername(username.trim());
    if (!val.valid) {
      setUsernameError(val.error || 'Invalid username');
      setUsernameAvailable(null);
      setIsCheckingUsername(false);
      return;
    }

    setUsernameError(null);
    setUsernameAvailable(null);
    setIsCheckingUsername(true);

    let active = true;
    const timer = setTimeout(async () => {
      try {
        const taken = await authService.isUsernameTaken(username.trim());
        if (!active) return;
        setUsernameAvailable(!taken);
        if (taken) {
          setUsernameError('Username already taken');
        }
      } catch (err: any) {
        if (active) {
          setUsernameAvailable(null);
          setUsernameError(err.message || 'Could not check username availability');
        }
      } finally {
        if (active) setIsCheckingUsername(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [username]);

  // Live password validation checklist
  const passwordRules = authService.validatePassword(password, username);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="my-auto w-full max-w-md flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Link to="/" className="text-2xl font-black text-[var(--neu-text-primary)]">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Standard Error Message */}
            {error && (
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
      <ContactCredit />
    </div>
  );
};
