
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
  Textarea,
  useToast,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Movement {
  id: string;
  type: 'entrada' | 'salida' | 'transferencia';
  materialName: string;
  machineryName?: string;
  quantity: number;
  origin?: string;
  destination?: string;
  userName: string;
  notes?: string;
  createdAt: string;
}

const mockMovements: Movement[] = [
  {
    id: '1',
    type: 'entrada',
    materialName: 'Arena Fina',
    quantity: 50,
    origin: 'Proveedor A',
    userName: 'Juan Pérez',
    notes: 'Entrega programada',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'salida',
    materialName: 'Grava 20mm',
    machineryName: 'Excavadora CAT 320',
    quantity: 25,
    destination: 'Obra Central',
    userName: 'María García',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>(mockMovements);
  const [filter, setFilter] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Movement>();

  const watchedType = watch('type');

  const filteredMovements = movements.filter(movement =>
    movement.materialName.toLowerCase().includes(filter.toLowerCase()) ||
    movement.type.includes(filter.toLowerCase())
  );

  const onSubmit = (data: Movement) => {
    const newMovement = {
      ...data,
      id: Date.now().toString(),
      userName: 'Usuario Actual', // En producción vendría del contexto de auth
      createdAt: new Date().toISOString(),
    };
    
    setMovements(prev => [newMovement, ...prev]);
    
    toast({
      title: 'Movimiento registrado',
      description: `${data.type} de ${data.quantity} unidades de ${data.materialName}`,
      status: 'success',
      duration: 3000,
    });
    
    onClose();
    reset();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entrada': return 'green';
      case 'salida': return 'red';
      case 'transferencia': return 'blue';
      default: return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'entrada': return 'Entrada';
      case 'salida': return 'Salida';
      case 'transferencia': return 'Transferencia';
      default: return 'Desconocido';
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading color="aridos.primary">Movimientos de Materiales</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="brand" onClick={onOpen}>
          Registrar Movimiento
        </Button>
      </HStack>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Buscar movimientos..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              maxW="300px"
            />
            <Select placeholder="Filtrar por tipo" maxW="200px">
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="transferencia">Transferencia</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th>Material</Th>
                <Th>Cantidad</Th>
                <Th>Origen/Destino</Th>
                <Th>Usuario</Th>
                <Th>Fecha/Hora</Th>
                <Th>Notas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMovements.map((movement) => (
                <Tr key={movement.id}>
                  <Td>
                    <Badge colorScheme={getTypeColor(movement.type)}>
                      {getTypeLabel(movement.type)}
                    </Badge>
                  </Td>
                  <Td fontWeight="medium">{movement.materialName}</Td>
                  <Td>{movement.quantity}</Td>
                  <Td>
                    {movement.type === 'entrada' && movement.origin && (
                      <Text><strong>Desde:</strong> {movement.origin}</Text>
                    )}
                    {movement.type === 'salida' && movement.destination && (
                      <Text><strong>Hacia:</strong> {movement.destination}</Text>
                    )}
                    {movement.type === 'transferencia' && (
                      <VStack align="start" spacing={1}>
                        {movement.origin && <Text fontSize="sm"><strong>Desde:</strong> {movement.origin}</Text>}
                        {movement.destination && <Text fontSize="sm"><strong>Hacia:</strong> {movement.destination}</Text>}
                      </VStack>
                    )}
                    {movement.machineryName && (
                      <Text fontSize="sm" color="blue.600">
                        <strong>Máquina:</strong> {movement.machineryName}
                      </Text>
                    )}
                  </Td>
                  <Td>{movement.userName}</Td>
                  <Td>
                    {format(new Date(movement.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </Td>
                  <Td>{movement.notes || '-'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for Add Movement */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar Movimiento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.type}>
                  <FormLabel>Tipo de Movimiento</FormLabel>
                  <Select {...register('type', { required: 'Tipo requerido' })}>
                    <option value="">Seleccionar tipo</option>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                    <option value="transferencia">Transferencia</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.materialName}>
                  <FormLabel>Material</FormLabel>
                  <Select {...register('materialName', { required: 'Material requerido' })}>
                    <option value="">Seleccionar material</option>
                    <option value="Arena Fina">Arena Fina</option>
                    <option value="Grava 20mm">Grava 20mm</option>
                    <option value="Piedra Partida">Piedra Partida</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.quantity}>
                  <FormLabel>Cantidad</FormLabel>
                  <Input
                    type="number"
                    {...register('quantity', { 
                      required: 'Cantidad requerida',
                      min: { value: 0.1, message: 'Debe ser mayor a 0' }
                    })}
                  />
                </FormControl>

                {watchedType === 'entrada' && (
                  <FormControl>
                    <FormLabel>Origen</FormLabel>
                    <Input {...register('origin')} placeholder="Ej: Proveedor A, Cantera Norte" />
                  </FormControl>
                )}

                {watchedType === 'salida' && (
                  <FormControl>
                    <FormLabel>Destino</FormLabel>
                    <Input {...register('destination')} placeholder="Ej: Obra Central, Cliente XYZ" />
                  </FormControl>
                )}

                {watchedType === 'transferencia' && (
                  <>
                    <FormControl>
                      <FormLabel>Origen</FormLabel>
                      <Input {...register('origin')} placeholder="Ubicación de origen" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Destino</FormLabel>
                      <Input {...register('destination')} placeholder="Ubicación de destino" />
                    </FormControl>
                  </>
                )}

                <FormControl>
                  <FormLabel>Maquinaria Asociada (Opcional)</FormLabel>
                  <Select {...register('machineryName')}>
                    <option value="">Ninguna</option>
                    <option value="Excavadora CAT 320">Excavadora CAT 320</option>
                    <option value="Cargadora JCB">Cargadora JCB</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Notas (Opcional)</FormLabel>
                  <Textarea {...register('notes')} placeholder="Observaciones adicionales..." />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" colorScheme="brand">
                Registrar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
