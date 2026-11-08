
import { buildMCQBank, MCQRow } from '../mcqBank';

const rows: MCQRow[] = [
  // ==================== EASY (15) ====================

  {
    difficulty: 'easy',
    question: 'Which keyword begins a conditional statement in C?',
    options: ['when', 'if', 'check', 'condition'],
    correctIndex: 1,
    explanation: 'The if statement executes a block when its condition is true.',
    subtopic: 'if'
  },
  {
    difficulty: 'easy',
    question: 'Which keyword provides the alternative branch of an if statement?',
    options: ['otherwise', 'else', 'default', 'then'],
    correctIndex: 1,
    explanation: 'else executes when the associated if condition is false.',
    subtopic: 'if-else'
  },
  {
    difficulty: 'easy',
    question: 'Which keyword is used for multi-way selection?',
    options: ['select', 'case', 'switch', 'choose'],
    correctIndex: 2,
    explanation: 'switch selects one of several possible cases.',
    subtopic: 'switch'
  },
  {
    difficulty: 'easy',
    question: 'Which keyword labels an alternative inside switch?',
    options: ['option', 'case', 'branch', 'when'],
    correctIndex: 1,
    explanation: 'case specifies a possible value of the switch expression.',
    subtopic: 'switch'
  },
  {
    difficulty: 'easy',
    question: 'Which statement normally stops switch fall-through?',
    options: ['stop', 'exit', 'break', 'continue'],
    correctIndex: 2,
    explanation: 'break transfers control out of the switch statement.',
    subtopic: 'break'
  },
  {
    difficulty: 'easy',
    question: 'Which value is treated as false in a C condition?',
    options: ['1', '-1', 'Any nonzero value', '0'],
    correctIndex: 3,
    explanation: 'C treats zero as false and nonzero values as true.',
    subtopic: 'conditions'
  },
  {
    difficulty: 'easy',
    question: 'What does default in a switch normally handle?',
    options: ['The first case', 'No matching case', 'Every case', 'Only zero'],
    correctIndex: 1,
    explanation: 'default executes when no case label matches.',
    subtopic: 'default'
  },
  {
    difficulty: 'easy',
    question: 'Which operator means logical AND?',
    options: ['||', '&&', '!', '&'],
    correctIndex: 1,
    explanation: '&& is true when both operands are true.',
    subtopic: 'logical operators'
  },
  {
    difficulty: 'easy',
    question: 'Which operator tests equality?',
    options: ['=', '==', '!=', '=>'],
    correctIndex: 1,
    explanation: '== compares two values for equality.',
    subtopic: 'comparison'
  },
  {
    difficulty: 'easy',
    question: 'Which condition correctly checks whether n is even?',
    options: [
      'n / 2 == 0',
      'n % 2 == 0',
      'n % 2 = 0',
      'n == 2'
    ],
    correctIndex: 1,
    explanation: 'An even integer has remainder zero when divided by 2.',
    subtopic: 'parity'
  },
  {
    difficulty: 'easy',
    question: 'Can an if statement exist without an else?',
    options: ['Yes', 'No', 'Only in switch', 'Only with integers'],
    correctIndex: 0,
    explanation: 'The else branch is optional.',
    subtopic: 'if'
  },
  {
    difficulty: 'easy',
    question: 'What is a nested if statement?',
    options: [
      'An if inside another if',
      'An if after a loop',
      'A switch without cases',
      'An if without a condition'
    ],
    correctIndex: 0,
    explanation: 'A nested if is an if statement placed inside another conditional block.',
    subtopic: 'nested if'
  },
  {
    difficulty: 'easy',
    question: 'Which type cannot be used directly as a switch expression?',
    options: ['int', 'char', 'enum', 'float'],
    correctIndex: 3,
    explanation: 'C switch expressions must have an integral or enumeration type.',
    subtopic: 'switch'
  },
  {
    difficulty: 'easy',
    question: 'Which condition checks whether x is between 1 and 5 inclusive?',
    options: [
      'x >= 1 && x <= 5',
      'x > 1 || x < 5',
      'x == 1 && x == 5',
      'x < 1 && x > 5'
    ],
    correctIndex: 0,
    explanation: 'Both boundary conditions must be true.',
    subtopic: 'range checking'
  },
  {
    difficulty: 'easy',
    question: 'How many conditions can an else-if ladder contain?',
    options: ['Only one', 'Only two', 'Several', 'None'],
    correctIndex: 2,
    explanation: 'An else-if ladder can contain multiple conditions.',
    subtopic: 'else-if'
  },

  // ==================== MEDIUM (20) ====================

  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 7; if (x > 5) printf("A"); else printf("B");',
    options: ['A', 'B', 'AB', 'No output'],
    correctIndex: 0,
    explanation: '7 is greater than 5, so A is printed.',
    subtopic: 'if-else'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int n = 4; if (n % 2 == 0) printf("Even"); else printf("Odd");',
    options: ['Odd', 'Even', '4', '0'],
    correctIndex: 1,
    explanation: '4 % 2 is 0, so the even branch executes.',
    subtopic: 'parity'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int score = 72; if (score >= 90) printf("A"); else if (score >= 60) printf("Pass"); else printf("Fail");',
    options: ['A', 'Pass', 'Fail', 'APass'],
    correctIndex: 1,
    explanation: '72 is below 90 but at least 60.',
    subtopic: 'else-if'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 0; if (x) printf("T"); else printf("F");',
    options: ['T', 'F', '0', 'No output'],
    correctIndex: 1,
    explanation: 'Zero is treated as false in C.',
    subtopic: 'conditions'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 5; if (x = 3) printf("T"); else printf("F");',
    options: ['F', 'T', '5', 'Compilation error'],
    correctIndex: 1,
    explanation: 'x is assigned 3, and 3 is nonzero, so the condition is true.',
    subtopic: 'assignment vs equality'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int n = 2; switch(n) { case 1: printf("A"); break; case 2: printf("B"); break; default: printf("D"); }',
    options: ['A', 'B', 'D', 'BD'],
    correctIndex: 1,
    explanation: 'n matches case 2, which prints B.',
    subtopic: 'switch'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int n = 2; switch(n) { case 1: printf("A"); case 2: printf("B"); default: printf("D"); }',
    options: ['B', 'BD', 'ABD', 'D'],
    correctIndex: 1,
    explanation: 'Execution begins at case 2 and falls through to default.',
    subtopic: 'fall-through'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int n = 9; switch(n) { case 1: printf("A"); break; default: printf("D"); }',
    options: ['A', 'D', '9', 'No output'],
    correctIndex: 1,
    explanation: 'There is no matching case, so default executes.',
    subtopic: 'default'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int a = 3, b = 8; if (a < b && b < 10) printf("Y"); else printf("N");',
    options: ['Y', 'N', '38', 'No output'],
    correctIndex: 0,
    explanation: 'Both comparisons are true.',
    subtopic: 'logical conditions'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 6; if (x > 0) { if (x % 2 == 0) printf("Even"); else printf("Odd"); }',
    options: ['Even', 'Odd', '6', 'No output'],
    correctIndex: 0,
    explanation: '6 is positive and even.',
    subtopic: 'nested if'
  },
  {
    difficulty: 'medium',
    question: 'Which condition correctly identifies a negative number?',
    options: ['n < 0', 'n > 0', 'n == 0', 'n != 0'],
    correctIndex: 0,
    explanation: 'Negative numbers are less than zero.',
    subtopic: 'comparison'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 4; if (x == 4 || x == 5) printf("Yes"); else printf("No");',
    options: ['Yes', 'No', '45', 'No output'],
    correctIndex: 0,
    explanation: 'The first OR condition is true.',
    subtopic: 'logical conditions'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 4; if (!(x > 5)) printf("Yes"); else printf("No");',
    options: ['Yes', 'No', '4', 'No output'],
    correctIndex: 0,
    explanation: 'x > 5 is false, so !false is true.',
    subtopic: 'logical NOT'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int day = 3; switch(day) { case 1: printf("Mon"); break; case 3: printf("Wed"); break; default: printf("Other"); }',
    options: ['Mon', 'Wed', 'Other', 'No output'],
    correctIndex: 1,
    explanation: 'day equals 3, so case 3 executes.',
    subtopic: 'switch'
  },
  {
    difficulty: 'medium',
    question: 'Which condition accepts a score from 0 to 100 inclusive?',
    options: [
      'score >= 0 && score <= 100',
      'score > 0 || score < 100',
      'score < 0 && score > 100',
      'score == 0 || score == 100'
    ],
    correctIndex: 0,
    explanation: 'Both inclusive boundaries must be satisfied.',
    subtopic: 'range checking'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 10; if (x < 5) printf("L"); else if (x < 15) printf("M"); else printf("H");',
    options: ['L', 'M', 'H', 'LM'],
    correctIndex: 1,
    explanation: '10 is not below 5 but is below 15.',
    subtopic: 'else-if'
  },
  {
    difficulty: 'medium',
    question: 'What happens when a matching switch case has no break?',
    options: [
      'The switch repeats',
      'Execution continues into following statements',
      'The program always crashes',
      'default is skipped automatically'
    ],
    correctIndex: 1,
    explanation: 'Without break, control falls through to subsequent statements.',
    subtopic: 'fall-through'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 3; if (x < 2) printf("A"); else if (x < 4) printf("B"); else printf("C");',
    options: ['A', 'B', 'C', 'BC'],
    correctIndex: 1,
    explanation: '3 is not less than 2 but is less than 4.',
    subtopic: 'else-if'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int n = 5; if (n % 2 != 0) printf("Odd"); else printf("Even");',
    options: ['Odd', 'Even', '5', 'No output'],
    correctIndex: 0,
    explanation: '5 % 2 is 1, so the number is odd.',
    subtopic: 'parity'
  },
  {
    difficulty: 'medium',
    question: 'What is printed?',
    codeSnippet: 'int x = 2; if (x == 1) printf("A"); if (x == 2) printf("B"); else printf("C");',
    options: ['A', 'B', 'C', 'BC'],
    correctIndex: 1,
    explanation: 'The first if is false. The second if is true, so B prints.',
    subtopic: 'independent if'
  },

  // ==================== HARD (15) ====================

  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int x = 8; if (x > 3) if (x < 5) printf("A"); else printf("B");',
    options: ['A', 'B', 'AB', 'No output'],
    correctIndex: 1,
    explanation: 'The else belongs to the nearest unmatched if. x < 5 is false.',
    subtopic: 'dangling else'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int n = 2; switch(n) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); break; default: printf("D"); }',
    options: ['B', 'BC', 'ABC', 'BCD'],
    correctIndex: 1,
    explanation: 'Execution begins at case 2, prints B and C, then reaches break.',
    subtopic: 'fall-through'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int x = 12; if (x >= 10 && x <= 20) { if (x % 2 == 0) printf("Even"); else printf("Odd"); } else printf("Out");',
    options: ['Even', 'Odd', 'Out', 'No output'],
    correctIndex: 0,
    explanation: '12 is inside the range and is even.',
    subtopic: 'nested conditions'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int score = 85; if (score >= 90) printf("A"); else if (score >= 80) printf("B"); else if (score >= 70) printf("C"); else printf("D");',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: '85 satisfies the score >= 80 condition.',
    subtopic: 'grading logic'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int n = 1; switch(n) { default: printf("D"); case 1: printf("A"); break; }',
    options: ['D', 'A', 'DA', 'AD'],
    correctIndex: 1,
    explanation: 'The switch jumps directly to matching case 1; default is not executed.',
    subtopic: 'switch'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int a = 5, b = 5; if (a = b) printf("Same"); else printf("Different");',
    options: ['Same', 'Different', '5', 'Compilation error'],
    correctIndex: 0,
    explanation: 'a is assigned 5, and the resulting nonzero value makes the condition true.',
    subtopic: 'assignment vs equality'
  },
  {
    difficulty: 'hard',
    question: 'Which expression is true when x is outside 10 through 20 inclusive?',
    options: [
      'x < 10 || x > 20',
      'x < 10 && x > 20',
      'x >= 10 && x <= 20',
      'x == 10 || x == 20'
    ],
    correctIndex: 0,
    explanation: 'Outside the range means below 10 or above 20.',
    subtopic: 'range checking'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int x = 0; if (x != 0 && 10 / x > 1) printf("Y"); else printf("N");',
    options: ['Y', 'N', 'Runtime error', '10'],
    correctIndex: 1,
    explanation: 'The first operand is false, so && skips the division.',
    subtopic: 'short-circuit'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int n = 3; switch(n) { case 1: case 2: printf("Low"); break; case 3: case 4: printf("Mid"); break; default: printf("High"); }',
    options: ['Low', 'Mid', 'High', 'MidHigh'],
    correctIndex: 1,
    explanation: 'Cases 3 and 4 share the same statement, so Mid is printed.',
    subtopic: 'grouped cases'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int x = 5; if (x > 0) { if (x > 10) printf("Large"); } else printf("Negative");',
    options: ['Large', 'Negative', 'No output', '5'],
    correctIndex: 2,
    explanation: 'x > 0 is true, but x > 10 is false. The outer else is therefore skipped.',
    subtopic: 'nested if'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int x = 2; if (x == 2) { if (x > 0) printf("P"); else printf("N"); }',
    options: ['P', 'N', 'PN', 'No output'],
    correctIndex: 0,
    explanation: 'Both conditions are true, so P is printed.',
    subtopic: 'nested if'
  },
  {
    difficulty: 'hard',
    question: 'Which correction properly checks equality?',
    options: [
      'if (x = 5)',
      'if (x == 5)',
      'if (x === 5)',
      'if (x equals 5)'
    ],
    correctIndex: 1,
    explanation: 'C uses == for equality comparison.',
    subtopic: 'debugging'
  },
  {
    difficulty: 'hard',
    question: 'What does short-circuit evaluation mean for &&?',
    options: [
      'Both operands are always evaluated',
      'The right operand is skipped when the left is false',
      'The left operand is skipped',
      'The result is always false'
    ],
    correctIndex: 1,
    explanation: 'A false left operand guarantees the result is false.',
    subtopic: 'short-circuit'
  },
  {
    difficulty: 'hard',
    question: 'Which is the correct syntax for the conditional operator?',
    options: [
      'condition : true : false',
      'condition ? true : false',
      'if ? condition : else',
      'condition ?? true : false'
    ],
    correctIndex: 1,
    explanation: 'The conditional operator uses condition ? expression1 : expression2.',
    subtopic: 'conditional operator'
  },
  {
    difficulty: 'hard',
    question: 'What is printed?',
    codeSnippet: 'int a = 10, b = 20; if (a < b) { if (b - a == 10) printf("X"); else printf("Y"); } else printf("Z");',
    options: ['X', 'Y', 'Z', 'XY'],
    correctIndex: 0,
    explanation: 'a < b is true and b - a equals 10.',
    subtopic: 'nested conditions'
  }
];

export const decisionMCQs = buildMCQBank(
  'decision-making',
  'dm',
  rows
);
