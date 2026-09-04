import type { Device, DeviceStatus } from "@/lib/types/device";

/**
 * Pure aggregations over a device list. Everything the dashboard charts render
 * is computed here from stored device data — no figure is invented at render
 * time, so a number on screen can always be traced back to `data/devices.json`.
 */

export type StatusBreakdown = {
  status: DeviceStatus;
  count: number;
  /** Share of the fleet, 0-100. `0` when there are no devices at all. */
  percentage: number;
};

export type FleetStats = {
  total: number;
  byStatus: StatusBreakdown[];
  /** Mean uptime across every device, 0-100. `null` with no devices. */
  averageUptime: number | null;
  /** Mean of the most recent latency sample per responding device. `null` when none respond. */
  averageLatency: number | null;
  /** Devices that are not healthy, worst status first, then oldest ping first. */
  needsAttention: Device[];
};

const STATUS_ORDER: DeviceStatus[] = ["Online", "Warning", "Offline"];
const ATTENTION_PRIORITY: Record<DeviceStatus, number> = {
  Offline: 0,
  Warning: 1,
  Online: 2,
};

function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** The most recent latency sample, or `null` when a device has no successful pings. */
export function currentLatency(device: Device): number | null {
  return device.latency.at(-1) ?? null;
}

export function getFleetStats(devices: Device[]): FleetStats {
  const total = devices.length;

  const byStatus: StatusBreakdown[] = STATUS_ORDER.map((status) => {
    const count = devices.filter((device) => device.status === status).length;
    return {
      status,
      count,
      percentage: total === 0 ? 0 : round((count / total) * 100),
    };
  });

  const averageUptime =
    total === 0
      ? null
      : round(devices.reduce((sum, device) => sum + device.uptime, 0) / total);

  const latencies = devices
    .map(currentLatency)
    .filter((value): value is number => value !== null);
  const averageLatency =
    latencies.length === 0
      ? null
      : round(latencies.reduce((sum, value) => sum + value, 0) / latencies.length, 0);

  const needsAttention = devices
    .filter((device) => device.status !== "Online")
    .sort((a, b) => {
      const byPriority = ATTENTION_PRIORITY[a.status] - ATTENTION_PRIORITY[b.status];
      if (byPriority !== 0) return byPriority;
      return Date.parse(a.lastPing) - Date.parse(b.lastPing);
    });

  return { total, byStatus, averageUptime, averageLatency, needsAttention };
}

/**
 * Severity of an uptime figure, used to colour its meter. This judges the uptime
 * value itself rather than echoing the device's status column, so the two aren't
 * redundant: a device can be Online today yet carry a poor uptime record.
 */
export function uptimeSeverity(uptime: number): DeviceStatus {
  if (uptime >= 99) return "Online";
  if (uptime >= 90) return "Warning";
  return "Offline";
}

/** Why a device needs attention, phrased for the reader rather than the system. */
export function attentionReason(device: Device): string {
  return device.status === "Offline"
    ? "Not responding to pings"
    : "Responding slowly and dropping packets";
}
