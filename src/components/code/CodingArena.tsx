import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileCode,
  Layers,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CodingQuestion, TopicId, ExecutionResult } from '../../types';
import { MonacoEditorWrapper } from './MonacoEditorWrapper';
import { NeuCard } from '../common/NeuCard';
import { NeuButton } from '../common/NeuButton';
import { NeuBadge } from '../common/NeuBadge';
import { NeuSlider } from '../common/NeuSlider';
import { NeuIconButton } from '../common/NeuIconButton';
import { codeRunnerService } from '../../services/codeRunnerService';
import { storageService } from '../../services/storageService';

interface CodingArenaProps {
  questions: CodingQuestion[];
  topicId: TopicId;
  onProblemSolved: () => void;
}

interface TestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  isHidden: boolean;
  time?: string;
  error?: string;
}

export const CodingArena: React.FC<CodingArenaProps> = ({
  questions,
  topicId,
  onProblemSolved,
}) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const currentQ = questions[selectedQuestionIndex] || questions[0];

  // Code state
  const [code, setCode] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(14);

  // Execution states
  const [isRunningCustom, setIsRunningCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCelebration, setShowSuccessCelebration] = useState(false);
  const [customResult, setCustomResult] = useState<ExecutionResult | null>(null);
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[] | null>(null);
  const [allPassed, setAllPassed] = useState<boolean | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'custom' | 'testcases'>('testcases');
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [selectedTestPassed, setSelectedTestPassed] = useState<boolean | null>(null);
  const visibleTestCases = currentQ?.testCases.filter((testCase) => !testCase.isHidden) || [];
  const solvedCount = questions.filter((question) => storageService.isProblemSolved(question.id)).length;
  const conceptName = currentQ?.concept || ({
    'input-output': 'Input and Output',
    'operators-expressions': 'Operators and Expressions',
    'decision-making': 'Decision Making',
    looping: 'Looping',
  }[topicId]);

  // Load saved code when current question changes
  useEffect(() => {
    if (currentQ) {
      const saved = storageService.getSavedCode(currentQ.id, currentQ.starterCode);
      setCode(saved);
      setCustomInput(currentQ.testCases.find((testCase) => !testCase.isHidden)?.input || currentQ.sampleCases[0]?.input || '');
      setCustomResult(null);
      setTestCaseResults(null);
      setAllPassed(null);
      setActiveConsoleTab('testcases');
      setSelectedTestCaseIndex(0);
      setHintLevel(0);
      setSolutionVisible(false);
      setSelectedTestPassed(null);
    }
  }, [currentQ?.id]);

  // Handle code change and auto-save
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (currentQ) {
      storageService.saveCode(currentQ.id, newCode);
    }
  };

  // Reset to starter template
  const handleResetTemplate = () => {
    if (currentQ && confirm('Reset code to starter template? Your current changes will be overwritten.')) {
      setCode(currentQ.starterCode);
      storageService.saveCode(currentQ.id, currentQ.starterCode);
    }
  };

  // Run with custom input
  const handleRunCustom = async () => {
    if (!currentQ) return;
    setIsRunningCustom(true);
    setActiveConsoleTab('custom');
    setSelectedTestPassed(null);

    try {
      const res = await codeRunnerService.runCode({
        sourceCode: code,
        stdin: customInput,
      });
      setCustomResult(res);
    } catch (e: any) {
      setCustomResult({
        stdout: '',
        stderr: e.message || 'Execution error',
        status: 'runtime_error',
      });
    } finally {
      setIsRunningCustom(false);
    }
  };

  const handleRunTestCase = async () => {
    if (!currentQ) return;
    const testCase = visibleTestCases[selectedTestCaseIndex];
    if (!testCase) return;

    setIsRunningCustom(true);
    setActiveConsoleTab('custom');
    setCustomInput(testCase.input);

    try {
      const result = await codeRunnerService.runCode({
        sourceCode: code,
        stdin: testCase.input,
        expectedOutput: testCase.expectedOutput,
      });
      const passed = !result.stderr && result.stdout.trim() === testCase.expectedOutput.trim();
      setCustomResult(result);
      setSelectedTestPassed(passed);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Execution failed';
      setCustomResult({ stdout: '', stderr: message, status: 'runtime_error' });
      setSelectedTestPassed(false);
    } finally {
      setIsRunningCustom(false);
    }
  };

  // Submit against all test cases (visible + hidden)
  const handleSubmit = async () => {
    if (!currentQ) return;
    setIsSubmitting(true);
    setActiveConsoleTab('testcases');
    setShowSuccessCelebration(false);

    const results: TestCaseResult[] = [];
    let everyPassed = true;

    for (let i = 0; i < currentQ.testCases.length; i++) {
      const tc = currentQ.testCases[i];
      try {
        const res = await codeRunnerService.runCode({
          sourceCode: code,
          stdin: tc.input,
          expectedOutput: tc.expectedOutput,
        });

        // Normalize outputs for comparison (trim trailing whitespace)
        const actualNorm = (res.stdout || '').trim();
        const expectedNorm = tc.expectedOutput.trim();
        const passed = actualNorm === expectedNorm && !res.stderr;

        if (!passed) everyPassed = false;

        results.push({
          index: i + 1,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: res.stdout,
          passed,
          isHidden: !!tc.isHidden,
          time: res.time,
          error: res.stderr || res.compileOutput,
        });
      } catch (err: any) {
        everyPassed = false;
        results.push({
          index: i + 1,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: '',
          passed: false,
          isHidden: !!tc.isHidden,
          error: err.message || 'Execution failed',
        });
      }
    }

    setTestCaseResults(results);
    setAllPassed(everyPassed);

    if (everyPassed) {
      storageService.markProblemSolved(currentQ.id);
      onProblemSolved();
      try {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) {
          const colors = ['#FF7A1A', '#22c55e', '#38bdf8', '#fbbf24'];
          confetti({
            particleCount: 90,
            spread: 78,
            startVelocity: 42,
            origin: { y: 0.62 },
            colors,
          });
          window.setTimeout(() => {
            confetti({
              particleCount: 45,
              spread: 110,
              startVelocity: 28,
              origin: { x: 0.15, y: 0.68 },
              colors,
            });
            confetti({
              particleCount: 45,
              spread: 110,
              startVelocity: 28,
              origin: { x: 0.85, y: 0.68 },
              colors,
            });
          }, 180);
        }
        setShowSuccessCelebration(true);
        window.setTimeout(() => setShowSuccessCelebration(false), 4200);
      } catch (e) {
        console.warn('Could not display the submission celebration:', e);
      }
    }

    setIsSubmitting(false);
  };

  if (!currentQ) {
    return (
      <NeuCard className="p-12 text-center text-[var(--neu-text-muted)]">
        No coding challenges available for this topic yet.
      </NeuCard>
    );
  }

  const isSolved = storageService.isProblemSolved(currentQ.id);

  return (
    <div className="flex flex-col gap-6">
      <style>{`
        @keyframes arena-success-enter {
          0% { opacity: 0; transform: translateY(14px) scale(0.96); }
          70% { opacity: 1; transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes arena-success-check {
          0% { opacity: 0; transform: scale(0.35) rotate(-25deg); }
          65% { opacity: 1; transform: scale(1.18) rotate(8deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes arena-success-spark {
          0%, 100% { opacity: 0.35; transform: scale(0.7) rotate(0); }
          50% { opacity: 1; transform: scale(1.2) rotate(25deg); }
        }
        .arena-success-celebration {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
          padding: 18px;
          border: 1px solid color-mix(in srgb, #22c55e 55%, transparent);
          border-radius: 16px;
          background: linear-gradient(110deg, color-mix(in srgb, #22c55e 22%, var(--neu-surface)), var(--neu-surface));
          box-shadow: 0 8px 26px color-mix(in srgb, #22c55e 22%, transparent), 4px 4px 12px var(--neu-shadow-dark);
          animation: arena-success-enter 520ms cubic-bezier(.2,.8,.2,1) both;
        }
        .arena-success-check { display: grid; place-items: center; color: var(--neu-green); animation: arena-success-check 650ms 100ms cubic-bezier(.2,.8,.2,1) both; }
        .arena-success-spark { margin-left: auto; color: #fbbf24; font-size: 30px; animation: arena-success-spark 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .arena-success-celebration, .arena-success-check, .arena-success-spark { animation: none; }
        }
      `}</style>
      {/* Question Selector Strip */}
      <div className="p-3 rounded-2xl neu-raised overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <div className="flex items-center gap-2 px-3 py-1 font-mono text-xs text-[var(--neu-text-muted)]">
            <Layers size={14} className="text-[var(--neu-accent)]" />
            <span>Problem:</span>
          </div>
          {questions.map((q, idx) => {
            const isCur = idx === selectedQuestionIndex;
            const solved = storageService.isProblemSolved(q.id);

            return (
              <button
                key={q.id}
                onClick={() => setSelectedQuestionIndex(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCur
                    ? 'neu-inset text-[var(--neu-accent)] border border-[var(--neu-accent)]/80 shadow-[0_0_8px_var(--neu-accent-glow)]'
                    : 'neu-raised text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)]'
                }`}
              >
                <span>{q.number}.</span>
                <span className="truncate max-w-[120px]">{q.title}</span>
                {solved && <CheckCircle2 size={12} className="text-emerald-700 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-[var(--neu-text-primary)]">
          Problem {String(currentQ.number).padStart(2, '0')} / {questions.length}
          <span className="ml-3 text-xs font-normal text-[var(--neu-text-secondary)]">
            {solvedCount} / {questions.length} Solved
          </span>
        </p>
      </div>

      {/* Main Split Layout: Left Problem / Right Monaco Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Description & Test Cases */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <NeuCard className="p-6 flex flex-col gap-5">
            {/* Header: Title + Difficulty + Solved Status */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[var(--neu-border)]">
              <div>
                <span className="text-xs font-mono text-[var(--neu-accent)] font-semibold">
                  PROBLEM {String(currentQ.number).padStart(2, '0')} / {questions.length}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--neu-text-primary)] mt-0.5">
                  {currentQ.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NeuBadge dot={false} variant={currentQ.difficulty === 'hard' ? 'medium' : currentQ.difficulty}>
                  {currentQ.difficulty === 'easy' ? '🟢 Easy' : currentQ.difficulty === 'medium' ? '🟡 Semi-moderate' : '🟠 Moderate'}
                </NeuBadge>
                {isSolved && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-700/30 dark:border-emerald-500/30">
                    <CheckCircle2 size={12} />
                    <span>Solved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-[var(--neu-text-muted)] mb-1.5 tracking-wider">
                Concept
              </h3>
              <p className="mb-4 text-sm text-[var(--neu-text-primary)]">{conceptName}</p>
              <h3 className="text-xs font-bold font-mono uppercase text-[var(--neu-text-muted)] mb-1.5 tracking-wider">
                Problem Statement
              </h3>
              <p className="text-sm font-normal text-[var(--neu-text-primary)] leading-relaxed">
                {currentQ.problemStatement}
              </p>
            </div>

            {/* Input & Output Format */}
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="p-3.5 rounded-xl neu-inset">
                <span className="font-mono text-[var(--neu-accent)] font-bold block mb-1">
                  Input Format
                </span>
                <span className="text-[var(--neu-text-secondary)] font-medium leading-relaxed">{currentQ.inputFormat}</span>
              </div>
              <div className="p-3.5 rounded-xl neu-inset">
                <span className="font-mono text-[var(--neu-accent)] font-bold block mb-1">
                  Output Format
                </span>
                <span className="text-[var(--neu-text-secondary)] font-medium leading-relaxed">{currentQ.outputFormat}</span>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-xs font-semibold font-mono uppercase text-[var(--neu-text-muted)] mb-1">
                Constraints
              </h3>
              <div className="p-3 rounded-xl neu-inset font-mono text-xs text-amber-800 dark:text-amber-300 bg-amber-500/10 dark:bg-black/20 border border-amber-500/20">
                {currentQ.constraints}
              </div>
            </div>

            {/* Visible Test Cases */}
            <div>
              <h3 className="text-xs font-semibold font-mono uppercase text-[var(--neu-text-muted)] mb-2">
                Test Cases
              </h3>
              <div className="flex flex-col gap-3">
                {visibleTestCases.map((testCase, testIndex) => (
                  <button type="button" key={`${testIndex}-${testCase.input}`}
                    onClick={() => {
                      setSelectedTestCaseIndex(testIndex);
                      setCustomInput(testCase.input);
                      setSelectedTestPassed(null);
                      setCustomResult(null);
                    }}
                    className={`w-full rounded-xl border p-3.5 text-left ${selectedTestCaseIndex === testIndex ? 'border-[var(--neu-accent)]/60 bg-[var(--neu-accent)]/5' : 'border-[var(--neu-border)]'}`}>
                    <span className="text-[11px] font-mono font-semibold text-[var(--neu-accent)]">
                      Test Case {testIndex + 1}{selectedTestCaseIndex === testIndex ? ' · Selected' : ''}
                    </span>
                    <div className="mt-2 grid grid-cols-1 gap-2 text-xs font-mono sm:grid-cols-2">
                      <div>
                        <span className="mb-0.5 block text-[10px] font-semibold text-[var(--neu-text-muted)]">Input:</span>
                        <pre className="overflow-x-auto rounded-lg bg-black/10 p-2 dark:bg-black/30">{testCase.input || '(empty)'}</pre>
                      </div>
                      <div>
                        <span className="mb-0.5 block text-[10px] font-semibold text-[var(--neu-text-muted)]">Expected output:</span>
                        <pre className="overflow-x-auto rounded-lg bg-green-100 text-green-950 dark:bg-green-500/10 dark:text-green-300 p-2">{testCase.expectedOutput || '(empty)'}</pre>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {currentQ.hints && (
              <div className="rounded-xl border border-[var(--neu-border)] p-4">
                <button
                  type="button"
                  aria-expanded={hintLevel > 0}
                  aria-controls={`${currentQ.id}-hints`}
                  onClick={() => setHintLevel((level) => Math.min(level + 1, currentQ.hints!.length))}
                  disabled={hintLevel >= currentQ.hints.length}
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--neu-accent)] disabled:opacity-50">
                  <Lightbulb size={15} />
                  {hintLevel === 0 ? 'Need a Hint?' : hintLevel >= currentQ.hints.length ? 'All hints shown' : `Show Hint ${hintLevel + 1}`}
                </button>
                {hintLevel > 0 && (
                  <ol id={`${currentQ.id}-hints`} className="mt-3 flex flex-col gap-2">
                    {currentQ.hints.slice(0, hintLevel).map((hint, index) => (
                      <li key={hint} className="text-sm text-[var(--neu-text-secondary)]">
                        <span className="mr-1 font-semibold text-[var(--neu-accent)]">Hint {index + 1}:</span>
                        {hint}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {currentQ.solution && (
              <div className="rounded-xl border border-[var(--neu-border)] p-4">
                <button
                  type="button"
                  aria-expanded={solutionVisible}
                  aria-controls={`${currentQ.id}-solution`}
                  onClick={() => setSolutionVisible((visible) => !visible)}
                  className="text-sm font-semibold text-[var(--neu-accent)]">
                  {solutionVisible ? 'Hide Solution' : 'View Solution'}
                </button>
                {solutionVisible && (
                  <div id={`${currentQ.id}-solution`} className="mt-3 flex flex-col gap-3">
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-[var(--neu-text-muted)]">Approach</h4>
                      <ol className="mt-1 list-inside list-decimal text-sm text-[var(--neu-text-secondary)]">
                        {currentQ.solution.approach.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </div>
                    <pre className="overflow-x-auto rounded-xl border p-3 text-xs leading-relaxed"
                      style={{ backgroundColor: 'var(--code-box-bg)', color: 'var(--code-box-text)', borderColor: 'var(--code-box-border)' }}>
                      <code>{currentQ.solution.code}</code>
                    </pre>
                    <p className="text-sm text-[var(--neu-text-secondary)]">{currentQ.solution.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </NeuCard>
        </div>

        {/* Right Column: Monaco Editor + Custom Input + Output Console */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <NeuCard className="p-5 flex flex-col gap-4">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--neu-border)]">
              <div className="flex items-center gap-2">
                <FileCode size={16} className="text-[var(--neu-accent)]" />
                <span className="text-xs font-mono font-bold text-[var(--neu-text-primary)]">
                  solution.c
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Font Size slider */}
                <div className="w-24 hidden sm:block">
                  <NeuSlider
                    min={12}
                    max={18}
                    step={1}
                    value={fontSize}
                    onChange={setFontSize}
                    unit="px"
                  />
                </div>

                {/* Reset template button */}
                <NeuIconButton
                  size="sm"
                  ariaLabel="Reset to starter template"
                  onClick={handleResetTemplate}
                >
                  <RotateCcw size={14} />
                </NeuIconButton>
              </div>
            </div>

            {/* Monaco Editor */}
            <MonacoEditorWrapper
              value={code}
              onChange={handleCodeChange}
              fontSize={fontSize}
              height="360px"
            />

            {/* Custom Input Box (stdin) */}
            <div>
              <label className="block text-xs font-mono text-[var(--neu-text-muted)] mb-1">
                Custom Input (stdin)
              </label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter custom stdin input here..."
                rows={2}
                className="w-full p-3 rounded-xl neu-inset font-mono text-xs text-[var(--neu-text-primary)] bg-[var(--neu-base)] placeholder-[var(--neu-text-muted)] outline-none border border-transparent focus:border-[var(--neu-accent)]/50"
              />
            </div>

            {/* Action Buttons: Run vs Submit */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] font-mono text-[var(--neu-text-muted)]">
                Auto-saved in browser
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <NeuButton
                  variant="secondary"
                  size="sm"
                  onClick={handleRunTestCase}
                  disabled={isRunningCustom || isSubmitting}
                  icon={<Play size={14} />}
                >
                  {isRunningCustom ? 'Running...' : 'Run Code'}
                </NeuButton>

                <NeuButton
                  variant="secondary"
                  size="sm"
                  onClick={handleRunCustom}
                  disabled={isRunningCustom || isSubmitting}
                >
                  Run Custom
                </NeuButton>

                <NeuButton
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isRunningCustom || isSubmitting}
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Code'}
                </NeuButton>
              </div>
            </div>
          </NeuCard>

          {/* Console / Test Results Panel */}
          <NeuCard className="p-5 flex flex-col gap-4">
            {/* Console Header Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--neu-border)]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--neu-text-primary)]">
                  Execution Terminal
                </span>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-full neu-inset text-xs">
                <button
                  onClick={() => setActiveConsoleTab('testcases')}
                  className={`px-3 py-1 rounded-full font-mono transition-all cursor-pointer ${
                    activeConsoleTab === 'testcases'
                      ? 'neu-raised text-[var(--neu-accent)] font-semibold'
                      : 'text-[var(--neu-text-muted)] hover:text-[var(--neu-text-primary)]'
                  }`}
                >
                  Test Cases ({currentQ.testCases.length})
                </button>
                <button
                  onClick={() => setActiveConsoleTab('custom')}
                  className={`px-3 py-1 rounded-full font-mono transition-all cursor-pointer ${
                    activeConsoleTab === 'custom'
                      ? 'neu-raised text-[var(--neu-accent)] font-semibold'
                      : 'text-[var(--neu-text-muted)] hover:text-[var(--neu-text-primary)]'
                  }`}
                >
                  Custom Output
                </button>
              </div>
            </div>

            {/* TAB 1: Test Cases Results */}
            {activeConsoleTab === 'testcases' && (
              <div className="flex flex-col gap-3">
                {showSuccessCelebration && allPassed && (
                  <div className="arena-success-celebration" role="status" aria-live="polite">
                    <span className="arena-success-check" aria-hidden="true">
                      <CheckCircle2 size={30} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-emerald-800 dark:text-emerald-300">Excellent work!</p>
                      <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">
                        All tests passed. You solved “{currentQ.title}”.
                      </p>
                    </div>
                    <span className="arena-success-spark" aria-hidden="true">✦</span>
                  </div>
                )}
                {allPassed !== null && (
                  <div
                    className={`p-3.5 rounded-xl flex items-center justify-between ${
                      allPassed
                        ? 'bg-emerald-100 border border-emerald-700/40 text-emerald-900 dark:bg-emerald-500/15 dark:border-emerald-400/40 dark:text-emerald-300'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold">
                      {allPassed ? (
                        <>
                          <CheckCircle2 size={18} />
                          <span>Accepted · All {currentQ.testCases.length} Test Cases Passed!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={18} />
                          <span>Some tests did not pass. Check your logic and try another case.</span>
                        </>
                      )}
                    </div>
                    {allPassed && (
                      <p className="mt-2 text-xs font-medium">Great job! You solved this problem.</p>
                    )}
                  </div>
                )}

                {testCaseResults ? (
                  <div className="flex flex-col gap-2.5">
                    {testCaseResults.map((tc) => (
                      <div
                        key={tc.index}
                        className={`p-3 rounded-xl neu-inset border ${
                          tc.passed
                            ? 'border-emerald-700/40 bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-500/10'
                            : 'border-rose-500/20 bg-rose-500/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="flex items-center gap-2 font-semibold">
                            {tc.passed ? (
                              <CheckCircle2 size={13} className="text-emerald-700 dark:text-emerald-400" />
                            ) : (
                              <XCircle size={13} className="text-rose-400" />
                            )}
                            <span className={tc.passed ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-400'}>
                              Test Case {tc.index} {tc.isHidden ? '(Hidden)' : '(Visible)'}
                            </span>
                          </span>
                          {tc.time && <span className="text-[10px] text-[var(--neu-text-muted)]">{tc.time}</span>}
                        </div>

                        {!tc.isHidden ? (
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2">
                            <div>
                              <span className="text-[10px] text-[var(--neu-text-muted)] block font-semibold">Expected:</span>
                              <pre className="p-1.5 rounded bg-emerald-100 dark:bg-black/40 text-emerald-950 dark:text-emerald-300 font-semibold truncate border border-emerald-700/30 dark:border-transparent">
                                {tc.expectedOutput}
                              </pre>
                            </div>
                            <div>
                              <span className="text-[10px] text-[var(--neu-text-muted)] block font-semibold">Actual:</span>
                              <pre className="p-1.5 rounded bg-black/10 dark:bg-black/40 text-slate-800 dark:text-slate-300 font-medium truncate border border-[var(--neu-border)]">
                                {tc.actualOutput || (tc.error ? 'Error' : '(empty)')}
                              </pre>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[var(--neu-text-muted)] italic">
                            Hidden test suite verification executed.
                          </span>
                        )}

                        {tc.error && (
                          <p className="mt-2 text-[11px] font-mono text-rose-800 dark:text-rose-300 bg-rose-500/10 dark:bg-black/40 p-2 rounded border border-rose-500/30">
                            {tc.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs font-mono text-[var(--neu-text-muted)]">
                    Click "Submit Code" to run against all visible and hidden test suites.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Custom Run Output */}
            {activeConsoleTab === 'custom' && (
              <div className="flex flex-col gap-3 font-mono text-xs">
                {customResult ? (
                  <>
                    {selectedTestPassed !== null && (
                      <div className={`rounded-xl border p-3 font-sans text-sm font-semibold ${
                        selectedTestPassed
                          ? 'border-emerald-700/40 bg-emerald-100 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300'
                          : 'border-rose-500/30 bg-rose-500/10 text-rose-500'
                      }`}>
                        {selectedTestPassed ? '✓ Test Case Passed' : '✗ Test Case Failed'}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[11px] text-[var(--neu-text-muted)] pb-1 border-b border-[var(--neu-border)]">
                      <span>Status: <strong className="text-[var(--neu-accent)] uppercase">{customResult.status}</strong></span>
                      {customResult.time && <span>Runtime: {customResult.time}</span>}
                    </div>

                    {customResult.stdout && (
                      <div>
                        <span className="text-[10px] text-[var(--neu-text-muted)] block mb-1">Standard Output:</span>
                        <pre className="p-3 rounded-xl neu-inset bg-[#17191d] text-emerald-400 whitespace-pre-wrap overflow-x-auto">
                          {customResult.stdout}
                        </pre>
                      </div>
                    )}

                    {customResult.stderr && (
                      <div>
                        <span className="text-[10px] text-rose-400 block mb-1">Errors / Warnings:</span>
                        <pre className="p-3 rounded-xl neu-inset bg-red-950/20 text-rose-300 whitespace-pre-wrap overflow-x-auto">
                          {customResult.stderr}
                        </pre>
                      </div>
                    )}
                    {selectedTestPassed === false && (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                          <span className="text-[10px] text-[var(--neu-text-muted)] block mb-1">Expected:</span>
                          <pre className="p-3 rounded-xl neu-inset whitespace-pre-wrap overflow-x-auto">{visibleTestCases[selectedTestCaseIndex]?.expectedOutput || '(empty)'}</pre>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--neu-text-muted)] block mb-1">Your output:</span>
                          <pre className="p-3 rounded-xl neu-inset whitespace-pre-wrap overflow-x-auto">{customResult.stdout || '(empty)'}</pre>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-8 text-center text-xs text-[var(--neu-text-muted)]">
                    Choose a visible test case and click "Run Code", or run your own input with "Run Custom".
                  </div>
                )}
              </div>
            )}
          </NeuCard>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--neu-border)] pt-4">
        <NeuButton variant="secondary" size="sm" disabled={selectedQuestionIndex === 0}
          onClick={() => setSelectedQuestionIndex((index) => Math.max(0, index - 1))}
          icon={<ChevronLeft size={16} />}>Previous Problem</NeuButton>
        <NeuButton variant="secondary" size="sm" disabled={selectedQuestionIndex === questions.length - 1}
          onClick={() => setSelectedQuestionIndex((index) => Math.min(questions.length - 1, index + 1))}
          icon={<ChevronRight size={16} />} iconPosition="right">Next Problem</NeuButton>
      </div>
    </div>
  );
};
