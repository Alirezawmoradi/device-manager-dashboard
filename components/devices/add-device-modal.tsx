"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createDeviceAction } from "@/app/actions/device-actions";
import { createDeviceSchema } from "@/lib/schemas/device";
import { useDeviceUiStore } from "@/store/use-device-ui-store";
import type { CreateDeviceInput } from "@/lib/types/device";

const DEFAULT_VALUES: CreateDeviceInput = {
  name: "",
  ip: "",
  status: "Online",
};

export function AddDeviceModal() {
  const isOpen = useDeviceUiStore((state) => state.isAddModalOpen);
  const closeAddModal = useDeviceUiStore((state) => state.closeAddModal);
  const pushToast = useDeviceUiStore((state) => state.pushToast);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateDeviceInput>({
    resolver: zodResolver(createDeviceSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  function handleClose() {
    reset(DEFAULT_VALUES);
    closeAddModal();
  }

  async function onSubmit(values: CreateDeviceInput) {
    const result = await createDeviceAction(values);

    if (!result.ok) {
      let focused = false;
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        if (!message) continue;
        setError(field as keyof CreateDeviceInput, { message }, { shouldFocus: !focused });
        focused = true;
      }
      return;
    }

    reset(DEFAULT_VALUES);
    closeAddModal();
    pushToast({ message: `${result.data.name} added`, variant: "success" });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add device"
      description="Register a new device to start monitoring it."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <FormField label="Device name" error={errors.name?.message}>
          <Input
            {...register("name")}
            hasError={Boolean(errors.name)}
            placeholder="e.g. Core-Switch-01"
            autoFocus
          />
        </FormField>

        <FormField label="IP address" error={errors.ip?.message}>
          <Input
            {...register("ip")}
            hasError={Boolean(errors.ip)}
            placeholder="e.g. 192.168.1.20"
            className="font-mono"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
          />
        </FormField>

        <FormField label="Initial status" error={errors.status?.message}>
          <Select {...register("status")} hasError={Boolean(errors.status)}>
            <option value="Online">Online</option>
            <option value="Warning">Warning</option>
            <option value="Offline">Offline</option>
          </Select>
        </FormField>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isSubmitting ? "Adding device…" : "Add device"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
