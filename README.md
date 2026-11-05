# C Tracker — Phase 1: Skill Updation

A modern, production-grade web application built with React, TypeScript, and a dark neumorphism (soft-UI) aesthetic designed for tracking and testing C programming mastery.

## Features

- **Dark Neumorphic Soft-UI System**: Deep charcoal surfaces (`#2a2d32`), dual shadows (top-left light reflection + bottom-right drop), glowing amber-orange highlights (`#FF7A1A`), and high-contrast light theme toggle.
- **Phase 1 Pillars**:
  1. Input and Output (6 structured lessons, 50 MCQs, 25 coding challenges)
  2. Operators and Expressions (5 structured lessons, 50 MCQs, 25 coding challenges)
  3. Decision Making Statements (5 structured lessons, 50 MCQs, 25 coding challenges)
  4. Looping (5 structured lessons, 50 MCQs, 25 coding challenges)
  - Total: 21 structured lessons, 200 MCQs, 100 coding challenges with starter templates and test cases.
- **Routing & Public Pages**:
  - `/` — Streamlined single-screen Landing page with live metric preview and feature strip.
  - `/login` & `/signup` — Pure username + password authentication with live availability checks, password strength rules, and brute-force lockout.
- **Protected Curriculum**:
  - `/dashboard` — Master dashboard with 70% circular progress ring, equalizer breakdown, and topic cards.
  - `/topic/:topicId` — Topic arena featuring Learning Arena, MCQ Check, and Try with Code.
- **Database & Cloud Persistence**:
  - Supabase Authentication and Postgres persistence with row-level security.
  - Username-based sign-in uses a private `<username>@ctracker.local` address internally.
  - Existing browser progress is copied to the cloud the first time a user signs in.
  - Without Supabase environment variables, accounts and progress stay in the current browser.

---

## Supabase Setup & Environment Variables

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor.
2. In **Authentication → Providers → Email**, disable email confirmations. This app uses username-only accounts with an internal, non-deliverable email address.
3. Copy the project URL and anon/public key from the Supabase project API settings into `.env`:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Optional remote Judge0 API runner endpoint for C code execution
VITE_JUDGE0_URL=https://judge0-ce.p.rapidapi.com
VITE_JUDGE0_KEY=YOUR_OPTIONAL_KEY
```

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to view the Landing Page or sign in with your username.
