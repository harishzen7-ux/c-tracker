import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Lightbulb,
  Monitor,
  Settings2,
} from 'lucide-react';
import { NeuButton } from '../components/common/NeuButton';
import { NeuCard } from '../components/common/NeuCard';
import { ThemeSelector } from '../components/common/ThemeSelector';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../services/AuthContext';

interface WhereYouBeginPageProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

const prerequisites = [
  'Know how to use a keyboard and open a code editor or terminal.',
  'Be curious about how instructions become actions on a computer.',
  'Practice breaking a problem into small, ordered steps.',
  'Expect to make mistakes: reading compiler errors is part of learning.',
];

const applications = [
  {
    title: 'Operating systems',
    description: 'Core system software, device drivers, and other software close to hardware.',
    icon: Settings2,
  },
  {
    title: 'Embedded devices',
    description: 'Firmware for microcontrollers and devices with limited memory or processing power.',
    icon: Cpu,
  },
  {
    title: 'Compilers and tools',
    description: 'Language runtimes, compilers, interpreters, and developer utilities.',
    icon: Code2,
  },
  {
    title: 'High-performance software',
    description: 'Parts of databases, networking tools, graphics, and other performance-sensitive programs.',
    icon: Monitor,
  },
];

const dataTypes = [
  { name: 'char', purpose: 'Stores a character or a small integer value.' },
  { name: 'int', purpose: 'Stores whole numbers.' },
  { name: 'float', purpose: 'Stores decimal numbers with single precision.' },
  { name: 'double', purpose: 'Stores decimal numbers with more precision than float.' },
  { name: 'Bool', purpose: 'Stores 0 or 1; C99 also provides the bool name in <stdbool.h>.' },
  { name: 'void', purpose: 'Represents no value, such as a function that returns nothing.' },
];

const trackedTopics = [
  { title: 'Input and output', description: 'Read values and display results with standard I/O.' },
  { title: 'Operators and expressions', description: 'Calculate, compare, and combine values.' },
  { title: 'Decision making', description: 'Choose actions with if, else, and switch.' },
  { title: 'Looping', description: 'Repeat work with for, while, and do-while loops.' },
];

const furtherTopics = [
  'Functions and scope',
  'Arrays and strings',
  'Pointers and dynamic memory',
  'Structures and unions',
  'File handling',
  'Preprocessor and header files',
];

