import type { LessonStep } from "@/data/lessons";
import { cn } from "@/lib/utils";

export function FillStep({
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
      <p className="text-[17px] font-semibold text-gray-900 leading-relaxed mb-5">
        {step.question}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {step.options?.map((opt, i) => {
          const correctIdx = typeof step.correct === "number" ? step.correct : step.options?.indexOf(step.correct as unknown as string) ?? -1;
          const isCorrect = i === correctIdx;
          const isSelected = i === selectedAnswer;

          return (
            <button
              key={i}
              onClick={() => !answered && onAnswer(i)}
              className={cn(
                "px-5 py-3 rounded-full border-2 text-sm font-semibold transition-all duration-200",
                !answered && "bg-white border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 cursor-pointer",
                answered && isCorrect && "bg-green-50 border-green-400 text-green-700",
                answered && isSelected && !isCorrect && "bg-red-50 border-red-400 text-red-600",
                answered && !isCorrect && !isSelected && "bg-white border-gray-100 text-gray-400",
                answered && "cursor-default"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
