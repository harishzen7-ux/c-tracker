import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTopics, getTopicLessons, getTopicMCQs, getTopicCodingQuestions } from '../data';
import { TopicMeta, TopicStatus } from '../types';
import { storageService } from '../services/storageService';
import { UserProfileCard } from '../components/dashboard/UserProfileCard';
import { TopicCard } from '../components/dashboard/TopicCard';
import { NeuCard } from '../components/common/NeuCard';
import { NeuRing } from '../components/common/NeuRing';
import { NeuEqualizer, EqualizerItem } from '../components/common/NeuEqualizer';
import { NeuButton } from '../components/common/NeuButton';
import { useAuth } from '../services/AuthContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();
  const [progress, setProgress] = useState(storageService.getProgress());
  const topics = getAllTopics();
  const userName = profile?.username || currentUser?.displayName || 'Learner';

  // Keep the dashboard in sync with progress loaded or updated after mount.
  useEffect(() => {
    const refreshProgress = () => {
      const currentProgress = storageService.getProgress();
      setProgress({
        ...currentProgress,
        streak: { ...currentProgress.streak },
      });
    };
    const unsubscribe = storageService.subscribe(refreshProgress);
    window.addEventListener('focus', refreshProgress);
    refreshProgress();

    return () => {
      unsubscribe();
      window.removeEventListener('focus', refreshProgress);
    };
  }, []);

  // Compute stats per topic
  const topicStats = topics.map((t) => {
    const lesson = getTopicLessons(t.id);
    const mcqList = getTopicMCQs(t.id);
    const codeList = getTopicCodingQuestions(t.id);

    const totalLessons = lesson?.sections.length || 0;
    const totalMCQs = mcqList.length || 50;
    const totalCoding = codeList.length || 25;

    let lessonsDone = 0;
    if (lesson) {
      lesson.sections.forEach((sec) => {
        if (storageService.isLessonCompleted(t.id, sec.id)) {
          lessonsDone++;
        }
      });
    }

    const mcqBest = progress.mcqBestScores[t.id]?.score || 0;

    let codingSolved = 0;
    codeList.forEach((q) => {
      if (progress.solvedProblems[q.id]) {
        codingSolved++;
      }
    });

    // Status: Not Started, In Progress, Mastered
    let status: TopicStatus = 'not_started';
    const totalItems = totalLessons + totalMCQs + totalCoding;
    const completedItems = lessonsDone + mcqBest + codingSolved;

    if (completedItems === 0) {
      status = 'not_started';
    } else if (completedItems >= totalItems * 0.8) {
      status = 'mastered';
    } else {
      status = 'in_progress';
    }

    return {
      topic: t,
      lessonsDone,
      totalLessons,
      mcqBestScore: mcqBest,
      mcqTotal: totalMCQs,
      codingSolved,
      codingTotal: totalCoding,
      status,
      completedItems,
      totalItems,
    };
  });

  // Overall aggregates
  const grandTotalItems = topicStats.reduce((acc, curr) => acc + curr.totalItems, 0);
  const grandCompletedItems = topicStats.reduce((acc, curr) => acc + curr.completedItems, 0);
  const overallPercentage = grandTotalItems > 0 ? Math.round((grandCompletedItems / grandTotalItems) * 100) : 0;
  const totalSolved = Object.keys(progress.solvedProblems).filter((k) => progress.solvedProblems[k]).length;
  const totalMastered = topicStats.filter((t) => t.status === 'mastered').length;

  // Equalizer items for topic breakdown
  const topicEqualizerItems: EqualizerItem[] = topicStats.map((ts) => ({
    id: ts.topic.id,
    label: ts.topic.title.split(' ')[0], // short label
    value: ts.totalItems > 0 ? (ts.completedItems / ts.totalItems) * 100 : 0,
    sublabel: `${ts.completedItems}/${ts.totalItems}`,
    color: ts.status === 'mastered' ? 'green' : 'orange',
  }));

  // Continue where left off: pick first in-progress or first topic
  const resumeTopic = topicStats.find((t) => t.status === 'in_progress') || topicStats[0];

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* User Profile Summary Card */}
      <UserProfileCard
        userName={userName}
        totalSolved={totalSolved}
        totalMastered={totalMastered}
        streak={progress.streak.count}
        onContinue={() => navigate(`/topic/${resumeTopic.topic.id}`)}
      />

      {/* Hero Performance Overview: Ring + Equalizer + Greeting */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Overall Ring Gauge */}
        <NeuCard className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-6 p-6 sm:p-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--neu-accent)] font-semibold">
              Phase 1 Proficiency
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--neu-text-primary)] mt-1 tracking-tight">
              C Skill Tracker
            </h1>
            <p className="text-xs text-[var(--neu-text-secondary)] mt-1.5 max-w-[220px]">
              Foundational mastery across C standard I/O, operators, logic, and iteration loops.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {grandCompletedItems}/{grandTotalItems} Points Earned
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <NeuRing
              percentage={overallPercentage}
              size={130}
              strokeWidth={11}
              label="Overall"
              sublabel="Phase 1"
            />
          </div>
        </NeuCard>

        {/* Right: Equalizer Performance Bars across all 4 Topics */}
        <NeuCard className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--neu-border)]">
            <div>
              <h2 className="text-base font-bold text-[var(--neu-text-primary)]">
                Topic Mastery Distribution
              </h2>
              <p className="text-xs text-[var(--neu-text-secondary)] mt-0.5">
                Relative skill index across all 4 curriculum pillars
              </p>
            </div>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/topic/${resumeTopic.topic.id}`)}
            >
              Resume Track
            </NeuButton>
          </div>

          <div className="mt-4">
            <NeuEqualizer items={topicEqualizerItems} height={100} />
          </div>
        </NeuCard>
      </section>

      {/* 4 Topic Cards Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--neu-text-primary)] tracking-tight">
              Curriculum Pillars
            </h2>
            <p className="text-xs text-[var(--neu-text-secondary)]">
              Complete each topic's Learning Arena, 50-question MCQ diagnosis, and 25 coding challenges.
            </p>
          </div>
          <span className="hidden rounded-full px-3 py-1 text-xs font-mono text-[var(--neu-accent)] neu-inset sm:inline-flex">
            4 Core Domains · Phase 1
          </span>
        </div>

        <Link
          to="/getting-started"
          className="group relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[24px] border border-[var(--neu-accent)]/30 bg-gradient-to-r from-[var(--neu-accent)]/8 via-[var(--neu-surface)] to-[var(--neu-accent)]/5 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--neu-accent)]/50 hover:shadow-[0_18px_42px_var(--neu-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neu-base)] sm:flex-row sm:gap-8 sm:p-7"
        >
          <span className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[var(--neu-accent)]/5 blur-3xl transition-colors duration-300 group-hover:bg-[var(--neu-accent)]/10" />
          <span className="relative flex-1 text-center sm:text-left">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--neu-accent)]">
                START HERE
              </span>
              <span className="block text-lg font-extrabold tracking-tight text-[var(--neu-text-primary)] sm:text-xl">
                New to C programming?
              </span>
              <span className="mt-1 block max-w-xl text-xs leading-relaxed text-[var(--neu-text-secondary)] sm:text-sm">
                Get the essentials, explore what C can do, and find your first steps in the curriculum.
              </span>
          </span>
          <span className="begin-cta relative inline-flex min-h-[54px] min-w-[210px] shrink-0 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold shadow-[0_8px_24px_var(--neu-accent-glow)] transition-transform duration-200 group-hover:scale-[1.03] sm:min-h-[60px] sm:text-base">
            <span>Where you begin</span>
            <span aria-hidden="true">→</span>
          </span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topicStats.map((ts) => (
            <TopicCard
              key={ts.topic.id}
              topic={ts.topic}
              lessonsDone={ts.lessonsDone}
              totalLessons={ts.totalLessons}
              mcqBestScore={ts.mcqBestScore}
              mcqTotal={ts.mcqTotal}
              codingSolved={ts.codingSolved}
              codingTotal={ts.codingTotal}
              status={ts.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
