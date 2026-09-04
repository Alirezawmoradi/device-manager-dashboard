const UNITS: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
  { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
  { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
  { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
  { unit: "day", ms: 1000 * 60 * 60 * 24 },
  { unit: "hour", ms: 1000 * 60 * 60 },
  { unit: "minute", ms: 1000 * 60 },
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

/**
 * Formats an ISO timestamp as a short relative string ("2 mins ago", "Just now").
 * Falls back to "Just now" for anything under a minute, and to the raw ISO
 * string if it can't be parsed at all (keeps this a total function).
 */
export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) {
    return iso;
  }

  const diffMs = now.getTime() - then.getTime();
  if (diffMs < 60_000) {
    return "Just now";
  }

  for (const { unit, ms } of UNITS) {
    const value = Math.floor(diffMs / ms);
    if (value >= 1) {
      return relativeTimeFormatter.format(-value, unit);
    }
  }

  return relativeTimeFormatter.format(-Math.floor(diffMs / 1000), "second");
}
