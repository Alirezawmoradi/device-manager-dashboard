import { DeviceStatusBadge } from "@/components/devices/device-status-badge";
import { DeviceRowActions } from "@/components/devices/device-row-actions";
import { DeviceTypeIcon } from "@/components/devices/device-type-icon";
import { Meter } from "@/components/charts/meter";
import { Sparkline } from "@/components/charts/sparkline";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import { currentLatency, uptimeSeverity } from "@/lib/utils/device-stats";
import { STATUS_FILL, STATUS_TRACK } from "@/lib/utils/status-colors";
import { cn } from "@/lib/utils/cn";
import type { Device, DeviceStatus } from "@/lib/types/device";

const BORDER_ACCENT_CLASSES: Record<DeviceStatus, string> = {
  Online: "border-l-online",
  Warning: "border-l-warning",
  Offline: "border-l-offline",
};

type DeviceCardProps = {
  device: Device;
};

/** Sub-lg list layout. The left edge colour nods to a rack indicator light. */
export function DeviceCard({ device }: DeviceCardProps) {
  const severity = uptimeSeverity(device.uptime);
  const latest = currentLatency(device);

  return (
    <div
      className={cn(
        "rounded-lg border border-border border-l-4 bg-surface p-4",
        BORDER_ACCENT_CLASSES[device.status],
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-muted">
            <DeviceTypeIcon type={device.type} className="size-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-primary">{device.name}</p>
            <p className="font-mono text-xs text-muted">{device.ip}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <DeviceStatusBadge status={device.status} />
          <DeviceRowActions device={device} />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs text-muted">Uptime</dt>
          <dd className="mt-1 font-mono text-sm text-primary tabular-nums">{device.uptime}%</dd>
          <Meter
            className="mt-1.5"
            value={device.uptime}
            color={STATUS_FILL[severity]}
            trackColor={STATUS_TRACK[severity]}
            label={`${device.name} uptime`}
          />
        </div>
        <div>
          <dt className="text-xs text-muted">Latency</dt>
          <dd className="mt-1 font-mono text-sm text-primary tabular-nums">
            {latest === null ? <span className="text-faint">No data</span> : `${latest} ms`}
          </dd>
          <Sparkline
            className="mt-1"
            width={80}
            height={20}
            values={device.latency}
            color={STATUS_FILL[device.status]}
            label={`${device.name} latency in milliseconds`}
          />
        </div>
      </dl>

      <p className="mt-4 border-t border-border pt-3 font-mono text-xs text-faint">
        Last ping {formatRelativeTime(device.lastPing)}
      </p>
    </div>
  );
}
