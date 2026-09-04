import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { currentLatency } from "@/lib/utils/device-stats";
import { STATUS_FILL } from "@/lib/utils/status-colors";
import type { Device } from "@/lib/types/device";

type LatencyCardProps = {
  devices: Device[];
};

/**
 * Recent round-trip times per device. Devices with no successful pings show a
 * flat rule and "No response" rather than a fabricated line — an unreachable
 * device genuinely has nothing to plot.
 */
export function LatencyCard({ devices }: LatencyCardProps) {
  return (
    <Card title="Recent latency" bodyClassName="p-0">
      <ul className="divide-y divide-border">
        {devices.map((device) => {
          const latest = currentLatency(device);
          return (
            <li key={device.id} className="flex items-center gap-4 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{device.name}</p>
                <p className="font-mono text-xs text-muted">{device.ip}</p>
              </div>
              <Sparkline
                values={device.latency}
                color={STATUS_FILL[device.status]}
                label={`${device.name} latency in milliseconds`}
                className="shrink-0"
              />
              <span className="w-24 shrink-0 whitespace-nowrap text-right font-mono text-sm text-primary tabular-nums">
                {latest === null ? (
                  <span className="text-faint">No response</span>
                ) : (
                  `${latest} ms`
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
