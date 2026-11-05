import { MCQ } from '../../../types';

export const decisionMCQs: MCQ[] = [
  // ================= EASY (20 QUESTIONS) =================
  {
    id: 'dm-mcq-1',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'In C, which integer value is evaluated as false by an if statement condition?',
    options: ['0', '1', '-1', 'NULL character only'],
    correctIndex: 0,
    explanation: 'In C, exactly 0 represents false; every non-zero integer (positive or negative) represents true.',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-2',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the output of the following C code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = -5;
    if (x) {
        printf("True");
    } else {
        printf("False");
    }
    return 0;
}`,
    options: ['True', 'False', 'Compilation error', 'Undefined behavior'],
    correctIndex: 0,
    explanation: '-5 is non-zero, hence truthy in C. The condition succeeds and prints "True".',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-3',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What happens when an accidental semicolon is placed immediately after an if condition: if (a > b); { printf("Greater"); }?',
    options: [
      'The block { printf("Greater"); } executes unconditionally',
      'Compilation syntax error',
      'The program hangs indefinitely',
      'The printf statement is deleted by the optimizer'
    ],
    correctIndex: 0,
    explanation: 'The semicolon terminates the if statement as an empty null statement. The subsequent compound block { printf("Greater"); } executes unconditionally regardless of whether a > b.',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-4',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'Which statement terminates the execution of a switch-case block and transfers control outside the switch?',
    options: ['continue', 'break', 'exit', 'return'],
    correctIndex: 1,
    explanation: 'The break statement terminates execution within the switch body and jumps to the statement following the switch.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-5',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'Which of the following data types CANNOT be used in a switch statement condition in C?',
    options: ['int', 'char', 'float', 'enum'],
    correctIndex: 2,
    explanation: 'The switch condition in C must evaluate to an integral type (int, char, enum, short, long). Floating point numbers (float, double) are forbidden.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-6',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 0;
    if (a = 5) {
        printf("Five");
    } else {
        printf("Zero");
    }
    return 0;
}`,
    options: ['Five', 'Zero', 'Compilation error', '0'],
    correctIndex: 0,
    explanation: 'a = 5 is an assignment expression that assigns 5 to a and evaluates to the assigned value 5. Since 5 is non-zero (true), the if branch prints "Five".',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-7',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the purpose of the default label in a switch-case statement?',
    options: [
      'It must always be the first label',
      'It executes when none of the explicit case constants match the switch expression',
      'It is mandatory in every switch statement',
      'It causes the compiler to generate an error'
    ],
    correctIndex: 1,
    explanation: 'The default case acts as a catch-all fallback when none of the case constants match the evaluated expression.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-8',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'To which if does the else clause bind in a nested if statement without braces?',
    options: [
      'The first if in the function',
      'The nearest preceding unmatched if at the same nesting level',
      'The outermost if',
      'It produces a compiler syntax error'
    ],
    correctIndex: 1,
    explanation: 'In C\'s grammar rule for the "dangling else", an else clause binds to the closest preceding if that does not yet have an else.',
    subtopic: 'else-if Ladder & Nested if',
  },
  {
    id: 'dm-mcq-9',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 2;
    switch (n) {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
        default: printf("Default");
    }
    return 0;
}`,
    options: ['Two ', 'Two Three Default', 'One Two Three Default', 'Two Three '],
    correctIndex: 1,
    explanation: 'Because there are no break statements, execution enters at case 2 and falls through every subsequent case: "Two Three Default".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-10',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What will be printed by the following ternary code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 10, b = 20;
    int min = (a < b) ? a : b;
    printf("%d", min);
    return 0;
}`,
    options: ['10', '20', '1', '0'],
    correctIndex: 0,
    explanation: '10 < 20 is true, so the true-branch value (a = 10) is chosen.',
    subtopic: 'Ternary Operator (?:)',
  },
  {
    id: 'dm-mcq-11',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'Can case labels in a switch statement have identical constant values?',
    options: ['Yes, always', 'No, duplicate case values cause a compilation error', 'Only if separated by default', 'Only in C99'],
    correctIndex: 1,
    explanation: 'Duplicate case values within the same switch statement are forbidden by the C standard and cause a compilation error.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-12',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the output of this code with zero condition?',
    codeSnippet: `#include <stdio.h>
int main() {
    if (0) {
        printf("A");
    } else if (1) {
        printf("B");
    } else {
        printf("C");
    }
    return 0;
}`,
    options: ['A', 'B', 'C', 'ABC'],
    correctIndex: 1,
    explanation: 'The if(0) branch is false. The first else-if (1) is true and prints "B", skipping the rest of the ladder.',
    subtopic: 'else-if Ladder & Nested if',
  },
  {
    id: 'dm-mcq-13',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the scope of a goto statement label in C?',
    options: ['Global across all files', 'Local to the enclosing function', 'Only within the same if-block', 'File-level static'],
    correctIndex: 1,
    explanation: 'Labels in C have function scope; you can jump to any label declared within the same enclosing function.',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-14',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    char ch = 'b';
    switch (ch) {
        case 'a': printf("Apple "); break;
        case 'b': printf("Banana "); break;
        default: printf("Other ");
    }
    return 0;
}`,
    options: ['Banana ', 'Apple Banana ', 'Banana Other ', 'Other '],
    correctIndex: 0,
    explanation: 'The value \'b\' matches case \'b\', prints "Banana ", and the break statement exits the switch.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-15',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the value of x after: int x = (5 > 10) ? 50 : (10 > 5) ? 100 : 200; ?',
    options: ['50', '100', '200', '0'],
    correctIndex: 1,
    explanation: '5 > 10 is false, so the false branch evaluates: (10 > 5) ? 100 : 200. Since 10 > 5 is true, it yields 100.',
    subtopic: 'Ternary Operator (?:)',
  },
  {
    id: 'dm-mcq-16',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'Is the default case required to be at the end of a switch statement in C?',
    options: [
      'Yes, it must always be the last line',
      'No, default can appear anywhere inside the switch statement',
      'Yes, otherwise it causes a syntax error',
      'Only if all other cases have breaks'
    ],
    correctIndex: 1,
    explanation: 'The default label can be placed anywhere inside the switch body (top, middle, or bottom).',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-17',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What is the output of the following condition check?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 10;
    if (x == 10)
        printf("Equal ");
        printf("Done");
    return 0;
}`,
    options: ['Equal Done', 'Equal ', 'Done', 'Compilation error'],
    correctIndex: 0,
    explanation: 'Without braces, only printf("Equal ") is guarded by the if statement. printf("Done") is outside the if statement and executes unconditionally.',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-18',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'Can you use a variable in a case label, such as case x: where x is an int?',
    options: [
      'Yes, any integer variable is allowed',
      'No, case labels must be compile-time integer constants',
      'Only if marked with const in C99',
      'Only if x is declared in main'
    ],
    correctIndex: 1,
    explanation: 'Case labels in C must be compile-time integer constant expressions. Variables (even const-qualified variables in C) cannot be used as case constants.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-19',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What does the continue statement do when used directly inside a switch statement (outside any loop)?',
    options: ['Skips to next case label', 'Causes a compilation error', 'Exits the switch', 'Re-evaluates switch condition'],
    correctIndex: 1,
    explanation: 'continue is only valid inside loops (for, while, do-while). Using continue inside a switch that is not inside a loop triggers a compile error.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-20',
    topicId: 'decision-making',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1;
    if (!a) {
        printf("No");
    } else {
        printf("Yes");
    }
    return 0;
}`,
    options: ['No', 'Yes', '0', '1'],
    correctIndex: 1,
    explanation: '!1 evaluates to 0 (false), so the else branch executes and prints "Yes".',
    subtopic: 'if and if-else',
  },

  // ================= MEDIUM (20 QUESTIONS) =================
  {
    id: 'dm-mcq-21',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be the output of this dangling else snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 0, b = 1;
    if (a > 0)
        if (b > 0)
            printf("A");
    else
        printf("B");
    return 0;
}`,
    options: ['A', 'B', 'Nothing is printed', 'AB'],
    correctIndex: 2,
    explanation: 'Despite the visual indentation, the else binds to the nearest if (b > 0). Since the outer condition (a > 0) is false, the entire inner if-else block is skipped completely, so nothing is printed!',
    subtopic: 'else-if Ladder & Nested if',
  },
  {
    id: 'dm-mcq-22',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the output of the following switch statement with default in the middle?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 5;
    switch (n) {
        case 1: printf("One "); break;
        default: printf("Def ");
        case 2: printf("Two "); break;
    }
    return 0;
}`,
    options: ['Def ', 'Def Two ', 'Two ', 'Compilation error'],
    correctIndex: 1,
    explanation: 'n=5 does not match case 1 or case 2, so execution jumps to default, printing "Def ". Because there is no break after default, it falls through into case 2 and prints "Two " before hitting break.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-23',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by this nested if evaluation?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 10, y = 20;
    if (x == 10) {
        if (y == 20) {
            printf("Branch 1\\n");
        }
    } else {
        printf("Branch 2\\n");
    }
    return 0;
}`,
    options: ['Branch 1', 'Branch 2', 'Branch 1\\nBranch 2', 'Compilation error'],
    correctIndex: 0,
    explanation: 'x is 10 and y is 20, so "Branch 1" is printed. The else belongs to the outer if and is not entered.',
    subtopic: 'else-if Ladder & Nested if',
  },
  {
    id: 'dm-mcq-24',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by this code involving character case comparison?',
    codeSnippet: `#include <stdio.h>
int main() {
    char code = 'B';
    switch (code) {
        case 65: printf("A"); break;
        case 66: printf("B"); break;
        default: printf("?");
    }
    return 0;
}`,
    options: ['A', 'B', '?', 'Compilation error: case values must be characters'],
    correctIndex: 1,
    explanation: 'In C, character literals are integers. The ASCII code for \'B\' is 66, which matches case 66 and prints "B".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-25',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1, b = 2;
    if (a-- == 1 && ++b == 3) {
        printf("Cond1 ");
    }
    printf("%d %d", a, b);
    return 0;
}`,
    options: ['Cond1 0 3', 'Cond1 1 2', '0 3', 'Cond1 0 2'],
    correctIndex: 0,
    explanation: 'a-- compares 1 == 1 (true) and decrements a to 0. Then ++b increments b to 3 and compares 3 == 3 (true). Both evaluate to true, printing "Cond1 " followed by "0 3".',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-26',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the result of using a constant expression in switch cases like case 2 + 3:?',
    options: [
      'Valid: 2 + 3 is a compile-time constant expression equivalent to case 5:',
      'Invalid: Expressions with operators are not allowed in case labels',
      'Only valid in C++',
      'Causes undefined behavior'
    ],
    correctIndex: 0,
    explanation: 'The C standard permits any compile-time integer constant expression in case labels, including arithmetic operators on literals like 2 + 3.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-27',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 0;
    if (x == 0) {
        goto label1;
        printf("Ignored");
    }
    printf("Middle ");
label1:
    printf("Destination");
    return 0;
}`,
    options: ['Destination', 'Ignored Destination', 'Middle Destination', 'Compilation error'],
    correctIndex: 0,
    explanation: 'goto label1 jumps immediately past printf("Ignored") and printf("Middle ") directly to label1:, printing only "Destination".',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-28',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be output by this code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int val = 10;
    switch (val) {
        case 5 ... 15: // GCC extension range
            printf("In range");
            break;
        default:
            printf("Out of range");
    }
    return 0;
}`,
    options: ['In range', 'Out of range', 'Syntax error in standard ISO C99', 'Undefined behavior'],
    correctIndex: 0,
    explanation: 'Case ranges (case low ... high:) are a widely supported GCC/Clang extension in C. 10 is between 5 and 15, printing "In range".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-29',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the output of the following nested conditional expression?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 2;
    printf("%s", x == 1 ? "One" : x == 2 ? "Two" : "Other");
    return 0;
}`,
    options: ['One', 'Two', 'Other', 'Compilation error'],
    correctIndex: 1,
    explanation: 'x == 1 is false. The second condition x == 2 is true, returning "Two".',
    subtopic: 'Ternary Operator (?:)',
  },
  {
    id: 'dm-mcq-30',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the output of this code with multiple labels grouping cases?',
    codeSnippet: `#include <stdio.h>
int main() {
    int digit = 4;
    switch (digit) {
        case 2:
        case 4:
        case 6:
        case 8:
            printf("Even");
            break;
        case 1:
        case 3:
        case 5:
            printf("Odd");
            break;
    }
    return 0;
}`,
    options: ['Even', 'Odd', 'EvenOdd', 'No output'],
    correctIndex: 0,
    explanation: 'Case 4 falls through into the shared code for even numbers and hits break, printing "Even".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-31',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the consequence of declaring a variable inside a switch block before the first case label: switch(x) { int y = 10; case 1: ... }?',
    options: [
      'y is initialized to 10 on all case jumps',
      'y is in scope, but its initialization (y = 10) is bypassed when jumping to a case label',
      'Compiler syntax error',
      'Causes a segmentation fault'
    ],
    correctIndex: 1,
    explanation: 'Variable declarations inside a switch before any case label allocate space, but the assignment/initialization code is bypassed when the switch jumps directly to a case label.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-32',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0;
    if (i++ == 0) {
        printf("True ");
    } else {
        printf("False ");
    }
    printf("%d", i);
    return 0;
}`,
    options: ['True 1', 'False 1', 'True 0', 'False 0'],
    correctIndex: 0,
    explanation: 'i++ evaluates to 0 in the comparison (0 == 0 is true) and then increments i to 1. "True 1" is printed.',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-33',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'Can an if statement exist without an else statement?',
    options: [
      'Yes, else is optional in C',
      'No, every if must have a matching else',
      'Only in C99, not in C89',
      'Only if enclosed in a while loop'
    ],
    correctIndex: 0,
    explanation: 'In C, the else branch is completely optional.',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-34',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What is the output of this code with floating point equality trap?',
    codeSnippet: `#include <stdio.h>
