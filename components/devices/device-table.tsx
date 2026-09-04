import { DeviceTableRow } from "@/components/devices/device-table-row";
import type { Device } from "@/lib/types/device";

type DeviceTableProps = {
  devices: Device[];
};

/** Desktop (md+) list layout. */
export function DeviceTable({ devices }: DeviceTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-4 py-3 text-xs font-medium text-muted">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium text-muted">
              IP address
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium text-muted">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium text-muted">
              Last ping
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <DeviceTableRow key={device.id} device={device} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
