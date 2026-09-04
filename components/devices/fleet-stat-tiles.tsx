import { StatTile } from "@/components/ui/stat-tile";
import { Meter } from "@/components/charts/meter";
import { DevicesIcon } from "@/components/ui/icons";
import { StatusDot } from "@/components/ui/status-dot";
import { STATUS_FILL, STATUS_TRACK } from "@/lib/utils/status-colors";
import type { FleetStats } from "@/lib/utils/device-stats";

type FleetStatTilesProps = {
  stats: FleetStats;
};

/**
 * The four headline counts. Each status tile carries a meter showing its share
 * of the fleet, so the reader gets the proportion without a second chart.
 */
export function FleetStatTiles({ stats }: FleetStatTilesProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        label="Total devices"
        value={stats.total}
        icon={<DevicesIcon className="size-4 text-accent" />}
        iconTint="var(--color-accent-muted)"
      >
        <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
          {stats.byStatus
            .filter((entry) => entry.count > 0)
            .map((entry) => (
              <div
                key={entry.status}
                title={`${entry.status}: ${entry.count}`}
                style={{
                  width: `${entry.percentage}%`,
                  backgroundColor: STATUS_FILL[entry.status],
                }}
              />
            ))}
        </div>
        <p className="mt-2 text-xs text-muted">Across all monitored devices</p>
      </StatTile>

      {stats.byStatus.map((entry) => (
        <StatTile
          key={entry.status}
          label={entry.status}
          value={entry.count}
          icon={<StatusDot status={entry.status} />}
        >
          <Meter
            value={entry.percentage}
            color={STATUS_FILL[entry.status]}
            trackColor={STATUS_TRACK[entry.status]}
            label={`${entry.status} share of fleet`}
          />
          <p className="mt-2 text-xs text-muted">{entry.percentage}% of fleet</p>
        </StatTile>
      ))}
    </div>
  );
}
