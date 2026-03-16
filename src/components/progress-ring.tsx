export function ProgressRing({
  progress,
  size = 48,
  stroke = 4,
  color = "var(--color-accent)",
}: {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - progress * circ;

  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90 drop-shadow-[0_0_6px_rgba(108,92,231,0.25)]"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-800 ease-out"
        style={{ filter: "drop-shadow(0 0 4px rgba(108, 92, 231, 0.3))" }}
      />
    </svg>
  );
}
