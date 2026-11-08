export type TopicId = 'input-output' | 'operators-expressions' | 'decision-making' | 'looping';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type TopicStatus = 'not_started' | 'in_progress' | 'mastered';

export type LearningStage = 'understand' | 'learn' | 'explore' | 'practice' | 'check' | 'master';

export interface ConceptLearningProgress {
  completedStages: Partial<Record<LearningStage, boolean>>;
  currentStage: LearningStage;
  bestCheckScore: number;
  mastered: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  concept: string;
  syntax?: string;
  codeSnippet?: string;
  annotation?: string;
  commonMistakes?: string[];
  quickRecap?: string[];
  level?: 'Foundation' | 'Core Concepts' | 'Practice' | 'Intermediate';
  keyPoint?: string;
}

export interface LessonExample {
  title: string;
  difficulty: 'Easy' | 'Semi-moderate' | 'Moderate';
  problem: string;
  approach: string;
  code: string;
  expectedOutput: string;
  explanation: string;
}

export interface PracticeQuestion {
  title: string;
  prompt: string;
  difficulty: 'beginner' | 'easy' | 'intermediate';
}

export interface CommonMistake {
  mistake: string;
  why: string;
  correctApproach: string;
}

export interface KnowledgeCheckQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface OutputPredictionQuestion {
  code: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  topicId: TopicId;
  title: string;
  order: number;
  sections: LessonSection[];
  startHere?: string;
  examples?: LessonExample[];
  practice?: {
    beginner: PracticeQuestion[];
    easy: PracticeQuestion[];
    intermediate: PracticeQuestion[];
  };
  outputPredictions?: OutputPredictionQuestion[];
  commonMistakes?: CommonMistake[];
  quickCheck?: {
    questions: KnowledgeCheckQuestion[];
    outputPrediction: OutputPredictionQuestion;
    codingQuestion: string;
  };
  completion?: {
    learned: string[];
    canNow: string[];
    nextStep: string;
  };
}

export interface MCQ {
  id: string;
  topicId: TopicId;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  optionExplanations: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  subtopic: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface CodingQuestion {
  id: string;
  topicId: TopicId;
  number: number;
  title: string;
  difficulty: Difficulty;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleCases: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases: TestCase[];
  starterCode: string;
  solutionReference?: string;
  concept?: string;
  hints?: [string, string, string];
  solution?: {
    approach: string[];
    code: string;
    explanation: string;
  };
}

export interface TopicMeta {
  id: TopicId;
  title: string;
  description: string;
  iconName: string;
  order: number;
  subtopics: string[];
}

export interface UserProgress {
  completedLessons: Record<string, boolean>; // key: `${topicId}:${sectionId}`
  bookmarkedMCQs: Record<string, boolean>;
  mcqBestScores: Record<string, {
    score: number;
    total: number;
    date: string;
    accuracy: number;
    timeSeconds: number;
    difficultyBreakdown: {
      easy: { correct: number; total: number };
      medium: { correct: number; total: number };
      hard: { correct: number; total: number };
    };
  }>;
  solvedProblems: Record<string, boolean>; // key: questionId
  savedCode: Record<string, string>; // key: questionId
  streak: {
    count: number;
    lastActiveDate: string;
  };
  loginStreakVersion: number;
  themePreferenceVersion: number;
  theme: 'dark' | 'light';
  timerEnabled: boolean;
  learningArena: Record<string, ConceptLearningProgress>;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  compileOutput?: string;
  time?: string;
  status: 'accepted' | 'wrong_answer' | 'compilation_error' | 'runtime_error' | 'time_limit_exceeded';
}
