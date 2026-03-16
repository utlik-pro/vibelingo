export interface User {
  id: string;
  name: string;
  username?: string;
  photoUrl?: string;
  isPro: boolean;
}

export interface UserProgress {
  xp: number;
  streak: number;
  hearts: number;
  completedLessons: number[];
  earnedBadges: string[];
  dailyGoal: { target: number; done: number };
  isPro: boolean;
  locale: string;
}
