import { MCQ } from '../../../types';

export const operatorsMCQs: MCQ[] = [
  // ================= EASY (20 QUESTIONS) =================
  {
    id: 'op-mcq-1',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the value of the integer expression 19 % 4 in C?',
    options: ['4', '3', '4.75', '1'],
    correctIndex: 1,
    explanation: '19 divided by 4 is 4 with a remainder of 3. Modulo (%) returns the integer remainder, 3.',
    subtopic: 'Arithmetic & Assignment',
  },
  {
    id: 'op-mcq-2',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'Which of the following is NOT a valid arithmetic operator in C?',
    options: ['+', '*', '**', '%'],
    correctIndex: 2,
    explanation: 'C does not have an exponentiation operator (**). In C, power is calculated using the pow() library function in <math.h>.',
    subtopic: 'Arithmetic & Assignment',
  },
  {
    id: 'op-mcq-3',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    printf("%d", a++);
    return 0;
}`,
    options: ['5', '6', '7', '4'],
    correctIndex: 0,
    explanation: 'The postfix increment operator (a++) yields the original value (5) first before incrementing a to 6.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-4',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the output of the following prefix increment expression?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    printf("%d", ++a);
    return 0;
}`,
    options: ['5', '6', '7', '4'],
    correctIndex: 1,
    explanation: 'The prefix increment operator (++a) increments the variable to 6 first and then returns 6.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-5',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int res = 10 == 10;
    printf("%d", res);
    return 0;
}`,
    options: ['true', '1', '10', '0'],
    correctIndex: 1,
    explanation: 'In C, true relational comparisons evaluate to the integer 1.',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-6',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the result of 17 / 5 in standard C when both operands are integers?',
    options: ['3.4', '3', '4', '2'],
    correctIndex: 1,
    explanation: 'When both operands of division are integers, C performs integer division, discarding fractional parts and returning 3.',
    subtopic: 'Arithmetic & Assignment',
  },
  {
    id: 'op-mcq-7',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'Which operator is used to determine the storage size of a data type or variable in bytes?',
    options: ['len()', 'size()', 'sizeof', 'bytes()'],
    correctIndex: 2,
    explanation: 'sizeof is a unary operator built into the C language that returns the size of an operand in bytes.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-8',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What does the logical NOT operator (!) evaluate to when applied to non-zero number 42?',
    options: ['1', '0', '-42', '42'],
    correctIndex: 1,
    explanation: 'In C, any non-zero value is treated as true. Inverting true with ! results in false (0).',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-9',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the output of the following ternary expression?',
    codeSnippet: `#include <stdio.h>
