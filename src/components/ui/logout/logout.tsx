import { useAuth } from "@/contexts";
import { Logout as LogoutIcon } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

type LogoutButtonProps = {
  isCollapsed?: boolean;
  useTooltip?: boolean;
};

export function LogoutButton({
  isCollapsed = false,
  useTooltip = true,
}: LogoutButtonProps) {
  const { signOut } = useAuth();
  const button = (
    <ListItemButton
      sx={{
        justifyContent: isCollapsed ? "center" : "initial",
        borderRadius: 2,
        px: 2.5,
        color: "#FF8000",
        "&:hover": {
          bgcolor: "orange.50",
        },
      }}
      onClick={signOut}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isCollapsed ? 0 : 3,
          justifyContent: "center",
          color: "inherit",
        }}
      >
        <LogoutIcon />
      </ListItemIcon>
      {!isCollapsed && (
        <ListItemText
          primary="Cerrar sesión"
          primaryTypographyProps={{ fontWeight: 500 }}
        />
      )}
    </ListItemButton>
  );

  return useTooltip && isCollapsed ? (
    <Tooltip title="Cerrar sesión" placement="right">
      <ListItem disablePadding>{button}</ListItem>
    </Tooltip>
  ) : (
    <ListItem disablePadding sx={{ mx: 1, mt: 1 }}>
      {button}
    </ListItem>
  );
}
