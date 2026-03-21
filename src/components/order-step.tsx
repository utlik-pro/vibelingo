import { useState } from "react";
import type { LessonStep } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function OrderStep({
  step,
  onAnswer,
  answered,
}: {
  step: LessonStep;
  onAnswer: (idx: number) => void;
  answered: boolean;
}) {
  const { t } = useI18n();
  const [order, setOrder] = useState(step.items?.map((_, i) => i) ?? []);

  const moveItem = (from: number, to: number) => {
    const newOrder = [...order];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    setOrder(newOrder);
  };

  const checkOrder = () => {
    const isCorrect = order.every((v, i) => v === step.correctOrder?.[i]);
    onAnswer(isCorrect ? 0 : -1);
  };

  return (
    <div>
      <p className="text-[17px] font-semibold text-foreground leading-relaxed mb-1.5">
        {step.question}
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        {t("order.hint")}
      </p>
      <div className="flex flex-col gap-2.5">
        {order.map((itemIdx, pos) => {
          const isCorrectPos = answered && step.correctOrder?.[pos] === itemIdx;
          return (
            <div
              key={itemIdx}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all duration-200",
                !answered && "bg-card border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                answered && isCorrectPos && "bg-green-50 dark:bg-green-900/30 border-green-300",
                answered && !isCorrectPos && "bg-red-50 dark:bg-red-900/30 border-red-300"
              )}
            >
              <span className="font-bold text-muted-foreground text-[13px] w-5">
                {pos + 1}
              </span>
              <span className="flex-1 text-sm text-foreground">
                {step.items?.[itemIdx]}
              </span>
              {!answered && (
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => pos > 0 && moveItem(pos, pos - 1)}
                    className={cn(
                      "p-1 rounded-lg bg-transparent border-none",
                      pos > 0
                        ? "text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer"
                        : "text-muted-foreground cursor-default"
                    )}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => pos < order.length - 1 && moveItem(pos, pos + 1)}
                    className={cn(
                      "p-1 rounded-lg bg-transparent border-none",
                      pos < order.length - 1
                        ? "text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer"
                        : "text-muted-foreground cursor-default"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!answered && (
        <Button
          onClick={checkOrder}
          className="w-full mt-5 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-[15px] font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none"
        >
          {t("order.check")}
        </Button>
      )}
    </div>
  );
}
