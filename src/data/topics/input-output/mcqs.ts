import { MCQ } from '../../../types';

export const inputOutputMCQs: MCQ[] = [
  // ================= EASY (20 QUESTIONS) =================
  {
    id: 'io-mcq-1',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the return value of printf("Hello, World!\\n")?',
    codeSnippet: `#include <stdio.h>
int main() {
    int res = printf("Hello, World!\\n");
    return 0;
}`,
    options: ['13', '14', '0', '1'],
    correctIndex: 1,
    explanation: '"Hello, World!\\n" has 13 visible characters plus 1 newline character (\\n counts as 1 character in C strings). Total characters printed = 14.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-2',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'Which format specifier is required to print a signed 32-bit integer in standard decimal format?',
    options: ['%f', '%d', '%c', '%s'],
    correctIndex: 1,
    explanation: '%d (or %i) is the standard format specifier for signed decimal integers in C.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-3',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What does the & operator signify when used in scanf("%d", &num)?',
    options: ['Bitwise AND operation', 'Memory address of variable num', 'Pointer dereference', 'Logical AND assertion'],
    correctIndex: 1,
    explanation: 'In scanf, arguments for non-pointer types require memory addresses so scanf can store the parsed data directly into the variable.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-4',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the output of the following C code?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("100%% Success");
    return 0;
}`,
    options: ['100% Success', '100%% Success', 'Compilation error', '100 Success'],
    correctIndex: 0,
    explanation: 'In printf format strings, %% is the escape sequence used to print a literal % character.',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-5',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'Which header file must be included to use printf() and scanf() in standard C?',
    options: ['<stdlib.h>', '<conio.h>', '<stdio.h>', '<string.h>'],
    correctIndex: 2,
    explanation: '<stdio.h> defines standard I/O functions including printf, scanf, getchar, putchar, and fgets.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-6',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What does puts("Hello") do that fputs("Hello", stdout) does not do?',
    options: ['puts automatically appends a newline (\\n)', 'puts flushes stdin', 'puts converts lowercase to uppercase', 'puts returns void'],
    correctIndex: 0,
    explanation: 'puts() automatically appends a trailing newline (\\n) to the stream, whereas fputs() outputs exactly what is provided without appending a newline.',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-7',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the return type of the standard C function getchar()?',
    options: ['char', 'int', 'void', 'unsigned char'],
    correctIndex: 1,
    explanation: 'getchar() returns an int so that it can return any valid unsigned char value as well as EOF (which is defined as a negative integer, typically -1).',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-8',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    char ch = 'A';
    printf("%d", ch);
    return 0;
}`,
    options: ['A', '65', 'Garbage value', '0'],
    correctIndex: 1,
    explanation: 'Characters in C are stored as integer ASCII values. The ASCII code for uppercase \'A\' is 65.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-9',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    float val = 5.5f;
    printf("%.2f", val);
    return 0;
}`,
    options: ['5.5', '5.50', '5.500', '5'],
    correctIndex: 1,
    explanation: '%.2f specifies floating-point formatting with exactly 2 digits after the decimal point, zero-padding to "5.50".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-10',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'Which escape sequence represents the horizontal tab in C?',
    options: ['\\a', '\\t', '\\v', '\\b'],
    correctIndex: 1,
    explanation: '\\t inserts a horizontal tab spacing (typically 8 column boundary alignment).',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-11',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the format specifier for printing unsigned decimal integers?',
    options: ['%d', '%i', '%u', '%x'],
    correctIndex: 2,
    explanation: '%u is used for unsigned decimal integers.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-12',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'Why was gets() removed from the ISO C11 standard?',
    options: [
      'It was too slow',
      'It cannot prevent buffer overflow because it does not accept buffer size',
      'It only accepted ASCII characters',
      'It required dynamic memory allocation'
    ],
    correctIndex: 1,
    explanation: 'gets() cannot check the destination buffer size, making applications vulnerable to buffer overflows and memory corruption attacks. fgets() replaced it.',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-13',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What does the function putchar(\'X\') do?',
    options: ['Reads character \'X\' from stdin', 'Writes character \'X\' to stdout', 'Stores \'X\' in a file', 'Deletes \'X\' from terminal'],
    correctIndex: 1,
    explanation: 'putchar(int c) writes the specified character to stdout.',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-14',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the output of printf("%s", "C\\0Programming"); ?',
    options: ['C Programming', 'C', 'C0Programming', 'Compilation error'],
    correctIndex: 1,
    explanation: 'Strings in C are null-terminated. When printf reaches \'\\0\', it considers the string finished and stops immediately, printing only "C".',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-15',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'Which format specifier prints an integer in hexadecimal using lowercase letters (a-f)?',
    options: ['%h', '%x', '%X', '%p'],
    correctIndex: 1,
    explanation: '%x formats integers in hexadecimal with lowercase letters, while %X uses uppercase.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-16',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What is the escape sequence for an audible alert (bell sound) in C?',
    options: ['\\b', '\\a', '\\e', '\\r'],
    correctIndex: 1,
    explanation: '\\a represents alert (bell), which causes an audio beep or visual flash on supported terminals.',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-17',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What will be the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 25;
    printf("%5d", x);
    return 0;
}`,
    options: [
      '25 preceded by 3 spaces',
      '25 followed by 3 spaces',
      '00025',
      'Error: width must match variable digits'
    ],
    correctIndex: 0,
    explanation: '%5d specifies a minimum field width of 5 characters, right-aligned by default. Since 25 takes 2 characters, 3 spaces precede it.',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-18',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'When reading a string into a char array using scanf("%s", str), is the & required?',
    options: [
      'Yes, always required',
      'No, because the array name decays to a pointer to its first element',
      'Only if the string length > 10',
      'Only in C99, not in C89'
    ],
    correctIndex: 1,
    explanation: 'In C, an array name decays to a pointer to its first element (&str[0]) when passed as an argument, so no & is needed.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-19',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What does the escape sequence \\r do in terminal output?',
    options: [
      'Advances cursor to the next line',
      'Moves the cursor to the beginning of the current line (Carriage Return)',
      'Clears the terminal screen',
      'Reverses the text direction'
    ],
    correctIndex: 1,
    explanation: '\\r is Carriage Return; it repositions the cursor to column 0 of the current line without advancing downward.',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-20',
    topicId: 'input-output',
    difficulty: 'easy',
    question: 'What does scanf() return if it encounters End-of-File before any conversion?',
    options: ['0', 'NULL', 'EOF (typically -1)', '1'],
    correctIndex: 2,
    explanation: 'When end-of-file is reached or a read error occurs before any matching items, scanf returns EOF (usually -1).',
    subtopic: 'printf and scanf',
  },

  // ================= MEDIUM (20 QUESTIONS) =================
  {
    id: 'io-mcq-21',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the output of the following C code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 10, b = 20;
    int n = printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d", n);
    return 0;
}`,
    options: ['10 + 20 = 30\\n11', '10 + 20 = 30\\n12', '10 + 20 = 30\\n13', '10 + 20 = 30\\n14'],
    correctIndex: 2,
    explanation: '"10 + 20 = 30\\n" contains: "10" (2) + " + " (3) + "20" (2) + " = " (3) + "30" (2) + "\\n" (1) = 13 characters. printf returns 13.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-22',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x;
    // User types: 42abc into stdin
    int count = scanf("%d", &x);
    printf("%d %d", x, count);
    return 0;
}`,
    options: ['42 1', '0 0', '42 0', 'Compilation error'],
    correctIndex: 0,
    explanation: 'scanf("%d", ...) reads as many valid decimal digits as possible (42), stops at non-digit \'a\', and leaves "abc" in the buffer. It successfully assigned 1 variable, returning 1.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-23',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%05d", 42);
    return 0;
}`,
    options: ['   42', '00042', '42000', '0042'],
    correctIndex: 1,
    explanation: 'The 0 flag pads the field with leading zeros up to the minimum width of 5: "00042".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-24',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the result of executing this code?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%+d and %+d", 15, -15);
    return 0;
}`,
    options: ['15 and -15', '+15 and -15', '+15 and +-15', '15 and +15'],
    correctIndex: 1,
    explanation: 'The + flag forces a plus sign for positive numbers while preserving the minus sign for negative numbers: "+15 and -15".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-25',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    char str[] = "SanFrancisco";
    printf("%.5s", str);
    return 0;
}`,
    options: ['SanFrancisco', 'SanFr', 'SanF', 'Error: precision only applies to floats'],
    correctIndex: 1,
    explanation: 'For strings (%s), precision specifies the maximum number of characters to print. "SanFrancisco" truncated to 5 characters is "SanFr".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-26',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be printed when running this program?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%-6d!", 7);
    return 0;
}`,
    options: ['     7!', '7     !', '000007!', '-67!'],
    correctIndex: 1,
    explanation: 'The minus (-) flag left-aligns the output within the width of 6 columns: "7     !", where 7 is followed by 5 spaces.',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-27',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'Why does scanf("%[^\n]", str) succeed where scanf("%s", str) fails when reading full names?',
    options: [
      'It dynamically allocates heap memory',
      '%[^\n] is a scanset matching any character except newline \\n',
      'It automatically checks buffer bounds',
      'It encrypts string input'
    ],
    correctIndex: 1,
    explanation: '%[^\n] defines a scanset that continues reading until a newline is encountered, allowing spaces within the string.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-28',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 012;
    printf("%d", x);
    return 0;
}`,
    options: ['12', '10', '012', 'Compilation error'],
    correctIndex: 1,
    explanation: 'In C, an integer literal prefixed with leading 0 is parsed in octal (base 8). 012 in octal is (1*8) + (2*1) = 10 in decimal.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-29',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What happens in scanf when reading a double with %f instead of %lf?',
    codeSnippet: `#include <stdio.h>
