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

/**
 * A small glowing dot signalling device status. Online devices pulse with
 * Tailwind's built-in `animate-ping` — a literal nod to the device being
 * actively pinged, and the only motion in this UI.
 */
export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2", className)}>
      {status === "Online" ? (
        <span className="absolute inset-0 rounded-full bg-online opacity-75 motion-safe:animate-ping" />
      ) : null}
      <span className={cn("relative inline-block size-2 rounded-full", STATUS_CLASSES[status])} />
    </span>
  );
}
