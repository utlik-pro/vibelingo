import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  Check,
  X as XIcon,
  BookOpen,
  Swords,
  PenTool,
  Sparkles,
  Rocket,
  Zap,
  Crown,
  ChevronDown,
  Star,
  Users,
  Trophy,
  GraduationCap,
  MessageCircle,
  Heart,
  MousePointer,
  Bot,
  Palette,
  type LucideIcon,
} from "lucide-react";

const BOT_URL = "https://t.me/vibelingo_learn_bot";

const TOOLS: { name: string; desc: string; icon: LucideIcon; color: string }[] = [
  { name: "Lovable", desc: "landing.tools.lovable", icon: Heart, color: "text-red-500" },
  { name: "Cursor", desc: "landing.tools.cursor", icon: MousePointer, color: "text-blue-500" },
  { name: "Claude Code", desc: "landing.tools.claudeCode", icon: Bot, color: "text-amber-600" },
  { name: "Bolt.new", desc: "landing.tools.bolt", icon: Zap, color: "text-yellow-500" },
  { name: "v0", desc: "landing.tools.v0", icon: Palette, color: "text-pink-500" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-semibold text-foreground text-[15px] pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/* Phone mockup with a mini UI inside */
function PhoneMockup({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative mx-auto w-[220px] h-[400px] rounded-[32px] border-[6px] border-gray-800 dark:border-gray-600 bg-background shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 dark:bg-gray-600 rounded-b-2xl z-10" />
        {/* Screen content */}
        <div className="h-full w-full overflow-hidden pt-6">
          {children}
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

/* Mini lesson screen mockup */
function LessonMockup() {
  return (
    <div className="h-full bg-background p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="h-1.5 w-16 rounded-full bg-purple-500" />
        <div className="text-[9px] font-bold text-purple-500">3/5</div>
      </div>
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
        <div className="text-[10px] font-bold text-foreground mb-2">What does Cursor AI do?</div>
        <div className="flex flex-col gap-1.5">
          {["Edit photos", "AI code editor", "Make music", "Send emails"].map((opt, i) => (
            <div
              key={opt}
              className={`text-[9px] px-2.5 py-1.5 rounded-lg border ${
                i === 1
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 font-bold"
                  : "border-border text-muted-foreground"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between px-1">
        <div className="text-[9px] text-muted-foreground">+15 XP</div>
        <div className="h-5 w-14 rounded-lg bg-purple-500 flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">Next</span>
        </div>
      </div>
    </div>
  );
}

/* Mini practice screen mockup */
function PracticeMockup() {
  return (
    <div className="h-full bg-background p-3 flex flex-col gap-2">
      <div className="text-[10px] font-bold text-foreground">Practice Challenge</div>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
        <div className="text-[9px] text-foreground mb-2 font-semibold">Build a landing page for a coffee shop</div>
        <div className="text-[8px] text-muted-foreground mb-2">Write a prompt for Lovable:</div>
        <div className="bg-background rounded-lg border border-border p-2 min-h-[60px]">
          <div className="text-[8px] text-foreground leading-relaxed">
            Create a modern landing page for "Bean & Brew" coffee shop with a hero section...
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-1">
        <div className="text-[8px] px-2 py-1 rounded-md bg-muted text-muted-foreground">Hints</div>
        <div className="text-[8px] px-2 py-1 rounded-md bg-muted text-muted-foreground">Example</div>
      </div>
      <div className="mt-auto">
        <div className="h-5 w-full rounded-lg bg-green-500 flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">Submit</span>
        </div>
      </div>
    </div>
  );
}

/* Mini battle screen mockup */
function BattleMockup() {
  return (
    <div className="h-full bg-background p-3 flex flex-col gap-2">
      <div className="text-[10px] font-bold text-foreground text-center">Prompt Battle</div>
      <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-[9px] font-bold">Y</div>
          <div className="text-[8px] font-semibold text-foreground">You</div>
        </div>
        <div className="text-[14px] font-extrabold text-orange-500">VS</div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-[9px] font-bold">A</div>
          <div className="text-[8px] font-semibold text-foreground">Alex</div>
        </div>
      </div>
      <div className="text-[9px] text-center text-muted-foreground">02:45</div>
      <div className="bg-background rounded-lg border border-border p-2 flex-1 min-h-[60px]">
        <div className="text-[8px] text-foreground leading-relaxed">
          Design a portfolio site with dark mode, smooth animations...
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 flex-1 rounded-lg bg-orange-500 flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">Submit</span>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="font-extrabold text-lg text-foreground">VibeLingo</span>
          </div>
          <a
            href={BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl bg-purple-500 text-white font-semibold text-sm hover:bg-purple-600 transition-colors no-underline"
          >
            {t("landing.hero.cta")}
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Vibecoding made simple</span>
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

        {/* Social proof bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-14">
          {[
            { value: "5K+", label: t("landing.stats.learners"), icon: Users },
            { value: "50K+", label: t("landing.stats.lessonsCompleted"), icon: GraduationCap },
            { value: "4.9", label: t("landing.stats.rating"), icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="text-xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS — with phone mockups ===== */}
      <section className="px-6 py-16 md:py-24 bg-white dark:bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3 block">
              {t("landing.howItWorks.title")}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
              {t("landing.features.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Step 1: Learn */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-extrabold z-10 shadow-lg">
                  1
                </div>
                <PhoneMockup label={t("landing.howItWorks.step1.title")}>
                  <LessonMockup />
                </PhoneMockup>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                {t("landing.howItWorks.step1.desc")}
              </p>
            </div>

            {/* Step 2: Practice */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-extrabold z-10 shadow-lg">
                  2
                </div>
                <PhoneMockup label={t("landing.howItWorks.step2.title")}>
                  <PracticeMockup />
                </PhoneMockup>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                {t("landing.howItWorks.step2.desc")}
              </p>
            </div>

            {/* Step 3: Compete */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-extrabold z-10 shadow-lg">
                  3
                </div>
                <PhoneMockup label={t("landing.howItWorks.step3.title")}>
                  <BattleMockup />
                </PhoneMockup>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                {t("landing.howItWorks.step3.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES (detailed cards) ===== */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10 border border-purple-200/50 dark:border-purple-800/30">
              <BookOpen className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("landing.features.lessons.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("landing.features.lessons.desc")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 border border-orange-200/50 dark:border-orange-800/30">
              <Swords className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("landing.features.battles.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("landing.features.battles.desc")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200/50 dark:border-green-800/30">
              <PenTool className="w-8 h-8 text-green-500 mb-4" />
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

      {/* ===== TOOLS (Lucide icons instead of emojis) ===== */}
      <section className="px-6 py-16 md:py-20 bg-white dark:bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-4">
            {t("landing.tools.title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            {t("landing.tools.subtitle")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-background border border-border hover:shadow-lg hover:-translate-y-1 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{tool.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t(tool.desc)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">
              {t("landing.social.trusted")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: t("landing.social.review1"), name: t("landing.social.review1.name"), stars: 5 },
              { text: t("landing.social.review2"), name: t("landing.social.review2.name"), stars: 5 },
              { text: t("landing.social.review3"), name: t("landing.social.review3.name"), stars: 5 },
            ].map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="px-6 py-16 md:py-20 bg-white dark:bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12">
            {t("landing.pricing.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
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

            {/* PRO */}
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

      {/* ===== FAQ ===== */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10">
            {t("landing.faq.title")}
          </h2>

          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <FaqItem
                key={n}
                question={t(`landing.faq.q${n}`)}
                answer={t(`landing.faq.a${n}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Trophy className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">
            {t("landing.finalCta.title")}
          </h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed">
            {t("landing.finalCta.subtitle")}
          </p>
          <a
            href={BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-600 font-bold text-lg shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 no-underline"
          >
            <Rocket className="w-5 h-5" />
            {t("landing.finalCta.cta")}
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-6 py-10 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="font-bold text-foreground">VibeLingo</span>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("vibelingo_skip_landing", "true");
              window.location.reload();
            }}
            className="text-sm text-purple-500 font-semibold hover:text-purple-700 transition-colors cursor-pointer bg-transparent border-none underline underline-offset-2"
          >
            {t("landing.footer.tryInBrowser")}
          </button>
          <p className="text-sm text-muted-foreground">
            {t("landing.footer.builtWith")}
          </p>
        </div>
      </footer>
    </div>
  );
}
