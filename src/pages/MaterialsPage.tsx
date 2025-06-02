
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
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { useForm } from 'react-hook-form';

interface Material {
  id: string;
  name: string;
  type: string;
  unit: string;
  currentStock: number;
  minStock: number;
  location: string;
}

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Arena Fina',
    type: 'Agregado',
    unit: 'Toneladas',
    currentStock: 150,
    minStock: 50,
    location: 'Sector A',
  },
  {
    id: '2',
    name: 'Grava 20mm',
    type: 'Agregado',
    unit: 'Toneladas',
    currentStock: 75,
    minStock: 30,
    location: 'Sector B',
  },
];

export function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [filter, setFilter] = useState('');
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Material>();

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(filter.toLowerCase()) ||
    material.type.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setValue('name', material.name);
    setValue('type', material.type);
    setValue('unit', material.unit);
    setValue('currentStock', material.currentStock);
    setValue('minStock', material.minStock);
    setValue('location', material.location);
    onOpen();
  };

  const handleAdd = () => {
    setEditingMaterial(null);
    reset();
    onOpen();
  };

  const onSubmit = (data: Material) => {
    if (editingMaterial) {
      // Update existing material
      setMaterials(prev => prev.map(m => 
        m.id === editingMaterial.id ? { ...data, id: editingMaterial.id } : m
      ));
      toast({
        title: 'Material actualizado',
        status: 'success',
        duration: 2000,
      });
    } else {
      // Add new material
      const newMaterial = { ...data, id: Date.now().toString() };
      setMaterials(prev => [...prev, newMaterial]);
      toast({
        title: 'Material agregado',
        status: 'success',
        duration: 2000,
      });
    }
    onClose();
    reset();
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return { color: 'red', label: 'Crítico' };
    if (current <= min * 1.5) return { color: 'yellow', label: 'Bajo' };
    return { color: 'green', label: 'Normal' };
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading color="aridos.primary">Gestión de Materiales</Heading>
        <Button leftIcon={<HiPlus />} colorScheme="brand" onClick={handleAdd}>
          Agregar Material
        </Button>
      </HStack>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Buscar materiales..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              maxW="300px"
            />
            <Select placeholder="Filtrar por tipo" maxW="200px">
              <option value="agregado">Agregado</option>
              <option value="cemento">Cemento</option>
              <option value="aditivo">Aditivo</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Material</Th>
                <Th>Tipo</Th>
                <Th>Stock Actual</Th>
                <Th>Stock Mínimo</Th>
                <Th>Estado</Th>
                <Th>Ubicación</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMaterials.map((material) => {
                const status = getStockStatus(material.currentStock, material.minStock);
                return (
                  <Tr key={material.id}>
                    <Td fontWeight="medium">{material.name}</Td>
                    <Td>{material.type}</Td>
                    <Td>{material.currentStock} {material.unit}</Td>
                    <Td>{material.minStock} {material.unit}</Td>
                    <Td>
                      <Badge colorScheme={status.color}>{status.label}</Badge>
                    </Td>
                    <Td>{material.location}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          leftIcon={<HiPencil />}
                          onClick={() => handleEdit(material)}
                        >
                          Editar
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for Add/Edit Material */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingMaterial ? 'Editar Material' : 'Agregar Material'}
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
                    <option value="Agregado">Agregado</option>
                    <option value="Cemento">Cemento</option>
                    <option value="Aditivo">Aditivo</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.unit}>
                  <FormLabel>Unidad</FormLabel>
                  <Select {...register('unit', { required: 'Unidad requerida' })}>
                    <option value="">Seleccionar unidad</option>
                    <option value="Toneladas">Toneladas</option>
                    <option value="Metros cúbicos">Metros cúbicos</option>
                    <option value="Bolsas">Bolsas</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.currentStock}>
                  <FormLabel>Stock Actual</FormLabel>
                  <Input
                    type="number"
                    {...register('currentStock', { 
                      required: 'Stock actual requerido',
                      min: { value: 0, message: 'Debe ser mayor a 0' }
                    })}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.minStock}>
                  <FormLabel>Stock Mínimo</FormLabel>
                  <Input
                    type="number"
                    {...register('minStock', { 
                      required: 'Stock mínimo requerido',
                      min: { value: 0, message: 'Debe ser mayor a 0' }
                    })}
                  />
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
                {editingMaterial ? 'Actualizar' : 'Agregar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
