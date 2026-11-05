import React, { useState } from 'react';
import { BookOpen, Check, CheckCircle, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { Lesson, OutputPredictionQuestion } from '../../types';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';
import { storageService } from '../../services/storageService';

interface LearningArenaProps {
  lesson: Lesson;
  topicId: string;
  onProgressUpdate: () => void;
}

const PredictionCard: React.FC<{
  question: OutputPredictionQuestion;
  id: string;
}> = ({ question, id }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const answeredCorrectly = selected === question.correctIndex;

  return (
    <div className="rounded-2xl border border-[var(--neu-border)] p-4 sm:p-5">
      <h4 className="font-semibold text-[var(--neu-text-primary)]">{id}</h4>
      <pre className="mt-3 overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed"
        style={{ backgroundColor: 'var(--code-box-bg)', color: 'var(--code-box-text)', borderColor: 'var(--code-box-border)' }}>
        <code>{question.code}</code>
      </pre>
      <p className="mt-3 text-sm font-medium">What will be the output?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {question.options.map((option, index) => (
          <button
            type="button"
            key={option}
            onClick={() => setSelected(index)}
            className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
              selected === index
                ? index === question.correctIndex
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-rose-500/50 bg-rose-500/10'
                : 'border-[var(--neu-border)] hover:border-[var(--neu-accent)]/50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className={`mt-3 text-sm ${answeredCorrectly ? 'text-emerald-500' : 'text-rose-500'}`}>
          {answeredCorrectly ? 'Correct. ' : 'Not quite. '}
          <span className="text-[var(--neu-text-secondary)]">{question.explanation}</span>
        </p>
      )}
    </div>
  );
};

export const LearningArena: React.FC<LearningArenaProps> = ({
  lesson,
  topicId,
  onProgressUpdate,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const currentSection = lesson.sections[activeSectionIndex];
  const completedCount = lesson.sections.filter((section) =>
    storageService.isLessonCompleted(topicId, section.id)
  ).length;
  const isCompleted = currentSection
    ? storageService.isLessonCompleted(topicId, currentSection.id)
    : false;

  const toggleCompleted = () => {
    if (!currentSection) return;
    storageService.toggleLessonCompleted(topicId, currentSection.id);
    onProgressUpdate();
  };

  return (
    <div className="flex flex-col gap-6">
      <NeuCard className="p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--neu-accent)]">
              <BookOpen size={17} />
              <span>Start Here</span>
            </div>
            <h2 className="text-xl font-bold sm:text-2xl">{lesson.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--neu-text-secondary)]">{lesson.startHere}</p>
          </div>
          <div className="min-w-[150px]">
            <div className="mb-2 flex justify-between text-xs text-[var(--neu-text-secondary)]">
              <span>Learning path</span>
              <span>{completedCount}/{lesson.sections.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--neu-base)]">
              <div
                className="h-full rounded-full bg-[var(--neu-accent)] transition-[width]"
                style={{ width: `${lesson.sections.length ? (completedCount / lesson.sections.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(['Foundation', 'Core Concepts', 'Practice', 'Intermediate'] as const).map((level, index) => (
            <button
              type="button"
              key={level}
              onClick={() => setActiveSectionIndex(Math.min(index, lesson.sections.length - 1))}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-medium sm:text-sm ${
                currentSection?.level === level
                  ? 'border-[var(--neu-accent)]/60 bg-[var(--neu-accent)]/10 text-[var(--neu-accent)]'
                  : 'border-[var(--neu-border)] text-[var(--neu-text-secondary)] hover:border-[var(--neu-accent)]/40'
              }`}
            >
              <span className="block text-[10px] opacity-70">0{index + 1}</span>
              {level}
            </button>
          ))}
        </div>
      </NeuCard>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
        <aside className="lg:sticky lg:top-24">
          <NeuCard className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Concepts</h3>
              <span className="text-xs text-[var(--neu-text-muted)]">{completedCount}/{lesson.sections.length} complete</span>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Learning concepts">
              {lesson.sections.map((section, index) => {
                const done = storageService.isLessonCompleted(topicId, section.id);
                return (
                  <button
                    type="button"
                    key={section.id}
                    onClick={() => setActiveSectionIndex(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                      index === activeSectionIndex
                        ? 'neu-inset text-[var(--neu-accent)]'
                        : 'text-[var(--neu-text-secondary)] hover:bg-white/5'
                    }`}
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-wide opacity-60">
                        {section.level || 'Concept'} · 0{index + 1}
                      </span>
                      <span className="mt-1 block font-medium">{section.title.replace(/^(Foundation|Core Concepts|Practice|Intermediate) · /, '')}</span>
                    </span>
                    {done && <CheckCircle size={16} className="shrink-0 text-emerald-500" />}
                  </button>
                );
              })}
            </nav>
          </NeuCard>
        </aside>

        {currentSection && (
          <main className="min-w-0">
            <NeuCard className="flex flex-col gap-5 p-5 sm:p-7">
              <div className="flex flex-col gap-3 border-b border-[var(--neu-border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neu-accent)]">
                    {currentSection.level} · Concept {activeSectionIndex + 1} of {lesson.sections.length}
                  </span>
                  <h2 className="mt-1 text-xl font-bold">{currentSection.title.replace(/^(Foundation|Core Concepts|Practice|Intermediate) · /, '')}</h2>
                </div>
                <NeuButton variant={isCompleted ? 'secondary' : 'primary'} size="sm" onClick={toggleCompleted}
                  icon={isCompleted ? <CheckCircle size={15} /> : <Check size={15} />}>
                  {isCompleted ? 'Completed' : 'Mark complete'}
                </NeuButton>
              </div>

              <section>
                <h3 className="mb-2 text-sm font-semibold">What it means</h3>
                <p className="text-sm leading-6 text-[var(--neu-text-secondary)]">{currentSection.concept}</p>
              </section>

              {currentSection.syntax && (
                <section>
                  <h3 className="mb-2 text-sm font-semibold">Syntax</h3>
                  <pre className="overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed sm:text-sm"
                    style={{ backgroundColor: 'var(--code-box-bg)', color: 'var(--code-box-text)', borderColor: 'var(--code-box-border)' }}>
                    <code>{currentSection.syntax}</code>
                  </pre>
                </section>
              )}

              {currentSection.codeSnippet && (
                <section>
                  <h3 className="mb-2 text-sm font-semibold">Example</h3>
                  <pre className="overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed sm:text-sm"
                    style={{ backgroundColor: 'var(--code-box-bg)', color: 'var(--code-box-text)', borderColor: 'var(--code-box-border)' }}>
                    <code>{currentSection.codeSnippet}</code>
                  </pre>
                </section>
              )}

              {currentSection.keyPoint && (
                <div className="flex gap-2 rounded-xl border p-3 text-sm"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--callout-amber-bg) 50%, transparent)', borderColor: 'var(--callout-amber-border)', color: 'var(--callout-amber-text)' }}>
                  <Lightbulb size={17} className="mt-0.5 shrink-0" />
                  <span><strong>Key point:</strong> {currentSection.keyPoint}</span>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-[var(--neu-border)] pt-4">
                <NeuButton variant="secondary" size="sm" disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex((index) => Math.max(0, index - 1))}
                  icon={<ChevronLeft size={16} />}>Previous</NeuButton>
                <span className="text-xs text-[var(--neu-text-muted)]">{activeSectionIndex + 1} / {lesson.sections.length}</span>
                <NeuButton variant="secondary" size="sm" disabled={activeSectionIndex === lesson.sections.length - 1}
                  onClick={() => setActiveSectionIndex((index) => Math.min(lesson.sections.length - 1, index + 1))}
                  icon={<ChevronRight size={16} />} iconPosition="right">Next concept</NeuButton>
              </div>
            </NeuCard>
          </main>
        )}
      </div>

      {lesson.examples && (
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-bold">Learn by Example</h2>
            <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">Understand → Observe → Try → Practice → Apply</p>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {lesson.examples.map((example) => (
              <NeuCard key={example.title} className="flex min-w-0 flex-col gap-3 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{example.title}</h3>
                  <span className="rounded-full bg-[var(--neu-base)] px-2.5 py-1 text-[11px] text-[var(--neu-text-secondary)]">{example.difficulty}</span>
                </div>
                <p className="text-sm"><strong>Problem:</strong> {example.problem}</p>
                <p className="text-sm text-[var(--neu-text-secondary)]"><strong>Approach:</strong> {example.approach}</p>
                <pre className="overflow-x-auto rounded-xl border p-3 text-xs leading-relaxed"
                  style={{ backgroundColor: 'var(--code-box-bg)', color: 'var(--code-box-text)', borderColor: 'var(--code-box-border)' }}>
                  <code>{example.code}</code>
                </pre>
                <p className="whitespace-pre-wrap text-xs text-[var(--neu-text-secondary)]"><strong>Expected output:</strong>{'\n'}{example.expectedOutput}</p>
                <p className="text-xs leading-5 text-[var(--neu-text-secondary)]">{example.explanation}</p>
              </NeuCard>
            ))}
          </div>
        </section>
      )}

      {lesson.practice && (
        <NeuCard className="p-5 sm:p-6">
          <h2 className="text-lg font-bold">Practice Zone</h2>
          <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">Try a small task at each level. Open “Try With Code” to write and run a solution.</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {Object.entries(lesson.practice).map(([level, questions]) => (
              <div key={level} className="rounded-xl border border-[var(--neu-border)] p-4">
                <h3 className="mb-3 font-semibold capitalize">{level === 'beginner' ? '🟢 Easy' : level === 'easy' ? '🟡 Semi-moderate' : '🟠 Moderate'}</h3>
                <ul className="flex flex-col gap-3">
                  {questions.map((question) => (
                    <li key={question.title} className="text-sm">
                      <span className="font-medium">{question.title}</span>
                      <p className="mt-1 text-xs leading-5 text-[var(--neu-text-secondary)]">{question.prompt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </NeuCard>
      )}

      {lesson.outputPredictions && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Output Prediction</h2>
          <div className="grid gap-4 xl:grid-cols-2">
            {lesson.outputPredictions.map((question, index) => (
              <PredictionCard key={`prediction-${index}`} question={question} id={`Question ${index + 1}`} />
            ))}
          </div>
        </section>
      )}

      {lesson.commonMistakes && (
        <NeuCard className="p-5 sm:p-6">
          <h2 className="text-lg font-bold">Common Mistakes</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {lesson.commonMistakes.map((item) => (
              <div key={item.mistake} className="rounded-xl border border-[var(--neu-border)] p-4">
                <h3 className="text-sm font-semibold">{item.mistake}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--neu-text-secondary)]"><strong>Why it happens:</strong> {item.why}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--neu-text-secondary)]"><strong>Correct approach:</strong> {item.correctApproach}</p>
              </div>
            ))}
          </div>
        </NeuCard>
      )}

      {lesson.quickCheck && (
        <NeuCard className="p-5 sm:p-6">
          <h2 className="text-lg font-bold">Quick Check</h2>
          <div className="mt-4 flex flex-col gap-4">
            {lesson.quickCheck.questions.map((question, questionIndex) => {
              const answer = answers[questionIndex];
              return (
                <div key={question.question} className="rounded-xl border border-[var(--neu-border)] p-4">
                  <p className="text-sm font-medium">{questionIndex + 1}. {question.question}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <button key={option} type="button" onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                        className={`rounded-lg border px-3 py-2 text-left text-sm ${
                          answer === optionIndex
                            ? optionIndex === question.correctIndex ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-rose-500/50 bg-rose-500/10'
                            : 'border-[var(--neu-border)] hover:border-[var(--neu-accent)]/50'
                        }`}>{option}</button>
                    ))}
                  </div>
                  {answer !== undefined && (
                    <p className="mt-2 text-xs text-[var(--neu-text-secondary)]">
                      {answer === question.correctIndex ? 'Correct. ' : 'Review this one. '}
                      {question.explanation}
                    </p>
                  )}
                </div>
              );
            })}
            <PredictionCard question={lesson.quickCheck.outputPrediction} id="Output prediction" />
            <div className="rounded-xl border border-[var(--neu-border)] p-4">
              <h3 className="text-sm font-semibold">Small coding question</h3>
              <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">{lesson.quickCheck.codingQuestion}</p>
            </div>
          </div>
        </NeuCard>
      )}

      {lesson.completion && (
        <NeuCard className="p-5 sm:p-6">
          <h2 className="text-lg font-bold">Topic Complete</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">You learned</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-[var(--neu-text-secondary)]">
                {lesson.completion.learned.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">You can now</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-[var(--neu-text-secondary)]">
                {lesson.completion.canNow.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <p className="mt-5 border-t border-[var(--neu-border)] pt-4 text-sm">
            <strong>Next Step → Continue Learning</strong>
            <span className="mt-1 block text-[var(--neu-text-secondary)]">{lesson.completion.nextStep}</span>
          </p>
        </NeuCard>
      )}
    </div>
  );
};