export const WhereYouBeginPage: React.FC<WhereYouBeginPageProps> = ({
  theme,
  onThemeChange,
}) => {
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-[var(--neu-border)] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            to="/"
            className="text-lg font-extrabold tracking-tight text-[var(--neu-text-primary)] transition-colors hover:text-[var(--neu-accent)] sm:text-xl"
          >
            C <span className="text-[var(--neu-accent)]">Tracker</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSelector theme={theme} onChange={onThemeChange} />
            {currentUser ? (
              <Link to="/dashboard">
                <NeuButton variant="secondary" size="sm">Dashboard</NeuButton>
              </Link>
            ) : (
              <Link to="/signup">
                <NeuButton variant="primary" size="sm">Get started</NeuButton>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <section className="space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--neu-accent)] neu-inset">
            <BookOpen size={14} aria-hidden="true" />
            Your first step into C
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[var(--neu-text-primary)] sm:text-5xl">
            Where you begin
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--neu-text-secondary)] sm:text-base">
            A quick orientation to what C is, where it came from, and what you need
            before starting your first topic.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <NeuCard className="space-y-3 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-[var(--neu-accent)]">
                <Code2 size={20} aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-[var(--neu-text-primary)]">What is C?</h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              C is a general-purpose, compiled programming language. You write
              instructions in source code, then a compiler translates them into a
              program your computer can run. C gives you a clear view of data,
              memory, and how a program executes, which makes it useful both for
              building software and understanding how computers work.
            </p>
          </NeuCard>

          <NeuCard className="space-y-3 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-[var(--neu-accent)]">
                <Lightbulb size={20} aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-[var(--neu-text-primary)]">A short origin story</h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              Dennis Ritchie developed C at Bell Labs in the early 1970s. It grew
              from earlier languages such as BCPL and B, and was used to help
              build the Unix operating system. C became influential because it
              combines efficient, low-level control with a portable language
              that can be used across many kinds of computers.
            </p>
          </NeuCard>
        </section>

        <NeuCard className="space-y-5 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-[var(--neu-accent)]">
              <Cpu size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">Applications of C</h2>
              <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">
                C is especially useful when efficiency and direct control matter.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {applications.map(({ title, description, icon: Icon }) => (
              <div key={title} className="neu-inset-sm flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-4">
                <Icon size={18} className="mt-0.5 shrink-0 text-[var(--neu-accent)]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--neu-text-primary)]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--neu-text-secondary)]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </NeuCard>

        <NeuCard className="space-y-5 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-[var(--neu-accent)]">
              <Database size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">Data types in C</h2>
              <p className="mt-1 text-sm text-[var(--neu-text-secondary)]">
                A type tells C what kind of value a variable can hold.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-[var(--neu-border)]">
            {dataTypes.map(({ name, purpose }, index) => (
              <div
                key={name}
                className={`grid gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4 ${
                  index > 0 ? 'border-t border-[var(--neu-border)]' : ''
                }`}
              >
                <code className="font-mono text-sm font-bold text-[var(--neu-accent)]">{name}</code>
                <span className="text-sm leading-relaxed text-[var(--neu-text-secondary)]">{purpose}</span>
              </div>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-[var(--neu-text-muted)]">
            Integer types can be qualified with signed, unsigned, short, or long.
            C also has derived types such as arrays, pointers, and functions, plus
            user-defined types such as structs. The exact size and range of some
            numeric types can vary by platform.
          </p>
        </NeuCard>

        <NeuCard className="space-y-5 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">Topics in C</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              Start with the foundations, then move toward building larger programs.
              These are the four topics covered in this tracker:
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trackedTopics.map(({ title, description }, index) => (
              <div key={title} className="neu-inset-sm flex items-start gap-3 rounded-xl border border-[var(--neu-border)] p-4">
                <span className="font-mono text-xs font-bold text-[var(--neu-accent)]">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--neu-text-primary)]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--neu-text-secondary)]">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--neu-text-muted)]">
              What comes next in C
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {furtherTopics.map((topic) => (
                <li key={topic} className="rounded-full px-3 py-1.5 text-xs text-[var(--neu-text-secondary)] neu-inset">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </NeuCard>

        <NeuCard className="space-y-5 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">
              What should you know before learning C?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              You do not need another programming language or advanced math to
              begin. These simple habits are enough to get started:
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {prerequisites.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--neu-text-secondary)]">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--neu-green-tile-text)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </NeuCard>

        <NeuCard className="space-y-4 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">Your first C program</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neu-text-secondary)]">
              A small program is a good place to start. This one prints a message:
            </p>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[var(--code-box-border)] bg-[var(--code-box-bg)] p-4 text-sm leading-relaxed text-[var(--code-box-text)]">
            <code>{`#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}`}</code>
          </pre>
          <p className="text-sm leading-relaxed text-[var(--neu-text-secondary)]">
            <code className="font-mono text-[var(--neu-accent)]">main</code> is
            where execution begins, <code className="font-mono text-[var(--neu-accent)]">printf</code>{' '}
            prints text, and <code className="font-mono text-[var(--neu-accent)]">return 0</code>{' '}
            signals that the program finished successfully.
          </p>
        </NeuCard>

        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <p className="text-sm text-[var(--neu-text-secondary)]">
            Ready? Start with input and output, then build up to operators, decisions, and loops.
          </p>
          <Link to={currentUser ? '/dashboard' : '/signup'}>
            <NeuButton variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              {currentUser ? 'Explore the topics' : 'Create an account to begin'}
            </NeuButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
