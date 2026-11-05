import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { UserProgress, TopicId } from '../types';

const STORAGE_KEY = 'c_tracker_user_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: {},
  bookmarkedMCQs: {},
  mcqBestScores: {},
  solvedProblems: {},
  savedCode: {},
  streak: {
    count: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  theme: 'dark',
  timerEnabled: false,
};

// In-memory cache of user progress to ensure synchronous instant UI response for existing components
let inMemoryProgress: UserProgress = defaultProgress;
let isInitialized = false;
let currentUid: string | null = null;
let saveDebounceTimer: any = null;

// Listeners for progress changes (to update UI if needed)
type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

export const storageService = {
  // Subscribe to storage updates
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Initialize service when user logs in or switches
  async initForUser(uid: string | null): Promise<void> {
    currentUid = uid;

    if (!uid || uid.startsWith('local_')) {
      // Local session / unauthenticated fallback: read from localStorage
      this.loadFromLocalStorage();
      isInitialized = true;
      notifyListeners();
      return;
    }

    try {
      // 1. Fetch remote user document in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userDocRef);

      let remoteStreak = { count: 1, lastActiveDate: new Date().toISOString().split('T')[0] };
      if (userSnap.exists()) {
        const uData = userSnap.data();
        if (uData.streak) {
          remoteStreak = {
            count: uData.streak,
            lastActiveDate: uData.lastActiveDate || remoteStreak.lastActiveDate,
          };
        }
      }

      // 2. Fetch progress summary doc
      const progressDocRef = doc(db, 'progress', uid);
      const progressSnap = await getDoc(progressDocRef);

      if (progressSnap.exists()) {
        const pData = progressSnap.data();
        inMemoryProgress = {
          ...defaultProgress,
          completedLessons: pData.completedLessons || {},
          bookmarkedMCQs: pData.bookmarkedMCQs || {},
          mcqBestScores: pData.mcqBestScores || {},
          solvedProblems: pData.solvedProblems || {},
          savedCode: pData.savedCode || {},
          streak: remoteStreak,
          theme: pData.theme || 'dark',
          timerEnabled: !!pData.timerEnabled,
        };
      } else {
        // First time user: One-time migration of existing localStorage progress into the new account!
        const local = this.loadFromLocalStorage();
        inMemoryProgress = {
          ...local,
          streak: remoteStreak,
        };

        // Write migrated progress to Firestore
        await this.syncToFirestore(inMemoryProgress, true);
      }
    } catch (err) {
      console.warn('Failed to load remote progress from Firestore, falling back to local cache:', err);
      this.loadFromLocalStorage();
    }

    isInitialized = true;
    notifyListeners();
  },

  loadFromLocalStorage(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        inMemoryProgress = { ...defaultProgress, ...parsed };
      } else {
        inMemoryProgress = { ...defaultProgress };
      }
    } catch {
      inMemoryProgress = { ...defaultProgress };
    }
    return inMemoryProgress;
  },

  // Sync state to Firestore (debounced or immediate)
  async syncToFirestore(progress: UserProgress, immediate = false): Promise<void> {
    // Always mirror to localStorage for offline access
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // safe
    }

    const uid = currentUid || auth.currentUser?.uid;
    if (!uid || uid.startsWith('local_')) return;

    const doWrite = async () => {
      try {
        const progressDocRef = doc(db, 'progress', uid);
        await setDoc(
          progressDocRef,
          {
            completedLessons: progress.completedLessons,
            bookmarkedMCQs: progress.bookmarkedMCQs,
            mcqBestScores: progress.mcqBestScores,
            solvedProblems: progress.solvedProblems,
            savedCode: progress.savedCode,
            theme: progress.theme,
            timerEnabled: progress.timerEnabled,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        // Also update streak on user doc
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, {
          streak: progress.streak.count,
          lastActiveDate: progress.streak.lastActiveDate,
        }).catch(() => {
          // ignore if user doc not ready
        });
      } catch (error) {
        console.error('Failed writing progress to Firestore:', error);
      }
    };

    if (immediate) {
      if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
      await doWrite();
    } else {
      if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
      saveDebounceTimer = setTimeout(doWrite, 800); // 800ms debounce
    }
  },

  getProgress(): UserProgress {
    if (!isInitialized) {
      this.loadFromLocalStorage();
    }
    return inMemoryProgress;
  },

  saveProgress(progress: UserProgress): void {
    inMemoryProgress = progress;
    this.syncToFirestore(progress, false);
    notifyListeners();
  },

  isLessonCompleted(topicId: string, sectionId: string): boolean {
    const progress = this.getProgress();
    return !!progress.completedLessons[`${topicId}:${sectionId}`];
  },

  toggleLessonCompleted(topicId: string, sectionId: string): boolean {
    const progress = this.getProgress();
    const key = `${topicId}:${sectionId}`;
    const newState = !progress.completedLessons[key];
    progress.completedLessons[key] = newState;
    this.updateStreakInternal(progress);
    // Immediate save for lesson completion
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    notifyListeners();
    return newState;
  },

  isMCQBookmarked(mcqId: string): boolean {
    const progress = this.getProgress();
    return !!progress.bookmarkedMCQs[mcqId];
  },

  toggleMCQBookmark(mcqId: string): boolean {
    const progress = this.getProgress();
    const current = !progress.bookmarkedMCQs[mcqId];
    progress.bookmarkedMCQs[mcqId] = current;
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    notifyListeners();
    return current;
  },

  saveMCQBestScore(
    topicId: TopicId,
    score: number,
    total: number,
    timeSeconds: number,
    difficultyBreakdown: {
      easy: { correct: number; total: number };
      medium: { correct: number; total: number };
      hard: { correct: number; total: number };
    }
  ): void {
    const progress = this.getProgress();
    const currentBest = progress.mcqBestScores[topicId];
    const accuracy = Math.round((score / total) * 100);

    if (!currentBest || score > currentBest.score) {
      progress.mcqBestScores[topicId] = {
        score,
        total,
        date: new Date().toISOString(),
        accuracy,
        timeSeconds,
        difficultyBreakdown,
      };
    }
    this.updateStreakInternal(progress);
    // Immediate save for MCQ attempt/score
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    notifyListeners();
  },

  getSavedCode(questionId: string, defaultCode: string): string {
    const progress = this.getProgress();
    return progress.savedCode[questionId] || defaultCode;
  },

  saveCode(questionId: string, code: string): void {
    const progress = this.getProgress();
    progress.savedCode[questionId] = code;
    inMemoryProgress = progress;
    // Debounced auto-save code
    this.syncToFirestore(progress, false);
    notifyListeners();
  },

  isProblemSolved(questionId: string): boolean {
    const progress = this.getProgress();
    return !!progress.solvedProblems[questionId];
  },

  markProblemSolved(questionId: string): void {
    const progress = this.getProgress();
    progress.solvedProblems[questionId] = true;
    this.updateStreakInternal(progress);
    // Immediate save on solved
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    notifyListeners();
  },

  getStreak(): number {
    const progress = this.getProgress();
    return progress.streak.count;
  },

  updateStreakInternal(progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0];
    if (progress.streak.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (progress.streak.lastActiveDate === yesterday) {
        progress.streak.count += 1;
      } else {
        progress.streak.count = 1;
      }
      progress.streak.lastActiveDate = today;
    }
  },

  setTheme(theme: 'dark' | 'light'): void {
    const progress = this.getProgress();
    progress.theme = theme;
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    notifyListeners();
  },

  getTheme(): 'dark' | 'light' {
    return this.getProgress().theme;
  },

  toggleTimer(): boolean {
    const progress = this.getProgress();
    progress.timerEnabled = !progress.timerEnabled;
    inMemoryProgress = progress;
    this.syncToFirestore(progress, true);
    notifyListeners();
    return progress.timerEnabled;
  },

  resetAllProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
    inMemoryProgress = { ...defaultProgress };
    notifyListeners();
  },
};
