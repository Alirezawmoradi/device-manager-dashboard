"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { InboxIcon, SearchXIcon, PlusIcon } from "@/components/ui/icons";
import { useDeviceFilters } from "@/hooks/use-device-filters";
import { useDeviceUiStore } from "@/store/use-device-ui-store";

type DeviceEmptyStateProps = {
  variant: "no-devices" | "no-matches";
};

export function DeviceEmptyState({ variant }: DeviceEmptyStateProps) {
  const openAddModal = useDeviceUiStore((state) => state.openAddModal);
  const { clearFilters } = useDeviceFilters();

  if (variant === "no-devices") {
    return (
      <EmptyState
        icon={<InboxIcon className="size-5" />}
        title="No devices yet"
        description="Add your first device to start monitoring its status."
        action={
          <Button type="button" onClick={openAddModal}>
            <PlusIcon className="size-4" />
            Add device
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      icon={<SearchXIcon className="size-5" />}
      title="No matches found"
      description="No devices match your search or filters. Try a different term, or clear the filters to see all devices."
      action={
        <Button type="button" variant="secondary" onClick={clearFilters}>
          Clear filters
        </Button>
      }
    />
  );
}
