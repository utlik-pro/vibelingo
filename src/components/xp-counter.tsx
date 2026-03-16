import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export function XPCounter({ xp, showDelta }: { xp: number; showDelta?: boolean }) {
  const [displayXP, setDisplayXP] = useState(xp);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    if (xp !== displayXP) {
      setDelta(xp - displayXP);
      const start = displayXP;
      const diff = xp - start;
      const duration = 800;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayXP(Math.round(start + diff * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [xp]);

  return (
    <div className="flex items-center gap-1.5 bg-accent-light/10 rounded-full px-3 py-1.5">
      <Star className="w-4 h-4 text-accent-light fill-accent-light" />
      <span className="text-sm font-extrabold font-display text-accent-light">{displayXP}</span>
      <span className="text-[11px] text-accent-light/70 font-semibold tracking-wider">XP</span>
      {showDelta && delta > 0 && (
        <span className="text-xs font-bold text-success animate-[fadeUp_1.5s_ease_forwards]">
          +{delta}
        </span>
      )}
    </div>
  );
}
