import { ExecutionResult } from '../types';

export interface CodeRunnerOptions {
  sourceCode: string;
  stdin?: string;
  expectedOutput?: string;
}

/**
 * Robust C Code Execution Simulator & Judge0 CE integration
 */
export const codeRunnerService = {
  async runCode(options: CodeRunnerOptions): Promise<ExecutionResult> {
    const { sourceCode, stdin = '' } = options;
    const startTime = performance.now();

    // 1. Check basic compilation hygiene
    const syntaxErrors = this.validateSyntax(sourceCode);
    if (syntaxErrors) {
      return {
        stdout: '',
        stderr: syntaxErrors,
        compileOutput: syntaxErrors,
        time: '0.01s',
        status: 'compilation_error',
      };
    }

    // 2. Try Judge0 CE API if configured in environment
    const judge0Url = import.meta.env.VITE_JUDGE0_URL;
    const judge0Key = import.meta.env.VITE_JUDGE0_KEY;

    if (judge0Url) {
      try {
        const result = await this.executeJudge0(sourceCode, stdin, judge0Url, judge0Key);
        if (result) return result;
      } catch (err) {
        console.warn('Judge0 CE call failed, falling back to simulated C engine:', err);
      }
    }

    // 3. Client-side Interactive C Execution Simulator
    return this.simulateCExecution(sourceCode, stdin, startTime);
  },

  validateSyntax(code: string): string | null {
    const syntaxCode = code.split('');
    const mask = (start: number, end: number) => {
      for (let index = start; index < Math.min(end, syntaxCode.length); index++) {
        if (syntaxCode[index] !== '\n' && syntaxCode[index] !== '\r') {
          syntaxCode[index] = ' ';
        }
      }
    };

    for (let index = 0; index < code.length; index++) {
      const current = code[index];
      const next = code[index + 1];

      if (current === '/' && next === '/') {
        const start = index;
        while (index < code.length && code[index] !== '\n') index++;
        mask(start, index);
        index--;
        continue;
      }

      if (current === '/' && next === '*') {
        const start = index;
        index += 2;
        while (index < code.length && !(code[index] === '*' && code[index + 1] === '/')) {
          index++;
        }
        if (index < code.length) index += 2;
        mask(start, index);
        index--;
        continue;
      }

      if (current === '"' || current === "'") {
        const start = index;
        const quote = current;
        index++;
        while (index < code.length) {
          if (code[index] === '\\') {
            index += 2;
          } else if (code[index] === quote) {
            index++;
            break;
          } else {
            index++;
          }
        }
        mask(start, index);
        index--;
      }
    }

    const maskedCode = syntaxCode.join('');
    if (!/\bmain\s*\(/.test(maskedCode)) {
      return "error: undefined reference to 'main'\ncollect2: error: ld returned 1 exit status";
    }

    const openingDelimiters: Array<{ value: string; index: number }> = [];
    const closingToOpening: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    const openingToClosing: Record<string, string> = { '(': ')', '[': ']', '{': '}' };

    for (let index = 0; index < maskedCode.length; index++) {
      const delimiter = maskedCode[index];
      if (openingToClosing[delimiter]) {
        openingDelimiters.push({ value: delimiter, index });
      } else if (closingToOpening[delimiter]) {
        const opening = openingDelimiters.pop();
        if (!opening || opening.value !== closingToOpening[delimiter]) {
          return `error: unexpected '${delimiter}' in source code.`;
        }
      }
    }

    const unclosedDelimiter = openingDelimiters[openingDelimiters.length - 1];
    if (unclosedDelimiter) {
      return `error: expected '${openingToClosing[unclosedDelimiter.value]}' at end of input.`;
    }

    return null;
  },

  async executeJudge0(
    sourceCode: string,
    stdin: string,
    url: string,
    key?: string
  ): Promise<ExecutionResult | null> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (key) {
      headers['X-RapidAPI-Key'] = key;
    }

    // Submit submission (C GCC 9.2.0 language ID is 50)
    const submissionRes = await fetch(`${url}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: 50,
        stdin: stdin,
      }),
    });

    if (!submissionRes.ok) return null;
    const data = await submissionRes.json();

    const stdout = data.stdout || '';
    const stderr = data.stderr || data.compile_output || '';
    const time = data.time ? `${data.time}s` : '0.04s';

    let status: ExecutionResult['status'] = 'accepted';
    if (data.status?.id === 6) status = 'compilation_error';
    else if (data.status?.id === 4) status = 'wrong_answer';
    else if (data.status?.id >= 7 && data.status?.id <= 12) status = 'runtime_error';

    return {
      stdout,
      stderr,
      compileOutput: data.compile_output,
      time,
      status,
    };
  },

  simulateCExecution(code: string, stdin: string, startTime: number): ExecutionResult {
    let output = '';
    const inputTokens = stdin.trim().split(/\s+/).filter(Boolean);
    let tokenIndex = 0;

    // Helper functions passed into the simulated environment
    const __printf = (format: string, ...args: any[]) => {
      let argIdx = 0;
      let text = String(format)
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/%%/g, '__PERCENT_ESCAPE__');

      text = text.replace(/%(-?\d+)?(?:\.(\d+))?([dfscuxX]|lf|p|lld)/g, (_match, width, prec, type) => {
        if (argIdx >= args.length) return '';
        const val = args[argIdx++];
        let strVal = '';

        if (type === 'f' || type === 'lf') {
          const p = prec !== undefined ? parseInt(prec, 10) : 6;
          strVal = Number(val).toFixed(p);
        } else if (type === 'd' || type === 'i' || type === 'lld') {
          strVal = Math.floor(Number(val)).toString();
        } else if (type === 'x') {
          strVal = Number(val).toString(16);
        } else if (type === 'X') {
          strVal = Number(val).toString(16).toUpperCase();
        } else if (type === 'c') {
          strVal = typeof val === 'number' ? String.fromCharCode(val) : String(val)[0] || '';
        } else if (type === 's') {
          if (prec !== undefined) {
            strVal = String(val).substring(0, parseInt(prec, 10));
          } else {
            strVal = String(val);
          }
        } else {
          strVal = String(val);
        }

        if (width) {
          const w = parseInt(width, 10);
          if (w < 0) {
            strVal = strVal.padEnd(Math.abs(w), ' ');
          } else {
            strVal = strVal.padStart(w, ' ');
          }
        }

        return strVal;
      });

      text = text.replace(/__PERCENT_ESCAPE__/g, '%');
      output += text;
      return text.length;
    };

    const __puts = (str: string) => {
      output += String(str) + '\n';
      return 0;
    };

    const __putchar = (c: any) => {
      output += typeof c === 'number' ? String.fromCharCode(c) : String(c)[0];
      return 0;
    };

    const __getchar = () => {
      const allInput = stdin;
      if (tokenIndex < allInput.length) {
        return allInput.charCodeAt(tokenIndex++);
      }
      return -1; // EOF
    };

    const __scanfNextToken = () => {
      return inputTokens[tokenIndex++] || '0';
    };

    try {
      // Extract main function body
      const mainMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
      if (!mainMatch) {
        return {
          stdout: '',
          stderr: "error: undefined reference to 'main'",
          time: '0.01s',
          status: 'compilation_error',
        };
      }

      let jsBody = mainMatch[1];

      // Convert C declarations and library helpers
      jsBody = jsBody
        // Remove return 0
        .replace(/return\s+0\s*;/g, '')
        // Convert printf
        .replace(/printf\s*\(/g, '__printf(')
        // Convert puts
        .replace(/puts\s*\(/g, '__puts(')
        // Convert putchar
        .replace(/putchar\s*\(/g, '__putchar(')
        // Convert getchar
        .replace(/getchar\s*\(\)/g, '__getchar()')
        // Convert sqrt and pow
        .replace(/\bsqrt\s*\(/g, 'Math.sqrt(')
        .replace(/\bpow\s*\(/g, 'Math.pow(')
        .replace(/\babs\s*\(/g, 'Math.abs(')
        // Replace type declarations with let
        .replace(/\b(int|float|double|char|long|unsigned|short)\s+([a-zA-Z0-9_]+)/g, 'let $2')
        // Replace C casts (float)x -> Number(x)
        .replace(/\((float|double|int|char|long)\)/g, 'Number')
        // Strip address-of operator & in function args
        .replace(/,\s*&([a-zA-Z0-9_]+)/g, ', $1');

      // Transform scanf("%d", &n) -> n = Number(__scanfNextToken())
      jsBody = jsBody.replace(/scanf\s*\(\s*"([^"]+)"\s*,([\s\S]*?)\);/g, (_m, format, varsStr) => {
        const vars = varsStr.split(',').map((v: string) => v.replace('&', '').trim()).filter(Boolean);
        let assignments = '';
        for (const v of vars) {
          assignments += `${v} = Number(__scanfNextToken());\n`;
        }
        return assignments;
      });

      // Guard against infinite loops with execution iteration counter
      let iterCounter = 0;
      const MAX_ITERS = 200000;
      const __loopCheck = () => {
        if (++iterCounter > MAX_ITERS) {
          throw new Error('Time Limit Exceeded: Potential infinite loop detected.');
        }
      };

      // Inject loop check into for and while loops
      jsBody = jsBody.replace(/for\s*\(([^;]*);([^;]*);([^)]*)\)\s*\{/g, 'for ($1; $2; $3) { __loopCheck(); ');
      jsBody = jsBody.replace(/while\s*\(([^)]+)\)\s*\{/g, 'while ($1) { __loopCheck(); ');
      jsBody = jsBody.replace(/do\s*\{/g, 'do { __loopCheck(); ');

      // Run sandboxed evaluator function
      const runFn = new Function(
        '__printf',
        '__puts',
        '__putchar',
        '__getchar',
        '__scanfNextToken',
        '__loopCheck',
        `"use strict";\n${jsBody}`
      );

      runFn(__printf, __puts, __putchar, __getchar, __scanfNextToken, __loopCheck);

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);

      return {
        stdout: output,
        stderr: '',
        time: `${elapsed}s`,
        status: 'accepted',
      };
    } catch (err: any) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      const isTLE = err.message?.includes('Time Limit Exceeded');
      return {
        stdout: output,
        stderr: err.message || 'Execution error',
        time: `${elapsed}s`,
        status: isTLE ? 'time_limit_exceeded' : 'runtime_error',
      };
    }
  },
};
