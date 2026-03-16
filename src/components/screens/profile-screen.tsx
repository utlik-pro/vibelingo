import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BADGES, LEAGUES, LESSONS_DATA } from "@/data/lessons";
import {
  Crown, User, Zap, Flame, BookOpen, Share2, Award,
  Circle, Star, Globe, Sparkles,
  Home, PenTool, Users, Swords, Palette, Rocket,
  Languages, Copy, Check, ChevronRight, Sun, Moon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { generateReferralCode, getReferralLink, getReferralCount } from "@/lib/referral";

interface ProfileScreenProps {
  userXP: number;
  streak: number;
  completedLessons: number[];
  earnedBadges: string[];
  onShare: () => void;
  onUpgrade: () => void;
  onViewCertificates: () => void;
}

export function ProfileScreen({
  userXP,
  streak,
  completedLessons,
  earnedBadges,
  onShare,
  onUpgrade,
  onViewCertificates,
}: ProfileScreenProps) {
  const { t, locale, setLocale } = useI18n();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [linkCopied, setLinkCopied] = useState(false);
  const referralCode = generateReferralCode(user.id);
  const referralLink = getReferralLink(referralCode);
  const referralCount = getReferralCount(user.id);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {
      // fallback
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };
  const currentLeague = LEAGUES.reduce((prev, l) => (userXP >= l.xpNeeded ? l : prev), LEAGUES[0]);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en");
  };

  return (
    <div className="px-5 py-4 bg-background min-h-full">
      {/* Language & Theme switcher */}
      <div className="sticky top-0 z-10 bg-background pb-2">
      <div className="flex justify-end gap-2 mb-2 animate-[fadeIn_0.3s_ease]">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-border bg-card text-sm font-semibold text-foreground hover:border-purple-200 hover:text-purple-600 transition-all cursor-pointer"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-border bg-card text-sm font-semibold text-muted-foreground hover:border-purple-200 hover:text-purple-600 transition-all cursor-pointer"
        >
          <Languages className="w-4 h-4" />
          {locale === "en" ? "RU" : "EN"}
        </button>
      </div>
      </div>

      {/* Profile header */}
      <div className="text-center mb-6 animate-[fadeIn_0.4s_ease]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_32px_rgba(147,51,234,0.3)]">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-white" />
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-[22px] font-extrabold text-foreground">{user.name}</h2>
          {user.isPro && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
              PRO
            </span>
          )}
        </div>
        <div className="flex justify-center items-center gap-2">
          {(() => {
            const leagueIconMap: Record<string, React.ReactNode> = {
              Circle: <Circle className="w-4 h-4" style={{ color: currentLeague.color }} />,
              Star: <Star className="w-4 h-4" style={{ color: currentLeague.color }} />,
              Globe: <Globe className="w-4 h-4" style={{ color: currentLeague.color }} />,
              Flame: <Flame className="w-4 h-4" style={{ color: currentLeague.color }} />,
              Sparkles: <Sparkles className="w-4 h-4" style={{ color: currentLeague.color }} />,
              Crown: <Crown className="w-4 h-4" style={{ color: currentLeague.color }} />,
            };
            return leagueIconMap[currentLeague.icon] || null;
          })()}
          <span className="text-[13px] font-semibold" style={{ color: currentLeague.color }}>
            {currentLeague.name} {t("home.league")}
          </span>
        </div>
      </div>

      {/* PRO button — hide if already PRO */}
      {!user.isPro ? (
        <Button
          onClick={onUpgrade}
          variant="outline"
          className="w-full mb-6 h-12 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100 font-bold gap-2"
        >
          <Crown className="w-4 h-4 text-amber-500" />
          {t("profile.upgradeToPro")}
        </Button>
      ) : (
        <div className="w-full mb-6 h-12 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-200 flex items-center justify-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-amber-700 font-bold text-sm">{t("profile.proActive")}</span>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: userXP, label: "XP", icon: <Zap className="w-5 h-5 text-purple-500" /> },
          { value: streak, label: t("common.streak"), icon: <Flame className="w-5 h-5 text-orange-400" /> },
          { value: completedLessons.length, label: t("profile.lessons"), icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
        ].map((s, i) => (
          <div
            key={i}
            className="p-4 text-center rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(147,51,234,0.06)] animate-[slideIn_0.4s_ease_both]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mb-1.5 flex justify-center">{s.icon}</div>
            <div className="text-[22px] font-extrabold text-foreground">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Skill Score — computed from completed lessons per module */}
      {(() => {
        const moduleSkills = [
          { module: "Основы", labelKey: "profile.skill.prompting", color: "#8B5CF6" },
          { module: "Инструменты", labelKey: "profile.skill.tools", color: "#0EA5E9" },
          { module: "Дизайн", labelKey: "profile.skill.design", color: "#F97316" },
          { module: "Продвинутый", labelKey: "profile.skill.architecture", color: "#EF4444" },
          { module: "Монетизация", labelKey: "profile.skill.monetization", color: "#22C55E" },
        ];
        const skills = moduleSkills.map((ms) => {
          const moduleLessons = LESSONS_DATA.filter((l) => l.module === ms.module);
          const done = moduleLessons.filter((l) => completedLessons.includes(l.id)).length;
          const total = moduleLessons.length;
          return { ...ms, value: total > 0 ? Math.round((done / total) * 100) : 0 };
        });
        const hasAnyProgress = skills.some((s) => s.value > 0);
        if (!hasAnyProgress) return null;
        return (
          <div className="mb-6 p-4 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(147,51,234,0.06)] animate-[slideIn_0.4s_ease_0.2s_both]">
            <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
              {t("profile.skillScore")}
            </div>
            {skills.map((s, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-[13px] text-foreground font-medium">{t(s.labelKey)}</span>
                  <span className="text-xs text-muted-foreground">{s.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ background: s.color, width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Badges */}
      <div className="animate-[slideIn_0.4s_ease_0.3s_both]">
        <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
          {t("profile.badges")} ({earnedBadges.length}/{BADGES.length})
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {BADGES.map((b) => {
            const earned = earnedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl text-center bg-card border-2 ${
                  earned
                    ? "border-purple-200 shadow-[0_2px_12px_rgba(147,51,234,0.1)]"
                    : "border-border opacity-35"
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
                <div className={`text-[9px] font-semibold leading-tight ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {t(`badge.${b.id}`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral section */}
      <div className="mt-6 p-5 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-[slideIn_0.4s_ease_0.33s_both]">
        <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
          {t("profile.referral")}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border">
            <div className="text-[10px] text-muted-foreground mb-0.5">{t("profile.referralCode")}</div>
            <div className="text-[15px] font-bold text-purple-600 font-mono">{referralCode}</div>
          </div>
          <Button
            onClick={copyReferralLink}
            variant="outline"
            className="h-11 px-4 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold text-[13px] gap-1.5"
          >
            {linkCopied ? (
              <>
                <Check className="w-4 h-4" />
                {t("profile.linkCopied")}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t("profile.copyLink")}
              </>
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">
            {t("profile.friendsInvited", { count: String(referralCount) })}
          </span>
          <span className="text-[11px] text-purple-500 font-semibold">
            {t("profile.referralBonus")}
          </span>
        </div>
      </div>

      {/* Certificates section */}
      <button
        onClick={onViewCertificates}
        className="mt-4 w-full p-5 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-[slideIn_0.4s_ease_0.35s_both] flex items-center gap-3 text-left cursor-pointer"
      >
        <Award className="w-5 h-5 text-purple-500 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase">
            {t("profile.certificates")}
          </span>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            {t("profile.certificatesDesc")}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </button>

      {/* Share button */}
      <Button
        onClick={onShare}
        className="w-full mt-6 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none animate-[slideIn_0.4s_ease_0.4s_both] gap-2"
      >
        <Share2 className="w-4 h-4" />
        {t("profile.shareProgress")}
      </Button>
    </div>
  );
}
