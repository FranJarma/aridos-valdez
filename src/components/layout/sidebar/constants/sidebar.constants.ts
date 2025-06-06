import {
  Analytics as AnalyticsIcon,
  Build as MachineryIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  SwapHoriz as MovementsIcon,
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
  {
    label: "Mi cuenta",
    path: "/mi-cuenta",
    icon: SettingsIcon,
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
