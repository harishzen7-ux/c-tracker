import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Wrench,
} from 'lucide-react';
import {
  ConceptLearningProgress,
  LearningStage,
  Lesson,
  KnowledgeCheckQuestion,
  OutputPredictionQuestion,
} from '../../types';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';
import { storageService } from '../../services/storageService';

interface LearningArenaProps {
  lesson: Lesson;
  topicId: string;
  onProgressUpdate: () => void;
}

const stages: Array<{ id: LearningStage; label: string }> = [
  { id: 'understand', label: 'Understand' },
  { id: 'learn', label: 'Learn' },
  { id: 'explore', label: 'Explore' },
  { id: 'practice', label: 'Practice' },
  { id: 'check', label: 'Check' },
  { id: 'master', label: 'Master' },
];
const stageIds = new Set<LearningStage>(stages.map((stage) => stage.id));

const isStageAvailable = (
  progress: ConceptLearningProgress,
  stage: string | null,
): stage is LearningStage => {
  if (!stage || !stageIds.has(stage as LearningStage)) return false;
  const stageIndex = stages.findIndex((item) => item.id === stage);
  return stageIndex === 0 || !!progress.completedStages[stages[stageIndex - 1].id];
};

const defaultConceptProgress = (): ConceptLearningProgress => ({
  completedStages: {},
  currentStage: 'understand',
  bestCheckScore: 0,
  mastered: false,
});

type ArenaCheckQuestion = KnowledgeCheckQuestion & {
  code?: string;
};

const conceptOutputPredictions: Record<string, OutputPredictionQuestion> = {
  'sec-escape-sequences': {
    code: '#include <stdio.h>\nint main(void) {\n    printf("A\\nB");\n    return 0;\n}',
    options: ['A and B on one line', 'A, then B on the next line', 'A\\nB printed literally', 'No output'],
    correctIndex: 1,
    explanation: 'The escape sequence \\n moves the second letter to the next line.',
  },
  'sec-precision': {
    code: '#include <stdio.h>\nint main(void) {\n    float average = (7.0f + 8.0f) / 2.0f;\n    printf("%.2f\\n", average);\n    return 0;\n}',
    options: ['7.00', '7.50', '8.00', '15.00'],
    correctIndex: 1,
    explanation: '7.0 plus 8.0 is 15.0; dividing by 2.0 gives 7.5, printed as 7.50.',
  },
  'sec-op-assignment': {
    code: '#include <stdio.h>\nint main(void) {\n    int points = 10;\n    points += 3;\n    printf("%d\\n", points);\n    return 0;\n}',
    options: ['10', '3', '13', '103'],
    correctIndex: 2,
    explanation: 'points += 3 means points = points + 3, so the result is 13.',
  },
  'sec-op-expressions': {
    code: '#include <stdio.h>\nint main(void) {\n    int total = 7;\n    printf("%.1f\\n", (float)total / 2);\n    return 0;\n}',
    options: ['3', '3.5', '7.2', '14'],
    correctIndex: 1,
    explanation: 'Casting total to float makes the division produce the decimal result 3.5.',
  },
  'sec-dm-switch': {
    code: '#include <stdio.h>\nint main(void) {\n    int choice = 2;\n    switch (choice) {\n        case 1: printf("Start"); break;\n        case 2: printf("Settings"); break;\n        default: printf("Unknown");\n    }\n    return 0;\n}',
    options: ['Start', 'Settings', 'Unknown', 'No output'],
    correctIndex: 1,
    explanation: 'choice is 2, so the second case prints Settings and break ends the switch.',
  },
  'sec-dm-ternary': {
    code: '#include <stdio.h>\nint main(void) {\n    int first = 12;\n    int second = 9;\n    printf("%d\\n", (first > second) ? first : second);\n    return 0;\n}',
    options: ['9', '12', '21', '0'],
    correctIndex: 1,
    explanation: '12 is greater than 9, so the true value, first, is selected.',
  },
  'sec-loop-controls': {
    code: '#include <stdio.h>\nint main(void) {\n    for (int number = 1; number <= 5; number++) {\n        if (number == 3) continue;\n        printf("%d ", number);\n    }\n    return 0;\n}',
    options: ['1 2 3 4 5', '1 2 4 5', '3', '1 2'],
    correctIndex: 1,
    explanation: 'continue skips the iteration where number is 3, so 1, 2, 4, and 5 are printed.',
  },
  'sec-loop-nested': {
    code: '#include <stdio.h>\nint main(void) {\n    for (int row = 1; row <= 2; row++) {\n        for (int column = 1; column <= 3; column++) printf("* ");\n        printf("\\n");\n    }\n    return 0;\n}',
    options: ['One row of three stars', 'Two rows of three stars', 'Three rows of two stars', 'Six rows of one star'],
    correctIndex: 1,
    explanation: 'The inner loop prints three stars for each of the two outer-loop rows.',
  },
};

