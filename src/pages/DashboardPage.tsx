
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Inventory as InventoryIcon,
  Build as MachineryIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';

const mockData = {
  stats: [
    {
      title: 'Total Materiales',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: InventoryIcon,
      color: 'primary',
    },
    {
      title: 'Maquinaria Activa',
      value: '48',
      change: '+5%',
      changeType: 'positive' as const,
      icon: MachineryIcon,
      color: 'secondary',
    },
    {
      title: 'Producción Mensual',
      value: '8,567 m³',
      change: '+18%',
      changeType: 'positive' as const,
      icon: TrendingUpIcon,
      color: 'success',
    },
    {
      title: 'Entregas',
      value: '156',
      change: '-3%',
      changeType: 'negative' as const,
      icon: ShippingIcon,
      color: 'warning',
    },
  ],
  dailyProduction: [
    { name: 'Lun', value: 2400 },
    { name: 'Mar', value: 1398 },
    { name: 'Mié', value: 9800 },
    { name: 'Jue', value: 3908 },
    { name: 'Vie', value: 4800 },
    { name: 'Sáb', value: 3800 },
    { name: 'Dom', value: 4300 },
  ],
  materialDistribution: [
    { name: 'Arena', value: 400, color: '#1976d2' },
    { name: 'Grava', value: 300, color: '#388e3c' },
    { name: 'Piedra', value: 200, color: '#f57c00' },
    { name: 'Cemento', value: 100, color: '#7b1fa2' },
  ],
};

export function DashboardPage() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Resumen general del sistema de gestión
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockData.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${stat.color}.light`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent sx={{ color: `${stat.color}.main`, fontSize: 24 }} />
                    </Box>
                    <Chip
                      label={stat.change}
                      size="small"
                      color={stat.changeType === 'positive' ? 'success' : 'error'}
                      sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    />
                  </Stack>
                  
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            height: 400,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                Producción Semanal
              </Typography>
              <Box sx={{ width: '100%', height: 'calc(100% - 60px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.dailyProduction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#1976d2" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            height: 400,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                Distribución de Materiales
              </Typography>
              <Box sx={{ width: '100%', height: 'calc(100% - 100px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockData.materialDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockData.materialDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              
              <Stack spacing={1} sx={{ mt: 2 }}>
                {mockData.materialDistribution.map((item, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
