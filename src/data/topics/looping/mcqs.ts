import { MCQ } from '../../../types';

export const loopingMCQs: MCQ[] = [
  // ================= EASY (20 QUESTIONS) =================
  {
    id: 'loop-mcq-1',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'How many times does the loop for (int i = 0; i < 5; i++) execute its body?',
    options: ['4 times', '5 times', '6 times', 'Infinite times'],
    correctIndex: 1,
    explanation: 'The loop index i takes values 0, 1, 2, 3, 4 (strictly less than 5), which is exactly 5 iterations.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-2',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the minimum number of times a while loop executes its body?',
    options: ['0', '1', '2', 'Depends on compiler'],
    correctIndex: 0,
    explanation: 'A while loop is an entry-controlled loop; if its condition is false initially, the body executes 0 times.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-3',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the minimum number of times a do-while loop executes its body?',
    options: ['0', '1', 'Depends on condition', 'Infinite'],
    correctIndex: 1,
    explanation: 'A do-while loop evaluates its condition after executing the body, guaranteeing at least 1 iteration.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-4',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'Which statement terminates loop execution completely and jumps to the code following the loop?',
    options: ['continue', 'break', 'goto', 'return'],
    correctIndex: 1,
    explanation: 'The break statement terminates execution of the innermost enclosing loop.',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-5',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What does the continue statement do when executed inside a loop?',
    options: [
      'Exits the loop',
      'Skips the rest of the current iteration and jumps to the next iteration update/check',
      'Restarts the entire loop from iteration 0',
      'Pauses execution for 1 second'
    ],
    correctIndex: 1,
    explanation: 'continue skips the remaining statements in the current iteration and moves directly to the next iteration step.',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-6',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 1;
    while (i <= 3) {
        printf("%d ", i);
        i++;
    }
    return 0;
}`,
    options: ['1 2 3 ', '1 2 ', '1 2 3 4 ', '3 2 1 '],
    correctIndex: 0,
    explanation: 'i starts at 1, prints 1 2 3, then i becomes 4, ending the loop.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-7',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the output of the following do-while loop?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 10;
    do {
        printf("%d", x);
    } while (x < 5);
    return 0;
}`,
    options: ['10', 'Nothing', 'Infinite loop', 'Compilation error'],
    correctIndex: 0,
    explanation: 'The do-while body executes first, printing 10. Then x < 5 is checked (10 < 5 is false), ending the loop.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-8',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What does the construct for (;;) do in C?',
    options: ['Generates a syntax error', 'Creates an infinite loop', 'Executes 0 times', 'Executes 1 time'],
    correctIndex: 1,
    explanation: 'An omitted condition in a for loop is treated as non-zero (true) by the C standard, creating an infinite loop.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-9',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'In C99, what is the scope of the variable i declared as: for (int i = 0; i < 10; i++)?',
    options: [
      'Global to the file',
      'Accessible anywhere in main()',
      'Local strictly to the for loop statement block',
      'Undefined'
    ],
    correctIndex: 2,
    explanation: 'In C99, variables declared in the for loop header have block scope restricted exclusively to the for loop.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-10',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'How many times will "C" be printed by the nested loop below?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("C");
        }
    }
    return 0;
}`,
    options: ['7 times', '12 times', '9 times', '3 times'],
    correctIndex: 1,
    explanation: 'The outer loop runs 3 times; for each outer iteration, the inner loop runs 4 times. Total = 3 * 4 = 12 times.',
    subtopic: 'Nested Loops & Matrices',
  },
  {
    id: 'loop-mcq-11',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) break;
        printf("%d ", i);
    }
    return 0;
}`,
    options: ['1 2 ', '1 2 3 ', '1 2 4 5 ', '3 '],
    correctIndex: 0,
    explanation: 'When i reaches 3, break executes immediately before printf, terminating the loop. Output is "1 2 ".',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-12',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What will be printed by this code using continue?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 1; i <= 4; i++) {
        if (i == 2) continue;
        printf("%d ", i);
    }
    return 0;
}`,
    options: ['1 3 4 ', '1 2 3 4 ', '1 ', '2 3 4 '],
    correctIndex: 0,
    explanation: 'When i == 2, continue skips printf("%d ", i) and increments i to 3. Printed: "1 3 4 ".',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-13',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the output of the following loop with a decrementing index?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 3; i > 0; i--) {
        printf("%d ", i);
    }
    return 0;
}`,
    options: ['3 2 1 ', '1 2 3 ', '3 2 1 0 ', '3 2 '],
    correctIndex: 0,
    explanation: 'i starts at 3, decrements each iteration: 3, 2, 1. When i reaches 0, 0 > 0 is false.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-14',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the required punctuation at the end of a do-while loop statement in C?',
    options: ['Colon (:)', 'Semicolon (;)', 'Period (.)', 'Nothing'],
    correctIndex: 1,
    explanation: 'In C, a do-while loop requires a trailing semicolon: do { ... } while (condition);',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-15',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the value of i after the loop finishes: for (int i = 0; i < 10; i += 2)?',
    options: ['8', '10', '12', '9'],
    correctIndex: 1,
    explanation: 'i increments: 0, 2, 4, 6, 8. Next it increments to 10. The condition 10 < 10 fails, terminating the loop with i = 10.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-16',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What is the output of the following right triangle pattern code for N = 2?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    options: ['*\\n**\\n', '**\\n*\\n', '***\\n', '*\\n*\\n'],
    correctIndex: 0,
    explanation: 'Row 1 prints 1 asterisk and newline. Row 2 prints 2 asterisks and newline: "*\\n**\\n".',
    subtopic: 'Pattern Printing Logic',
  },
  {
    id: 'loop-mcq-17',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'Which of the following creates an infinite while loop in standard C?',
    options: ['while (1)', 'while (true) with <stdbool.h>', 'while (-1)', 'All of the above'],
    correctIndex: 3,
    explanation: 'Any non-zero expression evaluates to true in C, so while(1), while(true), and while(-1) all produce infinite loops.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-18',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= 4; i++) {
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
    options: ['10', '4', '15', '6'],
    correctIndex: 0,
    explanation: 'sum = 1 + 2 + 3 + 4 = 10.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-19',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'What happens if the update step (i++) is omitted from a while loop that checks while (i < 5)?',
    options: [
      'The loop executes once',
      'The loop becomes infinite if i starts < 5',
      'Compiler syntax error',
      'The compiler automatically inserts i++'
    ],
    correctIndex: 1,
    explanation: 'If the loop control variable is never modified, the condition remains true indefinitely, creating an infinite loop.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-20',
    topicId: 'looping',
    difficulty: 'easy',
    question: 'Can a for loop have multiple expressions in its initialization, separated by commas?',
    options: ['Yes, using the comma operator', 'No, only one variable', 'Only in C++', 'Only if they are floats'],
    correctIndex: 0,
    explanation: 'C permits multiple expressions in the initialization clause separated by commas: for (int i = 0, j = 10; ...).',
    subtopic: 'for Loop Mechanics',
  },

  // ================= MEDIUM (20 QUESTIONS) =================
  {
    id: 'loop-mcq-21',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by the following code with an accidental semicolon?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i;
    for (i = 0; i < 3; i++);
        printf("%d", i);
    return 0;
}`,
    options: ['012', '3', '0123', 'Nothing'],
    correctIndex: 1,
    explanation: 'The semicolon terminates the for loop with an empty body. The loop runs 3 times doing nothing, leaving i = 3. Then printf("%d", i) runs once and prints 3.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-22',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of the following while loop with post-decrement?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 3;
    while (n--) {
        printf("%d ", n);
    }
    return 0;
}`,
    options: ['3 2 1 ', '2 1 0 ', '2 1 ', '3 2 1 0 '],
    correctIndex: 1,
    explanation: '1st check: n is 3 (true), decrements to 2, prints 2. 2nd check: n is 2 (true), decrements to 1, prints 1. 3rd check: n is 1 (true), decrements to 0, prints 0. 4th check: n is 0 (false), terminates. Output: "2 1 0 ".',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-23',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of this continue inside a while loop trap?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0;
    while (i < 3) {
        if (i == 1) {
            continue;
        }
        printf("%d ", i);
        i++;
    }
    return 0;
}`,
    options: ['0 2 ', '0 1 2 ', 'Infinite loop (hangs after printing 0)', '0 '],
    correctIndex: 2,
    explanation: 'When i reaches 1, continue jumps back to the condition check while (i < 3) without executing i++! i remains 1 forever, resulting in an infinite loop.',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-24',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by the following dual-variable loop?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i, j;
    for (i = 0, j = 5; i < j; i++, j--) {
        printf("%d-%d ", i, j);
    }
    return 0;
}`,
    options: ['0-5 1-4 2-3 ', '0-5 1-4 ', '0-5 1-4 2-3 3-2 ', '0-5 '],
    correctIndex: 0,
    explanation: '1st iter: i=0, j=5 (0 < 5 true), prints 0-5. 2nd: i=1, j=4 (1 < 4 true), prints 1-4. 3rd: i=2, j=3 (2 < 3 true), prints 2-3. 4th: i=3, j=2 (3 < 2 false). Output: "0-5 1-4 2-3 ".',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-25',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What does break do when used inside nested loops?',
    options: [
      'Terminates all nested loops and returns from main',
      'Terminates only the innermost enclosing loop',
      'Terminates the outermost loop',
      'Causes a compile error in nested loops'
    ],
    correctIndex: 1,
    explanation: 'A break statement exits only the immediate (innermost) loop that contains it.',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-26',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by this code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0;
    for (; i < 5; ) {
        i++;
    }
    printf("%d", i);
    return 0;
}`,
    options: ['4', '5', '6', 'Compilation error: for requires all 3 clauses'],
    correctIndex: 1,
    explanation: 'A for loop with omitted initialization and update is completely valid in C, behaving like a while loop. i increments from 0 to 5, printing 5.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-27',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by this nested loop breakdown?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) break;
            printf("%d%d ", i, j);
        }
    }
    return 0;
}`,
    options: ['11 21 ', '11 12 21 22 ', '11 ', '11 12 13 '],
    correctIndex: 0,
    explanation: 'When i=1: j=1 prints "11", then j=2 breaks the inner loop. When i=2: j=1 prints "21", then j=2 breaks the inner loop. Output: "11 21 ".',
    subtopic: 'Nested Loops & Matrices',
  },
  {
    id: 'loop-mcq-28',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of the following do-while loop with prefix decrement?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 3;
    do {
        printf("%d ", x);
    } while (--x > 0);
    return 0;
}`,
    options: ['3 2 1 ', '3 2 ', '2 1 0 ', '3 '],
    correctIndex: 0,
    explanation: 'Iter 1: prints 3, checks --x (2 > 0 true). Iter 2: prints 2, checks --x (1 > 0 true). Iter 3: prints 1, checks --x (0 > 0 false). Output: "3 2 1 ".',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-29',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be the output of the following comma-operator loop condition?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0, j = 0;
    for (i = 0; i < 3, j < 5; i++, j++) {
        // empty body
    }
    printf("%d %d", i, j);
    return 0;
}`,
    options: ['3 3', '5 5', '3 5', 'Compilation error'],
    correctIndex: 1,
    explanation: 'In the condition (i < 3, j < 5), the comma operator evaluates i < 3, discards it, and uses only the rightmost condition (j < 5) to control the loop! So the loop runs 5 times: "5 5".',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-30',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'How do you print a square pattern of asterisks of size N x N?',
    options: [
      'Outer loop 1 to N, inner loop 1 to N printing "*", then newline after inner loop',
      'Single loop 1 to N * N printing "*" and newline every iteration',
      'do-while loop with N steps',
      'Recursive printf only'
    ],
    correctIndex: 0,
    explanation: 'A nested loop where the outer loop iterates rows (1 to N) and the inner loop iterates columns (1 to N) is the canonical approach.',
    subtopic: 'Pattern Printing Logic',
  },
  {
    id: 'loop-mcq-31',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 5;
    while (i > 0) {
        printf("%d", i);
        i -= 2;
    }
    return 0;
}`,
    options: ['531', '53', '54321', '531-1'],
    correctIndex: 0,
    explanation: 'i starts at 5 (prints 5, i becomes 3), next iteration (prints 3, i becomes 1), next iteration (prints 1, i becomes -1). -1 > 0 is false. Output: "531".',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-32',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int k = 1;
    for (;;) {
        printf("%d ", k);
        if (k++ >= 3) break;
    }
    return 0;
}`,
    options: ['1 2 3 ', '1 2 3 4 ', '1 2 ', '1 '],
    correctIndex: 0,
    explanation: 'Iter 1: prints 1, k becomes 2 (1 >= 3 false). Iter 2: prints 2, k becomes 3 (2 >= 3 false). Iter 3: prints 3, k becomes 4 (3 >= 3 true -> break). Output: "1 2 3 ".',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-33',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What happens when unsigned char is used as a loop index: for (unsigned char c = 0; c < 260; c++)?',
    options: [
      'Executes 260 times',
      'Infinite loop because unsigned char overflows at 255 and wraps around to 0 (never reaching 260)',
      'Compile error: overflow',
      'Executes 255 times'
    ],
    correctIndex: 1,
    explanation: 'An 8-bit unsigned char has a maximum value of 255. Adding 1 to 255 wraps to 0, which is always < 260, causing an infinite loop!',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-34',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is printed by this loop accumulating powers of 2?',
    codeSnippet: `#include <stdio.h>
int main() {
    int p = 1;
    while (p < 10) {
        p <<= 1;
    }
    printf("%d", p);
    return 0;
}`,
    options: ['8', '16', '10', '32'],
    correctIndex: 1,
    explanation: 'p sequence: 1 -> 2 -> 4 -> 8 -> 16. When p is 16, 16 < 10 is false, so 16 is printed.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-35',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of the following inverted triangle loop?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 3;
    for (int i = n; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            printf("%d", j);
        }
        printf(" ");
    }
    return 0;
}`,
    options: ['123 12 1 ', '321 21 1 ', '1 12 123 ', '123 '],
    correctIndex: 0,
    explanation: 'Row 1 (i=3) prints 123. Row 2 (i=2) prints 12. Row 3 (i=1) prints 1. Output: "123 12 1 ".',
    subtopic: 'Pattern Printing Logic',
  },
  {
    id: 'loop-mcq-36',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'How can you break out of two levels of nested loops in standard C?',
    options: [
      'Using break 2;',
      'Using a flag variable or a goto to a label placed right after the outer loop',
      'Calling continue outer;',
      'break always exits all nested loops'
    ],
    correctIndex: 1,
    explanation: 'C does not support multi-level break (like Java\'s labeled break). The standard idiomatic solution in C is either a flag variable check or a local goto cleanup label.',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-37',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by this code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int count = 0;
    for (int i = 0; i < 5; i++) {
        for (int j = i; j < 5; j++) {
            count++;
        }
    }
    printf("%d", count);
    return 0;
}`,
    options: ['25', '15', '10', '20'],
    correctIndex: 1,
    explanation: 'When i=0: 5 iterations. i=1: 4. i=2: 3. i=3: 2. i=4: 1. Total = 5 + 4 + 3 + 2 + 1 = 15.',
    subtopic: 'Nested Loops & Matrices',
  },
  {
    id: 'loop-mcq-38',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the output of the following do-while loop?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 1;
    do {
        printf("%d", i);
        i += 2;
    } while (i <= 5);
    return 0;
}`,
    options: ['135', '12345', '13', '1357'],
    correctIndex: 0,
    explanation: 'i takes values 1, 3, 5. After printing 5, i becomes 7. 7 <= 5 is false. Output is "135".',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-39',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        switch (i) {
            case 0: printf("A"); break;
            case 1: printf("B"); continue;
            case 2: printf("C"); break;
        }
        printf(".");
    }
    return 0;
}`,
    options: ['A.B.C.', 'A.BC.', 'ABC...', 'A.B.C'],
    correctIndex: 1,
    explanation: 'i=0: prints "A", breaks switch, prints "." -> "A.". i=1: prints "B", continue skips the rest of the for-body (skipping "."). i=2: prints "C", breaks switch, prints "." -> "C.". Total: "A.BC.".',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-40',
    topicId: 'looping',
    difficulty: 'medium',
    question: 'What is the value of i printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0;
    while (++i < 5);
    printf("%d", i);
    return 0;
}`,
    options: ['4', '5', '6', 'Infinite loop'],
    correctIndex: 1,
    explanation: 'The loop body is empty (;). i increments: 1, 2, 3, 4, 5. When i is 5, 5 < 5 is false. The loop terminates with i = 5.',
    subtopic: 'while & do-while Loops',
  },

  // ================= HARD (10 QUESTIONS) =================
  {
    id: 'loop-mcq-41',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is the output of the following loop with multiple increments in the update clause?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0;
    for (; i < 5; i++, i++) {
        printf("%d ", i);
    }
    return 0;
}`,
    options: ['0 2 4 ', '0 1 2 3 4 ', '0 3 ', 'Infinite loop'],
    correctIndex: 0,
    explanation: 'i is 0 (prints 0). Update clause evaluates i++, i++ (increments twice to 2). Prints 2, increments twice to 4. Prints 4, increments twice to 6. 6 < 5 is false. Output: "0 2 4 ".',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-42',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What will be printed by this nested loop utilizing labels and goto for multi-level break?',
    codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == 1 && j == 1) goto done;
            printf("%d%d ", i, j);
        }
    }
