import { listDevices } from "@/lib/server/device-repository";
import { DeviceTable } from "@/components/devices/device-table";
import { DeviceCard } from "@/components/devices/device-card";
import { DeviceEmptyState } from "@/components/devices/device-empty-state";
import type { DeviceQuery } from "@/lib/types/device";

type DeviceListProps = {
  query: DeviceQuery;
};

/**
 * Server Component: fetches the already-filtered devices for the current
 * `query` and branches between the two empty states and the real list. This
 * is what streams in behind the `<Suspense>` boundary in `app/page.tsx`.
 */
export async function DeviceList({ query }: DeviceListProps) {
  const { devices, totalCount } = await listDevices(query);

  if (totalCount === 0) {
    return <DeviceEmptyState variant="no-devices" />;
  }

  if (devices.length === 0) {
    return <DeviceEmptyState variant="no-matches" />;
  }

  return (
    <>
      <DeviceTable devices={devices} />
      <div className="flex flex-col gap-3 lg:hidden">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </>
  );
}
