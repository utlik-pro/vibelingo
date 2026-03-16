import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket, X as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function PaymentScreen({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [selectedPlan, setSelectedPlan] = useState("pro_monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PLANS = [
    {
      id: "free",
      name: t("payment.free"),
      price: "$0",
      period: "",
      icon: <Zap className="w-5 h-5" />,
      features: [
        t("payment.free.feature1"),
        t("payment.free.feature2"),
        t("payment.free.feature3"),
      ],
      missing: [
        t("payment.free.missing1"),
        t("payment.free.missing2"),
        t("payment.free.missing3"),
        t("payment.free.missing4"),
      ],
      popular: false,
      priceId: null as string | null,
    },
    {
      id: "pro_monthly",
      name: t("payment.pro"),
      price: "$4.99",
      period: t("payment.perMonth"),
      icon: <Crown className="w-5 h-5" />,
      features: [
        t("payment.pro.feature1"),
        t("payment.pro.feature2"),
        t("payment.pro.feature3"),
        t("payment.pro.feature4"),
        t("payment.pro.feature5"),
        t("payment.pro.feature6"),
      ],
      missing: [] as string[],
      popular: true,
      priceId: "price_1TBXisRpC1XsRnDpjYe9gBZW",
    },
    {
      id: "pro_yearly",
      name: t("payment.proYear"),
      price: "$39.99",
      period: t("payment.perYear"),
      icon: <Rocket className="w-5 h-5" />,
      features: [
        t("payment.proYear.feature1"),
        t("payment.proYear.feature2"),
        t("payment.proYear.feature3"),
        t("payment.proYear.feature4"),
      ],
      missing: [] as string[],
      popular: false,
      priceId: "price_1TBXitRpC1XsRnDpPR1q6Def",
    },
  ];

  const handleSubscribe = async () => {
    const plan = PLANS.find((p) => p.id === selectedPlan);
    if (!plan?.priceId) {
      onClose();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plan.priceId,
          successUrl: `${window.location.origin}/?payment=success`,
          cancelUrl: `${window.location.origin}/?payment=cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(t("payment.error", { message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-background overflow-y-auto tg-safe-top">
      {/* Header */}
      <div className="px-5 pt-4 pb-6">
        <button
          onClick={onClose}
          className="text-muted-foreground mb-4 cursor-pointer bg-transparent border-none p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="mb-3 animate-[popIn_0.5s_ease] flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            {t("payment.unlockPro")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
            {t("payment.proDesc")}
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="px-5 flex flex-col gap-3 pb-6">
        {PLANS.map((plan, i) => (
          <div
            key={plan.id}
            className={cn(
              "p-5 rounded-2xl cursor-pointer transition-all duration-200 animate-[slideIn_0.4s_ease_both] relative bg-card",
              selectedPlan === plan.id
                ? "border-2 border-purple-500 shadow-[0_4px_20px_rgba(147,51,234,0.12)]"
                : "border-2 border-border hover:border-purple-200"
            )}
            style={{ animationDelay: `${i * 100}ms` }}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[10px] font-bold px-3 py-0.5 border-none">
                {t("payment.popular")}
              </Badge>
            )}

            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  selectedPlan === plan.id
                    ? "bg-purple-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {plan.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[15px] font-bold text-foreground">
                    {plan.name}
                  </span>
                  <span className="text-lg font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <XIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radio indicator */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center",
                  selectedPlan === plan.id
                    ? "border-purple-500"
                    : "border-border"
                )}
              >
                {selectedPlan === plan.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 mt-auto">
        <Button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-base font-bold shadow-[0_8px_24px_rgba(147,51,234,0.3)] border-none"
        >
          {loading ? (
            <span className="animate-pulse">{t("payment.loading")}</span>
          ) : selectedPlan === "free" ? (
            t("payment.continueFree")
          ) : (
            `${t("payment.subscribe")} — ${PLANS.find((p) => p.id === selectedPlan)?.price}${PLANS.find((p) => p.id === selectedPlan)?.period}`
          )}
        </Button>
        {error && (
          <p className="text-xs text-red-500 text-center mt-2">{error}</p>
        )}
        <p className="text-[11px] text-muted-foreground text-center mt-3">
          {t("payment.cancelAnytime")}
        </p>
      </div>
    </div>
  );
}
