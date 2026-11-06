import React from 'react';

export interface EqualizerItem {
  id: string;
  label: string;
  value: number; // percentage 0 - 100
  sublabel?: string;
  color?: 'orange' | 'green' | 'amber';
}

interface NeuEqualizerProps {
  items: EqualizerItem[];
  height?: number; // default 120px
  className?: string;
}

export const NeuEqualizer: React.FC<NeuEqualizerProps> = ({
  items,
  height = 110,
  className = '',
}) => {
  return (
    <div className={`flex items-end justify-between gap-3 sm:gap-4 w-full p-4 rounded-2xl neu-inset ${className}`}>
      {items.map((item) => {
        const clamped = Math.min(100, Math.max(0, item.value));
        const barColor =
          item.color === 'green'
            ? 'from-[#0BDA51] to-[#0BDA51]'
            : item.color === 'amber'
            ? 'from-amber-500 to-orange-400'
            : 'from-[var(--neu-accent)] to-[var(--neu-accent-light)]';

        return (
          <div key={item.id} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono tabular-nums font-semibold text-[var(--neu-text-primary)]">
              {Math.round(item.value)}%
            </span>

            {/* Inset vertical track */}
            <div
              className="w-4 sm:w-6 rounded-full bg-[var(--neu-surface)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-1px_-1px_3px_rgba(255,255,255,0.05)] relative flex items-end p-0.5 overflow-hidden"
              style={{ height }}
            >
              <div
                className={`w-full rounded-full bg-gradient-to-t ${barColor} shadow-[0_0_8px_var(--neu-accent-glow)] transition-[height,background-color,box-shadow] duration-500 ease-out`}
                style={{ height: `${clamped}%` }}
              />
            </div>

            <div className="text-center mt-1">
              <span className="text-[11px] font-medium text-[var(--neu-text-secondary)] block truncate max-w-[70px]">
                {item.label}
              </span>
              {item.sublabel && (
                <span className="text-[9px] text-[var(--neu-text-muted)] block font-mono">
                  {item.sublabel}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
