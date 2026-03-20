import { useI18n } from "@/lib/i18n";

function toLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface ActivityCalendarProps {
  completedDates: string[];
}

export function ActivityCalendar({ completedDates }: ActivityCalendarProps) {
  const { t } = useI18n();
  const today = new Date();
  const todayStr = toLocalDate(today);
  const WEEKS = 20;

  // Build cells: columns = weeks, rows = days (Mon–Sun)
  const cells: { date: string; count: number }[][] = [];
  const dateSet = new Set(completedDates);

  // Find start: go back WEEKS*7 days, align to Monday
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - WEEKS * 7 + 1);
  const dow = startDate.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  startDate.setDate(startDate.getDate() + offset);

  for (let w = 0; w < WEEKS; w++) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + w * 7 + d);
      const dateStr = toLocalDate(day);
      const count = dateSet.has(dateStr) ? completedDates.filter((cd) => cd === dateStr).length || 1 : 0;
      week.push({ date: dateStr, count });
    }
    cells.push(week);
  }

  // Month labels
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const [, m] = cells[w][0].date.split("-");
    const month = parseInt(m) - 1;
    if (month !== lastMonth) {
      monthLabels.push({ label: monthNames[month], col: w });
      lastMonth = month;
    }
  }

  const dayLabels = ["M", "", "W", "", "F", "", ""];

  const getColor = (count: number, isFuture: boolean): string => {
    if (isFuture) return "bg-transparent";
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-purple-400";
    if (count === 2) return "bg-purple-500";
    return "bg-purple-700";
  };

  const uniqueDays = new Set(completedDates).size;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-card border border-border shadow-[0_2px_12px_rgba(147,51,234,0.06)] animate-[slideIn_0.4s_ease_0.18s_both]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase">
          {t("profile.activity")}
        </div>
        <div className="text-[12px] font-semibold text-purple-500">
          {uniqueDays} {uniqueDays === 1 ? "day" : "days"}
        </div>
      </div>

      <div className="flex gap-1.5">
        {/* Day labels */}
        <div className="flex flex-col" style={{ gap: 3 }}>
          <div style={{ height: 12 }} /> {/* month row spacer */}
          {dayLabels.map((label, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, marginBottom: 3 }}
              className="flex items-center justify-center text-[8px] text-muted-foreground font-medium"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Month labels */}
          <div className="flex mb-[3px]" style={{ gap: 3 }}>
            {cells.map((_, w) => {
              const entry = monthLabels.find((m) => m.col === w);
              return (
                <div
                  key={w}
                  className="flex-1 text-[8px] text-muted-foreground font-medium text-center leading-none"
                  style={{ minWidth: 0, height: 10 }}
                >
                  {entry?.label ?? ""}
                </div>
              );
            })}
          </div>

          {/* 7 rows × WEEKS cols */}
          {Array.from({ length: 7 }).map((_, row) => (
            <div key={row} className="flex" style={{ gap: 3, marginBottom: row < 6 ? 3 : 0 }}>
              {cells.map((week, col) => {
                const cell = week[row];
                const isFuture = cell.date > todayStr;
                return (
                  <div
                    key={col}
                    className={`flex-1 rounded-[2px] ${getColor(cell.count, isFuture)}`}
                    style={{ minWidth: 0, aspectRatio: "1" }}
                    title={cell.date}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[9px] text-muted-foreground">Less</span>
        {["bg-muted", "bg-purple-400", "bg-purple-500", "bg-purple-700"].map((c, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        <span className="text-[9px] text-muted-foreground">More</span>
      </div>
    </div>
  );
}
