import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { SIDEBAR_CONSTANTS } from "@/components/layout/sidebar/constants/sidebar.constants";
import { theme } from "@/theme";

type HeaderProps = {
  appBarMarginLeft: string;
  appBarWidth: string;
  isSidebarCollapsed: boolean;
  toggleDesktopSidebar: () => void;
  toggleMobileSidebar: () => void;
  tooltipMessage: string;
};

export function Header({
  appBarMarginLeft,
  appBarWidth,
  isSidebarCollapsed,
  toggleDesktopSidebar,
  toggleMobileSidebar,
  tooltipMessage,
}: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: appBarWidth },
        ml: { md: appBarMarginLeft },
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Toolbar sx={{ minHeight: 64, pl: "16px !important" }}>
        <IconButton
          aria-label={SIDEBAR_CONSTANTS.TOOLTIP.OPEN_SIDEBAR}
          color="inherit"
          sx={{ display: { md: "none" } }}
          onClick={toggleMobileSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Tooltip title={tooltipMessage}>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={toggleDesktopSidebar}
          >
            {isSidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
