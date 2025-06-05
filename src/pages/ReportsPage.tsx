import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Stack,
  LinearProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
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
} from "recharts";

import { useAuth } from "@/contexts/AuthContext";

const productionData = [
  { month: "Ene", production: 2400, target: 2200 },
  { month: "Feb", production: 1398, target: 2200 },
  { month: "Mar", production: 9800, target: 2200 },
  { month: "Abr", production: 3908, target: 2200 },
  { month: "May", production: 4800, target: 2200 },
  { month: "Jun", production: 3800, target: 2200 },
];

const materialUsage = [
  { name: "Arena", value: 400, color: "#8B4513" },
  { name: "Grava", value: 300, color: "#D2691E" },
  { name: "Piedra", value: 200, color: "#CD853F" },
  { name: "Cemento", value: 100, color: "#F5DEB3" },
];

const machineryEfficiency = [
  { machine: "Excavadora 1", efficiency: 85 },
  { machine: "Excavadora 2", efficiency: 92 },
  { machine: "Cargadora 1", efficiency: 78 },
  { machine: "Cargadora 2", efficiency: 88 },
];

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const { hasPermissions } = useAuth();

  if (!hasPermissions(["view_reports"])) {
    return (
      <Box>
        <Alert severity="error">
          No tienes permisos para acceder a los reportes.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography color="primary" variant="h4">
          Reportes y Analíticas
        </Typography>
        <Stack alignItems="center" direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Período</InputLabel>
            <Select
              label="Período"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <MenuItem value="week">Esta semana</MenuItem>
              <MenuItem value="month">Este mes</MenuItem>
              <MenuItem value="quarter">Este trimestre</MenuItem>
              <MenuItem value="year">Este año</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">Exportar PDF</Button>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="text.secondary">
                Producción Total
              </Typography>
              <Typography color="primary" variant="h4">
                24,580 Ton
              </Typography>
              <Typography color="success.main" variant="body2">
                +15% vs mes anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="text.secondary">
                Eficiencia Promedio
              </Typography>
              <Typography color="success.main" variant="h4">
                85.8%
              </Typography>
              <Typography color="success.main" variant="body2">
                +3.2% vs mes anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="text.secondary">
                Costos Operativos
              </Typography>
              <Typography color="error.main" variant="h4">
                $125,400
              </Typography>
              <Typography color="success.main" variant="body2">
                -8% vs mes anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="text.secondary">
                Tiempo Inactividad
              </Typography>
              <Typography color="warning.main" variant="h4">
                12.3 hrs
              </Typography>
              <Typography color="success.main" variant="body2">
                -25% vs mes anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Producción vs Objetivo Mensual
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="target" fill="#E0E0E0" name="Objetivo" />
                    <Bar
                      dataKey="production"
                      fill="#8B4513"
                      name="Producción"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Distribución de Materiales
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer height="100%" width="100%">
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={materialUsage}
                      dataKey="value"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {materialUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Machinery Efficiency */}
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Eficiencia de Maquinaria
          </Typography>
          <Stack spacing={3}>
            {machineryEfficiency.map((machine) => (
              <Stack
                key={machine.machine}
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Typography
                  sx={{ minWidth: 150, fontWeight: "medium" }}
                  variant="body1"
                >
                  {machine.machine}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    sx={{ height: 20, borderRadius: 1 }}
                    value={machine.efficiency}
                    variant="determinate"
                    color={
                      machine.efficiency >= 90
                        ? "success"
                        : machine.efficiency >= 80
                          ? "warning"
                          : "error"
                    }
                  />
                </Box>
                <Typography
                  sx={{ minWidth: 50, fontWeight: "bold" }}
                  variant="body1"
                >
                  {machine.efficiency}%
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
