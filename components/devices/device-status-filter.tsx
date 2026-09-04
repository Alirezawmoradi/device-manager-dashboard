"use client";

import { cn } from "@/lib/utils/cn";
import { useDeviceFilters } from "@/hooks/use-device-filters";
import type { StatusFilter } from "@/lib/types/device";

const OPTIONS: StatusFilter[] = ["All", "Online", "Warning", "Offline"];

/** Segmented status toggle — reads like a channel selector, not a form dropdown. */
export function DeviceStatusFilter() {
  const { status, setStatus } = useDeviceFilters();

  return (
    <div
      role="group"
      aria-label="Filter devices by status"
      className="inline-flex shrink-0 flex-wrap gap-1 rounded-lg border border-border-strong bg-surface p-1"
    >
      {OPTIONS.map((option) => {
        const isActive = status === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => setStatus(option)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive
                ? "bg-accent-muted text-accent"
                : "text-muted hover:text-primary hover:bg-surface-hover",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
