import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

interface NeuDropdownProps<T extends string = string> {
  options: Array<DropdownOption<T>>;
  selectedId: T;
  onChange: (id: T) => void;
  className?: string;
  labelPrefix?: string;
}

export function NeuDropdown<T extends string = string>({
  options,
  selectedId,
  onChange,
  className = '',
  labelPrefix = '',
}: NeuDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === selectedId) || options[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-full neu-raised text-xs sm:text-sm font-medium text-[var(--neu-text-primary)] hover:text-[var(--neu-accent)] active:neu-inset transition-all duration-150 cursor-pointer min-h-[38px]"
      >
        <span className="flex items-center gap-2">
          {labelPrefix && <span className="text-[var(--neu-text-muted)]">{labelPrefix}</span>}
          {selected?.icon && <span className="shrink-0">{selected.icon}</span>}
          <span>{selected?.label}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-[var(--neu-text-secondary)] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[var(--neu-accent)]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[180px] py-1.5 rounded-2xl neu-raised-lg bg-[var(--neu-surface)] border border-[var(--neu-border)] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSel = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  isSel
                    ? 'text-[var(--neu-accent)] bg-white/5 font-semibold'
                    : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </span>
                {isSel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)] shadow-[0_0_6px_var(--neu-accent)]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
