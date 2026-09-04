"use client";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icons";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useDeviceFilters } from "@/hooks/use-device-filters";

const SEARCH_DEBOUNCE_MS = 350;

/**
 * Local state gives instant typing feedback; the debounced value is what
 * actually reaches the URL (and therefore the server-side filter). A ref
 * tracks the last value *this* input pushed, so it can tell "the URL changed
 * because I pushed it" from "the URL changed externally" (e.g. Clear filters)
 * without the two effects fighting each other.
 */
export function DeviceSearchInput() {
  const { search, setSearch } = useDeviceFilters();
  const [value, setValue] = useState(search);
  const debouncedValue = useDebouncedValue(value, SEARCH_DEBOUNCE_MS);
  const lastPushedRef = useRef(search);

  useEffect(() => {
    if (debouncedValue === lastPushedRef.current) return;
    lastPushedRef.current = debouncedValue;
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  useEffect(() => {
    if (search === lastPushedRef.current) return;
    lastPushedRef.current = search;
    setValue(search);
  }, [search]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by name or IP"
        aria-label="Search devices by name or IP address"
        className="pl-9"
      />
    </div>
  );
}
