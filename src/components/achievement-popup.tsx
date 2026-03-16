import { useEffect } from "react";
import { Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface AchievementPopupProps {
  badge: { name: string; icon: string };
  show: boolean;
  onClose: () => void;
}

export function AchievementPopup({ badge, show, onClose }: AchievementPopupProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-[150] flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[0_8px_32px_rgba(108,92,231,0.4)]"
      style={{ animation: 'achievementSlideUp 0.4s ease' }}
    >
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <Award className="w-5 h-5 text-yellow-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
          {t("achievement.unlocked")}
        </div>
        <div className="text-[14px] font-bold truncate">
          {badge.name}
        </div>
      </div>
    </div>
  );
}
