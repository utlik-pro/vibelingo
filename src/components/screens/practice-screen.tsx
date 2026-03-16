import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Eye, Send, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PRACTICE_CHALLENGES, type PracticeChallenge } from "@/data/practice-challenges";
import { TOOLS } from "@/data/lessons";

interface PracticeScreenProps {
  onXPEarned: (xp: number) => void;
}

function DifficultyBadge({ difficulty }: { difficulty: PracticeChallenge["difficulty"] }) {
  const { t } = useI18n();
  const colors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colors[difficulty]}`}>
      {t(`difficulty.${difficulty}`)}
    </span>
  );
}

function ChallengeDetail({
  challenge,
  onSubmit,
  onBack,
}: {
  challenge: PracticeChallenge;
  onSubmit: (xp: number) => void;
  onBack: () => void;
}) {
  const { t, locale } = useI18n();
  const [prompt, setPrompt] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = locale === "ru" ? challenge.titleRu : challenge.title;
  const description = locale === "ru" ? challenge.descriptionRu : challenge.description;
  const hints = locale === "ru" ? challenge.hintsRu : challenge.hints;
  const examplePrompt = locale === "ru" ? challenge.examplePromptRu : challenge.examplePrompt;
  const tool = TOOLS[challenge.tool];

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setSubmitted(true);
    onSubmit(challenge.xpReward);
  };

  if (submitted) {
    return (
      <div className="px-5 py-4 bg-white min-h-full flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-[fadeIn_0.4s_ease]">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-2 animate-[fadeIn_0.4s_ease_0.1s_both]">
          {t("practice.submitted")}
        </h2>
        <p className="text-[15px] text-gray-500 mb-6 animate-[fadeIn_0.4s_ease_0.2s_both]">
          {t("practice.xpEarned", { xp: String(challenge.xpReward) })}
        </p>
        <Button
          onClick={onBack}
          className="h-12 px-8 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none animate-[fadeIn_0.4s_ease_0.3s_both]"
        >
          {t("battle.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 bg-white min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 animate-[fadeIn_0.3s_ease]">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] font-extrabold text-gray-900 truncate">{title}</h2>
        </div>
      </div>

      {/* Challenge info */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-5 animate-[slideIn_0.4s_ease_both]">
        <div className="flex items-center gap-2 mb-3">
          <DifficultyBadge difficulty={challenge.difficulty} />
          {tool && (
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
              {tool.name}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
            +{challenge.xpReward} XP
          </span>
        </div>
        <p className="text-[14px] text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Hints section */}
      <div className="mb-5 animate-[slideIn_0.4s_ease_0.1s_both]">
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-2xl bg-amber-50 border border-amber-100 text-left cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="text-[13px] font-semibold text-amber-700 flex-1">
            {t("practice.showHints")}
          </span>
          {showHints ? (
            <ChevronUp className="w-4 h-4 text-amber-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-amber-400" />
          )}
        </button>
        {showHints && (
          <div className="mt-2 px-4 py-3 rounded-2xl bg-amber-50/50 border border-amber-100/50">
            {hints.map((hint, i) => (
              <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                <span className="text-[12px] text-amber-400 mt-0.5">{i + 1}.</span>
                <span className="text-[13px] text-amber-700">{hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prompt textarea */}
      <div className="mb-4 animate-[slideIn_0.4s_ease_0.2s_both]">
        <label className="text-[13px] font-bold text-gray-400 tracking-wider uppercase mb-2 block">
          {t("practice.writePrompt")}
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t("battle.promptPlaceholder")}
          className="w-full h-36 p-4 rounded-2xl border-2 border-gray-100 bg-white text-[14px] text-gray-900 placeholder:text-gray-300 focus:border-purple-300 focus:outline-none resize-none transition-colors"
        />
      </div>

      {/* Show example button */}
      <div className="mb-5 animate-[slideIn_0.4s_ease_0.25s_both]">
        <button
          onClick={() => setShowExample(!showExample)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-100 text-[13px] font-semibold text-purple-600 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          {t("practice.showExample")}
        </button>
        {showExample && (
          <div className="mt-2 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50">
            <p className="text-[13px] text-purple-700 leading-relaxed">{examplePrompt}</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={!prompt.trim()}
        className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none gap-2 disabled:opacity-40 animate-[slideIn_0.4s_ease_0.3s_both]"
      >
        <Send className="w-4 h-4" />
        {t("practice.submit")}
      </Button>
    </div>
  );
}

export function PracticeScreen({ onXPEarned }: PracticeScreenProps) {
  const { t, locale } = useI18n();
  const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("vibelingo_practice_completed");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (xp: number) => {
    if (selectedChallenge && !completedIds.includes(selectedChallenge.id)) {
      const newCompleted = [...completedIds, selectedChallenge.id];
      setCompletedIds(newCompleted);
      try {
        localStorage.setItem("vibelingo_practice_completed", JSON.stringify(newCompleted));
      } catch {
        // ignore
      }
    }
    onXPEarned(xp);
  };

  if (selectedChallenge) {
    return (
      <ChallengeDetail
        challenge={selectedChallenge}
        onSubmit={handleSubmit}
        onBack={() => setSelectedChallenge(null)}
      />
    );
  }

  return (
    <div className="px-5 py-4 bg-white min-h-full">
      {/* Header */}
      <div className="mb-5 animate-[fadeIn_0.3s_ease]">
        <h1 className="text-[22px] font-extrabold text-gray-900 mb-1">{t("practice.title")}</h1>
        <p className="text-[13px] text-gray-400">{t("practice.subtitle")}</p>
      </div>

      {/* Challenge cards */}
      <div className="space-y-3">
        {PRACTICE_CHALLENGES.map((challenge, i) => {
          const title = locale === "ru" ? challenge.titleRu : challenge.title;
          const tool = TOOLS[challenge.tool];
          const isCompleted = completedIds.includes(challenge.id);

          return (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className="w-full p-4 rounded-2xl bg-white border-2 text-left transition-all cursor-pointer animate-[slideIn_0.4s_ease_both] hover:shadow-[0_4px_16px_rgba(147,51,234,0.1)]"
              style={{
                animationDelay: `${i * 60}ms`,
                borderColor: isCompleted ? "#D8B4FE" : "#F3F4F6",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <DifficultyBadge difficulty={challenge.difficulty} />
                    {tool && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                        {tool.name}
                      </span>
                    )}
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-1 truncate">{title}</h3>
                </div>
                <span className="text-[13px] font-bold text-purple-500 whitespace-nowrap">
                  +{challenge.xpReward} XP
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
