import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";
import { ChevronDownIcon } from "@/components/ui/icons";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError = false, className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-10 w-full appearance-none rounded-lg border bg-surface px-3 pr-9 text-sm text-primary",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40",
            hasError
              ? "border-danger focus:border-danger"
              : "border-border-strong focus:border-accent",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
    );
  },
);

Select.displayName = "Select";
