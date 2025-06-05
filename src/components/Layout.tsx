import { Box, useTheme } from "@mui/material";
import { type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Header } from "./layout/header/header";
import { shapeHeaderData } from "./layout/header/utils/shapeHeaderData";
import { SIDEBAR_CONSTANTS } from "./layout/sidebar/constants/sidebar.constants";
import { useSidebarStore } from "./layout/sidebar/store/sidebar.store";
import { shapeSidebarData } from "./layout/sidebar/utils/shapeSidebarData";

import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { useAuth } from "@/contexts";

export function Layout({ children }: PropsWithChildren) {
  const theme = useTheme();
  const { hasPermissions, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    closeMobileDrawer,
    isDesktopCollapsed,
    isMobileOpen,
    toggleDesktopCollapse,
    toggleMobileSidebar,
  } = useSidebarStore();

  const desktopSidebarWidth = isDesktopCollapsed
    ? SIDEBAR_CONSTANTS.WIDTH.COLLAPSED
    : SIDEBAR_CONSTANTS.WIDTH.EXPANDED;

  const mobileSidebarWidth = isMobileOpen
    ? SIDEBAR_CONSTANTS.WIDTH.EXPANDED
    : SIDEBAR_CONSTANTS.WIDTH.COLLAPSED;

  const headerData = shapeHeaderData({
    isDesktopCollapsed,
    desktopSidebarWidth,
    toggleDesktopCollapse,
    toggleMobileSidebar,
  });

  const sidebarData = shapeSidebarData({
    desktopSidebarWidth,
    isDesktopCollapsed,
    isMobileOpen,
    locationPathname: pathname,
    mobileSidebarWidth,
    theme,
    user,
    closeMobileDrawer,
    hasPermissions,
    navigate,
    toggleMobileSidebar,
  });

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header {...headerData} />
      <Sidebar {...sidebarData} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          overflow: "auto",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: { md: `${desktopSidebarWidth}px` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
