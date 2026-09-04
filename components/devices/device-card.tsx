import { DeviceStatusBadge } from "@/components/devices/device-status-badge";
import { DeviceRowActions } from "@/components/devices/device-row-actions";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
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

/** Mobile (< md) list layout. The left edge color nods to a rack indicator light. */
export function DeviceCard({ device }: DeviceCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-border border-l-4 bg-surface px-4 py-3",
        BORDER_ACCENT_CLASSES[device.status],
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-primary">{device.name}</p>
        <p className="mt-1 font-mono text-xs text-muted">{device.ip}</p>
        <p className="mt-0.5 font-mono text-xs text-muted">
          {formatRelativeTime(device.lastPing)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <DeviceStatusBadge status={device.status} />
        <DeviceRowActions device={device} />
      </div>
    </div>
  );
}
