import type { ReactNode } from "react";

type RingMeterProps = {
  /** 0-100. */
  value: number;
  color: string;
  trackColor: string;
  label: string;
  children?: ReactNode;
  size?: number;
  thickness?: number;
};

/**
 * A single ratio against a limit, drawn as a ring: one track, one fill, one hue.
 * It is a meter rather than a two-slice pie — the unfilled remainder is track,
 * not a competing category — so the value reads without inviting comparison
 * between "slices".
 */
export function RingMeter({
  value,
  color,
  trackColor,
  label,
  children,
  size = 176,
  thickness = 14,
}: RingMeterProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (clamped / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clamped}%`}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        <title>{`${label}: ${clamped}%`}</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
