import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils/cn";
import type { DeviceStatus } from "@/lib/types/device";

const CHIP_CLASSES: Record<DeviceStatus, string> = {
  Online: "bg-online/10",
  Warning: "bg-warning/10",
  Offline: "bg-offline/10",
};

type DeviceStatusBadgeProps = {
  status: DeviceStatus;
};

/**
 * The dot carries the colour; the label stays in text ink. Status is never
 * signalled by colour alone, and the word is readable at any contrast setting.
 */
export function DeviceStatusBadge({ status }: DeviceStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium text-primary",
        CHIP_CLASSES[status],
      )}
    >
      <StatusDot status={status} />
      {status}
    </span>
  );
}
