
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
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

interface Machinery {
  id: string;
  name: string;
  type: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
}

const mockMachinery: Machinery[] = [
  {
    id: '1',
    name: 'Excavadora CAT 320',
    type: 'Excavadora',
    model: 'CAT 320D',
    status: 'active',
    location: 'Cantera Norte',
  },
  {
    id: '2',
    name: 'Cargadora JCB',
    type: 'Cargadora',
    model: 'JCB 456',
    status: 'maintenance',
    location: 'Taller',
  },
];

export function MachineryPage() {
  const [machinery, setMachinery] = useState<Machinery[]>(mockMachinery);
  const [filter, setFilter] = useState('');
  const [editingMachine, setEditingMachine] = useState<Machinery | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Machinery>();

  const filteredMachinery = machinery.filter(machine =>
    machine.name.toLowerCase().includes(filter.toLowerCase()) ||
    machine.type.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (machine: Machinery) => {
    setEditingMachine(machine);
    setValue('name', machine.name);
    setValue('type', machine.type);
    setValue('model', machine.model);
    setValue('status', machine.status);
    setValue('location', machine.location);
    onOpen();
  };

  const handleAdd = () => {
    setEditingMachine(null);
    reset();
    onOpen();
  };

  const onSubmit = (data: Machinery) => {
    if (editingMachine) {
      setMachinery(prev => prev.map(m => 
        m.id === editingMachine.id ? { ...data, id: editingMachine.id } : m
      ));
      toast({
        title: 'Maquinaria actualizada',
        status: 'success',
        duration: 2000,
      });
    } else {
      const newMachine = { ...data, id: Date.now().toString() };
      setMachinery(prev => [...prev, newMachine]);
      toast({
        title: 'Maquinaria agregada',
        status: 'success',
        duration: 2000,
      });
    }
    onClose();
    reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'maintenance': return 'yellow';
      case 'inactive': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'maintenance': return 'Mantenimiento';
      case 'inactive': return 'Inactiva';
      default: return 'Desconocido';
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading color="aridos.primary">Gestión de Maquinaria</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="brand" onClick={handleAdd}>
          Agregar Maquinaria
        </Button>
      </HStack>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Buscar maquinaria..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              maxW="300px"
            />
            <Select placeholder="Filtrar por estado" maxW="200px">
              <option value="active">Activa</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="inactive">Inactiva</option>
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
                <Th>Tipo</Th>
                <Th>Modelo</Th>
                <Th>Estado</Th>
                <Th>Ubicación</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMachinery.map((machine) => (
                <Tr key={machine.id}>
                  <Td fontWeight="medium">{machine.name}</Td>
                  <Td>{machine.type}</Td>
                  <Td>{machine.model}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(machine.status)}>
                      {getStatusLabel(machine.status)}
                    </Badge>
                  </Td>
                  <Td>{machine.location}</Td>
                  <Td>
                    <Button
                      size="sm"
                      leftIcon={<EditIcon />}
                      onClick={() => handleEdit(machine)}
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

      {/* Modal for Add/Edit Machinery */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingMachine ? 'Editar Maquinaria' : 'Agregar Maquinaria'}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nombre</FormLabel>
                  <Input {...register('name', { required: 'Nombre requerido' })} />
                </FormControl>

                <FormControl isInvalid={!!errors.type}>
                  <FormLabel>Tipo</FormLabel>
                  <Select {...register('type', { required: 'Tipo requerido' })}>
                    <option value="">Seleccionar tipo</option>
                    <option value="Excavadora">Excavadora</option>
                    <option value="Cargadora">Cargadora</option>
                    <option value="Volquete">Volquete</option>
                    <option value="Trituradora">Trituradora</option>
                    <option value="Cinta transportadora">Cinta transportadora</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.model}>
                  <FormLabel>Modelo</FormLabel>
                  <Input {...register('model', { required: 'Modelo requerido' })} />
                </FormControl>

                <FormControl isInvalid={!!errors.status}>
                  <FormLabel>Estado</FormLabel>
                  <Select {...register('status', { required: 'Estado requerido' })}>
                    <option value="">Seleccionar estado</option>
                    <option value="active">Activa</option>
                    <option value="maintenance">Mantenimiento</option>
                    <option value="inactive">Inactiva</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.location}>
                  <FormLabel>Ubicación</FormLabel>
                  <Input {...register('location', { required: 'Ubicación requerida' })} />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" colorScheme="brand">
                {editingMachine ? 'Actualizar' : 'Agregar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
