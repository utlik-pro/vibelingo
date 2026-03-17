import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import "./index.css";
import type { Lesson } from "@/data/lessons";
import { LEAGUES } from "@/data/lessons";

import { LandingPage } from "@/components/screens/landing-page";
import { OnboardingScreen } from "@/components/screens/onboarding";
import { HomeScreen } from "@/components/screens/home-screen";
import { LearnScreen } from "@/components/screens/learn-screen";
import { LessonScreen } from "@/components/screens/lesson-screen";
import { BattleScreen } from "@/components/screens/battle-screen";
import { ProfileScreen } from "@/components/screens/profile-screen";
import { LessonComplete } from "@/components/lesson-complete";
import { ShareCard } from "@/components/share-card";
import { BottomNav } from "@/components/bottom-nav";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { loadUserProgress, saveUserProgress } from "@/lib/db";
import { playCorrectSound, playWrongSound, playLevelUpSound } from "@/lib/sounds";
import { Confetti } from "@/components/confetti";
import { hapticNotification } from "@/lib/haptics";
import { HomeScreenSkeleton } from "@/components/skeleton";
import { DailyReward } from "@/components/daily-reward";
import { AchievementPopup } from "@/components/achievement-popup";
import { getLastRewardDate, setLastRewardDate, getRewardStreak, setRewardStreak } from "@/lib/storage";
import { BADGES } from "@/data/lessons";

// Lazy-loaded screens
const BattlePlayScreen = lazy(() => import("@/components/screens/battle-play-screen").then(m => ({ default: m.BattlePlayScreen })));
const CertificateScreen = lazy(() => import("@/components/screens/certificate-screen").then(m => ({ default: m.CertificateScreen })));
const PracticeScreen = lazy(() => import("@/components/screens/practice-screen").then(m => ({ default: m.PracticeScreen })));
const PaymentScreen = lazy(() => import("@/components/payment-screen").then(m => ({ default: m.PaymentScreen })));
const LeaderboardScreen = lazy(() => import("@/components/screens/leaderboard-screen").then(m => ({ default: m.LeaderboardScreen })));