done:
    printf("E");
    return 0;
}`,
    options: ['00 01 02 10 E', '00 01 02 E', '00 10 E', '00 01 02 10 11 E'],
    correctIndex: 0,
    explanation: 'i=0 produces: 00 01 02. i=1, j=0 produces 10. When i=1, j=1: goto done exits both loops immediately, printing "E". Total: "00 01 02 10 E".',
    subtopic: 'break and continue Controls',
  },
  {
    id: 'loop-mcq-43',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What happens when floating point loop variables are incremented: for (float x = 0.0f; x != 1.0f; x += 0.1f)?',
    options: [
      'Executes exactly 10 times',
      'Potentially infinite loop due to floating-point rounding errors (0.1 cannot be represented exactly in binary)',
      'Compilation error: floats cannot be used in for loops',
      'Executes 9 times'
    ],
    correctIndex: 1,
    explanation: 'Because 0.1f has an inexact binary representation, repeated addition accumulates rounding error. x will likely step from 0.999999 to 1.099999, never being exactly equal to 1.0f!',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-44',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is the output of this loop with bitwise shift termination?',
    codeSnippet: `#include <stdio.h>
int main() {
    int n = 16, count = 0;
    while (n >>= 1) {
        count++;
    }
    printf("%d", count);
    return 0;
}`,
    options: ['4', '5', '3', '16'],
    correctIndex: 0,
    explanation: 'n >>= 1 takes values: 8 (true), 4 (true), 2 (true), 1 (true), 0 (false). The loop body runs 4 times, printing 4.',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-45',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is printed by this matrix diagonal traversal loop?',
    codeSnippet: `#include <stdio.h>
