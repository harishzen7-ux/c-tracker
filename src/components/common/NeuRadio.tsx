import React from 'react';

interface NeuRadioProps {
  checked: boolean;
  onChange: () => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  name?: string;
  feedback?: 'correct' | 'wrong' | null;
}

export const NeuRadio: React.FC<NeuRadioProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  name,
  feedback = null,
}) => {
  let indicatorStyle = 'bg-transparent';
  let glowStyle = '';

  if (feedback === 'correct') {
    indicatorStyle = 'bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
    glowStyle = 'border-emerald-500/50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),0_0_8px_rgba(34,197,94,0.4)]';
  } else if (feedback === 'wrong') {
    indicatorStyle = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
    glowStyle = 'border-red-500/50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),0_0_8px_rgba(239,68,68,0.4)]';
  } else if (checked) {
    indicatorStyle = 'bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent)]';
    glowStyle = 'border-[var(--neu-accent)]/50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),0_0_8px_var(--neu-accent-glow)]';
  }

  return (
    <label
      className={`inline-flex items-center gap-3.5 cursor-pointer select-none ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="radio"
          name={name}
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={`w-5.5 h-5.5 rounded-full flex items-center justify-center neu-inset transition-all duration-150 border border-transparent ${glowStyle}`}
        >
          {checked && (
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${indicatorStyle}`} />
          )}
        </div>
      </div>
      {label && <span className="text-sm text-[var(--neu-text-primary)] leading-relaxed">{label}</span>}
    </label>
  );
};
