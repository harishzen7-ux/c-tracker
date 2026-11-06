import React from 'react';
import { Flame } from 'lucide-react';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';

interface UserProfileCardProps {
  userName: string;
  totalSolved: number;
  totalMastered: number;
  streak: number;
  onContinue: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userName,
  totalSolved,
  totalMastered,
  streak,
  onContinue,
}) => {
  return (
    <NeuCard className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* Circular avatar with a ring */}
        <div
          role="img"
          aria-label={`${userName} profile`}
          className="relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--neu-accent-light)] to-[var(--neu-accent)] p-[3px] shadow-[0_4px_16px_var(--neu-accent-glow)] sm:h-20 sm:w-20"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--neu-base)] shadow-[inset_2px_2px_5px_var(--neu-shadow-dark),inset_-2px_-2px_5px_var(--neu-shadow-light)]">
            <span className="font-mono text-2xl font-black tracking-tight text-[var(--neu-accent)] sm:text-3xl">
              {userName.trim().charAt(0).toUpperCase()}
            </span>
          </div>
          <span
            className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-[3px] border-[var(--neu-surface)] bg-[#0BDA51] shadow-[0_0_8px_rgba(11,218,81,0.7)]"
            title="Online"
          />
        </div>

        {/* Name and role */}
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--neu-text-primary)]">
              {userName}
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
              <span className="text-[var(--neu-green-tile-text)] font-bold">{totalSolved}</span> Challenges Solved
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--neu-text-primary)] font-semibold">
              <span className="text-amber-500 font-bold">{totalMastered}/4</span> Topics Mastered
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent px-4 py-3 shadow-[0_8px_24px_rgba(249,115,22,0.12)]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/25">
            <Flame size={23} strokeWidth={2.5} />
          </div>
          <div className="min-w-[105px]">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black leading-none tracking-tight text-orange-500">
                {streak}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-300">
                {streak === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--neu-text-muted)]">
              Login streak
            </p>
          </div>
        </div>

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
