import { Skeleton } from "@/components/ui/skeleton";

const TABLE_SKELETON_ROWS = 5;
const CARD_SKELETON_ROWS = 3;

/** Mirrors DeviceTable/DeviceCard column widths so there's no layout jump on load. */
export function DeviceListSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-xs font-medium text-muted">Name</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">IP address</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">Last ping</th>
              <th className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: TABLE_SKELETON_ROWS }, (_, index) => (
              <tr key={index} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="ml-auto size-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 md:hidden" aria-hidden>
        {Array.from({ length: CARD_SKELETON_ROWS }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