int main() {
    float f = 0.1f;
    if (f == 0.1) {
        printf("Equal");
    } else {
        printf("Not Equal");
    }
    return 0;
}`,
    options: ['Equal', 'Not Equal', 'Compilation error', 'Undefined behavior'],
    correctIndex: 1,
    explanation: '0.1 is a double literal, while f is a float. 0.1 cannot be represented exactly in binary floating point, and the float representation has lower precision than the double, so f == 0.1 evaluates to false!',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-35',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by this code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int k = 0;
    if (k = 0) {
        printf("Yes");
    } else {
        printf("No");
    }
    return 0;
}`,
    options: ['Yes', 'No', 'Compilation error', 'Undefined'],
    correctIndex: 1,
    explanation: 'k = 0 assigns 0 to k, which yields 0 (false). The else branch executes, printing "No".',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-36',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by this nested if statement?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    if (a > 2)
        if (a < 4)
            printf("Between");
        else
            printf("Greater than 4");
    return 0;
}`,
    options: ['Between', 'Greater than 4', 'Nothing', 'Compilation error'],
    correctIndex: 1,
    explanation: 'a > 2 is true. Inner if a < 4 (5 < 4) is false, so its else branch executes, printing "Greater than 4".',
    subtopic: 'else-if Ladder & Nested if',
  },
  {
    id: 'dm-mcq-37',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What happens if a switch expression does not match any case and there is no default label?',
    options: [
      'The entire switch statement does nothing and control continues after the closing brace',
      'A runtime exception is thrown',
      'The first case executes automatically',
      'The program aborts'
    ],
    correctIndex: 0,
    explanation: 'If no case matches and no default label exists, execution simply jumps past the closing brace of the switch statement.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-38',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 1;
    switch (x) {
        case 1:
            printf("1 ");
        case 0:
            printf("0 ");
            break;
        default:
            printf("D ");
    }
    return 0;
}`,
    options: ['1 ', '1 0 ', '1 0 D ', '0 '],
    correctIndex: 1,
    explanation: 'Matches case 1, prints "1 ". Without a break, it falls through into case 0, prints "0 ", and encounters break.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-39',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'Why is using Yoda conditions like if (NULL == ptr) recommended in C?',
    options: [
      'It executes faster in machine code',
      'If you accidentally write single = instead of ==, the compiler throws an error because literals cannot be assigned to',
      'It works with floating point numbers',
      'It prevents pointer leaks'
    ],
    correctIndex: 1,
    explanation: 'Writing if (NULL = ptr) triggers a compiler error because NULL is an rvalue constant that cannot be assigned to, preventing subtle assignment bugs.',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-40',
    topicId: 'decision-making',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 10, b = 5;
    if (a > 5 || (b = 20)) {
        printf("b = %d", b);
    }
    return 0;
}`,
    options: ['b = 20', 'b = 5', 'b = 10', 'b = 0'],
    correctIndex: 1,
    explanation: 'Because a > 5 is true, the logical OR (||) short-circuits and skips (b = 20). b remains 5.',
    subtopic: 'if and if-else',
  },

  // ================= HARD (10 QUESTIONS) =================
  {
    id: 'dm-mcq-41',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What is Duff\'s Device in C programming?',
    options: [
      'A hardware debugging probe',
      'A legal C construct that interleaves a switch statement inside a do-while loop to perform loop unrolling',
      'A compiler optimization flag',
      'A method for memory allocation'
    ],
    correctIndex: 1,
    explanation: 'Duff\'s Device is an infamous valid C idiom where case labels sit inside a do-while loop to handle loop unrolling with partial iterations.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-42',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What is the output of the following Duff\'s Device minimal fragment?',
    codeSnippet: `#include <stdio.h>
