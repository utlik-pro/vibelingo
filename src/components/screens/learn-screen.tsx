import { LESSONS_DATA, type Lesson } from "@/data/lessons";
import { Heart, Check, Play, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useLessonContent } from "@/lib/use-lesson-content";

interface LearnScreenProps {
  hearts: number;
  completedLessons: number[];
  onStartLesson: (lesson: Lesson) => void;
}

const MODULE_KEYS: Record<string, string> = {
  "Основы": "learn.modules.basics",
  "Инструменты": "learn.modules.tools",
  "Дизайн": "learn.modules.design",
  "Продвинутый": "learn.modules.advanced",
  "Монетизация": "learn.modules.monetization",
};

export function LearnScreen({ hearts, completedLessons, onStartLesson }: LearnScreenProps) {
  const { t } = useI18n();
  const { getTitle } = useLessonContent();
  const modules = ["Основы", "Инструменты", "Дизайн", "Продвинутый", "Монетизация"];

  return (
    <div className="px-5 py-4 bg-background min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[22px] font-extrabold text-foreground">{t("learn.title")}</h2>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className={`text-sm font-bold ${hearts <= 1 ? "text-red-500" : "text-gray-700"}`}>
            {hearts}/5
          </span>
        </div>
      </div>

      {modules.map((mod) => {
        const moduleLessons = LESSONS_DATA.filter((l) => l.module === mod);
        if (moduleLessons.length === 0) return null;

        return (
          <div key={mod} className="mb-8">
            {/* Module header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
              <span className="text-xs font-bold text-purple-500 tracking-[2px] uppercase px-2">
                {t(MODULE_KEYS[mod] || mod)}
              </span>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-purple-200 to-transparent" />
            </div>

            {/* Vertical path */}
            <div className="flex flex-col items-center relative">
              {moduleLessons.map((lesson, i) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const prevCompleted = i === 0 || completedLessons.includes(moduleLessons[i - 1]?.id);
                const firstModuleCompleted =
                  mod === "Основы" ||
                  LESSONS_DATA.filter((l) => l.module === "Основы").every((l) =>
                    completedLessons.includes(l.id)
                  );
                const isLocked = !isCompleted && (!prevCompleted || (mod !== "Основы" && !firstModuleCompleted));
                const isAvailable = !isCompleted && !isLocked;

                // Zigzag offset: alternate left and right
                const offset = i % 2 === 0 ? -40 : 40;

                return (
                  <div key={lesson.id} className="relative flex flex-col items-center">
                    {/* Connecting dashed line */}
                    {i > 0 && (
                      <div
                        className="w-0 h-10 border-l-[3px] border-dashed"
                        style={{
                          borderColor: isLocked ? "#d1d5db" : "#a78bfa",
                        }}
                      />
                    )}

                    {/* Node + label row */}
                    <div
                      className="flex items-center gap-4 transition-all duration-300"
                      style={{ transform: `translateX(${offset}px)` }}
                    >
                      {/* Circle node */}
                      <button
                        onClick={() => !isLocked && onStartLesson(lesson)}
                        disabled={isLocked}
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-none cursor-pointer transition-all duration-200 ${
                          isCompleted
                            ? "bg-purple-500 shadow-[0_4px_16px_rgba(147,51,234,0.3)]"
                            : isAvailable
                            ? "bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_4px_20px_rgba(147,51,234,0.4)] animate-pulse"
                            : "bg-gray-200 cursor-not-allowed"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : isAvailable ? (
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>

                      {/* Lesson title */}
                      <div className="min-w-[140px]">
                        <div
                          className={`text-[14px] font-semibold ${
                            isLocked ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {getTitle(lesson)}
                        </div>
                        <div className={`text-[12px] ${isLocked ? "text-gray-300" : "text-muted-foreground"}`}>
                          +{lesson.xp} XP
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
