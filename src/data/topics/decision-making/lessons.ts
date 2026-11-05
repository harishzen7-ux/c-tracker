import { Lesson } from '../../../types';

export const decisionLessons: Lesson = {
  id: 'lesson-decision-making',
  topicId: 'decision-making',
  title: 'Decision Making Statements in C',
  order: 3,
  sections: [
    {
      id: 'sec-dm-if-else',
      title: 'if and if-else Statements',
      concept:
        'Conditional branching allows a program to execute distinct code paths based on boolean evaluations. The condition is an expression that evaluates to an integer: 0 represents false, and any non-zero value represents true.',
      syntax: `if (condition) {\n    // executes if condition is non-zero\n} else {\n    // executes if condition is 0\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    int temperature = 28;
    
    if (temperature > 30) {
        printf("Hot weather alert!\\n");
    } else {
        printf("Comfortable climate.\\n");
    }
    
    // Testing non-zero truthiness directly
    int flag = -5;
    if (flag) {
        printf("Non-zero values are truthy in C!\\n");
    }
    
    return 0;
}`,
      annotation:
        'Always wrap single-statement bodies in curly braces { } to prevent accidental logic bugs during subsequent refactoring.',
      commonMistakes: [
        'Accidentally putting a semicolon after the if condition: if (x > 0); { printf("Positive"); } executes the block unconditionally.',
        'Using assignment = instead of comparison ==: if (x = 0) sets x to 0 and evaluates to false!',
      ],
      quickRecap: [
        'In C, 0 is false; any non-zero integer is true.',
        'Beware the accidental semicolon right after if (...);',
        'Use Yoda conditions (5 == x) to catch assignment bugs at compile time.',
      ],
    },
    {
      id: 'sec-dm-ladder-nested',
      title: 'else-if Ladder & Nested Conditions (Dangling else)',
      concept:
        'The else-if ladder tests multiple conditions sequentially from top to bottom; the first true condition executes its branch, and all subsequent branches are skipped. Nested if statements place one conditional inside another. In C, the "dangling else" ambiguity is resolved by binding an else to the closest preceding unmatched if.',
      syntax: `if (cond1) {\n    ...\n} else if (cond2) {\n    ...\n} else {\n    ...\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    int marks = 82;
    char grade;
    
    if (marks >= 90) {
        grade = 'A';
    } else if (marks >= 80) {
        grade = 'B';
    } else if (marks >= 70) {
        grade = 'C';
    } else {
        grade = 'F';
    }
    printf("Marks %d receives Grade: %c\\n", marks, grade);
    
    // Dangling else illustration:
    int a = 1, b = 0;
    if (a > 0)
        if (b > 0)
            printf("Both positive\\n");
        else // This else belongs to (b > 0), NOT (a > 0)!
            printf("b is non-positive\\n");
            
    return 0;
}`,
      annotation:
        'To prevent dangling else misinterpretations, always use explicit braces: if (a > 0) { if (b > 0) ... } else ...',
      commonMistakes: [
        'Assuming indentation dictates else association in C (C ignores indentation).',
        'Overlapping conditions where a broader condition precedes a more specific condition.',
      ],
      quickRecap: [
        'else binds to the nearest open if in the same scope block.',
        'else-if ladder exits on the first true evaluation.',
      ],
    },
    {
      id: 'sec-dm-switch-case',
      title: 'switch-case Construct & Fall-through Mechanics',
      concept:
        'The switch statement allows multi-way branching based on the value of an integer or character expression. Case labels must be compile-time integer constants. Execution jumps directly to the matching case label. Unless terminated with a `break` statement, execution falls through into subsequent case statements.',
      syntax: `switch (integral_expr) {\n    case CONST_1:\n        // statements\n        break;\n    case CONST_2:\n        // statements\n        break;\n    default:\n        // fallback\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    int day = 3;
    
    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break; // Essential break to prevent fallthrough
        case 4:
        case 5:
            // Intentional fallthrough grouping
            printf("Thursday or Friday\\n");
            break;
        default:
            printf("Weekend or invalid day\\n");
            break;
    }
    
    return 0;
}`,
      annotation:
        'Intentional fall-through without break can be used to group multiple cases (e.g. case 4 and case 5 above).',
      commonMistakes: [
        'Attempting to use strings ("hello") or floats (3.14) in case labels (only integer/char constants are valid).',
        'Omitting break by accident, causing unintended fallthrough into the next case.',
        'Using duplicate case values in the same switch block (compile error).',
      ],
      quickRecap: [
        'switch expressions and case constants must be integral types (char, int, enum).',
        'Execution falls through until break or the end of the switch block.',
        'default handles unmatched values and can appear anywhere in the switch.',
      ],
    },
    {
      id: 'sec-dm-ternary',
      title: 'Ternary Conditional Operator (?:)',
      concept:
        'The ternary operator is C\'s only three-operand operator. It serves as an inline conditional expression that produces a value, making it ideal for variable initialization, macro definitions, and compact assertions.',
      syntax: `result = (condition) ? value_if_true : value_if_false;`,
      codeSnippet: `#include <stdio.h>

int main() {
    int num = -15;
    const char *status = (num >= 0) ? "Non-negative" : "Negative";
    printf("Number is: %s\\n", status);
    
    int a = 20, b = 30;
    int min = (a < b) ? a : b;
    printf("Minimum is: %d\\n", min);
    
    return 0;
}`,
      annotation:
        'Only the selected branch is evaluated at run time, preventing side effects from unselected branches.',
      commonMistakes: [
        'Over-nesting ternary operators into unreadable monolithic one-liners.',
        'Mismatched types between the true and false expressions without compatible conversion.',
      ],
      quickRecap: [
        'Ternary expressions yield values and can be used on the right-hand side of assignments.',
        'Only one of the two branch expressions is evaluated.',
      ],
    },
    {
      id: 'sec-dm-goto',
      title: 'Common Pitfalls and goto Basics',
      concept:
        '`goto` provides an unconditional jump to a labeled statement within the same function. While unrestricted goto is discouraged because it creates "spaghetti code", it is legitimately used in systems programming for clean, centralized error cleanup and unwinding multi-level nested loops.',
      syntax: `goto label_name;\n...\nlabel_name:\n    // cleanup code`,
      codeSnippet: `#include <stdio.h>

int main() {
    int errorOccurred = 1;
    
    if (errorOccurred) {
        printf("Error detected! Jumping to cleanup.\\n");
        goto cleanup;
    }
    
    printf("Normal operations...\\n");
    return 0;

cleanup:
    printf("Cleaned up resources safely.\\n");
    return -1;
}`,
      annotation:
        'goto cannot jump across function boundaries in standard C (setjmp/longjmp is used for that).',
      commonMistakes: [
        'Using goto for backward jumps in place of standard loops, obfuscating control flow.',
        'Jumping into the middle of a block past variable declarations.',
      ],
      quickRecap: [
        'goto is strictly local to the enclosing function.',
        'Best used for centralized error cleanup or breaking out of deeply nested loops.',
      ],
    },
  ],
};
