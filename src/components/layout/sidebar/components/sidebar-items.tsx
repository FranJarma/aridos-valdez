import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useMemo } from "react";

import type { SidebarItemProps } from "../types/sidebar.types";

type SidebarItemsProps = {
  isDesktopCollapsed: boolean;
  items: SidebarItemProps[];
  locationPathname: string;
  onItemClick: (path: string) => void;
  useTooltip?: boolean;
};

export function SidebarItems({
  isDesktopCollapsed,
  items,
  locationPathname,
  onItemClick,
  useTooltip = true,
}: SidebarItemsProps) {
  const itemsList = useMemo(() => {
    return items.map((item) => {
      const isActive = locationPathname === item.path;
      const Icon = item.icon;

      const button = (
        <ListItemButton
          key={item.path}
          selected={isActive}
          sx={{
            justifyContent: isDesktopCollapsed ? "center" : "initial",
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
            px: 2.5,
          }}
          onClick={() => onItemClick(item.path)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isDesktopCollapsed ? 0 : 3,
              justifyContent: "center",
            }}
          >
            <Icon />{" "}
          </ListItemIcon>
          {!isDesktopCollapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      );

      if (isDesktopCollapsed && useTooltip) {
        return (
          <Tooltip key={item.path} placement="right" title={item.label}>
            <ListItem disablePadding>{button}</ListItem>
          </Tooltip>
        );
      }

      return (
        <ListItem key={item.path} disablePadding>
          {button}
        </ListItem>
      );
    });
  }, [items, locationPathname, isDesktopCollapsed, onItemClick, useTooltip]);

  return (
    <List disablePadding sx={{ flex: 1, pt: 2 }}>
      {itemsList}
    </List>
  );
}
