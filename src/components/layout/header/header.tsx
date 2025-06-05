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

        <Stack alignItems="center" direction="row" spacing={1}>
          {/* {!isOnline && (
            <Chip
              color="warning"
              label="Offline"
              size="small"
              sx={{
                fontSize: "0.75rem",
                height: 24,
                borderRadius: 3,
              }}
            />
          )}
          {pendingOperations.length > 0 && (
            <Chip
              color="info"
              label={`${pendingOperations.length} pendientes`}
              size="small"
              sx={{
                fontSize: "0.75rem",
                height: 24,
                borderRadius: 3,
              }}
            />
          )}

          <Tooltip title="Notificaciones">
            <IconButton
              color="inherit"
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip> */}

          {/* <Tooltip title="Perfil de usuario">
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              size="large"
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              onClick={handleMenu}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                {(user?.profile?.name || user?.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip> */}

          {/* <Menu
            keepMounted
            anchorEl={anchorEl}
            id="menu-appbar"
            open={Boolean(anchorEl)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 200,
                boxShadow: theme.shadows[8],
                border: "1px solid",
                borderColor: "divider",
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleClose}
          >
            <MenuItem
              disabled
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "0.875rem",
                }}
              >
                {user?.profile?.name || "Usuario"}
              </Box>
              <Box sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                {user?.profile?.role || "Sin rol"}
              </Box>
            </MenuItem>
            <MenuItem sx={{ borderRadius: 1, mx: 1 }} onClick={handleClose}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: "1.25rem" }} />
              Configuración
            </MenuItem>
            <MenuItem
              sx={{ borderRadius: 1, mx: 1, mb: 1 }}
              onClick={handleSignOut}
            >
              Cerrar Sesión
            </MenuItem>
          </Menu> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
