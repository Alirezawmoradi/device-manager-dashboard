import { DeviceStatusBadge } from "@/components/devices/device-status-badge";
import { DeviceRowActions } from "@/components/devices/device-row-actions";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import type { Device } from "@/lib/types/device";

type DeviceTableRowProps = {
  device: Device;
};

export function DeviceTableRow({ device }: DeviceTableRowProps) {
  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-surface-hover">
      <td className="px-4 py-3 text-sm font-medium text-primary">{device.name}</td>
      <td className="px-4 py-3 font-mono text-sm text-muted">{device.ip}</td>
      <td className="px-4 py-3">
        <DeviceStatusBadge status={device.status} />
      </td>
      <td className="px-4 py-3 font-mono text-sm text-muted">
        {formatRelativeTime(device.lastPing)}
      </td>
      <td className="w-10 px-4 py-3 text-right">
        <DeviceRowActions device={device} />
      </td>
    </tr>
  );
}
