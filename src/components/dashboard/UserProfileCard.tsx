import React from 'react';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';

interface UserProfileCardProps {
  totalSolved: number;
  totalMastered: number;
  streak: number;
  onContinue: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  totalSolved,
  totalMastered,
  streak,
  onContinue,
}) => {
  return (
    <NeuCard className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* Circular avatar with a ring */}
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full neu-raised flex items-center justify-center p-1.5 shrink-0">
          <div className="w-full h-full rounded-full neu-inset flex items-center justify-center border-2 border-[var(--neu-accent)]/50 shadow-[0_0_12px_var(--neu-accent-glow)]">
            <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--neu-accent)]">
              C99
            </span>
          </div>
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--neu-base)] shadow-[0_0_8px_rgba(34,197,94,0.8)]"
            title="Online"
          />
        </div>

        {/* Name and role */}
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--neu-text-primary)]">
              Developer Candidate
            </h2>
            <span className="text-[11px] font-mono text-[var(--neu-accent)] px-2 py-0.5 rounded-full neu-inset">
              Level 1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--neu-text-secondary)] mt-1">
            C Systems & Foundations Track · Phase 1
          </p>

          {/* Quick stats unboxed */}
          <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-[var(--neu-text-muted)] font-mono">
            <span className="text-[var(--neu-text-primary)] font-semibold">
              <span className="text-emerald-500 font-bold">{totalSolved}</span> Challenges Solved
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--neu-text-primary)] font-semibold">
              <span className="text-amber-500 font-bold">{totalMastered}/4</span> Topics Mastered
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--neu-text-primary)] font-semibold">
              <span className="text-[var(--neu-accent)] font-bold">{streak}</span> Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* Primary orange pill button */}
      <div className="shrink-0 w-full sm:w-auto">
        <NeuButton
          variant="primary"
          size="md"
          fullWidth
          onClick={onContinue}
        >
          Continue Learning
        </NeuButton>
      </div>
    </NeuCard>
  );
};
