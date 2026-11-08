import { Difficulty, MCQ, TopicId } from '../../types';

export type MCQRow = {
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  optionExplanations?: [string, string, string, string];
  subtopic: string;
  codeSnippet?: string;
};

function formatCodeSnippet(code: string): string {
  let formatted = '';
  let indent = 0;
  let parenthesisDepth = 0;
  let inString = false;
  let escaped = false;

  const appendIndent = () => {
    if (formatted.endsWith('\n') || formatted.length === 0) {
      formatted += '    '.repeat(indent);
    }
  };

  for (let index = 0; index < code.length; index += 1) {
    const character = code[index];
    const nextCharacter = code[index + 1];

    if (!inString && character === '\\' && nextCharacter === 'n') {
      formatted += '\n';
      index += 1;
      appendIndent();
      continue;
    }

    if (inString) {
      formatted += character;
      if (character === '"' && !escaped) inString = false;
      escaped = character === '\\' && !escaped;
      if (character !== '\\') escaped = false;
      continue;
    }

    if (
      (character === ' ' || character === '\t')
      && /\n[ \t]*$/.test(formatted)
    ) {
      continue;
    }

    if (character === '"') {
      inString = true;
      formatted += character;
      continue;
    }

    if (character === '(') parenthesisDepth += 1;
    if (character === ')') parenthesisDepth = Math.max(0, parenthesisDepth - 1);

    if (character === '{') {
      formatted = formatted.trimEnd();
      formatted += ' {\n';
      indent += 1;
      appendIndent();
      continue;
    }

    if (character === '}') {
      formatted = formatted.replace(/[ \t]+$/g, '');
      indent = Math.max(0, indent - 1);
      if (!formatted.endsWith('\n')) formatted += '\n';
      appendIndent();
      formatted += '}';
      if (nextCharacter && nextCharacter !== ';') formatted += '\n';
      continue;
    }

    formatted += character;
    if (character === ')' && parenthesisDepth === 0) {
      const remainder = code.slice(index + 1).trimStart();
      if (/^(printf|putchar|if|for|while)\b/.test(remainder)) {
        formatted += '\n';
        formatted += '    '.repeat(indent + 1);
      }
    }
    if (character === ';' && parenthesisDepth === 0) {
      formatted += '\n';
      appendIndent();
    }
  }

  return formatted.trim();
}

export function buildMCQBank(topicId: TopicId, prefix: string, rows: MCQRow[]): MCQ[] {
  const answerPositions = [1, 3, 0, 2, 3, 0, 2, 1, 0, 2, 1, 3, 2, 1, 3, 0];
  const targetCounts: Record<Difficulty, number> = {
    easy: 15,
    medium: 20,
    hard: 15,
  };
  const prioritizedRows = rows.filter((row) => row.subtopic.toLowerCase().includes('theory'));
  const remainingRows = rows.filter((row) => !row.subtopic.toLowerCase().includes('theory'));
  const selectedRows: MCQRow[] = [];

  (Object.keys(targetCounts) as Difficulty[]).forEach((difficulty) => {
    const theoryRows = prioritizedRows.filter((row) => row.difficulty === difficulty);
    const otherRows = remainingRows.filter((row) => row.difficulty === difficulty);
    selectedRows.push(...theoryRows, ...otherRows.slice(0, targetCounts[difficulty] - theoryRows.length));
  });

  return selectedRows.map((row, index) => {
    const targetIndex = answerPositions[index % answerPositions.length];
    const options = [...row.options];
    const optionExplanations = row.optionExplanations
      ? [...row.optionExplanations]
      : row.options.map((option, optionIndex) => optionIndex === row.correctIndex
        ? `Correct. ${row.explanation}`
        : `This option means "${option}", but it does not satisfy the question. The correct concept is explained above.`) as [string, string, string, string];
    const [correctOption] = options.splice(row.correctIndex, 1);
    const [correctExplanation] = optionExplanations.splice(row.correctIndex, 1);
    options.splice(targetIndex, 0, correctOption);
    optionExplanations.splice(targetIndex, 0, correctExplanation);
    const prompt = row.question === 'What is printed?'
      ? `What is printed by this ${row.subtopic.toLowerCase()} example?`
      : row.question === 'How many iterations occur?'
        ? 'How many iterations occur in this loop example?'
        : row.question;

    return {
      id: `${prefix}-mcq-${index + 1}`,
      topicId,
      ...row,
      question: prompt,
      codeSnippet: row.codeSnippet ? formatCodeSnippet(row.codeSnippet) : undefined,
      options: options as [string, string, string, string],
      optionExplanations: optionExplanations as [string, string, string, string],
      correctIndex: targetIndex,
    };
  });
}
