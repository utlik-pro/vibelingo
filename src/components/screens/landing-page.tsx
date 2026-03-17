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
  Send,
  Play,
  Lock,
  Flame,
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
      <div className="relative mx-auto w-[220px] h-[420px] rounded-[32px] border-[6px] border-gray-800 dark:border-gray-600 bg-background shadow-2xl overflow-hidden">
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

/* Accurate mini lesson screen — matches real LessonScreen + QuizStep */
function LessonMockup() {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header: X + progress bar + hearts */}
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground">
          <XIcon className="w-3 h-3" />
        </div>
        <div className="flex-1 h-[4px] rounded-full bg-muted overflow-hidden">
          <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
        </div>
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50">
          <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
          <span className="text-[8px] font-bold text-foreground">5</span>
        </div>
      </div>

      {/* Quiz question */}
      <div className="flex-1 px-3 py-2">
        <p className="text-[10px] font-semibold text-foreground leading-snug mb-3">
          What does Cursor AI understand?
        </p>
        <div className="flex flex-col gap-1.5">
          {["Only current file", "Entire project context", "Nothing", "Only HTML"].map((opt, i) => (
            <div
              key={opt}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border-2 text-[8px] font-medium ${
                i === 1
                  ? "bg-green-50 border-green-300 text-green-700"
                  : i === 0
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-card border-border text-muted-foreground"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0 ${
                i === 1 ? "bg-green-500 text-white" : i === 0 ? "bg-red-500 text-white" : "bg-purple-100 text-purple-600"
              }`}>
                {i === 1 ? <Check className="w-2 h-2" /> : i === 0 ? <XIcon className="w-2 h-2" /> : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {/* Explanation box */}
        <div className="mt-2 p-2 rounded-xl bg-purple-50 border border-purple-100 flex gap-1.5 items-start">
          <Sparkles className="w-2.5 h-2.5 text-purple-500 shrink-0 mt-0.5" />
          <span className="text-[7px] text-purple-700 leading-snug">
            Cursor understands your entire project context, making it powerful for refactoring.
          </span>
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-3 pb-3">
        <div className="h-6 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-sm">
          <span className="text-[8px] text-white font-bold">Next</span>
        </div>
      </div>
    </div>
  );
}

/* Accurate mini practice screen — matches real PracticeScreen + ChallengeDetail */
function PracticeMockup() {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
          <ChevronDown className="w-3 h-3 text-foreground/80 rotate-90" />
        </div>
        <span className="text-[10px] font-extrabold text-foreground truncate">Coffee Shop Landing</span>
      </div>

      <div className="flex-1 px-3 overflow-hidden">
        {/* Challenge info card */}
        <div className="p-2 rounded-xl bg-muted/50 border border-border mb-2">
          <div className="flex items-center gap-1 mb-1.5 flex-wrap">
            <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[7px] font-bold">Beginner</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[7px] font-bold">Lovable</span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[7px] font-bold">+25 XP</span>
          </div>
          <p className="text-[7px] text-foreground/80 leading-snug">
            Create a modern landing page for a coffee shop with hero, menu, and contact sections.
          </p>
        </div>

        {/* Hints button */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-amber-50 border border-amber-100 mb-2">
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          <span className="text-[7px] font-semibold text-amber-700">Show Hints</span>
        </div>

        {/* Prompt textarea */}
        <div className="mb-2">
          <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Your Prompt</span>
          <div className="w-full h-[80px] p-2 rounded-xl border-2 border-purple-200 bg-card">
            <span className="text-[7px] text-foreground leading-snug block">
              Create a modern landing page for "Bean & Brew" coffee shop. Include a hero section with large background image, navigation bar with logo...
            </span>
          </div>
        </div>

        {/* Show example */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 border border-purple-100 w-fit mb-2">
          <span className="text-[7px] font-semibold text-purple-600">Show Example</span>
        </div>
      </div>

      {/* Submit button */}
      <div className="px-3 pb-3">
        <div className="h-6 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center gap-1 shadow-sm">
          <Send className="w-2.5 h-2.5 text-white" />
          <span className="text-[8px] text-white font-bold">Submit</span>
        </div>
      </div>
    </div>
  );
}

/* Accurate mini battle screen — matches real BattlePlayScreen (battle stage) */
function BattleMockup() {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header: back + timer */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="w-4 h-4">
          <ChevronDown className="w-3 h-3 text-muted-foreground rotate-90" />
        </div>
        <span className="text-[14px] font-extrabold text-purple-500 tabular-nums">2:45</span>
        <div className="w-4" />
      </div>

      <div className="flex-1 px-3 flex flex-col">
        {/* Challenge info */}
        <div className="rounded-xl bg-purple-50 p-2 mb-2">
          <div className="text-[9px] font-bold text-foreground mb-0.5">Portfolio Website</div>
          <p className="text-[7px] text-muted-foreground leading-snug">Design a modern portfolio site with dark mode and project showcase.</p>
        </div>

        {/* Opponent progress */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-[7px] font-bold shrink-0">M</div>
          <div className="flex-1">
            <div className="flex justify-between mb-0.5">
              <span className="text-[7px] text-muted-foreground">Maria</span>
              <span className="text-[7px] text-muted-foreground">67%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-purple-400 to-purple-500" />
            </div>
          </div>
        </div>

        {/* User text area */}
        <span className="text-[7px] font-semibold text-muted-foreground mb-1">Your prompt</span>
        <div className="flex-1 min-h-[80px] p-2 rounded-xl border border-border bg-card mb-2">
          <span className="text-[7px] text-foreground leading-snug block">
            Build a sleek portfolio website with a dark theme. Include a hero section with animated text, a grid of project cards with hover effects...
          </span>
        </div>
      </div>

      {/* Submit button */}
      <div className="px-3 pb-3">
        <div className="h-6 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center gap-1 shadow-sm">
          <Send className="w-2.5 h-2.5 text-white" />
          <span className="text-[8px] text-white font-bold">Submit</span>
        </div>
      </div>
    </div>
  );
}

/* Accurate mini home screen — matches real HomeScreen */
function HomeMockup() {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Top bar */}
      <div className="px-3 py-2 flex justify-between items-center">
        <span className="text-[11px] font-extrabold text-foreground">VibeLingo</span>
        <div className="flex gap-1.5 items-center">
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-orange-50">
            <Flame className="w-2.5 h-2.5 text-orange-400" />
            <span className="text-[8px] font-bold text-foreground">7</span>
          </div>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-purple-50">
            <Sparkles className="w-2.5 h-2.5 text-purple-500" />
            <span className="text-[8px] font-bold text-purple-500">340</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 overflow-hidden">
        {/* Daily goal card */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-card border-2 border-purple-100 mb-2">
          <div className="w-8 h-8 rounded-full border-[3px] border-purple-500 flex items-center justify-center">
            <span className="text-[7px] font-extrabold text-purple-500">67%</span>
          </div>
          <div>
            <div className="text-[8px] font-bold text-foreground">Daily Goal</div>
            <div className="text-[7px] text-muted-foreground">2/3 lessons today</div>
          </div>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <span className="text-[9px] font-extrabold text-white">3</span>
          </div>
          <div className="flex-1">
            <div className="text-[8px] font-bold text-foreground">Prompt Apprentice</div>
            <div className="h-1 rounded-full bg-muted overflow-hidden mt-1">
              <div className="h-full w-[45%] rounded-full bg-purple-500" />
            </div>
          </div>
        </div>

        {/* League */}
        <div className="p-2 rounded-xl bg-card border border-border mb-2">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-[8px] font-bold text-yellow-600">Venus League</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <BookOpen className="w-3.5 h-3.5 mb-1" />
            <div className="text-[8px] font-bold">Continue</div>
            <div className="text-[6px] opacity-80">Lesson 8</div>
          </div>
          <div className="p-2 rounded-xl bg-card border border-border">
            <Swords className="w-3.5 h-3.5 text-purple-500 mb-1" />
            <div className="text-[8px] font-bold text-foreground">Battle</div>
            <div className="text-[6px] text-muted-foreground">1 on 1</div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-2 py-1.5 flex justify-around border-t border-border">
        {[
          { icon: BookOpen, label: "Home", active: true },
          { icon: GraduationCap, label: "Learn", active: false },
          { icon: Swords, label: "Battle", active: false },
          { icon: Trophy, label: "Rank", active: false },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <item.icon className={`w-3 h-3 ${item.active ? "text-purple-500" : "text-muted-foreground"}`} />
            <span className={`text-[6px] ${item.active ? "text-purple-500 font-bold" : "text-muted-foreground"}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Accurate mini learn path — matches real LearnScreen with zigzag path */
function LearnPathMockup() {
  const lessons = [
    { title: "What is Vibecoding?", xp: 15, done: true },
    { title: "Your First Prompt", xp: 15, done: true },
    { title: "Prompt Structure", xp: 20, done: true },
    { title: "Lovable Basics", xp: 20, done: false, current: true },
    { title: "Building a Landing", xp: 25, done: false },
    { title: "Design Without Slop", xp: 25, done: false, locked: true },
  ];
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 flex justify-between items-center">
        <span className="text-[11px] font-extrabold text-foreground">Lessons</span>
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50">
          <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
          <span className="text-[8px] font-bold text-foreground">5/5</span>
        </div>
      </div>

      {/* Module label */}
      <div className="flex items-center gap-1.5 px-3 mb-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
        <span className="text-[7px] font-bold text-purple-500 tracking-widest uppercase">Basics</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-purple-200 to-transparent" />
      </div>

      {/* Path */}
      <div className="flex-1 flex flex-col items-center px-3 overflow-hidden">
        {lessons.map((l, i) => {
          const offset = i % 2 === 0 ? -20 : 20;
          return (
            <div key={i} className="flex flex-col items-center">
              {i > 0 && (
                <div className={`w-0 h-5 border-l-[2px] border-dashed ${l.locked ? "border-gray-200" : "border-purple-300"}`} />
              )}
              <div className="flex items-center gap-2" style={{ transform: `translateX(${offset}px)` }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  l.done ? "bg-purple-500 shadow-sm" :
                  l.current ? "bg-gradient-to-br from-purple-500 to-purple-600 shadow-md" :
                  "bg-muted"
                }`}>
                  {l.done ? <Check className="w-3 h-3 text-white" /> :
                   l.current ? <Play className="w-3 h-3 text-white ml-0.5" /> :
                   <Lock className="w-2.5 h-2.5 text-muted-foreground" />}
                </div>
                <div>
                  <div className={`text-[7px] font-semibold ${l.locked ? "text-muted-foreground" : "text-foreground"}`}>
                    {l.title}
                  </div>
                  <div className="text-[6px] text-muted-foreground">+{l.xp} XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Accurate mini leaderboard — matches real LeaderboardScreen */
function LeaderboardMockup() {
  const users = [
    { name: "Anna", xp: 1240, avatar: "AN", color: "#FFD700" },
    { name: "Max", xp: 980, avatar: "MX", color: "#C0C0C0" },
    { name: "Sofia", xp: 870, avatar: "SO", color: "#CD7F32" },
    { name: "Ivan", xp: 650, avatar: "IV", color: "" },
    { name: "Elena", xp: 520, avatar: "EL", color: "" },
  ];
  return (
    <div className="h-full bg-background flex flex-col">
      <div className="px-3 py-2">
        <span className="text-[11px] font-extrabold text-foreground">Leaderboard</span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[7px] text-muted-foreground">Weekly</span>
          <Star className="w-2.5 h-2.5 text-yellow-500" />
          <span className="text-[7px] text-muted-foreground">Venus</span>
        </div>
      </div>

      {/* Your position */}
      <div className="mx-3 flex items-center gap-2 p-2 rounded-xl bg-card border-l-[3px] border-purple-500 shadow-sm mb-2">
        <span className="text-[8px] font-extrabold text-purple-500 w-3 text-center">8</span>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <Users className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-[8px] font-bold text-foreground flex-1">You</span>
        <span className="text-[8px] font-bold text-purple-500">340</span>
      </div>

      {/* Rankings */}
      <div className="flex-1 px-3 flex flex-col gap-1 overflow-hidden">
        {users.map((u, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-card">
            {i < 3 ? (
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-extrabold text-white" style={{ backgroundColor: u.color }}>
                {i + 1}
              </div>
            ) : (
              <span className="text-[7px] font-semibold text-muted-foreground w-4 text-center">{i + 1}</span>
            )}
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[6px] font-bold text-white" style={{ backgroundColor: `hsl(${i * 47 + 200}, 60%, 55%)` }}>
              {u.avatar}
            </div>
            <div className="flex-1">
              <span className="text-[8px] font-semibold text-foreground">{u.name}</span>
            </div>
            <span className="text-[8px] font-bold text-purple-500">{u.xp}</span>
          </div>
        ))}
      </div>

      {/* Zones */}
      <div className="px-3 pb-2 pt-1 flex flex-col gap-1">
        <div className="p-1.5 rounded-lg bg-green-50 border border-green-100">
          <span className="text-[6px] text-green-600 font-semibold">Top 3 advance to next league</span>
        </div>
        <div className="p-1.5 rounded-lg bg-red-50 border border-red-100">
          <span className="text-[6px] text-red-500 font-semibold">Bottom 3 get demoted</span>
        </div>
      </div>
    </div>
  );
}

/* Accurate mini lesson complete — matches real LessonComplete */
function LessonCompleteMockup() {
  return (
    <div className="h-full bg-background flex flex-col items-center justify-center p-3">
      {/* Trophy */}
      <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
      </div>

      <span className="text-[12px] font-extrabold text-foreground mb-1">Excellent!</span>
      <span className="text-[7px] text-muted-foreground mb-2">What is Vibecoding?</span>

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3].map((s) => (
          <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-1.5 w-full mb-3">
        <div className="p-2 text-center rounded-xl bg-card border border-border">
          <div className="text-[10px] font-extrabold text-purple-500">+15</div>
          <div className="text-[6px] text-muted-foreground">XP Earned</div>
        </div>
        <div className="p-2 text-center rounded-xl bg-card border border-border">
          <div className="text-[10px] font-extrabold text-green-500">100%</div>
          <div className="text-[6px] text-muted-foreground">Accuracy</div>
        </div>
        <div className="p-2 text-center rounded-xl bg-card border border-border">
          <div className="text-[10px] font-extrabold text-foreground">4/4</div>
          <div className="text-[6px] text-muted-foreground">Correct</div>
        </div>
        <div className="p-2 text-center rounded-xl bg-card border border-border">
          <div className="text-[10px] font-extrabold text-blue-500">Lovable</div>
          <div className="text-[6px] text-muted-foreground">Tool</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-1">
        <div className="h-5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
          <span className="text-[7px] text-white font-bold">Share Result</span>
        </div>
        <div className="h-5 rounded-xl border-2 border-border flex items-center justify-center">
          <span className="text-[7px] text-foreground font-semibold">Continue Learning</span>
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

      {/* ===== BIG STAT ===== */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-7xl md:text-9xl font-extrabold text-purple-500 mb-4 leading-none">
            {t("landing.bigStat.number")}
          </div>
          <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed mb-3 max-w-xl mx-auto">
            {t("landing.bigStat.text")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("landing.bigStat.source")}
          </p>
        </div>
      </section>

      {/* ===== WHO IS THIS FOR ===== */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-foreground mb-4">
              {t("landing.whoFor.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("landing.whoFor.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Rocket, color: "purple", titleKey: "landing.whoFor.founder.title", descKey: "landing.whoFor.founder.desc" },
              { icon: Zap, color: "blue", titleKey: "landing.whoFor.freelancer.title", descKey: "landing.whoFor.freelancer.desc" },
              { icon: Palette, color: "pink", titleKey: "landing.whoFor.marketer.title", descKey: "landing.whoFor.marketer.desc" },
              { icon: GraduationCap, color: "green", titleKey: "landing.whoFor.student.title", descKey: "landing.whoFor.student.desc" },
            ].map((item) => {
              const colorMap: Record<string, string> = {
                purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-500",
                blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-500",
                pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-500",
                green: "bg-green-50 dark:bg-green-900/20 text-green-500",
              };
              const [bgClass, , textClass] = (colorMap[item.color] || colorMap.purple).split(" ");
              return (
                <div key={item.titleKey} className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl ${bgClass} dark:${bgClass} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-6 h-6 ${textClass}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">{t(item.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== APP SCREENS GALLERY ===== */}
      <section className="px-6 py-16 md:py-24 bg-white dark:bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3 block">
              {t("landing.gallery.subtitle")}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
              {t("landing.gallery.title")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <PhoneMockup label="Home">
              <HomeMockup />
            </PhoneMockup>
            <PhoneMockup label="Learn Path">
              <LearnPathMockup />
            </PhoneMockup>
            <PhoneMockup label="Leaderboard">
              <LeaderboardMockup />
            </PhoneMockup>
            <PhoneMockup label="Results">
              <LessonCompleteMockup />
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU'LL BUILD ===== */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              {t("landing.build.title")}
            </h2>
            <p className="text-muted-foreground">{t("landing.build.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(["landing.build.p1", "landing.build.p2", "landing.build.p3", "landing.build.p4", "landing.build.p5", "landing.build.p6"] as const).map((key) => (
              <div key={key} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-medium text-foreground">{t(key)}</span>
              </div>
            ))}
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
              { text: t("landing.social.review4"), name: t("landing.social.review4.name"), stars: 5 },
              { text: t("landing.social.review5"), name: t("landing.social.review5.name"), stars: 5 },
              { text: t("landing.social.review6"), name: t("landing.social.review6.name"), stars: 5 },
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <FaqItem
                key={n}
                question={t(`landing.faq.q${n}`)}
                answer={t(`landing.faq.a${n}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TELEGRAM SECTION ===== */}
      <section className="px-6 py-16 md:py-24 bg-white dark:bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3 block">Telegram Mini App</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                {t("landing.telegram.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("landing.telegram.subtitle")}
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {(["landing.telegram.feature1", "landing.telegram.feature2", "landing.telegram.feature3", "landing.telegram.feature4"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm text-foreground">{t(key)}</span>
                  </div>
                ))}
              </div>
              <a
                href={BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold shadow-[0_8px_24px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-0.5 no-underline"
              >
                <Rocket className="w-5 h-5" />
                {t("landing.finalCta.cta")}
              </a>
            </div>
            <div className="flex justify-center">
              <PhoneMockup label="Telegram Mini App">
                <HomeMockup />
              </PhoneMockup>
            </div>
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
