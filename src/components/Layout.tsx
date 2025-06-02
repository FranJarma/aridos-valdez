
import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  IconButton,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { HamburgerIcon, BellIcon, SettingsIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useOffline } from '../contexts/OfflineContext';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { isOnline, pendingOperations } = useOffline();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex h="100vh" direction="column">
      {/* Header */}
      <Box
        bg={bg}
        borderBottom={1}
        borderStyle="solid"
        borderColor={borderColor}
        px={4}
        py={3}
      >
        <Flex align="center" justify="space-between">
          <HStack spacing={4}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              variant="outline"
              aria-label="open menu"
              icon={<HamburgerIcon />}
            />
            <Text fontSize="xl" fontWeight="bold" color="aridos.primary">
              Áridos Valdez SRL
            </Text>
            {!isOnline && (
              <Badge colorScheme="orange" variant="solid">
                Offline
              </Badge>
            )}
            {pendingOperations.length > 0 && (
              <Badge colorScheme="blue" variant="solid">
                {pendingOperations.length} pendientes
              </Badge>
            )}
          </HStack>

          <HStack spacing={4}>
            <IconButton
              aria-label="Notificaciones"
              icon={<BellIcon />}
              variant="ghost"
            />
            <Menu>
              <MenuButton>
                <Avatar
                  size="sm"
                  name={user?.profile?.name || user?.email}
                  bg="aridos.primary"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <VStack spacing={1} align="start">
                    <Text fontWeight="bold">
                      {user?.profile?.name || 'Usuario'}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {user?.profile?.role || 'Sin rol'}
                    </Text>
                  </VStack>
                </MenuItem>
                <MenuItem icon={<SettingsIcon />}>
                  Configuración
                </MenuItem>
                <MenuItem onClick={signOut}>
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      <Flex flex={1}>
        {/* Desktop Sidebar */}
        <Box
          display={{ base: 'none', md: 'block' }}
          w="250px"
          bg={bg}
          borderRight={1}
          borderStyle="solid"
          borderColor={borderColor}
        >
          <Sidebar />
        </Box>

        {/* Mobile Sidebar */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menú</DrawerHeader>
            <DrawerBody p={0}>
              <Sidebar onItemClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Main Content */}
        <Box flex={1} p={6} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
