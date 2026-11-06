import { supabase } from './supabase';
import { UserProgress, TopicId } from '../types';

const STORAGE_KEY = 'c_tracker_user_progress_v1';
const LOGIN_STREAK_VERSION = 1;
const THEME_PREFERENCE_VERSION = 1;

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
  themePreferenceVersion: THEME_PREFERENCE_VERSION,
  theme: 'dark',
  timerEnabled: false,
  learningArena: {},
};

function createDefaultProgress(): UserProgress {
  return {
    ...defaultProgress,
    completedLessons: {},
    bookmarkedMCQs: {},
    mcqBestScores: {},
    solvedProblems: {},
    savedCode: {},
    learningArena: {},
    streak: { ...defaultProgress.streak },
  };
}

// In-memory cache of user progress to ensure synchronous instant UI response for existing components
let inMemoryProgress: UserProgress = createDefaultProgress();
let isInitialized = false;
let currentUid: string | null = null;
let cloudReadyUid: string | null = null;
let initializationId = 0;
let saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

// Listeners for progress changes (to update UI if needed)
type Listener = () => void;
const listeners = new Set<Listener>();

function progressStorageKey(uid: string | null): string {
  return uid ? `${STORAGE_KEY}:${uid}` : STORAGE_KEY;
}

function normalizeProgress(parsed: Partial<UserProgress>): UserProgress {
  const isLegacyStreak = parsed.loginStreakVersion !== LOGIN_STREAK_VERSION;
  const hasSavedThemePreference = parsed.themePreferenceVersion === THEME_PREFERENCE_VERSION;
  return {
    ...createDefaultProgress(),
    ...parsed,
    completedLessons: { ...parsed.completedLessons },
    bookmarkedMCQs: { ...parsed.bookmarkedMCQs },
    mcqBestScores: { ...parsed.mcqBestScores },
    solvedProblems: { ...parsed.solvedProblems },
    savedCode: { ...parsed.savedCode },
    learningArena: { ...parsed.learningArena },
    theme: hasSavedThemePreference ? parsed.theme ?? defaultProgress.theme : 'dark',
    streak: isLegacyStreak
      ? createDefaultProgress().streak
      : { ...defaultProgress.streak, ...parsed.streak },
    loginStreakVersion: LOGIN_STREAK_VERSION,
    themePreferenceVersion: THEME_PREFERENCE_VERSION,
  };
}

function readProgress(key: string): UserProgress | null {
  try {
    const data = localStorage.getItem(key);
    return data ? normalizeProgress(JSON.parse(data) as Partial<UserProgress>) : null;
  } catch {
    return null;
  }
}

function writeLocalProgress(uid: string | null, progress: UserProgress): void {
  try {
    localStorage.setItem(progressStorageKey(uid), JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to cache progress in this browser:', error);
  }
}

function progressPayload(progress: UserProgress) {
  return {
    completedLessons: progress.completedLessons,
    bookmarkedMCQs: progress.bookmarkedMCQs,
    mcqBestScores: progress.mcqBestScores,
    solvedProblems: progress.solvedProblems,
    savedCode: progress.savedCode,
    theme: progress.theme,
    themePreferenceVersion: progress.themePreferenceVersion,
    timerEnabled: progress.timerEnabled,
    learningArena: progress.learningArena,
    streak: progress.streak,
    loginStreakVersion: progress.loginStreakVersion,
  };
}

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
    if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
    saveDebounceTimer = null;
    const thisInitialization = ++initializationId;
    currentUid = uid;
    cloudReadyUid = null;
    this.loadFromLocalStorage(uid);
    isInitialized = true;
    notifyListeners();

    if (!uid || uid.startsWith('local_') || !supabase) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', uid)
        .maybeSingle();
      if (error) throw error;
      if (thisInitialization !== initializationId) return;

      if (data?.progress) {
        inMemoryProgress = normalizeProgress(data.progress as Partial<UserProgress>);
        writeLocalProgress(uid, inMemoryProgress);
      } else {
        const scopedProgress = readProgress(progressStorageKey(uid));
        const legacyProgress = scopedProgress ? null : readProgress(STORAGE_KEY);
        inMemoryProgress = scopedProgress ?? legacyProgress ?? createDefaultProgress();
        await this.writeProgressToSupabase(uid, inMemoryProgress);
        if (thisInitialization !== initializationId) return;
        if (legacyProgress) localStorage.removeItem(STORAGE_KEY);
      }
      cloudReadyUid = uid;
    } catch (err) {
      if (thisInitialization !== initializationId) return;
      console.error('Failed to load progress from Supabase; cloud writes are paused:', err);
      inMemoryProgress = readProgress(progressStorageKey(uid)) ?? createDefaultProgress();
    }

    isInitialized = true;
    notifyListeners();
  },

  loadFromLocalStorage(uid: string | null = currentUid): UserProgress {
    const key = progressStorageKey(uid);
    const scopedProgress = readProgress(key);
    const legacyProgress = uid && !uid.startsWith('local_') ? null : (
      scopedProgress ? null : readProgress(STORAGE_KEY)
    );
    inMemoryProgress = scopedProgress ?? legacyProgress ?? createDefaultProgress();

    if (uid && legacyProgress) {
      writeLocalProgress(uid, legacyProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
    return inMemoryProgress;
  },

  // Sync state to Supabase (debounced or immediate)
  async syncToSupabase(progress: UserProgress, immediate = false): Promise<void> {
    // Always mirror to localStorage for offline access
    const uid = currentUid;
    writeLocalProgress(uid, progress);
    const client = supabase;
    if (!uid || uid.startsWith('local_') || !client || cloudReadyUid !== uid) return;

    const doWrite = async () => {
      if (currentUid !== uid || cloudReadyUid !== uid) return;
      try {
        await this.writeProgressToSupabase(uid, progress);
      } catch (error) {
        console.error('Failed writing progress to Supabase:', error);
      }
    };

    if (immediate) {
      if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
      await doWrite();
    } else {
      if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
      saveDebounceTimer = setTimeout(() => {
        saveDebounceTimer = null;
        void doWrite();
      }, 800); // 800ms debounce
    }
  },

  async writeProgressToSupabase(uid: string, progress: UserProgress): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: uid,
        progress: progressPayload(progress),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
    if (error) throw error;
    writeLocalProgress(uid, progress);
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

  getConceptLearningProgress(topicId: string, sectionId: string) {
    const progress = this.getProgress();
    return progress.learningArena[`${topicId}:${sectionId}`] ?? {
      completedStages: {},
      currentStage: 'understand' as const,
      bestCheckScore: 0,
      mastered: false,
    };
  },

  saveConceptLearningProgress(
    topicId: string,
    sectionId: string,
    conceptProgress: UserProgress['learningArena'][string],
  ): void {
    const progress = this.getProgress();
    progress.learningArena[`${topicId}:${sectionId}`] = conceptProgress;
    inMemoryProgress = progress;
    void this.syncToSupabase(progress, true);
    notifyListeners();
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
    progress.themePreferenceVersion = THEME_PREFERENCE_VERSION;
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
    localStorage.removeItem(progressStorageKey(currentUid));
    inMemoryProgress = createDefaultProgress();
    void this.syncToSupabase(inMemoryProgress, true);
    notifyListeners();
  },
};
