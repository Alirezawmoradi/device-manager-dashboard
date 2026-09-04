"use client";

import { IconButton } from "@/components/ui/icon-button";
import { TrashIcon } from "@/components/ui/icons";
import { useDeviceUiStore } from "@/store/use-device-ui-store";
import type { Device } from "@/lib/types/device";

type DeviceRowActionsProps = {
  device: Device;
};

export function DeviceRowActions({ device }: DeviceRowActionsProps) {
  const requestDelete = useDeviceUiStore((state) => state.requestDelete);

  return (
    <IconButton
      tone="danger"
      aria-label={`Delete ${device.name}`}
      onClick={() => requestDelete(device)}
    >
      <TrashIcon className="size-4" />
    </IconButton>
  );
}
