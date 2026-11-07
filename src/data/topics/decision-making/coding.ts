import { CodingQuestion } from '../../../types';

export const decisionCodingQuestions: CodingQuestion[] = [
  // 1. Positive, Negative, or Zero
  {
    id: 'dm-code-1',
    topicId: 'decision-making',
    number: 1,
    title: 'Sign Classifier',
    difficulty: 'easy',
    problemStatement: 'Read an integer N. Print "POSITIVE", "NEGATIVE", or "ZERO" based on its sign.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "POSITIVE", "NEGATIVE", or "ZERO" followed by a newline.',
    constraints: '-10^6 <= N <= 10^6',
    sampleCases: [
      { input: '15\n', output: 'POSITIVE\n', explanation: '15 > 0' },
      { input: '-7\n', output: 'NEGATIVE\n', explanation: '-7 < 0' },
    ],
    testCases: [
      { input: '15\n', expectedOutput: 'POSITIVE\n', isHidden: false },
      { input: '-7\n', expectedOutput: 'NEGATIVE\n', isHidden: false },
      { input: '0\n', expectedOutput: 'ZERO\n', isHidden: true },
      { input: '-9999\n', expectedOutput: 'NEGATIVE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Classify sign
    
    return 0;
}`,
  },

  // 2. Voting Eligibility Checker
  {
    id: 'dm-code-2',
    topicId: 'decision-making',
    number: 2,
    title: 'Voting Eligibility',
    difficulty: 'easy',
    problemStatement: 'Given an age integer A, determine if the person is eligible to vote (minimum age 18). Print "ELIGIBLE" if A >= 18, otherwise "NOT ELIGIBLE".',
    inputFormat: 'A non-negative integer A.',
    outputFormat: 'Print "ELIGIBLE" or "NOT ELIGIBLE" followed by a newline.',
    constraints: '0 <= A <= 150',
    sampleCases: [
      { input: '21\n', output: 'ELIGIBLE\n', explanation: '21 >= 18' },
      { input: '16\n', output: 'NOT ELIGIBLE\n', explanation: '16 < 18' },
    ],
    testCases: [
      { input: '21\n', expectedOutput: 'ELIGIBLE\n', isHidden: false },
      { input: '16\n', expectedOutput: 'NOT ELIGIBLE\n', isHidden: false },
      { input: '18\n', expectedOutput: 'ELIGIBLE\n', isHidden: true },
      { input: '0\n', expectedOutput: 'NOT ELIGIBLE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int age;
    // Check eligibility
    
    return 0;
}`,
  },

  // 3. Leap Year Checker
  {
    id: 'dm-code-3',
    topicId: 'decision-making',
    number: 3,
    title: 'Leap Year Validator',
    difficulty: 'easy',
    problemStatement: 'Given a year Y, determine if it is a leap year. A year is a leap year if it is divisible by 4 and (not divisible by 100 OR divisible by 400). Print "LEAP YEAR" or "COMMON YEAR".',
    inputFormat: 'A positive integer Y.',
    outputFormat: 'Print "LEAP YEAR" or "COMMON YEAR" followed by a newline.',
    constraints: '1 <= Y <= 9999',
    sampleCases: [
      { input: '2024\n', output: 'LEAP YEAR\n', explanation: 'Divisible by 4 and not by 100.' },
      { input: '1900\n', output: 'COMMON YEAR\n', explanation: 'Divisible by 100 but not by 400.' },
    ],
    testCases: [
      { input: '2024\n', expectedOutput: 'LEAP YEAR\n', isHidden: false },
      { input: '1900\n', expectedOutput: 'COMMON YEAR\n', isHidden: false },
      { input: '2000\n', expectedOutput: 'LEAP YEAR\n', isHidden: true },
      { input: '2023\n', expectedOutput: 'COMMON YEAR\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int year;
    // Check leap year logic
    
    return 0;
}`,
  },

  // 4. Day of the Week via Switch
  {
    id: 'dm-code-4',
    topicId: 'decision-making',
    number: 4,
    title: 'Day Name from Number',
    difficulty: 'easy',
    problemStatement: 'Read an integer from 1 to 7 representing the day of the week (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday). Print the day name, or "INVALID" if outside 1-7.',
    inputFormat: 'An integer D.',
    outputFormat: 'Print the day name followed by a newline.',
    constraints: '-100 <= D <= 100',
    sampleCases: [
      { input: '1\n', output: 'Monday\n', explanation: '1 is Monday.' },
      { input: '7\n', output: 'Sunday\n', explanation: '7 is Sunday.' },
    ],
    testCases: [
      { input: '1\n', expectedOutput: 'Monday\n', isHidden: false },
      { input: '7\n', expectedOutput: 'Sunday\n', isHidden: false },
      { input: '4\n', expectedOutput: 'Thursday\n', isHidden: true },
      { input: '9\n', expectedOutput: 'INVALID\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int day;
    // Use switch statement
    
    return 0;
}`,
  },

  // 5. Vowel or Consonant
  {
    id: 'dm-code-5',
    topicId: 'decision-making',
    number: 5,
    title: 'Vowel or Consonant Checker',
    difficulty: 'easy',
    problemStatement: 'Read an English alphabet character C. Print "VOWEL" if it is a, e, i, o, u (uppercase or lowercase), or "CONSONANT" otherwise.',
    inputFormat: 'A single English letter [A-Za-z].',
    outputFormat: 'Print "VOWEL" or "CONSONANT" followed by a newline.',
    constraints: 'Input is an alphabetical letter.',
    sampleCases: [
      { input: 'a\n', output: 'VOWEL\n', explanation: 'a is a vowel.' },
      { input: 'Z\n', output: 'CONSONANT\n', explanation: 'Z is a consonant.' },
    ],
    testCases: [
      { input: 'a\n', expectedOutput: 'VOWEL\n', isHidden: false },
      { input: 'Z\n', expectedOutput: 'CONSONANT\n', isHidden: false },
      { input: 'E\n', expectedOutput: 'VOWEL\n', isHidden: true },
      { input: 'b\n', expectedOutput: 'CONSONANT\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Check vowel vs consonant
    
    return 0;
}`,
  },

  // 6. Max of 3 Numbers using if-else
  {
    id: 'dm-code-6',
    topicId: 'decision-making',
    number: 6,
    title: 'Largest of Three Integers',
    difficulty: 'easy',
    problemStatement: 'Given three integers a, b, and c, determine and print the largest value: "Largest = %d".',
    inputFormat: 'Three space-separated integers.',
    outputFormat: 'Print "Largest = %d" followed by a newline.',
    constraints: '-10^6 <= a, b, c <= 10^6',
    sampleCases: [
      { input: '12 45 32\n', output: 'Largest = 45\n', explanation: '45 is the maximum.' },
    ],
    testCases: [
      { input: '12 45 32\n', expectedOutput: 'Largest = 45\n', isHidden: false },
      { input: '-10 -5 -20\n', expectedOutput: 'Largest = -5\n', isHidden: false },
      { input: '100 100 50\n', expectedOutput: 'Largest = 100\n', isHidden: true },
      { input: '0 0 0\n', expectedOutput: 'Largest = 0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    // Find largest
    
    return 0;
}`,
  },

  // 7. Academic Grading Ladder
  {
    id: 'dm-code-7',
    topicId: 'decision-making',
    number: 7,
    title: 'Academic Grade Allocator',
    difficulty: 'easy',
    problemStatement: 'Read a student score (integer 0-100). Print grade: "A" for >=90, "B" for 80-89, "C" for 70-79, "D" for 60-69, "F" for <60.',
    inputFormat: 'An integer score.',
    outputFormat: 'Print the letter grade followed by a newline.',
    constraints: '0 <= score <= 100',
    sampleCases: [
      { input: '95\n', output: 'A\n', explanation: '95 >= 90' },
      { input: '72\n', output: 'C\n', explanation: '72 is between 70 and 79' },
    ],
    testCases: [
      { input: '95\n', expectedOutput: 'A\n', isHidden: false },
      { input: '72\n', expectedOutput: 'C\n', isHidden: false },
      { input: '59\n', expectedOutput: 'F\n', isHidden: true },
      { input: '80\n', expectedOutput: 'B\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int score;
    // Grade ladder
    
    return 0;
}`,
  },

  // 8. Simple Calculator via Switch
  {
    id: 'dm-code-8',
    topicId: 'decision-making',
    number: 8,
    title: 'Four-Function Switch Calculator',
    difficulty: 'easy',
    problemStatement: 'Read an operator (+, -, *, /) and two integers a and b. Print the result of the operation. For division, print integer quotient. If operator is invalid, print "INVALID".',
    inputFormat: 'A character op and two integers a b.',
    outputFormat: 'Print the computed result or "INVALID" followed by a newline.',
    constraints: '-10^4 <= a, b <= 10^4, b != 0 for division',
    sampleCases: [
      { input: '+ 15 25\n', output: '40\n', explanation: '15 + 25 = 40' },
      { input: '* 6 7\n', output: '42\n', explanation: '6 * 7 = 42' },
    ],
    testCases: [
      { input: '+ 15 25\n', expectedOutput: '40\n', isHidden: false },
      { input: '* 6 7\n', expectedOutput: '42\n', isHidden: false },
      { input: '/ 20 4\n', expectedOutput: '5\n', isHidden: true },
      { input: '% 10 2\n', expectedOutput: 'INVALID\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char op;
    int a, b;
    // Switch on op
    
    return 0;
}`,
  },

  // 9. Quadrant Determination
  {
    id: 'dm-code-9',
    topicId: 'decision-making',
    number: 9,
    title: 'Cartesian Quadrant Locator',
    difficulty: 'easy',
    problemStatement: 'Given non-zero coordinates X and Y, determine its quadrant: "Quadrant 1" (X>0, Y>0), "Quadrant 2" (X<0, Y>0), "Quadrant 3" (X<0, Y<0), or "Quadrant 4" (X>0, Y<0).',
    inputFormat: 'Two non-zero integers X and Y.',
    outputFormat: 'Print the quadrant string followed by a newline.',
    constraints: '-1000 <= X, Y <= 1000, X != 0, Y != 0',
    sampleCases: [
      { input: '4 5\n', output: 'Quadrant 1\n', explanation: 'Both positive.' },
      { input: '-3 8\n', output: 'Quadrant 2\n', explanation: 'X negative, Y positive.' },
    ],
    testCases: [
      { input: '4 5\n', expectedOutput: 'Quadrant 1\n', isHidden: false },
      { input: '-3 8\n', expectedOutput: 'Quadrant 2\n', isHidden: false },
      { input: '-2 -4\n', expectedOutput: 'Quadrant 3\n', isHidden: true },
      { input: '5 -1\n', expectedOutput: 'Quadrant 4\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int x, y;
    // Quadrant logic
    
    return 0;
}`,
  },

  // 10. Triangle Validity by Angles
  {
    id: 'dm-code-10',
    topicId: 'decision-making',
    number: 10,
    title: 'Triangle Angle Validator',
    difficulty: 'easy',
    problemStatement: 'Read three angle measurements in degrees (positive integers). Check if they form a valid Euclidean triangle (each angle > 0 and sum == 180). Print "VALID" or "INVALID".',
    inputFormat: 'Three space-separated integers a, b, c.',
    outputFormat: 'Print "VALID" or "INVALID" followed by a newline.',
    constraints: '0 <= a, b, c <= 360',
    sampleCases: [
      { input: '60 60 60\n', output: 'VALID\n', explanation: 'Sum is 180.' },
      { input: '90 90 20\n', output: 'INVALID\n', explanation: 'Sum is 200.' },
    ],
    testCases: [
      { input: '60 60 60\n', expectedOutput: 'VALID\n', isHidden: false },
      { input: '90 90 20\n', expectedOutput: 'INVALID\n', isHidden: false },
      { input: '45 45 90\n', expectedOutput: 'VALID\n', isHidden: true },
      { input: '0 90 90\n', expectedOutput: 'INVALID\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    // Validate angles
    
    return 0;
}`,
  },

  // 11. Triangle Classification by Sides
  {
    id: 'dm-code-11',
    topicId: 'decision-making',
    number: 11,
    title: 'Triangle Type Classifier',
    difficulty: 'medium',
    problemStatement: 'Given 3 positive integers a, b, and c that satisfy triangle inequality, classify the triangle as: "EQUILATERAL" (all 3 sides equal), "ISOSCELES" (exactly 2 sides equal), or "SCALENE" (all 3 sides different).',
    inputFormat: 'Three positive integers a b c.',
    outputFormat: 'Print "EQUILATERAL", "ISOSCELES", or "SCALENE" followed by a newline.',
    constraints: '1 <= a, b, c <= 10^5',
    sampleCases: [
      { input: '5 5 5\n', output: 'EQUILATERAL\n', explanation: 'All sides equal.' },
      { input: '5 5 8\n', output: 'ISOSCELES\n', explanation: 'Two sides equal.' },
    ],
    testCases: [
      { input: '5 5 5\n', expectedOutput: 'EQUILATERAL\n', isHidden: false },
      { input: '5 5 8\n', expectedOutput: 'ISOSCELES\n', isHidden: false },
      { input: '3 4 5\n', expectedOutput: 'SCALENE\n', isHidden: true },
      { input: '7 9 7\n', expectedOutput: 'ISOSCELES\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    // Classify sides
    
    return 0;
}`,
  },

  // 12. Quadratic Equation Roots
  {
    id: 'dm-code-12',
    topicId: 'decision-making',
    number: 12,
    title: 'Quadratic Nature of Roots',
    difficulty: 'medium',
    problemStatement: 'Given coefficients a, b, and c of quadratic equation ax^2 + bx + c = 0 (a != 0), compute discriminant D = b^2 - 4ac. Print "REAL AND DISTINCT" if D > 0, "REAL AND EQUAL" if D == 0, or "COMPLEX" if D < 0.',
    inputFormat: 'Three space-separated floats a b c.',
    outputFormat: 'Print the nature of roots followed by a newline.',
    constraints: '-1000 <= a, b, c <= 1000, a != 0',
    sampleCases: [
      { input: '1 -5 6\n', output: 'REAL AND DISTINCT\n', explanation: 'D = 25 - 24 = 1 > 0' },
      { input: '1 -4 4\n', output: 'REAL AND EQUAL\n', explanation: 'D = 16 - 16 = 0' },
    ],
    testCases: [
      { input: '1 -5 6\n', expectedOutput: 'REAL AND DISTINCT\n', isHidden: false },
      { input: '1 -4 4\n', expectedOutput: 'REAL AND EQUAL\n', isHidden: false },
      { input: '1 2 5\n', expectedOutput: 'COMPLEX\n', isHidden: true },
      { input: '2 4 2\n', expectedOutput: 'REAL AND EQUAL\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float a, b, c;
    // Calculate discriminant b*b - 4*a*c
    
    return 0;
}`,
  },

  // 13. Month Days Counter via Switch
  {
    id: 'dm-code-13',
    topicId: 'decision-making',
    number: 13,
    title: 'Days in a Month',
    difficulty: 'medium',
    problemStatement: 'Given month M (1-12) and year Y, print the number of days in that month. For February (month 2), consider leap years (29 days for leap, 28 for common). Print "Days = %d".',
    inputFormat: 'Two space-separated integers M and Y.',
    outputFormat: 'Print "Days = %d" followed by a newline.',
    constraints: '1 <= M <= 12, 1 <= Y <= 9999',
    sampleCases: [
      { input: '2 2024\n', output: 'Days = 29\n', explanation: '2024 is leap year.' },
      { input: '4 2023\n', output: 'Days = 30\n', explanation: 'April has 30 days.' },
    ],
    testCases: [
      { input: '2 2024\n', expectedOutput: 'Days = 29\n', isHidden: false },
      { input: '4 2023\n', expectedOutput: 'Days = 30\n', isHidden: false },
      { input: '2 1900\n', expectedOutput: 'Days = 28\n', isHidden: true },
      { input: '12 2026\n', expectedOutput: 'Days = 31\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int m, y;
    // Days in month
    
    return 0;
}`,
  },

  // 14. Electricity Surcharge Tier Calculation
  {
    id: 'dm-code-14',
    topicId: 'decision-making',
    number: 14,
    title: 'Electricity Bill Tier Calculator',
    difficulty: 'medium',
    problemStatement: 'Given power units consumed U (integer):\n- First 100 units at $1.50/unit\n- Next 100 units (101-200) at $2.00/unit\n- Above 200 units at $3.00/unit\nCalculate and print total bill: "Bill = $%.2f".',
    inputFormat: 'A non-negative integer U.',
    outputFormat: 'Print "Bill = $%.2f" followed by a newline.',
    constraints: '0 <= U <= 10000',
    sampleCases: [
      { input: '150\n', output: 'Bill = $250.00\n', explanation: '100*1.5 + 50*2.0 = 150 + 100 = 250.' },
    ],
    testCases: [
      { input: '150\n', expectedOutput: 'Bill = $250.00\n', isHidden: false },
      { input: '50\n', expectedOutput: 'Bill = $75.00\n', isHidden: false },
      { input: '250\n', expectedOutput: 'Bill = $500.00\n', isHidden: true },
      { input: '0\n', expectedOutput: 'Bill = $0.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int u;
    // Tiered calculation
    
    return 0;
}`,
  },

  // 15. Character Category Classifier
  {
    id: 'dm-code-15',
    topicId: 'decision-making',
    number: 15,
    title: 'Character Classification',
    difficulty: 'medium',
    problemStatement: 'Read a single character C. Classify it as: "UPPERCASE" ([A-Z]), "LOWERCASE" ([a-z]), "DIGIT" ([0-9]), or "SPECIAL" (all others).',
    inputFormat: 'A single character.',
    outputFormat: 'Print the classification followed by a newline.',
    constraints: 'Any printable ASCII character.',
    sampleCases: [
      { input: 'G\n', output: 'UPPERCASE\n', explanation: 'Capital letter.' },
      { input: '7\n', output: 'DIGIT\n', explanation: 'Numeric digit.' },
    ],
    testCases: [
      { input: 'G\n', expectedOutput: 'UPPERCASE\n', isHidden: false },
      { input: '7\n', expectedOutput: 'DIGIT\n', isHidden: false },
      { input: 'k\n', expectedOutput: 'LOWERCASE\n', isHidden: true },
      { input: '@\n', expectedOutput: 'SPECIAL\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Classify character
    
    return 0;
}`,
  },

  // 16. Profit or Loss Calculator
  {
    id: 'dm-code-16',
    topicId: 'decision-making',
    number: 16,
    title: 'Profit or Loss Margin',
    difficulty: 'medium',
    problemStatement: 'Given Cost Price CP and Selling Price SP (floats), determine outcome. If SP > CP, print "PROFIT = %.2f". If CP > SP, print "LOSS = %.2f". If SP == CP, print "NO PROFIT NO LOSS".',
    inputFormat: 'Two space-separated floats CP and SP.',
    outputFormat: 'Print outcome message followed by a newline.',
    constraints: '0 <= CP, SP <= 10^7',
    sampleCases: [
      { input: '100.0 125.5\n', output: 'PROFIT = 25.50\n', explanation: 'SP > CP.' },
      { input: '50.0 40.0\n', output: 'LOSS = 10.00\n', explanation: 'CP > SP.' },
    ],
    testCases: [
      { input: '100.0 125.5\n', expectedOutput: 'PROFIT = 25.50\n', isHidden: false },
      { input: '50.0 40.0\n', expectedOutput: 'LOSS = 10.00\n', isHidden: false },
      { input: '200.0 200.0\n', expectedOutput: 'NO PROFIT NO LOSS\n', isHidden: true },
      { input: '0.0 5.0\n', expectedOutput: 'PROFIT = 5.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float cp, sp;
    // Profit or loss
    
    return 0;
}`,
  },

  // 17. Valid Date Verification
  {
    id: 'dm-code-17',
    topicId: 'decision-making',
    number: 17,
    title: 'Calendar Date Validator',
    difficulty: 'medium',
    problemStatement: 'Given Day D, Month M, and Year Y (1-9999), verify if it is a valid calendar date. Print "VALID DATE" or "INVALID DATE".',
    inputFormat: 'Three space-separated integers D M Y.',
    outputFormat: 'Print "VALID DATE" or "INVALID DATE" followed by a newline.',
    constraints: '1 <= D <= 31, 1 <= M <= 12, 1 <= Y <= 9999',
    sampleCases: [
      { input: '29 2 2024\n', output: 'VALID DATE\n', explanation: '2024 is a leap year, so Feb 29 is valid.' },
      { input: '31 4 2023\n', output: 'INVALID DATE\n', explanation: 'April has only 30 days.' },
    ],
    testCases: [
      { input: '29 2 2024\n', expectedOutput: 'VALID DATE\n', isHidden: false },
      { input: '31 4 2023\n', expectedOutput: 'INVALID DATE\n', isHidden: false },
      { input: '29 2 2023\n', expectedOutput: 'INVALID DATE\n', isHidden: true },
      { input: '31 12 2025\n', expectedOutput: 'VALID DATE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int d, m, y;
    // Validate calendar date
    
    return 0;
}`,
  },

  // 18. ATM Cash Withdrawal Machine
  {
    id: 'dm-code-18',
    topicId: 'decision-making',
    number: 18,
    title: 'ATM Withdrawal Validator',
    difficulty: 'medium',
    problemStatement: 'Pooja wants to withdraw X cash from an ATM. The cash machine only accepts transactions if X is a multiple of 5, and her account balance B has enough cash to perform the transaction including a $0.50 bank surcharge. Print remaining balance formatted to 2 decimals: "Balance = %.2f" or "TRANSACTION FAILED".',
    inputFormat: 'An integer X and float B.',
    outputFormat: 'Print balance or failure message followed by a newline.',
    constraints: '1 <= X <= 2000, 0.0 <= B <= 2000.0',
    sampleCases: [
      { input: '30 120.00\n', output: 'Balance = 89.50\n', explanation: '120 - 30 - 0.50 = 89.50.' },
      { input: '42 100.00\n', output: 'TRANSACTION FAILED\n', explanation: '42 is not multiple of 5.' },
    ],
    testCases: [
      { input: '30 120.00\n', expectedOutput: 'Balance = 89.50\n', isHidden: false },
      { input: '42 100.00\n', expectedOutput: 'TRANSACTION FAILED\n', isHidden: false },
      { input: '100 100.00\n', expectedOutput: 'TRANSACTION FAILED\n', isHidden: true },
      { input: '50 50.50\n', expectedOutput: 'Balance = 0.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int x;
    float b;
    // ATM transaction check
    
    return 0;
}`,
  },

  // 19. Median of Three Numbers
  {
    id: 'dm-code-19',
    topicId: 'decision-making',
    number: 19,
    title: 'Middle (Median) of Three Values',
    difficulty: 'medium',
    problemStatement: 'Given three distinct integers a, b, and c, determine the middle value (neither the maximum nor the minimum). Print "Median = %d".',
    inputFormat: 'Three space-separated distinct integers.',
    outputFormat: 'Print "Median = %d" followed by a newline.',
    constraints: '-10^6 <= a, b, c <= 10^6',
    sampleCases: [
      { input: '10 30 20\n', output: 'Median = 20\n', explanation: '20 is between 10 and 30.' },
    ],
    testCases: [
      { input: '10 30 20\n', expectedOutput: 'Median = 20\n', isHidden: false },
      { input: '-5 0 5\n', expectedOutput: 'Median = 0\n', isHidden: false },
      { input: '100 50 75\n', expectedOutput: 'Median = 75\n', isHidden: true },
      { input: '1 2 3\n', expectedOutput: 'Median = 2\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    // Find median value
    
    return 0;
}`,
  },

  // 20. BMI Category Classifier
  {
    id: 'dm-code-20',
    topicId: 'decision-making',
    number: 20,
    title: 'Body Mass Index (BMI) Classifier',
    difficulty: 'medium',
    problemStatement: 'Given weight W (in kg, float) and height H (in meters, float), calculate BMI = W / (H * H). Classify as: "Underweight" (BMI < 18.5), "Normal" (18.5 <= BMI < 25.0), "Overweight" (25.0 <= BMI < 30.0), or "Obese" (BMI >= 30.0). Print "BMI = %.1f (%s)".',
    inputFormat: 'Two floats: W H.',
    outputFormat: 'Print "BMI = %.1f (%s)" followed by a newline.',
    constraints: '10.0 <= W <= 300.0, 0.5 <= H <= 2.5',
    sampleCases: [
      { input: '70.0 1.75\n', output: 'BMI = 22.9 (Normal)\n', explanation: '70 / (1.75^2) = 22.86 -> 22.9' },
    ],
    testCases: [
      { input: '70.0 1.75\n', expectedOutput: 'BMI = 22.9 (Normal)\n', isHidden: false },
      { input: '50.0 1.80\n', expectedOutput: 'BMI = 15.4 (Underweight)\n', isHidden: false },
      { input: '85.0 1.70\n', expectedOutput: 'BMI = 29.4 (Overweight)\n', isHidden: true },
      { input: '110.0 1.75\n', expectedOutput: 'BMI = 35.9 (Obese)\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float w, h;
    // Compute BMI and category
    
    return 0;
}`,
  },

  // 21. Roman Numeral Converter (1 to 10)
  {
    id: 'dm-code-21',
    topicId: 'decision-making',
    number: 21,
    title: 'Roman Numeral Translator (1-10)',
    difficulty: 'hard',
    problemStatement: 'Read an integer N between 1 and 10. Print its Roman numeral string using a switch statement ("I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"). If outside 1-10, print "OUT OF RANGE".',
    inputFormat: 'An integer N.',
    outputFormat: 'Print the Roman numeral followed by a newline.',
    constraints: '-100 <= N <= 100',
    sampleCases: [
      { input: '4\n', output: 'IV\n', explanation: '4 is IV.' },
      { input: '9\n', output: 'IX\n', explanation: '9 is IX.' },
    ],
    testCases: [
      { input: '4\n', expectedOutput: 'IV\n', isHidden: false },
      { input: '9\n', expectedOutput: 'IX\n', isHidden: false },
      { input: '1\n', expectedOutput: 'I\n', isHidden: true },
      { input: '12\n', expectedOutput: 'OUT OF RANGE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Switch for Roman numerals
    
    return 0;
}`,
  },

  // 22. Next Day Date Calculator
  {
    id: 'dm-code-22',
    topicId: 'decision-making',
    number: 22,
    title: 'Calculate Next Calendar Day',
    difficulty: 'hard',
    problemStatement: 'Given a valid date D M Y, compute and print the calendar date of the immediate next day in format "Next: %02d-%02d-%04d". Handle month-ends, year-ends, and leap years.',
    inputFormat: 'Three space-separated integers D M Y.',
    outputFormat: 'Print "Next: %02d-%02d-%04d" followed by a newline.',
    constraints: '1 <= D <= 31, 1 <= M <= 12, 1900 <= Y <= 2100',
    sampleCases: [
      { input: '31 12 2024\n', output: 'Next: 01-01-2025\n', explanation: 'New year transition.' },
      { input: '28 2 2024\n', output: 'Next: 29-02-2024\n', explanation: '2024 is leap year.' },
    ],
    testCases: [
      { input: '31 12 2024\n', expectedOutput: 'Next: 01-01-2025\n', isHidden: false },
      { input: '28 2 2024\n', expectedOutput: 'Next: 29-02-2024\n', isHidden: false },
      { input: '28 2 2023\n', expectedOutput: 'Next: 01-03-2023\n', isHidden: true },
      { input: '15 8 2026\n', expectedOutput: 'Next: 16-08-2026\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int d, m, y;
    // Next day logic
    
    return 0;
}`,
  },

  // 23. Income Tax Slab Calculator
  {
    id: 'dm-code-23',
    topicId: 'decision-making',
    number: 23,
    title: 'Progressive Income Tax Slab',
    difficulty: 'hard',
    problemStatement: 'Given annual income I (float):\n- Up to $250,000: 0% tax\n- $250,001 to $500,000: 5% on amount over $250,000\n- $500,001 to $1,000,000: $12,500 + 20% on amount over $500,000\n- Above $1,000,000: $112,500 + 30% on amount over $1,000,000\nPrint "Tax = $%.2f".',
    inputFormat: 'A non-negative float income I.',
    outputFormat: 'Print "Tax = $%.2f" followed by a newline.',
    constraints: '0 <= I <= 10^8',
    sampleCases: [
      { input: '600000\n', output: 'Tax = $32500.00\n', explanation: '12500 + 0.20*(100000) = 32500' },
    ],
    testCases: [
      { input: '600000\n', expectedOutput: 'Tax = $32500.00\n', isHidden: false },
      { input: '200000\n', expectedOutput: 'Tax = $0.00\n', isHidden: false },
      { input: '400000\n', expectedOutput: 'Tax = $7500.00\n', isHidden: true },
      { input: '1200000\n', expectedOutput: 'Tax = $172500.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float income;
    // Progressive tax brackets
    
    return 0;
}`,
  },

  // 24. Point Relative to Circle
  {
    id: 'dm-code-24',
    topicId: 'decision-making',
    number: 24,
    title: 'Point Inside, On, or Outside Circle',
    difficulty: 'hard',
    problemStatement: 'A circle has center (CX, CY) and radius R. Given query point (PX, PY), determine whether it lies "INSIDE", "ON", or "OUTSIDE" the circle using distance squared comparison ((PX-CX)^2 + (PY-CY)^2 vs R^2).',
    inputFormat: 'Five space-separated floats: CX CY R PX PY (R > 0).',
    outputFormat: 'Print "INSIDE", "ON", or "OUTSIDE" followed by a newline.',
    constraints: '-1000 <= CX, CY, PX, PY <= 1000, 0 < R <= 1000',
    sampleCases: [
      { input: '0 0 5 3 4\n', output: 'ON\n', explanation: '3^2 + 4^2 = 25 == 5^2' },
      { input: '0 0 5 1 2\n', output: 'INSIDE\n', explanation: '1 + 4 = 5 < 25' },
    ],
    testCases: [
      { input: '0 0 5 3 4\n', expectedOutput: 'ON\n', isHidden: false },
      { input: '0 0 5 1 2\n', expectedOutput: 'INSIDE\n', isHidden: false },
      { input: '0 0 5 6 0\n', expectedOutput: 'OUTSIDE\n', isHidden: true },
      { input: '2 3 10 2 3\n', expectedOutput: 'INSIDE\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float cx, cy, r, px, py;
    // Squared distance check
    
    return 0;
}`,
  },

  // 25. Intersection of Two 1D Intervals
  {
    id: 'dm-code-25',
    topicId: 'decision-making',
    number: 25,
    title: '1D Interval Overlap',
    difficulty: 'hard',
    problemStatement: 'Given two intervals [L1, R1] and [L2, R2] on the real number line (L1 <= R1, L2 <= R2), determine their intersection. If they overlap, print "Intersection: [%d, %d]". If they do not intersect, print "NO OVERLAP".',
    inputFormat: 'Four space-separated integers L1 R1 L2 R2.',
    outputFormat: 'Print intersection format or "NO OVERLAP" followed by a newline.',
    constraints: '-10000 <= L, R <= 10000',
    sampleCases: [
      { input: '1 5 3 8\n', output: 'Intersection: [3, 5]\n', explanation: 'Overlap from 3 to 5.' },
      { input: '1 3 5 8\n', output: 'NO OVERLAP\n', explanation: 'No common points.' },
    ],
    testCases: [
      { input: '1 5 3 8\n', expectedOutput: 'Intersection: [3, 5]\n', isHidden: false },
      { input: '1 3 5 8\n', expectedOutput: 'NO OVERLAP\n', isHidden: false },
      { input: '2 6 4 5\n', expectedOutput: 'Intersection: [4, 5]\n', isHidden: true },
      { input: '5 10 1 4\n', expectedOutput: 'NO OVERLAP\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int l1, r1, l2, r2;
    // Overlap: max(l1, l2) to min(r1, r2)
    
    return 0;
}`,
  },
];
