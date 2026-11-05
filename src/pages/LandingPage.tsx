import React from 'react';
import { Link } from 'react-router-dom';
import { NeuButton } from '../components/common/NeuButton';
import { NeuCard } from '../components/common/NeuCard';
import { ThemeSelector } from '../components/common/ThemeSelector';
import { useAuth } from '../services/AuthContext';

interface LandingPageProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ theme, onThemeChange }) => {
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col max-w-7xl mx-auto justify-between px-4 sm:px-8 lg:px-12 py-6 lg:py-8">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b border-[var(--neu-border)] pb-5 lg:pb-6">
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-[var(--neu-text-primary)] hover:text-[var(--neu-accent)] transition-colors select-none"
        >
          <span className="font-extrabold tracking-tight">
            C <span className="text-[var(--neu-accent)]">Tracker</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSelector theme={theme} onChange={onThemeChange} />
          {currentUser ? (
            <Link to="/dashboard">
              <NeuButton variant="primary" size="sm">
                Go to Dashboard
              </NeuButton>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <NeuButton variant="secondary" size="sm">
                  Login
                </NeuButton>
              </Link>
              <Link to="/signup">
                <NeuButton variant="primary" size="sm">
                  Sign up
                </NeuButton>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Single-Screen Hero Section */}
      <main className="grid flex-1 grid-cols-1 items-center justify-items-center gap-10 py-10 sm:py-12 lg:min-h-[62vh] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:justify-items-stretch lg:gap-14 xl:gap-20 lg:py-12 xl:py-16">
        {/* Left Column: Hero headline, subline, CTA */}
        <div className="flex w-full max-w-2xl flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-semibold text-[var(--neu-accent)]">
            <span className="w-2 h-2 rounded-full bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent-glow)]" />
            <span>Phase 1 · C Foundations</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--neu-text-primary)] sm:text-5xl lg:text-6xl xl:text-6xl">
            Master C, <br className="hidden sm:inline" />
            one topic at a time.
          </h1>

          <p className="max-w-xl text-sm font-medium leading-relaxed text-[var(--neu-text-secondary)] sm:text-base lg:text-lg">
            Learn core concepts, test knowledge with 200 MCQs, and solve 100 coding challenges.
          </p>

          <div className="flex items-center gap-4 pt-2">
            {currentUser ? (
              <Link to="/dashboard">
                <NeuButton
                  variant="primary"
                  size="lg"
                >
                  Continue to Dashboard
                </NeuButton>
              </Link>
            ) : (
              <Link to="/signup">
                <NeuButton
                  variant="primary"
                  size="lg"
                >
                  Get Started
                </NeuButton>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: WHAT’S INSIDE Curriculum Card */}
        <div className="w-full max-w-lg lg:max-w-none">
          <NeuCard className="relative flex flex-col gap-5 overflow-hidden p-6 sm:p-7 lg:gap-6 lg:p-8">
            <div className="w-full flex items-center justify-between pb-3.5 border-b border-[var(--neu-border)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent-glow)]" />
                <span className="text-[var(--neu-accent)] font-bold text-xs uppercase tracking-wider">
                  WHAT’S INSIDE
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full neu-inset text-[11px] font-mono text-[var(--neu-text-secondary)] font-medium">
                C99 Curriculum
              </span>
            </div>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 lg:gap-4">
              {/* 01 LEARN */}
              <div className="neu-inset-sm group flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-3.5 transition-colors hover:border-[var(--neu-accent)]/30 lg:p-4">
                <div className="w-8 h-8 rounded-lg neu-raised flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0 group-hover:scale-105 transition-transform">
                  01
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs tracking-wider text-[var(--neu-text-primary)] uppercase">
                    LEARN
                  </span>
                  <span className="text-xs text-[var(--neu-text-secondary)] font-medium mt-0.5">
                    Core concepts
                  </span>
                </div>
              </div>

              {/* 02 PRACTICE */}
              <div className="neu-inset-sm group flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-3.5 transition-colors hover:border-[var(--neu-accent)]/30 lg:p-4">
                <div className="w-8 h-8 rounded-lg neu-raised flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0 group-hover:scale-105 transition-transform">
                  02
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs tracking-wider text-[var(--neu-text-primary)] uppercase">
                    PRACTICE
                  </span>
                  <span className="text-xs text-[var(--neu-text-secondary)] font-medium mt-0.5">
                    200 MCQs
                  </span>
                </div>
              </div>

              {/* 03 CODE */}
              <div className="neu-inset-sm group flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-3.5 transition-colors hover:border-[var(--neu-accent)]/30 lg:p-4">
                <div className="w-8 h-8 rounded-lg neu-raised flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0 group-hover:scale-105 transition-transform">
                  03
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs tracking-wider text-[var(--neu-text-primary)] uppercase">
                    CODE
                  </span>
                  <span className="text-xs text-[var(--neu-text-secondary)] font-medium mt-0.5">
                    100 challenges
                  </span>
                </div>
              </div>

              {/* 04 TEST */}
              <div className="neu-inset-sm group flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-3.5 transition-colors hover:border-[var(--neu-accent)]/30 lg:p-4">
                <div className="w-8 h-8 rounded-lg neu-raised flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0 group-hover:scale-105 transition-transform">
                  04
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs tracking-wider text-[var(--neu-text-primary)] uppercase">
                    TEST
                  </span>
                  <span className="text-xs text-[var(--neu-text-secondary)] font-medium mt-0.5">
                    Skill-test preparation
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom summary strip */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[var(--neu-border)] text-[11px] text-[var(--neu-text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-green)]" />
                Comprehensive Curriculum
              </span>
              <span className="text-[var(--neu-accent)] font-semibold font-mono">Self-Paced</span>
            </div>
          </NeuCard>
        </div>
      </main>

      {/* Learning feature labels */}
      <section className="flex justify-center border-t border-[var(--neu-border)] py-5 lg:py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-mono font-semibold sm:gap-x-10 sm:text-sm">
          <span className="text-[var(--neu-accent)]">
            Learn
          </span>
          <span className="text-[var(--neu-accent)]">
            MCQ Check
          </span>
          <span className="text-[var(--neu-accent)]">
            Try with Code
          </span>
        </div>
      </section>

      {/* Tiny Footer Line */}
      <footer className="text-center pt-3 pb-1 text-[11px] font-mono text-[var(--neu-text-muted)]">
        C Tracker · Skill Mastery Platform
      </footer>
    </div>
  );
};
