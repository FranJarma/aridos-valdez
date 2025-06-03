import {
  Inventory as InventoryIcon,
  Build as MachineryIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import React from "react";
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

const mockData = {
  stats: [
    {
      title: "Total Materiales",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: InventoryIcon,
      color: "primary",
    },
    {
      title: "Maquinaria Activa",
      value: "48",
      change: "+5%",
      changeType: "positive" as const,
      icon: MachineryIcon,
      color: "secondary",
    },
    {
      title: "Producción Mensual",
      value: "8,567 m³",
      change: "+18%",
      changeType: "positive" as const,
      icon: TrendingUpIcon,
      color: "success",
    },
    {
      title: "Entregas",
      value: "156",
      change: "-3%",
      changeType: "negative" as const,
      icon: ShippingIcon,
      color: "warning",
    },
  ],
  dailyProduction: [
    { name: "Lun", value: 2400 },
    { name: "Mar", value: 1398 },
    { name: "Mié", value: 9800 },
    { name: "Jue", value: 3908 },
    { name: "Vie", value: 4800 },
    { name: "Sáb", value: 3800 },
    { name: "Dom", value: 4300 },
  ],
  materialDistribution: [
    { name: "Arena", value: 400, color: "#1976d2" },
    { name: "Grava", value: 300, color: "#388e3c" },
    { name: "Piedra", value: 200, color: "#f57c00" },
    { name: "Cemento", value: 100, color: "#7b1fa2" },
  ],
};

export function DashboardPage() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
          variant="h3"
        >
          Dashboard
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Resumen general del sistema de gestión
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockData.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${stat.color}.light`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent
                        sx={{ color: `${stat.color}.main`, fontSize: 24 }}
                      />
                    </Box>
                    <Chip
                      label={stat.change}
                      size="small"
                      color={
                        stat.changeType === "positive" ? "success" : "error"
                      }
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    variant="h4"
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                    variant="body2"
                  >
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
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              height: 400,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 3, height: "100%" }}>
              <Typography
                sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
                variant="h6"
              >
                Producción Semanal
              </Typography>
              <Box sx={{ width: "100%", height: "calc(100% - 60px)" }}>
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart data={mockData.dailyProduction}>
                    <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                    <XAxis
                      axisLine={false}
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis axisLine={false} fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="value" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              height: 400,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 3, height: "100%" }}>
              <Typography
                sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
                variant="h6"
              >
                Distribución de Materiales
              </Typography>
              <Box sx={{ width: "100%", height: "calc(100% - 150px)" }}>
                <ResponsiveContainer height="100%" width="100%">
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={mockData.materialDistribution}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                    >
                      {mockData.materialDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack spacing={1} sx={{ mt: 2 }}>
                {mockData.materialDistribution.map((item, index) => (
                  <Stack
                    key={index}
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography
                      sx={{ flex: 1, fontWeight: 500 }}
                      variant="body2"
                    >
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
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
