import { DeviceStatusBadge } from "@/components/devices/device-status-badge";
import { DeviceRowActions } from "@/components/devices/device-row-actions";
import { DeviceTypeIcon } from "@/components/devices/device-type-icon";
import { Meter } from "@/components/charts/meter";
import { Sparkline } from "@/components/charts/sparkline";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import { currentLatency, uptimeSeverity } from "@/lib/utils/device-stats";
import { STATUS_FILL, STATUS_TRACK } from "@/lib/utils/status-colors";
import type { Device } from "@/lib/types/device";

type DeviceTableRowProps = {
  device: Device;
};

export function DeviceTableRow({ device }: DeviceTableRowProps) {
  const severity = uptimeSeverity(device.uptime);
  const latest = currentLatency(device);

  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-surface-hover">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-muted">
            <DeviceTypeIcon type={device.type} className="size-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-primary">{device.name}</p>
            <p className="text-xs text-muted">{device.type}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-mono text-sm text-muted tabular-nums">{device.ip}</td>
      <td className="px-4 py-3">
        <DeviceStatusBadge status={device.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-muted tabular-nums">
        {formatRelativeTime(device.lastPing)}
      </td>
      <td className="px-4 py-3">
        <div className="w-24">
          <span className="font-mono text-sm text-primary tabular-nums">{device.uptime}%</span>
          <Meter
            className="mt-1.5"
            value={device.uptime}
            color={STATUS_FILL[severity]}
            trackColor={STATUS_TRACK[severity]}
            label={`${device.name} uptime`}
          />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Sparkline
            values={device.latency}
            color={STATUS_FILL[device.status]}
            label={`${device.name} latency in milliseconds`}
          />
          <span className="w-14 shrink-0 font-mono text-xs text-muted tabular-nums">
            {latest === null ? <span className="text-faint">No data</span> : `${latest} ms`}
          </span>
        </div>
      </td>
      <td className="w-10 px-4 py-3 text-right">
        <DeviceRowActions device={device} />
      </td>
    </tr>
  );
}
