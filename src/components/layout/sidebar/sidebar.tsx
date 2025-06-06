import { Box, type Theme } from "@mui/material";

import { SidebarDesktop } from "./components/sidebar-desktop";
import { SidebarMobile } from "./components/sidebar-mobile";
import type { SidebarShapeProps } from "./types/sidebar.types";

type SidebarProps = SidebarShapeProps & {
  closeMobile: () => void;
  desktopSidebarWidth: number;
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  mobileSidebarWidth: number;
  theme: Theme;
  toggleMobile: () => void;
};

export function Sidebar({
  closeMobile,
  desktopSidebarWidth,
  filteredMenuItems,
  handleNavigation,
  isDesktopCollapsed,
  isMobileOpen,
  locationPathname,
  mobileSidebarWidth,
  theme,
  ...rest
}: SidebarProps) {
  return (
    <Box aria-label="navigation menu" component="nav">
      <SidebarMobile
        filteredMenuItems={filteredMenuItems}
        handleNavigation={handleNavigation}
        locationPathname={locationPathname}
        mobileSidebarWidth={mobileSidebarWidth}
        open={isMobileOpen}
        onClose={closeMobile}
        {...rest}
      />
      <SidebarDesktop
        desktopSidebarWidth={desktopSidebarWidth}
        filteredMenuItems={filteredMenuItems}
        handleNavigation={handleNavigation}
        isDesktopCollapsed={isDesktopCollapsed}
        locationPathname={locationPathname}
        theme={theme}
        {...rest}
      />
    </Box>
  );
}
