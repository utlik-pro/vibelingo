import { useI18n } from "@/lib/i18n";

interface ActivityCalendarProps {
  completedDates: string[];
}

export function ActivityCalendar({ completedDates }: ActivityCalendarProps) {
  const { t } = useI18n();
  const today = new Date();
  const WEEKS = 12;
  const DAYS = WEEKS * 7;

  // Build grid: 12 weeks x 7 days
  const cells: { date: string; count: number }[] = [];
  const dateSet = new Set(completedDates);

  // Start from (DAYS - 1) days ago
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - DAYS + 1);
  // Align to Monday
  const dayOfWeek = startDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startDate.setDate(startDate.getDate() + mondayOffset);

  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    // Count occurrences (for now each date appears at most once)
    const count = dateSet.has(dateStr) ? completedDates.filter((cd) => cd === dateStr).length || 1 : 0;
    cells.push({ date: dateStr, count });
  }

  // Month labels
  const months: { label: string; col: number }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const cellIdx = w * 7;
    const d = new Date(cells[cellIdx].date);
    const m = d.getMonth();
    if (m !== lastMonth) {
      months.push({ label: monthNames[m], col: w });
      lastMonth = m;
    }
  }

  const dayLabels = ["M", "", "W", "", "F", "", ""];

  const getColor = (count: number): string => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-purple-200";
    if (count === 2) return "bg-purple-400";
    return "bg-purple-600";
  };

  return (
    <div className="mb-6 p-4 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(147,51,234,0.06)] animate-[slideIn_0.4s_ease_0.18s_both]">
      <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
        {t("profile.activity")}
      </div>
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-[2px] mr-1">
          {dayLabels.map((label, i) => (
            <div key={i} className="w-3 h-3 flex items-center justify-center text-[8px] text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
        {/* Grid */}
        <div className="flex-1 overflow-x-auto">
          {/* Month labels row */}
          <div className="flex gap-[2px] mb-1" style={{ height: 10 }}>
            {Array.from({ length: WEEKS }).map((_, w) => {
              const monthEntry = months.find((m) => m.col === w);
              return (
                <div key={w} className="w-3 flex items-center justify-center text-[7px] text-muted-foreground">
                  {monthEntry ? monthEntry.label : ""}
                </div>
              );
            })}
          </div>
          {/* Calendar grid: 7 rows x WEEKS columns */}
          {Array.from({ length: 7 }).map((_, row) => (
            <div key={row} className="flex gap-[2px]">
              {Array.from({ length: WEEKS }).map((_, col) => {
                const idx = col * 7 + row;
                const cell = cells[idx];
                const isFuture = cell && new Date(cell.date) > today;
                return (
                  <div
                    key={col}
                    className={`w-3 h-3 rounded-[2px] ${isFuture ? "bg-transparent" : getColor(cell?.count || 0)}`}
                    title={cell?.date}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
