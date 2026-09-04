import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the Overview grid so nothing shifts when the real data arrives. */
export function OverviewSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-xl border border-border bg-surface p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-14" />
            <Skeleton className="mt-3 h-1.5 w-full" />
            <Skeleton className="mt-2 h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="rounded-xl border border-border bg-surface">
            <div className="border-b border-border px-5 py-3.5">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-col items-center gap-6 p-5 sm:flex-row sm:gap-8">
              <Skeleton className="size-[176px] shrink-0 rounded-full" />
              <div className="flex w-full flex-col gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="rounded-xl border border-border bg-surface">
            <div className="border-b border-border px-5 py-3.5">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-col gap-4 p-5">
              {Array.from({ length: 3 }, (_, row) => (
                <Skeleton key={row} className="h-8 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