const getResumeSectionIndex = (lesson: Lesson, topicId: string): number => {
  const firstUnmastered = lesson.sections.findIndex(
    (section) => !storageService.getConceptLearningProgress(topicId, section.id).mastered,
  );
  return firstUnmastered === -1
    ? Math.max(lesson.sections.length - 1, 0)
    : firstUnmastered;
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre
    className="overflow-x-auto rounded-2xl border p-4 text-xs leading-6 sm:text-sm"
    style={{
      backgroundColor: 'var(--code-box-bg)',
      color: 'var(--code-box-text)',
      borderColor: 'var(--code-box-border)',
    }}
  >
    <code>{code}</code>
  </pre>
);

const StageIcon: React.FC<{ stage: LearningStage; complete: boolean; locked?: boolean }> = ({
  stage,
  complete,
  locked = false,
}) => {
  if (locked) return <LockKeyhole size={14} />;
  if (complete) return <Check size={14} />;
  if (stage === 'understand') return <Lightbulb size={14} />;
  if (stage === 'explore') return <Eye size={14} />;
  if (stage === 'practice') return <Wrench size={14} />;
  if (stage === 'check') return <Flag size={14} />;
  return <CheckCircle2 size={14} />;
};

const AnswerButton: React.FC<{
  label: string;
  selected: boolean;
  correct?: boolean;
  disabled?: boolean;
  onClick: () => void;
}> = ({ label, selected, correct, disabled = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={`rounded-xl px-3 py-2.5 text-left text-sm transition-[color,background-color,box-shadow,transform] ${
      selected
        ? correct
          ? 'neu-inset text-[var(--neu-green-tile-text)]'
          : 'neu-inset text-rose-600 dark:text-rose-400'
        : 'neu-raised text-[var(--neu-text-secondary)] hover:text-[var(--neu-accent)] active:neu-inset'
    } ${disabled ? 'cursor-not-allowed opacity-75' : ''}`}
  >
    {label}
  </button>
);

export const LearningArena: React.FC<LearningArenaProps> = ({
  lesson,
  topicId,
  onProgressUpdate,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedConcept = Number(searchParams.get('concept'));
  const requestedConceptIndex = Number.isInteger(requestedConcept)
    && requestedConcept >= 0
    && requestedConcept < lesson.sections.length
    ? requestedConcept
    : getResumeSectionIndex(lesson, topicId);
  const requestedStage = searchParams.get('stage');
  const requestedConceptProgress = storageService.getConceptLearningProgress(
    topicId,
    lesson.sections[requestedConceptIndex]?.id ?? '',
  );
  const initialStage = isStageAvailable(requestedConceptProgress, requestedStage)
    ? requestedStage
    : requestedConceptProgress.currentStage;
  const [activeSectionIndex, setActiveSectionIndex] = useState(requestedConceptIndex);
  const [activeStage, setActiveStage] = useState<LearningStage>(
    initialStage,
  );
  const [progressVersion, setProgressVersion] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [exploreAnswer, setExploreAnswer] = useState<number | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [revealedTheory, setRevealedTheory] = useState<Record<string, boolean>>({});
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState<Record<number, number>>({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  const currentSection = lesson.sections[activeSectionIndex];
  const sectionProgress = useMemo(
    () => lesson.sections.map((section) => storageService.getConceptLearningProgress(topicId, section.id)),
    [lesson.sections, progressVersion, topicId],
  );
  const conceptProgress = useMemo(
    () => currentSection
      ? storageService.getConceptLearningProgress(topicId, currentSection.id)
      : defaultConceptProgress(),
    [currentSection, progressVersion, topicId],
  );
  const completed = conceptProgress.completedStages;
  const progressPercent = Math.round(
    (stages.filter((stage) => completed[stage.id]).length / stages.length) * 100,
  );
  const previousMastered = activeSectionIndex === 0 || !!sectionProgress[activeSectionIndex - 1]?.mastered;
  const isLocked = !previousMastered;
  const canAdvanceToNextConcept = activeSectionIndex < lesson.sections.length - 1
    && conceptProgress.mastered;
  const prediction: OutputPredictionQuestion | undefined = useMemo(
    () => conceptOutputPredictions[currentSection?.id]
      || lesson.outputPredictions?.[activeSectionIndex % (lesson.outputPredictions.length || 1)]
      || lesson.quickCheck?.outputPrediction,
    [activeSectionIndex, currentSection, lesson.outputPredictions, lesson.quickCheck?.outputPrediction],
  );
  const exampleSet = useMemo(() => {
    const examples = lesson.examples ?? [];
    const selectedExamples = examples.length > 0
      ? examples.slice(activeSectionIndex, activeSectionIndex + 2)
      : [];
    return [
      ...(currentSection.codeSnippet
        ? [{
          title: 'Core example',
          code: currentSection.codeSnippet,
          expectedOutput: 'Trace the values from the program to determine the output.',
          explanation: currentSection.annotation || currentSection.concept,
        }]
        : []),
      ...selectedExamples,
    ].slice(0, 3);
  }, [activeSectionIndex, currentSection, lesson.examples]);
  const exploreComplete = !prediction || exploreAnswer === prediction.correctIndex;

  const saveStage = (stage: LearningStage, nextStage: LearningStage = stage) => {
    if (!currentSection || !canOpenStage(stages.findIndex((item) => item.id === stage))) return;
    const nextProgress: ConceptLearningProgress = {
      ...conceptProgress,
      completedStages: { ...completed, [stage]: true },
      currentStage: nextStage,
    };
    storageService.saveConceptLearningProgress(topicId, currentSection.id, nextProgress);
    setActiveStage(nextStage);
    setSearchParams({
      concept: String(activeSectionIndex),
      stage: nextStage,
    });
    setProgressVersion((value) => value + 1);
    onProgressUpdate();
  };

  const resetActivity = () => {
    setShowMore(false);
    setExploreAnswer(null);
    setPracticeAnswer(null);
    setRevealedTheory({});
    setSelectedExampleIndex(0);
    setCheckAnswers({});
    setCheckSubmitted(false);
  };

  const openConcept = (index: number) => {
    if (index < 0 || index >= lesson.sections.length) return;
    if (
      index > 0
      && !storageService.getConceptLearningProgress(
        topicId,
        lesson.sections[index - 1].id,
      ).mastered
    ) return;
    setActiveSectionIndex(index);
    const nextProgress = storageService.getConceptLearningProgress(topicId, lesson.sections[index].id);
    setActiveStage(nextProgress.currentStage);
    setSearchParams({
      concept: String(index),
      stage: nextProgress.currentStage,
    });
    resetActivity();
  };

  const openNextConcept = (index: number) => {
    if (index < 0 || index >= lesson.sections.length) return;
    const nextSection = lesson.sections[index];
    const nextProgress = storageService.getConceptLearningProgress(topicId, nextSection.id);
    const resetProgress: ConceptLearningProgress = {
      ...nextProgress,
      completedStages: {},
      currentStage: 'understand',
      mastered: false,
    };
    storageService.saveConceptLearningProgress(topicId, nextSection.id, resetProgress);
    setActiveSectionIndex(index);
    setActiveStage('understand');
    setSearchParams({
      concept: String(index),
      stage: 'understand',
    });
    resetActivity();
  };

  useEffect(() => {
    const hasConcept = Number.isInteger(requestedConcept)
      && requestedConcept >= 0
      && requestedConcept < lesson.sections.length;
    const hasStage = isStageAvailable(requestedConceptProgress, requestedStage);
    if (hasConcept && hasStage) return;
    const resumeIndex = getResumeSectionIndex(lesson, topicId);
    const targetIndex = hasConcept ? requestedConceptIndex : resumeIndex;
    const targetStage = storageService.getConceptLearningProgress(
      topicId,
      lesson.sections[targetIndex]?.id ?? '',
    ).currentStage;
    setActiveSectionIndex(targetIndex);
    setActiveStage(targetStage);
    setSearchParams({
      concept: String(targetIndex),
      stage: targetStage,
    }, { replace: true });
    resetActivity();
  }, [lesson.id, topicId]);

  useEffect(() => {
    if (requestedConceptIndex !== activeSectionIndex) {
      setActiveSectionIndex(requestedConceptIndex);
      resetActivity();
    }
    if (initialStage !== activeStage) setActiveStage(initialStage);
  }, [requestedConceptIndex, initialStage, activeSectionIndex, activeStage]);

  const canOpenStage = (stageIndex: number) =>
    stageIndex === 0 || !!completed[stages[stageIndex - 1].id];

  const selectStage = (stage: LearningStage) => {
    const index = stages.findIndex((item) => item.id === stage);
    if (index >= 0 && canOpenStage(index)) {
      setActiveStage(stage);
      setCheckSubmitted(false);
      if (stage === 'check') setCheckAnswers({});
      setSearchParams({
        concept: String(activeSectionIndex),
        stage,
      });
      if (currentSection && conceptProgress.currentStage !== stage) {
        storageService.saveConceptLearningProgress(topicId, currentSection.id, {
          ...conceptProgress,
          currentStage: stage,
        });
        setProgressVersion((value) => value + 1);
        onProgressUpdate();
      }
    }
  };

  const checkQuestions = useMemo(() => {
    const syntaxQuestion: ArenaCheckQuestion = {
      question: 'Which example shows the correct syntax for this concept?',
      options: [
        currentSection.syntax || 'The syntax is shown in the Learn step.',
        'repeat (condition) { work; }',
        'choose condition: work',
        'concept = [work]',
      ] as [string, string, string, string],
      correctIndex: 0,
      explanation: 'The first example matches the C syntax shown in the Learn stage.',
    };
    const commonMistake = lesson.commonMistakes?.[activeSectionIndex % (lesson.commonMistakes.length || 1)];
    const mistakeQuestion: ArenaCheckQuestion = {
      question: 'Which statement describes a common mistake for this concept?',
      options: [
        commonMistake?.mistake || 'Changing the code without checking the concept rule.',
        'Using the syntax shown in the lesson exactly as written.',
        'Reading the program from top to bottom before predicting its result.',
        'Checking that the output matches the values in the program.',
      ] as [string, string, string, string],
      correctIndex: 0,
      explanation: commonMistake?.why || 'This is a common beginner mistake to watch for.',
    };
    const conceptQuestion: ArenaCheckQuestion = {
      question: 'In simple words, what does this concept help a C program do?',
      options: [
        currentSection.concept,
        'It only adds comments and does not affect a program.',
        'It replaces every variable with a fixed value.',
        'It stops the program before main begins.',
      ] as [string, string, string, string],
      correctIndex: 0,
      explanation: 'The first answer describes the purpose of the concept you just learned.',
    };
    const outputQuestion: ArenaCheckQuestion = {
      question: 'What will this short example print?',
      options: (prediction?.options || ['The first value', 'The second value', 'Both values', 'Nothing']) as [string, string, string, string],
      correctIndex: prediction?.correctIndex ?? 0,
      explanation: prediction?.explanation || 'Trace the example from top to bottom to find its output.',
      code: prediction?.code,
    };
    const ruleQuestion: ArenaCheckQuestion = {
      question: 'Which rule should you remember when using this concept?',
      options: [
        currentSection.keyPoint || 'Read each part carefully and follow the syntax.',
        'The concept can be written without any syntax.',
        'Every concept always produces the same output.',
        'The order of the statements never matters.',
      ] as [string, string, string, string],
      correctIndex: 0,
      explanation: currentSection.keyPoint || 'This is the key rule from the Learn stage.',
    };
    return [conceptQuestion, syntaxQuestion, outputQuestion, ruleQuestion, mistakeQuestion];
  }, [activeSectionIndex, currentSection, lesson.commonMistakes, prediction]);

  const checkScore = checkQuestions.filter(
    (question, index) => checkAnswers[index] === question.correctIndex,
  ).length;
  const checkPassed = checkSubmitted && checkQuestions.length > 0
    && checkScore / checkQuestions.length >= 0.8;

  const submitCheck = () => {
    setCheckSubmitted(true);
    const nextProgress: ConceptLearningProgress = {
      ...conceptProgress,
      bestCheckScore: Math.max(conceptProgress.bestCheckScore, checkScore),
    };
    const passed = checkQuestions.length > 0 && checkScore / checkQuestions.length >= 0.8;
    if (passed) {
      nextProgress.completedStages = { ...completed, check: true };
      nextProgress.currentStage = 'check';
    }
    storageService.saveConceptLearningProgress(topicId, currentSection.id, nextProgress);
    setProgressVersion((value) => value + 1);
    onProgressUpdate();
  };

  const continueToMastery = () => {
    if (!checkPassed) return;
    storageService.saveConceptLearningProgress(topicId, currentSection.id, {
      ...conceptProgress,
      completedStages: { ...completed, check: true },
      currentStage: 'master',
    });
    setActiveStage('master');
    setSearchParams({
      concept: String(activeSectionIndex),
      stage: 'master',
    });
    setProgressVersion((value) => value + 1);
    onProgressUpdate();
  };

  const retryCheck = () => {
    setCheckAnswers({});
    setCheckSubmitted(false);
  };

  const confirmMastery = () => {
    if (!conceptProgress.completedStages.check) return;
    const nextProgress: ConceptLearningProgress = {
      ...conceptProgress,
      completedStages: { ...completed, check: true, master: true },
      currentStage: 'master',
      mastered: true,
    };
    storageService.saveConceptLearningProgress(topicId, currentSection.id, nextProgress);
    if (!storageService.isLessonCompleted(topicId, currentSection.id)) {
      storageService.toggleLessonCompleted(topicId, currentSection.id);
    }
    const nextConceptIndex = activeSectionIndex + 1;
    setProgressVersion((value) => value + 1);
    onProgressUpdate();
    if (nextConceptIndex < lesson.sections.length) {
      openNextConcept(nextConceptIndex);
    }
  };

  if (!currentSection) {
    return (
      <NeuCard className="flex flex-col items-center gap-4 p-8 text-center">
        <h2 className="text-xl font-bold">Lesson unavailable</h2>
        <p className="max-w-md text-sm text-[var(--neu-text-secondary)]">
          We could not load the concepts for this topic.
        </p>
        <NeuButton variant="secondary" size="sm" onClick={() => navigate(`/topic/${topicId}`)}>
          Back to topic
        </NeuButton>
      </NeuCard>
    );
  }
  if (isLocked) {
    return (
      <NeuCard className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full neu-inset text-[var(--neu-text-muted)]">
          <LockKeyhole size={22} />
        </div>
        <h2 className="text-xl font-bold">Master the previous concept first</h2>
        <p className="max-w-md text-sm text-[var(--neu-text-secondary)]">
          This concept builds on the one before it. Complete that learning journey to unlock this step.
        </p>
        <NeuButton variant="secondary" size="sm" onClick={() => openConcept(activeSectionIndex - 1)}>
          Review previous concept
        </NeuButton>
      </NeuCard>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <NeuCard className="p-5 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--neu-accent)]">Learning Arena</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{lesson.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--neu-text-secondary)]">
              Learn one concept completely, understand why it works, and prove your mastery.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-[var(--neu-text-secondary)]">Concept progress</span>
              <span className="font-mono text-[var(--neu-accent)]">{progressPercent}%</span>
            </div>
            <div className="h-2.5 rounded-full neu-inset p-0.5">
              <div className="h-full rounded-full bg-[var(--neu-accent)] transition-[width]" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-2 text-right text-[11px] text-[var(--neu-text-muted)]">
              Current stage: <span className="font-semibold text-[var(--neu-accent)]">{stages.find((stage) => stage.id === activeStage)?.label}</span>
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--neu-border)] pt-4 pb-1">
          {stages.map((stage, index) => {
            const stageComplete = !!completed[stage.id];
            const available = canOpenStage(index);
            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => selectStage(stage.id)}
                disabled={!available}
                aria-current={activeStage === stage.id ? 'step' : undefined}
                title={!available ? `Complete ${stages[index - 1].label} first` : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-[color,background-color,box-shadow,transform] ${
                  activeStage === stage.id ? 'neu-inset text-[var(--neu-accent)]' : stageComplete ? 'text-[var(--neu-green-tile-text)]' : 'text-[var(--neu-text-muted)] hover:text-[var(--neu-text-primary)]'
                } ${!available ? 'cursor-not-allowed opacity-45 dark:text-slate-300 dark:opacity-80' : ''}`}
              >
                <StageIcon stage={stage.id} complete={stageComplete} locked={!available} />
                {stage.label}
              </button>
            );
          })}
        </div>
      </NeuCard>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(210px,0.65fr)_minmax(0,1.7fr)]">
        <aside className="lg:sticky lg:top-24">
          <NeuCard className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--neu-accent)]">Concept path</p>
                <h3 className="mt-1 font-bold">Topic mastery</h3>
              </div>
              <span className="font-mono text-xs text-[var(--neu-text-muted)]">{activeSectionIndex + 1}/{lesson.sections.length}</span>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Concept path">
              {lesson.sections.map((section, index) => {
                const progress = sectionProgress[index];
                const locked = index > 0 && !sectionProgress[index - 1]?.mastered;
                const inProgress = !progress.mastered
                  && Object.values(progress.completedStages).some(Boolean);
                return (
                  <button
                    type="button"
                    key={section.id}
                    disabled={locked}
                    onClick={() => openConcept(index)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-[color,background-color,box-shadow,transform] ${
                      index === activeSectionIndex ? 'neu-inset text-[var(--neu-accent)]' : 'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)]'
                    } ${locked ? 'cursor-not-allowed opacity-45 dark:text-slate-300 dark:opacity-80' : ''}`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      progress.mastered ? 'bg-[#0BDA51]/15 text-[var(--neu-green-tile-text)]' : locked ? 'bg-[var(--neu-base)] text-[var(--neu-text-muted)] dark:text-slate-300' : 'bg-[var(--neu-accent)]/10 text-[var(--neu-accent)]'
                    }`}>
                      {progress.mastered ? <Check size={14} /> : locked ? <LockKeyhole size={12} /> : String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{section.title.replace(/^(Foundation|Core Concepts|Practice|Intermediate) · /, '')}</span>
                      <span className={`mt-0.5 block text-[10px] uppercase tracking-wide ${locked ? 'opacity-75 dark:text-slate-300 dark:opacity-100' : 'opacity-60'}`}>{progress.mastered ? 'Mastered' : locked ? 'Locked' : inProgress ? 'In progress' : 'Available'}</span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </NeuCard>
        </aside>

        <main className="min-w-0">
          <NeuCard className="flex min-h-[470px] flex-col gap-6 p-5 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[var(--neu-border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--neu-accent)]">
                  Concept {activeSectionIndex + 1} of {lesson.sections.length}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{currentSection.title.replace(/^(Foundation|Core Concepts|Practice|Intermediate) · /, '')}</h1>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${conceptProgress.mastered ? 'bg-[#0BDA51]/10 text-[var(--neu-green-tile-text)]' : 'neu-inset text-[var(--neu-text-muted)]'}`}>
                {conceptProgress.mastered
                  ? 'Concept mastered'
                  : Object.values(completed).some(Boolean)
                    ? 'In progress'
                    : 'Available'}
              </span>
            </div>

            <div
              key={`${activeSectionIndex}-${activeStage}`}
              className="min-w-0 flex-1"
              aria-live="polite"
            >
            {activeStage === 'understand' && (
              <section className="flex flex-1 flex-col justify-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl neu-inset text-[var(--neu-accent)]"><Lightbulb size={23} /></div>
                <div className="max-w-2xl">
                  <p className="text-sm font-bold text-[var(--neu-accent)]">What is it?</p>
                  <p className="mt-2 text-base leading-7 text-[var(--neu-text-secondary)]">{currentSection.concept}</p>
                </div>
                <div className="max-w-2xl rounded-2xl bg-[var(--neu-accent)]/8 p-4">
                  <p className="text-sm font-bold">Why do we need it?</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--neu-text-secondary)]">
                    This idea helps you make a program clear, predictable, and easier to extend.
                  </p>
                </div>
                <NeuButton
                  variant="primary"
                  size="sm"
                  className="w-fit"
                  onClick={() => saveStage('understand', 'learn')}
                  icon={<ArrowRight size={15} />}
                  iconPosition="right"
                >
                  Continue to Learn
                </NeuButton>
              </section>
            )}

            {activeStage === 'learn' && (
              <section className="flex flex-1 flex-col gap-5">
                <div>
                  <p className="text-sm font-bold text-[var(--neu-accent)]">Learn the essential syntax</p>
                  <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">Focus on the shape and the rule that makes it work.</p>
                </div>
                {currentSection.syntax && <CodeBlock code={currentSection.syntax} />}
                <div className="rounded-2xl neu-inset p-4 text-sm leading-6 text-[var(--neu-text-secondary)]">
                  <strong className="text-[var(--neu-text-primary)]">Key rule:</strong>{' '}
                  {currentSection.keyPoint || 'Read each part from left to right and check its boundaries.'}
                </div>
                {showMore && (
                  <p className="text-sm leading-6 text-[var(--neu-text-secondary)]">
                    {currentSection.annotation || 'Use braces and clear formatting while learning. They make the intent of your program easier to inspect.'}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setShowMore((value) => !value)} className="text-sm font-semibold text-[var(--neu-accent)] hover:underline">
                    {showMore ? 'Show less' : 'Learn more'}
                  </button>
                  <NeuButton
                    variant="primary"
                    size="sm"
                    onClick={() => saveStage('learn', 'explore')}
                    icon={<ArrowRight size={15} />}
                    iconPosition="right"
                  >
                    Continue to Explore
                  </NeuButton>
                </div>
              </section>
            )}

            {activeStage === 'explore' && (
              <section className="flex flex-1 flex-col gap-5">
                <div>
                  <p className="text-sm font-bold text-[var(--neu-accent)]">See it, then predict it</p>
                  <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">Start with a small example and think before checking the answer.</p>
                </div>
                {prediction?.code
                  ? <CodeBlock code={prediction.code} />
                  : currentSection.codeSnippet && <CodeBlock code={currentSection.codeSnippet} />}
                {prediction && (
                  <div className="rounded-2xl neu-inset p-4">
                    <p className="mb-3 text-sm font-semibold">What will this program print?</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {prediction.options.map((option, index) => (
                        <AnswerButton key={option} label={`${String.fromCharCode(65 + index)}. ${option}`} selected={exploreAnswer === index} correct={index === prediction.correctIndex} onClick={() => setExploreAnswer(index)} />
                      ))}
                    </div>
                    {exploreAnswer !== null && (
                      <p className={`mt-3 text-sm ${exploreAnswer === prediction.correctIndex ? 'text-[var(--neu-green-tile-text)]' : 'text-[var(--callout-amber-text)]'}`}>
                        <strong>{exploreAnswer === prediction.correctIndex ? 'Correct. ' : 'Not quite. '}</strong>
                        {prediction.explanation}
                      </p>
                    )}
                  </div>
                )}
                <NeuButton
                  variant="primary"
                  size="sm"
                  className="w-fit"
                  disabled={!exploreComplete}
                  onClick={() => saveStage('explore', 'practice')}
                  icon={<ArrowRight size={15} />}
                  iconPosition="right"
                >
                  Continue to Practice
                </NeuButton>
              </section>
            )}

            {activeStage === 'practice' && (
              <section className="flex flex-1 flex-col gap-5">
                <div>
                  <p className="text-sm font-bold text-[var(--neu-accent)]">Concept cards</p>
                  <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">
                    Explore the theory one idea at a time, then confirm what you understand.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { id: 'what', label: 'What is it?', text: currentSection.concept },
                    { id: 'why', label: 'Why use it?', text: currentSection.annotation || 'It helps a program express this task clearly and predictably.' },
                    { id: 'rule', label: 'Key rule', text: currentSection.keyPoint || 'Follow the syntax carefully and check each value as the program runs.' },
                  ].map((card) => {
                    const revealed = !!revealedTheory[card.id];
                    return (
                      <button
                        type="button"
                        key={card.id}
                        aria-expanded={revealed}
                        onClick={() => setRevealedTheory((items) => ({ ...items, [card.id]: !items[card.id] }))}
                        className={`min-h-[128px] rounded-2xl p-4 text-left transition-[color,background-color,box-shadow,transform] ${revealed ? 'neu-inset text-[var(--neu-text-secondary)]' : 'neu-raised hover:text-[var(--neu-accent)] active:neu-inset'}`}
                      >
                        <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                          {card.label}
                          <ArrowRight size={15} className={`transition-transform ${revealed ? 'rotate-90' : ''}`} />
                        </span>
                        <span className="mt-3 block text-xs leading-5">
                          {revealed ? card.text : 'Tap to reveal'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {exampleSet.length > 0 && (
                  <div className="rounded-2xl neu-inset p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">Program set</p>
                        <p className="mt-1 text-xs text-[var(--neu-text-secondary)]">
                          Compare different examples of the same idea.
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--neu-text-muted)]">
                        {selectedExampleIndex + 1}/{exampleSet.length}
                      </span>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {exampleSet.map((example, index) => (
                        <button
                          type="button"
                          key={`${example.title}-${index}`}
                          onClick={() => setSelectedExampleIndex(index)}
                          aria-pressed={selectedExampleIndex === index}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-[color,background-color,box-shadow,transform] ${
                            selectedExampleIndex === index
                              ? 'neu-inset text-[var(--neu-accent)]'
                              : 'neu-raised text-[var(--neu-text-secondary)] hover:text-[var(--neu-accent)]'
                          }`}
                        >
                          Program {index + 1}
                        </button>
                      ))}
                    </div>
                    <p className="mb-2 text-sm font-semibold">{exampleSet[selectedExampleIndex].title}</p>
                    <CodeBlock code={exampleSet[selectedExampleIndex].code} />
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-[var(--neu-base)] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--neu-accent)]">Expected output</p>
                        <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--neu-text-secondary)]">
                          {exampleSet[selectedExampleIndex].expectedOutput}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[var(--neu-base)] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--neu-accent)]">Why it works</p>
                        <p className="mt-1 text-xs leading-5 text-[var(--neu-text-secondary)]">
                          {exampleSet[selectedExampleIndex].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {lesson.commonMistakes?.[activeSectionIndex % lesson.commonMistakes.length] && (
                  <div className="rounded-2xl bg-amber-500/10 p-4 text-sm leading-6 text-[var(--callout-amber-text)]">
                    <strong>Watch out:</strong>{' '}
                    {lesson.commonMistakes[activeSectionIndex % lesson.commonMistakes.length].mistake}
                  </div>
                )}

                {practiceAnswer === 0 && (
                  <p className="text-sm text-[var(--neu-green-tile-text)]">
                    Great. You are ready to check your understanding.
                  </p>
                )}
                <NeuButton
                  variant="primary"
                  size="sm"
                  className="w-fit"
                  disabled={Object.keys(revealedTheory).length < 3 || practiceAnswer === 0}
                  onClick={() => {
                    setPracticeAnswer(0);
                    saveStage('practice', 'check');
                  }}
                  icon={<ArrowRight size={15} />}
                  iconPosition="right"
                >
                  I understand — Continue to Check
                </NeuButton>
              </section>
            )}

            {activeStage === 'check' && (
              <section className="flex flex-1 flex-col gap-5">
                <div>
                  <p className="text-sm font-bold text-[var(--neu-accent)]">Quick check</p>
                  <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">Answer five short questions. You need 80% to confirm mastery.</p>
                </div>
                <div className="flex flex-col gap-4">
                  {checkQuestions.map((question, index) => (
                    <div key={`${question.question}-${index}`} className="rounded-2xl neu-inset p-4">
                      <p className="text-sm font-semibold">{index + 1}. {question.question}</p>
                      {question.code && (
                        <div className="mt-3">
                          <CodeBlock code={question.code} />
                        </div>
                      )}
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => (
                          <AnswerButton key={option} label={option} selected={checkAnswers[index] === optionIndex} correct={optionIndex === question.correctIndex} disabled={checkSubmitted} onClick={() => setCheckAnswers((answers) => ({ ...answers, [index]: optionIndex }))} />
                        ))}
                      </div>
                      {checkSubmitted && checkAnswers[index] !== undefined && (
                        <p className="mt-2 text-xs leading-5 text-[var(--neu-text-secondary)]">{checkAnswers[index] === question.correctIndex ? 'Correct. ' : 'Review this one. '}{question.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
                {checkSubmitted && (
                  <div className={`rounded-2xl p-4 text-sm ${checkPassed ? 'bg-[#0BDA51]/10 text-[var(--neu-green-tile-text)]' : 'bg-amber-500/10 text-[var(--callout-amber-text)]'}`}>
                    Your score: {checkScore}/{checkQuestions.length} ({Math.round((checkScore / checkQuestions.length) * 100)}%).{' '}
                    {checkPassed ? 'Great work. Confirm mastery to complete this concept.' : 'Review the explanations, then try again.'}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <NeuButton
                    variant="primary"
                    size="sm"
                    disabled={checkSubmitted ? checkPassed : Object.keys(checkAnswers).length < checkQuestions.length}
                    onClick={checkSubmitted && !checkPassed ? retryCheck : submitCheck}
                  >
                    {checkSubmitted && !checkPassed ? 'Try Again' : 'Check Answers'}
                  </NeuButton>
                  {checkSubmitted && !checkPassed && (
                    <span className="self-center text-sm text-[var(--neu-text-secondary)]">
                      Review the explanations above, then try again.
                    </span>
                  )}
                  {checkPassed && (
                    <NeuButton
                      variant="primary"
                      size="sm"
                      onClick={continueToMastery}
                      icon={<ArrowRight size={15} />}
                      iconPosition="right"
                    >
                      Continue to Mastery
                    </NeuButton>
                  )}
                </div>
              </section>
            )}

            {activeStage === 'master' && (
              <section className="flex flex-1 flex-col justify-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0BDA51]/10 text-[var(--neu-green-tile-text)]"><CheckCircle2 size={28} /></div>
                <div>
                  <p className="text-sm font-bold text-[var(--neu-green-tile-text)]">Concept mastery</p>
                  <h2 className="mt-2 text-2xl font-extrabold">You&apos;re ready to use this idea.</h2>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--neu-text-secondary)]">
                    <li>✓ Explain the concept and its purpose</li>
                    <li>✓ Recognize it in C code</li>
                    <li>✓ Predict its behaviour</li>
                    <li>✓ Spot a common mistake</li>
                  </ul>
                </div>
                {!conceptProgress.mastered ? (
                  <NeuButton variant="primary" size="sm" className="w-fit" onClick={confirmMastery} icon={<Check size={15} />}>
                    Complete Mastery
                  </NeuButton>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {activeSectionIndex < lesson.sections.length - 1 ? (
                      <NeuButton variant="primary" size="sm" onClick={() => openConcept(activeSectionIndex + 1)} icon={<ArrowRight size={15} />} iconPosition="right">
                        Next concept
                      </NeuButton>
                    ) : (
                      <NeuButton variant="primary" size="sm" onClick={() => navigate(`/topic/${topicId}`)} icon={<ArrowRight size={15} />} iconPosition="right">
                        Back to topic
                      </NeuButton>
                    )}
                  </div>
                )}
              </section>
            )}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-[var(--neu-border)] pt-5">
              <NeuButton variant="secondary" size="sm" disabled={activeSectionIndex === 0} onClick={() => openConcept(activeSectionIndex - 1)} icon={<ChevronLeft size={16} />}>
                Previous concept
              </NeuButton>
              <button type="button" onClick={resetActivity} className="rounded-full p-2 text-[var(--neu-text-muted)] transition-colors hover:text-[var(--neu-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]" aria-label="Reset current activity" title="Reset current activity">
                <RotateCcw size={15} />
              </button>
              <NeuButton variant="secondary" size="sm" disabled={!canAdvanceToNextConcept} onClick={() => openConcept(activeSectionIndex + 1)} icon={<ChevronRight size={16} />} iconPosition="right">
                Next concept
              </NeuButton>
            </div>
          </NeuCard>
        </main>
      </div>
      <p className="px-1 text-xs text-[var(--neu-text-muted)]">
        Complete each stage to build a reliable understanding of the concept.
      </p>
    </div>
  );
};
