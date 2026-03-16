import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const REWARD_XP = [10, 15, 20, 25, 30, 40, 50];

interface DailyRewardProps {
  onClaim: (xp: number) => void;
  onClose: () => void;
  day: number;
}

export function DailyReward({ onClaim, onClose, day }: DailyRewardProps) {
  const { t } = useI18n();
  const dayIndex = ((day - 1) % 7);
  const xp = REWARD_XP[dayIndex];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 animate-[fadeIn_0.3s_ease]">
      <div className="w-[300px] rounded-3xl p-6 text-center bg-gradient-to-b from-purple-600 to-purple-800 shadow-[0_16px_48px_rgba(108,92,231,0.4)]">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-[popIn_0.5s_ease]">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-white mb-1">
          {t("dailyReward.title")}
        </h2>
        <p className="text-sm text-white/70 mb-4">
          {t("dailyReward.day", { n: day })}
        </p>

        <div className="mb-2">
          <span className="text-5xl font-extrabold text-yellow-300 animate-[popIn_0.6s_ease_0.2s_both]">
            +{xp}
          </span>
        </div>
        <p className="text-sm text-white/80 mb-6">{t("dailyReward.xpBonus")}</p>

        {/* Day indicators */}
        <div className="flex justify-center gap-1.5 mb-6">
          {REWARD_XP.map((rxp, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                i < dayIndex
                  ? "bg-white/30 text-white"
                  : i === dayIndex
                  ? "bg-yellow-300 text-purple-900"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {rxp}
            </div>
          ))}
        </div>

        <Button
          onClick={() => onClaim(xp)}
          className="w-full h-12 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-purple-900 text-[15px] font-extrabold border-none shadow-[0_4px_16px_rgba(250,204,21,0.4)]"
        >
          {t("dailyReward.claim")}
        </Button>
        <button
          onClick={onClose}
          className="mt-3 text-sm text-white/50 bg-transparent border-none cursor-pointer"
        >
          {t("share.close")}
        </button>
      </div>
    </div>
  );
}
