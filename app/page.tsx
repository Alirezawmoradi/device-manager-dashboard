import { Suspense } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { FleetStatTiles } from "@/components/devices/fleet-stat-tiles";
import { FleetUptimeCard } from "@/components/devices/fleet-uptime-card";
import { StatusDistributionCard } from "@/components/devices/status-distribution-card";
import { AttentionCard } from "@/components/devices/attention-card";
import { LatencyCard } from "@/components/devices/latency-card";
import { OverviewSkeleton } from "@/components/devices/overview-skeleton";
import { listDevices } from "@/lib/server/device-repository";
import { getFleetStats } from "@/lib/utils/device-stats";

async function OverviewContent() {
  const { devices } = await listDevices({ search: "", status: "All" });
  const stats = getFleetStats(devices);

  return (
    <>
      <FleetStatTiles stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FleetUptimeCard stats={stats} />
        <StatusDistributionCard stats={stats} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AttentionCard devices={stats.needsAttention} />
        <LatencyCard devices={devices} />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <PageShell>
      <DashboardHeader
        title="Overview"
        subtitle="Fleet health at a glance, from the latest reported device data"
      />
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewContent />
      </Suspense>
    </PageShell>
  );
}
