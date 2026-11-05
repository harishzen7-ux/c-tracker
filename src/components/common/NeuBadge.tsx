import React from 'react';

export type BadgeVariant = 'default' | 'orange' | 'green' | 'red' | 'amber' | 'easy' | 'medium' | 'hard';

interface NeuBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export const NeuBadge: React.FC<NeuBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  dot = true,
}) => {
  const styles: Record<BadgeVariant, { text: string; dotColor: string; bg?: string }> = {
    default: {
      text: 'text-[var(--neu-text-secondary)]',
      dotColor: 'bg-[var(--neu-text-muted)]',
    },
    orange: {
      text: 'text-[var(--neu-accent)] font-semibold',
      dotColor: 'bg-[var(--neu-accent)] shadow-[0_0_6px_var(--neu-accent)]',
    },
    green: {
      text: 'text-emerald-700 dark:text-emerald-400 font-semibold',
      dotColor: 'bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]',
    },
    red: {
      text: 'text-rose-700 dark:text-red-400 font-semibold',
      dotColor: 'bg-rose-600 dark:bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]',
    },
    amber: {
      text: 'text-amber-800 dark:text-amber-400 font-semibold',
      dotColor: 'bg-amber-600 dark:bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]',
    },
    easy: {
      text: 'text-emerald-700 dark:text-emerald-400 font-semibold',
      dotColor: 'bg-emerald-600 dark:bg-emerald-500',
    },
    medium: {
      text: 'text-amber-800 dark:text-amber-400 font-semibold',
      dotColor: 'bg-amber-600 dark:bg-amber-500',
    },
    hard: {
      text: 'text-rose-700 dark:text-rose-400 font-semibold',
      dotColor: 'bg-rose-600 dark:bg-rose-500',
    },
  };

  const current = styles[variant] || styles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs select-none tracking-wide ${current.text} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dotColor}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
