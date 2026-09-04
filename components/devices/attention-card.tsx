import Link from "next/link";

import { Card } from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";
import { CheckCircleIcon } from "@/components/ui/icons";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import { attentionReason } from "@/lib/utils/device-stats";
import type { Device } from "@/lib/types/device";

type AttentionCardProps = {
  devices: Device[];
};

/**
 * Everything that isn't Online, worst first. Derived from stored status and
 * lastPing rather than a separate alerts feed, so it can never disagree with
 * the device table.
 */
export function AttentionCard({ devices }: AttentionCardProps) {
  return (
    <Card
      title="Needs attention"
      action={
        <Link
          href="/devices"
          className="rounded text-xs font-medium text-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View all devices
        </Link>
      }
      bodyClassName={devices.length === 0 ? "p-5" : "p-0"}
    >
      {devices.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <CheckCircleIcon className="size-5 text-online" />
          <p className="text-sm font-medium text-primary">Every device is online</p>
          <p className="text-sm text-muted">Nothing needs attention right now.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {devices.map((device) => (
            <li key={device.id} className="flex items-start gap-3 px-5 py-3.5">
              <StatusDot status={device.status} className="mt-1.5" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{device.name}</p>
                <p className="text-sm text-muted">{attentionReason(device)}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-xs text-muted">{device.ip}</p>
                <p className="mt-0.5 font-mono text-xs text-faint">
                  {formatRelativeTime(device.lastPing)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
