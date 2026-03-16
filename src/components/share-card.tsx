import { Button } from "@/components/ui/button";
import { LEAGUES } from "@/data/lessons";
import { Zap, Flame, BookOpen, Circle, Star, Globe, Crown, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ShareCard({
  xp,
  streak,
  league,
  lessonsCompleted,
  onClose,
}: {
  xp: number;
  streak: number;
  league: string;
  lessonsCompleted: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const leagueData = LEAGUES.find((l) => l.id === league);

  const leagueIconMap: Record<string, React.ReactNode> = {
    Circle: <Circle className="w-5 h-5" />,
    Star: <Star className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Crown: <Crown className="w-5 h-5" />,
  };

  const stats = [
    { icon: <Zap className="w-5 h-5 text-purple-500" />, label: "XP", value: xp },
    { icon: <Flame className="w-5 h-5 text-orange-400" />, label: t("common.streak"), value: t("share.streakDays", { n: streak }) },
    { icon: leagueData ? leagueIconMap[leagueData.icon] : <Circle className="w-5 h-5" />, label: t("share.league"), value: leagueData?.name || "Mercury" },
    { icon: <BookOpen className="w-5 h-5 text-blue-400" />, label: t("share.lessons"), value: lessonsCompleted },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-[fadeIn_0.3s_ease]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[320px] rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className="px-6 pt-8 pb-6 bg-gradient-to-br from-purple-500 to-purple-600 text-center">
          <div className="text-sm font-semibold text-white/70 mb-1 tracking-[2px] uppercase">
            VIBELINGO
          </div>
          <div className="text-[28px] font-extrabold text-white">
            {t("share.myProgress")}
          </div>
        </div>

        {/* Stats */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-50 text-center">
                <div className="flex justify-center mb-1">{s.icon}</div>
                <div className="text-lg font-extrabold text-gray-900">{s.value}</div>
                <div className="text-[11px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 text-center">
          <div className="text-xs text-gray-400 mb-2">{t("share.learnFree")}</div>
          <div className="text-sm font-bold text-purple-500 font-mono">t.me/vibelingo_bot</div>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onClose}
        className="mt-4 text-white/70 hover:text-white hover:bg-white/10"
      >
        {t("share.close")}
      </Button>
    </div>
  );
}