int main() {
    double d;
    scanf("%f", &d);
    return 0;
}`,
    options: [
      'Works identically to %lf',
      'Undefined behavior: scanf writes only 4 bytes (float) into an 8-byte double',
      'Automatic promotion to double',
      'Compiler syntax error'
    ],
    correctIndex: 1,
    explanation: 'In scanf, %f expects float* (4 bytes), while double is 8 bytes. This causes undefined behavior and data corruption. %lf must be used for double in scanf.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-30',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be output by the following snippet?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 1, b = 2, c = 3;
    printf("%*d", 5, 42);
    return 0;
}`,
    options: ['*42', '   42', '5 42', 'Compilation error'],
    correctIndex: 1,
    explanation: 'In printf, an asterisk * for width means the field width is passed as an integer argument prior to the value. %*d with args (5, 42) formats 42 in a width of 5.',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-31',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the problem with calling fflush(stdin) in standard portable C?',
    options: [
      'It deletes the standard input file permanently',
      'According to ISO C standard, fflush is only defined for output streams; fflush(stdin) produces undefined behavior',
      'It requires root / administrator privileges',
      'It always throws a segmentation fault'
    ],
    correctIndex: 1,
    explanation: 'ISO C standard (C99 §7.19.5.2) specifies that fflush is only defined for output streams. Using it on input streams is non-standard and undefined behavior.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-32',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What does the format specifier %p expect as its corresponding argument?',
    options: ['int', 'char *', 'void *', 'unsigned long long'],
    correctIndex: 2,
    explanation: '%p expects a pointer converted to void* and prints an implementation-defined address representation.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-33',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be the output of this code?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%c", 70);
    return 0;
}`,
    options: ['70', 'F', 'f', 'G'],
    correctIndex: 1,
    explanation: '70 is the ASCII integer code for the character \'F\'. With %c, it formats and displays \'F\'.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-34',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 0x1A;
    printf("%d", a);
    return 0;
}`,
    options: ['1A', '26', '16', '0x1A'],
    correctIndex: 1,
    explanation: '0x1A is hexadecimal: (1 * 16) + 10 = 26 in decimal.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-35',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What does the following format specifier in scanf accomplish: scanf("%*d %d", &y); ?',
    options: [
      'Reads a multiplication expression',
      'Reads an integer and suppresses its assignment, then reads the second integer into y',
      'Reads y multiplied by the first integer',
      'Syntax error in scanf'
    ],
    correctIndex: 1,
    explanation: 'In scanf, the asterisk * is an assignment-suppression character: it parses the data but does not store it in any variable.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-36',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 5;
    printf("%d %d %d", x, x++, ++x);
    return 0;
}`,
    options: [
      '5 5 7',
      '7 6 7',
      'Undefined behavior (order of evaluation of arguments in printf is unsequenced)',
      '5 6 7'
    ],
    correctIndex: 2,
    explanation: 'Modifying a variable multiple times or reading and modifying it without a sequence point in function arguments is undefined behavior in C99.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-37',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the effect of a leading space in scanf(" %c", &ch); ?',
    options: [
      'Requires the user to type a literal space character',
      'Directs scanf to skip any leading whitespace (spaces, tabs, newlines) before reading the character',
      'Prints a space before reading',
      'Forces input from stdout'
    ],
    correctIndex: 1,
    explanation: 'A whitespace character in a scanf format string instructs it to consume and discard any amount of whitespace until the first non-whitespace character.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-38',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What is the output of the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%#x", 255);
    return 0;
}`,
    options: ['ff', '0xff', '#ff', 'FF'],
    correctIndex: 1,
    explanation: 'The # flag with %x generates the alternative form by prefixing non-zero hexadecimal numbers with "0x": "0xff".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-39',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What does fgets() do if the input line is longer than the specified buffer size n?',
    options: [
      'Crashes the application',
      'Reads n - 1 characters, appends \'\\0\', and leaves remaining characters in stdin buffer',
      'Discards the entire line',
      'Automatically resizes the buffer'
    ],
    correctIndex: 1,
    explanation: 'fgets reads up to n-1 characters, guarantees null-termination by appending \'\\0\', and leaves the rest of the stream in stdin for future read operations.',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-40',
    topicId: 'input-output',
    difficulty: 'medium',
    question: 'What will be output by printf("%.0f", 3.5); under default rounding?',
    options: ['3', '4', '3.5', '0'],
    correctIndex: 1,
    explanation: '%.0f rounds floating point numbers to 0 decimal places. 3.5 rounds up to 4.',
    subtopic: 'Width & Precision Formatting',
  },

  // ================= HARD (10 QUESTIONS) =================
  {
    id: 'io-mcq-41',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the exact output of the following nested printf expression?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("%d", printf("%d", printf("C99")));
    return 0;
}`,
    options: ['C9931', 'C9913', 'C9933', '31C99'],
    correctIndex: 0,
    explanation: 'Innermost: printf("C99") outputs "C99" and returns 3. Middle: printf("%d", 3) outputs "3" and returns 1 (since "3" has 1 char). Outer: printf("%d", 1) outputs "1". Concatenated output is "C9931".',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-42',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What does the %n format specifier do in printf?',
    codeSnippet: `#include <stdio.h>
