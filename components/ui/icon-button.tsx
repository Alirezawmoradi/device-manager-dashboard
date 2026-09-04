import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "aria-label": string;
  tone?: "default" | "danger";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tone = "default", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-md transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          tone === "danger"
            ? "text-muted hover:bg-danger/10 hover:text-danger"
            : "text-muted hover:bg-surface-hover hover:text-primary",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
