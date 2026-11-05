import React, { useState, useEffect } from 'react';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Code,
  Terminal,
  Clock,
  Sparkles,
  AlertCircle,
  FileCode,
  Layers,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CodingQuestion, TopicId, TestCase, ExecutionResult } from '../../types';
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
  const [editorMode, setEditorMode] = useState<'monaco' | 'native'>('monaco');

  // Execution states
  const [isRunningCustom, setIsRunningCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customResult, setCustomResult] = useState<ExecutionResult | null>(null);
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[] | null>(null);
  const [allPassed, setAllPassed] = useState<boolean | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'custom' | 'testcases'>('testcases');

  // Load saved code when current question changes
  useEffect(() => {
    if (currentQ) {
      const saved = storageService.getSavedCode(currentQ.id, currentQ.starterCode);
      setCode(saved);
      setCustomInput(currentQ.sampleCases[0]?.input || '');
      setCustomResult(null);
      setTestCaseResults(null);
      setAllPassed(null);
      setActiveConsoleTab('testcases');
    }
  }, [currentQ]);

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

  // Submit against all test cases (visible + hidden)
  const handleSubmit = async () => {
    if (!currentQ) return;
    setIsSubmitting(true);
    setActiveConsoleTab('testcases');

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
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF7A1A', '#22c55e', '#38bdf8'],
        });
      } catch (e) {
        // safe
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
                {solved && <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
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
                  CHALLENGE {currentQ.number} OF {questions.length}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--neu-text-primary)] mt-0.5">
                  {currentQ.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NeuBadge variant={currentQ.difficulty}>{currentQ.difficulty.toUpperCase()}</NeuBadge>
                {isSolved && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 size={12} />
                    <span>Solved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Problem Statement */}
            <div>
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

            {/* Sample Cases */}
            <div>
              <h3 className="text-xs font-semibold font-mono uppercase text-[var(--neu-text-muted)] mb-2">
                Sample Test Cases
              </h3>
              <div className="flex flex-col gap-3">
                {currentQ.sampleCases.map((sample, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl neu-inset flex flex-col gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[var(--neu-accent)]">
                      Sample {sIdx + 1}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-[var(--neu-text-muted)] block mb-0.5 font-semibold">Input:</span>
                        <pre className="p-2 rounded-lg bg-black/20 dark:bg-black/30 text-slate-800 dark:text-slate-300 font-medium overflow-x-auto">
                          {sample.input || '(empty)'}
                        </pre>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--neu-text-muted)] block mb-0.5 font-semibold">Output:</span>
                        <pre className="p-2 rounded-lg bg-emerald-500/10 dark:bg-black/30 text-emerald-800 dark:text-emerald-400 font-semibold overflow-x-auto border border-emerald-500/20 dark:border-transparent">
                          {sample.output}
                        </pre>
                      </div>
                    </div>
                    {sample.explanation && (
                      <span className="text-[11px] text-[var(--neu-text-secondary)] italic">
                        {sample.explanation}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                  solution.c (C99 Standard)
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mode toggle button */}
                <button
                  type="button"
                  onClick={() => setEditorMode((prev) => (prev === 'monaco' ? 'native' : 'monaco'))}
                  className="px-2.5 py-1 rounded-lg neu-inset text-[11px] font-mono text-[var(--neu-text-secondary)] hover:text-[var(--neu-accent)] transition-all cursor-pointer flex items-center gap-1.5"
                  title="Switch between Monaco and lightweight C editor"
                >
                  <Code size={12} className="text-[var(--neu-accent)]" />
                  <span>{editorMode === 'monaco' ? 'Monaco Engine' : 'Fast C Editor'}</span>
                </button>

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

            {/* Monaco / Native Editor */}
            <MonacoEditorWrapper
              value={code}
              onChange={handleCodeChange}
              fontSize={fontSize}
              height="360px"
              mode={editorMode}
              onModeToggle={() => setEditorMode((prev) => (prev === 'monaco' ? 'native' : 'monaco'))}
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
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono text-[var(--neu-text-muted)]">
                Auto-saved in browser
              </span>

              <div className="flex items-center gap-3">
                <NeuButton
                  variant="secondary"
                  size="sm"
                  onClick={handleRunCustom}
                  disabled={isRunningCustom || isSubmitting}
                  icon={<Play size={14} />}
                >
                  {isRunningCustom ? 'Running...' : 'Run Custom'}
                </NeuButton>

                <NeuButton
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isRunningCustom || isSubmitting}
                  icon={<Send size={14} />}
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
                <Terminal size={15} className="text-[var(--neu-accent)]" />
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
                {allPassed !== null && (
                  <div
                    className={`p-3.5 rounded-xl flex items-center justify-between ${
                      allPassed
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
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
                          <span>Wrong Answer / Runtime Check Failed</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {testCaseResults ? (
                  <div className="flex flex-col gap-2.5">
                    {testCaseResults.map((tc) => (
                      <div
                        key={tc.index}
                        className={`p-3 rounded-xl neu-inset border ${
                          tc.passed
                            ? 'border-emerald-500/20 bg-emerald-500/5'
                            : 'border-rose-500/20 bg-rose-500/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="flex items-center gap-2 font-semibold">
                            {tc.passed ? (
                              <CheckCircle2 size={13} className="text-emerald-400" />
                            ) : (
                              <XCircle size={13} className="text-rose-400" />
                            )}
                            <span className={tc.passed ? 'text-emerald-400' : 'text-rose-400'}>
                              Test Case {tc.index} {tc.isHidden ? '(Hidden)' : '(Visible)'}
                            </span>
                          </span>
                          {tc.time && <span className="text-[10px] text-[var(--neu-text-muted)]">{tc.time}</span>}
                        </div>

                        {!tc.isHidden ? (
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2">
                            <div>
                              <span className="text-[10px] text-[var(--neu-text-muted)] block font-semibold">Expected:</span>
                              <pre className="p-1.5 rounded bg-black/10 dark:bg-black/40 text-emerald-800 dark:text-emerald-400 font-semibold truncate border border-emerald-500/20 dark:border-transparent">
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
                  </>
                ) : (
                  <div className="py-8 text-center text-xs text-[var(--neu-text-muted)]">
                    Click "Run Custom" to execute solution.c against your custom stdin.
                  </div>
                )}
              </div>
            )}
          </NeuCard>
        </div>
      </div>
    </div>
  );
};
