import { useI18n } from "@/lib/i18n";
import { Check, X as XIcon, BookOpen, Swords, PenTool, Sparkles, Rocket, Zap, Crown } from "lucide-react";

const BOT_URL = "https://t.me/vibelingo_learn_bot";

const TOOLS = [
  { name: "Lovable", desc: "landing.tools.lovable" as const, emoji: "\u2764\uFE0F" },
  { name: "Cursor", desc: "landing.tools.cursor" as const, emoji: "\u{1F5B1}\uFE0F" },
  { name: "Claude Code", desc: "landing.tools.claudeCode" as const, emoji: "\u{1F916}" },
  { name: "Bolt.new", desc: "landing.tools.bolt" as const, emoji: "\u26A1" },
  { name: "v0", desc: "landing.tools.v0" as const, emoji: "\u{1F3A8}" },
];

export function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-8">
          <Sparkles className="w-4 h-4" />
          <span>VibeLingo</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
          {t("landing.hero.title")}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          {t("landing.hero.subtitle")}
        </p>

        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg shadow-[0_8px_24px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-0.5 no-underline"
        >
          <Rocket className="w-5 h-5" />
          {t("landing.hero.cta")}
        </a>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
          {[
            { value: "25", label: t("landing.hero.stat.lessons") },
            { value: "5", label: t("landing.hero.stat.modules") },
            { value: "10", label: t("landing.hero.stat.challenges") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 md:py-20 bg-white dark:bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12">
            {t("landing.features.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Lessons */}
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("landing.features.lessons.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("landing.features.lessons.desc")}
              </p>
            </div>

            {/* Prompt Battles */}
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <Swords className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("landing.features.battles.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("landing.features.battles.desc")}
              </p>
            </div>

            {/* Practice Mode */}
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("landing.features.practice.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("landing.features.practice.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-4">
            {t("landing.tools.title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            {t("landing.tools.subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-shadow"
              >
                <div className="text-2xl">{tool.emoji}</div>
                <div>
                  <div className="font-bold text-foreground">{tool.name}</div>
                  <div className="text-xs text-muted-foreground">{t(tool.desc)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16 md:py-20 bg-white dark:bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12">
            {t("landing.pricing.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="p-6 rounded-2xl bg-background border-2 border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Zap className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{t("landing.pricing.free")}</div>
                  <div className="text-2xl font-extrabold text-foreground">$0</div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-4">
                {(["landing.pricing.free.f1", "landing.pricing.free.f2", "landing.pricing.free.f3"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-foreground">{t(key)}</span>
                  </div>
                ))}
                {(["landing.pricing.free.m1", "landing.pricing.free.m2"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <XIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground line-through">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRO Tier */}
            <div className="p-6 rounded-2xl bg-background border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold">
                PRO
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{t("landing.pricing.pro")}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-foreground">$4.99</span>
                    <span className="text-sm text-muted-foreground">{t("landing.pricing.perMonth")}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-4">
                {(["landing.pricing.pro.f1", "landing.pricing.pro.f2", "landing.pricing.pro.f3", "landing.pricing.pro.f4", "landing.pricing.pro.f5"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-foreground">{t(key)}</span>
                  </div>
                ))}
              </div>
              <a
                href={BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold shadow-[0_4px_16px_rgba(147,51,234,0.3)] hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] transition-all no-underline"
              >
                {t("landing.pricing.getCta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center">
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg shadow-[0_8px_24px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-0.5 no-underline mb-4"
        >
          {t("landing.footer.openTelegram")}
        </a>
        <div className="mb-6">
          <button
            onClick={() => {
              localStorage.setItem('vibelingo_skip_landing', 'true');
              window.location.reload();
            }}
            className="text-sm text-purple-500 font-semibold hover:text-purple-700 transition-colors cursor-pointer bg-transparent border-none underline underline-offset-2"
          >
            {t("landing.footer.tryInBrowser")}
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("landing.footer.builtWith")}
        </p>
      </footer>
    </div>
  );
}
