import { Lesson } from '../../../types';

export const loopingLessons: Lesson = {
  id: 'lesson-looping',
  topicId: 'looping',
  title: 'Looping and Iteration in C',
  order: 4,
  sections: [
    {
      id: 'sec-loop-for',
      title: 'for Loop Mechanics & C99 Scope',
      concept:
        'The `for` loop is an entry-controlled loop ideal for determinate iterations. It bundles initialization, condition check, and step update into a single construct. In C99, loop counter variables can be declared directly within the initialization clause, scoping them strictly to the loop.',
      syntax: `for (initialization; condition; increment/decrement) {\n    // loop body\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    // C99: loop variable declared directly in header
    for (int i = 1; i <= 5; i++) {
        printf("Iteration %d, square = %d\\n", i, i * i);
    }
    
    // Multiple loop variables in initialization and update
    printf("Dual counters:\\n");
    for (int left = 0, right = 10; left <= right; left++, right--) {
        printf("left = %d, right = %d\\n", left, right);
    }
    
    return 0;
}`,
      annotation:
        'All three clauses of the for loop are optional: for (;;) { ... } creates an intentional infinite loop.',
      commonMistakes: [
        'Accidental semicolon after for loop header: for (int i = 0; i < 5; i++); { printf("%d", i); } runs the empty statement 5 times and then errors or prints once.',
        'Off-by-one errors (using < vs <= or 0-indexed vs 1-indexed boundaries).',
        'Modifying the loop index variable inside the loop body unexpectedly.',
      ],
      quickRecap: [
        'for (init; cond; update) checks the condition BEFORE executing the body.',
        'C99 allows loop-local variable declarations: for (int i = 0; ...)',
        'for (;;) creates an infinite loop.',
      ],
    },
    {
      id: 'sec-loop-while-dowhile',
      title: 'while & do-while Loops (Pre-test vs Post-test)',
      concept:
        '`while` is a pre-test loop that checks the condition prior to entering the body (executes 0 or more times). `do-while` is a post-test loop that executes the body at least once before testing the condition, making it ideal for menu prompts and user input validation.',
      syntax: `while (condition) {\n    ...\n}\n\ndo {\n    ...\n} while (condition); // Notice required semicolon!`,
      codeSnippet: `#include <stdio.h>

int main() {
    int count = 5;
    printf("while countdown:\\n");
    while (count > 0) {
        printf("%d ", count);
        count--;
    }
    printf("\\n");
    
    // do-while executes at least once even if condition starts false
    int x = 100;
    do {
        printf("do-while executes at least once! x = %d\\n", x);
    } while (x < 10); // Condition is false (100 < 10)
    
    return 0;
}`,
      annotation:
        'The trailing semicolon in do { ... } while (condition); is mandatory.',
      commonMistakes: [
        'Forgetting the closing semicolon after while (cond); in a do-while loop.',
        'Forgetting to update the loop condition variable inside a while loop, leading to an accidental infinite loop.',
      ],
      quickRecap: [
        'while executes 0 or more times.',
        'do-while executes 1 or more times.',
        'do-while requires a semicolon after the while(...) clause.',
      ],
    },
    {
      id: 'sec-loop-break-continue',
      title: 'break and continue Loop Controls',
      concept:
        '`break` immediately terminates the innermost enclosing loop and transfers control outside. `continue` skips the remainder of the current iteration and jumps directly to the loop update/condition evaluation for the next iteration.',
      syntax: `break;     // exit innermost loop immediately\ncontinue;  // skip to next iteration`,
      codeSnippet: `#include <stdio.h>

int main() {
    printf("break example (stops at 5):\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            break; // Stop loop early
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    printf("continue example (skips multiples of 3):\\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue; // Skip rest of body and continue loop
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    return 0;
}`,
      annotation:
        'In a for loop, continue jumps to the increment step (i++), NOT the condition check.',
      commonMistakes: [
        'Calling continue in a while loop before incrementing the counter, causing an infinite loop because the counter is never updated!',
        'Assuming break exits all nested loops (it only exits the innermost loop).',
      ],
      quickRecap: [
        'break exits the enclosing loop completely.',
        'continue skips to the next iteration.',
        'In while loops, ensure the loop counter is incremented before continue.',
      ],
    },
    {
      id: 'sec-loop-nested',
      title: 'Nested Loops & Matrix Traversal',
      concept:
        'A nested loop is a loop located inside another loop. For every single iteration of the outer loop, the inner loop executes its entire cycle of iterations. This is the cornerstone of 2D grid processing, matrix operations, and combinatorial searches.',
      syntax: `for (int r = 0; r < rows; r++) {\n    for (int c = 0; c < cols; c++) {\n        // access matrix[r][c]\n    }\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    int rows = 3, cols = 4;
    
    // Multiplication table grid (3 x 4)
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= cols; j++) {
            printf("%3d", i * j);
        }
        printf("\\n"); // Newline after each row
    }
    
    return 0;
}`,
      annotation:
        'Total iterations for independent loops equals (outer count) * (inner count). Time complexity is O(N * M).',
      commonMistakes: [
        'Accidentally using the same loop variable (e.g. i) in both the outer and inner loops, breaking the outer loop\'s state.',
        'Putting the newline printf("\\n") inside the inner loop rather than the outer loop.',
      ],
      quickRecap: [
        'Inner loop runs to completion for every single step of outer loop.',
        'Always use distinct variable names (i, j, k) for nested counters.',
      ],
    },
    {
      id: 'sec-loop-patterns',
      title: 'Pattern Printing Logic',
      concept:
        'Pattern printing develops spatial and mathematical reasoning in C. Outer loops control rows (vertical position), while inner loops control columns (horizontal position: spaces and symbols like asterisks).',
      syntax: `for (int i = 1; i <= N; i++) {\n    for (int j = 1; j <= i; j++) {\n        printf("* ");\n    }\n    printf("\\n");\n}`,
      codeSnippet: `#include <stdio.h>

int main() {
    int n = 4;
    
    // Right triangle
    printf("Right Triangle:\\n");
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    
    // Number pyramid
    printf("\\nNumber Pyramid:\\n");
    for (int i = 1; i <= n; i++) {
        // Leading spaces
        for (int s = 1; s <= n - i; s++) {
            printf(" ");
        }
        // Numbers
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }
    
    return 0;
}`,
      annotation:
        'Formula for inverted rows is often (N - i + 1) or (2 * i - 1) for odd-count pyramids.',
      commonMistakes: [
        'Mixing 0-indexed and 1-indexed pattern loop counters, producing skewed geometries.',
        'Forgetting trailing newlines between pattern lines.',
      ],
      quickRecap: [
        'Outer loop controls row index i.',
        'Inner loops print spaces and characters for the current row.',
        'Derive mathematical relationships between row index i and column count.',
      ],
    },
  ],
};
