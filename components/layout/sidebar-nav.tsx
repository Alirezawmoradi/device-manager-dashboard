"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { DevicesIcon, GaugeIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "Overview", Icon: GaugeIcon },
  { href: "/devices", label: "Devices", Icon: DevicesIcon },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex gap-1 lg:flex-col">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive
                ? "bg-accent-muted text-primary"
                : "text-muted hover:bg-surface-hover hover:text-primary",
            )}
          >
            <Icon className={cn("size-4", isActive && "text-accent")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
