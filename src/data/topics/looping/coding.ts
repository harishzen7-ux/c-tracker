import { CodingQuestion } from '../../../types';

export const loopingCodingQuestions: CodingQuestion[] = [
  // 1. Print 1 to N
  {
    id: 'loop-code-1',
    topicId: 'looping',
    number: 1,
    title: 'Print First N Natural Numbers',
    difficulty: 'easy',
    problemStatement: 'Given a positive integer N, print all integers from 1 up to N on a single line separated by spaces.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'N space-separated integers followed by a newline.',
    constraints: '1 <= N <= 1000',
    sampleCases: [
      { input: '5\n', output: '1 2 3 4 5\n', explanation: 'Numbers from 1 to 5.' },
    ],
    testCases: [
      { input: '5\n', expectedOutput: '1 2 3 4 5\n', isHidden: false },
      { input: '3\n', expectedOutput: '1 2 3\n', isHidden: false },
      { input: '1\n', expectedOutput: '1\n', isHidden: true },
      { input: '10\n', expectedOutput: '1 2 3 4 5 6 7 8 9 10\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Print 1 to n
    
    return 0;
}`,
  },

  // 2. Sum of First N Numbers
  {
    id: 'loop-code-2',
    topicId: 'looping',
    number: 2,
    title: 'Sum of First N Numbers',
    difficulty: 'easy',
    problemStatement: 'Read an integer N. Compute the sum 1 + 2 + ... + N using a loop and print "Sum = %d".',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "Sum = %d" followed by a newline.',
    constraints: '0 <= N <= 10000',
    sampleCases: [
      { input: '5\n', output: 'Sum = 15\n', explanation: '1+2+3+4+5 = 15' },
    ],
    testCases: [
      { input: '5\n', expectedOutput: 'Sum = 15\n', isHidden: false },
      { input: '10\n', expectedOutput: 'Sum = 55\n', isHidden: false },
      { input: '1\n', expectedOutput: 'Sum = 1\n', isHidden: true },
      { input: '100\n', expectedOutput: 'Sum = 5050\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Calculate sum using loop
    
    return 0;
}`,
  },

  // 3. Multiplication Table
  {
    id: 'loop-code-3',
    topicId: 'looping',
    number: 3,
    title: 'Multiplication Table',
    difficulty: 'easy',
    problemStatement: 'Given an integer N, print its multiplication table from 1 to 10 in the format: "%d x %d = %d", one line per multiple.',
    inputFormat: 'An integer N.',
    outputFormat: '10 lines showing multiplication table.',
    constraints: '-1000 <= N <= 1000',
    sampleCases: [
      { input: '5\n', output: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n', explanation: 'Table of 5.' },
    ],
    testCases: [
      { input: '5\n', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n', isHidden: false },
      { input: '2\n', expectedOutput: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20\n', isHidden: false },
      { input: '1\n', expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10\n', isHidden: true },
      { input: '7\n', expectedOutput: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Print multiplication table
    
    return 0;
}`,
  },

  // 4. Factorial Calculator
  {
    id: 'loop-code-4',
    topicId: 'looping',
    number: 4,
    title: 'Factorial of a Number',
    difficulty: 'easy',
    problemStatement: 'Read an integer N (0 <= N <= 12). Compute N! (N factorial, where 0! = 1) and print "Factorial = %lld".',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "Factorial = %lld" followed by a newline.',
    constraints: '0 <= N <= 12',
    sampleCases: [
      { input: '5\n', output: 'Factorial = 120\n', explanation: '5! = 120' },
      { input: '0\n', output: 'Factorial = 1\n', explanation: '0! = 1' },
    ],
    testCases: [
      { input: '5\n', expectedOutput: 'Factorial = 120\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Factorial = 1\n', isHidden: false },
      { input: '4\n', expectedOutput: 'Factorial = 24\n', isHidden: true },
      { input: '7\n', expectedOutput: 'Factorial = 5040\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Calculate factorial
    
    return 0;
}`,
  },

  // 5. Count Digits of an Integer
  {
    id: 'loop-code-5',
    topicId: 'looping',
    number: 5,
    title: 'Count Digits',
    difficulty: 'easy',
    problemStatement: 'Read an integer N. Count the number of decimal digits in N using a loop and print "Digits = %d". For 0, the digit count is 1.',
    inputFormat: 'An integer N.',
    outputFormat: 'Print "Digits = %d" followed by a newline.',
    constraints: '-10^9 <= N <= 10^9',
    sampleCases: [
      { input: '12345\n', output: 'Digits = 5\n', explanation: '5 digits.' },
      { input: '0\n', output: 'Digits = 1\n', explanation: '0 has 1 digit.' },
    ],
    testCases: [
      { input: '12345\n', expectedOutput: 'Digits = 5\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Digits = 1\n', isHidden: false },
      { input: '-789\n', expectedOutput: 'Digits = 3\n', isHidden: true },
      { input: '999999\n', expectedOutput: 'Digits = 6\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Count digits
    
    return 0;
}`,
  },

  // 6. Reverse an Integer
  {
    id: 'loop-code-6',
    topicId: 'looping',
    number: 6,
    title: 'Reverse Any Integer',
    difficulty: 'easy',
    problemStatement: 'Read a non-negative integer N. Reverse its digits using a loop and print "Reversed = %d". (e.g. 1234 -> 4321, 500 -> 5).',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "Reversed = %d" followed by a newline.',
    constraints: '0 <= N <= 10^8',
    sampleCases: [
      { input: '1234\n', output: 'Reversed = 4321\n', explanation: 'Reversed digits.' },
    ],
    testCases: [
      { input: '1234\n', expectedOutput: 'Reversed = 4321\n', isHidden: false },
      { input: '500\n', expectedOutput: 'Reversed = 5\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Reversed = 0\n', isHidden: true },
      { input: '987654\n', expectedOutput: 'Reversed = 456789\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Reverse integer
    
    return 0;
}`,
  },

  // 7. Sum of Digits
  {
    id: 'loop-code-7',
    topicId: 'looping',
    number: 7,
    title: 'Sum of Digits',
    difficulty: 'easy',
    problemStatement: 'Read a non-negative integer N. Compute the sum of its decimal digits and print "Sum of digits = %d".',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "Sum of digits = %d" followed by a newline.',
    constraints: '0 <= N <= 10^9',
    sampleCases: [
      { input: '1234\n', output: 'Sum of digits = 10\n', explanation: '1+2+3+4 = 10' },
    ],
    testCases: [
      { input: '1234\n', expectedOutput: 'Sum of digits = 10\n', isHidden: false },
      { input: '5\n', expectedOutput: 'Sum of digits = 5\n', isHidden: false },
      { input: '999\n', expectedOutput: 'Sum of digits = 27\n', isHidden: true },
      { input: '0\n', expectedOutput: 'Sum of digits = 0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Sum of digits
    
    return 0;
}`,
  },

  // 8. Right-Angled Asterisk Triangle
  {
    id: 'loop-code-8',
    topicId: 'looping',
    number: 8,
    title: 'Right-Angled Triangle Pattern',
    difficulty: 'easy',
    problemStatement: 'Given integer N, print a right-angled triangle pattern of asterisks with N rows, where row i has i asterisks separated by spaces.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'N lines representing the pattern.',
    constraints: '1 <= N <= 20',
    sampleCases: [
      { input: '3\n', output: '* \n* * \n* * * \n', explanation: '3 rows.' },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '* \n* * \n* * * \n', isHidden: false },
      { input: '1\n', expectedOutput: '* \n', isHidden: false },
      { input: '4\n', expectedOutput: '* \n* * \n* * * \n* * * * \n', isHidden: true },
      { input: '2\n', expectedOutput: '* \n* * \n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Right triangle
    
    return 0;
}`,
  },

  // 9. Countdown Timer
  {
    id: 'loop-code-9',
    topicId: 'looping',
    number: 9,
    title: 'Countdown to Blastoff',
    difficulty: 'easy',
    problemStatement: 'Given a starting countdown integer N, print the numbers from N down to 1 separated by spaces, followed by " BLASTOFF!".',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Print countdown sequence followed by a newline.',
    constraints: '1 <= N <= 100',
    sampleCases: [
      { input: '3\n', output: '3 2 1 BLASTOFF!\n', explanation: 'Countdown.' },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '3 2 1 BLASTOFF!\n', isHidden: false },
      { input: '5\n', expectedOutput: '5 4 3 2 1 BLASTOFF!\n', isHidden: false },
      { input: '1\n', expectedOutput: '1 BLASTOFF!\n', isHidden: true },
      { input: '10\n', expectedOutput: '10 9 8 7 6 5 4 3 2 1 BLASTOFF!\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Countdown loop
    
    return 0;
}`,
  },

  // 10. Check Palindrome Number
  {
    id: 'loop-code-10',
    topicId: 'looping',
    number: 10,
    title: 'Palindrome Number Check',
    difficulty: 'easy',
    problemStatement: 'An integer is a palindrome if it reads the same forwards and backwards. Read non-negative integer N. Print "PALINDROME" if it is, otherwise "NOT PALINDROME".',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Print "PALINDROME" or "NOT PALINDROME" followed by a newline.',
    constraints: '0 <= N <= 10^9',
    sampleCases: [
      { input: '121\n', output: 'PALINDROME\n', explanation: '121 reversed is 121.' },
      { input: '123\n', output: 'NOT PALINDROME\n', explanation: '123 reversed is 321.' },
    ],
    testCases: [
      { input: '121\n', expectedOutput: 'PALINDROME\n', isHidden: false },
      { input: '123\n', expectedOutput: 'NOT PALINDROME\n', isHidden: false },
      { input: '7\n', expectedOutput: 'PALINDROME\n', isHidden: true },
      { input: '1001\n', expectedOutput: 'PALINDROME\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Palindrome check
    
    return 0;
}`,
  },

  // 11. Prime Number Check
  {
    id: 'loop-code-11',
    topicId: 'looping',
    number: 11,
    title: 'Prime Number Validator',
    difficulty: 'medium',
    problemStatement: 'Read an integer N. Determine if N is a prime number (greater than 1 with no divisors other than 1 and itself). Print "PRIME" or "NOT PRIME".',
    inputFormat: 'An integer N.',
    outputFormat: 'Print "PRIME" or "NOT PRIME" followed by a newline.',
    constraints: '0 <= N <= 10^6',
    sampleCases: [
      { input: '7\n', output: 'PRIME\n', explanation: '7 is prime.' },
      { input: '9\n', output: 'NOT PRIME\n', explanation: '9 is divisible by 3.' },
    ],
    testCases: [
      { input: '7\n', expectedOutput: 'PRIME\n', isHidden: false },
      { input: '9\n', expectedOutput: 'NOT PRIME\n', isHidden: false },
      { input: '1\n', expectedOutput: 'NOT PRIME\n', isHidden: true },
      { input: '2\n', expectedOutput: 'PRIME\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Check if prime
    
    return 0;
}`,
  },

  // 12. Fibonacci Sequence (N Terms)
  {
    id: 'loop-code-12',
    topicId: 'looping',
    number: 12,
    title: 'First N Fibonacci Terms',
    difficulty: 'medium',
    problemStatement: 'Given N >= 1, print the first N terms of the Fibonacci sequence starting with 0 and 1 separated by spaces (e.g. for N=5: "0 1 1 2 3").',
    inputFormat: 'A positive integer N.',
    outputFormat: 'N space-separated integers followed by a newline.',
    constraints: '1 <= N <= 30',
    sampleCases: [
      { input: '5\n', output: '0 1 1 2 3\n', explanation: 'First 5 Fibonacci numbers.' },
    ],
    testCases: [
      { input: '5\n', expectedOutput: '0 1 1 2 3\n', isHidden: false },
      { input: '2\n', expectedOutput: '0 1\n', isHidden: false },
      { input: '1\n', expectedOutput: '0\n', isHidden: true },
      { input: '8\n', expectedOutput: '0 1 1 2 3 5 8 13\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Fibonacci sequence
    
    return 0;
}`,
  },

  // 13. GCD (Greatest Common Divisor) using Euclidean Algorithm
  {
    id: 'loop-code-13',
    topicId: 'looping',
    number: 13,
    title: 'GCD via Euclidean Algorithm',
    difficulty: 'medium',
    problemStatement: 'Given two positive integers a and b, compute their Greatest Common Divisor (GCD) using a while loop with the Euclidean remainder algorithm. Print "GCD = %d".',
    inputFormat: 'Two space-separated positive integers a and b.',
    outputFormat: 'Print "GCD = %d" followed by a newline.',
    constraints: '1 <= a, b <= 10^7',
    sampleCases: [
      { input: '48 18\n', output: 'GCD = 6\n', explanation: 'GCD(48, 18) = 6.' },
    ],
    testCases: [
      { input: '48 18\n', expectedOutput: 'GCD = 6\n', isHidden: false },
      { input: '100 25\n', expectedOutput: 'GCD = 25\n', isHidden: false },
      { input: '17 19\n', expectedOutput: 'GCD = 1\n', isHidden: true },
      { input: '144 60\n', expectedOutput: 'GCD = 12\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Euclidean algorithm GCD
    
    return 0;
}`,
  },

  // 14. LCM of Two Numbers
  {
    id: 'loop-code-14',
    topicId: 'looping',
    number: 14,
    title: 'LCM of Two Numbers',
    difficulty: 'medium',
    problemStatement: 'Given two positive integers a and b, compute their Least Common Multiple (LCM) using LCM = (a * b) / GCD(a, b). Print "LCM = %lld".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "LCM = %lld" followed by a newline.',
    constraints: '1 <= a, b <= 10^5',
    sampleCases: [
      { input: '12 18\n', output: 'LCM = 36\n', explanation: 'LCM(12, 18) = 36.' },
    ],
    testCases: [
      { input: '12 18\n', expectedOutput: 'LCM = 36\n', isHidden: false },
      { input: '5 7\n', expectedOutput: 'LCM = 35\n', isHidden: false },
      { input: '10 10\n', expectedOutput: 'LCM = 10\n', isHidden: true },
      { input: '24 36\n', expectedOutput: 'LCM = 72\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Compute LCM
    
    return 0;
}`,
  },

  // 15. Armstrong Number Checker
  {
    id: 'loop-code-15',
    topicId: 'looping',
    number: 15,
    title: 'Armstrong Number Check (3-digit)',
    difficulty: 'medium',
    problemStatement: 'A 3-digit number is an Armstrong number if the sum of the cubes of its digits equals the number itself (e.g. 153 = 1^3 + 5^3 + 3^3). Read a 3-digit number N. Print "ARMSTRONG" or "NOT ARMSTRONG".',
    inputFormat: 'A 3-digit integer N.',
    outputFormat: 'Print "ARMSTRONG" or "NOT ARMSTRONG" followed by a newline.',
    constraints: '100 <= N <= 999',
    sampleCases: [
      { input: '153\n', output: 'ARMSTRONG\n', explanation: '1 + 125 + 27 = 153.' },
      { input: '120\n', output: 'NOT ARMSTRONG\n', explanation: '1 + 8 + 0 = 9 != 120.' },
    ],
    testCases: [
      { input: '153\n', expectedOutput: 'ARMSTRONG\n', isHidden: false },
      { input: '120\n', expectedOutput: 'NOT ARMSTRONG\n', isHidden: false },
      { input: '370\n', expectedOutput: 'ARMSTRONG\n', isHidden: true },
      { input: '407\n', expectedOutput: 'ARMSTRONG\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Armstrong check
    
    return 0;
}`,
  },

  // 16. Inverted Number Triangle
  {
    id: 'loop-code-16',
    topicId: 'looping',
    number: 16,
    title: 'Inverted Number Triangle Pattern',
    difficulty: 'medium',
    problemStatement: 'Given integer N, print an inverted number triangle of N rows. Row i (1 to N) prints numbers from 1 up to (N - i + 1) separated by spaces.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'N lines representing the pattern.',
    constraints: '1 <= N <= 15',
    sampleCases: [
      { input: '3\n', output: '1 2 3 \n1 2 \n1 \n', explanation: 'Inverted triangle.' },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '1 2 3 \n1 2 \n1 \n', isHidden: false },
      { input: '2\n', expectedOutput: '1 2 \n1 \n', isHidden: false },
      { input: '1\n', expectedOutput: '1 \n', isHidden: true },
      { input: '4\n', expectedOutput: '1 2 3 4 \n1 2 3 \n1 2 \n1 \n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Inverted number triangle
    
    return 0;
}`,
  },

  // 17. Floyd's Triangle Pattern
  {
    id: 'loop-code-17',
    topicId: 'looping',
    number: 17,
    title: "Floyd's Triangle",
    difficulty: 'medium',
    problemStatement: "Given N, print Floyd's triangle with N rows using a consecutive counter starting at 1. Numbers within a row are separated by spaces.",
    inputFormat: 'An integer N.',
    outputFormat: 'N lines representing Floyd\'s triangle.',
    constraints: '1 <= N <= 10',
    sampleCases: [
      { input: '3\n', output: '1 \n2 3 \n4 5 6 \n', explanation: "Floyd's triangle 3 rows." },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '1 \n2 3 \n4 5 6 \n', isHidden: false },
      { input: '2\n', expectedOutput: '1 \n2 3 \n', isHidden: false },
      { input: '1\n', expectedOutput: '1 \n', isHidden: true },
      { input: '4\n', expectedOutput: '1 \n2 3 \n4 5 6 \n7 8 9 10 \n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Floyd's triangle
    
    return 0;
}`,
  },

  // 18. Decimal to Binary String Converter
  {
    id: 'loop-code-18',
    topicId: 'looping',
    number: 18,
    title: 'Decimal to Binary Converter',
    difficulty: 'medium',
    problemStatement: 'Read a positive integer N. Print its binary representation without leading zeros followed by a newline.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Binary string followed by a newline.',
    constraints: '1 <= N <= 10^7',
    sampleCases: [
      { input: '13\n', output: '1101\n', explanation: '13 in binary is 1101.' },
    ],
    testCases: [
      { input: '13\n', expectedOutput: '1101\n', isHidden: false },
      { input: '8\n', expectedOutput: '1000\n', isHidden: false },
      { input: '1\n', expectedOutput: '1\n', isHidden: true },
      { input: '255\n', expectedOutput: '11111111\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Decimal to binary
    
    return 0;
}`,
  },

  // 19. Matrix Sum of Diagonal Elements
  {
    id: 'loop-code-19',
    topicId: 'looping',
    number: 19,
    title: 'Square Matrix Trace (Diagonal Sum)',
    difficulty: 'medium',
    problemStatement: 'Given N (size of N x N matrix), followed by N * N integers row by row. Calculate and print the sum of the primary diagonal elements: "Trace = %d".',
    inputFormat: 'First integer N, followed by N*N integers.',
    outputFormat: 'Print "Trace = %d" followed by a newline.',
    constraints: '1 <= N <= 50',
    sampleCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9\n', output: 'Trace = 15\n', explanation: '1 + 5 + 9 = 15.' },
    ],
    testCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9\n', expectedOutput: 'Trace = 15\n', isHidden: false },
      { input: '2\n10 20\n30 40\n', expectedOutput: 'Trace = 50\n', isHidden: false },
      { input: '1\n42\n', expectedOutput: 'Trace = 42\n', isHidden: true },
      { input: '3\n5 0 0\n0 5 0\n0 0 5\n', expectedOutput: 'Trace = 15\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Compute matrix diagonal sum
    
    return 0;
}`,
  },

  // 20. Count Primes in Range [A, B]
  {
    id: 'loop-code-20',
    topicId: 'looping',
    number: 20,
    title: 'Prime Numbers in Range',
    difficulty: 'medium',
    problemStatement: 'Given range boundaries A and B (A <= B), count the total number of prime numbers in the inclusive range [A, B]. Print "Primes count = %d".',
    inputFormat: 'Two space-separated integers A and B.',
    outputFormat: 'Print "Primes count = %d" followed by a newline.',
    constraints: '1 <= A <= B <= 1000',
    sampleCases: [
      { input: '10 20\n', output: 'Primes count = 4\n', explanation: '11, 13, 17, 19 (4 primes).' },
    ],
    testCases: [
      { input: '10 20\n', expectedOutput: 'Primes count = 4\n', isHidden: false },
      { input: '1 10\n', expectedOutput: 'Primes count = 4\n', isHidden: false },
      { input: '20 30\n', expectedOutput: 'Primes count = 2\n', isHidden: true },
      { input: '1 2\n', expectedOutput: 'Primes count = 1\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Count primes in range
    
    return 0;
}`,
  },

  // 21. Diamond Pattern of Asterisks
  {
    id: 'loop-code-21',
    topicId: 'looping',
    number: 21,
    title: 'Centered Diamond Asterisk Pattern',
    difficulty: 'hard',
    problemStatement: 'Given odd integer N (height of diamond), print a symmetrical centered diamond pattern of asterisks. (e.g. for N=5: top half rows 1, 2, 3 have 1, 3, 5 stars; bottom half rows 4, 5 have 3, 1 stars).',
    inputFormat: 'An odd integer N.',
    outputFormat: 'N lines representing the centered diamond.',
    constraints: 'N is an odd integer, 1 <= N <= 15',
    sampleCases: [
      { input: '3\n', output: ' *\n***\n *\n', explanation: 'Diamond of height 3.' },
    ],
    testCases: [
      { input: '3\n', expectedOutput: ' *\n***\n *\n', isHidden: false },
      { input: '1\n', expectedOutput: '*\n', isHidden: false },
      { input: '5\n', expectedOutput: '  *\n ***\n*****\n ***\n  *\n', isHidden: true },
      { input: '7\n', expectedOutput: '   *\n  ***\n *****\n*******\n *****\n  ***\n   *\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Diamond pattern
    
    return 0;
}`,
  },

  // 22. Pascal's Triangle (First N Rows)
  {
    id: 'loop-code-22',
    topicId: 'looping',
    number: 22,
    title: "Pascal's Triangle Generator",
    difficulty: 'hard',
    problemStatement: "Given integer N, print the first N rows of Pascal's triangle. Each row should print its numbers separated by spaces.",
    inputFormat: 'A positive integer N.',
    outputFormat: 'N lines representing Pascal\'s triangle.',
    constraints: '1 <= N <= 12',
    sampleCases: [
      { input: '3\n', output: '1 \n1 1 \n1 2 1 \n', explanation: "Pascal's triangle 3 rows." },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '1 \n1 1 \n1 2 1 \n', isHidden: false },
      { input: '2\n', expectedOutput: '1 \n1 1 \n', isHidden: false },
      { input: '1\n', expectedOutput: '1 \n', isHidden: true },
      { input: '4\n', expectedOutput: '1 \n1 1 \n1 2 1 \n1 3 3 1 \n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Pascal's triangle
    
    return 0;
}`,
  },

  // 23. Hollow Square Pattern
  {
    id: 'loop-code-23',
    topicId: 'looping',
    number: 23,
    title: 'Hollow Square Pattern',
    difficulty: 'hard',
    problemStatement: 'Given integer N >= 2, print a hollow square of size N x N made of asterisks (*). Asterisks border the perimeter, with spaces in the interior.',
    inputFormat: 'An integer N.',
    outputFormat: 'N lines representing the hollow square.',
    constraints: '2 <= N <= 15',
    sampleCases: [
      { input: '3\n', output: '***\n* *\n***\n', explanation: '3x3 hollow square.' },
    ],
    testCases: [
      { input: '3\n', expectedOutput: '***\n* *\n***\n', isHidden: false },
      { input: '2\n', expectedOutput: '**\n**\n', isHidden: false },
      { input: '4\n', expectedOutput: '****\n*  *\n*  *\n****\n', isHidden: true },
      { input: '5\n', expectedOutput: '*****\n*   *\n*   *\n*   *\n*****\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Hollow square pattern
    
    return 0;
}`,
  },

  // 24. Prime Factorization of an Integer
  {
    id: 'loop-code-24',
    topicId: 'looping',
    number: 24,
    title: 'Prime Factorization',
    difficulty: 'hard',
    problemStatement: 'Read an integer N (N >= 2). Print all of its prime factors in ascending order separated by spaces.',
    inputFormat: 'An integer N >= 2.',
    outputFormat: 'Prime factors separated by spaces followed by a newline.',
    constraints: '2 <= N <= 10^7',
    sampleCases: [
      { input: '24\n', output: '2 2 2 3\n', explanation: '24 = 2 * 2 * 2 * 3.' },
    ],
    testCases: [
      { input: '24\n', expectedOutput: '2 2 2 3\n', isHidden: false },
      { input: '13\n', expectedOutput: '13\n', isHidden: false },
      { input: '100\n', expectedOutput: '2 2 5 5\n', isHidden: true },
      { input: '35\n', expectedOutput: '5 7\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Prime factorization loop
    
    return 0;
}`,
  },

  // 25. Spiral Matrix Print (N x N)
  {
    id: 'loop-code-25',
    topicId: 'looping',
    number: 25,
    title: 'Spiral Matrix Element Traversal',
    difficulty: 'hard',
    problemStatement: 'Given N (size of N x N matrix), followed by N * N integers. Traverse and print all matrix elements in clockwise spiral order (top row, right col, bottom row reversed, left col reversed, etc.) on a single line separated by spaces.',
    inputFormat: 'An integer N followed by N*N space-separated integers.',
    outputFormat: 'N*N space-separated integers followed by a newline.',
    constraints: '1 <= N <= 10',
    sampleCases: [
      { input: '2\n1 2\n3 4\n', output: '1 2 4 3\n', explanation: 'Clockwise spiral traversal: 1 -> 2 -> 4 -> 3.' },
    ],
    testCases: [
      { input: '2\n1 2\n3 4\n', expectedOutput: '1 2 4 3\n', isHidden: false },
      { input: '3\n1 2 3\n4 5 6\n7 8 9\n', expectedOutput: '1 2 3 6 9 8 7 4 5\n', isHidden: false },
      { input: '1\n99\n', expectedOutput: '99\n', isHidden: true },
      { input: '3\n9 8 7\n6 5 4\n3 2 1\n', expectedOutput: '9 8 7 4 1 2 3 6 5\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Spiral matrix traversal
    
    return 0;
}`,
  },
];
