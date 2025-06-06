import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Tooltip,
  Typography,
  type Theme,
} from "@mui/material";

import { SidebarItems } from "./sidebar-items";
import type { SidebarItemProps } from "../types/sidebar.types";

import { Logo } from "@/components/ui/logo/logo";
import { LogoutButton } from "@/components/ui/logout/logout";

type SidebarDesktopProps = {
  avatarInitial: string;
  desktopSidebarWidth: number;
  filteredMenuItems: SidebarItemProps[];
  handleNavigation: (path: string) => void;
  isDesktopCollapsed: boolean;
  locationPathname: string;
  sidebarWelcomeText: string;
  theme: Theme;
  userName: string;
};

export function SidebarDesktop({
  avatarInitial,
  desktopSidebarWidth,
  filteredMenuItems,
  handleNavigation,
  isDesktopCollapsed,
  locationPathname,
  sidebarWelcomeText,
  theme,
  userName,
}: SidebarDesktopProps) {
  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          overflow: "hidden",
          width: desktopSidebarWidth,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeOut,
            duration: 200,
          }),
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Logo collapsed={isDesktopCollapsed} isCentered={isDesktopCollapsed} />

        <SidebarItems
          isDesktopCollapsed={isDesktopCollapsed}
          items={filteredMenuItems}
          locationPathname={locationPathname}
          onItemClick={handleNavigation}
        />
        <LogoutButton isCollapsed={isDesktopCollapsed} />

        <Box sx={{ mt: "auto", p: 2 }}>
          <Divider sx={{ mb: 2 }} />
          {isDesktopCollapsed ? (
            <Tooltip placement="right" title={sidebarWelcomeText}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar>{avatarInitial}</Avatar>
              </Box>
            </Tooltip>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                bgcolor: "grey.50",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Avatar sx={{ mr: 1.5 }}>{avatarInitial}</Avatar>
              <Box>
                <Typography fontWeight={600} variant="body2">
                  {sidebarWelcomeText}
                </Typography>
                <Typography noWrap variant="caption">
                  {userName}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
