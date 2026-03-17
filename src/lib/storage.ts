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

export function loadProgress(userId: string): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userId);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UserProgress>;
      return { ...DEFAULT_PROGRESS, ...parsed };
    }
  } catch {
    console.warn("Failed to load progress from localStorage");
  }
  return { ...DEFAULT_PROGRESS };
}
