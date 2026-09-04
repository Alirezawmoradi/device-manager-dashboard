"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { DeviceSearchInput } from "@/components/devices/device-search-input";
import { DeviceStatusFilter } from "@/components/devices/device-status-filter";
import { useDeviceUiStore } from "@/store/use-device-ui-store";

export function DeviceToolbar() {
  const openAddModal = useDeviceUiStore((state) => state.openAddModal);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <DeviceSearchInput />
        <DeviceStatusFilter />
      </div>
      <Button type="button" onClick={openAddModal} className="sm:shrink-0">
        <PlusIcon className="size-4" />
        Add device
      </Button>
    </div>
  );
}
