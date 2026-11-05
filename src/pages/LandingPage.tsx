import React from 'react';
import { Link } from 'react-router-dom';
import { NeuButton } from '../components/common/NeuButton';
import { NeuCard } from '../components/common/NeuCard';
import { useAuth } from '../services/AuthContext';

export const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] justify-between max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Navbar */}
      <header className="flex items-center justify-between pb-6 border-b border-[var(--neu-border)]">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[var(--neu-text-primary)] hover:text-[var(--neu-accent)] transition-colors select-none"
        >
          <div className="w-8 h-8 rounded-xl neu-raised flex items-center justify-center font-mono font-bold text-sm text-[var(--neu-accent)]">
            C
          </div>
          <span className="font-extrabold tracking-tight">
            C <span className="text-[var(--neu-accent)]">Tracker</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
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
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 py-8 lg:py-12">
        {/* Left Column: Hero headline, subline, CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-semibold text-[var(--neu-accent)]">
            <span className="w-2 h-2 rounded-full bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent-glow)]" />
            <span>Phase 1 · C Foundations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[var(--neu-text-primary)] tracking-tight leading-tight">
            Master C, <br className="hidden sm:inline" />
            one topic at a time.
          </h1>

          <p className="text-sm sm:text-base text-[var(--neu-text-secondary)] leading-relaxed max-w-md font-medium">
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
        <div className="w-full max-w-sm lg:max-w-md">
          <NeuCard className="p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* 01 LEARN */}
              <div className="neu-inset-sm p-3.5 rounded-xl flex items-start gap-3 border border-[var(--neu-border)] hover:border-[var(--neu-accent)]/30 transition-colors group">
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
              <div className="neu-inset-sm p-3.5 rounded-xl flex items-start gap-3 border border-[var(--neu-border)] hover:border-[var(--neu-accent)]/30 transition-colors group">
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
              <div className="neu-inset-sm p-3.5 rounded-xl flex items-start gap-3 border border-[var(--neu-border)] hover:border-[var(--neu-accent)]/30 transition-colors group">
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
              <div className="neu-inset-sm p-3.5 rounded-xl flex items-start gap-3 border border-[var(--neu-border)] hover:border-[var(--neu-accent)]/30 transition-colors group">
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

      {/* Small Strip: 4 Topic Chips and 3 Feature Labels */}
      <section className="py-4 border-t border-[var(--neu-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 4 Topic Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Input and Output', 'Operators & Expressions', 'Decision Making', 'Looping'].map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full neu-inset text-xs font-mono text-[var(--neu-text-secondary)] font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* 3 Text Labels */}
        <div className="flex items-center gap-5 text-xs font-mono text-[var(--neu-text-primary)] font-semibold">
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
        C Tracker · Neumorphic Skill Mastery Platform
      </footer>
    </div>
  );
};
