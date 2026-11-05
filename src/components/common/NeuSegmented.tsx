import React from 'react';

export interface SegmentOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface NeuSegmentedProps<T extends string = string> {
  options: Array<SegmentOption<T>>;
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function NeuSegmented<T extends string = string>({
  options,
  activeId,
  onChange,
  className = '',
  size = 'md',
}: NeuSegmentedProps<T>) {
  const isSm = size === 'sm';

  return (
    <div
      role="tablist"
      className={`inline-flex p-1.5 rounded-full neu-inset max-w-full overflow-x-auto ${className}`}
    >
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={`flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-all duration-200 outline-none select-none font-medium cursor-pointer ${
              isSm ? 'px-3 py-1 text-xs' : 'px-4.5 py-2 text-xs sm:text-sm'
            } ${
              isActive
                ? 'neu-raised text-[var(--neu-accent)] shadow-[3px_3px_8px_var(--neu-shadow-dark),-2px_-2px_6px_var(--neu-shadow-light),0_0_8px_var(--neu-accent-glow)] font-semibold'
                : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)]'
            }`}
          >
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-[var(--neu-accent)]/20 text-[var(--neu-accent)]'
                    : 'text-[var(--neu-text-muted)] bg-white/5'
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
