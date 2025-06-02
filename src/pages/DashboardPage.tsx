
import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockData = {
  dailyProduction: [
    { name: 'Lun', value: 150 },
    { name: 'Mar', value: 200 },
    { name: 'Mié', value: 180 },
    { name: 'Jue', value: 220 },
    { name: 'Vie', value: 190 },
    { name: 'Sáb', value: 250 },
    { name: 'Dom', value: 100 },
  ],
  materialStock: [
    { material: 'Arena', stock: 75, min: 20 },
    { material: 'Grava', stock: 45, min: 30 },
    { material: 'Piedra', stock: 90, min: 25 },
    { material: 'Cemento', stock: 15, min: 10 },
  ],
};

export function DashboardPage() {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      <Heading mb={6} color="aridos.primary">
        Dashboard - Planta de Áridos
      </Heading>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Producción Diaria</StatLabel>
                <StatNumber color="aridos.primary">1,245 Ton</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Maquinaria Activa</StatLabel>
                <StatNumber color="green.500">8/10</StatNumber>
                <StatHelpText>2 en mantenimiento</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Movimientos Hoy</StatLabel>
                <StatNumber color="blue.500">45</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Eficiencia</StatLabel>
                <StatNumber color="purple.500">87%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  5% esta semana
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Producción Semanal</Heading>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.dailyProduction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8B4513" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Estado de Stock</Heading>
              <VStack spacing={4}>
                {mockData.materialStock.map((item) => (
                  <Box key={item.material} w="full">
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium">{item.material}</Text>
                      <Badge
                        colorScheme={item.stock > item.min * 2 ? 'green' : item.stock > item.min ? 'yellow' : 'red'}
                      >
                        {item.stock}%
                      </Badge>
                    </HStack>
                    <Progress
                      value={item.stock}
                      colorScheme={item.stock > item.min * 2 ? 'green' : item.stock > item.min ? 'yellow' : 'red'}
                      size="sm"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
