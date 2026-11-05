import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeSelectorProps {
  theme: 'dark' | 'light';
  onChange: (theme: 'dark' | 'light') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onChange }) => (
  <div
    role="radiogroup"
    aria-label="Color theme"
    className="inline-flex items-center gap-1 rounded-xl neu-inset p-1"
  >
    <label className="cursor-pointer">
      <input
        className="peer sr-only"
        type="radio"
        name="color-theme"
        value="light"
        checked={theme === 'light'}
        onChange={() => onChange('light')}
      />
      <span className="flex h-8 w-9 items-center justify-center rounded-lg text-[var(--neu-text-muted)] transition-colors hover:text-[var(--neu-text-primary)] peer-checked:bg-[var(--neu-base)] peer-checked:text-amber-500 peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--neu-accent)]">
        <Sun size={15} aria-hidden="true" />
        <span className="sr-only">Light theme</span>
      </span>
    </label>
    <label className="cursor-pointer">
      <input
        className="peer sr-only"
        type="radio"
        name="color-theme"
        value="dark"
        checked={theme === 'dark'}
        onChange={() => onChange('dark')}
      />
      <span className="flex h-8 w-9 items-center justify-center rounded-lg text-[var(--neu-text-muted)] transition-colors hover:text-[var(--neu-text-primary)] peer-checked:bg-[var(--neu-base)] peer-checked:text-[var(--neu-accent)] peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--neu-accent)]">
        <Moon size={15} aria-hidden="true" />
        <span className="sr-only">Dark theme</span>
      </span>
    </label>
  </div>
);
