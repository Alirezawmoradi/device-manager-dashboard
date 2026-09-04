import type { ReactNode } from "react";

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
  /** Optional content rendered on the right, e.g. a live device-count badge. */
  actions?: ReactNode;
};

export function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
