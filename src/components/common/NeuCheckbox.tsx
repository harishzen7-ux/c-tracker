import React from 'react';
import { Check } from 'lucide-react';

interface NeuCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const NeuCheckbox: React.FC<NeuCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-[color,background-color,box-shadow,transform] duration-150 ${
            checked
              ? 'neu-inset border border-[var(--neu-accent)]/50 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),0_0_8px_var(--neu-accent-glow)]'
              : 'neu-inset'
          }`}
        >
          {checked && (
            <Check size={13} className="text-[var(--neu-accent)] stroke-[3]" />
          )}
        </div>
      </div>
      {label && <span className="text-xs sm:text-sm text-[var(--neu-text-primary)]">{label}</span>}
    </label>
  );
};
