import {
  Add as AddIcon,
  Edit as EditIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";

interface Material {
  currentStock: number;
  id: string;
  location: string;
  minStock: number;
  name: string;
  type: string;
  unit: string;
}

const mockMaterials: Material[] = [
  {
    id: "1",
    name: "Arena Fina",
    type: "Arena",
    unit: "m³",
    currentStock: 150,
    minStock: 50,
    location: "Depósito A",
  },
  {
    id: "2",
    name: "Grava 12mm",
    type: "Grava",
    unit: "m³",
    currentStock: 30,
    minStock: 40,
    location: "Depósito B",
  },
  {
    id: "3",
    name: "Piedra Triturada",
    type: "Piedra",
    unit: "m³",
    currentStock: 200,
    minStock: 75,
    location: "Cantera",
  },
];

export function MaterialsPageDeprecated() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [open, setOpen] = useState(false);
  const { hasPermissions } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<Material>();

  if (!hasPermissions(["read"])) {
    return (
      <Box>
        <Alert severity="error">
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  const filteredMaterials = materials.filter(
    (material) =>
      (material.name.toLowerCase().includes(filter.toLowerCase()) ||
        material.type.toLowerCase().includes(filter.toLowerCase())) &&
      (typeFilter === "" || material.type === typeFilter),
  );

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setValue("name", material.name);
    setValue("type", material.type);
    setValue("unit", material.unit);
    setValue("currentStock", material.currentStock);
    setValue("minStock", material.minStock);
    setValue("location", material.location);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingMaterial(null);
    reset();
    setOpen(true);
  };

  const onSubmit = (data: Material) => {
    if (editingMaterial) {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === editingMaterial.id ? { ...data, id: editingMaterial.id } : m,
        ),
      );
    } else {
      const newMaterial = { ...data, id: Date.now().toString() };
      setMaterials((prev) => [...prev, newMaterial]);
    }
    setOpen(false);
    reset();
  };

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage < 100) return { color: "error", label: "Stock Bajo" };
    if (percentage < 150) return { color: "warning", label: "Stock Medio" };
    return { color: "success", label: "Stock Alto" };
  };

  return (
    <Box>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
            variant="h4"
          >
            Gestión de Materiales
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Control de inventario y stock de materiales
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
          variant="contained"
          onClick={handleAdd}
        >
          Agregar Material
        </Button>
      </Stack>

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent>
          <Stack alignItems="center" direction="row" spacing={2}>
            <InventoryIcon sx={{ color: "text.secondary" }} />
            <TextField
              placeholder="Buscar materiales..."
              size="small"
              sx={{ minWidth: 300 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por tipo</InputLabel>
              <Select
                label="Filtrar por tipo"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Arena">Arena</MenuItem>
                <MenuItem value="Grava">Grava</MenuItem>
                <MenuItem value="Piedra">Piedra</MenuItem>
                <MenuItem value="Cemento">Cemento</MenuItem>
                <MenuItem value="Aditivo">Aditivo</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <Card
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Material</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock Actual</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock Mínimo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ubicación</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaterials.map((material) => {
                const stockStatus = getStockStatus(
                  material.currentStock,
                  material.minStock,
                );
                const stockPercentage = Math.min(
                  (material.currentStock / material.minStock) * 100,
                  100,
                );

                return (
                  <TableRow key={material.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {material.name}
                    </TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 500 }} variant="body2">
                          {material.currentStock} {material.unit}
                        </Typography>
                        <LinearProgress
                          color={stockStatus.color as any}
                          value={stockPercentage}
                          variant="determinate"
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            mt: 0.5,
                            bgcolor: "grey.200",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      {material.minStock} {material.unit}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={stockStatus.color as any}
                        label={stockStatus.label}
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    </TableCell>
                    <TableCell>{material.location}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(material)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Dialog for Add/Edit Material */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          {editingMaterial ? "Editar Material" : "Agregar Material"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register("name", { required: "Nombre requerido" })}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  label="Nombre"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    {...register("type", { required: "Tipo requerido" })}
                    label="Tipo"
                  >
                    <MenuItem value="Arena">Arena</MenuItem>
                    <MenuItem value="Grava">Grava</MenuItem>
                    <MenuItem value="Piedra">Piedra</MenuItem>
                    <MenuItem value="Cemento">Cemento</MenuItem>
                    <MenuItem value="Aditivo">Aditivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!errors.unit}>
                  <InputLabel>Unidad</InputLabel>
                  <Select
                    {...register("unit", { required: "Unidad requerida" })}
                    label="Unidad"
                  >
                    <MenuItem value="m³">Metros cúbicos</MenuItem>
                    <MenuItem value="Toneladas">Toneladas</MenuItem>
                    <MenuItem value="Bolsas">Bolsas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("currentStock", {
                    required: "Stock actual requerido",
                    min: { value: 0, message: "Debe ser mayor a 0" },
                  })}
                  fullWidth
                  error={!!errors.currentStock}
                  helperText={errors.currentStock?.message}
                  label="Stock Actual"
                  type="number"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("minStock", {
                    required: "Stock mínimo requerido",
                    min: { value: 0, message: "Debe ser mayor a 0" },
                  })}
                  fullWidth
                  error={!!errors.minStock}
                  helperText={errors.minStock?.message}
                  label="Stock Mínimo"
                  type="number"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register("location", { required: "Ubicación requerida" })}
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  label="Ubicación"
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingMaterial ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
