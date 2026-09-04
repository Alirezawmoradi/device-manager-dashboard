import { z } from "zod";

/**
 * Every device type in the app is inferred from these schemas, so the runtime
 * validation and the compile-time types can never drift apart.
 */

/** Strict IPv4: four 0-255 octets, no leading zeros, no ranges or ports. */
const IPV4_PATTERN =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

export const deviceStatusSchema = z.enum(["Online", "Offline", "Warning"]);

export const deviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  ip: z.string().regex(IPV4_PATTERN),
  status: deviceStatusSchema,
  /** ISO-8601 instant of the last successful ping. */
  lastPing: z.string().min(1),
});

/** Shape of `data/devices.json` as a whole. */
export const devicesFileSchema = z.array(deviceSchema);

/** What the "add device" form collects — the server re-validates with this too. */
export const createDeviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Device name is required")
    .max(64, "Device name must be 64 characters or fewer"),
  ip: z
    .string()
    .trim()
    .min(1, "IP address is required")
    .regex(IPV4_PATTERN, "Enter a valid IPv4 address (e.g. 192.168.1.1)"),
  status: deviceStatusSchema,
});

/** The status filter adds an "All" option on top of the real device statuses. */
export const statusFilterSchema = z.enum([
  "All",
  ...deviceStatusSchema.options,
]);

/**
 * The server-side query parsed out of the URL. Both fields use `.catch()` so a
 * hand-edited query string (`?status=garbage`) degrades to the default instead
 * of throwing and taking the whole page down.
 */
export const deviceQuerySchema = z.object({
  search: z.string().trim().catch(""),
  status: statusFilterSchema.catch("All"),
});

export const deviceIdSchema = z.string().min(1, "A device id is required");
