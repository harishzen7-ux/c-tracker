import { TopicMeta } from '../types';

export const TOPICS_META: TopicMeta[] = [
  {
    id: 'input-output',
    title: 'Input and Output',
    description: 'Master standard C stream operations: printf, scanf, specifiers, buffered I/O, escape codes, width & precision formatting.',
    iconName: 'Terminal',
    order: 1,
    subtopics: [
      'printf and scanf',
      'Format Specifiers',
      'getchar, putchar, gets, puts, fgets',
      'Escape Sequences',
      'Width & Precision Formatting',
    ],
  },
  {
    id: 'operators-expressions',
    title: 'Operators and Expressions',
    description: 'Arithmetic, relational, logical, bitwise operators, unary expressions, precedence, associativity, and type casting.',
    iconName: 'Binary',
    order: 2,
    subtopics: [
      'Arithmetic & Assignment',
      'Relational & Logical',
      'Bitwise Operations',
      'Precedence & Associativity',
      'Type Conversion & Casting',
    ],
  },
  {
    id: 'decision-making',
    title: 'Decision Making Statements',
    description: 'Conditional branching with if, if-else, nested conditionals, switch-case constructs, ternary operators, and common traps.',
    iconName: 'GitBranch',
    order: 3,
    subtopics: [
      'if and if-else',
      'else-if Ladder & Nested if',
      'switch-case Construct',
      'Ternary Operator (?:)',
      'Pitfalls: Assignment vs Equality',
    ],
  },
  {
    id: 'looping',
    title: 'Looping',
    description: 'Iteration mastery with for, while, do-while loops, nested structures, loop controls (break, continue), and pattern printing.',
    iconName: 'Repeat',
    order: 4,
    subtopics: [
      'for Loop Mechanics',
      'while & do-while Loops',
      'break and continue Controls',
      'Nested Loops & Matrices',
      'Pattern Printing Logic',
    ],
  },
];
