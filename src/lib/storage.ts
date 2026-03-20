import type { UserProgress } from "./types";

const STORAGE_PREFIX = "vibelingo_progress_";

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  hearts: 5,
  completedLessons: [],
  earnedBadges: [],
  dailyGoal: { target: 3, done: 0 },
  isPro: false,
  locale: "en",
};

export function saveProgress(userId: string, data: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(data));
  } catch {
    console.warn("Failed to save progress to localStorage");
  }
}

export function getLastRewardDate(userId: string): string | null {
  return localStorage.getItem(`vibelingo_last_reward_${userId}`);
}
export function setLastRewardDate(userId: string) {
  localStorage.setItem(`vibelingo_last_reward_${userId}`, new Date().toDateString());
}
export function getRewardStreak(userId: string): number {
  return parseInt(localStorage.getItem(`vibelingo_reward_streak_${userId}`) || '0');
}
export function setRewardStreak(userId: string, streak: number) {
  localStorage.setItem(`vibelingo_reward_streak_${userId}`, String(streak));
}

export function getStreakFreezeUsed(userId: string): string | null {
  return localStorage.getItem(`vibelingo_streak_freeze_${userId}`);
}
export function useStreakFreeze(userId: string) {
  localStorage.setItem(`vibelingo_streak_freeze_${userId}`, new Date().toISOString());
}
export function canUseStreakFreeze(userId: string): boolean {
  const lastUsed = getStreakFreezeUsed(userId);
  if (!lastUsed) return true;
  const diff = Date.now() - new Date(lastUsed).getTime();
  return diff > 7 * 24 * 60 * 60 * 1000; // 7 days
}

export function getActivityDates(userId: string): string[] {
  const key = `vibelingo_activity_${userId}`;
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

export function recordActivity(userId: string) {
  const dates = getActivityDates(userId);
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (!dates.includes(today)) {
    dates.push(today);
    localStorage.setItem(`vibelingo_activity_${userId}`, JSON.stringify(dates));
  }
}

export function calculateStreak(userId: string): number {
  const dates = getActivityDates(userId);
  if (dates.length === 0) return 0;

  // Sort dates descending
  const sorted = [...dates].sort().reverse();

  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(d);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // Streak must include today or yesterday
  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;

  let streak = 0;
  let checkDate = new Date(d);
  // If most recent is yesterday, start from yesterday
  if (sorted[0] !== todayStr) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  const dateSet = new Set(sorted);
  for (let i = 0; i < 365; i++) {
    const check = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    if (dateSet.has(check)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function loadProgress(userId: string): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userId);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UserProgress>;
      const progress = { ...DEFAULT_PROGRESS, ...parsed };
      // Reset hearts and daily goal each new day
      const today = new Date().toDateString();
      const lastOpen = localStorage.getItem(`vibelingo_last_open_${userId}`);
      if (lastOpen !== today) {
        progress.hearts = 5;
        progress.dailyGoal = { ...progress.dailyGoal, done: 0 };
        localStorage.setItem(`vibelingo_last_open_${userId}`, today);
      }
      return progress;
    }
  } catch {
    console.warn("Failed to load progress from localStorage");
  }
  localStorage.setItem(`vibelingo_last_open_${userId}`, new Date().toDateString());
  return { ...DEFAULT_PROGRESS };
}
