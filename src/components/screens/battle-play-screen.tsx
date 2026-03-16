import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Swords, Trophy, XCircle, ArrowLeft, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BATTLE_CHALLENGES } from "@/data/battle-challenges";
import { OPPONENTS, type Opponent } from "@/data/opponents";

type Stage = "searching" | "vs" | "battle" | "results";

interface BattlePlayScreenProps {
  onClose: () => void;
  onXPEarned: (xp: number) => void;
}

export function BattlePlayScreen({ onClose, onXPEarned }: BattlePlayScreenProps) {
  const { t, locale } = useI18n();

  const [stage, setStage] = useState<Stage>("searching");
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const [challenge] = useState(() => BATTLE_CHALLENGES[Math.floor(Math.random() * BATTLE_CHALLENGES.length)]);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userText, setUserText] = useState("");
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [showEvaluating, setShowEvaluating] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const opponentTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stage 1: Searching for opponent
  useEffect(() => {
    if (stage !== "searching") return;
    const delay = 2000 + Math.random() * 1500;
    const timer = setTimeout(() => {
      const randomOpponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
      setOpponent(randomOpponent);
      setStage("vs");
    }, delay);
    return () => clearTimeout(timer);
  }, [stage]);

  // Stage 2: VS screen countdown
  useEffect(() => {
    if (stage !== "vs") return;
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeLeft(challenge.timeLimit);
          setStage("battle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, challenge.timeLimit]);

  // Stage 3: Battle timer
  useEffect(() => {
    if (stage !== "battle") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Opponent fake progress
  useEffect(() => {
    if (stage !== "battle") return;
    setOpponentProgress(0);
    opponentTimerRef.current = setInterval(() => {
      setOpponentProgress((prev) => {
        const increment = 2 + Math.random() * 5;
        const next = Math.min(prev + increment, 95 + Math.random() * 5);
        return next;
      });
    }, 800 + Math.random() * 400);
    return () => {
      if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
    };
  }, [stage]);

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
    setStage("results");
    setShowEvaluating(true);

    setTimeout(() => {
      setShowEvaluating(false);
      const text = userText.trim();

      // Score the prompt quality (0-100)
      let score = 0;

      // Empty = automatic lose
      if (text.length === 0) {
        score = 0;
      } else {
        // Length: short prompts are weak (need at least 30 chars for decent)
        if (text.length < 10) score += 5;
        else if (text.length < 30) score += 15;
        else if (text.length < 80) score += 30;
        else if (text.length < 150) score += 40;
        else score += 50;

        // Word count: more detail = better
        const words = text.split(/\s+/).filter(Boolean).length;
        if (words >= 5) score += 10;
        if (words >= 15) score += 10;
        if (words >= 30) score += 10;

        // Keywords that show prompt quality
        const qualityKeywords = [
          "color", "цвет", "font", "шрифт", "layout", "design", "дизайн",
          "section", "секция", "button", "кнопка", "header", "hero",
          "responsive", "адаптив", "mobile", "мобил", "dark", "тёмн", "темн",
          "animation", "анимац", "gradient", "градиент", "shadow", "тень",
          "margin", "padding", "flex", "grid", "tailwind", "react",
          "component", "компонент", "style", "стиль", "minimal", "минимал",
          "modern", "современ", "clean", "чист",
        ];
        const lowerText = text.toLowerCase();
        const matchedKeywords = qualityKeywords.filter((kw) => lowerText.includes(kw));
        score += Math.min(matchedKeywords.length * 5, 30);

        // Penalty for gibberish (same char repeated, keyboard mashing)
        const uniqueChars = new Set(text.toLowerCase().replace(/\s/g, "")).size;
        if (uniqueChars < 5) score = Math.max(score - 30, 5);
      }

      // Compare against opponent skill (0-100)
      const opponentScore = (opponent?.skill ?? 50) + (Math.random() * 20 - 10);
      const didWin = score > opponentScore;

      // XP: full if win, 25% if lose with effort, 0 if empty
      let earned = 0;
      if (didWin) {
        earned = challenge.xpReward;
      } else if (text.length > 0) {
        earned = Math.floor(challenge.xpReward * 0.25);
      }

      setResult(didWin ? "win" : "lose");
      setXpEarned(earned);
      if (earned > 0) onXPEarned(earned);
    }, 2000);
  }, [userText, challenge.xpReward, onXPEarned]);

  const handlePlayAgain = () => {
    setStage("searching");
    setOpponent(null);
    setCountdown(3);
    setTimeLeft(0);
    setUserText("");
    setOpponentProgress(0);
    setResult(null);
    setXpEarned(0);
    setShowEvaluating(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const challengeTitle = locale === "ru" ? challenge.titleRu : challenge.title;
  const challengeDescription = locale === "ru" ? challenge.descriptionRu : challenge.description;

  // Stage 1: Searching
  if (stage === "searching") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 tg-safe-top">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center animate-pulse">
            <Swords className="w-10 h-10 text-purple-500" />
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
            <span className="text-lg font-semibold text-foreground">{t("battle.searching")}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">{t("battle.searchingDesc")}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-12 text-sm text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
        >
          {t("battle.cancel")}
        </button>
      </div>
    );
  }

  // Stage 2: VS screen
  if (stage === "vs" && opponent) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 tg-safe-top">
        <p className="text-sm font-semibold text-purple-500 mb-8">{challengeTitle}</p>

        <div className="flex items-center gap-6 mb-10">
          {/* You */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-600">
              {t("battle.you").charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-foreground">{t("battle.you")}</span>
          </div>

          <span className="text-2xl font-extrabold text-muted-foreground">{t("battle.vs")}</span>

          {/* Opponent */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: opponent.avatarColor }}
            >
              {opponent.avatar}
            </div>
            <span className="text-sm font-semibold text-foreground">{opponent.name}</span>
          </div>
        </div>

        <div className="text-6xl font-extrabold text-purple-500 animate-bounce">
          {countdown > 0 ? countdown : t("battle.go")}
        </div>
      </div>
    );
  }

  // Stage 3: Battle in progress
  if (stage === "battle" && opponent) {
    const urgency = timeLeft <= 30;
    return (
      <div className="min-h-screen bg-background flex flex-col px-5 py-4 tg-safe-top">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div
            className={`text-3xl font-extrabold tabular-nums ${urgency ? "text-red-500 animate-pulse" : "text-purple-500"}`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="w-9" />
        </div>

        {/* Challenge info */}
        <div className="rounded-2xl bg-purple-50 p-4 mb-4">
          <h3 className="text-[15px] font-bold text-foreground mb-1">{challengeTitle}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{challengeDescription}</p>
        </div>

        {/* Opponent progress */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: opponent.avatarColor }}
          >
            {opponent.avatar}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-muted-foreground">{opponent.name}</span>
              <span className="text-xs text-muted-foreground">{Math.round(opponentProgress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-500 transition-all duration-700"
                style={{ width: `${Math.min(opponentProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* User text area */}
        <div className="flex-1 flex flex-col mb-4">
          <label className="text-xs font-semibold text-muted-foreground mb-2">{t("battle.writePrompt")}</label>
          <textarea
            className="flex-1 min-h-[160px] p-4 rounded-2xl border border-border bg-card text-sm text-foreground resize-none focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-muted-foreground"
            placeholder={t("battle.promptPlaceholder")}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none gap-2"
        >
          <Send className="w-4 h-4" />
          {t("battle.submit")}
        </Button>
      </div>
    );
  }

  // Stage 4: Results
  if (stage === "results" && opponent) {
    if (showEvaluating) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 tg-safe-top">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
          <span className="text-lg font-semibold text-foreground">{t("battle.evaluating")}</span>
        </div>
      );
    }

    const isWin = result === "win";

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 tg-safe-top">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${isWin ? "bg-green-50" : "bg-red-50"}`}
          >
            {isWin ? (
              <Trophy className="w-10 h-10 text-green-500" />
            ) : (
              <XCircle className="w-10 h-10 text-red-400" />
            )}
          </div>
          <h2 className={`text-2xl font-extrabold ${isWin ? "text-green-600" : "text-red-500"}`}>
            {isWin ? t("battle.youWin") : t("battle.youLose")}
          </h2>
        </div>

        {/* XP earned */}
        <div className="rounded-2xl bg-purple-50 px-8 py-5 text-center mb-6">
          <span className="text-sm text-muted-foreground">{t("battle.xpEarned")}</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">+{xpEarned} XP</div>
        </div>

        {/* Opponent info */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted-foreground">{t("battle.vs")}</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: opponent.avatarColor }}
          >
            {opponent.avatar}
          </div>
          <span className="text-sm font-semibold text-foreground">{opponent.name}</span>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={handlePlayAgain}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none"
          >
            {t("battle.playAgain")}
          </Button>
          <button
            onClick={onClose}
            className="w-full h-12 rounded-2xl text-[15px] font-semibold text-muted-foreground hover:bg-muted transition-colors bg-transparent border border-border cursor-pointer"
          >
            {t("battle.back")}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
