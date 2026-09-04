import "server-only";

import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { connection } from "next/server";

import { devicesFileSchema } from "@/lib/schemas/device";
import type { CreateDeviceInput, Device, DeviceQuery } from "@/lib/types/device";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "devices.json");

/**
 * Artificial latency so the loading skeleton is actually visible against a
 * mock data source that would otherwise resolve instantly. Named and exported
 * so it's obviously deliberate, easy to find, and easy to drop later.
 */
export const MOCK_LATENCY_MS = 600;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readDevices(): Promise<Device[]> {
  const raw = await readFile(DATA_FILE_PATH, "utf-8");
  const parsed: unknown = JSON.parse(raw);
  return devicesFileSchema.parse(parsed);
}

async function writeDevices(devices: Device[]): Promise<void> {
  await writeFile(DATA_FILE_PATH, `${JSON.stringify(devices, null, 2)}\n`, "utf-8");
}

export type ListDevicesResult = {
  devices: Device[];
  /** Count of every device before filtering — distinguishes "empty" from "no matches". */
  totalCount: number;
};

export async function listDevices(query: DeviceQuery): Promise<ListDevicesResult> {
  // `data/devices.json` is mutable at runtime, but reading it would otherwise
  // complete during prerendering and freeze the page at its build-time
  // contents. Waiting for a connection keeps every reader request-time, so a
  // page that doesn't happen to touch searchParams still sees fresh data.
  await connection();
  await sleep(MOCK_LATENCY_MS);

  const all = await readDevices();
  const search = query.search.toLowerCase();

  const filtered = all.filter((device) => {
    const matchesSearch =
      search.length === 0 ||
      device.name.toLowerCase().includes(search) ||
      device.ip.toLowerCase().includes(search);

    const matchesStatus = query.status === "All" || device.status === query.status;

    return matchesSearch && matchesStatus;
  });

  return { devices: filtered, totalCount: all.length };
}

export type CreateDeviceResult =
  | { ok: true; device: Device }
  | { ok: false; reason: "duplicate-ip" };

export async function createDevice(input: CreateDeviceInput): Promise<CreateDeviceResult> {
  const devices = await readDevices();

  const isDuplicateIp = devices.some(
    (device) => device.ip.toLowerCase() === input.ip.toLowerCase(),
  );
  if (isDuplicateIp) {
    return { ok: false, reason: "duplicate-ip" };
  }

  const device: Device = {
    id: randomUUID(),
    name: input.name,
    ip: input.ip,
    type: input.type,
    status: input.status,
    lastPing: new Date().toISOString(),
    // A device that has just been registered has no monitoring history yet:
    // it has never been unreachable, and no pings have completed. The UI
    // renders these empty states rather than inventing a trend line.
    uptime: input.status === "Offline" ? 0 : 100,
    latency: [],
  };

  await writeDevices([device, ...devices]);
  return { ok: true, device };
}

export async function deleteDevice(id: string): Promise<{ deleted: boolean }> {
  const devices = await readDevices();
  const next = devices.filter((device) => device.id !== id);
  const deleted = next.length !== devices.length;

  if (deleted) {
    await writeDevices(next);
  }

  return { deleted };
}
