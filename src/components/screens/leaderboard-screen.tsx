import { XPCounter } from "@/components/xp-counter";
import { LEAGUES, LEADERBOARD_DATA } from "@/data/lessons";
import { Flame, User, ArrowUp, ArrowDown, Circle, Star, Globe, Sparkles, Crown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface LeaderboardScreenProps {
  userXP: number;
  streak: number;
}

export function LeaderboardScreen({ userXP, streak }: LeaderboardScreenProps) {
  const { t } = useI18n();
  const currentLeague = LEAGUES.reduce((prev, l) => (userXP >= l.xpNeeded ? l : prev), LEAGUES[0]);

  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <div className="px-5 py-4 bg-background min-h-full">
      <div className="sticky top-0 z-10 bg-background pb-3">
      <h2 className="text-[22px] font-extrabold text-foreground mb-1.5">{t("leaderboard.title")}</h2>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <span>{t("leaderboard.subtitle")}</span>
        <span>
          {(() => {
            const leagueIconMap: Record<string, React.ReactNode> = {
              Circle: <Circle className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
              Star: <Star className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
              Globe: <Globe className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
              Flame: <Flame className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
              Sparkles: <Sparkles className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
              Crown: <Crown className="w-3.5 h-3.5 inline" style={{ color: currentLeague.color }} />,
            };
            return leagueIconMap[currentLeague.icon] || null;
          })()}
        </span>
        <span>{currentLeague.name} {t("home.league")}</span>
      </p>
      </div>

      {/* Your position */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border-l-4 border-purple-500 shadow-[0_2px_16px_rgba(147,51,234,0.1)] mb-5 animate-[slideIn_0.3s_ease]">
        <div className="w-6 text-sm font-extrabold text-purple-500 text-center">8</div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-foreground">{t("leaderboard.you")}</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">{userXP} XP <Flame className="w-3 h-3 text-orange-400" />{streak}</div>
        </div>
        <XPCounter xp={userXP} />
      </div>

      {/* Rankings */}
      <div className="flex flex-col gap-2">
        {LEADERBOARD_DATA.map((user, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all animate-[slideIn_0.3s_ease_both] bg-card ${
              i < 3 ? "border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : ""
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Position number or medal */}
            <div className="w-7 flex justify-center">
              {i < 3 ? (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                  style={{ backgroundColor: medalColors[i] }}
                >
                  {i + 1}
                </div>
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">{i + 1}</span>
              )}
            </div>

            {/* Avatar circle with initials */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                backgroundColor: `hsl(${(i * 47 + 200) % 360}, 60%, 55%)`,
              }}
            >
              {user.avatar}
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">{user.name}</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-400" />{user.streak}
              </div>
            </div>
            <span className="text-sm font-bold text-purple-500">{user.xp}</span>
          </div>
        ))}
      </div>

      {/* Promotion zones */}
      <div className="mt-5 p-4 rounded-2xl bg-green-50 border border-green-100">
        <div className="text-xs text-green-600 font-semibold flex items-center gap-1.5">
          <ArrowUp className="w-3.5 h-3.5" /> {t("leaderboard.promotionZone")}
        </div>
      </div>
      <div className="mt-2 p-4 rounded-2xl bg-red-50 border border-red-100">
        <div className="text-xs text-red-500 font-semibold flex items-center gap-1.5">
          <ArrowDown className="w-3.5 h-3.5" /> {t("leaderboard.demotionZone")}
        </div>
      </div>
    </div>
  );
}
