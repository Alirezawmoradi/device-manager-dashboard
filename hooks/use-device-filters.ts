"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { statusFilterSchema } from "@/lib/schemas/device";
import type { StatusFilter } from "@/lib/types/device";

export type DeviceFilters = {
  search: string;
  status: StatusFilter;
  setSearch: (value: string) => void;
  setStatus: (value: StatusFilter) => void;
  clearFilters: () => void;
  isPending: boolean;
};

/**
 * Reads and writes the `search` / `status` query params that drive the
 * server-side filtering in `app/page.tsx`. Every setter navigates via
 * `router.replace` inside a transition, so typing/filtering never floods
 * browser history and the UI can show a subtle pending state while the
 * server re-renders.
 */
export function useDeviceFilters(): DeviceFilters {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const status = statusFilterSchema.catch("All").parse(searchParams.get("status"));

  function navigate(next: URLSearchParams): void {
    const query = next.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  function setSearch(value: string): void {
    const next = new URLSearchParams(searchParams.toString());
    if (value.length > 0) {
      next.set("search", value);
    } else {
      next.delete("search");
    }
    navigate(next);
  }

  function setStatus(value: StatusFilter): void {
    const next = new URLSearchParams(searchParams.toString());
    if (value !== "All") {
      next.set("status", value);
    } else {
      next.delete("status");
    }
    navigate(next);
  }

  function clearFilters(): void {
    navigate(new URLSearchParams());
  }

  return { search, status, setSearch, setStatus, clearFilters, isPending };
}
