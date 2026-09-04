import { cn } from "@/lib/utils/cn";

type SparklineProps = {
  /** Oldest value first. An empty array renders the "no data" rule instead of a line. */
  values: number[];
  /** CSS colour for the stroke, fill wash, and end marker. */
  color: string;
  /** Colour painted behind the end marker's ring so it stays legible over the line. */
  surfaceColor?: string;
  width?: number;
  height?: number;
  /** Describes the series for assistive tech and the native hover tooltip. */
  label: string;
  className?: string;
};

/**
 * A 12-or-so point trend line. Per the mark spec: 2px stroke with round caps, a
 * ~10% area wash beneath it, and an 8px end marker carrying a 2px surface ring so
 * it stays readable where it sits on the line.
 */
export function Sparkline({
  values,
  color,
  surfaceColor = "var(--color-surface)",
  width = 96,
  height = 28,
  label,
  className,
}: SparklineProps) {
  const padding = 4;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  if (values.length === 0) {
    return (
      <svg
        role="img"
        aria-label={`${label}: no data`}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className={cn("overflow-visible", className)}
      >
        <title>{`${label}: no data`}</title>
        <line
          x1={padding}
          y1={height / 2}
          x2={width - padding}
          y2={height / 2}
          stroke="var(--color-border-strong)"
          strokeWidth={1}
        />
      </svg>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  // A flat series would divide by zero; render it down the middle instead.
  const range = max - min || 1;
  const stepX = values.length === 1 ? 0 : innerWidth / (values.length - 1);

  const points = values.map((value, index) => {
    const x = padding + index * stepX;
    const y = padding + innerHeight - ((value - min) / range) * innerHeight;
    return { x, y };
  });

  const linePath = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = `${padding},${height - padding} ${linePath} ${points.at(-1)?.x ?? padding},${height - padding}`;
  const lastPoint = points.at(-1);

  return (
    <svg
      role="img"
      aria-label={`${label}: ${values.join(", ")}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
    >
      <title>{`${label} — latest ${values.at(-1)}, low ${min}, high ${max}`}</title>
      <polygon points={areaPath} fill={color} fillOpacity={0.1} />
      <polyline
        points={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {lastPoint ? (
        <circle cx={lastPoint.x} cy={lastPoint.y} r={4} fill={color} stroke={surfaceColor} strokeWidth={2} />
      ) : null}
    </svg>
  );
}