int main() {
    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int trace = 0;
    for (int i = 0; i < 3; i++) {
        trace += m[i][i];
    }
    printf("%d", trace);
    return 0;
}`,
    options: ['15', '45', '9', '25'],
    correctIndex: 0,
    explanation: 'm[0][0]=1, m[1][1]=5, m[2][2]=9. Sum of primary diagonal trace = 1 + 5 + 9 = 15.',
    subtopic: 'Nested Loops & Matrices',
  },
  {
    id: 'loop-mcq-46',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 0;
    while (++a < 3);
    do {
        printf("%d", a);
    } while (a++ < 3);
    return 0;
}`,
    options: ['3', '34', '33', '4'],
    correctIndex: 0,
    explanation: 'First loop: ++a < 3 leaves a = 3. do-while loop: prints 3, checks a++ < 3 (3 < 3 false, a becomes 4). Loop ends. Printed: "3".',
    subtopic: 'while & do-while Loops',
  },
  {
    id: 'loop-mcq-47',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is the output of the following loop with shadow declaration in C99?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 100;
    for (int i = 0; i < 2; i++) {
        printf("%d ", i);
    }
    printf("%d", i);
    return 0;
}`,
    options: ['0 1 100', '0 1 2', '0 1 1', 'Compilation error: redefinition of i'],
    correctIndex: 0,
    explanation: 'The loop-local variable int i shadows the outer variable i during the for loop. Once the loop ends, the outer i (100) is accessed. Output: "0 1 100".',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-48',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is the output of this Floyd\'s triangle generator for rows = 2?',
    codeSnippet: `#include <stdio.h>
