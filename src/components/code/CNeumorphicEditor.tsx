import React, { useRef, useEffect } from 'react';

interface CNeumorphicEditorProps {
  value: string;
  onChange: (val: string) => void;
  fontSize?: number;
  height?: string;
  readOnly?: boolean;
}

export const CNeumorphicEditor: React.FC<CNeumorphicEditorProps> = ({
  value,
  onChange,
  fontSize = 14,
  height = '380px',
  readOnly = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Split lines for line numbers
  const lines = value.split('\n');

  // Handle Tab key and Auto-indent
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    } else if (e.key === 'Enter') {
      // Auto-indent: copy leading whitespace from current line
      const cursor = textarea.selectionStart;
      const currentLine = value.substring(0, cursor).split('\n').pop() || '';
      const match = currentLine.match(/^\s+/);
      const indent = match ? match[0] : '';

      // If line ended with '{', add 4 more spaces
      const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';

      e.preventDefault();
      const insert = '\n' + indent + extraIndent;
      const newValue = value.substring(0, cursor) + insert + value.substring(textarea.selectionEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursor + insert.length;
      }, 0);
    }
  };

  // Sync scroll between textarea and syntax highlight layer
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Highlight C code tokens
  const highlightCCode = (code: string) => {
    // Escape HTML special chars first
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Directives (#include, #define)
    escaped = escaped.replace(/(#include|#define|#ifdef|#ifndef|#endif)\b/g, '<span class="text-orange-600 dark:text-[#FF7A1A] font-bold">$1</span>');

    // Keywords
    const keywords = /\b(int|float|double|char|void|long|short|unsigned|signed|struct|typedef|return|if|else|switch|case|default|break|continue|for|while|do|sizeof|static|const|extern)\b/g;
    escaped = escaped.replace(keywords, '<span class="text-amber-700 dark:text-[#FF9A45] font-semibold">$1</span>');

    // String literals
    escaped = escaped.replace(/(".*?"|'.*?')/g, '<span class="text-emerald-700 dark:text-emerald-400">$1</span>');

    // Numbers
    escaped = escaped.replace(/\b(\d+(\.\d+)?f?)\b/g, '<span class="text-blue-700 dark:text-sky-400 font-medium">$1</span>');

    // Comments
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="text-slate-500 dark:text-[#6f7682] italic">$1</span>');

    return escaped;
  };

  return (
    <div
      className="relative w-full rounded-2xl neu-inset overflow-hidden border border-[var(--neu-border)] bg-[#f4f7fb] dark:bg-[#1a1d22] flex"
      style={{ height }}
    >
      {/* Line Numbers Column */}
      <div
        className="w-12 select-none py-3.5 pr-2 pl-2 text-right bg-[#e6ebf2] dark:bg-[#15171b] border-r border-[var(--neu-border)] font-mono text-slate-500 dark:text-slate-400 overflow-hidden shrink-0 font-medium"
        style={{ fontSize: `${fontSize - 1}px`, lineHeight: '1.6' }}
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* Code Editor Area */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Syntax Highlighted View Underneath */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 p-3.5 m-0 font-mono text-transparent pointer-events-none whitespace-pre overflow-hidden"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.6',
            tabSize: 4,
          }}
          dangerouslySetInnerHTML={{ __html: highlightCCode(value) + '\n' }}
        />

        {/* Real Interactive Textarea on Top */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="absolute inset-0 w-full h-full p-3.5 font-mono text-slate-900 dark:text-slate-200 bg-transparent caret-[var(--neu-accent)] outline-none resize-none whitespace-pre overflow-auto selection:bg-[var(--neu-accent)]/30"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.6',
            tabSize: 4,
          }}
        />
      </div>

    </div>
  );
};
