"use client";

import { useEffect } from "react";

import { Toast } from "@/components/ui/toast";
import { useDeviceUiStore } from "@/store/use-device-ui-store";

const AUTO_DISMISS_MS = 4000;

function ToastItem({ id, message, variant }: { id: string; message: string; variant: "success" | "error" }) {
  const dismissToast = useDeviceUiStore((state) => state.dismissToast);

  useEffect(() => {
    const timeoutId = setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    return () => clearTimeout(timeoutId);
  }, [id, dismissToast]);

  return <Toast message={message} variant={variant} onDismiss={() => dismissToast(id)} />;
}

/** Renders the queue of toasts from the UI store as a fixed stack. */
export function Toaster() {
  const toasts = useDeviceUiStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem id={toast.id} message={toast.message} variant={toast.variant} />
        </div>
      ))}
    </div>
  );
}
