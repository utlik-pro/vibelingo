import { Home, BookOpen, Swords, User, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const tabConfig = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "learn", icon: BookOpen, labelKey: "nav.learn" },
  { id: "practice", icon: PenLine, labelKey: "nav.practice" },
  { id: "battle", icon: Swords, labelKey: "nav.battle" },
  { id: "profile", icon: User, labelKey: "nav.profile" },
] as const;

export function BottomNav({
  screen,
  onNavigate,
}: {
  screen: string;
  onNavigate: (id: string) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around py-3 pb-5 bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(108,92,231,0.06)] z-50">
      {tabConfig.map((tab) => {
        const isActive = screen === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1.5 transition-all duration-200 bg-transparent border-none cursor-pointer",
              isActive ? "opacity-100" : "opacity-50"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              fill={isActive ? "currentColor" : "none"}
            />
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-primary" />
            )}
            <span
              className={cn(
                "text-[10px] font-semibold",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t(tab.labelKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
