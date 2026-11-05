import { Lesson } from '../../../types';

export const operatorsLessons: Lesson = {
  id: 'lesson-operators-expressions',
  topicId: 'operators-expressions',
  title: 'Operators and Expressions in C',
  order: 2,
  sections: [
    {
      id: 'sec-op-arithmetic',
      title: 'Arithmetic & Assignment Operators',
      concept:
        'C supports five primary binary arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%). Integer division truncates towards zero (e.g., 7 / 2 evaluates to 3). Modulo (%) yields the remainder of integer division and is undefined for floating-point operands.',
      syntax: `result = operand1 + operand2;\na += 5; // Compound assignment: a = a + 5;`,
      codeSnippet: `#include <stdio.h>

int main() {
    int a = 14, b = 4;
    printf("Addition:       %d + %d = %d\\n", a, b, a + b);
    printf("Subtraction:    %d - %d = %d\\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b);
    printf("Integer Div:    %d / %d = %d\\n", a, b, a / b);
    printf("Modulo:         %d %% %d = %d\\n", a, b, a % b);
    
    // Float division requires at least one float operand
    float precise = (float)a / b;
    printf("Float Div:      %.2f\\n", precise);
    
    return 0;
}`,
      annotation:
        'Notice how (float)a / b forces floating-point division rather than integer truncation.',
      commonMistakes: [
        'Attempting to use the modulo operator (%) on float or double operands, which triggers a compile error (use fmod() from <math.h> instead).',
        'Division by zero (e.g. 5 / 0), causing an immediate SIGFPE runtime crash.',
        'Assuming integer division 1 / 2 yields 0.5 instead of 0.',
      ],
      quickRecap: [
        'Integer division truncates decimals toward zero.',
        'Modulo (%) requires integer operands on both sides.',
        'Compound operators (+=, *=) evaluate RHS first before assignment.',
      ],
    },
    {
      id: 'sec-op-relational-logical',
      title: 'Relational & Logical Operators (Short-Circuit Evaluation)',
      concept:
        'Relational operators (<, <=, >, >=, ==, !=) yield 1 for true and 0 for false. Logical operators (&& for AND, || for OR, ! for NOT) operate on truth values. In C, 0 is false and any non-zero value is true. C guarantees short-circuit evaluation: in A && B, if A is 0, B is never evaluated; in A || B, if A is non-zero, B is never evaluated.',
      syntax: `condition1 && condition2\ncondition1 || condition2\n!condition`,
      codeSnippet: `#include <stdio.h>

int main() {
    int x = 0, y = 10;
    
    // Short-circuit: ++y is NEVER executed because x is 0 (false)
    if (x && ++y) {
        printf("Branch taken\\n");
    }
    printf("After && short-circuit: y = %d\\n", y); // y is still 10!
    
    int a = 1, b = 20;
    // Short-circuit: ++b is NEVER executed because a is 1 (true)
    if (a || ++b) {
        printf("Logical OR passed\\n");
    }
    printf("After || short-circuit: b = %d\\n", b); // b is still 20!
    
    return 0;
}`,
      annotation:
        'Short-circuit evaluation is a foundational C guarantee used to safely guard pointers, e.g., if (ptr != NULL && *ptr > 0).',
      commonMistakes: [
        'Confusing assignment = with relational equality == (e.g. if (x = 5) always evaluates to true).',
        'Confusing logical operators &&, || with bitwise operators &, |.',
        'Writing chained comparisons like 1 < x < 10. In C, (1 < x) evaluates to 0 or 1, which is then compared against 10 (always true!).',
      ],
      quickRecap: [
        'Relational expressions produce integers 0 or 1.',
        '&& stops immediately if LHS is 0.',
        '|| stops immediately if LHS is non-zero.',
      ],
    },
    {
      id: 'sec-op-bitwise',
      title: 'Bitwise Operators & Bit Manipulation',
      concept:
        'Bitwise operators work directly on the individual binary bits of integer data types: AND (&), OR (|), XOR (^), NOT/One\'s Complement (~), Left Shift (<<), and Right Shift (>>). Left shifting x << n is equivalent to multiplying by 2^n. Right shifting unsigned integers x >> n divides by 2^n.',
      syntax: `mask = (1 << bitPosition);\nnumber |= mask;   // Set bit\nnumber &= ~mask;  // Clear bit\nnumber ^= mask;   // Toggle bit`,
      codeSnippet: `#include <stdio.h>

int main() {
    unsigned char a = 0x0F; // 0000 1111 (15)
    unsigned char b = 0x33; // 0011 0011 (51)
    
    printf("a & b  = 0x%02X\\n", a & b); // 0000 0011 (0x03)
    printf("a | b  = 0x%02X\\n", a | b); // 0011 1111 (0x3F)
    printf("a ^ b  = 0x%02X\\n", a ^ b); // 0011 1100 (0x3C)
    printf("~a     = 0x%02X\\n", (unsigned char)~a); // 1111 0000 (0xF0)
    printf("a << 2 = 0x%02X\\n", (unsigned char)(a << 2)); // 0011 1100 (0x3C)
    printf("b >> 2 = 0x%02X\\n", (unsigned char)(b >> 2)); // 0000 1100 (0x0C)
    
    // Check if 3rd bit of number 13 (1101) is set
    int n = 13;
    int isSet = (n & (1 << 3)) != 0;
    printf("Bit 3 of %d is %s\\n", n, isSet ? "SET" : "CLEARED");
    
    return 0;
}`,
      annotation:
        'Bit shifting negative numbers or shifting by >= bit-width produces undefined behavior in standard C.',
      commonMistakes: [
        'Shifting by an amount greater than or equal to the width of the type (e.g. 1ULL << 64 on 64-bit uint) causes undefined behavior.',
        'Assuming right shift (>>) of signed negative numbers always zero-fills; in C99, right shift of signed negative numbers is implementation-defined (arithmetic vs logical shift).',
      ],
      quickRecap: [
        '&: both bits must be 1; |: either bit 1; ^: bits must differ.',
        'Left shift x << k multiplies by 2^k.',
        'Always use unsigned types for predictable bitwise operations.',
      ],
    },
    {
      id: 'sec-op-unary-ternary',
      title: 'Unary, sizeof, and Ternary (?:) Operators',
      concept:
        'Unary operators operate on a single operand: prefix/postfix increment (++), decrement (--), unary minus (-), address-of (&), indirection (*), and sizeof. `sizeof` is evaluated at compile time (except for variable-length arrays) and returns the size in bytes as `size_t`. The ternary conditional operator (condition ? expr1 : expr2) evaluates only one branch.',
      syntax: `++x (pre-increment); x++ (post-increment);\nsize_t bytes = sizeof(type);\nmax = (a > b) ? a : b;`,
      codeSnippet: `#include <stdio.h>

int main() {
    int x = 5;
    int pre = ++x;  // x becomes 6, pre is 6
    int post = x++; // post is 6, x becomes 7
    printf("x = %d, pre = %d, post = %d\\n", x, pre, post);
    
    // sizeof yields size in bytes
    printf("sizeof(int):    %zu\\n", sizeof(int));
    printf("sizeof(double): %zu\\n", sizeof(double));
    
    int arr[10];
    printf("Elements in arr: %zu\\n", sizeof(arr) / sizeof(arr[0]));
    
    // Ternary operator
    int a = 15, b = 25;
    int larger = (a > b) ? a : b;
    printf("Larger of %d and %d is %d\\n", a, b, larger);
    
    return 0;
}`,
      annotation:
        'Note that sizeof does not evaluate expressions inside it at runtime: sizeof(i++) does not increment i!',
      commonMistakes: [
        'Writing i = i++ or multiple modifications in one expression (undefined behavior).',
        'Expecting sizeof(ptr) to return the allocated array size when passed into a function (arrays decay to pointers).',
      ],
      quickRecap: [
        'Prefix (++x) increments before value is used; postfix (x++) increments after.',
        'sizeof is a compile-time operator that returns size_t.',
        'Ternary conditional executes only the chosen branch.',
      ],
    },
    {
      id: 'sec-op-precedence',
      title: 'Precedence, Associativity & Type Casting',
      concept:
        'Operator precedence dictates the order in which operators are grouped in an expression without parentheses. Associativity specifies whether operators of identical precedence group Left-to-Right or Right-to-Left. Type casting allows implicit (widening) or explicit conversion.',
      syntax: `(target_type)expression\nPrecedence: Postfix > Unary > Multiplicative > Additive > Shift > Relational > Equality > Bitwise > Logical > Ternary > Assignment`,
      codeSnippet: `#include <stdio.h>

int main() {
    // * has higher precedence than +
    int res = 2 + 3 * 4; // 2 + 12 = 14, not 20!
    printf("2 + 3 * 4 = %d\\n", res);
    
    // Assignment is right-to-left
    int x, y, z;
    x = y = z = 10;
    printf("x = %d, y = %d, z = %d\\n", x, y, z);
    
    // Type conversion
    int a = 5, b = 2;
    double d1 = a / b;          // 5 / 2 = 2, then promoted to 2.0
    double d2 = (double)a / b;  // 5.0 / 2 = 2.5
    printf("d1 = %.1f, d2 = %.1f\\n", d1, d2);
    
    return 0;
}`,
      annotation:
        'When in doubt, use explicit parentheses: (a & (1 << i)) is clearer and safer than relying on bitwise precedence.',
      commonMistakes: [
        'Bitwise operators (&, |, ^) have LOWER precedence than relational equality (==, !=). if (x & 1 == 0) groups as if (x & (1 == 0))!',
        'Casting after division: (float)(5 / 2) still evaluates to 2.0, because 5/2 happens in integer arithmetic first.',
      ],
      quickRecap: [
        'Always wrap bitwise expressions in parentheses when comparing: (x & 1) == 0.',
        'Cast operands before division to preserve fractional precision.',
        'Assignment and ternary associate right-to-left; arithmetic associates left-to-right.',
      ],
    },
  ],
};
