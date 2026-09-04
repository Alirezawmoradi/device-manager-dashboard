import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils/cn";
import type { DeviceStatus } from "@/lib/types/device";

const STATUS_TEXT_CLASSES: Record<DeviceStatus, string> = {
  Online: "text-online",
  Warning: "text-warning",
  Offline: "text-offline",
};

type DeviceStatusBadgeProps = {
  status: DeviceStatus;
};

export function DeviceStatusBadge({ status }: DeviceStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", STATUS_TEXT_CLASSES[status])}>
      <StatusDot status={status} />
      {status}
    </span>
  );
}
