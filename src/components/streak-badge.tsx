import { Badge } from "@/components/ui/badge";
import { Flame, Snowflake } from "lucide-react";

export function StreakBadge({ streak }: { streak: number }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1 px-3 py-1.5 rounded-full border-2 ${
        streak > 0
          ? "bg-gradient-to-r from-orange-400/15 to-amber-400/15 border-white dark:border-gray-700 text-orange-500 shadow-[0_2px_8px_rgba(251,146,60,0.15)]"
          : "bg-white dark:bg-gray-800 border-border text-muted-foreground"
      }`}
    >
      {streak > 0 ? (
        <Flame className="w-4 h-4 text-orange-500" />
      ) : (
        <Snowflake className="w-4 h-4" />
      )}
      <span className="text-[13px] font-bold">{streak}</span>
    </Badge>
  );
}