export default function App() {
  const { user } = useAuth();
  const { locale } = useI18n();

  // Show landing page in regular browser (not Telegram)
  const isTelegram = !!window.Telegram?.WebApp?.initDataUnsafe?.user;
  const isBrowser = !isTelegram && !window.Telegram?.WebApp;
  const skipLanding = new URLSearchParams(window.location.search).get('app') === 'true';

  if (isBrowser && !skipLanding && !localStorage.getItem('vibelingo_skip_landing')) {
    return <LandingPage />;
  }

  const initializedRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState("home");
  const [userXP, setUserXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showXPDelta, setShowXPDelta] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState({ target: 3, done: 0 });
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [battleActive, setBattleActive] = useState(false);
  const [showCertificates, setShowCertificates] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [rewardDay, setRewardDay] = useState(1);
  const [achievementBadge, setAchievementBadge] = useState<{ name: string; icon: string } | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when screen changes
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [screen]);

  // Telegram BackButton management
  const tgBackButton = window.Telegram?.WebApp?.BackButton;

  const handleBack = useCallback(() => {
    if (showPayment) { setShowPayment(false); return; }
    if (showShare) { setShowShare(false); return; }
    if (showCertificates) { setShowCertificates(false); return; }
    if (showComplete) { setShowComplete(false); setScreen("learn"); return; }
    if (battleActive) { setBattleActive(false); return; }
    if (screen === "lesson" && currentLesson) { setScreen("learn"); setCurrentLesson(null); return; }
    if (screen !== "home") { setScreen("home"); return; }
  }, [showPayment, showShare, showCertificates, showComplete, battleActive, screen, currentLesson]);

  useEffect(() => {
    if (!tgBackButton) return;

    const needsBack = screen !== "home" || showPayment || showShare || showCertificates || showComplete || battleActive;

    if (needsBack && !showOnboarding) {
      tgBackButton.show();
      tgBackButton.onClick(handleBack);
    } else {
      tgBackButton.hide();
    }

    return () => {
      tgBackButton.offClick(handleBack);
    };
  }, [screen, showPayment, showShare, showCertificates, showComplete, battleActive, showOnboarding, handleBack, tgBackButton]);

  // Load progress from database on mount
  useEffect(() => {
    let cancelled = false;
    loadUserProgress(user.id).then((progress) => {
      if (cancelled) return;
      setUserXP(progress.xp);
      setStreak(progress.streak);
      setHearts(progress.hearts);
      setCompletedLessons(progress.completedLessons);
      setEarnedBadges(progress.earnedBadges);
      setDailyGoal(progress.dailyGoal);
      if (progress.xp > 0 || progress.completedLessons.length > 0) {
        setShowOnboarding(false);
      }
      initializedRef.current = true;
      setIsLoading(false);

      // Check daily reward
      const lastReward = getLastRewardDate(user.id);
      const today = new Date().toDateString();
      if (lastReward !== today) {
        const currentStreak = getRewardStreak(user.id);
        // Check if yesterday was claimed to continue streak
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = lastReward === yesterday ? currentStreak + 1 : 1;
        setRewardDay(newStreak);
        setShowDailyReward(true);
      }
    });
    return () => { cancelled = true; };
  }, [user.id]);

  // Regenerate hearts over time (1 heart per 30 min, max 5)
  useEffect(() => {
    if (hearts >= 5) return;
    const timer = setInterval(() => {
      setHearts((h) => Math.min(h + 1, 5));
    }, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(timer);
  }, [hearts]);

  // Debounced save progress whenever state changes
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSave = useCallback(() => {
    if (!initializedRef.current) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      void saveUserProgress(user.id, {
        xp: userXP,
        streak,
        hearts,
        completedLessons,
        earnedBadges,
        dailyGoal,
        isPro: user.isPro,
        locale,
      });
    }, 1000);
  }, [userXP, streak, hearts, completedLessons, earnedBadges, dailyGoal, user.id, user.isPro, locale]);

  useEffect(() => {
    debouncedSave();
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [debouncedSave]);

  const currentLeague = LEAGUES.reduce((prev, l) => (userXP >= l.xpNeeded ? l : prev), LEAGUES[0]);

  const startLesson = (lesson: Lesson) => {
    if (hearts <= 0 && !user.isPro) {
      // No hearts left — show payment screen to upgrade or wait
      setShowPayment(true);
      return;
    }
    setCurrentLesson(lesson);
    setCurrentStep(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setScreen("lesson");
  };

  const handleAnswer = (answerIdx: number) => {
    if (answered || !currentLesson) return;
    setSelectedAnswer(answerIdx);
    setAnswered(true);
    const step = currentLesson.steps[currentStep];
    const correctIdx = typeof step.correct === "number" ? step.correct : step.options?.indexOf(step.correct as unknown as string) ?? -1;

    let isCorrect = false;
    if (step.type === "order") {
      isCorrect = answerIdx === 0;
    } else {
      isCorrect = answerIdx === correctIdx;
    }

    if (isCorrect) {
      setCorrectAnswers((c) => c + 1);
      playCorrectSound();
      hapticNotification('success');
    } else {
      playWrongSound();
      hapticNotification('error');
    }

    if (!isCorrect && !user.isPro) {
      // PRO users have unlimited hearts
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setTimeout(() => {
          setScreen("learn");
          setCurrentLesson(null);
        }, 1500);
      }
    }
  };

  const nextStep = () => {
    if (!currentLesson) return;
    if (currentStep < currentLesson.steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      const xpEarned = currentLesson.xp;
      setUserXP((x) => x + xpEarned);
      setShowXPDelta(true);
      setTimeout(() => setShowXPDelta(false), 2000);
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons((c) => [...c, currentLesson.id]);
      }
      setDailyGoal((g) => ({ ...g, done: Math.min(g.done + 1, g.target) }));
      setShowComplete(true);
      playLevelUpSound();
      hapticNotification('success');

      // Check for new badges
      const newBadges = [...earnedBadges];
      let newBadgeEarned: { name: string; icon: string } | null = null;

      // first_landing: completed lesson 1
      if (currentLesson.id === 1 && !newBadges.includes("first_landing")) {
        newBadges.push("first_landing");
        const badge = BADGES.find((b) => b.id === "first_landing");
        if (badge) newBadgeEarned = { name: badge.name, icon: badge.icon };
      }

      // streak_7: streak >= 7
      if (streak >= 7 && !newBadges.includes("streak_7")) {
        newBadges.push("streak_7");
        const badge = BADGES.find((b) => b.id === "streak_7");
        if (badge) newBadgeEarned = { name: badge.name, icon: badge.icon };
      }

      if (newBadges.length > earnedBadges.length) {
        setEarnedBadges(newBadges);
        if (newBadgeEarned) {
          setTimeout(() => {
            setAchievementBadge(newBadgeEarned);
            setShowAchievement(true);
          }, 1500);
        }
      }
    }
  };

  const interactiveSteps = currentLesson?.steps.filter((s) => s.type !== "info") || [];
  const totalInteractive = interactiveSteps.length;

  const handleClaimReward = (xp: number) => {
    setUserXP((x) => x + xp);
    setLastRewardDate(user.id);
    setRewardStreak(user.id, rewardDay);
    setShowDailyReward(false);
    hapticNotification('success');
  };

  // Google Fonts
  const fontLink = (
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  );

  if (isLoading) {
    return (
      <>
        {fontLink}
        <div className="min-h-screen bg-background font-sans tg-safe-top">
          <HomeScreenSkeleton />
        </div>
      </>
    );
  }

  if (showOnboarding) {
    return (
      <>
        {fontLink}
        <OnboardingScreen onStart={() => setShowOnboarding(false)} />
      </>
    );
  }

  if (screen === "lesson" && currentLesson) {
    if (showComplete) {
      return (
        <>
          {fontLink}
          <Confetti show={showComplete} />
          <LessonComplete
            lesson={currentLesson}
            xpEarned={currentLesson.xp}
            correctCount={correctAnswers}
            totalCount={totalInteractive}
            onClose={() => {
              setShowComplete(false);
              setScreen("learn");
            }}
            onShare={() => {
              setShowComplete(false);
              setShowShare(true);
            }}
          />
        </>
      );
    }

    return (
      <>
        {fontLink}
        <LessonScreen
          lesson={currentLesson}
          currentStep={currentStep}
          answered={answered}
          selectedAnswer={selectedAnswer}
          hearts={hearts}
          onAnswer={handleAnswer}
          onNextStep={nextStep}
          onClose={() => setScreen("learn")}
        />
      </>
    );
  }

  if (showCertificates) {
    return (
      <>
        {fontLink}
        <Suspense fallback={<HomeScreenSkeleton />}>
          <CertificateScreen
            completedLessons={completedLessons}
            onClose={() => setShowCertificates(false)}
          />
        </Suspense>
      </>
    );
  }

  if (battleActive) {
    return (
      <>
        {fontLink}
        <Suspense fallback={<HomeScreenSkeleton />}>
          <BattlePlayScreen
            onClose={() => setBattleActive(false)}
            onXPEarned={(xp) => {
              setUserXP((x) => x + xp);
              setShowXPDelta(true);
              setTimeout(() => setShowXPDelta(false), 2000);
            }}
          />
        </Suspense>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans tg-safe-top">
      {fontLink}

      {showShare && (
        <ShareCard
          xp={userXP}
          streak={streak}
          league={currentLeague.id}
          lessonsCompleted={completedLessons.length}
          onClose={() => setShowShare(false)}
        />
      )}

      {showPayment && (
        <Suspense fallback={<HomeScreenSkeleton />}>
          <PaymentScreen onClose={() => setShowPayment(false)} />
        </Suspense>
      )}

      <div ref={scrollRef} key={screen} style={{ animation: 'screenFadeIn 0.25s ease' }} className="flex-1 overflow-y-auto pb-[72px]">
        {screen === "home" && (
          <HomeScreen
            userXP={userXP}
            streak={streak}
            showXPDelta={showXPDelta}
            dailyGoal={dailyGoal}
            completedLessons={completedLessons}
            earnedBadges={earnedBadges}
            onNavigate={setScreen}
          />
        )}
        {screen === "learn" && (
          <LearnScreen
            hearts={hearts}
            completedLessons={completedLessons}
            onStartLesson={startLesson}
          />
        )}
        {screen === "leaderboard" && (
          <Suspense fallback={<HomeScreenSkeleton />}>
            <LeaderboardScreen userXP={userXP} streak={streak} />
          </Suspense>
        )}
        {screen === "practice" && (
          <Suspense fallback={<HomeScreenSkeleton />}>
            <PracticeScreen
              onXPEarned={(xp) => {
                setUserXP((x) => x + xp);
                setShowXPDelta(true);
                setTimeout(() => setShowXPDelta(false), 2000);
              }}
            />
          </Suspense>
        )}
        {screen === "battle" && <BattleScreen onStartBattle={() => setBattleActive(true)} />}
        {screen === "profile" && (
          <ProfileScreen
            userXP={userXP}
            streak={streak}
            completedLessons={completedLessons}
            earnedBadges={earnedBadges}
            onShare={() => setShowShare(true)}
            onUpgrade={() => setShowPayment(true)}
            onViewCertificates={() => setShowCertificates(true)}
          />
        )}
      </div>

      <BottomNav screen={screen} onNavigate={setScreen} />

      {showDailyReward && (
        <DailyReward
          day={rewardDay}
          onClaim={handleClaimReward}
          onClose={() => setShowDailyReward(false)}
        />
      )}

      <AchievementPopup
        badge={achievementBadge || { name: "", icon: "" }}
        show={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </div>
  );
}
