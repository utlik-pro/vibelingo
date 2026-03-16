import { StreakBadge } from "@/components/streak-badge";
import { XPCounter } from "@/components/xp-counter";
import { ProgressRing } from "@/components/progress-ring";
import { BADGES, LEAGUES } from "@/data/lessons";
import {
  BookOpen, Swords, PartyPopper, Circle, Star, Globe, Flame, Sparkles, Crown,
  Home, Zap, PenTool, Users, Palette, Rocket,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface HomeScreenProps {
  userXP: number;
  streak: number;
  showXPDelta: boolean;
  dailyGoal: { target: number; done: number };
  completedLessons: number[];
  earnedBadges: string[];
  onNavigate: (screen: string) => void;
}

export function HomeScreen({
  userXP,
  streak,
  showXPDelta,
  dailyGoal,
  completedLessons,
  earnedBadges,
  onNavigate,
}: HomeScreenProps) {
  const { t } = useI18n();
  const currentLeague = LEAGUES.reduce((prev, l) => (userXP >= l.xpNeeded ? l : prev), LEAGUES[0]);
  const nextLeague = LEAGUES[LEAGUES.indexOf(currentLeague) + 1];
  const leagueProgress = nextLeague
    ? (userXP - currentLeague.xpNeeded) / (nextLeague.xpNeeded - currentLeague.xpNeeded)
    : 1;

  return (
    <div className="px-5 py-4 bg-background min-h-full">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background pb-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[22px] font-extrabold text-foreground">VibeLingo</div>
          </div>
          <div className="flex gap-2 items-center">
            <StreakBadge streak={streak} />
            <XPCounter xp={userXP} showDelta={showXPDelta} />
          </div>
        </div>
      </div>

      {/* Daily goal */}
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border-2 border-purple-100 shadow-[0_4px_20px_rgba(147,51,234,0.08)] mb-4 animate-[slideIn_0.4s_ease]">
        <ProgressRing progress={dailyGoal.done / dailyGoal.target} size={56} stroke={5} />
        <div className="flex-1">
          <div className="text-[16px] font-bold text-foreground">{t("home.dailyGoal")}</div>
          <div className="text-[13px] text-muted-foreground">
            {t("home.lessonsToday", { done: dailyGoal.done, target: dailyGoal.target })}
          </div>
        </div>
        {dailyGoal.done >= dailyGoal.target && (
          <div className="animate-[popIn_0.5s_ease]">
            <PartyPopper className="w-6 h-6 text-yellow-400" />
          </div>
        )}
      </div>

      {/* League progress */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-4 animate-[slideIn_0.4s_ease_0.1s_both]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {(() => {
              const leagueIconMap: Record<string, React.ReactNode> = {
                Circle: <Circle className="w-5 h-5" style={{ color: currentLeague.color }} />,
                Star: <Star className="w-5 h-5" style={{ color: currentLeague.color }} />,
                Globe: <Globe className="w-5 h-5" style={{ color: currentLeague.color }} />,
                Flame: <Flame className="w-5 h-5" style={{ color: currentLeague.color }} />,
                Sparkles: <Sparkles className="w-5 h-5" style={{ color: currentLeague.color }} />,
                Crown: <Crown className="w-5 h-5" style={{ color: currentLeague.color }} />,
              };
              return leagueIconMap[currentLeague.icon] || null;
            })()}
            <span
              className="text-[15px] font-bold"
              style={{ color: currentLeague.color }}
            >
              {currentLeague.name} {t("home.league")}
            </span>
          </div>
          {nextLeague && (
            <span className="text-xs text-muted-foreground">
              {t("home.xpTo", { xp: nextLeague.xpNeeded - userXP, name: nextLeague.name })}
            </span>
          )}
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-800 ease-out"
            style={{
              background: `linear-gradient(90deg, ${currentLeague.color}, ${nextLeague?.color || currentLeague.color})`,
              width: `${leagueProgress * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-6 animate-[slideIn_0.4s_ease_0.2s_both]">
        <button
          onClick={() => onNavigate("learn")}
          className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white text-left cursor-pointer border-none shadow-[0_8px_24px_rgba(147,51,234,0.25)]"
        >
          <div className="mb-2"><BookOpen className="w-6 h-6" /></div>
          <div className="text-[15px] font-bold">{t("home.continue")}</div>
          <div className="text-[12px] opacity-80">{t("home.lesson", { n: completedLessons.length + 1 })}</div>
        </button>
        <button
          onClick={() => onNavigate("battle")}
          className="p-5 rounded-2xl bg-card border-2 border-border text-foreground text-left cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-purple-200 transition-colors"
        >
          <div className="mb-2"><Swords className="w-6 h-6 text-purple-500" /></div>
          <div className="text-[15px] font-bold">{t("home.battle")}</div>
          <div className="text-[12px] text-muted-foreground">{t("home.oneOnOne")}</div>
        </button>
      </div>

      {/* Badges */}
      <div className="animate-[slideIn_0.4s_ease_0.3s_both]">
        <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
          {t("home.badges")}
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2">
          {BADGES.map((b) => {
            const earned = earnedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl text-center min-w-[80px] shrink-0 border-2 bg-card ${
                  earned
                    ? "border-purple-200 shadow-[0_2px_12px_rgba(147,51,234,0.1)]"
                    : "border-border opacity-40"
                }`}
              >
                <div className="mb-1.5 flex justify-center">
                  {(() => {
                    const badgeIconMap: Record<string, React.ReactNode> = {
                      Home: <Home className="w-6 h-6 text-purple-500" />,
                      Flame: <Flame className="w-6 h-6 text-orange-400" />,
                      Zap: <Zap className="w-6 h-6 text-yellow-500" />,
                      PenTool: <PenTool className="w-6 h-6 text-blue-500" />,
                      Users: <Users className="w-6 h-6 text-green-500" />,
                      Swords: <Swords className="w-6 h-6 text-red-500" />,
                      Palette: <Palette className="w-6 h-6 text-pink-500" />,
                      Rocket: <Rocket className="w-6 h-6 text-indigo-500" />,
                    };
                    return badgeIconMap[b.icon] || null;
                  })()}
                </div>
                <div className={`text-[10px] font-semibold ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {t(`badge.${b.id}`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
