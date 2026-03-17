import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Swords, Check, Copy } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BOT_URL = "https://t.me/vibelingo_learn_bot"; // share link

interface BattleScreenProps {
  onStartBattle: () => void;
}

export function BattleScreen({ onStartBattle }: BattleScreenProps) {
  const { t, locale } = useI18n();
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    const shareText = locale === "ru"
      ? "Давай сыграем в промпт-батл в VibeLingo!"
      : "Let's play a prompt battle in VibeLingo!";
    const shareUrl = `${BOT_URL}?start=battle`;

    // Try Telegram share first
    const tg = window.Telegram?.WebApp;
    if (tg && typeof (tg as any).openTelegramLink === "function") {
      const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      (tg as any).openTelegramLink(tgShareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      return;
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // ignore
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="px-5 py-4 bg-background min-h-full">
      <div className="sticky top-0 z-10 bg-background pb-3">
      <h2 className="text-[22px] font-extrabold text-foreground mb-1.5">{t("battle.title")}</h2>
      <p className="text-xs text-muted-foreground">{t("battle.subtitle")}</p>
      </div>

      {/* Battle card */}
      <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-4 animate-[slideIn_0.4s_ease]">
        <div className="px-6 py-8 bg-gradient-to-br from-purple-50 to-purple-100 text-center">
          <div className="mb-3 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_16px_rgba(147,51,234,0.15)] flex items-center justify-center">
              <Swords className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">{t("battle.quickBattle")}</h3>
          <p className="text-[13px] text-muted-foreground">
            {t("battle.quickBattleDesc")}
          </p>
        </div>
        <div className="px-5 py-5">
          <div className="flex justify-between mb-4">
            <span className="text-xs text-muted-foreground">{t("battle.reward")}</span>
            <span className="text-sm font-bold text-purple-500">+50 XP</span>
          </div>
          <Button
            onClick={onStartBattle}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none"
          >
            {t("battle.findOpponent")}
          </Button>
        </div>
      </div>

      {/* Challenge friend */}
      <div
        onClick={handleCopyLink}
        className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-4 cursor-pointer hover:border-purple-200 transition-colors animate-[slideIn_0.4s_ease_0.1s_both]"
      >
        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
          <Target className="w-5 h-5 text-purple-500" />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-foreground">{t("battle.challengeFriend")}</div>
          <div className="text-xs text-muted-foreground">
            {linkCopied ? t("battle.linkCopied") : t("battle.challengeFriendDesc")}
          </div>
        </div>
        {linkCopied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Weekly challenge */}
      <div
        onClick={onStartBattle}
        className="p-5 rounded-2xl bg-card border-2 border-amber-100 shadow-[0_2px_12px_rgba(245,158,11,0.08)] animate-[slideIn_0.4s_ease_0.2s_both] cursor-pointer hover:border-amber-200 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <Badge variant="secondary" className="text-[10px] font-bold text-amber-600 bg-amber-50 uppercase tracking-wider border border-amber-200">
            {t("battle.weeklyChallenge")}
          </Badge>
        </div>
        <div className="text-[15px] font-semibold text-foreground mb-1">
          {t("battle.landingIn3Min")}
        </div>
        <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {t("battle.landingDesc")}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{t("battle.participants", { n: 47 })}</span>
          <span className="text-xs text-amber-500 font-semibold">{t("battle.daysLeft", { n: 3 })}</span>
        </div>
      </div>
    </div>
  );
}
