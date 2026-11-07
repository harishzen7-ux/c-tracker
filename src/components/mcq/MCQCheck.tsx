import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Timer,
  RotateCcw,
  Star,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Shuffle,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCQ, TopicId } from '../../types';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';
import { NeuIconButton } from '../common/NeuIconButton';
import { NeuRadio } from '../common/NeuRadio';
import { NeuBadge } from '../common/NeuBadge';
import { NeuToggle } from '../common/NeuToggle';
import { NeuRing } from '../common/NeuRing';
import { NeuEqualizer, EqualizerItem } from '../common/NeuEqualizer';
import { storageService } from '../../services/storageService';

interface MCQCheckProps {
  mcqs: MCQ[];
  topicId: TopicId;
  onScoreSaved: () => void;
}

export const MCQCheck: React.FC<MCQCheckProps> = ({ mcqs, topicId, onScoreSaved }) => {
  // State
  const [questions, setQuestions] = useState<MCQ[]>(mcqs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerEnabled && !isSubmitted) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerEnabled, isSubmitted]);

  // Sync questions if prop changes
  useEffect(() => {
    setQuestions(mcqs);
  }, [mcqs]);

  // Helpers
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleShuffle = () => {
    const shuffled = [...mcqs].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setElapsedSeconds(0);
    setIsShuffled(true);
  };

  const handleReset = () => {
    setQuestions(mcqs);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setElapsedSeconds(0);
    setIsShuffled(false);
  };

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  // Submit test and calculate metrics
  const handleSubmit = () => {
    setIsSubmitted(true);

    let correctCount = 0;
    const diffStats = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 },
    };

    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      const isCorrect = userAns === q.correctIndex;
      if (isCorrect) correctCount++;

      if (q.difficulty in diffStats) {
        diffStats[q.difficulty].total++;
        if (isCorrect) diffStats[q.difficulty].correct++;
      }
    });

    storageService.saveMCQBestScore(
      topicId,
      correctCount,
      questions.length,
      elapsedSeconds,
      diffStats
    );
    onScoreSaved();

    // Trigger celebration if score >= 80%
    if ((correctCount / questions.length) >= 0.8) {
      try {
        const accent = getComputedStyle(document.documentElement)
          .getPropertyValue('--neu-accent')
          .trim();
        const accentLight = getComputedStyle(document.documentElement)
          .getPropertyValue('--neu-accent-light')
          .trim();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: [accent, accentLight, '#0BDA51', '#ffffff'],
        });
      } catch (e) {
        // confetti safe
      }
    }
  };

  // Calculations for results screen
  const scoreResults = useMemo(() => {
    if (!isSubmitted) return null;
    let score = 0;
    const diffStats = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 },
    };
    const weakSubtopics: Record<string, number> = {};

    questions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctIndex;
      if (isCorrect) {
        score++;
      } else {
        weakSubtopics[q.subtopic] = (weakSubtopics[q.subtopic] || 0) + 1;
      }
      diffStats[q.difficulty].total++;
      if (isCorrect) diffStats[q.difficulty].correct++;
    });

    const accuracy = Math.round((score / questions.length) * 100);

    // Equalizer bars breakdown
    const equalizerItems: EqualizerItem[] = [
      {
        id: 'easy',
        label: 'Easy',
        value: diffStats.easy.total > 0 ? (diffStats.easy.correct / diffStats.easy.total) * 100 : 0,
        sublabel: `${diffStats.easy.correct}/${diffStats.easy.total}`,
        color: 'green',
      },
      {
        id: 'medium',
        label: 'Medium',
        value: diffStats.medium.total > 0 ? (diffStats.medium.correct / diffStats.medium.total) * 100 : 0,
        sublabel: `${diffStats.medium.correct}/${diffStats.medium.total}`,
        color: 'amber',
      },
      {
        id: 'hard',
        label: 'Hard',
        value: diffStats.hard.total > 0 ? (diffStats.hard.correct / diffStats.hard.total) * 100 : 0,
        sublabel: `${diffStats.hard.correct}/${diffStats.hard.total}`,
        color: 'orange',
      },
    ];

    // Sorted weak subtopics
    const sortedWeak = Object.entries(weakSubtopics).sort((a, b) => b[1] - a[1]);

    return {
      score,
      total: questions.length,
      accuracy,
      equalizerItems,
      sortedWeak,
    };
  }, [isSubmitted, questions, selectedAnswers]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentSelected = selectedAnswers[currentIndex];
  const isMarked = markedForReview[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const progressPercent = questions.length > 0
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-[26px] neu-raised border border-[var(--neu-border)]">
        <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[var(--neu-accent)]/10 blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[var(--neu-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent-glow)]" />
              Skill test practice
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--neu-text-primary)] sm:text-3xl">
              MCQ Check
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              Trace the code, choose the best answer, and use the review notes to strengthen your C fundamentals.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="rounded-2xl px-4 py-2 text-center neu-inset">
              <div className="font-mono text-lg font-bold text-[var(--neu-accent)]">{answeredCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--neu-text-muted)]">Answered</div>
            </div>
            <div className="rounded-2xl px-4 py-2 text-center neu-inset">
              <div className="font-mono text-lg font-bold text-[var(--neu-text-primary)]">{questions.length}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--neu-text-muted)]">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Controller Bar */}
      <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl neu-raised">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl neu-inset font-mono text-sm font-bold text-[var(--neu-accent)]">
              {String(currentIndex + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--neu-text-muted)]">
                Current question
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--neu-text-primary)]">
                  {currentIndex + 1} <span className="font-normal text-[var(--neu-text-muted)]">of {questions.length}</span>
                </span>
                <NeuBadge variant={currentQ.difficulty}>{currentQ.difficulty.toUpperCase()}</NeuBadge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full px-3 py-1.5 neu-inset">
              <Timer size={15} className={timerEnabled ? 'text-[var(--neu-accent)] animate-spin-slow' : 'text-[var(--neu-text-muted)]'} />
              <NeuToggle
                checked={timerEnabled}
                onChange={setTimerEnabled}
                label={timerEnabled ? formatTime(elapsedSeconds) : 'Timer'}
                size="sm"
              />
            </div>
            <NeuIconButton
              size="sm"
              ariaLabel="Shuffle Questions"
              active={isShuffled}
              onClick={handleShuffle}
              disabled={isSubmitted}
            >
              <Shuffle size={14} />
            </NeuIconButton>
            <NeuIconButton size="sm" ariaLabel="Reset Attempt" onClick={handleReset}>
              <RotateCcw size={14} />
            </NeuIconButton>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full neu-inset">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--neu-accent)] to-[var(--neu-accent-light)] transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="min-w-[42px] text-right font-mono text-[10px] font-bold text-[var(--neu-text-muted)]">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </div>

      {/* RESULTS SCREEN (Rendered if submitted) */}
      {isSubmitted && scoreResults && (
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-6 border-b border-[var(--neu-border)]">
            <div className="text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--neu-accent)] font-semibold">
                Diagnostic Assessment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--neu-text-primary)] mt-1">
                MCQ Check Complete
              </h2>
              <p className="text-sm text-[var(--neu-text-secondary)] mt-1">
                Review your performance breakdown across difficulty tiers below.
              </p>
              <div className="flex items-center gap-4 mt-4 text-xs font-mono text-[var(--neu-text-muted)] justify-center md:justify-start">
                <span>Score: <strong className="text-[var(--neu-text-primary)]">{scoreResults.score}/{scoreResults.total}</strong></span>
                <span>·</span>
                <span>Accuracy: <strong className="text-[var(--neu-accent)]">{scoreResults.accuracy}%</strong></span>
                <span>·</span>
                <span>Time: <strong className="text-[var(--neu-text-primary)]">{formatTime(elapsedSeconds)}</strong></span>
              </div>
            </div>

            {/* Score Ring */}
            <div className="shrink-0">
              <NeuRing
                percentage={scoreResults.accuracy}
                size={140}
                label="Score"
                sublabel={`${scoreResults.score}/${scoreResults.total}`}
              />
            </div>
          </div>

          {/* Equalizer Bars & Weak Area Hints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--neu-text-muted)] mb-3 font-mono">
                Per-Difficulty Performance Breakdown
              </h3>
              <NeuEqualizer items={scoreResults.equalizerItems} height={110} />
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--neu-text-muted)] mb-3 font-mono">
                Focus Areas & Insights
              </h3>
              <div className="p-4 rounded-xl neu-inset flex flex-col gap-3">
                {scoreResults.sortedWeak.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                      <AlertTriangle size={15} />
                      <span>Recommended Review Subtopics:</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs text-[var(--neu-text-secondary)] pl-4 list-disc">
                      {scoreResults.sortedWeak.slice(0, 3).map(([sub, errs]) => (
                        <li key={sub}>
                          <strong>{sub}</strong> ({errs} missed question{errs > 1 ? 's' : ''})
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--neu-green-tile-text)]">
                    <CheckCircle2 size={15} />
                    <span>Flawless run! All subtopics demonstrated mastery.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--neu-border)]">
            <span className="text-xs text-[var(--neu-text-muted)]">
              Use the question navigator below to inspect verified answers and explanations.
            </span>
            <NeuButton variant="primary" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
              Retry Quiz
            </NeuButton>
          </div>
        </NeuCard>
      )}

        {/* Main Question Card */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-6 border border-[var(--neu-border)]">
          {/* Question Header & Review Bookmark */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0">
                {currentIndex + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--neu-text-primary)] leading-snug">
                {currentQ.question}
              </h2>
            </div>

            <NeuIconButton
              size="sm"
              ariaLabel="Mark for review"
              active={isMarked}
              onClick={handleToggleReview}
            >
              <Star size={15} className={isMarked ? 'fill-[var(--neu-accent)] text-[var(--neu-accent)]' : ''} />
            </NeuIconButton>
          </div>

          {/* Code Snippet Box (if question contains code) */}
          {currentQ.codeSnippet && (
            <div
              className="rounded-2xl neu-inset p-5 border border-[var(--code-box-border)] overflow-x-auto"
              style={{
                backgroundColor: 'var(--code-box-bg)',
                borderColor: 'var(--code-box-border)',
              }}
            >
              <pre
                className="font-mono text-xs sm:text-sm font-medium leading-7"
                style={{ color: 'var(--code-box-text)' }}
              >
                <code>{currentQ.codeSnippet}</code>
              </pre>
            </div>
          )}

        {/* Answer selection pane */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--neu-border)] px-4 py-3 neu-inset">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-bold transition-[color,background-color,box-shadow] ${
              currentSelected !== undefined
                ? 'bg-[var(--neu-accent)] text-white shadow-[0_0_12px_var(--neu-accent-glow)]'
                : 'neu-raised text-[var(--neu-text-muted)]'
            }`}>
              {currentSelected !== undefined ? String.fromCharCode(65 + currentSelected) : '?'}
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[var(--neu-text-muted)]">
                Your selection
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[var(--neu-text-primary)]">
                {currentSelected !== undefined
                  ? `Option ${String.fromCharCode(65 + currentSelected)} saved`
                  : 'Choose one answer below'}
              </div>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            currentSelected !== undefined
              ? 'bg-[var(--neu-accent)]/10 text-[var(--neu-accent)]'
              : 'text-[var(--neu-text-muted)]'
          }`}>
            {currentSelected !== undefined ? 'Saved' : 'Not answered'}
          </span>
        </div>

        {/* 4 Options (Radio Style) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentQ.options.map((option, optIdx) => {
            const isChecked = currentSelected === optIdx;
            let feedback: 'correct' | 'wrong' | null = null;

            if (isSubmitted) {
              if (optIdx === currentQ.correctIndex) {
                feedback = 'correct';
              } else if (isChecked) {
                feedback = 'wrong';
              }
            }

            return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`group relative min-h-[78px] rounded-2xl border p-4 transition-[color,background-color,box-shadow,transform,border-color] duration-200 flex items-center justify-between cursor-pointer ${
                  isSubmitted
                    ? 'neu-raised border-transparent'
                    : isChecked
                        ? 'neu-inset border-[var(--neu-accent)]/60 shadow-[0_0_14px_var(--neu-accent-glow)]'
                        : 'neu-raised border-transparent hover:neu-raised-hover hover:-translate-y-0.5'
                  }`}
                >
                  <NeuRadio
                    checked={isChecked}
                    onChange={() => handleSelectOption(optIdx)}
                    disabled={isSubmitted}
                    feedback={feedback}
                    label={
                      <span className="flex items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-mono text-xs font-bold transition-[color,background-color,box-shadow] ${
                          isSubmitted && optIdx === currentQ.correctIndex
                            ? 'bg-[#0BDA51]/25 text-[var(--neu-green-tile-text)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.12)]'
                            : isSubmitted && isChecked
                              ? 'bg-rose-500/20 text-rose-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:text-rose-300'
                              : isChecked
                            ? 'bg-[var(--neu-accent)] text-white shadow-[0_0_10px_var(--neu-accent-glow)]'
                            : 'neu-inset text-[var(--neu-text-muted)] group-hover:text-[var(--neu-accent)]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className={`font-mono text-xs leading-relaxed sm:text-sm ${
                          isSubmitted && optIdx === currentQ.correctIndex
                            ? 'text-[var(--neu-green-tile-text)] font-semibold'
                            : isSubmitted && isChecked && optIdx !== currentQ.correctIndex
                            ? 'text-rose-700 dark:text-rose-300'
                            : 'text-[var(--neu-text-primary)]'
                        }`}>
                          {option.replace(/\.\s*$/, '')}
                        </span>
                      </span>
                    }
                  />

                  {isSubmitted && optIdx === currentQ.correctIndex && (
                    <span className="ml-2 flex items-center gap-1.5 rounded-full bg-[#0BDA51]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--neu-green-tile-text)]">
                      <CheckCircle2 size={16} />
                      Correct
                    </span>
                  )}
                  {isSubmitted && isChecked && optIdx !== currentQ.correctIndex && (
                    <span className="ml-2 flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300">
                      <XCircle size={16} />
                      Your answer
                    </span>
                  )}
                </div>
            );
          })}
        </div>

        {/* Review Mode: Detailed Explanation Callout */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-[var(--neu-surface)] border border-[var(--neu-accent)]/30 neu-raised flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[var(--neu-accent)]">
              <Lightbulb size={16} />
              <span>Answer explanation</span>
            </div>
            <div className="rounded-xl px-3 py-2 neu-inset text-xs font-mono text-[var(--neu-text-secondary)]">
              Correct option: <strong className="text-[var(--neu-text-primary)]">{String.fromCharCode(65 + currentQ.correctIndex)}</strong>
            </div>
            <p className="text-xs sm:text-sm text-[var(--neu-text-primary)] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation & Submit Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--neu-border)]">
          <NeuButton
            variant="secondary"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            icon={<ChevronLeft size={16} />}
          >
            Previous
          </NeuButton>

          {!isSubmitted ? (
            <NeuButton
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              icon={<ClipboardCheck size={15} />}
            >
              Submit Test ({Object.keys(selectedAnswers).length}/{questions.length})
            </NeuButton>
          ) : (
            <span className="text-xs font-mono text-[var(--neu-text-muted)]">
              Reviewing Question {currentIndex + 1}
            </span>
          )}

          <NeuButton
            variant="secondary"
            size="sm"
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            icon={<ChevronRight size={16} />}
            iconPosition="right"
          >
            Next
          </NeuButton>
        </div>
      </NeuCard>

      {/* Question Palette Navigator */}
      <NeuCard className="p-5 sm:p-6 border border-[var(--neu-border)]">
        <div className="flex flex-col gap-4 border-b border-[var(--neu-border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl neu-inset">
              <HelpCircle size={18} className="text-[var(--neu-accent)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--neu-text-primary)] sm:text-base">Question navigator</h3>
              <p className="mt-0.5 text-[11px] text-[var(--neu-text-muted)]">
                Jump to any question and track your attempt
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--neu-text-muted)]">
            <span className="rounded-full px-2.5 py-1 neu-inset text-[var(--neu-accent)]">{answeredCount} answered</span>
            {reviewCount > 0 && (
              <span className="rounded-full px-2.5 py-1 neu-inset text-amber-500">{reviewCount} review</span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--neu-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--neu-accent)] shadow-[0_0_6px_var(--neu-accent-glow)]" />
            Answered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
            Review
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full neu-raised" />
            Unanswered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-[var(--neu-accent)]" />
            Current
          </span>
        </div>

        <div className="mt-4 grid grid-cols-10 gap-1.5 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isRev = markedForReview[idx];
            const isCur = idx === currentIndex;

            let paletteStyle = 'neu-raised text-[var(--neu-text-secondary)] hover:-translate-y-0.5 hover:text-[var(--neu-accent)] hover:shadow-[6px_6px_12px_var(--neu-shadow-dark),-4px_-4px_10px_var(--neu-shadow-light)]';
            if (isSubmitted) {
              const isCorrect = selectedAnswers[idx] === q.correctIndex;
              paletteStyle = isCorrect
                ? 'bg-[#0BDA51]/25 text-[var(--neu-green-tile-text)] font-bold border border-[#0BDA51]/60 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.12),0_0_4px_rgba(11,218,81,0.2)]'
                : 'bg-red-500/25 text-rose-800 dark:text-rose-300 font-bold border border-red-500/60 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1),0_0_4px_rgba(239,68,68,0.18)]';
            } else if (isCur) {
              paletteStyle = 'neu-inset text-[var(--neu-accent)] border border-[var(--neu-accent)]/80 shadow-[0_0_10px_var(--neu-accent-glow)] font-bold';
            } else if (isRev) {
              paletteStyle = 'neu-inset text-amber-400 border border-amber-400/60 shadow-[0_0_7px_rgba(251,191,36,0.2)]';
            } else if (isAnswered) {
              paletteStyle = 'bg-[var(--neu-accent)] text-white border border-[var(--neu-accent-light)]/60 shadow-[3px_3px_8px_var(--neu-shadow-dark),-3px_-3px_7px_var(--neu-shadow-light),0_0_8px_var(--neu-accent-glow)] font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-7 rounded-lg text-[10px] font-mono font-semibold transition-[color,background-color,box-shadow,transform] duration-150 flex items-center justify-center cursor-pointer ${paletteStyle}`}
                title={`Question ${idx + 1}`}
                aria-label={`Go to question ${idx + 1}`}
                aria-current={isCur ? 'step' : undefined}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </NeuCard>
    </div>
  );
};
