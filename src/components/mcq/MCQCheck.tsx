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
  Send,
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
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF7A1A', '#FF9A45', '#22c55e', '#ffffff'],
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

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl neu-raised">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--neu-accent)]">
              QUESTION {currentIndex + 1}
            </span>
            <span className="text-xs text-[var(--neu-text-muted)]">OF {questions.length}</span>
          </div>
          <NeuBadge variant={currentQ.difficulty}>{currentQ.difficulty.toUpperCase()}</NeuBadge>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Toggle */}
          <div className="flex items-center gap-2">
            <Timer size={16} className={timerEnabled ? 'text-[var(--neu-accent)] animate-spin-slow' : 'text-[var(--neu-text-muted)]'} />
            <NeuToggle
              checked={timerEnabled}
              onChange={setTimerEnabled}
              label={timerEnabled ? formatTime(elapsedSeconds) : 'Timer'}
              size="sm"
            />
          </div>

          {/* Shuffle Button */}
          <NeuIconButton
            size="sm"
            ariaLabel="Shuffle Questions"
            active={isShuffled}
            onClick={handleShuffle}
            disabled={isSubmitted}
          >
            <Shuffle size={14} />
          </NeuIconButton>

          {/* Reset Attempt */}
          <NeuIconButton
            size="sm"
            ariaLabel="Reset Attempt"
            onClick={handleReset}
          >
            <RotateCcw size={14} />
          </NeuIconButton>
        </div>
      </div>

      {/* RESULTS SCREEN (Rendered if submitted) */}
      {isSubmitted && scoreResults && (
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
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
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
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
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Question Header & Review Bookmark */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full neu-inset flex items-center justify-center font-mono font-bold text-xs text-[var(--neu-accent)] shrink-0">
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
              className="rounded-xl neu-inset p-4.5 border overflow-x-auto"
              style={{
                backgroundColor: 'var(--code-box-bg)',
                borderColor: 'var(--code-box-border)',
              }}
            >
              <pre
                className="font-mono text-xs sm:text-sm font-medium leading-relaxed"
                style={{ color: 'var(--code-box-text)' }}
              >
                <code>{currentQ.codeSnippet}</code>
              </pre>
            </div>
          )}

        {/* 4 Options (Radio Style) */}
        <div className="flex flex-col gap-3">
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
                  className={`p-4 rounded-xl transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isChecked
                      ? 'neu-inset border border-[var(--neu-accent)]/40 shadow-[0_0_8px_var(--neu-accent-glow)]'
                      : 'neu-raised hover:neu-raised-hover'
                  } ${
                    isSubmitted && optIdx === currentQ.correctIndex
                      ? 'border border-emerald-500/60 bg-emerald-500/10 dark:bg-emerald-500/5'
                      : isSubmitted && isChecked && optIdx !== currentQ.correctIndex
                      ? 'border border-rose-500/60 bg-rose-500/10 dark:bg-rose-500/5'
                      : ''
                  }`}
                >
                  <NeuRadio
                    checked={isChecked}
                    onChange={() => handleSelectOption(optIdx)}
                    disabled={isSubmitted}
                    feedback={feedback}
                    label={
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[var(--neu-text-muted)] font-semibold">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className={`font-mono text-xs sm:text-sm ${
                          isSubmitted && optIdx === currentQ.correctIndex
                            ? 'text-emerald-700 dark:text-emerald-300 font-semibold'
                            : isSubmitted && isChecked && optIdx !== currentQ.correctIndex
                            ? 'text-rose-700 dark:text-rose-300'
                            : 'text-[var(--neu-text-primary)]'
                        }`}>
                          {option}
                        </span>
                      </span>
                    }
                  />

                  {isSubmitted && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isSubmitted && isChecked && optIdx !== currentQ.correctIndex && (
                    <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
                  )}
                </div>
            );
          })}
        </div>

        {/* Review Mode: Detailed Explanation Callout */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-[var(--neu-surface)] border border-[var(--neu-accent)]/30 neu-raised flex flex-col gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--neu-accent)]">
              <Lightbulb size={16} />
              <span>Correct Answer: Option {String.fromCharCode(65 + currentQ.correctIndex)}</span>
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
              icon={<Send size={15} />}
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

      {/* 50-Question Palette Navigator */}
      <NeuCard className="p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--neu-border)]">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--neu-text-primary)]">
            <HelpCircle size={16} className="text-[var(--neu-accent)]" />
            <span>Question Palette (1 - {questions.length})</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--neu-text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--neu-accent)]" />
              <span>Answered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Review</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-25 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isRev = markedForReview[idx];
            const isCur = idx === currentIndex;

            let paletteStyle = 'neu-raised text-[var(--neu-text-secondary)]';
            if (isSubmitted) {
              const isCorrect = selectedAnswers[idx] === q.correctIndex;
              paletteStyle = isCorrect
                ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-500/40 shadow-[0_0_6px_rgba(34,197,94,0.4)]'
                : 'bg-red-500/20 text-rose-800 dark:text-rose-400 font-bold border border-red-500/40';
            } else if (isCur) {
              paletteStyle = 'neu-inset text-[var(--neu-accent)] border border-[var(--neu-accent)]/80 shadow-[0_0_8px_var(--neu-accent-glow)] font-bold';
            } else if (isRev) {
              paletteStyle = 'neu-inset text-amber-400 border border-amber-400/50';
            } else if (isAnswered) {
              paletteStyle = 'neu-inset text-[var(--neu-accent)] font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-8 rounded-lg text-xs font-mono font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer ${paletteStyle}`}
                title={`Question ${idx + 1}`}
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
