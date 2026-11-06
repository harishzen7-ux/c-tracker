import React from 'react';

interface NeuSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: string;
  className?: string;
}

export const NeuSlider: React.FC<NeuSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  unit = '',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {(label || unit) && (
        <div className="flex justify-between items-center text-xs text-[var(--neu-text-secondary)]">
          {label && <span>{label}</span>}
          <span className="font-mono tabular-nums text-[var(--neu-text-primary)] font-medium">
            {value} {unit}
          </span>
        </div>
      )}
      <div className="relative w-full h-4 flex items-center">
        {/* Inset track */}
        <div className="w-full h-2 rounded-full neu-inset relative overflow-hidden">
          {/* Filled orange progress */}
          <div
            className="h-full bg-gradient-to-r from-[var(--neu-accent)] to-[var(--neu-accent-light)] shadow-[0_0_8px_var(--neu-accent-glow)] rounded-full transition-[width,background-color,box-shadow] duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {/* Invisible native input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {/* Raised Knob */}
        <div
          className="absolute w-4.5 h-4.5 rounded-full bg-[var(--neu-surface)] shadow-[2px_2px_5px_rgba(0,0,0,0.6),-1px_-1px_3px_rgba(255,255,255,0.1)] border border-[var(--neu-accent)]/40 pointer-events-none -translate-x-1/2 flex items-center justify-center transition-[left,background-color,box-shadow] duration-75"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)]" />
        </div>
      </div>
    </div>
  );
};
