# C Tracker — Phase 1: Skill Updation

A production-grade, dark neumorphic web application built with React, TypeScript, Tailwind CSS, and Monaco Editor to track, test, and elevate C programming mastery across four foundational pillars: Input & Output, Operators & Expressions, Decision Making, and Looping.

> [!IMPORTANT]
> **User Review & Critical Decisions Summary**
> - **Execution Runner Strategy**: Confirmed default is an interactive simulated C execution engine that executes standard C99 logic instantly in-browser with full stdin/stdout support and zero network latency, with seamless Judge0 CE API fallback when an external endpoint/key is configured.
> - **MCQ Timing Mode**: Confirmed untimed practice mode by default with an optional toggleable neumorphic stopwatch / timer for drill exercises.
> - **Coding Arena Layout**: Confirmed split-screen layout on desktop with the problem description & test cases on the left and Monaco editor + input/output console on the right.
> - **Step-by-Step Staging**: As requested, Step 1 establishes the full design system, routing, dashboard, and data models. Step 2 delivers the full reference topic "Input and Output" (exhaustive Learning Arena, 50 high-quality MCQs with output prediction, and 25 progressive coding questions with complete visible/hidden test cases). Step 3 awaits user confirmation before generating the remaining three topics.

---

## 1. Overview & Core Concept

**C Tracker** is an interactive learning and skill-tracking platform tailored for programmers learning or mastering the C programming language. Phase 1 focuses on foundational mechanics:
1. **Input and Output** (`printf`, `scanf`, specifiers, buffered I/O, escape codes, width/precision)
2. **Operators and Expressions** (arithmetic, bitwise, precedence, associativity, type casting)
3. **Decision Making Statements** (`if-else`, ternary, `switch-case`, common traps like `=` vs `==`)
4. **Looping** (`for`, `while`, `do-while`, nested loops, break/continue, pattern printing)

Each topic provides three distinct learning modalities:
- **Learning Arena**: High-retention lessons with syntax breakdown, annotated code blocks, pitfall warnings, quick recaps, and completion checkboxes with scroll-spy navigation.
- **MCQ Check**: 50 curated questions per topic (200 total), balanced across Easy (20), Medium (20), and Hard (10), featuring realistic compiler output predictions, question navigator palette, bookmarking/review tags, scorecards with equalizer bars, and comprehensive explanations.
- **Try With Code**: 25 progressive coding challenges per topic (100 total) with real problem statements, input/output constraints, starter templates, sample cases, and hidden test suites evaluated in an embedded Monaco Editor.

---

## 2. User Experience & Visual Design

### Dark Neumorphic Soft-UI Aesthetic
The visual design embodies tactile dark neumorphism with glowing amber-orange highlights:
- **Base Canvas**: `#2a2d32` (deep charcoal background).
- **Raised Surfaces**: `#2f3237` with paired dual soft shadows:
  - Top-left light reflection: `rgba(255, 255, 255, 0.05)`
  - Bottom-right shadow: `rgba(0, 0, 0, 0.55)`
- **Inset (Pressed) Surfaces**: Inset dual shadows (`inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.05)`) for inputs, pressed buttons, and track recesses.
- **Accent Glow**: `#FF7A1A` primary accent with `#FF9A45` gradient highlights, glowing ambient rim (`box-shadow: 0 0 14px rgba(255, 122, 26, 0.45)`).
- **Typography**: `Plus Jakarta Sans` for sleek UI headlines and labels; `JetBrains Mono` for code snippets, Monaco editor, and tabular numerals (`tabular-nums`).
- **Neumorphic Component Suite**:
  - `NeuCard`: Raised container with 20-24px rounded radius, hover lift, and optional active glowing indicator.
  - `NeuButton`: Tactile button transitioning from raised rest state to inset pressed state on click, with gradient primary variant.
  - `NeuIconButton`: Round and square soft-UI buttons for navigation, bookmarks, code copying, and editor resetting.
  - `NeuSegmented`: Recessed track with raised active pill pillaring smooth transitions between tabs (Learn / MCQ / Code) and filters (All / Easy / Medium / Hard).
  - `NeuInput`: Inset pill search and text input fields with soft focus glow rings.
  - `NeuToggle`: Recessed pill track with smooth animated raised sliding knob.
  - `NeuRing`: Dual-shadowed circular SVG progress gauge with rounded glowing orange arc.
  - `NeuEqualizer`: Vertical recessed tracks with animated level bars for difficulty/topic score breakdown.
  - `NeuBadge`: Unboxed, high-contrast status tags adhering to strict anti-slop rules.

---

## 3. Key Product Decisions & Trade-Offs

1. **Dual C Execution Pipeline (Simulated Engine + Judge0 CE API)**
   - *Chosen Approach*: Implement a hybrid execution runner. The client-side simulator executes C99 logic (standard I/O, loops, conditionals, mathematical formulas, string formatting) directly in memory for instant feedback and zero latency, while supporting external Judge0 CE endpoints if configured via `.env`.
   - *Why*: Ensures the application is 100% functional out-of-the-box without requiring users to purchase RapidAPI or Judge0 subscription keys or risk network CORS issues.