int main() {
    int val = 1;
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", val++);
        }
        printf("\\n");
    }
    return 0;
}`,
    options: ['1 \\n2 3 \\n', '1 \\n1 2 \\n', '1 2 \\n3 4 \\n', '1 2 3 \\n'],
    correctIndex: 0,
    explanation: 'Row 1 prints 1. Row 2 prints 2 3. Output: "1 \\n2 3 \\n".',
    subtopic: 'Pattern Printing Logic',
  },
  {
    id: 'loop-mcq-49',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What will be printed by this loop that divides by 2?',
    codeSnippet: `#include <stdio.h>
int main() {
    int count = 0;
    for (int i = 1024; i > 1; i /= 2) {
        count++;
    }
    printf("%d", count);
    return 0;
}`,
    options: ['10', '9', '11', '8'],
    correctIndex: 1,
    explanation: '1024 / 2^9 = 2. When divided again, it becomes 1 (which fails 1 > 1). Thus exactly 9 iterations occur.',
    subtopic: 'for Loop Mechanics',
  },
  {
    id: 'loop-mcq-50',
    topicId: 'looping',
    difficulty: 'hard',
    question: 'What is the time complexity of the following nested loop structure?',
    codeSnippet: `for (int i = 1; i <= N; i++) {
    for (int j = 1; j <= N; j *= 2) {
        // O(1) body
    }
}`,
    options: ['O(N * log N)', 'O(N^2)', 'O(N)', 'O(log N)'],
    correctIndex: 0,
    explanation: 'The outer loop executes N times. The inner loop doubles j each step, executing log2(N) times. Total complexity is O(N * log N).',
    subtopic: 'Nested Loops & Matrices',
  },
];
