import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type SidebarProps = {
  collapsed?: boolean;
  onItemClick?: () => void;
};

export type SidebarItemProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label: string;
  path: string;
  permissions: string[];
};

export type SidebarShapeProps = {
  avatarInitial: string;
  filteredMenuItems: SidebarItemProps[];
  handleNavigation: (path: string) => void;
  locationPathname: string;
  sidebarWelcomeText: string;
  user: {
    email?: string;
    profile?: {
      name?: string;
      role?: string;
    };
  } | null;
  userName: string;
};
