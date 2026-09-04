import { create } from "zustand";

import type { Device } from "@/lib/types/device";

export type ToastVariant = "success" | "error";

export type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

/**
 * Client-side UI state only — modal visibility, which device is pending
 * deletion, and toasts. The device list itself is never duplicated here: the
 * server (filtered by URLSearchParams) stays the single source of truth, so
 * there is nothing to keep in sync.
 */
type DeviceUiStore = {
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;

  devicePendingDelete: Device | null;
  requestDelete: (device: Device) => void;
  cancelDelete: () => void;

  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
};

export const useDeviceUiStore = create<DeviceUiStore>((set) => ({
  isAddModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  devicePendingDelete: null,
  requestDelete: (device) => set({ devicePendingDelete: device }),
  cancelDelete: () => set({ devicePendingDelete: null }),

  toasts: [],
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
