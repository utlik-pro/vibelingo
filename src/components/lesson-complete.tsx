import { Button } from "@/components/ui/button";
import { TOOLS, type Lesson } from "@/data/lessons";
import { Trophy, Star, ThumbsUp, Share2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useLessonContent } from "@/lib/use-lesson-content";

export function LessonComplete({
  lesson,
  xpEarned,
  correctCount,
  totalCount,
  onClose,
  onShare,
}: {
  lesson: Lesson;
  xpEarned: number;
  correctCount: number;
  totalCount: number;
  onClose: () => void;
  onShare: () => void;
}) {
  const { t } = useI18n();
  const { getTitle } = useLessonContent();
  const pct = Math.round((correctCount / totalCount) * 100);
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;

  const stats = [
    { label: t("lessonComplete.xpEarned"), value: `+${xpEarned}`, color: "text-purple-500" },
    { label: t("lessonComplete.accuracy"), value: `${pct}%`, color: pct >= 80 ? "text-green-500" : "text-amber-500" },
    { label: t("lessonComplete.correct"), value: `${correctCount}/${totalCount}`, color: "text-gray-900" },
    { label: t("lessonComplete.tool"), value: TOOLS[lesson.tool].name, color: "" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white p-6 animate-[fadeIn_0.5s_ease]">
      {/* Big icon */}
      <div className="mb-5 animate-[popIn_0.6s_ease]">
        <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center">
          {stars === 3 ? (
            <Trophy className="w-10 h-10 text-yellow-400" />
          ) : stars === 2 ? (
            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
          ) : (
            <ThumbsUp className="w-10 h-10 text-blue-400" />
          )}
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
        {stars === 3 ? t("lessonComplete.excellent") : stars === 2 ? t("lessonComplete.goodJob") : t("lessonComplete.canDoBetter")}
      </h2>
      <p className="text-sm text-gray-400 mb-6">{getTitle(lesson)}</p>

      {/* Stars */}
      <div className="flex gap-2.5 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="transition-all duration-300"
            style={{
              opacity: s <= stars ? 1 : 0.2,
              transform: s <= stars ? "scale(1)" : "scale(0.8)",
              animation: s <= stars ? `popIn 0.4s ease ${s * 0.15}s both` : "none",
            }}
          >
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px] mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 text-center rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(147,51,234,0.06)]">
            <div className={`text-xl font-extrabold ${stat.color}`}
              style={stat.label === t("lessonComplete.tool") ? { color: TOOLS[lesson.tool].color } : undefined}
            >
              {stat.value}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <Button
        onClick={onShare}
        className="w-full max-w-[280px] h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none mb-3 gap-2"
      >
        <Share2 className="w-4 h-4" />
        {t("lessonComplete.shareResult")}
      </Button>
      <Button
        variant="outline"
        onClick={onClose}
        className="w-full max-w-[280px] h-12 rounded-2xl text-sm font-semibold border-2 border-gray-100 text-gray-700 hover:bg-gray-50"
      >
        {t("lessonComplete.continueLearning")}
      </Button>
    </div>
  );
}
