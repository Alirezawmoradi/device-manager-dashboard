import type { ReactNode } from "react";

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  segments: DonutSegment[];
  /** Rendered in the middle of the ring — typically the total. */
  children?: ReactNode;
  size?: number;
  thickness?: number;
  /** Colour of the 2px separator drawn between touching segments. */
  surfaceColor?: string;
  title: string;
};

/** Gap between touching segments, in px along the arc. */
const SEGMENT_GAP = 2;

/**
 * Part-to-whole at a glance. Segments are separated by a gap in the surface
 * colour rather than by a stroke, so no non-data ink is added. Identity never
 * rests on colour alone — callers pair this with a labelled legend.
 */
export function DonutChart({
  segments,
  children,
  size = 168,
  thickness = 16,
  surfaceColor = "var(--color-surface)",
  title,
}: DonutChartProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const visible = segments.filter((segment) => segment.value > 0);
  // A lone full-circle segment has nothing to be separated from.
  const gap = visible.length > 1 ? SEGMENT_GAP : 0;

  // Offsets are accumulated up front so nothing is mutated while rendering.
  const arcs = visible.reduce<Array<{ segment: DonutSegment; dash: number; offset: number }>>(
    (acc, segment) => {
      const length = (segment.value / total) * circumference;
      const previous = acc.at(-1);
      const offset = previous ? previous.offset + (previous.dash + gap) : 0;
      acc.push({ segment, dash: Math.max(length - gap, 0.01), offset });
      return acc;
    },
    [],
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        role="img"
        aria-label={`${title}: ${segments.map((s) => `${s.label} ${s.value}`).join(", ")}`}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        <title>{title}</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={total === 0 ? "var(--color-surface-hover)" : surfaceColor}
          strokeWidth={thickness}
        />
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {arcs.map(({ segment, dash, offset }) => (
            <circle
              key={segment.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            >
              <title>{`${segment.label}: ${segment.value}`}</title>
            </circle>
          ))}
        </g>
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
