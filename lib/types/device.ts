import type { z } from "zod";
import type {
  createDeviceSchema,
  deviceQuerySchema,
  deviceSchema,
  deviceStatusSchema,
  statusFilterSchema,
} from "@/lib/schemas/device";

export type Device = z.infer<typeof deviceSchema>;
export type DeviceStatus = z.infer<typeof deviceStatusSchema>;
export type StatusFilter = z.infer<typeof statusFilterSchema>;
export type DeviceQuery = z.infer<typeof deviceQuerySchema>;
export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;

/** Discriminated result every Server Action returns — callers must narrow `ok`. */
export type ActionResult<TData> =
  | { ok: true; data: TData }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Partial<Record<keyof CreateDeviceInput, string>>;
    };
