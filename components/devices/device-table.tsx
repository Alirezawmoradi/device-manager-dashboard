import { DeviceTableRow } from "@/components/devices/device-table-row";
import type { Device } from "@/lib/types/device";

type DeviceTableProps = {
  devices: Device[];
};

export const DEVICE_COLUMNS = [
  "Device",
  "IP address",
  "Status",
  "Last ping",
  "Uptime",
  "Latency",
] as const;

/** Desktop (lg+) list layout. */
export function DeviceTable({ devices }: DeviceTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface lg:block">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {DEVICE_COLUMNS.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 text-xs font-medium text-muted">
                {column}
              </th>
            ))}
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
