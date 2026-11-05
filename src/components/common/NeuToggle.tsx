import React from 'react';

interface NeuToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const NeuToggle: React.FC<NeuToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
}) => {
  const isSm = size === 'sm';
  const trackW = isSm ? 'w-10' : 'w-13';
  const trackH = isSm ? 'h-5' : 'h-7';
  const knobSize = isSm ? 'w-4 h-4' : 'w-5.5 h-5.5';
  const knobTranslate = isSm ? 'translate-x-5' : 'translate-x-6';

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {/* Recessed Pill Track */}
        <div
          className={`${trackW} ${trackH} rounded-full transition-colors duration-200 ${
            checked
              ? 'bg-[var(--neu-accent)]/80 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5),0_0_10px_var(--neu-accent-glow)]'
              : 'neu-inset'
          }`}
        />
        {/* Raised Round Knob */}
        <div
          className={`absolute top-[3px] left-[3px] ${knobSize} rounded-full bg-[var(--neu-surface)] shadow-[2px_2px_5px_rgba(0,0,0,0.5),-1px_-1px_4px_rgba(255,255,255,0.1)] transition-transform duration-200 flex items-center justify-center ${
            checked ? `${knobTranslate} bg-slate-900` : ''
          }`}
        >
          {checked && <div className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)] shadow-[0_0_4px_var(--neu-accent)]" />}
        </div>
      </div>
      {label && <span className="text-xs font-medium text-[var(--neu-text-secondary)]">{label}</span>}
    </label>
  );
};
