import { supabase } from './supabase';
import { UserProgress, TopicId } from '../types';

const STORAGE_KEY = 'c_tracker_user_progress_v1';
const LOGIN_STREAK_VERSION = 1;

function getLocalDateString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const defaultProgress: UserProgress = {
  completedLessons: {},
  bookmarkedMCQs: {},
  mcqBestScores: {},
  solvedProblems: {},
  savedCode: {},
  streak: {
    count: 0,
    lastActiveDate: '',
  },
  loginStreakVersion: LOGIN_STREAK_VERSION,
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

    if (!uid || uid.startsWith('local_') || !supabase) {
      this.loadFromLocalStorage();
      isInitialized = true;
      notifyListeners();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', uid)
        .maybeSingle();
      if (error) throw error;

      if (data?.progress) {
        const remoteProgress = data.progress as Partial<UserProgress>;
        const isLegacyStreak = remoteProgress.loginStreakVersion !== LOGIN_STREAK_VERSION;
        inMemoryProgress = {
          ...defaultProgress,
          ...remoteProgress,
          streak: isLegacyStreak
            ? { ...defaultProgress.streak }
            : { ...defaultProgress.streak, ...remoteProgress.streak },
          loginStreakVersion: LOGIN_STREAK_VERSION,
        };
      } else {
        const local = this.loadFromLocalStorage();
        inMemoryProgress = local;
        await this.syncToSupabase(inMemoryProgress, true);
      }
    } catch (err) {
      console.error('Failed to load progress from Supabase; using local cache:', err);
      this.loadFromLocalStorage();
    }

    isInitialized = true;
    notifyListeners();
  },

  loadFromLocalStorage(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data) as Partial<UserProgress>;
        const isLegacyStreak = parsed.loginStreakVersion !== LOGIN_STREAK_VERSION;
        inMemoryProgress = {
          ...defaultProgress,
          ...parsed,
          streak: isLegacyStreak
            ? { ...defaultProgress.streak }
            : { ...defaultProgress.streak, ...parsed.streak },
          loginStreakVersion: LOGIN_STREAK_VERSION,
        };
      } else {
        inMemoryProgress = { ...defaultProgress };
      }
    } catch {
      inMemoryProgress = { ...defaultProgress };
    }
    return inMemoryProgress;
  },

  // Sync state to Supabase (debounced or immediate)
  async syncToSupabase(progress: UserProgress, immediate = false): Promise<void> {
    // Always mirror to localStorage for offline access
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // safe
    }

    const uid = currentUid;
    const client = supabase;
    if (!uid || uid.startsWith('local_') || !client) return;

    const doWrite = async () => {
      try {
        const { error } = await client.from('user_progress').upsert(
          {
            user_id: uid,
            progress: {
              completedLessons: progress.completedLessons,
              bookmarkedMCQs: progress.bookmarkedMCQs,
              mcqBestScores: progress.mcqBestScores,
              solvedProblems: progress.solvedProblems,
              savedCode: progress.savedCode,
              theme: progress.theme,
              timerEnabled: progress.timerEnabled,
              streak: progress.streak,
              loginStreakVersion: progress.loginStreakVersion,
            },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
        if (error) throw error;
      } catch (error) {
        console.error('Failed writing progress to Supabase:', error);
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
    this.syncToSupabase(progress, false);
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
    // Immediate save for lesson completion
    inMemoryProgress = progress;
    this.syncToSupabase(progress, true);
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
    this.syncToSupabase(progress, true);
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
    // Immediate save for MCQ attempt/score
    inMemoryProgress = progress;
    this.syncToSupabase(progress, true);
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
    this.syncToSupabase(progress, false);
    notifyListeners();
  },

  isProblemSolved(questionId: string): boolean {
    const progress = this.getProgress();
    return !!progress.solvedProblems[questionId];
  },

  markProblemSolved(questionId: string): void {
    const progress = this.getProgress();
    progress.solvedProblems[questionId] = true;
    // Immediate save on solved
    inMemoryProgress = progress;
    this.syncToSupabase(progress, true);
    notifyListeners();
  },

  getStreak(): number {
    const progress = this.getProgress();
    return progress.streak.count;
  },

  recordLogin(): void {
    const progress = this.getProgress();
    const today = getLocalDateString();
    if (progress.streak.lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    progress.streak = {
      count: progress.streak.lastActiveDate === getLocalDateString(yesterday)
        ? progress.streak.count + 1
        : 1,
      lastActiveDate: today,
    };
    progress.loginStreakVersion = LOGIN_STREAK_VERSION;
    inMemoryProgress = progress;
    void this.syncToSupabase(progress, true);
    notifyListeners();
  },

  setTheme(theme: 'dark' | 'light'): void {
    const progress = this.getProgress();
    progress.theme = theme;
    inMemoryProgress = progress;
    this.syncToSupabase(progress, true);
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
    this.syncToSupabase(progress, true);
    notifyListeners();
    return progress.timerEnabled;
  },

  resetAllProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
    inMemoryProgress = { ...defaultProgress };
    notifyListeners();
  },
};
