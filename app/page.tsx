import { Suspense } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DeviceToolbar } from "@/components/devices/device-toolbar";
import { DeviceList } from "@/components/devices/device-list";
import { DeviceListSkeleton } from "@/components/devices/device-list-skeleton";
import { AddDeviceModal } from "@/components/devices/add-device-modal";
import { Toaster } from "@/components/ui/toaster";
import { parseDeviceQuery } from "@/lib/utils/parse-device-query";

export default async function Page(props: PageProps<"/">) {
  const query = parseDeviceQuery(await props.searchParams);

  return (
    <PageShell>
      <DashboardHeader
        title="Device Manager"
        subtitle="Monitor and manage your network devices"
      />

      <Suspense>
        <DeviceToolbar />
      </Suspense>

      <Suspense key={`${query.search}|${query.status}`} fallback={<DeviceListSkeleton />}>
        <DeviceList query={query} />
      </Suspense>

      <AddDeviceModal />
      <Toaster />
    </PageShell>
  );
}
