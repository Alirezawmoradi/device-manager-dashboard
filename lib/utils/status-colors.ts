import type { DeviceStatus } from "@/lib/types/device";

/**
 * Chart marks reference the design tokens rather than raw hex, so the validated
 * palette lives in exactly one place (`app/globals.css`).
 *
 * `FILL` is the dark-surface step used for areas — donut segments, meter fills,
 * sparkline strokes. `TRACK` is the lighter step of the same ramp used for the
 * unfilled part of a meter.
 */
export const STATUS_FILL: Record<DeviceStatus, string> = {
  Online: "var(--color-online-fill)",
  Warning: "var(--color-warning-fill)",
  Offline: "var(--color-offline-fill)",
};

export const STATUS_TRACK: Record<DeviceStatus, string> = {
  Online: "var(--color-online-track)",
  Warning: "var(--color-warning-track)",
  Offline: "var(--color-offline-track)",
};

/** Bright step, reserved for small marks such as the 8px status dot. */
export const STATUS_DOT: Record<DeviceStatus, string> = {
  Online: "var(--color-online)",
  Warning: "var(--color-warning)",
  Offline: "var(--color-offline)",
};
