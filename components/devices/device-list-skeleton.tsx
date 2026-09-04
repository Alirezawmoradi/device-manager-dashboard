import { Skeleton } from "@/components/ui/skeleton";
import { DEVICE_COLUMNS } from "@/components/devices/device-table";

const TABLE_SKELETON_ROWS = 4;
const CARD_SKELETON_ROWS = 3;

/** Mirrors the table and card layouts so there's no layout jump on load. */
export function DeviceListSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              {DEVICE_COLUMNS.map((column) => (
                <th key={column} className="px-4 py-3 text-xs font-medium text-muted">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: TABLE_SKELETON_ROWS }, (_, index) => (
              <tr key={index} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-lg" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-14" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex w-24 flex-col gap-1.5">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-1.5 w-full" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="ml-auto size-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 lg:hidden" aria-hidden>
        {Array.from({ length: CARD_SKELETON_ROWS }, (_, index) => (
          <div key={index} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
