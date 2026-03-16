// Functions that work with Supabase, with localStorage fallback when Supabase is not configured

import { supabase } from './supabase'
import { loadProgress, saveProgress } from './storage'
import type { UserProgress } from './types'

const isSupabaseConfigured = (): boolean => {
  return supabase !== null
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  hearts: 5,
  completedLessons: [],
  earnedBadges: [],
  dailyGoal: { target: 3, done: 0 },
  isPro: false,
  locale: 'en',
}

// Upsert user
export async function upsertUser(user: {
  id: string
  name: string
  username?: string
  photoUrl?: string
}): Promise<void> {
  if (!isSupabaseConfigured()) return

  try {
    const { error } = await supabase!.from('users').upsert(
      {
        id: user.id,
        name: user.name,
        username: user.username ?? null,
        photo_url: user.photoUrl ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    if (error) {
      console.warn('Failed to upsert user in Supabase:', error.message)
    }
  } catch (err) {
    console.warn('Failed to upsert user in Supabase:', err)
  }
}

// Load progress - try Supabase first, fallback to localStorage
export async function loadUserProgress(userId: string): Promise<UserProgress> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase!
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!error && data) {
        return {
          xp: data.xp ?? 0,
          streak: data.streak ?? 0,
          hearts: data.hearts ?? 5,
          completedLessons: data.completed_lessons ?? [],
          earnedBadges: data.earned_badges ?? [],
          dailyGoal: {
            target: data.daily_goal_target ?? 3,
            done: data.daily_goal_done ?? 0,
          },
          isPro: false, // isPro comes from user/auth, not progress
          locale: 'en',
        }
      }

      // If no row found (PGRST116), fall through to localStorage
      if (error && error.code !== 'PGRST116') {
        console.warn('Failed to load progress from Supabase:', error.message)
      }
    } catch (err) {
      console.warn('Failed to load progress from Supabase:', err)
    }
  }

  // Fallback to localStorage
  return loadProgress(userId)
}

// Save progress - save to both Supabase and localStorage
export async function saveUserProgress(
  userId: string,
  progress: UserProgress
): Promise<void> {
  // Always save to localStorage as backup
  saveProgress(userId, progress)

  if (!isSupabaseConfigured()) return

  try {
    const { error } = await supabase!.from('user_progress').upsert(
      {
        user_id: userId,
        xp: progress.xp,
        streak: progress.streak,
        hearts: progress.hearts,
        completed_lessons: progress.completedLessons,
        earned_badges: progress.earnedBadges,
        daily_goal_target: progress.dailyGoal.target,
        daily_goal_done: progress.dailyGoal.done,
        last_activity_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    if (error) {
      console.warn('Failed to save progress to Supabase:', error.message)
    }
  } catch (err) {
    console.warn('Failed to save progress to Supabase:', err)
  }
}

// Save battle result
export async function saveBattleResult(
  userId: string,
  result: {
    challengeId: number
    opponentName: string
    userPrompt: string
    won: boolean
    xpEarned: number
  }
): Promise<void> {
  if (!isSupabaseConfigured()) return

  try {
    const { error } = await supabase!.from('battle_results').insert({
      user_id: userId,
      challenge_id: result.challengeId,
      opponent_name: result.opponentName,
      user_prompt: result.userPrompt,
      won: result.won,
      xp_earned: result.xpEarned,
    })
    if (error) {
      console.warn('Failed to save battle result to Supabase:', error.message)
    }
  } catch (err) {
    console.warn('Failed to save battle result to Supabase:', err)
  }
}

// Update pro status
export async function updateProStatus(
  userId: string,
  isPro: boolean,
  stripeCustomerId?: string
): Promise<void> {
  if (!isSupabaseConfigured()) return

  try {
    const updateData: Record<string, unknown> = {
      is_pro: isPro,
      updated_at: new Date().toISOString(),
    }
    if (stripeCustomerId) {
      updateData.stripe_customer_id = stripeCustomerId
    }

    const { error } = await supabase!
      .from('users')
      .update(updateData)
      .eq('id', userId)

    if (error) {
      console.warn('Failed to update pro status in Supabase:', error.message)
    }
  } catch (err) {
    console.warn('Failed to update pro status in Supabase:', err)
  }
}

export { DEFAULT_PROGRESS }
