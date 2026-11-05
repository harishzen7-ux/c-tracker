import React, { useState, useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { CNeumorphicEditor } from './CNeumorphicEditor';

interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
  height?: string;
  readOnly?: boolean;
  mode?: 'monaco' | 'native';
  onModeToggle?: () => void;
}

const MacEditorFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="w-full rounded-xl border p-3 transition-shadow sm:p-4"
    style={{
      backgroundColor: 'var(--neu-surface)',
      borderColor: 'var(--neu-border)',
      boxShadow: '6px 6px 14px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light)',
    }}
  >
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
      <div className="flex items-center gap-2" aria-label="Editor window controls">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c941]" />
      </div>
      <span className="text-xs font-semibold text-[var(--neu-text-primary)]">solution.c</span>
      <div className="flex items-center gap-1.5">
        <span className="rounded bg-[var(--neu-base)] px-2 py-1 text-[10px] font-medium text-[var(--neu-text-secondary)]">C source</span>
        <span className="rounded bg-[var(--neu-base)] px-2 py-1 text-[10px] font-medium text-[var(--neu-text-secondary)]">Editable</span>
      </div>
    </div>
    {children}
  </div>
);

export const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
  value,
  onChange,
  fontSize = 14,
  height = '380px',
  readOnly = false,
  mode = 'monaco',
  onModeToggle,
}) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return typeof document !== 'undefined' && document.documentElement.classList.contains('light');
  });

  // Track HTML class changes for theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light');
      setIsLightMode(isLight);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    try {
      // Dark Theme
      monaco.editor.defineTheme('cTrackerDark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: 'FF7A1A', fontStyle: 'bold' },
          { token: 'type', foreground: 'FF9A45' },
          { token: 'string', foreground: '22c55e' },
          { token: 'number', foreground: '38bdf8' },
          { token: 'comment', foreground: '6f7682', fontStyle: 'italic' },
          { token: 'delimiter', foreground: '9AA0A8' },
        ],
        colors: {
          'editor.background': '#1e2126',
          'editor.foreground': '#E6E8EB',
          'editorCursor.foreground': '#FF7A1A',
          'editor.lineHighlightBackground': '#252930',
          'editorLineNumber.foreground': '#555d6b',
          'editorLineNumber.activeForeground': '#FF7A1A',
          'editor.selectionBackground': '#FF7A1A33',
          'editor.inactiveSelectionBackground': '#FF7A1A1a',
        },
      });

      // Light Theme with crisp contrast
      monaco.editor.defineTheme('cTrackerLight', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: 'd85200', fontStyle: 'bold' },
          { token: 'type', foreground: '9a3412' },
          { token: 'string', foreground: '15803d' },
          { token: 'number', foreground: '0284c7' },
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
          { token: 'delimiter', foreground: '334155' },
        ],
        colors: {
          'editor.background': '#f8fafc',
          'editor.foreground': '#0f172a',
          'editorCursor.foreground': '#d85200',
          'editor.lineHighlightBackground': '#f1f5f9',
          'editorLineNumber.foreground': '#94a3b8',
          'editorLineNumber.activeForeground': '#d85200',
          'editor.selectionBackground': '#fed7aa',
          'editor.inactiveSelectionBackground': '#ffedd5',
        },
      });

      const currentTheme = document.documentElement.classList.contains('light')
        ? 'cTrackerLight'
        : 'cTrackerDark';
      monaco.editor.setTheme(currentTheme);
    } catch (err) {
      console.warn('Monaco theme setup notice:', err);
    }
  };

  const monacoRef = React.useRef<any>(null);

  // Sync theme when isLightMode toggles
  useEffect(() => {
    if (window && (window as any).monaco) {
      try {
        (window as any).monaco.editor.setTheme(isLightMode ? 'cTrackerLight' : 'cTrackerDark');
      } catch (e) {
        // theme set safely
      }
    }
  }, [isLightMode]);

  // If Monaco errored or user explicitly prefers the native editor
  if (mode === 'native') {
    return (
      <MacEditorFrame>
        <CNeumorphicEditor
          value={value}
          onChange={onChange}
          fontSize={fontSize}
          height={height}
          readOnly={readOnly}
        />
      </MacEditorFrame>
    );
  }

  return (
    <MacEditorFrame>
      <div
        className="w-full overflow-hidden rounded-lg border transition-colors"
        style={{
          backgroundColor: 'var(--code-box-bg)',
          borderColor: 'var(--code-box-border)',
        }}
      >
        <Editor
          height={height}
          language="c"
          value={value}
          onChange={(val) => onChange(val || '')}
          onMount={(editor, monaco) => {
            monacoRef.current = monaco;
            handleEditorDidMount(editor, monaco);
          }}
          theme={isLightMode ? 'cTrackerLight' : 'cTrackerDark'}
          options={{
            fontSize,
            fontFamily: "'Inter', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly,
            tabSize: 4,
            insertSpaces: true,
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
            lineNumbersMinChars: 3,
          }}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-2 p-6 text-xs font-mono text-[var(--neu-text-muted)]">
              <span>Loading C Editor Environment...</span>
              {onModeToggle && (
                <button
                  type="button"
                  onClick={onModeToggle}
                  className="text-[11px] text-[var(--neu-accent)] underline hover:opacity-80 cursor-pointer"
                >
                  Switch to lightweight editor
                </button>
              )}
            </div>
          }
        />
      </div>
    </MacEditorFrame>
  );
};
