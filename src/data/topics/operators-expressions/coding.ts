import { CodingQuestion } from '../../../types';

export const operatorsCodingQuestions: CodingQuestion[] = [
  // 1. Basic Arithmetic Calculator
  {
    id: 'op-code-1',
    topicId: 'operators-expressions',
    number: 1,
    title: 'Basic Arithmetic Evaluator',
    difficulty: 'easy',
    problemStatement: 'Read two integers a and b. Print their sum, difference (a - b), product, quotient (integer division a / b), and remainder (a % b) on a single line separated by spaces.',
    inputFormat: 'Two space-separated integers a and b (b != 0).',
    outputFormat: 'Five space-separated integers followed by a newline: "sum diff prod quot rem".',
    constraints: '-1000 <= a, b <= 1000, b != 0',
    sampleCases: [
      { input: '14 4\n', output: '18 10 56 3 2\n', explanation: '14+4=18, 14-4=10, 14*4=56, 14/4=3, 14%4=2.' },
    ],
    testCases: [
      { input: '14 4\n', expectedOutput: '18 10 56 3 2\n', isHidden: false },
      { input: '20 5\n', expectedOutput: '25 15 100 4 0\n', isHidden: false },
      { input: '7 2\n', expectedOutput: '9 5 14 3 1\n', isHidden: true },
      { input: '100 10\n', expectedOutput: '110 90 1000 10 0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Read a and b, compute and print arithmetic results
    
    return 0;
}`,
  },

  // 2. Check Even or Odd via Bitwise AND
  {
    id: 'op-code-2',
    topicId: 'operators-expressions',
    number: 2,
    title: 'Even or Odd with Bitwise AND',
    difficulty: 'easy',
    problemStatement: 'Read an integer N. Use bitwise AND (&) with 1 to determine whether it is Even or Odd. Print "EVEN" or "ODD".',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "EVEN" or "ODD" followed by a newline.',
    constraints: '-10^6 <= N <= 10^6',
    sampleCases: [
      { input: '4\n', output: 'EVEN\n', explanation: '4 & 1 == 0' },
      { input: '7\n', output: 'ODD\n', explanation: '7 & 1 == 1' },
    ],
    testCases: [
      { input: '4\n', expectedOutput: 'EVEN\n', isHidden: false },
      { input: '7\n', expectedOutput: 'ODD\n', isHidden: false },
      { input: '0\n', expectedOutput: 'EVEN\n', isHidden: true },
      { input: '-9\n', expectedOutput: 'ODD\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Check parity with bitwise & 1
    
    return 0;
}`,
  },

  // 3. Bitwise Shift Multiplier & Divider
  {
    id: 'op-code-3',
    topicId: 'operators-expressions',
    number: 3,
    title: 'Fast Multiply and Divide by Powers of 2',
    difficulty: 'easy',
    problemStatement: 'Read a positive integer N and an integer K. Compute N multiplied by 2^K using left shift (<<), and N divided by 2^K using right shift (>>). Print "Mul = %d, Div = %d".',
    inputFormat: 'Two space-separated integers N and K.',
    outputFormat: 'Print "Mul = %d, Div = %d" followed by a newline.',
    constraints: '1 <= N <= 10000, 0 <= K <= 10',
    sampleCases: [
      { input: '16 2\n', output: 'Mul = 64, Div = 4\n', explanation: '16 * 4 = 64, 16 / 4 = 4.' },
    ],
    testCases: [
      { input: '16 2\n', expectedOutput: 'Mul = 64, Div = 4\n', isHidden: false },
      { input: '5 3\n', expectedOutput: 'Mul = 40, Div = 0\n', isHidden: false },
      { input: '100 1\n', expectedOutput: 'Mul = 200, Div = 50\n', isHidden: true },
      { input: '64 4\n', expectedOutput: 'Mul = 1024, Div = 4\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, k;
    // Compute with << and >>
    
    return 0;
}`,
  },

  // 4. Maximum of Two Numbers using Ternary
  {
    id: 'op-code-4',
    topicId: 'operators-expressions',
    number: 4,
    title: 'Ternary Max Evaluator',
    difficulty: 'easy',
    problemStatement: 'Read two integers a and b. Use the ternary conditional operator (?:) to find the maximum value and print "Max = %d".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "Max = %d" followed by a newline.',
    constraints: '-10^5 <= a, b <= 10^5',
    sampleCases: [
      { input: '12 45\n', output: 'Max = 45\n', explanation: '45 > 12.' },
    ],
    testCases: [
      { input: '12 45\n', expectedOutput: 'Max = 45\n', isHidden: false },
      { input: '-10 -50\n', expectedOutput: 'Max = -10\n', isHidden: false },
      { input: '0 0\n', expectedOutput: 'Max = 0\n', isHidden: true },
      { input: '99 99\n', expectedOutput: 'Max = 99\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Find max using ternary operator
    
    return 0;
}`,
  },

  // 5. Swap Variables Using XOR
  {
    id: 'op-code-5',
    topicId: 'operators-expressions',
    number: 5,
    title: 'Bitwise XOR Variable Swap',
    difficulty: 'easy',
    problemStatement: 'Read two integers a and b. Swap their values in memory using only bitwise XOR (^) operations without declaring any third variable. Print "a = %d, b = %d".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "a = %d, b = %d" followed by a newline.',
    constraints: '-10^6 <= a, b <= 10^6',
    sampleCases: [
      { input: '10 20\n', output: 'a = 20, b = 10\n', explanation: 'Values swapped.' },
    ],
    testCases: [
      { input: '10 20\n', expectedOutput: 'a = 20, b = 10\n', isHidden: false },
      { input: '-7 15\n', expectedOutput: 'a = 15, b = -7\n', isHidden: false },
      { input: '0 5\n', expectedOutput: 'a = 5, b = 0\n', isHidden: true },
      { input: '42 42\n', expectedOutput: 'a = 42, b = 42\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Swap with XOR
    
    return 0;
}`,
  },

  // 6. Check Kth Bit Set
  {
    id: 'op-code-6',
    topicId: 'operators-expressions',
    number: 6,
    title: 'Check if K-th Bit is Set',
    difficulty: 'easy',
    problemStatement: 'Given an integer N and bit position K (0-indexed from right), determine if the K-th bit of N is 1 (SET) or 0 (NOT SET). Print "SET" or "NOT SET".',
    inputFormat: 'Two integers N and K.',
    outputFormat: 'Print "SET" or "NOT SET" followed by a newline.',
    constraints: '0 <= N <= 10^7, 0 <= K <= 30',
    sampleCases: [
      { input: '5 0\n', output: 'SET\n', explanation: '5 is 101 in binary, bit 0 is 1.' },
      { input: '5 1\n', output: 'NOT SET\n', explanation: 'Bit 1 is 0.' },
    ],
    testCases: [
      { input: '5 0\n', expectedOutput: 'SET\n', isHidden: false },
      { input: '5 1\n', expectedOutput: 'NOT SET\n', isHidden: false },
      { input: '8 3\n', expectedOutput: 'SET\n', isHidden: true },
      { input: '15 4\n', expectedOutput: 'NOT SET\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, k;
    // Test (n & (1 << k))
    
    return 0;
}`,
  },

  // 7. Set Kth Bit
  {
    id: 'op-code-7',
    topicId: 'operators-expressions',
    number: 7,
    title: 'Set the K-th Bit',
    difficulty: 'easy',
    problemStatement: 'Given integer N and index K (0-indexed), set the K-th bit of N to 1 and print the resulting integer.',
    inputFormat: 'Two space-separated integers N and K.',
    outputFormat: 'Print the new integer value followed by a newline.',
    constraints: '0 <= N <= 10^6, 0 <= K <= 20',
    sampleCases: [
      { input: '10 2\n', output: '14\n', explanation: '10 is 1010. Setting bit 2 yields 1110 (14).' },
    ],
    testCases: [
      { input: '10 2\n', expectedOutput: '14\n', isHidden: false },
      { input: '5 1\n', expectedOutput: '7\n', isHidden: false },
      { input: '0 4\n', expectedOutput: '16\n', isHidden: true },
      { input: '15 0\n', expectedOutput: '15\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, k;
    // Use n | (1 << k)
    
    return 0;
}`,
  },

  // 8. Clear Kth Bit
  {
    id: 'op-code-8',
    topicId: 'operators-expressions',
    number: 8,
    title: 'Clear the K-th Bit',
    difficulty: 'easy',
    problemStatement: 'Given integer N and index K (0-indexed), clear the K-th bit of N (set it to 0) and print the resulting integer.',
    inputFormat: 'Two integers N and K.',
    outputFormat: 'Print the updated integer followed by a newline.',
    constraints: '0 <= N <= 10^6, 0 <= K <= 20',
    sampleCases: [
      { input: '7 1\n', output: '5\n', explanation: '7 is 111. Clearing bit 1 yields 101 (5).' },
    ],
    testCases: [
      { input: '7 1\n', expectedOutput: '5\n', isHidden: false },
      { input: '14 2\n', expectedOutput: '10\n', isHidden: false },
      { input: '16 4\n', expectedOutput: '0\n', isHidden: true },
      { input: '8 0\n', expectedOutput: '8\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, k;
    // Use n & ~(1 << k)
    
    return 0;
}`,
  },

  // 9. Absolute Value via Ternary
  {
    id: 'op-code-9',
    topicId: 'operators-expressions',
    number: 9,
    title: 'Absolute Value without Built-in abs()',
    difficulty: 'easy',
    problemStatement: 'Read an integer X. Using a ternary conditional expression, calculate and print its absolute value: "Abs = %d".',
    inputFormat: 'An integer X.',
    outputFormat: 'Print "Abs = %d" followed by a newline.',
    constraints: '-10^6 <= X <= 10^6',
    sampleCases: [
      { input: '-42\n', output: 'Abs = 42\n', explanation: '|-42| = 42' },
      { input: '15\n', output: 'Abs = 15\n', explanation: '|15| = 15' },
    ],
    testCases: [
      { input: '-42\n', expectedOutput: 'Abs = 42\n', isHidden: false },
      { input: '15\n', expectedOutput: 'Abs = 15\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Abs = 0\n', isHidden: true },
      { input: '-9999\n', expectedOutput: 'Abs = 9999\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int x;
    // Calculate abs using ternary
    
    return 0;
}`,
  },

  // 10. Percentage and Floating Precision
  {
    id: 'op-code-10',
    topicId: 'operators-expressions',
    number: 10,
    title: 'Percentage Calculator with Explicit Cast',
    difficulty: 'easy',
    problemStatement: 'Read two integers: marks obtained M and maximum marks T. Calculate percentage = (M / T) * 100 with explicit float casting and print "Percentage = %.2f%%".',
    inputFormat: 'Two space-separated integers M and T (T > 0).',
    outputFormat: 'Print "Percentage = %.2f%%" followed by a newline.',
    constraints: '0 <= M <= T <= 1000',
    sampleCases: [
      { input: '450 500\n', output: 'Percentage = 90.00%\n', explanation: '(450/500)*100 = 90%' },
    ],
    testCases: [
      { input: '450 500\n', expectedOutput: 'Percentage = 90.00%\n', isHidden: false },
      { input: '35 100\n', expectedOutput: 'Percentage = 35.00%\n', isHidden: false },
      { input: '1 3\n', expectedOutput: 'Percentage = 33.33%\n', isHidden: true },
      { input: '0 50\n', expectedOutput: 'Percentage = 0.00%\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int m, t;
    // Explicit float cast for percentage
    
    return 0;
}`,
  },

  // 11. Check Power of Two
  {
    id: 'op-code-11',
    topicId: 'operators-expressions',
    number: 11,
    title: 'Check Power of Two via Bitwise Trick',
    difficulty: 'medium',
    problemStatement: 'Given a positive integer N, determine if N is an exact power of 2 using the bitwise expression (N & (N - 1)) == 0. Print "YES" if it is, otherwise "NO".',
    inputFormat: 'A single positive integer N.',
    outputFormat: 'Print "YES" or "NO" followed by a newline.',
    constraints: '1 <= N <= 10^9',
    sampleCases: [
      { input: '16\n', output: 'YES\n', explanation: '16 is 2^4.' },
      { input: '18\n', output: 'NO\n', explanation: '18 is not a power of 2.' },
    ],
    testCases: [
      { input: '16\n', expectedOutput: 'YES\n', isHidden: false },
      { input: '18\n', expectedOutput: 'NO\n', isHidden: false },
      { input: '1\n', expectedOutput: 'YES\n', isHidden: true },
      { input: '1024\n', expectedOutput: 'YES\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Check if n is power of 2
    
    return 0;
}`,
  },

  // 12. Count Set Bits (Kernighan's Algorithm)
  {
    id: 'op-code-12',
    topicId: 'operators-expressions',
    number: 12,
    title: 'Count Set Bits (Hamming Weight)',
    difficulty: 'medium',
    problemStatement: 'Read an integer N. Count the number of 1-bits (set bits) in its binary representation using bitwise operations and print "Set bits = %d".',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "Set bits = %d" followed by a newline.',
    constraints: '0 <= N <= 10^8',
    sampleCases: [
      { input: '13\n', output: 'Set bits = 3\n', explanation: '13 in binary is 1101 (3 ones).' },
    ],
    testCases: [
      { input: '13\n', expectedOutput: 'Set bits = 3\n', isHidden: false },
      { input: '7\n', expectedOutput: 'Set bits = 3\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Set bits = 0\n', isHidden: true },
      { input: '255\n', expectedOutput: 'Set bits = 8\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Count set bits with n &= (n - 1)
    
    return 0;
}`,
  },

  // 13. Toggle Kth Bit
  {
    id: 'op-code-13',
    topicId: 'operators-expressions',
    number: 13,
    title: 'Toggle the K-th Bit',
    difficulty: 'medium',
    problemStatement: 'Given integer N and index K (0-indexed), toggle the K-th bit of N using bitwise XOR and print the new integer.',
    inputFormat: 'Two integers N and K.',
    outputFormat: 'Print the updated integer followed by a newline.',
    constraints: '0 <= N <= 10^6, 0 <= K <= 20',
    sampleCases: [
      { input: '10 1\n', output: '8\n', explanation: '10 (1010). Bit 1 was 1, becomes 0 -> 1000 (8).' },
      { input: '8 1\n', output: '10\n', explanation: '8 (1000). Bit 1 was 0, becomes 1 -> 1010 (10).' },
    ],
    testCases: [
      { input: '10 1\n', expectedOutput: '8\n', isHidden: false },
      { input: '8 1\n', expectedOutput: '10\n', isHidden: false },
      { input: '0 3\n', expectedOutput: '8\n', isHidden: true },
      { input: '15 2\n', expectedOutput: '11\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, k;
    // Toggle bit with n ^ (1 << k)
    
    return 0;
}`,
  },

  // 14. Max of 3 Numbers using Nested Ternary
  {
    id: 'op-code-14',
    topicId: 'operators-expressions',
    number: 14,
    title: 'Largest of Three via Ternary Operator',
    difficulty: 'medium',
    problemStatement: 'Read three integers a, b, and c. Find and print the largest value using a single nested ternary conditional expression: "Largest = %d".',
    inputFormat: 'Three space-separated integers a, b, c.',
    outputFormat: 'Print "Largest = %d" followed by a newline.',
    constraints: '-10^5 <= a, b, c <= 10^5',
    sampleCases: [
      { input: '15 42 27\n', output: 'Largest = 42\n', explanation: '42 is largest.' },
    ],
    testCases: [
      { input: '15 42 27\n', expectedOutput: 'Largest = 42\n', isHidden: false },
      { input: '100 50 10\n', expectedOutput: 'Largest = 100\n', isHidden: false },
      { input: '-5 -2 -9\n', expectedOutput: 'Largest = -2\n', isHidden: true },
      { input: '4 4 4\n', expectedOutput: 'Largest = 4\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    // Nested ternary expression
    
    return 0;
}`,
  },

  // 15. Check Opposite Signs
  {
    id: 'op-code-15',
    topicId: 'operators-expressions',
    number: 15,
    title: 'Detect Opposite Signs with Bitwise XOR',
    difficulty: 'medium',
    problemStatement: 'Given two non-zero integers a and b, determine if they have opposite signs using the sign-bit XOR trick ((a ^ b) < 0). Print "OPPOSITE" or "SAME".',
    inputFormat: 'Two space-separated non-zero integers a and b.',
    outputFormat: 'Print "OPPOSITE" or "SAME" followed by a newline.',
    constraints: '-10^5 <= a, b <= 10^5, a != 0, b != 0',
    sampleCases: [
      { input: '15 -7\n', output: 'OPPOSITE\n', explanation: 'Positive and negative.' },
      { input: '-10 -20\n', output: 'SAME\n', explanation: 'Both negative.' },
    ],
    testCases: [
      { input: '15 -7\n', expectedOutput: 'OPPOSITE\n', isHidden: false },
      { input: '-10 -20\n', expectedOutput: 'SAME\n', isHidden: false },
      { input: '5 9\n', expectedOutput: 'SAME\n', isHidden: true },
      { input: '-1 1\n', expectedOutput: 'OPPOSITE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Detect opposite signs with (a ^ b) < 0
    
    return 0;
}`,
  },

  // 16. Two's Complement Isolation of Lowest Set Bit
  {
    id: 'op-code-16',
    topicId: 'operators-expressions',
    number: 16,
    title: 'Lowest Set Bit Isolator',
    difficulty: 'medium',
    problemStatement: 'Read a positive integer N. Use the two\'s complement formula (N & -N) to isolate its lowest set bit (the lowest power of 2 that divides N) and print "Lowest set bit = %d".',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Print "Lowest set bit = %d" followed by a newline.',
    constraints: '1 <= N <= 10^7',
    sampleCases: [
      { input: '12\n', output: 'Lowest set bit = 4\n', explanation: '12 is 1100 in binary. Lowest set bit is 4 (0100).' },
    ],
    testCases: [
      { input: '12\n', expectedOutput: 'Lowest set bit = 4\n', isHidden: false },
      { input: '18\n', expectedOutput: 'Lowest set bit = 2\n', isHidden: false },
      { input: '7\n', expectedOutput: 'Lowest set bit = 1\n', isHidden: true },
      { input: '64\n', expectedOutput: 'Lowest set bit = 64\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Calculate n & -n
    
    return 0;
}`,
  },

  // 17. Compound Interest Calculation
  {
    id: 'op-code-17',
    topicId: 'operators-expressions',
    number: 17,
    title: 'Compound Interest Calculation',
    difficulty: 'medium',
    problemStatement: 'Given principal P, annual rate R (in percent), and time T (in years, compounded annually), calculate the total amount A = P * (1 + R / 100)^T. Print "Amount = %.2f". (You may use pow() from <math.h>).',
    inputFormat: 'Three floats: P R T.',
    outputFormat: 'Print "Amount = %.2f" followed by a newline.',
    constraints: '1 <= P <= 10^6, 0 <= R <= 50, 1 <= T <= 30',
    sampleCases: [
      { input: '1000 10 2\n', output: 'Amount = 1210.00\n', explanation: '1000 * (1.1)^2 = 1210.00' },
    ],
    testCases: [
      { input: '1000 10 2\n', expectedOutput: 'Amount = 1210.00\n', isHidden: false },
      { input: '5000 5 1\n', expectedOutput: 'Amount = 5250.00\n', isHidden: false },
      { input: '2000 8 3\n', expectedOutput: 'Amount = 2519.42\n', isHidden: true },
      { input: '10000 0 5\n', expectedOutput: 'Amount = 10000.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>
#include <math.h>

int main() {
    float p, r, t;
    // Calculate compound amount
    
    return 0;
}`,
  },

  // 18. Upper to Lower ASCII using Bitwise OR
  {
    id: 'op-code-18',
    topicId: 'operators-expressions',
    number: 18,
    title: 'Fast Lowercase via Bitwise OR',
    difficulty: 'medium',
    problemStatement: 'Read an uppercase letter C [A-Z]. Set its 5th bit using bitwise OR with 32 (or \' \') to convert it to lowercase and print "Lowercase = %c".',
    inputFormat: 'A single uppercase character C.',
    outputFormat: 'Print "Lowercase = %c" followed by a newline.',
    constraints: 'Input is an uppercase character [A-Z].',
    sampleCases: [
      { input: 'A\n', output: 'Lowercase = a\n', explanation: '\'A\' (65) | 32 = 97 (\'a\').' },
      { input: 'Z\n', output: 'Lowercase = z\n', explanation: '\'Z\' (90) | 32 = 122 (\'z\').' },
    ],
    testCases: [
      { input: 'A\n', expectedOutput: 'Lowercase = a\n', isHidden: false },
      { input: 'Z\n', expectedOutput: 'Lowercase = z\n', isHidden: false },
      { input: 'M\n', expectedOutput: 'Lowercase = m\n', isHidden: true },
      { input: 'Q\n', expectedOutput: 'Lowercase = q\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Convert to lowercase with ch | 32
    
    return 0;
}`,
  },

  // 19. Lower to Upper ASCII using Bitwise AND
  {
    id: 'op-code-19',
    topicId: 'operators-expressions',
    number: 19,
    title: 'Fast Uppercase via Bitwise AND',
    difficulty: 'medium',
    problemStatement: 'Read a lowercase letter C [a-z]. Clear its 5th bit using bitwise AND with ~32 (or \'_\') to convert it to uppercase and print "Uppercase = %c".',
    inputFormat: 'A single lowercase character C.',
    outputFormat: 'Print "Uppercase = %c" followed by a newline.',
    constraints: 'Input is a lowercase character [a-z].',
    sampleCases: [
      { input: 'a\n', output: 'Uppercase = A\n', explanation: '\'a\' (97) & ~32 = 65 (\'A\').' },
    ],
    testCases: [
      { input: 'a\n', expectedOutput: 'Uppercase = A\n', isHidden: false },
      { input: 'h\n', expectedOutput: 'Uppercase = H\n', isHidden: false },
      { input: 'z\n', expectedOutput: 'Uppercase = Z\n', isHidden: true },
      { input: 'p\n', expectedOutput: 'Uppercase = P\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Convert with ch & ~32
    
    return 0;
}`,
  },

  // 20. Count Number of Differing Bits
  {
    id: 'op-code-20',
    topicId: 'operators-expressions',
    number: 20,
    title: 'Hamming Distance Between Two Integers',
    difficulty: 'medium',
    problemStatement: 'Given two integers a and b, compute the Hamming distance (number of bit positions in which they differ) using XOR and bit-counting. Print "Hamming distance = %d".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "Hamming distance = %d" followed by a newline.',
    constraints: '0 <= a, b <= 10^7',
    sampleCases: [
      { input: '1 4\n', output: 'Hamming distance = 2\n', explanation: '1 (001) and 4 (100) differ in 2 positions.' },
    ],
    testCases: [
      { input: '1 4\n', expectedOutput: 'Hamming distance = 2\n', isHidden: false },
      { input: '3 1\n', expectedOutput: 'Hamming distance = 1\n', isHidden: false },
      { input: '7 7\n', expectedOutput: 'Hamming distance = 0\n', isHidden: true },
      { input: '0 255\n', expectedOutput: 'Hamming distance = 8\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Calculate hamming distance using xor and bit-counting
    
    return 0;
}`,
  },

  // 21. Rotate Bits Left
  {
    id: 'op-code-21',
    topicId: 'operators-expressions',
    number: 21,
    title: 'Circular Bit Rotation (Left)',
    difficulty: 'hard',
    problemStatement: 'Read a 16-bit unsigned integer N and an integer D (0 <= D < 16). Circularly rotate the bits of N left by D positions and print the resulting 16-bit decimal value.',
    inputFormat: 'Two space-separated integers N and D.',
    outputFormat: 'Print the rotated integer followed by a newline.',
    constraints: '0 <= N <= 65535, 0 <= D < 16',
    sampleCases: [
      { input: '16 2\n', output: '64\n', explanation: '16 (0000 0000 0001 0000) rotated left by 2 bits becomes 64.' },
    ],
    testCases: [
      { input: '16 2\n', expectedOutput: '64\n', isHidden: false },
      { input: '32768 1\n', expectedOutput: '1\n', isHidden: false },
      { input: '1 15\n', expectedOutput: '32768\n', isHidden: true },
      { input: '0 5\n', expectedOutput: '0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    unsigned short n;
    int d;
    // Circular left shift: (n << d) | (n >> (16 - d))
    
    return 0;
}`,
  },

  // 22. Find Single Non-Duplicate Element in Array
  {
    id: 'op-code-22',
    topicId: 'operators-expressions',
    number: 22,
    title: 'Single Non-Repeating Element',
    difficulty: 'hard',
    problemStatement: 'You are given an array of size N where every element appears twice except for one unique element. Use XOR property (x ^ x = 0, x ^ 0 = x) to find the unique element in O(N) time and O(1) space. Print "Single element = %d".',
    inputFormat: 'First line integer N, second line N space-separated integers.',
    outputFormat: 'Print "Single element = %d" followed by a newline.',
    constraints: '1 <= N <= 1000, N is odd.',
    sampleCases: [
      { input: '5\n4 1 2 1 2\n', output: 'Single element = 4\n', explanation: '4 is the only element without a pair.' },
    ],
    testCases: [
      { input: '5\n4 1 2 1 2\n', expectedOutput: 'Single element = 4\n', isHidden: false },
      { input: '7\n9 3 5 3 9 7 5\n', expectedOutput: 'Single element = 7\n', isHidden: false },
      { input: '1\n42\n', expectedOutput: 'Single element = 42\n', isHidden: true },
      { input: '5\n10 20 30 20 10\n', expectedOutput: 'Single element = 30\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // XOR accumulator to find single element
    
    return 0;
}`,
  },

  // 23. Reverse Bits of 32-bit Integer
  {
    id: 'op-code-23',
    topicId: 'operators-expressions',
    number: 23,
    title: 'Reverse Bits of 8-bit Integer',
    difficulty: 'hard',
    problemStatement: 'Read an 8-bit unsigned integer N (0 to 255). Reverse its binary bits and print the resulting decimal integer.',
    inputFormat: 'An integer N.',
    outputFormat: 'Print the bit-reversed integer followed by a newline.',
    constraints: '0 <= N <= 255',
    sampleCases: [
      { input: '1\n', output: '128\n', explanation: '0000 0001 reversed is 1000 0000 (128).' },
      { input: '2\n', output: '64\n', explanation: '0000 0010 reversed is 0100 0000 (64).' },
    ],
    testCases: [
      { input: '1\n', expectedOutput: '128\n', isHidden: false },
      { input: '2\n', expectedOutput: '64\n', isHidden: false },
      { input: '0\n', expectedOutput: '0\n', isHidden: true },
      { input: '255\n', expectedOutput: '255\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    unsigned char n;
    // Reverse 8 bits
    
    return 0;
}`,
  },

  // 24. Check if Two Integers are Equal Without Comparison
  {
    id: 'op-code-24',
    topicId: 'operators-expressions',
    number: 24,
    title: 'Equality Check Without == or !=',
    difficulty: 'hard',
    problemStatement: 'Read two integers a and b. Determine if they are equal using only bitwise XOR (^) and logical NOT (!). Print "EQUAL" if identical, otherwise "DIFFERENT".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "EQUAL" or "DIFFERENT" followed by a newline.',
    constraints: '-10^6 <= a, b <= 10^6',
    sampleCases: [
      { input: '42 42\n', output: 'EQUAL\n', explanation: '42 ^ 42 == 0' },
      { input: '10 20\n', output: 'DIFFERENT\n', explanation: '10 ^ 20 != 0' },
    ],
    testCases: [
      { input: '42 42\n', expectedOutput: 'EQUAL\n', isHidden: false },
      { input: '10 20\n', expectedOutput: 'DIFFERENT\n', isHidden: false },
      { input: '0 0\n', expectedOutput: 'EQUAL\n', isHidden: true },
      { input: '-5 5\n', expectedOutput: 'DIFFERENT\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Use !(a ^ b)
    
    return 0;
}`,
  },

  // 25. Add Two Numbers Without Arithmetic Plus (+)
  {
    id: 'op-code-25',
    topicId: 'operators-expressions',
    number: 25,
    title: 'Binary Adder Without Plus (+)',
    difficulty: 'hard',
    problemStatement: 'Given two non-negative integers a and b, compute their sum using bitwise half-adder logic (sum = a ^ b, carry = (a & b) << 1) in a loop without using the arithmetic + operator. Print "Sum = %d".',
    inputFormat: 'Two space-separated non-negative integers a and b.',
    outputFormat: 'Print "Sum = %d" followed by a newline.',
    constraints: '0 <= a, b <= 10^6',
    sampleCases: [
      { input: '15 27\n', output: 'Sum = 42\n', explanation: '15 + 27 = 42' },
    ],
    testCases: [
      { input: '15 27\n', expectedOutput: 'Sum = 42\n', isHidden: false },
      { input: '0 10\n', expectedOutput: 'Sum = 10\n', isHidden: false },
      { input: '100 250\n', expectedOutput: 'Sum = 350\n', isHidden: true },
      { input: '999 1\n', expectedOutput: 'Sum = 1000\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Half adder loop with XOR and carry
    
    return 0;
}`,
  },
];
