import { Badge } from "@/components/ui/badge";
import { TOOLS, type Lesson } from "@/data/lessons";
import { ChevronRight, Lock, Check, Heart, MousePointer, Terminal, Zap, Triangle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useLessonContent } from "@/lib/use-lesson-content";

const diffColors: Record<string, string> = {
  beginner: "text-green-600 bg-green-50 border-green-200",
  intermediate: "text-amber-600 bg-amber-50 border-amber-200",
  advanced: "text-red-600 bg-red-50 border-red-200",
};
const DIFF_KEYS: Record<string, string> = {
  beginner: "difficulty.beginner",
  intermediate: "difficulty.intermediate",
  advanced: "difficulty.advanced",
};
const MODULE_KEYS: Record<string, string> = {
  "Основы": "learn.modules.basics",
  "Инструменты": "learn.modules.tools",
  "Дизайн": "learn.modules.design",
  "Продвинутый": "learn.modules.advanced",
  "Монетизация": "learn.modules.monetization",
};

export function LessonCard({
  lesson,
  completed,
  locked,
  onStart,
  index,
}: {
  lesson: Lesson;
  completed: boolean;
  locked: boolean;
  onStart: (lesson: Lesson) => void;
  index: number;
}) {
  const { t } = useI18n();
  const { getTitle } = useLessonContent();
  const tool = TOOLS[lesson.tool];

  return (
    <div
      className={`flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer transition-all duration-200 animate-[slideIn_0.4s_ease_both] bg-card border ${
        locked
          ? "opacity-40 cursor-not-allowed border-border"
          : completed
          ? "border-purple-200 shadow-[0_2px_12px_rgba(147,51,234,0.1)]"
          : "border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(147,51,234,0.1)] hover:border-purple-200"
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => !locked && onStart(lesson)}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
          completed
            ? "bg-purple-500 text-white"
            : "bg-muted/50"
        }`}
      >
        {locked ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : completed ? (
          <Check className="w-5 h-5" />
        ) : (
          (() => {
            const iconMap: Record<string, React.ReactNode> = {
              Heart: <Heart className="w-5 h-5" style={{ color: tool.color }} />,
              MousePointer: <MousePointer className="w-5 h-5" style={{ color: tool.color }} />,
              Terminal: <Terminal className="w-5 h-5" style={{ color: tool.color }} />,
              Zap: <Zap className="w-5 h-5" style={{ color: tool.color }} />,
              Triangle: <Triangle className="w-5 h-5" style={{ color: tool.color }} />,
            };
            return iconMap[tool.icon] || null;
          })()
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-0.5">
          {t(MODULE_KEYS[lesson.module] || lesson.module)}
        </div>
        <div className="text-[15px] font-semibold text-foreground mb-1 truncate">
          {getTitle(lesson)}
        </div>
        <div className="flex gap-2 items-center">
          <Badge
            variant="secondary"
            className={`text-[10px] font-bold px-1.5 py-0 h-auto rounded border ${diffColors[lesson.difficulty]}`}
          >
            {t(DIFF_KEYS[lesson.difficulty])}
          </Badge>
          <span className="text-[11px] text-muted-foreground">+{lesson.xp} XP</span>
        </div>
      </div>

      {/* Arrow */}
      {!locked && !completed && (
        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
      )}
    </div>
  );
}
