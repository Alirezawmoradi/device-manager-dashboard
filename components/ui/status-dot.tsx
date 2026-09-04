import { cn } from "@/lib/utils/cn";
import type { DeviceStatus } from "@/lib/types/device";

const STATUS_CLASSES: Record<DeviceStatus, string> = {
  Online: "bg-online shadow-[0_0_0_3px_var(--color-online-glow)]",
  Warning: "bg-warning shadow-[0_0_0_3px_var(--color-warning-glow)]",
  Offline: "bg-offline shadow-[0_0_0_3px_var(--color-offline-glow)]",
};

type StatusDotProps = {
  status: DeviceStatus;
  className?: string;
};

/** A small glowing dot signalling device status — the "control room" motif. */
export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 rounded-full", STATUS_CLASSES[status], className)}
    />
  );
}
