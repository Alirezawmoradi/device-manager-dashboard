import type { SVGProps } from "react";

import {
  AccessPointIcon,
  CameraIcon,
  RouterIcon,
  ServerIcon,
  StorageIcon,
  SwitchIcon,
} from "@/components/ui/icons";
import type { DeviceType } from "@/lib/types/device";

const TYPE_ICONS: Record<DeviceType, (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  Switch: SwitchIcon,
  Router: RouterIcon,
  Server: ServerIcon,
  Storage: StorageIcon,
  "Access Point": AccessPointIcon,
  Camera: CameraIcon,
};

type DeviceTypeIconProps = {
  type: DeviceType;
  className?: string;
};

export function DeviceTypeIcon({ type, className }: DeviceTypeIconProps) {
  const Icon = TYPE_ICONS[type];
  return <Icon className={className} />;
}
