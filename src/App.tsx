import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import type { Lesson } from "@/data/lessons";
import { LEAGUES } from "@/data/lessons";

import { OnboardingScreen } from "@/components/screens/onboarding";
import { HomeScreen } from "@/components/screens/home-screen";
import { LearnScreen } from "@/components/screens/learn-screen";
import { LessonScreen } from "@/components/screens/lesson-screen";
import { LeaderboardScreen } from "@/components/screens/leaderboard-screen";
import { BattleScreen } from "@/components/screens/battle-screen";
import { BattlePlayScreen } from "@/components/screens/battle-play-screen";
import { ProfileScreen } from "@/components/screens/profile-screen";
import { CertificateScreen } from "@/components/screens/certificate-screen";
import { PracticeScreen } from "@/components/screens/practice-screen";
import { LessonComplete } from "@/components/lesson-complete";
import { ShareCard } from "@/components/share-card";
import { PaymentScreen } from "@/components/payment-screen";
import { BottomNav } from "@/components/bottom-nav";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { loadUserProgress, saveUserProgress } from "@/lib/db";
import { playCorrectSound, playWrongSound, playLevelUpSound } from "@/lib/sounds";
import { Confetti } from "@/components/confetti";

export default function App() {
  const { user } = useAuth();
  const { locale } = useI18n();
  const initializedRef = useRef(false);

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
    } else {
      playWrongSound();
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
    }
  };

  const interactiveSteps = currentLesson?.steps.filter((s) => s.type !== "info") || [];
  const totalInteractive = interactiveSteps.length;

  // Google Fonts
  const fontLink = (
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  );

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
        <CertificateScreen
          completedLessons={completedLessons}
          onClose={() => setShowCertificates(false)}
        />
      </>
    );
  }

  if (battleActive) {
    return (
      <>
        {fontLink}
        <BattlePlayScreen
          onClose={() => setBattleActive(false)}
          onXPEarned={(xp) => {
            setUserXP((x) => x + xp);
            setShowXPDelta(true);
            setTimeout(() => setShowXPDelta(false), 2000);
          }}
        />
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

      {showPayment && <PaymentScreen onClose={() => setShowPayment(false)} />}

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-[72px]">
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
          <LeaderboardScreen userXP={userXP} streak={streak} />
        )}
        {screen === "practice" && (
          <PracticeScreen
            onXPEarned={(xp) => {
              setUserXP((x) => x + xp);
              setShowXPDelta(true);
              setTimeout(() => setShowXPDelta(false), 2000);
            }}
          />
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
    </div>
  );
}
