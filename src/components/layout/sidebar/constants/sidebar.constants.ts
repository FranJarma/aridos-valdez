import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Build as MachineryIcon,
  SwapHoriz as MovementsIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

import type { SidebarItemProps } from "./../types/sidebar.types";

export const menuItems: SidebarItemProps[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    permissions: ["read"],
  },
  {
    label: "Materiales",
    path: "/materiales",
    icon: InventoryIcon,
    permissions: ["read"],
  },
  {
    label: "Maquinaria",
    path: "/maquinaria",
    icon: MachineryIcon,
    permissions: ["read"],
  },
  {
    label: "Movimientos",
    path: "/movimientos",
    icon: MovementsIcon,
    permissions: ["read"],
  },
  {
    label: "Usuarios",
    path: "/usuarios",
    icon: PeopleIcon,
    permissions: ["manage_users"],
  },
  {
    label: "Reportes",
    path: "/reportes",
    icon: AnalyticsIcon,
    permissions: ["read"],
  },
];

export const SIDEBAR_CONSTANTS = {
  WIDTH: {
    COLLAPSED: 72, // px
    EXPANDED: 280, // px
  },
  TOOLTIP: {
    CLOSE_SIDEBAR: "Cerrar barra lateral",
    OPEN_SIDEBAR: "Abrir barra lateral",
  },
};
