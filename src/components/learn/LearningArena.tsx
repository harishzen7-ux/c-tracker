import React, { useState, useEffect } from 'react';
import { Check, Copy, CheckCircle, BookOpen, AlertCircle, Lightbulb, ChevronRight, ChevronLeft } from 'lucide-react';
import { Lesson, LessonSection } from '../../types';
import { NeuCard } from '../common/NeuCard';
import { NeuToggle } from '../common/NeuToggle';
import { NeuButton } from '../common/NeuButton';
import { NeuIconButton } from '../common/NeuIconButton';
import { storageService } from '../../services/storageService';

interface LearningArenaProps {
  lesson: Lesson;
  topicId: string;
  onProgressUpdate: () => void;
}

export const LearningArena: React.FC<LearningArenaProps> = ({
  lesson,
  topicId,
  onProgressUpdate,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(lesson.sections[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active section data
  const currentSectionIndex = lesson.sections.findIndex((s) => s.id === activeSectionId);
  const currentSection = lesson.sections[currentSectionIndex] || lesson.sections[0];

  const isCompleted = storageService.isLessonCompleted(topicId, currentSection.id);

  const handleToggleCompleted = () => {
    storageService.toggleLessonCompleted(topicId, currentSection.id);
    onProgressUpdate();
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setActiveSectionId(lesson.sections[currentSectionIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < lesson.sections.length - 1) {
      setActiveSectionId(lesson.sections[currentSectionIndex + 1].id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Table of Contents with scroll-spy style */}
      <aside className="lg:col-span-4 sticky top-24">
        <NeuCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--neu-border)] mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--neu-text-primary)]">
              <BookOpen size={16} className="text-[var(--neu-accent)]" />
              <span>Table of Contents</span>
            </div>
            <span className="text-xs font-mono text-[var(--neu-accent)]">
              {lesson.sections.filter((s) => storageService.isLessonCompleted(topicId, s.id)).length}/
              {lesson.sections.length} Done
            </span>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Lesson sections">
            {lesson.sections.map((sec, idx) => {
              const active = sec.id === activeSectionId;
              const done = storageService.isLessonCompleted(topicId, sec.id);

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium cursor-pointer ${
                    active
                      ? 'neu-inset text-[var(--neu-accent)] font-semibold border-l-2 border-[var(--neu-accent)]'
                      : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className="font-mono text-xs opacity-60">0{idx + 1}.</span>
                    <span className="truncate">{sec.title}</span>
                  </span>
                  {done ? (
                    <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[var(--neu-border)] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </NeuCard>
      </aside>

      {/* Main Lesson Content */}
      <main className="lg:col-span-8 flex flex-col gap-6">
        {currentSection && (
          <NeuCard className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Header: Title + Completion Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--neu-border)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--neu-accent)] font-semibold">
                  Section 0{currentSectionIndex + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--neu-text-primary)] mt-1">
                  {currentSection.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <NeuToggle
                  checked={isCompleted}
                  onChange={handleToggleCompleted}
                  label={isCompleted ? 'Completed' : 'Mark as completed'}
                />
              </div>
            </div>

            {/* Concept Explanation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--neu-text-muted)] mb-2 font-mono">
                Concept & Mechanism
              </h3>
              <p className="text-sm sm:text-base text-[var(--neu-text-primary)] leading-relaxed">
                {currentSection.concept}
              </p>
            </div>

            {/* Syntax Box */}
            {currentSection.syntax && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--neu-text-muted)] mb-2 font-mono">
                  Syntax Declaration
                </h3>
                <div
                  className="p-4 rounded-xl neu-inset font-mono text-xs sm:text-sm font-semibold border overflow-x-auto"
                  style={{
                    backgroundColor: 'var(--code-box-bg)',
                    borderColor: 'var(--code-box-border)',
                    color: 'var(--neu-accent)',
                  }}
                >
                  <code>{currentSection.syntax}</code>
                </div>
              </div>
            )}

            {/* Annotated C Code Example with Copy Button */}
            {currentSection.codeSnippet && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--neu-text-muted)] font-mono">
                    Standard C99 Annotated Code
                  </h3>
                  <NeuIconButton
                    size="sm"
                    ariaLabel="Copy code snippet"
                    onClick={() => handleCopyCode(currentSection.codeSnippet!, currentSection.id)}
                  >
                    {copiedId === currentSection.id ? (
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </NeuIconButton>
                </div>

                <div
                  className="relative rounded-2xl neu-inset p-5 border overflow-x-auto"
                  style={{
                    backgroundColor: 'var(--code-box-bg)',
                    borderColor: 'var(--code-box-border)',
                  }}
                >
                  <pre
                    className="font-mono text-xs sm:text-sm font-medium leading-relaxed"
                    style={{ color: 'var(--code-box-text)' }}
                  >
                    <code>{currentSection.codeSnippet}</code>
                  </pre>
                </div>

                {currentSection.annotation && (
                  <p className="text-xs text-[var(--neu-text-secondary)] mt-2 font-medium italic flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)] shrink-0" />
                    <span>{currentSection.annotation}</span>
                  </p>
                )}
              </div>
            )}

            {/* Common Mistakes */}
            {currentSection.commonMistakes && currentSection.commonMistakes.length > 0 && (
              <div
                className="p-4 rounded-xl border neu-inset"
                style={{
                  backgroundColor: 'var(--callout-red-bg)',
                  borderColor: 'var(--callout-red-border)',
                }}
              >
                <div
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2"
                  style={{ color: 'var(--callout-red-title)' }}
                >
                  <AlertCircle size={16} />
                  <span>Common Pitfalls to Avoid</span>
                </div>
                <ul
                  className="flex flex-col gap-1.5 text-xs sm:text-sm pl-5 list-disc"
                  style={{ color: 'var(--callout-red-text)' }}
                >
                  {currentSection.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Recap Box */}
            {currentSection.quickRecap && currentSection.quickRecap.length > 0 && (
              <div
                className="p-4 rounded-xl border neu-inset"
                style={{
                  backgroundColor: 'var(--callout-amber-bg)',
                  borderColor: 'var(--callout-amber-border)',
                }}
              >
                <div
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2"
                  style={{ color: 'var(--callout-amber-title)' }}
                >
                  <Lightbulb size={16} />
                  <span>Quick Recap</span>
                </div>
                <ul
                  className="flex flex-col gap-1.5 text-xs sm:text-sm pl-5 list-disc"
                  style={{ color: 'var(--callout-amber-text)' }}
                >
                  {currentSection.quickRecap.map((recap, i) => (
                    <li key={i}>{recap}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--neu-border)]">
              <NeuButton
                variant="secondary"
                size="sm"
                disabled={currentSectionIndex === 0}
                onClick={handlePrev}
                icon={<ChevronLeft size={16} />}
              >
                Previous
              </NeuButton>

              <span className="text-xs font-mono text-[var(--neu-text-muted)]">
                {currentSectionIndex + 1} of {lesson.sections.length}
              </span>

              <NeuButton
                variant={currentSectionIndex === lesson.sections.length - 1 ? 'primary' : 'secondary'}
                size="sm"
                disabled={currentSectionIndex === lesson.sections.length - 1}
                onClick={handleNext}
                icon={<ChevronRight size={16} />}
                iconPosition="right"
              >
                Next Section
              </NeuButton>
            </div>
          </NeuCard>
        )}
      </main>
    </div>
  );
};
