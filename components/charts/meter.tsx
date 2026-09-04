import { cn } from "@/lib/utils/cn";

type MeterProps = {
  /** 0-100. */
  value: number;
  /** CSS colour for the filled portion. */
  color: string;
  /** CSS colour for the unfilled track — a lighter step of the same ramp. */
  trackColor: string;
  label: string;
  className?: string;
};

/**
 * A single ratio against a limit. The fill carries severity and the track is a
 * lighter step of the same ramp, so the state reads across the whole bar rather
 * than only where it happens to end.
 */
export function Meter({ value, color, trackColor, label, className }: MeterProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      title={`${label}: ${clamped}%`}
      className={cn("h-1.5 w-full overflow-hidden rounded-full", className)}
      style={{ backgroundColor: trackColor }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  );
}
