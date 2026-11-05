import { Lesson } from '../../../types';

export const inputOutputLessons: Lesson = {
  id: 'lesson-input-output',
  topicId: 'input-output',
  title: 'Input and Output in C',
  order: 1,
  sections: [
    {
      id: 'sec-printf-scanf',
      title: 'printf and scanf Fundamentals',
      concept:
        'Standard input and output in C are provided by the <stdio.h> library. `printf()` formats and prints text to standard output (stdout), returning the total number of characters successfully written. `scanf()` parses formatted data from standard input (stdin), returning the count of successfully matched and assigned items.',
      syntax: `int printf(const char *format, ...);\nint scanf(const char *format, ...);`,
      codeSnippet: `#include <stdio.h>

int main() {
    int age;
    float gpa;
    
    printf("Enter age and GPA: ");
    // scanf requires memory addresses using the address-of operator (&)
    int itemsRead = scanf("%d %f", &age, &gpa);
    
    int charsPrinted = printf("Recorded: Age = %d, GPA = %.2f (Items read: %d)\\n", age, gpa, itemsRead);
    printf("Characters written by last printf: %d\\n", charsPrinted);
    
    return 0;
}`,
      annotation:
        'Note the return values: scanf() returns the number of successfully read fields, which allows robust error detection. printf() returns the total character count written to stdout.',
      commonMistakes: [
        'Forgetting the & (address-of) operator before primitive variables in scanf(), causing undefined behavior or segmentation fault.',
        'Passing mismatched format specifiers (e.g. %d for a float variable), which leads to memory misinterpretation.',
        'Assuming scanf("%s", str) reads full multi-word sentences with spaces (it stops at the first whitespace).',
      ],
      quickRecap: [
        'Always check the return value of scanf() to verify user input succeeded.',
        'scanf requires addresses (&age); arrays/strings decay to pointers so they do not require &.',
        'printf returns the number of characters written.',
      ],
    },
    {
      id: 'sec-format-specifiers',
      title: 'Format Specifiers Exhaustive Guide',
      concept:
        'Format specifiers begin with a % symbol and direct the I/O engine on how to convert binary representations to human-readable strings and vice-versa. Using the incorrect specifier leads to type misinterpretation or stack corruption.',
      syntax: `%[flags][width][.precision][length]type`,
      codeSnippet: `#include <stdio.h>

int main() {
    int num = 42;
    unsigned int unum = 3000000000U;
    float f = 3.14159f;
    double d = 2.718281828459;
    char ch = 'Z';
    char str[] = "C Programming";
    void *ptr = &num;

    printf("Integer (decimal):    %d or %i\\n", num, num);
    printf("Unsigned int:         %u\\n", unum);
    printf("Hexadecimal:          0x%x (uppercase: 0x%X)\\n", num, num);
    printf("Octal:                %o\\n", num);
    printf("Float:                %f\\n", f);
    printf("Double (standard):    %lf\\n", d);
    printf("Scientific notation:  %e\\n", d);
    printf("Single character:     %c (ASCII code: %d)\\n", ch, ch);
    printf("String:               %s\\n", str);
    printf("Memory address (ptr): %p\\n", ptr);
    
    return 0;
}`,
      annotation:
        '%p prints pointers formatted in implementation-defined hexadecimal (often prefixed with 0x). For scanf(), double requires %lf, whereas float requires %f.',
      commonMistakes: [
        'Using %f in scanf for a double variable. In scanf, %f writes 4 bytes to float, while double expects 8 bytes via %lf!',
        'Using %c immediately after %d in scanf without consuming the trailing newline character.',
        'Using %u with negative integers, resulting in unexpected high unsigned numbers.',
      ],
      quickRecap: [
        'int: %d or %i; unsigned: %u; hex: %x / %X; octal: %o',
        'float: %f in printf & scanf; double: %lf in scanf (%f or %lf in printf C99)',
        'char: %c; string: %s; pointer: %p',
      ],
    },
    {
      id: 'sec-char-string-io',
      title: 'Character & Stream I/O: getchar, putchar, fgets, puts',
      concept:
        'Beyond printf and scanf, C provides unbuffered/stream-oriented routines. `getchar()` reads one unsigned char cast to int from stdin (or returns EOF). `putchar()` writes one character. `fgets()` safely reads an entire line including spaces up to a specified buffer size, replacing the deprecated, unsafe `gets()`.',
      syntax: `int getchar(void);\nint putchar(int c);\nchar *fgets(char *str, int n, FILE *stream);\nint puts(const char *str);`,
      codeSnippet: `#include <stdio.h>

int main() {
    char buffer[64];
    
    printf("Enter a full line of text: ");
    // Safe string input with boundary check
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        printf("You entered via puts():\\n");
        // puts automatically appends a newline \\n
        puts(buffer);
    }
    
    printf("Enter a single character: ");
    int c = getchar();
    printf("Echoing back via putchar: ");
    putchar(c);
    putchar('\\n');
    
    return 0;
}`,
      annotation:
        'gets() was officially removed in C11 because it does not accept a buffer size and causes buffer-overflow exploits. Always use fgets(buffer, sizeof(buffer), stdin) instead.',
      commonMistakes: [
        'Using gets() in modern code. It is dangerous and triggers compiler deprecation warnings or build failures.',
        'Storing the return of getchar() in a char variable instead of an int. EOF is typically -1, which may not fit properly in an unsigned char.',
        'Forgetting that fgets() preserves the trailing newline "\\n" if buffer space permits.',
      ],
      quickRecap: [
        'getchar() returns int so it can distinguish legitimate characters from EOF (-1).',
        'puts(s) automatically appends a newline "\\n", whereas fputs(s, stdout) does not.',
        'fgets(buffer, size, stdin) is the secure standard for multi-word string input.',
      ],
    },
    {
      id: 'sec-escape-sequences',
      title: 'Escape Sequences and Special Characters',
      concept:
        'Escape sequences allow representation of non-printable or control characters within string and character literals using a backslash \\ prefix.',
      syntax: `\\n (newline), \\t (tab), \\r (carriage return), \\b (backspace), \\\\ (backslash), \\" (quote), \\0 (null terminator)`,
      codeSnippet: `#include <stdio.h>

int main() {
    printf("Line 1\\nLine 2\\n");
    printf("Col 1\\tCol 2\\tCol 3\\n");
    printf("Quotes inside string: \\"C99 Standard\\"\\n");
    printf("Printing a backslash: \\\\\\n");
    printf("Printing a literal percent sign: 100%%\\n");
    printf("Alert bell sound: \\a (may beep on terminal)\\n");
    
    return 0;
}`,
      annotation:
        'To print a literal percent symbol in a printf format string, use %%, not \\%.',
      commonMistakes: [
        'Using \\% instead of %% to print a percent sign in printf.',
        'Confusing \\0 (null terminator, ASCII 0) with character \'0\' (ASCII 48).',
        'Forgetting that \\r moves the carriage to the start of the line without advancing downward.',
      ],
      quickRecap: [
        '\\n moves to next line; \\t creates an 8-space aligned horizontal tab.',
        '%% prints a single % character in printf.',
        '\\0 terminates strings in C.',
      ],
    },
    {
      id: 'sec-width-precision',
      title: 'Width, Precision, and Alignment Formatting',
      concept:
        'C printf offers precision control: minimum field width, leading zeros padding, left-justification flags, and floating-point fractional digits.',
      syntax: `%[flags][width][.precision]type\nFlags: - (left align), + (force sign), 0 (zero pad), # (alternate form)`,
      codeSnippet: `#include <stdio.h>

int main() {
    int val = 42;
    double pi = 3.14159265;
    
    printf("|%10d| (Right aligned, width 10)\\n", val);
    printf("|%-10d| (Left aligned, flag -)\\n", val);
    printf("|%+10d| (Explicit sign, flag +)\\n", val);
    printf("|%010d| (Zero-padded, flag 0)\\n", val);
    
    printf("Pi 2 decimals: %.2f\\n", pi);
    printf("Pi 4 decimals: %.4f\\n", pi);
    printf("Pi width 12, 3 decimals: |%12.3f|\\n", pi);
    
    char name[] = "Algorithm";
    printf("Truncated string: %.5s\\n", name); // Prints only first 5 chars
    
    return 0;
}`,
      annotation:
        'Precision for floats specifies the number of digits after the decimal point (with rounding). Precision for strings (%.Ns) limits the maximum number of characters output.',
      commonMistakes: [
        'Using %0-10d (combining 0 and -). The - flag overrides 0 padding in standard C.',
        'Assuming %.2f truncates instead of rounds: 3.146 with %.2f prints 3.15.',
      ],
      quickRecap: [
        '%10d allocates minimum 10 columns right-aligned; %-10d left-aligns.',
        '%08d pads numbers with leading zeros up to 8 digits.',
        '%.Nf controls exact decimal places with IEEE rounding.',
      ],
    },
    {
      id: 'sec-buffer-flushing',
      title: 'Stream Buffering & Input Sanitization',
      concept:
        'Standard I/O streams are buffered: stdout is typically line-buffered (flushes on \\n), and stdin retains leftover characters such as \\n after scanf reads numbers. This leftover newline can accidentally consume subsequent character reads.',
      syntax: `fflush(stdout);\nwhile((c = getchar()) != '\\n' && c != EOF); // clear stdin buffer`,
      codeSnippet: `#include <stdio.h>

int main() {
    int number;
    char letter;
    
    printf("Enter an integer: ");
    scanf("%d", &number);
    
    // Notice the space before %c: it skips leading whitespace including leftover '\\n'
    printf("Enter a character: ");
    scanf(" %c", &letter);
    
    printf("You entered number %d and character '%c'\\n", number, letter);
    
    // Explicitly flush stdout when prompting without a newline
    printf("Processing...");
    fflush(stdout);
    
    return 0;
}`,
      annotation:
        'A leading space in scanf(" %c", &ch) tells scanf to skip all leading whitespace characters (spaces, tabs, newlines) before capturing the character.',
      commonMistakes: [
        'Calling fflush(stdin). In the C standard (C99/C11), fflush is only defined for output streams; calling it on stdin is undefined behavior.',
        'Failing to clean up buffer when mixing scanf and getchar().',
      ],
      quickRecap: [
        'Use " %c" (space before %c) in scanf to automatically ignore leftover newlines.',
        'fflush(stdout) forces immediate terminal render without waiting for \\n.',
        'Never use fflush(stdin); instead drain stdin using a while(getchar() != \'\\n\') loop.',
      ],
    },
  ],
};