int main() {
    int score = 85;
    printf("%s", score >= 50 ? "Pass" : "Fail");
    return 0;
}`,
    options: ['Pass', 'Fail', '85', 'Compilation error'],
    correctIndex: 0,
    explanation: '85 >= 50 is true, so the first branch "Pass" is selected.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-10',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'Which of the following represents the bitwise XOR operator in C?',
    options: ['&', '|', '^', '~'],
    correctIndex: 2,
    explanation: '^ is the bitwise exclusive OR (XOR) operator in C.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-11',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the equivalent expression for x *= 5 + 2?',
    options: ['x = x * 5 + 2', 'x = x * (5 + 2)', 'x = 5 + 2', 'x = (x * 5) + 2'],
    correctIndex: 1,
    explanation: 'In compound assignment operators (like *=), the entire right-hand expression is evaluated first: x = x * (5 + 2).',
    subtopic: 'Arithmetic & Assignment',
  },
  {
    id: 'op-mcq-12',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the value of 5 & 3 in binary?',
    options: ['7', '1', '0', '5'],
    correctIndex: 1,
    explanation: '5 in binary is 101; 3 is 011. Bitwise AND (101 & 011) produces 001, which is 1.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-13',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the value of 5 | 3 in binary?',
    options: ['7', '1', '8', '2'],
    correctIndex: 0,
    explanation: '5 (101) | 3 (011) = 111 in binary, which is 7 in decimal.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-14',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the effect of left shifting an integer x by 1 bit (x << 1)?',
    options: ['Divides by 2', 'Multiplies by 2', 'Adds 1', 'Squares x'],
    correctIndex: 1,
    explanation: 'Left shifting a non-negative integer by 1 bit shifts all bits left by one place, doubling its value (multiplying by 2).',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-15',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What does the bitwise NOT (~) operator do?',
    options: ['Sets all bits to 1', 'Inverts every bit (1s complement)', 'Shifts bits to right', 'Flips only sign bit'],
    correctIndex: 1,
    explanation: 'The ~ operator flips every bit in its integer operand from 0 to 1 and from 1 to 0.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-16',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the result of 2 + 3 * 4 in C?',
    options: ['20', '14', '24', '10'],
    correctIndex: 1,
    explanation: 'Multiplication (*) has higher precedence than addition (+), so 3 * 4 = 12 is calculated first, then 2 + 12 = 14.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-17',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the return type of the sizeof operator in standard C?',
    options: ['int', 'long', 'size_t (unsigned integer type)', 'unsigned short'],
    correctIndex: 2,
    explanation: 'The ISO C standard defines sizeof to return a value of implementation-defined unsigned integer type size_t.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-18',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 10, b = 20;
    printf("%d", a != b);
    return 0;
}`,
    options: ['1', '0', 'true', 'false'],
    correctIndex: 0,
    explanation: '10 != 20 is true, so the relational expression evaluates to 1.',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-19',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'What is the associativity of the simple assignment operator =?',
    options: ['Left-to-right', 'Right-to-left', 'Non-associative', 'Random'],
    correctIndex: 1,
    explanation: 'Assignment operators associate right-to-left, allowing chained assignments such as a = b = c = 5.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-20',
    topicId: 'operators-expressions',
    difficulty: 'easy',
    question: 'Which of the following casts converts integer n into a double?',
    options: ['(double)n', 'double(n)', 'n->double', 'cast<double>(n)'],
    correctIndex: 0,
    explanation: 'In C, explicit type casting syntax is (type)expression: (double)n.',
    subtopic: 'Precedence, Associativity & Casting',
  },

  // ================= MEDIUM (20 QUESTIONS) =================
  {
    id: 'op-mcq-21',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be printed by this short-circuit evaluation program?',
    codeSnippet: `#include <stdio.h>
int main() {
    int i = 0, j = 1;
    if (i && ++j) {
        printf("Yes ");
    }
    printf("%d %d", i, j);
    return 0;
}`,
    options: ['0 2', '0 1', 'Yes 0 2', '1 2'],
    correctIndex: 1,
    explanation: 'Because i is 0 (false), the logical AND (&&) short-circuits and never evaluates ++j. Thus j remains 1.',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-22',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of the following logical OR short-circuit code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 5, y = 10;
    if (x == 5 || ++y == 11) {
        printf("%d", y);
    }
    return 0;
}`,
    options: ['11', '10', '5', '0'],
    correctIndex: 1,
    explanation: 'x == 5 is true (1). Logical OR (||) stops immediately because the LHS is true, skipping ++y. y stays 10.',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-23',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of the following code involving sizeof?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    printf("%zu ", sizeof(a++));
    printf("%d", a);
    return 0;
}`,
    options: ['4 6', '4 5', '8 6', 'Compilation error'],
    correctIndex: 1,
    explanation: 'Expressions inside sizeof are not evaluated at run time. The type of a++ is int (4 bytes on standard systems), but a is never incremented, so a remains 5.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-24',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of 1 << 3 in decimal?',
    options: ['3', '6', '8', '16'],
    correctIndex: 2,
    explanation: '1 in binary is 0001. Shifting left by 3 positions gives 1000 in binary, which is 2^3 = 8.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-25',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 8 >> 2;
    printf("%d", x);
    return 0;
}`,
    options: ['4', '2', '1', '16'],
    correctIndex: 1,
    explanation: 'Right shifting 8 (1000 in binary) by 2 bits yields 0010 (2 in decimal). Equivalently, 8 / (2^2) = 2.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-26',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of the following relational expression?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    if (1 < a < 4) {
        printf("True");
    } else {
        printf("False");
    }
    return 0;
}`,
    options: ['True', 'False', 'Compilation error', 'Undefined behavior'],
    correctIndex: 0,
    explanation: 'Relational operators associate left-to-right: (1 < a) is evaluated first. Since 1 < 5 is true, it yields 1. Then (1 < 4) is evaluated, which is true (1)! So "True" is printed.',
    subtopic: 'Relational & Logical',
  },
  {
    id: 'op-mcq-27',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What does the comma operator do in the expression x = (a = 2, b = 3, a + b)?',
    options: [
      'Generates a compile error',
      'Evaluates all sub-expressions left-to-right and yields the value of the rightmost expression (5)',
      'Assigns x = 2',
      'Calculates a 3-element tuple'
    ],
    correctIndex: 1,
    explanation: 'The comma operator evaluates each operand left-to-right, discards intermediate results, and yields the final operand\'s value: 2 + 3 = 5.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-28',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of the following type promotion code?',
    codeSnippet: `#include <stdio.h>
int main() {
    float f = 5 / 2;
    printf("%.1f", f);
    return 0;
}`,
    options: ['2.5', '2.0', '2', '0.0'],
    correctIndex: 1,
    explanation: '5 and 2 are integer literals, so 5 / 2 performs integer division resulting in 2. Only after division is 2 assigned to float f, producing 2.0.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-29',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the result of applying bitwise XOR between any number X and itself (X ^ X)?',
    options: ['X', '0', '1', '~X'],
    correctIndex: 1,
    explanation: 'For any bit b, b ^ b is 0 because both bits are identical. Therefore, X ^ X is always 0.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-30',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the result of X ^ 0 for any integer X?',
    options: ['0', 'X', '1', '~X'],
    correctIndex: 1,
    explanation: 'XORing with 0 preserves the original bits: 1 ^ 0 = 1 and 0 ^ 0 = 0. Therefore, X ^ 0 = X.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-31',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 10, y = 20, z = 30;
    int res = x < y ? (y < z ? 1 : 2) : 3;
    printf("%d", res);
    return 0;
}`,
    options: ['1', '2', '3', '0'],
    correctIndex: 0,
    explanation: 'x < y (10 < 20) is true. Next, inner condition y < z (20 < 30) is also true, yielding 1.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-32',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'How do you check if a non-negative integer n is an exact power of 2 using bitwise operators?',
    options: ['(n & (n - 1)) == 0 && n > 0', '(n | (n - 1)) == 0', 'n ^ (n >> 1) == 0', 'n & 1 == 0'],
    correctIndex: 0,
    explanation: 'A power of 2 in binary has exactly one 1 bit (e.g. 8 is 1000). Subtracting 1 flips that bit and sets all lower bits (7 is 0111). Their bitwise AND is 0.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-33',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the output of the following bitwise precedence code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 6;
    if (x & 1 == 0) {
        printf("A");
    } else {
        printf("B");
    }
    return 0;
}`,
    options: ['A', 'B', 'Compilation error', 'Undefined behavior'],
    correctIndex: 1,
    explanation: '== has HIGHER precedence than &. Therefore (x & 1 == 0) is evaluated as x & (1 == 0) -> x & 0 -> 0 (false). Thus branch "B" is executed!',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-34',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the value of -10 % 3 in ISO C99?',
    options: ['-1', '2', '1', '-2'],
    correctIndex: 0,
    explanation: 'In C99, integer division truncates towards zero (-10 / 3 = -3). The identity (a/b)*b + (a%b) = a requires that the remainder have the same sign as the dividend (-10): (-3)*3 + (-1) = -10.',
    subtopic: 'Arithmetic & Assignment',
  },
  {
    id: 'op-mcq-35',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be printed by this code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1;
    int b = a++ + ++a;
    printf("%d", b);
    return 0;
}`,
    options: [
      '4',
      'Undefined behavior (modifying variable multiple times between sequence points)',
      '3',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Reading and modifying variable a multiple times in an unsequenced expression triggers undefined behavior according to the C standard.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-36',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What is the result of (int)(3.14 + 0.99) in C?',
    options: ['3', '4', '4.13', 'Compilation error'],
    correctIndex: 1,
    explanation: '3.14 + 0.99 = 4.13. Explicit casting to (int) truncates the decimal part, yielding 4.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-37',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be the output of ~0 on a system with 32-bit two\'s complement integers?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = ~0;
    printf("%d", x);
    return 0;
}`,
    options: ['0', '1', '-1', '2147483647'],
    correctIndex: 2,
    explanation: 'In two\'s complement notation, all bits set to 1 represents -1 in signed decimal.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-38',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What does the expression x &= ~(1 << k) accomplish?',
    options: [
      'Sets the kth bit of x to 1',
      'Clears (sets to 0) the kth bit of x',
      'Toggles the kth bit of x',
      'Checks if the kth bit is 1'
    ],
    correctIndex: 1,
    explanation: '1 << k has a 1 only at bit k. ~(1 << k) has 0 at bit k and 1 everywhere else. Bitwise AND with this mask forces bit k to 0 while keeping all other bits unchanged.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-39',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What does x ^= (1 << k) do?',
    options: ['Clears the kth bit', 'Toggles (inverts) the kth bit', 'Shifts x by k', 'Multiplies by 2^k'],
    correctIndex: 1,
    explanation: 'XOR with 1 flips the target bit (0 becomes 1, 1 becomes 0), while XOR with 0 leaves other bits untouched.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-40',
    topicId: 'operators-expressions',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 10;
    int b = (a > 5) ? (a < 8 ? 1 : 2) : 3;
    printf("%d", b);
    return 0;
}`,
    options: ['1', '2', '3', '10'],
    correctIndex: 1,
    explanation: 'a > 5 (10 > 5) is true. Inner condition a < 8 (10 < 8) is false, which selects 2.',
    subtopic: 'Unary, sizeof, and Ternary',
  },

  // ================= HARD (10 QUESTIONS) =================
  {
    id: 'op-mcq-41',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What is the exact output of this integer overflow comparison?',
    codeSnippet: `#include <stdio.h>
