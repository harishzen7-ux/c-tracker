import { CodingQuestion, Difficulty, TopicId } from '../../types';

export interface GuidedQuestionDraft {
  title: string;
  concept: string;
  problem: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  cases: Array<{ input: string; output: string }>;
  hints: [string, string, string];
  solutionCode: string;
  explanation: string;
  difficulty?: Difficulty;
}

export function createGuidedQuestions(
  topicId: TopicId,
  prefix: string,
  drafts: GuidedQuestionDraft[],
  startNumber = 1,
): CodingQuestion[] {
  return drafts.map((draft, index) => {
    const number = startNumber + index;
    const difficulty = draft.difficulty || (number <= 7 ? 'easy' : number <= 14 ? 'medium' : 'hard');
    const testCases = draft.cases.map((testCase, caseIndex) => ({
      input: testCase.input,
      expectedOutput: testCase.output,
      isHidden: caseIndex > 0,
    }));

    return {
      id: `${prefix}-${String(number).padStart(3, '0')}`,
      topicId,
      number,
      title: draft.title,
      difficulty,
      concept: draft.concept,
      problemStatement: draft.problem,
      inputFormat: draft.inputFormat,
      outputFormat: draft.outputFormat,
      constraints: draft.constraints,
      sampleCases: draft.cases.slice(0, 1).map((testCase) => ({
        input: testCase.input,
        output: testCase.output,
      })),
      testCases,
      starterCode: '#include <stdio.h>\n\nint main(void) {\n    // Read the input and write your solution here.\n\n    return 0;\n}',
      hints: draft.hints,
      solution: {
        approach: draft.hints.slice(0, 2),
        code: draft.solutionCode,
        explanation: draft.explanation,
      },
    };
  });
}
