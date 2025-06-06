import type { Theme } from "@mui/material";
import { type NavigateFunction } from "react-router-dom";

import { menuItems } from "../constants/sidebar.constants";

import type { AuthUser } from "@/contexts";

function getAvatarInitials(displayName?: string): string {
  return (displayName || "U").charAt(0).toUpperCase();
}

function getSidebarWelcomeText(displayName: string): string {
  return `Bienvenido, ${displayName}`;
}

function getUsername(user: AuthUser | null): string {
  return user?.profile?.name || user?.email || "Usuario";
}

type ShapeSidebarData = {
  closeMobileDrawer: () => void;
  desktopSidebarWidth: number;
  hasPermissions: (permission: string[]) => boolean;
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  locationPathname: string;
  mobileSidebarWidth: number;
  navigate: NavigateFunction;
  theme: Theme;
  toggleMobileSidebar: () => void;
  user: AuthUser | null;
};

export function shapeSidebarData({
  closeMobileDrawer,
  desktopSidebarWidth,
  hasPermissions,
  isDesktopCollapsed,
  isMobileOpen,
  locationPathname,
  mobileSidebarWidth,
  navigate,
  theme,
  toggleMobileSidebar,
  user,
}: ShapeSidebarData) {
  const userName = getUsername(user);
  const avatarInitial = getAvatarInitials(userName);
  const sidebarWelcomeText = getSidebarWelcomeText(userName);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const filteredMenuItems = menuItems.filter(
    (item) => item.permissions.length === 0 || hasPermissions(item.permissions),
  );

  return {
    avatarInitial,
    desktopSidebarWidth,
    filteredMenuItems,
    isDesktopCollapsed,
    isMobileOpen,
    locationPathname,
    mobileSidebarWidth,
    sidebarWelcomeText,
    theme,
    user,
    userName,
    closeMobile: closeMobileDrawer,
    toggleMobile: toggleMobileSidebar,
    handleNavigation,
  };
}
