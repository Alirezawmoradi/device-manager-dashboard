import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type StatTileProps = {
  /** Sentence case, no trailing colon. */
  label: string;
  value: string | number;
  icon?: ReactNode;
  /** Background tint behind the icon — usually the matching status colour. */
  iconTint?: string;
  /** Supporting row beneath the value: a meter, a share, a caption. */
  children?: ReactNode;
  className?: string;
};

/**
 * A headline number with its label. Values use the font's proportional figures —
 * `tabular-nums` gives every digit the width of a zero, which reads loose at
 * display sizes and belongs in aligned columns instead.
 */
export function StatTile({ label, value, icon, iconTint, children, className }: StatTileProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-4", className)}>
      <div className="flex items-center gap-2.5">
        {icon ? (
          <span
            className="flex size-7 items-center justify-center rounded-lg text-primary"
            style={iconTint ? { backgroundColor: iconTint } : undefined}
          >
            {icon}
          </span>
        ) : null}
        <span className="text-sm text-muted">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-primary">{value}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}
