import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeSelectorProps {
  theme: 'dark' | 'light';
  onChange: (theme: 'dark' | 'light') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={theme === 'dark'}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
    className="group relative inline-flex h-9 w-[72px] shrink-0 cursor-pointer items-center rounded-full border border-black/5 bg-white p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] transition-colors duration-200 dark:border-white/10 dark:bg-black dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neu-accent)]"
  >
    <Sun
      size={16}
      aria-hidden="true"
      className="absolute left-[10px] text-[var(--neu-text-muted)]"
    />
    <Moon
      size={16}
      aria-hidden="true"
      className="absolute right-[10px] text-[var(--neu-text-muted)]"
    />
    <span
      className={`absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/5 bg-[var(--neu-surface)] text-[var(--neu-accent)] shadow-[0_2px_5px_rgba(0,0,0,0.16)] transition-[transform,background-color,color,box-shadow] duration-200 ease-out group-hover:bg-[var(--neu-accent)] group-hover:text-white dark:border-white/10 dark:shadow-[0_2px_5px_rgba(0,0,0,0.4)] ${
        theme === 'dark' ? 'translate-x-9' : ''
      }`}
    >
      {theme === 'light' ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </span>
  </button>
);
