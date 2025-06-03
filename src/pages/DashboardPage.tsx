
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

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
  const getStockStatus = (stock: number, min: number) => {
    const percentage = (stock / (min * 2)) * 100;
    if (percentage <= 50) return { color: 'error', label: 'Crítico' };
    if (percentage <= 75) return { color: 'warning', label: 'Bajo' };
    return { color: 'success', label: 'Normal' };
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Resumen general de la planta de áridos
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Producción Diaria
                </Typography>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main',
                  animation: 'pulse 2s infinite'
                }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                1,245
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Toneladas
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                  +23.36%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs ayer
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Eficiencia Promedio
              </Typography>
              <Typography variant="h4" color="primary">
                87.2%
              </Typography>
              <Typography variant="body2" color="success.main">
                +2.1% ↗
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Máquinas Activas
              </Typography>
              <Typography variant="h4" color="primary">
                8/12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                4 en mantenimiento
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Stock Bajo
              </Typography>
              <Typography variant="h4" color="warning.main">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                materiales críticos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Producción Semanal
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.dailyProduction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8B4513" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado de Stock
              </Typography>
              <Stack spacing={2}>
                {mockData.materialStock.map((item) => {
                  const status = getStockStatus(item.stock, item.min);
                  const percentage = Math.min((item.stock / (item.min * 2)) * 100, 100);
                  
                  return (
                    <Box key={item.material}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {item.material}
                        </Typography>
                        <Chip 
                          label={status.label} 
                          color={status.color as any}
                          size="small" 
                        />
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage}
                        color={status.color as any}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.stock} / {item.min * 2} unidades
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
