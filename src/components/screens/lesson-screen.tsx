import { Button } from "@/components/ui/button";
import { QuizStep } from "@/components/quiz-step";
import { FillStep } from "@/components/fill-step";
import { OrderStep } from "@/components/order-step";
import { Mascot } from "@/components/mascot";
import { Heart, X } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { useI18n } from "@/lib/i18n";
import { useLessonContent } from "@/lib/use-lesson-content";

interface LessonScreenProps {
  lesson: Lesson;
  currentStep: number;
  answered: boolean;
  selectedAnswer: number | null;
  hearts: number;
  onAnswer: (idx: number) => void;
  onNextStep: () => void;
  onClose: () => void;
}

export function LessonScreen({
  lesson,
  currentStep,
  answered,
  selectedAnswer,
  hearts,
  onAnswer,
  onNextStep,
  onClose,
}: LessonScreenProps) {
  const { t } = useI18n();
  const lc = useLessonContent();
  const step = lesson.steps[currentStep];
  const localizedStep = {
    ...step,
    title: lc.getStepTitle(step),
    content: lc.getStepContent(step),
    question: lc.getStepQuestion(step),
    options: lc.getStepOptions(step),
    items: lc.getStepItems(step),
    explanation: lc.getStepExplanation(step),
  };
  const progressPct = (currentStep + 1) / lesson.steps.length;
  const isCorrect = answered && selectedAnswer === step.correct;

  return (
    <div className="min-h-screen bg-background flex flex-col tg-safe-top">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={onClose}
          className="text-gray-400 cursor-pointer p-1.5 hover:text-gray-600 transition-colors bg-transparent border-none rounded-full hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Progress bar */}
        <div className="flex-1 h-[6px] rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-400 ease-out"
            style={{ width: `${progressPct * 100}%` }}
          />
        </div>
        {/* Hearts */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className={`text-sm font-bold ${hearts <= 1 ? "text-red-500" : "text-gray-700"}`}>
            {hearts}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        {step.type === "info" ? (
          <div className="animate-[fadeIn_0.4s_ease] flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-[24px] font-extrabold text-foreground mb-4 text-center leading-tight">
              {localizedStep.title}
            </h2>
            <p className="text-[16px] text-gray-500 leading-[1.7] text-center max-w-[340px]">
              {localizedStep.content}
            </p>
          </div>
        ) : step.type === "quiz" ? (
          <div className="animate-[fadeIn_0.3s_ease]">
            <QuizStep step={localizedStep} onAnswer={onAnswer} answered={answered} selectedAnswer={selectedAnswer} />
            {answered && isCorrect && (
              <div className="mt-4">
                <Mascot message={t("mascot.correct1")} show={true} />
              </div>
            )}
          </div>
        ) : step.type === "fill" ? (
          <div className="animate-[fadeIn_0.3s_ease]">
            <FillStep step={localizedStep} onAnswer={onAnswer} answered={answered} selectedAnswer={selectedAnswer} />
            {answered && isCorrect && (
              <div className="mt-4">
                <Mascot message={t("mascot.correct2")} show={true} />
              </div>
            )}
          </div>
        ) : step.type === "order" ? (
          <div className="animate-[fadeIn_0.3s_ease]">
            <OrderStep step={localizedStep} onAnswer={onAnswer} answered={answered} />
          </div>
        ) : null}
      </div>

      {/* Bottom button */}
      <div className="px-5 pb-6 pt-4">
        {(step.type === "info" || answered) && (
          <Button
            onClick={onNextStep}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-base font-bold shadow-[0_8px_24px_rgba(147,51,234,0.25)] border-none"
          >
            {currentStep < lesson.steps.length - 1 ? t("lesson.next") : t("lesson.finish")}
          </Button>
        )}
      </div>
    </div>
  );
}
