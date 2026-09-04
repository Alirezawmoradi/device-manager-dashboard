"use client";

import { useTransition } from "react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteDeviceAction } from "@/app/actions/device-actions";
import { useDeviceUiStore } from "@/store/use-device-ui-store";

export function DeleteDeviceDialog() {
  const device = useDeviceUiStore((state) => state.devicePendingDelete);
  const cancelDelete = useDeviceUiStore((state) => state.cancelDelete);
  const pushToast = useDeviceUiStore((state) => state.pushToast);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    if (!device) return;
    const { id, name } = device;

    startTransition(async () => {
      const result = await deleteDeviceAction(id);
      cancelDelete();

      if (!result.ok) {
        pushToast({ message: `Couldn't delete ${name}. Try again.`, variant: "error" });
        return;
      }

      pushToast({ message: `${name} deleted`, variant: "success" });
    });
  }

  return (
    <ConfirmDialog
      isOpen={device !== null}
      onClose={cancelDelete}
      onConfirm={handleConfirm}
      title={device ? `Delete ${device.name}?` : "Delete device?"}
      description="This removes it from your device list. This can't be undone."
      confirmLabel={isPending ? "Deleting…" : "Delete device"}
      isDangerous
      isPending={isPending}
    />
  );
}