int main() {
    int count = 0;
    printf("Code%nCraft", &count);
    printf(" %d", count);
    return 0;
}`,
    options: [
      'CodeCraft 4',
      'CodeCraft 0',
      'Code 4',
      'Compilation error: %n is forbidden'
    ],
    correctIndex: 0,
    explanation: '%n does not print anything; instead, it writes the number of characters printed so far into the integer pointer supplied (&count). Before %n, "Code" had 4 characters, so count becomes 4.',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-43',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the output of the following code involving carriage return \\r?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("Hello World\\rGood");
    return 0;
}`,
    options: ['Hello WorldGood', 'Goodo World', 'Good', 'Hello World'],
    correctIndex: 1,
    explanation: '"Hello World" is written, then \\r moves the cursor back to index 0 of the line without clearing it. "Good" overwrites the first 4 characters ("Hell"), leaving "Goodo World".',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-44',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What will be printed by the following code?',
    codeSnippet: `#include <stdio.h>
int main() {
    int val = 0;
    int res = sscanf("Age: 25", "%*s %d", &val);
    printf("%d %d", val, res);
    return 0;
}`,
    options: ['25 1', '25 2', '0 1', '0 0'],
    correctIndex: 0,
    explanation: '%*s consumes "Age:" without storing it (suppressed assignment). Then %d stores 25 into val. Since only 1 assignment took place, sscanf returns 1.',
    subtopic: 'printf and scanf',
  },
  {
    id: 'io-mcq-45',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the output of this code with variable field precision?',
    codeSnippet: `#include <stdio.h>
int main() {
    int w = 6, p = 2;
    double num = 3.14159;
    printf("|%*.*f|", w, p, num);
    return 0;
}`,
    options: ['|  3.14|', '| 3.14|', '|3.14  |', '|3.1415|'],
    correctIndex: 0,
    explanation: '%*.*f uses w=6 as total width and p=2 as decimal precision. "3.14" has 4 characters. With total width 6 right-aligned, 2 spaces precede it: "|  3.14|".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-46',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is printed by this string scan operation?',
    codeSnippet: `#include <stdio.h>
int main() {
    char buf[20];
    // Input string: "Alpha123Beta"
    sscanf("Alpha123Beta", "%[A-Za-z]", buf);
    printf("%s", buf);
    return 0;
}`,
    options: ['Alpha', 'Alpha123Beta', '123', 'Compilation error'],
    correctIndex: 0,
    explanation: 'The scanset %[A-Za-z] matches only alphabet characters. It stops scanning as soon as it encounters the digit \'1\', storing "Alpha".',
    subtopic: 'Format Specifiers',
  },
  {
    id: 'io-mcq-47',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the output of the following backspace (\\b) escape sequence?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("12345\\b\\bAB");
    return 0;
}`,
    options: ['12345AB', '123AB', '12345', '12AB5'],
    correctIndex: 1,
    explanation: '"12345" is printed, then two backspaces (\\b\\b) move the cursor back two positions over \'4\'. Then "AB" overwrites \'4\' and \'5\', yielding "123AB".',
    subtopic: 'Escape Sequences',
  },
  {
    id: 'io-mcq-48',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the difference between EOF and \'\\0\' in C standard I/O?',
    options: [
      'They are identical values in memory',
      'EOF is an integer condition (-1) indicating end-of-stream; \'\\0\' is a null character (ASCII 0) terminating strings',
      'EOF is 0, \'\\0\' is -1',
      'EOF is used only in C++, \'\\0\' only in C'
    ],
    correctIndex: 1,
    explanation: 'EOF is a macro representing an out-of-band integer value (typically -1) returned when stream input ends. \'\\0\' is character zero (null character, value 0) marking the end of string literals.',
    subtopic: 'getchar, putchar, gets, puts, fgets',
  },
  {
    id: 'io-mcq-49',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What will be output by this format string combining left alignment and zero padding?',
    codeSnippet: `#include <stdio.h>
int main() {
    printf("|%-06d|", 42);
    return 0;
}`,
    options: ['|420000|', '|000042|', '|42    |', '|  42  |'],
    correctIndex: 2,
    explanation: 'According to the C standard (C99 §7.19.6.1.6), if both the minus (-) and zero (0) flags appear, the 0 flag is ignored and left alignment (-) takes precedence: "|42    |".',
    subtopic: 'Width & Precision Formatting',
  },
  {
    id: 'io-mcq-50',
    topicId: 'input-output',
    difficulty: 'hard',
    question: 'What is the return value of sscanf("10 20 30", "%d %f", &a, &b) if a is an int and b is a float?',
    options: ['1', '2', '3', '0'],
    correctIndex: 1,
    explanation: 'sscanf successfully matches and converts "10" into int a, and "20" into float b. 2 items are assigned, so it returns 2.',
    subtopic: 'printf and scanf',
  },
];
