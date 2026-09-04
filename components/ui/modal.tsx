"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import { IconButton } from "@/components/ui/icon-button";
import { XIcon } from "@/components/ui/icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Built on the native `<dialog>` element so focus trapping, `Escape`-to-close,
 * and the top-layer backdrop come from the browser instead of a hand-rolled
 * focus trap.
 */
export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      onClose();
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={cn(
        "m-auto w-full max-w-md rounded-xl border border-border bg-surface-raised p-0 text-primary shadow-2xl backdrop:bg-black/70",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h2 id={titleId} className="text-base font-semibold text-primary">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-1 text-sm text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <IconButton aria-label="Close dialog" onClick={onClose}>
          <XIcon className="size-4" />
        </IconButton>
      </div>
      <div className="px-5 py-4">{children}</div>
    </dialog>
  );
}
