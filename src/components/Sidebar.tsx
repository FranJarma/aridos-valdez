
import React from 'react';
import { VStack, HStack, Text, Icon, Box } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdInventory,
  MdPrecisionManufacturing,
  MdSwapHoriz,
  MdPeople,
  MdAnalytics,
} from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  onItemClick?: () => void;
}

const menuItems = [
  {
    label: 'Dashboard',
    icon: MdDashboard,
    path: '/dashboard',
    permission: 'read',
  },
  {
    label: 'Materiales',
    icon: MdInventory,
    path: '/materials',
    permission: 'read',
  },
  {
    label: 'Maquinaria',
    icon: MdPrecisionManufacturing,
    path: '/machinery',
    permission: 'read',
  },
  {
    label: 'Movimientos',
    icon: MdSwapHoriz,
    path: '/movements',
    permission: 'read',
  },
  {
    label: 'Usuarios',
    icon: MdPeople,
    path: '/users',
    permission: 'manage_users',
  },
  {
    label: 'Reportes',
    icon: MdAnalytics,
    path: '/reports',
    permission: 'view_reports',
  },
];

export function Sidebar({ onItemClick }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  return (
    <VStack spacing={2} align="stretch" p={4}>
      {menuItems.map((item) => {
        if (!hasPermission(item.permission)) return null;

        const isActive = location.pathname === item.path;
        
        return (
          <Box
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            cursor="pointer"
            bg={isActive ? 'aridos.primary' : 'transparent'}
            color={isActive ? 'white' : 'gray.700'}
            px={4}
            py={3}
            borderRadius="md"
            _hover={{
              bg: isActive ? 'aridos.primary' : 'gray.100',
            }}
            transition="all 0.2s"
          >
            <HStack spacing={3}>
              <Icon as={item.icon} boxSize={5} />
              <Text fontWeight={isActive ? 'bold' : 'normal'}>
                {item.label}
              </Text>
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
}
