import type { LessonStep } from "@/data/lessons";
import { cn } from "@/lib/utils";
import { Check, X, Lightbulb } from "lucide-react";

export function QuizStep({
  step,
  onAnswer,
  answered,
  selectedAnswer,
}: {
  step: LessonStep;
  onAnswer: (idx: number) => void;
  answered: boolean;
  selectedAnswer: number | null;
}) {
  return (
    <div>
      <p className="text-[17px] font-semibold text-foreground leading-relaxed mb-5">
        {step.question}
      </p>
      <div className="flex flex-col gap-3">
        {step.options?.map((opt, i) => {
          const isCorrect = i === step.correct;
          const isSelected = i === selectedAnswer;

          return (
            <button
              key={i}
              onClick={() => !answered && onAnswer(i)}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-2xl border-2 text-sm font-medium text-left transition-all duration-200",
                !answered && "bg-card border-border text-foreground hover:border-purple-200 hover:shadow-[0_2px_12px_rgba(147,51,234,0.08)] cursor-pointer",
                answered && isCorrect && "bg-green-50 border-green-300 text-green-700",
                answered && isSelected && !isCorrect && "bg-red-50 border-red-300 text-red-700",
                answered && !isCorrect && !isSelected && "bg-card border-border text-muted-foreground",
                answered && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  !answered && "bg-purple-100 text-purple-600",
                  answered && isCorrect && "bg-green-500 text-white",
                  answered && isSelected && !isCorrect && "bg-red-500 text-white",
                  answered && !isCorrect && !isSelected && "bg-muted text-muted-foreground"
                )}
              >
                {answered && isCorrect ? (
                  <Check className="w-3.5 h-3.5" />
                ) : answered && isSelected && !isCorrect ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && step.explanation && (
        <div className="mt-4 p-4 rounded-2xl bg-purple-50 border border-purple-100 text-[13px] text-purple-700 leading-relaxed flex gap-2.5 items-start">
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-purple-500" />
          <span>{step.explanation}</span>
        </div>
      )}
    </div>
  );
}
