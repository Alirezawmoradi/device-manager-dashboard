"use client";

import { useEffect, useState } from "react";

/**
 * Returns `value`, delayed by `delayMs`. The delay is supplied by the caller
 * on every use rather than fixed inside the hook, so different call sites can
 * debounce at different speeds.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
