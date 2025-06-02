
import React, { useState } from 'react';
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
  Paper,
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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
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
  const [typeFilter, setTypeFilter] = useState('');
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Material>();

  const filteredMaterials = materials.filter(material =>
    (material.name.toLowerCase().includes(filter.toLowerCase()) ||
    material.type.toLowerCase().includes(filter.toLowerCase())) &&
    (typeFilter === '' || material.type === typeFilter)
  );

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setValue('name', material.name);
    setValue('type', material.type);
    setValue('unit', material.unit);
    setValue('currentStock', material.currentStock);
    setValue('minStock', material.minStock);
    setValue('location', material.location);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingMaterial(null);
    reset();
    setOpen(true);
  };

  const onSubmit = (data: Material) => {
    if (editingMaterial) {
      setMaterials(prev => prev.map(m => 
        m.id === editingMaterial.id ? { ...data, id: editingMaterial.id } : m
      ));
    } else {
      const newMaterial = { ...data, id: Date.now().toString() };
      setMaterials(prev => [...prev, newMaterial]);
    }
    setOpen(false);
    reset();
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return { color: 'error', label: 'Crítico' };
    if (current <= min * 1.5) return { color: 'warning', label: 'Bajo' };
    return { color: 'success', label: 'Normal' };
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" color="primary">
          Gestión de Materiales
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Agregar Material
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Buscar materiales..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 300 }}
              size="small"
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por tipo</InputLabel>
              <Select
                value={typeFilter}
                label="Filtrar por tipo"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Agregado">Agregado</MenuItem>
                <MenuItem value="Cemento">Cemento</MenuItem>
                <MenuItem value="Aditivo">Aditivo</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Stock Actual</TableCell>
              <TableCell>Stock Mínimo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMaterials.map((material) => {
              const status = getStockStatus(material.currentStock, material.minStock);
              return (
                <TableRow key={material.id}>
                  <TableCell sx={{ fontWeight: 'medium' }}>{material.name}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.currentStock} {material.unit}</TableCell>
                  <TableCell>{material.minStock} {material.unit}</TableCell>
                  <TableCell>
                    <Chip color={status.color as any} label={status.label} size="small" />
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

      {/* Dialog for Add/Edit Material */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMaterial ? 'Editar Material' : 'Agregar Material'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  {...register('name', { required: 'Nombre requerido' })}
                  label="Nombre"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    {...register('type', { required: 'Tipo requerido' })}
                    label="Tipo"
                  >
                    <MenuItem value="Agregado">Agregado</MenuItem>
                    <MenuItem value="Cemento">Cemento</MenuItem>
                    <MenuItem value="Aditivo">Aditivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.unit}>
                  <InputLabel>Unidad</InputLabel>
                  <Select
                    {...register('unit', { required: 'Unidad requerida' })}
                    label="Unidad"
                  >
                    <MenuItem value="Toneladas">Toneladas</MenuItem>
                    <MenuItem value="Metros cúbicos">Metros cúbicos</MenuItem>
                    <MenuItem value="Bolsas">Bolsas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('currentStock', { 
                    required: 'Stock actual requerido',
                    min: { value: 0, message: 'Debe ser mayor a 0' }
                  })}
                  label="Stock Actual"
                  type="number"
                  fullWidth
                  error={!!errors.currentStock}
                  helperText={errors.currentStock?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('minStock', { 
                    required: 'Stock mínimo requerido',
                    min: { value: 0, message: 'Debe ser mayor a 0' }
                  })}
                  label="Stock Mínimo"
                  type="number"
                  fullWidth
                  error={!!errors.minStock}
                  helperText={errors.minStock?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('location', { required: 'Ubicación requerida' })}
                  label="Ubicación"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              {editingMaterial ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
