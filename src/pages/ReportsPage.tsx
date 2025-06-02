
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Select,
  Button,
  HStack,
  VStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const productionData = [
  { month: 'Ene', production: 2400, target: 2200 },
  { month: 'Feb', production: 1398, target: 2200 },
  { month: 'Mar', production: 9800, target: 2200 },
  { month: 'Abr', production: 3908, target: 2200 },
  { month: 'May', production: 4800, target: 2200 },
  { month: 'Jun', production: 3800, target: 2200 },
];

const materialUsage = [
  { name: 'Arena', value: 400, color: '#8B4513' },
  { name: 'Grava', value: 300, color: '#D2691E' },
  { name: 'Piedra', value: 200, color: '#CD853F' },
  { name: 'Cemento', value: 100, color: '#F5DEB3' },
];

const machineryEfficiency = [
  { machine: 'Excavadora 1', efficiency: 85 },
  { machine: 'Excavadora 2', efficiency: 92 },
  { machine: 'Cargadora 1', efficiency: 78 },
  { machine: 'Cargadora 2', efficiency: 88 },
];

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { hasPermission } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.800');

  if (!hasPermission('view_reports')) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          No tienes permisos para acceder a los reportes.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading color="aridos.primary">Reportes y Analíticas</Heading>
        <HStack spacing={4}>
          <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} maxW="200px">
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </Select>
          <Button colorScheme="brand">Exportar PDF</Button>
        </HStack>
      </HStack>

      {/* KPI Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Producción Total</StatLabel>
                <StatNumber color="aridos.primary">24,580 Ton</StatNumber>
                <StatHelpText>+15% vs mes anterior</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Eficiencia Promedio</StatLabel>
                <StatNumber color="green.500">85.8%</StatNumber>
                <StatHelpText>+3.2% vs mes anterior</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Costos Operativos</StatLabel>
                <StatNumber color="red.500">$125,400</StatNumber>
                <StatHelpText>-8% vs mes anterior</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Tiempo Inactividad</StatLabel>
                <StatNumber color="orange.500">12.3 hrs</StatNumber>
                <StatHelpText>-25% vs mes anterior</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Charts */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
        <GridItem>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Producción vs Objetivo Mensual</Heading>
            </CardHeader>
            <CardBody>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="target" fill="#E2E8F0" name="Objetivo" />
                    <Bar dataKey="production" fill="#8B4513" name="Producción" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Distribución de Materiales</Heading>
            </CardHeader>
            <CardBody>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialUsage}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {materialUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Machinery Efficiency */}
      <Card bg={cardBg}>
        <CardHeader>
          <Heading size="md">Eficiencia de Maquinaria</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {machineryEfficiency.map((machine) => (
              <HStack key={machine.machine} justify="space-between">
                <Text fontWeight="medium" minW="150px">{machine.machine}</Text>
                <Box flex={1} mx={4}>
                  <Box
                    bg="gray.200"
                    height="20px"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Box
                      bg={machine.efficiency >= 90 ? 'green.500' : machine.efficiency >= 80 ? 'yellow.500' : 'red.500'}
                      height="100%"
                      width={`${machine.efficiency}%`}
                      borderRadius="full"
                    />
                  </Box>
                </Box>
                <Text fontWeight="bold" minW="50px">{machine.efficiency}%</Text>
              </HStack>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
