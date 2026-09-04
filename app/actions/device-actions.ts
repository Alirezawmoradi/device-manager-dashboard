"use server";

import { refresh } from "next/cache";

import { createDeviceSchema, deviceIdSchema } from "@/lib/schemas/device";
import * as deviceRepository from "@/lib/server/device-repository";
import type { ActionResult, CreateDeviceInput, Device } from "@/lib/types/device";

/**
 * Server Actions are reachable via direct POST, not just through this app's
 * UI, so every input is re-validated here with the same Zod schema the form
 * uses client-side — the client is never trusted.
 */
export async function createDeviceAction(
  input: unknown,
): Promise<ActionResult<Device>> {
  const parsed = createDeviceSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof CreateDeviceInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as keyof typeof fieldErrors] = issue.message;
      }
    }
    return { ok: false, fieldErrors };
  }

  const result = await deviceRepository.createDevice(parsed.data);
  if (!result.ok) {
    return {
      ok: false,
      fieldErrors: { ip: "This IP address is already assigned to another device" },
    };
  }

  refresh();
  return { ok: true, data: result.device };
}

export async function deleteDeviceAction(
  id: unknown,
): Promise<ActionResult<{ id: string }>> {
  const parsed = deviceIdSchema.safeParse(id);
  if (!parsed.success) {
    return { ok: false, formError: "Invalid device id" };
  }

  const result = await deviceRepository.deleteDevice(parsed.data);
  if (!result.deleted) {
    return { ok: false, formError: "Device could not be found" };
  }

  refresh();
  return { ok: true, data: { id: parsed.data } };
}
