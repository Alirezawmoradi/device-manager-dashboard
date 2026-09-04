import { AlertCircleIcon, CheckCircleIcon, XIcon } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils/cn";
import type { ToastVariant } from "@/store/use-device-ui-store";

type ToastProps = {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
};

const VARIANT_STYLES: Record<ToastVariant, { className: string; icon: React.ReactNode }> = {
  success: {
    className: "border-online/30 text-online",
    icon: <CheckCircleIcon className="size-4" />,
  },
  error: {
    className: "border-danger/30 text-danger",
    icon: <AlertCircleIcon className="size-4" />,
  },
};

export function Toast({ message, variant, onDismiss }: ToastProps) {
  const { className, icon } = VARIANT_STYLES[variant];

  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-2.5 rounded-lg border bg-surface-raised px-4 py-3 text-sm text-primary shadow-lg",
        className,
      )}
    >
      {icon}
      <p className="flex-1">{message}</p>
      <IconButton aria-label="Dismiss notification" onClick={onDismiss}>
        <XIcon className="size-3.5" />
      </IconButton>
    </div>
  );
}
