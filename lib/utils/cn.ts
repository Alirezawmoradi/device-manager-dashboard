/**
 * Joins class names, skipping falsy values. Small dependency-free stand-in
 * for `clsx` — the project has no other use for a full class-merging utility.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