int main() {
    int count = 3;
    switch (count % 2) {
        case 1: do { printf("X");
        case 0:      printf("Y");
                } while (--count > 0);
    }
    return 0;
}`,
    options: ['XYXY', 'YXYX', 'XYY', 'XYXYXY'],
    correctIndex: 0,
    explanation: 'count % 2 = 1. Enters at case 1: prints "X", then "Y". count becomes 2. Loop continues: prints "X", then "Y". count becomes 1. Loop continues: prints "X", "Y"... yielding "XYXY".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-43',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 1;
    switch (x) {
        case 1: {
            int val = 42;
            printf("%d ", val);
            break;
        }
        case 2: {
            int val = 99;
            printf("%d ", val);
            break;
        }
    }
    return 0;
}`,
    options: ['42 ', '99 ', '42 99 ', 'Compilation error: redefinition of val'],
    correctIndex: 0,
    explanation: 'Enclosing the case bodies in block braces { } introduces distinct block scopes, allowing the same identifier name val to be declared in both cases without conflict. Matches case 1, prints "42 ".',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-44',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'Can goto jump past a Variable-Length Array (VLA) declaration in C99?',
    options: [
      'Yes, without restriction',
      'No, in C99 jumping into the scope of a VLA past its declaration produces undefined behavior or compile error',
      'Only if the array size is 0',
      'Only if declared static'
    ],
    correctIndex: 1,
    explanation: 'C99 §6.8.6.1 explicitly forbids jumping into the scope of a variable length array past its declaration because the allocation would be bypassed.',
    subtopic: 'Pitfalls: Assignment vs Equality',
  },
  {
    id: 'dm-mcq-45',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 0;
    if (a)
        int x = 10;
    else
        printf("Else reached");
    return 0;
}`,
    options: ['Else reached', 'Compilation error: declaration cannot be the immediate statement of an if', '0', 'Nothing'],
    correctIndex: 1,
    explanation: 'In C99, a declaration cannot be the sole unbraced sub-statement of a selection statement (if (a) int x = 10; is illegal syntax; braces { int x = 10; } are required).',
    subtopic: 'if and if-else',
  },
  {
    id: 'dm-mcq-46',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What will be printed by this code with negative operands in switch?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = -1;
    switch (n) {
        case -1: printf("Neg ");
        case 0: printf("Zero "); break;
        case 1: printf("Pos "); break;
    }
    return 0;
}`,
    options: ['Neg ', 'Neg Zero ', 'Zero ', 'Compilation error: negative case not allowed'],
    correctIndex: 1,
    explanation: 'Negative integer constants are completely legal in switch case labels. It matches case -1, prints "Neg ", falls through to case 0, prints "Zero ", and hits break.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-47',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What is the output of the following code involving ternary operator type promotion?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 1;
    printf("%f", n ? 1 : 2.0);
    return 0;
}`,
    options: ['1.000000', '1', '2.000000', 'Compilation error: conflicting types in ternary'],
    correctIndex: 0,
    explanation: 'In a ternary operator (condition ? expr1 : expr2), the types of both branches are unified using Usual Arithmetic Conversions. Since expr2 is a double (2.0), expr1 (int 1) is promoted to double (1.0), which is printed by %f as "1.000000".',
    subtopic: 'Ternary Operator (?:)',
  },
  {
    id: 'dm-mcq-48',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What is the output of the following nested switch code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1, b = 2;
    switch (a) {
        case 1:
            switch (b) {
                case 1: printf("B1 "); break;
                case 2: printf("B2 "); break;
            }
            break;
        case 2:
            printf("A2 ");
            break;
    }
    return 0;
}`,
    options: ['B2 ', 'B2 A2 ', 'A2 ', 'B1 B2 '],
    correctIndex: 0,
    explanation: 'The inner switch matches case 2, prints "B2 ", and its break exits only the inner switch. Then the outer break exits the outer switch.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-49',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What will be printed by this code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 2;
    switch (x) {
        default: printf("Def ");
        case 1: printf("One "); break;
        case 2: printf("Two ");
    }
    return 0;
}`,
    options: ['Two ', 'Def One ', 'Two Def ', 'Two Def One '],
    correctIndex: 0,
    explanation: 'x is 2, matching case 2 directly. It prints "Two " and exits because it reaches the end of the switch statement.',
    subtopic: 'switch-case Construct',
  },
  {
    id: 'dm-mcq-50',
    topicId: 'decision-making',
    difficulty: 'hard',
    question: 'What does the C compiler do if there are unreachable statements before the first case in a switch block?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 1;
    switch (x) {
        printf("Hello ");
        case 1:
            printf("World");
            break;
    }
    return 0;
}`,
    options: ['Hello World', 'World', 'Hello ', 'Compilation error'],
    correctIndex: 1,
    explanation: 'The switch jumps directly to matching case 1: bypassing any statements placed before the first case label. Hence printf("Hello ") is dead code and never executes. Output is "World".',
    subtopic: 'switch-case Construct',
  },
];
