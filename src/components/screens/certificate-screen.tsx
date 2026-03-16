import { Award, Lock, Download, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { LESSONS_DATA } from "@/data/lessons";

interface CertificateScreenProps {
  completedLessons: number[];
  onClose: () => void;
}

const MODULE_KEYS: Record<string, string> = {
  "Основы": "learn.modules.basics",
  "Инструменты": "learn.modules.tools",
  "Дизайн": "learn.modules.design",
  "Продвинутый": "learn.modules.advanced",
  "Монетизация": "learn.modules.monetization",
};

const MODULE_COLORS = [
  { gradient: "from-purple-500 to-indigo-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", bar: "bg-purple-400" },
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", bar: "bg-blue-400" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", bar: "bg-orange-400" },
  { gradient: "from-red-500 to-pink-500", bg: "bg-red-50", border: "border-red-200", text: "text-red-600", bar: "bg-red-400" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", border: "border-green-200", text: "text-green-600", bar: "bg-green-400" },
];

function getModules() {
  const moduleMap = new Map<string, number[]>();
  for (const lesson of LESSONS_DATA) {
    const ids = moduleMap.get(lesson.module) || [];
    ids.push(lesson.id);
    moduleMap.set(lesson.module, ids);
  }
  return Array.from(moduleMap.entries()).map(([name, lessonIds]) => ({
    name,
    lessonIds,
  }));
}

export function CertificateScreen({ completedLessons, onClose: _onClose }: CertificateScreenProps) {
  const { t } = useI18n();
  const modules = getModules();
  void _onClose;

  const totalCompleted = modules.filter(
    (mod) => mod.lessonIds.every((id) => completedLessons.includes(id))
  ).length;

  return (
    <div className="px-5 py-4 bg-background min-h-full tg-safe-top">
      {/* Header */}
      <div className="mb-6 animate-[fadeIn_0.3s_ease]">
        <h1 className="text-[24px] font-extrabold text-foreground mb-1">{t("certificates.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {totalCompleted}/{modules.length} {t("certificates.earned").toLowerCase()}
        </p>
      </div>

      {/* Trophy card if any completed */}
      {totalCompleted > 0 && (
        <div className="mb-5 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 flex items-center gap-4 animate-[slideIn_0.4s_ease]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-200">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-amber-800">{totalCompleted} {totalCompleted === 1 ? "certificate" : "certificates"}</div>
            <div className="text-xs text-amber-600">{t("certificates.complete")}</div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {modules.map((mod, i) => {
          const colors = MODULE_COLORS[i % MODULE_COLORS.length];
          const completedCount = mod.lessonIds.filter((id) => completedLessons.includes(id)).length;
          const totalCount = mod.lessonIds.length;
          const isCompleted = completedCount === totalCount;
          const progressPercent = Math.round((completedCount / totalCount) * 100);
          const moduleName = t(MODULE_KEYS[mod.name] || mod.name);

          return (
            <div
              key={mod.name}
              className={`rounded-2xl overflow-hidden border-2 animate-[slideIn_0.4s_ease_both] ${
                isCompleted ? colors.border : "border-border"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Card header */}
              <div
                className={`px-5 py-4 ${
                  isCompleted
                    ? `bg-gradient-to-r ${colors.gradient}`
                    : `${colors.bg}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <Award className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className={`w-5 h-5 ${colors.text} opacity-50`} />
                    )}
                    <span className={`font-bold text-[16px] ${isCompleted ? "text-white" : colors.text}`}>
                      {moduleName}
                    </span>
                  </div>
                  {isCompleted && (
                    <span className="px-3 py-1 rounded-full bg-white/25 text-white text-[11px] font-bold backdrop-blur-sm">
                      {t("certificates.earned")}
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 bg-card">
                {isCompleted ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {completedCount}/{totalCount} lessons
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t("certificates.complete")}</p>
                    </div>
                    <Button
                      onClick={() => alert("PDF certificate coming soon!")}
                      variant="outline"
                      className={`h-9 rounded-xl border-2 ${colors.border} ${colors.text} hover:${colors.bg} font-semibold text-[13px] gap-1.5`}
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-[13px] text-muted-foreground">{t("certificates.locked")}</p>
                      <span className={`text-[13px] font-bold ${progressPercent > 0 ? colors.text : "text-muted-foreground"}`}>
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progressPercent > 0 ? colors.bar : ""} transition-all duration-1000 ease-out`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">
                      {completedCount}/{totalCount} lessons
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
