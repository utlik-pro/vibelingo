import { useState } from "react";
import {
  Zap, GraduationCap, Briefcase, User, HelpCircle,
  Rocket, Globe, Wrench, Sparkles,
  Clock,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function OnboardingScreen({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const STEPS = [
    { id: "welcome" },
    {
      id: "who",
      titleKey: "onboarding.who.title",
      options: [
        { labelKey: "onboarding.who.highschool", icon: <GraduationCap className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.who.student", icon: <User className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.who.working", icon: <Briefcase className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.who.selfEmployed", icon: <Wrench className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.who.other", icon: <HelpCircle className="w-6 h-6 text-purple-500" /> },
      ],
    },
    {
      id: "goal",
      titleKey: "onboarding.goal.title",
      options: [
        { labelKey: "onboarding.goal.saas", icon: <Rocket className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.goal.freelance", icon: <Globe className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.goal.automate", icon: <Wrench className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.goal.curious", icon: <Sparkles className="w-6 h-6 text-purple-500" /> },
      ],
    },
    {
      id: "time",
      titleKey: "onboarding.time.title",
      options: [
        { labelKey: "onboarding.time.5", icon: <Clock className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.time.10", icon: <Clock className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.time.15", icon: <Clock className="w-6 h-6 text-purple-500" /> },
        { labelKey: "onboarding.time.20", icon: <Clock className="w-6 h-6 text-purple-500" /> },
      ],
    },
  ] as const;

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length;
  const progressPct = ((step + 1) / totalSteps) * 100;

  const handleSelect = (stepId: string, labelKey: string) => {
    setSelections((prev) => ({ ...prev, [stepId]: labelKey }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onStart();
    }
  };

  const stepId = currentStep.id as string;
  const canProceed = stepId === "welcome" || !!selections[stepId];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="px-5 pt-4">
        <div className="h-[6px] rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {currentStep.id === "welcome" ? (
          <div className="text-center animate-[fadeIn_0.4s_ease]">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-[0_12px_40px_rgba(147,51,234,0.3)]">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-[32px] font-extrabold text-gray-900 mb-3 leading-tight">
              {t("onboarding.welcome.title")}
            </h1>
            <p className="text-[16px] text-gray-500 max-w-[300px] mx-auto leading-relaxed">
              {t("onboarding.welcome.subtitle")}
            </p>
          </div>
        ) : (
          <div className="w-full max-w-[360px] animate-[fadeIn_0.3s_ease]">
            <h2 className="text-[26px] font-extrabold text-gray-900 text-center mb-6">
              {"titleKey" in currentStep ? t(currentStep.titleKey) : ""}
            </h2>
            <div className="flex flex-col gap-3">
              {"options" in currentStep &&
                currentStep.options.map((opt) => {
                  const isSelected = selections[currentStep.id] === opt.labelKey;
                  return (
                    <button
                      key={opt.labelKey}
                      onClick={() => handleSelect(currentStep.id, opt.labelKey)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-left bg-white cursor-pointer ${
                        isSelected
                          ? "border-purple-500 shadow-[0_4px_20px_rgba(147,51,234,0.15)]"
                          : "border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-purple-50" : "bg-gray-50"
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <span
                        className={`text-[16px] font-semibold ${
                          isSelected ? "text-purple-600" : "text-gray-800"
                        }`}
                      >
                        {t(opt.labelKey)}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8 pt-4">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl text-[17px] font-bold cursor-pointer border-none transition-all duration-200 ${
            canProceed
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(147,51,234,0.3)]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {step === totalSteps - 1 ? t("onboarding.startLearning") : t("onboarding.next")}
        </button>
      </div>
    </div>
  );
}
