import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type CardProps = {
  /** Omit for a bare panel with no heading row. */
  title?: string;
  /** Rendered opposite the title — a link, a count, a legend key. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/** A titled surface panel. The heading row is dropped entirely when unused. */
export function Card({ title, action, children, className, bodyClassName }: CardProps) {
  return (
    <section className={cn("rounded-xl border border-border bg-surface", className)}>
      {title ? (
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-primary">{title}</h2>
          {action}
        </header>
      ) : null}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