2. **Storage Layer Abstraction (`storageService`)**
   - *Chosen Approach*: Clean repository interface storing topic progress, completed lessons, MCQ attempt history, best scores, solved coding challenges, and saved editor code in `localStorage` with JSON serialization and versioned migrations.
   - *Why*: Decouples the UI from the storage mechanism, allowing trivial migration to Firebase Firestore or PostgreSQL in Phase 2.

3. **Data Modularity (1 Topic = 1 Data Module)**
   - *Chosen Approach*: Modular data folder hierarchy (`/src/data/topics/input-output.ts`, etc.) defining strictly typed Lesson, MCQ, and CodingQuestion datasets.
   - *Why*: Avoids cluttering React components, makes question auditing straightforward, and ensures maintainability.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                               C TRACKER                                │
│                       Root Router (React Router)                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Dashboard   │             │ Topic Detail │             │ Settings /   │
│  • Streak    │             │   Layout     │             │ Profile Card │
│  • Ring KPI  │             └──────┬───────┘             └──────────────┘
│  • 4 Cards   │                    │
│  • Equalizer │       ┌────────────┼────────────┐
└──────────────┘       ▼            ▼            ▼
                 ┌──────────┐ ┌──────────┐ ┌──────────┐
                 │ Learning │ │   MCQ    │ │ Try With │
                 │  Arena   │ │  Check   │ │   Code   │
                 │(Lessons) │ │(50 MCQs) │ │(25 Codes)│
                 └──────────┘ └──────────┘ └──────────┘
                       │            │            │
                       └────────────┼────────────┘
                                    ▼
                 ┌──────────────────────────────────────┐
                 │            Services Layer            │
                 │ • storageService (localStorage)      │
                 │ • codeRunnerService (Sim + Judge0)   │
                 └──────────────────────────────────────┘
```

### Core Entities & Data Schema

- **Topic**: `id`, `title`, `slug`, `description`, `icon`, `color`, `order`.
- **Lesson**: `id`, `topicId`, `slug`, `title`, `order`, `summary`, `contentSections` (explanation, syntax, codeSnippets, mistakes, quickRecap).
- **MCQ**: `id`, `topicId`, `difficulty` (`'easy' | 'medium' | 'hard'`), `question`, `codeSnippet?`, `options` (4 strings), `correctIndex`, `explanation`, `tags`.
- **CodingQuestion**: `id`, `topicId`, `number`, `title`, `difficulty`, `problemStatement`, `inputFormat`, `outputFormat`, `constraints`, `sampleCases` (array of visible input/output/explanation), `hiddenCases` (array of input/output), `starterCode`, `solutionReference`.
- **UserProgress**:
  - `completedLessons`: `Record<topicId, string[]>`
  - `mcqBestScores`: `Record<topicId, { score: number, total: number, date: string, accuracy: number }>`
  - `solvedProblems`: `Record<topicId, string[]>`
  - `savedCode`: `Record<questionId, string>`
  - `streak`: `{ count: number, lastActiveDate: string }`

---

## 5. Phased Execution Roadmap

### Step 1: Design System & Core Framework
- Configure Tailwind CSS with dark neumorphic color tokens, shadow utilities, and custom font definitions.
- Implement reusable soft-UI library: `NeuCard`, `NeuButton`, `NeuIconButton`, `NeuInput`, `NeuToggle`, `NeuSegmented`, `NeuDropdown`, `NeuCheckbox`, `NeuRadio`, `NeuSlider`, `NeuProgressBar`, `NeuRing`, `NeuEqualizer`, and `NeuBadge`.
- Build navigation shell, sidebar, profile header, and main Dashboard with overall progress ring, streak tracker, 4 topic status cards, and equalizer score bars.
- Establish `storageService` and typed data models.

### Step 2: Reference Implementation ("Input and Output")
- Build complete **Learning Arena** for Input & Output (printf, scanf, format specifiers `%d`, `%f`, `%c`, `%s`, `%lf`, `%x`, `%p`, `getchar`/`putchar`, `gets`/`puts`/`fgets`, escape sequences `\n`, `\t`, `\r`, formatting flags, precision, field width, buffer flushing) with syntax highlighting, copy-to-clipboard, and scroll-spy TOC.
- Build complete **MCQ Check** with 50 unique questions (20 Easy, 20 Medium, 10 Hard) with code snippet evaluation, radio selection, 1-50 navigator palette, review tagging, stopwatch timer, score screen with equalizer bars, and full explanations.
- Build complete **Try With Code** with 25 progressive C programming challenges, split-screen Monaco editor with C syntax support, custom input runner, test-case evaluator (2 visible + 2 hidden test cases per problem), run/submit actions, and template reset.

### Step 3: Confirmation Gate
- Verify build and present Step 1 and Step 2 implementation for user confirmation before populating topics 2, 3, and 4.
