import React, { useId, useState, useRef, useEffect } from 'react';
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
  const triggerId = useId();
  const menuId = useId();

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

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        document.getElementById(triggerId)?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, triggerId]);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="inline-flex min-h-10 items-center justify-between gap-3 rounded-full neu-raised px-4 py-2 text-xs font-medium text-[var(--neu-text-primary)] transition-all duration-150 hover:text-[var(--neu-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neu-accent)] active:neu-inset cursor-pointer sm:text-sm"
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
        <div
          id={menuId}
          aria-labelledby={triggerId}
          className="absolute right-0 z-50 mt-2 max-h-[min(60vh,20rem)] w-max min-w-[12rem] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-[var(--neu-border)] bg-[var(--neu-surface)] py-1.5 shadow-[0_12px_32px_rgba(15,20,28,0.18)] neu-raised-lg animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((opt) => {
            const isSel = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                type="button"
                aria-current={isSel ? 'true' : undefined}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`flex min-h-10 w-full items-center justify-between gap-4 px-4 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--neu-accent)] cursor-pointer sm:text-sm ${
                  isSel
                    ? 'bg-[var(--neu-accent)]/10 font-semibold text-[var(--neu-accent)]'
                    : 'text-[var(--neu-text-secondary)] hover:bg-[var(--neu-surface-hover)] hover:text-[var(--neu-text-primary)]'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <span className="break-words">{opt.label}</span>
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
