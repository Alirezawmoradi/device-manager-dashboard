import { Card } from "@/components/ui/card";
import { DonutChart } from "@/components/charts/donut-chart";
import { STATUS_FILL } from "@/lib/utils/status-colors";
import type { FleetStats } from "@/lib/utils/device-stats";

type StatusDistributionCardProps = {
  stats: FleetStats;
};

/**
 * Part-to-whole across the three states. The legend carries the label and count
 * for every segment, so identity never depends on telling two hues apart.
 */
export function StatusDistributionCard({ stats }: StatusDistributionCardProps) {
  return (
    <Card title="Status distribution">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
        <DonutChart
          title="Devices by status"
          segments={stats.byStatus.map((entry) => ({
            label: entry.status,
            value: entry.count,
            color: STATUS_FILL[entry.status],
          }))}
        >
          <span className="text-2xl font-semibold tracking-tight text-primary">
            {stats.total}
          </span>
          <span className="text-xs text-muted">devices</span>
        </DonutChart>

        <ul className="flex w-full max-w-[13rem] flex-col gap-2.5">
          {stats.byStatus.map((entry) => (
            <li key={entry.status} className="flex items-center gap-2.5 text-sm">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: STATUS_FILL[entry.status] }}
              />
              <span className="flex-1 text-muted">{entry.status}</span>
              <span className="font-medium text-primary tabular-nums">{entry.count}</span>
              <span className="w-12 text-right text-xs text-faint tabular-nums">
                {entry.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