int main() {
    unsigned int u = 10;
    int s = -20;
    if (s < u) {
        printf("s is less");
    } else {
        printf("s is not less");
    }
    return 0;
}`,
    options: ['s is less', 's is not less', 'Compilation error', 'Undefined behavior'],
    correctIndex: 1,
    explanation: 'In C\'s "Usual Arithmetic Conversions", when an int and unsigned int of the same rank are compared, the signed int is converted to unsigned int! -20 becomes a huge positive number (~4.29 billion), which is greater than 10. Thus "s is not less" is printed!',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-42',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What does Brian Kernighan\'s algorithm n &= (n - 1) do in a loop?',
    options: [
      'Counts leading zeros',
      'Clears the lowest set bit in n in O(set bits) time',
      'Reverses the bits of n',
      'Divides n by 2'
    ],
    correctIndex: 1,
    explanation: 'Subtracting 1 from n flips all bits up to and including the least-significant set bit. ANDing with n zeroes out that lowest set bit, enabling fast set-bit counting.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-43',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What is the output of the following sequence point code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 2, b = 3;
    int c = a, b;
    printf("%d", c);
    return 0;
}`,
    options: ['2', '3', 'Compilation error: redefinition of b', 'Undefined behavior'],
    correctIndex: 2,
    explanation: 'In declaration int c = a, b;, the comma is a declarator separator, not the comma operator. It attempts to declare another variable b in the same scope, causing a redefinition error.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-44',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What is the result of shifting an unsigned 32-bit int: 1U << 32 in C99?',
    options: ['0', '1', '4294967296', 'Undefined behavior'],
    correctIndex: 3,
    explanation: 'According to C99 §6.5.7, if the shift count is negative or greater than or equal to the width of the promoted operand, the behavior is undefined.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-45',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What will be printed by this nested ternary evaluation?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1, b = 2, c = 3;
    int res = a ? b ? 10 : 20 : c ? 30 : 40;
    printf("%d", res);
    return 0;
}`,
    options: ['10', '20', '30', '40'],
    correctIndex: 0,
    explanation: 'Ternary associates right-to-left: a ? (b ? 10 : 20) : (c ? 30 : 40). Since a is non-zero (1), the true branch (b ? 10 : 20) is taken. Since b is non-zero (2), it yields 10.',
    subtopic: 'Unary, sizeof, and Ternary',
  },
  {
    id: 'op-mcq-46',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What is the output of the following code involving bitwise complement?',
    codeSnippet: `#include <stdio.h>
