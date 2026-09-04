import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type BadgeTone = "online" | "warning" | "offline" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  online: "bg-online/10 text-online",
  warning: "bg-warning/10 text-warning",
  offline: "bg-offline/10 text-offline",
  neutral: "bg-surface-hover text-muted",
};

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

/** Generic pill for a short label — device status text, counts, etc. */
export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
