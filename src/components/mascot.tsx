import { Sparkles } from "lucide-react";

export function Mascot({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <div className="flex items-end gap-2.5 animate-[slideUp_0.4s_ease-out]">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-[0_4px_12px_rgba(147,51,234,0.25)] shrink-0">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="relative px-4 py-3 rounded-2xl rounded-bl-sm bg-purple-50 border border-purple-100 max-w-[220px]">
        <span className="text-[14px] font-medium text-purple-700">{message}</span>
      </div>
    </div>
  );
}
