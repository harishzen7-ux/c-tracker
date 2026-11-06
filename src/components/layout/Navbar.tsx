import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { NeuIconButton } from '../common/NeuIconButton';
import { ThemeSelector } from '../common/ThemeSelector';
import { useAuth } from '../../services/AuthContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onThemeChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      navigate('/login');
    }
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Input & Output', path: '/topic/input-output' },
    { label: 'Operators', path: '/topic/operators-expressions' },
    { label: 'Decision Making', path: '/topic/decision-making' },
    { label: 'Looping', path: '/topic/looping' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--neu-base)]/85 border-b border-[var(--neu-border)] px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <Link
          to="/dashboard"
          className="text-lg sm:text-xl font-bold tracking-tight text-[var(--neu-text-primary)] hover:text-[var(--neu-accent)] transition-colors whitespace-nowrap shrink-0 group select-none"
        >
          <span className="font-extrabold tracking-tight">
            C <span className="text-[var(--neu-accent)]">Tracker</span>
          </span>
        </Link>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-[var(--neu-accent)] font-semibold'
                    : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--neu-accent)] rounded-full shadow-[0_0_6px_var(--neu-accent-glow)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme, Mobile toggle) */}
        <div className="flex items-center gap-1 shrink-0 sm:gap-3">
          <ThemeSelector theme={theme} onChange={onThemeChange} />

          {/* Logout Button */}
          <NeuIconButton
            ariaLabel="Logout from account"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut size={14} className="text-rose-400" />
          </NeuIconButton>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl neu-raised text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] active:neu-inset"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[var(--neu-border)] flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-[color,background-color,box-shadow,transform] ${
                  isActive
                    ? 'neu-inset text-[var(--neu-accent)] font-semibold'
                    : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
