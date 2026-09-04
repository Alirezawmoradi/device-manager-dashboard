import { Card } from "@/components/ui/card";
import { RingMeter } from "@/components/charts/ring-meter";
import { uptimeSeverity } from "@/lib/utils/device-stats";
import { STATUS_FILL, STATUS_TRACK } from "@/lib/utils/status-colors";
import type { FleetStats } from "@/lib/utils/device-stats";

type FleetUptimeCardProps = {
  stats: FleetStats;
};

/**
 * The number this dashboard leads with: mean uptime across every device. The
 * supporting figures beside it are the other two things measurable from stored
 * data — how many devices answered their last ping, and how fast.
 */
export function FleetUptimeCard({ stats }: FleetUptimeCardProps) {
  const uptime = stats.averageUptime ?? 0;
  const severity = uptimeSeverity(uptime);
  const responding = stats.byStatus.find((entry) => entry.status === "Online")?.count ?? 0;

  return (
    <Card title="Fleet uptime">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <RingMeter
          value={uptime}
          color={STATUS_FILL[severity]}
          trackColor={STATUS_TRACK[severity]}
          label="Average uptime across all devices"
        >
          <span className="text-5xl font-semibold tracking-tight text-primary">
            {stats.averageUptime === null ? "—" : `${Math.round(uptime)}%`}
          </span>
          <span className="mt-1 text-xs text-muted">average uptime</span>
        </RingMeter>

        <dl className="flex w-full flex-col gap-4 sm:max-w-[13rem]">
          <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
            <dt className="text-sm text-muted">Responding now</dt>
            <dd className="text-sm font-medium text-primary tabular-nums">
              {responding} of {stats.total}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
            <dt className="text-sm text-muted">Average latency</dt>
            <dd className="font-mono text-sm font-medium text-primary tabular-nums">
              {stats.averageLatency === null ? "—" : `${stats.averageLatency} ms`}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-muted">Needs attention</dt>
            <dd className="text-sm font-medium text-primary tabular-nums">
              {stats.needsAttention.length}
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
