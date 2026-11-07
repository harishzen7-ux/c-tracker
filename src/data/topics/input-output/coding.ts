import { CodingQuestion } from '../../../types';

export const inputOutputCodingQuestions: CodingQuestion[] = [
  // 1. Hello World
  {
    id: 'io-code-1',
    topicId: 'input-output',
    number: 1,
    title: 'Hello, World!',
    difficulty: 'easy',
    problemStatement: 'Write a C program that prints the exact message "Hello, World!" followed by a newline.',
    inputFormat: 'No input.',
    outputFormat: 'Print "Hello, World!" followed by a newline.',
    constraints: 'Print the exact message shown in the problem.',
    sampleCases: [
      { input: '', output: 'Hello, World!\n', explanation: 'Direct string printing via printf or puts.' },
    ],
    testCases: [
      { input: '', expectedOutput: 'Hello, World!\n', isHidden: false },
      { input: 'extra_input\n', expectedOutput: 'Hello, World!\n', isHidden: true },
      { input: '\n', expectedOutput: 'Hello, World!\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`,
    solutionReference: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },

  // 2. Read and Echo Integer
  {
    id: 'io-code-2',
    topicId: 'input-output',
    number: 2,
    title: 'Echo Integer',
    difficulty: 'easy',
    problemStatement: 'Read an integer from standard input and print "The number is: X" where X is the entered integer.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "The number is: N" followed by a newline.',
    constraints: '-10^6 <= N <= 10^6',
    sampleCases: [
      { input: '42\n', output: 'The number is: 42\n', explanation: 'Read 42 using scanf and print with printf.' },
      { input: '-7\n', output: 'The number is: -7\n', explanation: 'Negative numbers are printed with minus sign.' },
    ],
    testCases: [
      { input: '42\n', expectedOutput: 'The number is: 42\n', isHidden: false },
      { input: '-7\n', expectedOutput: 'The number is: -7\n', isHidden: false },
      { input: '0\n', expectedOutput: 'The number is: 0\n', isHidden: true },
      { input: '999999\n', expectedOutput: 'The number is: 999999\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Read n and print in required format
    
    return 0;
}`,
  },

  // 3. Sum of Two Integers
  {
    id: 'io-code-3',
    topicId: 'input-output',
    number: 3,
    title: 'Sum of Two Numbers',
    difficulty: 'easy',
    problemStatement: 'Given two integers a and b, compute and print their sum in the format: "Sum = X".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "Sum = X" followed by a newline.',
    constraints: '-10^5 <= a, b <= 10^5',
    sampleCases: [
      { input: '15 25\n', output: 'Sum = 40\n', explanation: '15 + 25 = 40' },
      { input: '-10 10\n', output: 'Sum = 0\n', explanation: '-10 + 10 = 0' },
    ],
    testCases: [
      { input: '15 25\n', expectedOutput: 'Sum = 40\n', isHidden: false },
      { input: '-10 10\n', expectedOutput: 'Sum = 0\n', isHidden: false },
      { input: '100 250\n', expectedOutput: 'Sum = 350\n', isHidden: true },
      { input: '-50 -50\n', expectedOutput: 'Sum = -100\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Read two integers and print their sum
    
    return 0;
}`,
  },

  // 4. Floating Point Precision
  {
    id: 'io-code-4',
    topicId: 'input-output',
    number: 4,
    title: 'Float Average Formatter',
    difficulty: 'easy',
    problemStatement: 'Given two floating-point numbers, calculate their average and print it rounded to exactly 2 decimal places.',
    inputFormat: 'Two space-separated floating-point numbers x and y.',
    outputFormat: 'Print "Average = %.2f" followed by a newline.',
    constraints: '-10^4 <= x, y <= 10^4',
    sampleCases: [
      { input: '4.5 5.5\n', output: 'Average = 5.00\n', explanation: '(4.5 + 5.5) / 2 = 5.00' },
      { input: '10.0 20.5\n', output: 'Average = 15.25\n', explanation: '(10.0 + 20.5) / 2 = 15.25' },
    ],
    testCases: [
      { input: '4.5 5.5\n', expectedOutput: 'Average = 5.00\n', isHidden: false },
      { input: '10.0 20.5\n', expectedOutput: 'Average = 15.25\n', isHidden: false },
      { input: '3.1415 2.7182\n', expectedOutput: 'Average = 2.93\n', isHidden: true },
      { input: '0.0 0.0\n', expectedOutput: 'Average = 0.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float x, y;
    // Calculate and print average with 2 decimal precision
    
    return 0;
}`,
  },

  // 5. Character & ASCII Echo
  {
    id: 'io-code-5',
    topicId: 'input-output',
    number: 5,
    title: 'Character and ASCII Code',
    difficulty: 'easy',
    problemStatement: 'Read a single character from stdin and print both the character and its decimal ASCII representation in the format: "Char: C, ASCII: N".',
    inputFormat: 'A single non-whitespace character C.',
    outputFormat: 'Print "Char: C, ASCII: N" followed by a newline.',
    constraints: 'Printable ASCII characters (33 to 126).',
    sampleCases: [
      { input: 'A\n', output: 'Char: A, ASCII: 65\n', explanation: 'Uppercase A has ASCII 65.' },
      { input: 'z\n', output: 'Char: z, ASCII: 122\n', explanation: 'Lowercase z has ASCII 122.' },
    ],
    testCases: [
      { input: 'A\n', expectedOutput: 'Char: A, ASCII: 65\n', isHidden: false },
      { input: 'z\n', expectedOutput: 'Char: z, ASCII: 122\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Char: 0, ASCII: 48\n', isHidden: true },
      { input: '#\n', expectedOutput: 'Char: #, ASCII: 35\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Read character and output character and ASCII value
    
    return 0;
}`,
  },

  // 6. Hex and Octal Representation
  {
    id: 'io-code-6',
    topicId: 'input-output',
    number: 6,
    title: 'Decimal to Hex and Octal',
    difficulty: 'easy',
    problemStatement: 'Given a non-negative decimal integer N, print its representation in Decimal, Hexadecimal (uppercase, prefixed with 0x), and Octal (prefixed with 0) separated by commas: "Dec: %d, Hex: 0x%X, Oct: 0%o".',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "Dec: %d, Hex: 0x%X, Oct: 0%o" followed by a newline.',
    constraints: '0 <= N <= 100000',
    sampleCases: [
      { input: '255\n', output: 'Dec: 255, Hex: 0xFF, Oct: 0377\n', explanation: '255 in hex is FF, in octal is 377.' },
      { input: '16\n', output: 'Dec: 16, Hex: 0x10, Oct: 020\n', explanation: '16 in hex is 10, in octal is 20.' },
    ],
    testCases: [
      { input: '255\n', expectedOutput: 'Dec: 255, Hex: 0xFF, Oct: 0377\n', isHidden: false },
      { input: '16\n', expectedOutput: 'Dec: 16, Hex: 0x10, Oct: 020\n', isHidden: false },
      { input: '0\n', expectedOutput: 'Dec: 0, Hex: 0x0, Oct: 00\n', isHidden: true },
      { input: '1024\n', expectedOutput: 'Dec: 1024, Hex: 0x400, Oct: 02000\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Format in Decimal, Hex and Octal
    
    return 0;
}`,
  },

  // 7. Width Padded Table Row
  {
    id: 'io-code-7',
    topicId: 'input-output',
    number: 7,
    title: 'Formatted Table Entry',
    difficulty: 'easy',
    problemStatement: 'Read an ID (integer) and Score (float). Print a formatted table entry enclosed in bars where ID is right-aligned in width 6, and Score is right-aligned in width 8 with 2 decimal places: "|%6d|%8.2f|".',
    inputFormat: 'An integer ID and a float Score on a single line.',
    outputFormat: 'Print "|%6d|%8.2f|" followed by a newline.',
    constraints: '1 <= ID <= 999999, 0.0 <= Score <= 100.0',
    sampleCases: [
      { input: '101 88.5\n', output: '|   101|   88.50|\n', explanation: 'ID 101 padded to 6 chars, score 88.50 padded to 8 chars.' },
    ],
    testCases: [
      { input: '101 88.5\n', expectedOutput: '|   101|   88.50|\n', isHidden: false },
      { input: '12 99.99\n', expectedOutput: '|    12|   99.99|\n', isHidden: false },
      { input: '1 5.0\n', expectedOutput: '|     1|    5.00|\n', isHidden: true },
      { input: '999999 100.0\n', expectedOutput: '|999999|  100.00|\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int id;
    float score;
    // Read and format with field widths
    
    return 0;
}`,
  },

  // 8. Swap Two Numbers
  {
    id: 'io-code-8',
    topicId: 'input-output',
    number: 8,
    title: 'Swap Two Variables',
    difficulty: 'easy',
    problemStatement: 'Read two integers a and b. Swap their values and print them in the format: "After swap: a = X, b = Y".',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Print "After swap: a = X, b = Y" followed by a newline.',
    constraints: '-10^5 <= a, b <= 10^5',
    sampleCases: [
      { input: '5 9\n', output: 'After swap: a = 9, b = 5\n', explanation: 'Swapped values.' },
    ],
    testCases: [
      { input: '5 9\n', expectedOutput: 'After swap: a = 9, b = 5\n', isHidden: false },
      { input: '100 -20\n', expectedOutput: 'After swap: a = -20, b = 100\n', isHidden: false },
      { input: '0 0\n', expectedOutput: 'After swap: a = 0, b = 0\n', isHidden: true },
      { input: '7 7\n', expectedOutput: 'After swap: a = 7, b = 7\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Swap and print
    
    return 0;
}`,
  },

  // 9. Celsius to Fahrenheit
  {
    id: 'io-code-9',
    topicId: 'input-output',
    number: 9,
    title: 'Temperature Conversion',
    difficulty: 'easy',
    problemStatement: 'Convert a temperature in Celsius (float) to Fahrenheit using the formula F = (C * 9/5) + 32. Print the result formatted to 1 decimal place: "Fahrenheit = %.1f".',
    inputFormat: 'A float C.',
    outputFormat: 'Print "Fahrenheit = %.1f" followed by a newline.',
    constraints: '-100.0 <= C <= 200.0',
    sampleCases: [
      { input: '0.0\n', output: 'Fahrenheit = 32.0\n', explanation: '0 C = 32.0 F' },
      { input: '100.0\n', output: 'Fahrenheit = 212.0\n', explanation: '100 C = 212.0 F' },
    ],
    testCases: [
      { input: '0.0\n', expectedOutput: 'Fahrenheit = 32.0\n', isHidden: false },
      { input: '100.0\n', expectedOutput: 'Fahrenheit = 212.0\n', isHidden: false },
      { input: '37.0\n', expectedOutput: 'Fahrenheit = 98.6\n', isHidden: true },
      { input: '-40.0\n', expectedOutput: 'Fahrenheit = -40.0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float c;
    // Read celsius and print fahrenheit
    
    return 0;
}`,
  },

  // 10. Simple Interest Calculator
  {
    id: 'io-code-10',
    topicId: 'input-output',
    number: 10,
    title: 'Simple Interest',
    difficulty: 'easy',
    problemStatement: 'Given Principal P (float), Rate of interest R (float per annum), and Time T (float in years), calculate the Simple Interest SI = (P * R * T) / 100. Print "Interest = %.2f".',
    inputFormat: 'Three space-separated floats: P R T.',
    outputFormat: 'Print "Interest = %.2f" followed by a newline.',
    constraints: '0 <= P <= 10^7, 0 <= R <= 100, 0 <= T <= 50',
    sampleCases: [
      { input: '1000 5 2\n', output: 'Interest = 100.00\n', explanation: '(1000 * 5 * 2) / 100 = 100.00' },
    ],
    testCases: [
      { input: '1000 5 2\n', expectedOutput: 'Interest = 100.00\n', isHidden: false },
      { input: '5000 7.5 3\n', expectedOutput: 'Interest = 1125.00\n', isHidden: false },
      { input: '2500 4.2 1.5\n', expectedOutput: 'Interest = 157.50\n', isHidden: true },
      { input: '0 10 5\n', expectedOutput: 'Interest = 0.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float p, r, t;
    // Calculate simple interest
    
    return 0;
}`,
  },

  // 11. Circle Dimensions
  {
    id: 'io-code-11',
    topicId: 'input-output',
    number: 11,
    title: 'Circle Area and Circumference',
    difficulty: 'medium',
    problemStatement: 'Given radius r (float), calculate Area = 3.14159 * r * r and Circumference = 2 * 3.14159 * r. Print in format: "Area = %.2f, Circumference = %.2f".',
    inputFormat: 'A single positive float r.',
    outputFormat: 'Print "Area = %.2f, Circumference = %.2f" followed by a newline.',
    constraints: '0 < r <= 1000.0',
    sampleCases: [
      { input: '5.0\n', output: 'Area = 78.54, Circumference = 31.42\n', explanation: 'Area = 3.14159 * 25 = 78.54' },
    ],
    testCases: [
      { input: '5.0\n', expectedOutput: 'Area = 78.54, Circumference = 31.42\n', isHidden: false },
      { input: '1.0\n', expectedOutput: 'Area = 3.14, Circumference = 6.28\n', isHidden: false },
      { input: '10.5\n', expectedOutput: 'Area = 346.36, Circumference = 65.97\n', isHidden: true },
      { input: '2.5\n', expectedOutput: 'Area = 19.63, Circumference = 15.71\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float r;
    // Area and circumference with 3.14159
    
    return 0;
}`,
  },

  // 12. ASCII Case Toggle
  {
    id: 'io-code-12',
    topicId: 'input-output',
    number: 12,
    title: 'Toggle Single Character Case',
    difficulty: 'medium',
    problemStatement: 'Read a single English alphabet letter. If it is lowercase, convert to uppercase. If it is uppercase, convert to lowercase. Print "Toggled: C".',
    inputFormat: 'A single character.',
    outputFormat: 'Print "Toggled: C" followed by a newline.',
    constraints: 'Input is an uppercase or lowercase English letter [A-Za-z].',
    sampleCases: [
      { input: 'a\n', output: 'Toggled: A\n', explanation: 'Lowercase a becomes uppercase A.' },
      { input: 'G\n', output: 'Toggled: g\n', explanation: 'Uppercase G becomes lowercase g.' },
    ],
    testCases: [
      { input: 'a\n', expectedOutput: 'Toggled: A\n', isHidden: false },
      { input: 'G\n', expectedOutput: 'Toggled: g\n', isHidden: false },
      { input: 'z\n', expectedOutput: 'Toggled: Z\n', isHidden: true },
      { input: 'M\n', expectedOutput: 'Toggled: m\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char ch;
    // Read and toggle case using ASCII manipulation
    
    return 0;
}`,
  },

  // 13. Days to Years Weeks Days
  {
    id: 'io-code-13',
    topicId: 'input-output',
    number: 13,
    title: 'Days Breakdown',
    difficulty: 'medium',
    problemStatement: 'Given total number of days D (assume 1 year = 365 days, 1 week = 7 days), convert into years, weeks, and remaining days. Print: "Years: Y, Weeks: W, Days: D".',
    inputFormat: 'A non-negative integer D.',
    outputFormat: 'Print "Years: Y, Weeks: W, Days: D" followed by a newline.',
    constraints: '0 <= D <= 100000',
    sampleCases: [
      { input: '375\n', output: 'Years: 1, Weeks: 1, Days: 3\n', explanation: '375 = 1 year (365) + 1 week (7) + 3 days.' },
    ],
    testCases: [
      { input: '375\n', expectedOutput: 'Years: 1, Weeks: 1, Days: 3\n', isHidden: false },
      { input: '14\n', expectedOutput: 'Years: 0, Weeks: 2, Days: 0\n', isHidden: false },
      { input: '730\n', expectedOutput: 'Years: 2, Weeks: 0, Days: 0\n', isHidden: true },
      { input: '5\n', expectedOutput: 'Years: 0, Weeks: 0, Days: 5\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int totalDays;
    // Calculate years, weeks, and remaining days
    
    return 0;
}`,
  },

  // 14. Zero Padded Digital Clock
  {
    id: 'io-code-14',
    topicId: 'input-output',
    number: 14,
    title: 'Digital Time Formatter',
    difficulty: 'medium',
    problemStatement: 'Read three integers representing hours, minutes, and seconds. Print them formatted as a 24-hour digital clock with leading zeros: "Time: %02d:%02d:%02d".',
    inputFormat: 'Three space-separated integers h m s.',
    outputFormat: 'Print "Time: %02d:%02d:%02d" followed by a newline.',
    constraints: '0 <= h <= 23, 0 <= m <= 59, 0 <= s <= 59',
    sampleCases: [
      { input: '9 5 3\n', output: 'Time: 09:05:03\n', explanation: 'Single digit values are zero padded to 2 columns.' },
      { input: '14 30 0\n', output: 'Time: 14:30:00\n', explanation: 'Double digits remain intact.' },
    ],
    testCases: [
      { input: '9 5 3\n', expectedOutput: 'Time: 09:05:03\n', isHidden: false },
      { input: '14 30 0\n', expectedOutput: 'Time: 14:30:00\n', isHidden: false },
      { input: '0 0 0\n', expectedOutput: 'Time: 00:00:00\n', isHidden: true },
      { input: '23 59 59\n', expectedOutput: 'Time: 23:59:59\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int h, m, s;
    // Format digital clock
    
    return 0;
}`,
  },

  // 15. Reverse 3-digit number
  {
    id: 'io-code-15',
    topicId: 'input-output',
    number: 15,
    title: 'Reverse a 3-Digit Integer',
    difficulty: 'medium',
    problemStatement: 'Read a positive 3-digit integer N. Compute its reversed number arithmetically and print "Reversed = X". (e.g. 123 -> 321, 570 -> 75).',
    inputFormat: 'A single 3-digit integer N.',
    outputFormat: 'Print "Reversed = X" followed by a newline.',
    constraints: '100 <= N <= 999',
    sampleCases: [
      { input: '123\n', output: 'Reversed = 321\n', explanation: 'Digits 1, 2, 3 reversed is 321.' },
      { input: '570\n', output: 'Reversed = 75\n', explanation: 'Digits 5, 7, 0 reversed is 075 = 75.' },
    ],
    testCases: [
      { input: '123\n', expectedOutput: 'Reversed = 321\n', isHidden: false },
      { input: '570\n', expectedOutput: 'Reversed = 75\n', isHidden: false },
      { input: '900\n', expectedOutput: 'Reversed = 9\n', isHidden: true },
      { input: '456\n', expectedOutput: 'Reversed = 654\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    // Extract digits and print reversed number
    
    return 0;
}`,
  },

  // 16. Right-Aligned Bill Receipt
  {
    id: 'io-code-16',
    topicId: 'input-output',
    number: 16,
    title: 'Item Receipt Line Formatter',
    difficulty: 'medium',
    problemStatement: 'Read an item name (one word string), quantity (int), and price per unit (float). Calculate total = quantity * price. Print the line formatted with item left-aligned in width 12, quantity right-aligned in width 5, and total right-aligned in width 10 with 2 decimal places: "%-12s %5d %10.2f".',
    inputFormat: 'A string item, integer qty, and float price.',
    outputFormat: 'Print "%-12s %5d %10.2f" followed by a newline.',
    constraints: 'Item length <= 12, qty >= 1, price >= 0.0',
    sampleCases: [
      { input: 'Pen 10 2.5\n', output: 'Pen             10      25.00\n', explanation: 'Pen in 12 cols, 10 in 5 cols, 25.00 in 10 cols.' },
    ],
    testCases: [
      { input: 'Pen 10 2.5\n', expectedOutput: 'Pen             10      25.00\n', isHidden: false },
      { input: 'Notebook 3 15.75\n', expectedOutput: 'Notebook         3      47.25\n', isHidden: false },
      { input: 'Eraser 1 0.50\n', expectedOutput: 'Eraser           1       0.50\n', isHidden: true },
      { input: 'Desk 2 120.00\n', expectedOutput: 'Desk             2     240.00\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char item[20];
    int qty;
    float price;
    // Format receipt line
    
    return 0;
}`,
  },

  // 17. Distance between two 2D points
  {
    id: 'io-code-17',
    topicId: 'input-output',
    number: 17,
    title: 'Euclidean Distance in 2D',
    difficulty: 'medium',
    problemStatement: 'Given coordinates of two points (x1, y1) and (x2, y2) as floats, compute Euclidean distance sqrt((x2-x1)^2 + (y2-y1)^2) and print "Distance = %.3f".',
    inputFormat: 'Four space-separated floats: x1 y1 x2 y2.',
    outputFormat: 'Print "Distance = %.3f" followed by a newline.',
    constraints: '-1000.0 <= x, y <= 1000.0',
    sampleCases: [
      { input: '0.0 0.0 3.0 4.0\n', output: 'Distance = 5.000\n', explanation: '3-4-5 right triangle.' },
    ],
    testCases: [
      { input: '0.0 0.0 3.0 4.0\n', expectedOutput: 'Distance = 5.000\n', isHidden: false },
      { input: '1.0 2.0 4.0 6.0\n', expectedOutput: 'Distance = 5.000\n', isHidden: false },
      { input: '0.0 0.0 1.0 1.0\n', expectedOutput: 'Distance = 1.414\n', isHidden: true },
      { input: '-2.0 -3.0 2.0 0.0\n', expectedOutput: 'Distance = 5.000\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>
#include <math.h>

int main() {
    float x1, y1, x2, y2;
    // Calculate distance with math.h sqrt
    
    return 0;
}`,
  },

  // 18. Metric Length Units Conversion
  {
    id: 'io-code-18',
    topicId: 'input-output',
    number: 18,
    title: 'Meter Units Conversion',
    difficulty: 'medium',
    problemStatement: 'Read a length in meters (float). Print its equivalent in Kilometers (%.4f) and Centimeters (%.1f) formatted as: "KM = %.4f, CM = %.1f".',
    inputFormat: 'A positive float meters.',
    outputFormat: 'Print "KM = %.4f, CM = %.1f" followed by a newline.',
    constraints: '0 <= meters <= 10^6',
    sampleCases: [
      { input: '1500.5\n', output: 'KM = 1.5005, CM = 150050.0\n', explanation: '1500.5 / 1000 = 1.5005 KM, 1500.5 * 100 = 150050.0 CM' },
    ],
    testCases: [
      { input: '1500.5\n', expectedOutput: 'KM = 1.5005, CM = 150050.0\n', isHidden: false },
      { input: '100.0\n', expectedOutput: 'KM = 0.1000, CM = 10000.0\n', isHidden: false },
      { input: '5.25\n', expectedOutput: 'KM = 0.0053, CM = 525.0\n', isHidden: true },
      { input: '0.0\n', expectedOutput: 'KM = 0.0000, CM = 0.0\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    float m;
    // Compute KM and CM
    
    return 0;
}`,
  },

  // 19. Total Seconds to HH:MM:SS
  {
    id: 'io-code-19',
    topicId: 'input-output',
    number: 19,
    title: 'Seconds to Time Breakdown',
    difficulty: 'medium',
    problemStatement: 'Given an integer total seconds S, convert it into hours H, minutes M, and seconds SEC. Print formatted as: "%d hour(s), %d minute(s), %d second(s)".',
    inputFormat: 'A non-negative integer S.',
    outputFormat: 'Print "%d hour(s), %d minute(s), %d second(s)" followed by a newline.',
    constraints: '0 <= S <= 864000',
    sampleCases: [
      { input: '3665\n', output: '1 hour(s), 1 minute(s), 5 second(s)\n', explanation: '3600 sec = 1 hr, 60 sec = 1 min, 5 sec remaining.' },
    ],
    testCases: [
      { input: '3665\n', expectedOutput: '1 hour(s), 1 minute(s), 5 second(s)\n', isHidden: false },
      { input: '60\n', expectedOutput: '0 hour(s), 1 minute(s), 0 second(s)\n', isHidden: false },
      { input: '7200\n', expectedOutput: '2 hour(s), 0 minute(s), 0 second(s)\n', isHidden: true },
      { input: '0\n', expectedOutput: '0 hour(s), 0 minute(s), 0 second(s)\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int totalSec;
    // Convert to hours, minutes, seconds
    
    return 0;
}`,
  },

  // 20. Count Characters in Sentence
  {
    id: 'io-code-20',
    topicId: 'input-output',
    number: 20,
    title: 'Count Line Length Using getchar',
    difficulty: 'medium',
    problemStatement: 'Read a line of characters using getchar() until newline \'\\n\' or EOF. Count the total number of characters (excluding the trailing newline) and print: "Length = %d".',
    inputFormat: 'A single line of text.',
    outputFormat: 'Print "Length = %d" followed by a newline.',
    constraints: 'Length <= 1000',
    sampleCases: [
      { input: 'Hello World\n', output: 'Length = 11\n', explanation: '"Hello World" has 11 characters.' },
    ],
    testCases: [
      { input: 'Hello World\n', expectedOutput: 'Length = 11\n', isHidden: false },
      { input: 'C99\n', expectedOutput: 'Length = 3\n', isHidden: false },
      { input: '   \n', expectedOutput: 'Length = 3\n', isHidden: true },
      { input: 'Data Structures and Algorithms in C\n', expectedOutput: 'Length = 35\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int count = 0;
    int ch;
    // Read with getchar() until '\\n' or EOF
    
    return 0;
}`,
  },

  // 21. Scanf Return Count Validation
  {
    id: 'io-code-21',
    topicId: 'input-output',
    number: 21,
    title: 'Input Field Validator',
    difficulty: 'hard',
    problemStatement: 'Try to read an integer and a float from standard input using scanf("%d %f", &a, &b). If both are successfully read (return value == 2), print "Valid: int = %d, float = %.2f". If only 1 was read, print "Partial Input". If 0 read or EOF, print "Invalid Input".',
    inputFormat: 'Any input stream token.',
    outputFormat: 'Print validation status message followed by a newline.',
    constraints: 'Input may be numbers or text strings.',
    sampleCases: [
      { input: '10 3.14\n', output: 'Valid: int = 10, float = 3.14\n', explanation: 'Both items validly read.' },
      { input: '10 abc\n', output: 'Partial Input\n', explanation: 'Int read successfully, float failed.' },
    ],
    testCases: [
      { input: '10 3.14\n', expectedOutput: 'Valid: int = 10, float = 3.14\n', isHidden: false },
      { input: '10 abc\n', expectedOutput: 'Partial Input\n', explanation: 'Partial input', isHidden: false },
      { input: 'xyz 5.5\n', expectedOutput: 'Invalid Input\n', isHidden: true },
      { input: '-45 0.50\n', expectedOutput: 'Valid: int = -45, float = 0.50\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int a;
    float b;
    // Check scanf return value
    
    return 0;
}`,
  },

  // 22. Parse Key-Value String
  {
    id: 'io-code-22',
    topicId: 'input-output',
    number: 22,
    title: 'Parse Key-Value Pair',
    difficulty: 'hard',
    problemStatement: 'Read an input formatted strictly as "KEY:VALUE" where KEY is an alphabetic word and VALUE is an integer (e.g. "PORT:8080"). Use scanf with format scansets or sscanf to extract them and print: "Parsed key \'%s\' with value %d".',
    inputFormat: 'A string of the form "KEY:VALUE".',
    outputFormat: 'Print "Parsed key \'%s\' with value %d" followed by a newline.',
    constraints: 'KEY contains only letters [A-Za-z] with length <= 20, VALUE is an integer.',
    sampleCases: [
      { input: 'PORT:8080\n', output: "Parsed key 'PORT' with value 8080\n", explanation: 'Extracted PORT and 8080.' },
    ],
    testCases: [
      { input: 'PORT:8080\n', expectedOutput: "Parsed key 'PORT' with value 8080\n", isHidden: false },
      { input: 'TIMEOUT:30\n', expectedOutput: "Parsed key 'TIMEOUT' with value 30\n", isHidden: false },
      { input: 'UID:1001\n', expectedOutput: "Parsed key 'UID' with value 1001\n", isHidden: true },
      { input: 'RETRIES:3\n', expectedOutput: "Parsed key 'RETRIES' with value 3\n", isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    char key[32];
    int val;
    // Parse KEY:VALUE format
    
    return 0;
}`,
  },

  // 23. Date String Formatter
  {
    id: 'io-code-23',
    topicId: 'input-output',
    number: 23,
    title: 'Standard Date Formatter',
    difficulty: 'hard',
    problemStatement: 'Read a date formatted with slash separators: "DD/MM/YYYY". Extract day, month, and year, and print the date in ISO-like hyphen format with 2 digits for day/month and 4 digits for year: "Date: %02d-%02d-%04d".',
    inputFormat: 'A date string in format "DD/MM/YYYY".',
    outputFormat: 'Print "Date: %02d-%02d-%04d" followed by a newline.',
    constraints: '1 <= DD <= 31, 1 <= MM <= 12, 1900 <= YYYY <= 2100',
    sampleCases: [
      { input: '5/7/2026\n', output: 'Date: 05-07-2026\n', explanation: 'Padded to 05-07-2026.' },
    ],
    testCases: [
      { input: '5/7/2026\n', expectedOutput: 'Date: 05-07-2026\n', isHidden: false },
      { input: '25/12/2024\n', expectedOutput: 'Date: 25-12-2024\n', isHidden: false },
      { input: '1/1/2000\n', expectedOutput: 'Date: 01-01-2000\n', isHidden: true },
      { input: '31/8/1995\n', expectedOutput: 'Date: 31-08-1995\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    int d, m, y;
    // Read DD/MM/YYYY and format with hyphens and leading zeros
    
    return 0;
}`,
  },

  // 24. Variable Precision Floating Point Display
  {
    id: 'io-code-24',
    topicId: 'input-output',
    number: 24,
    title: 'Dynamic Precision Output',
    difficulty: 'hard',
    problemStatement: 'Read a double floating-point number X and an integer precision P. Use the printf variable precision argument * to print X rounded to exactly P decimal places: "Value = %.*lf".',
    inputFormat: 'A double X and an integer P (0 <= P <= 6).',
    outputFormat: 'Print "Value = %.*lf" followed by a newline.',
    constraints: '-1000.0 <= X <= 1000.0, 0 <= P <= 6',
    sampleCases: [
      { input: '3.14159265 3\n', output: 'Value = 3.142\n', explanation: 'Formatted to 3 decimal places.' },
      { input: '45.6789 1\n', output: 'Value = 45.7\n', explanation: 'Formatted to 1 decimal place.' },
    ],
    testCases: [
      { input: '3.14159265 3\n', expectedOutput: 'Value = 3.142\n', isHidden: false },
      { input: '45.6789 1\n', expectedOutput: 'Value = 45.7\n', isHidden: false },
      { input: '12.0000 0\n', expectedOutput: 'Value = 12\n', isHidden: true },
      { input: '9.876543 5\n', expectedOutput: 'Value = 9.87654\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    double x;
    int p;
    // Print using dynamic precision %.*lf
    
    return 0;
}`,
  },

  // 25. Number to Word Digit Stream
  {
    id: 'io-code-25',
    topicId: 'input-output',
    number: 25,
    title: 'Digit Stream to Words',
    difficulty: 'hard',
    problemStatement: 'Read a sequence of single numeric digits from standard input until a non-digit or newline is met. For each digit (0 to 9), print its English name separated by spaces ("Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"). Print a newline at the end.',
    inputFormat: 'A string of digits.',
    outputFormat: 'Print the space-separated word representation followed by a newline.',
    constraints: '1 to 20 digits.',
    sampleCases: [
      { input: '104\n', output: 'One Zero Four\n', explanation: '1 -> One, 0 -> Zero, 4 -> Four.' },
    ],
    testCases: [
      { input: '104\n', expectedOutput: 'One Zero Four\n', isHidden: false },
      { input: '9\n', expectedOutput: 'Nine\n', isHidden: false },
      { input: '258\n', expectedOutput: 'Two Five Eight\n', isHidden: true },
      { input: '007\n', expectedOutput: 'Zero Zero Seven\n', isHidden: true },
    ],
    starterCode: `#include <stdio.h>

int main() {
    const char *words[] = {"Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
    // Read digits with getchar and print corresponding words
    
    return 0;
}`,
  },
];
