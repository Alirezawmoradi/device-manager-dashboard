import { cn } from "@/lib/utils/cn";

type SkeletonProps = {
  className?: string;
};

/**
 * Shimmering placeholder block. Sizing is entirely up to the caller via
 * `className` (e.g. `h-4 w-32`) so one primitive covers every shape.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-surface-raised", className)}
    />
  );
}
