import type { ReactNode } from "react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { NetworkMarkIcon } from "@/components/ui/icons";

type AppShellProps = {
  children: ReactNode;
};

/**
 * The product frame: a fixed sidebar on large screens that collapses to a top
 * strip on small ones, with the routed page rendered beside it.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-border bg-surface px-4 py-4 lg:w-60 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-white">
            <NetworkMarkIcon className="size-4.5" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-primary">
            Device Manager
          </span>
        </div>
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
