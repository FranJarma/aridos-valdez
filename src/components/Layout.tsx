
import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useOffline } from '../contexts/OfflineContext';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;
const collapsedDrawerWidth = 72;

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { isOnline, pendingOperations } = useOffline();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentDrawerWidth = sidebarCollapsed ? collapsedDrawerWidth : drawerWidth;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { md: `${currentDrawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop sidebar toggle */}
          <Tooltip title={sidebarCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}>
            <IconButton
              color="inherit"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              {sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Tooltip>
          
          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} alignItems="center">
            {!isOnline && (
              <Chip 
                label="Offline" 
                color="warning" 
                size="small"
                sx={{ 
                  fontSize: '0.75rem',
                  height: 24,
                  borderRadius: 3
                }}
              />
            )}
            {pendingOperations.length > 0 && (
              <Chip 
                label={`${pendingOperations.length} pendientes`} 
                color="info" 
                size="small"
                sx={{ 
                  fontSize: '0.75rem',
                  height: 24,
                  borderRadius: 3
                }}
              />
            )}
            
            <Tooltip title="Notificaciones">
              <IconButton 
                color="inherit"
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Perfil de usuario">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <Avatar
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem'
                  }}
                >
                  {(user?.profile?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: theme.shadows[8],
                  border: '1px solid',
                  borderColor: 'divider',
                }
              }}
            >
              <MenuItem disabled sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>
                  {user?.profile?.name || 'Usuario'}
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  {user?.profile?.role || 'Sin rol'}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ borderRadius: 1, mx: 1 }}>
                <SettingsIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />
                Configuración
              </MenuItem>
              <MenuItem onClick={handleSignOut} sx={{ borderRadius: 1, mx: 1, mb: 1 }}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: currentDrawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation menu"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
        >
          <Sidebar onItemClick={handleDrawerToggle} />
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: currentDrawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          mt: 8,
          overflow: 'auto',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
