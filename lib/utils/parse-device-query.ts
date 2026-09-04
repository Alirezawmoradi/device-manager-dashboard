import { deviceQuerySchema } from "@/lib/schemas/device";
import type { DeviceQuery } from "@/lib/types/device";

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Converts the raw `searchParams` promise result (values can be a string, an
 * array, or undefined) into a validated `DeviceQuery`. Invalid or missing
 * values fall back to defaults via the schema's `.catch()`, so a hand-edited
 * URL never throws.
 */
export function parseDeviceQuery(searchParams: RawSearchParams): DeviceQuery {
  return deviceQuerySchema.parse({
    search: firstValue(searchParams.search),
    status: firstValue(searchParams.status),
  });
}
