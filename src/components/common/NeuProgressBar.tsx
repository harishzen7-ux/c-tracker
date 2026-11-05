import React from 'react';

interface NeuProgressBarProps {
  value: number; // 0 to 100
  height?: 'sm' | 'md' | 'lg';
  label?: string;
  showPercent?: boolean;
  className?: string;
  color?: 'orange' | 'green' | 'blue';
}

export const NeuProgressBar: React.FC<NeuProgressBarProps> = ({
  value,
  height = 'md',
  label,
  showPercent = false,
  className = '',
  color = 'orange',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[height];

  const colorGradients = {
    orange: 'from-[var(--neu-accent)] to-[var(--neu-accent-light)] shadow-[0_0_8px_var(--neu-accent-glow)]',
    green: 'from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
    blue: 'from-sky-500 to-indigo-400 shadow-[0_0_8px_rgba(14,165,233,0.4)]',
  }[color];

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-[var(--neu-text-secondary)]">
          {label && <span>{label}</span>}
          {showPercent && (
            <span className="font-mono tabular-nums text-[var(--neu-text-primary)] font-medium">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${heightClasses} rounded-full neu-inset overflow-hidden p-0.5`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients} transition-all duration-300`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
