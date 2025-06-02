
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  VStack,
  Input,
  Select,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { HiPlus, HiPencil } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@aridosvaldez.com',
    role: 'admin',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@aridosvaldez.com',
    role: 'operator',
    createdAt: '2024-01-20',
  },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasPermission } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();

  if (!hasPermission('manage_users')) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('role', user.role);
    onOpen();
  };

  const handleAdd = () => {
    setEditingUser(null);
    reset();
    onOpen();
  };

  const onSubmit = (data: User) => {
    if (editingUser) {
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id ? { ...data, id: editingUser.id, createdAt: editingUser.createdAt } : u
      ));
      toast({
        title: 'Usuario actualizado',
        status: 'success',
        duration: 2000,
      });
    } else {
      const newUser = { 
        ...data, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: 'Usuario agregado',
        status: 'success',
        duration: 2000,
      });
    }
    onClose();
    reset();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'operator': return 'blue';
      case 'viewer': return 'green';
      default: return 'gray';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'operator': return 'Operador';
      case 'viewer': return 'Visualizador';
      default: return 'Desconocido';
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading color="aridos.primary">Gestión de Usuarios</Heading>
        <Button leftIcon={<HiPlus />} colorScheme="brand" onClick={handleAdd}>
          Agregar Usuario
        </Button>
      </HStack>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Buscar usuarios..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              maxW="300px"
            />
            <Select placeholder="Filtrar por rol" maxW="200px">
              <option value="admin">Administrador</option>
              <option value="operator">Operador</option>
              <option value="viewer">Visualizador</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Rol</Th>
                <Th>Fecha Creación</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td fontWeight="medium">{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge colorScheme={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </Td>
                  <Td>{user.createdAt}</Td>
                  <Td>
                    <Button
                      size="sm"
                      leftIcon={<HiPencil />}
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for Add/Edit User */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input {...register('name', { required: 'Nombre requerido' })} />
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'Email requerido',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email inválido',
                      },
                    })}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.role}>
                  <FormLabel>Rol</FormLabel>
                  <Select {...register('role', { required: 'Rol requerido' })}>
                    <option value="">Seleccionar rol</option>
                    <option value="admin">Administrador</option>
                    <option value="operator">Operador</option>
                    <option value="viewer">Visualizador</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" colorScheme="brand">
                {editingUser ? 'Actualizar' : 'Agregar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
