import { useId } from "react";
import type { ReactElement } from "react";
import { cloneElement, isValidElement } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: ReactElement<{ id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }>;
};

/**
 * Labels a single form control and renders its error message directly
 * beneath it, wiring up `id` / `aria-invalid` / `aria-describedby` so the
 * association is accessible, not just visual.
 */
export function FormField({ label, error, hint, children }: FormFieldProps) {
  const inputId = useId();
  const errorId = useId();
  const hintId = useId();

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  const field = isValidElement(children)
    ? cloneElement(children, {
        id: inputId,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
      })
    : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-primary">
        {label}
      </label>
      {field}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
