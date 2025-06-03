
import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Typography,
  Tooltip,
  Divider,
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
  collapsed?: boolean;
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
    permission: 'read',
  },
  {
    label: 'Maquinaria',
    path: '/machinery',
    icon: MachineryIcon,
    permission: 'read',
  },
  {
    label: 'Movimientos',
    path: '/movements',
    icon: MovementsIcon,
    permission: 'read',
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
    permission: 'read',
  },
];

export function Sidebar({ onItemClick, collapsed = false }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission, user } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  const renderMenuItem = (item: any) => {
    if (item.permission && !hasPermission(item.permission)) {
      return null;
    }

    const isActive = location.pathname === item.path;
    const IconComponent = item.icon;

    const button = (
      <ListItemButton
        selected={isActive}
        onClick={() => handleNavigation(item.path)}
        sx={{
          minHeight: 48,
          justifyContent: collapsed ? 'center' : 'initial',
          px: 2.5,
          borderRadius: 2,
          mx: 1,
          mb: 0.5,
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
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 3,
            justifyContent: 'center',
          }}
        >
          <IconComponent />
        </ListItemIcon>
        {!collapsed && <ListItemText primary={item.label} />}
      </ListItemButton>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path} title={item.label} placement="right">
          <ListItem disablePadding>
            {button}
          </ListItem>
        </Tooltip>
      );
    }

    return (
      <ListItem key={item.path} disablePadding>
        {button}
      </ListItem>
    );
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.paper'
    }}>
      {/* Logo Header */}
      <Box sx={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <img 
          src="/attached_assets/aridos-valdez-logo.webp" 
          alt="Áridos Valdez Logo"
          style={{ 
            height: collapsed ? 32 : 40,
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, pt: 2 }}>
        <List disablePadding>
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>

      {/* User Section at Bottom */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        
        {/* User Info */}
        {!collapsed && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 1.5,
            bgcolor: 'grey.50',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Avatar
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                mr: 1.5
              }}
            >
              {(user?.profile?.name || user?.email || 'U').charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Bienvenido:
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user?.profile?.name || user?.email || 'Usuario'}
              </Typography>
            </Box>
          </Box>
        )}

        {collapsed && (
          <Tooltip title={`Bienvenido: ${user?.profile?.name || user?.email || 'Usuario'}`} placement="right">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: 'primary.main',
                  fontSize: '0.875rem'
                }}
              >
                {(user?.profile?.name || user?.email || 'U').charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
