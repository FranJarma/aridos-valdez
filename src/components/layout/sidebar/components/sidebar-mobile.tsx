import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Drawer, IconButton } from "@mui/material";

import { SidebarItems } from "./sidebar-items";
import type { SidebarItemProps } from "../types/sidebar.types";

import { LogoutButton } from "@/components/ui/logout/logout";

type SidebarMobileProps = {
  filteredMenuItems: SidebarItemProps[];
  handleNavigation: (path: string) => void;
  locationPathname: string;
  mobileSidebarWidth: number;
  onClose: () => void;
  open: boolean;
};

export function SidebarMobile({
  filteredMenuItems,
  handleNavigation,
  locationPathname,
  mobileSidebarWidth,
  onClose,
  open,
}: SidebarMobileProps) {
  return (
    <Drawer
      ModalProps={{ keepMounted: true }}
      open={open}
      variant="temporary"
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: mobileSidebarWidth,
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
      onClose={onClose}
    >
      <Box sx={{ p: 2 }}>
        <IconButton sx={{ mb: 1 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <SidebarItems
          isDesktopCollapsed={false}
          items={filteredMenuItems}
          locationPathname={locationPathname}
          useTooltip={false}
          onItemClick={(path) => {
            handleNavigation(path);
            onClose();
          }}
        />
        <LogoutButton isCollapsed={false} useTooltip={false} />
      </Box>
    </Drawer>
  );
}
