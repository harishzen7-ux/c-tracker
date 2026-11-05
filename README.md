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
  - Full Firebase Firestore + Firebase Authentication integration.
  - Internal mapping: username mapped to private `<username>@ctracker.local` with zero exposure of email to the user.
  - One-time automated migration of previous browser progress to newly registered cloud accounts.

---

## Firebase Setup & Environment Variables

### 1. Configuration
Firebase is provisioned via AI Studio into `firebase-applet-config.json` with Firestore Enterprise edition:

```json
{
  "projectId": "YOUR_PROJECT_ID",
  "appId": "YOUR_APP_ID",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "firestoreDatabaseId": "YOUR_DATABASE_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET"
}
```

Optional environment variables in `.env`:
```env
# Optional remote Judge0 API runner endpoint for C code execution
VITE_JUDGE0_URL=https://judge0-ce.p.rapidapi.com
VITE_JUDGE0_KEY=YOUR_OPTIONAL_KEY
```

---

## Firestore Database Structure & Security Rules

### Collections
1. **`/users/{userId}`**:
   - `username`, `usernameLower`, `createdAt`, `lastLoginAt`, `streak`, `lastActiveDate`, `lastVisited`
   - Read: Authenticated users.
   - Write: Only the owner (`request.auth.uid == userId`).
2. **`/usernames/{usernameLower}`**:
   - Unique username claims (`uid`, `createdAt`).
   - Read: Public for availability checking during signup.
   - Create: Only authenticated user creating their own claim with validation.
   - Update / Delete: Prohibited (immutable).
3. **`/progress/{userId}/topics/{topicId}`**:
   - Subcollections storing lesson completions, MCQ attempts, and solved challenge IDs.
   - Strict ABAC: Read & write exclusively restricted to the authenticated document owner.
4. **`/progress/{userId}/code/{questionId}`**:
   - Stores saved C code drafts and execution history per question.
   - Read & write exclusively restricted to the owner.

### Deployed Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow get: if isSignedIn();
      allow list: if isSignedIn() && resource.data.uid == request.auth.uid;
      allow create, update: if isOwner(userId);
    }

    match /usernames/{usernameLower} {
      allow get: if true;
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
    }

    match /progress/{userId} {
      allow read, write: if isOwner(userId);
      match /{allSubcollections=**} {
        allow read, write: if isOwner(userId);
      }
    }
  }
}
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
