import "server-only";

import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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
    status: input.status,
    lastPing: new Date().toISOString(),
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
