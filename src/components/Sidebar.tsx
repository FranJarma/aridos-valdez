
import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Build as MachineryIcon,
  SwapHoriz as MovementsIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  onItemClick?: () => void;
}

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
    permission: null,
  },
  {
    label: 'Materiales',
    path: '/materials',
    icon: InventoryIcon,
    permission: 'view_materials',
  },
  {
    label: 'Maquinaria',
    path: '/machinery',
    icon: MachineryIcon,
    permission: 'view_machinery',
  },
  {
    label: 'Movimientos',
    path: '/movements',
    icon: MovementsIcon,
    permission: 'view_movements',
  },
  {
    label: 'Usuarios',
    path: '/users',
    icon: PeopleIcon,
    permission: 'manage_users',
  },
  {
    label: 'Reportes',
    path: '/reports',
    icon: AnalyticsIcon,
    permission: 'view_reports',
  },
];

export function Sidebar({ onItemClick }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  return (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
          Menú
        </Typography>
      </Toolbar>
      
      <List>
        {menuItems.map((item) => {
          if (item.permission && !hasPermission(item.permission)) {
            return null;
          }

          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