int main() {
    char c = 0xFF;
    if (c == 0xFF) {
        printf("Equal");
    } else {
        printf("Not Equal");
    }
    return 0;
}`,
    options: ['Equal', 'Not Equal (if char is signed)', 'Compilation error', 'Segmentation fault'],
    correctIndex: 1,
    explanation: 'On systems where char is signed, 0xFF is -1 in 8 bits. When compared with int literal 0xFF (255), c is sign-extended to int -1, which does not equal 255!',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-47',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What is the value of x after this bit-trick swap without temp?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 12, y = 25;
    x ^= y;
    y ^= x;
    x ^= y;
    printf("%d %d", x, y);
    return 0;
}`,
    options: ['12 25', '25 12', '0 0', 'Undefined behavior'],
    correctIndex: 1,
    explanation: 'This is the standard XOR swap algorithm: x becomes 25 and y becomes 12 without allocating auxiliary memory.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-48',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What does the expression (x & -x) isolate for a two\'s complement non-zero integer x?',
    options: [
      'The highest set bit of x',
      'The lowest (least significant) set bit of x',
      'The sign bit of x',
      'The absolute value of x'
    ],
    correctIndex: 1,
    explanation: 'In two\'s complement, -x is (~x + 1). ANDing x with (~x + 1) isolates the lowest power-of-two bit that is set in x.',
    subtopic: 'Bitwise Operations',
  },
  {
    id: 'op-mcq-49',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 2;
    int y = x << 1 + 2;
    printf("%d", y);
    return 0;
}`,
    options: ['8', '16', '6', '12'],
    correctIndex: 1,
    explanation: 'Addition (+) has HIGHER precedence than shift (<<). 1 + 2 = 3 is calculated first, then x << 3 -> 2 << 3 = 16.',
    subtopic: 'Precedence, Associativity & Casting',
  },
  {
    id: 'op-mcq-50',
    topicId: 'operators-expressions',
    difficulty: 'hard',
    question: 'What does the expression !!x evaluate to in C for any non-zero integer x?',
    options: ['0', '1', 'x', '-1'],
    correctIndex: 1,
    explanation: 'First !x inverts non-zero to 0. Second !(0) inverts 0 to 1. This double-negation idiom normalizes any truthy value to canonical boolean 1.',
    subtopic: 'Relational & Logical',
  },
];
