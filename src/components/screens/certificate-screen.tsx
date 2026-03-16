import { Award, Lock, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { LESSONS_DATA } from "@/data/lessons";

interface CertificateScreenProps {
  completedLessons: number[];
  onClose: () => void;
}

// Get unique modules and their lesson IDs
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

export function CertificateScreen({ completedLessons, onClose }: CertificateScreenProps) {
  const { t } = useI18n();
  const modules = getModules();

  return (
    <div className="px-5 py-4 bg-white min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 animate-[fadeIn_0.3s_ease]">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-[22px] font-extrabold text-gray-900">{t("certificates.title")}</h1>
      </div>

      <div className="space-y-4">
        {modules.map((mod, i) => {
          const completedCount = mod.lessonIds.filter((id) => completedLessons.includes(id)).length;
          const totalCount = mod.lessonIds.length;
          const isCompleted = completedCount === totalCount;
          const progressPercent = Math.round((completedCount / totalCount) * 100);

          return (
            <div
              key={mod.name}
              className="rounded-2xl overflow-hidden border-2 animate-[slideIn_0.4s_ease_both]"
              style={{
                animationDelay: `${i * 80}ms`,
                borderColor: isCompleted ? "#D8B4FE" : "#F3F4F6",
              }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4"
                style={{
                  background: isCompleted
                    ? "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)"
                    : "linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Award className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-5 h-5 text-white/70" />
                    )}
                    <span className="text-white font-bold text-[15px]">{mod.name}</span>
                  </div>
                  {isCompleted && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                      {t("certificates.earned")}
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 bg-white">
                {isCompleted ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] text-gray-500 mb-1">{t("certificates.complete")}</p>
                      <p className="text-[14px] font-semibold text-gray-900">
                        {completedCount}/{totalCount} {t("profile.lessons").toLowerCase()}
                      </p>
                    </div>
                    <Button
                      onClick={() => alert(t("certificates.download"))}
                      variant="outline"
                      className="h-9 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold text-[13px] gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      {t("certificates.download")}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] text-gray-500">{t("certificates.locked")}</p>
                      <span className="text-[13px] font-semibold text-gray-400">
                        {t("certificates.progress", { percent: String(progressPercent) })}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gray-300 transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[12px] text-gray-400 mt-2">
                      {completedCount}/{totalCount} {t("profile.lessons").toLowerCase()}
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
