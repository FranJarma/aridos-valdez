
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

interface Machinery {
  id: string;
  name: string;
  type: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
}

const mockMachinery: Machinery[] = [
  {
    id: '1',
    name: 'Excavadora CAT 320',
    type: 'Excavadora',
    model: 'CAT 320D',
    status: 'active',
    location: 'Cantera Norte',
  },
  {
    id: '2',
    name: 'Cargadora JCB',
    type: 'Cargadora',
    model: 'JCB 456',
    status: 'maintenance',
    location: 'Taller',
  },
];

export function MachineryPage() {
  const [machinery, setMachinery] = useState<Machinery[]>(mockMachinery);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingMachine, setEditingMachine] = useState<Machinery | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Machinery>();

  const filteredMachinery = machinery.filter(machine =>
    (machine.name.toLowerCase().includes(filter.toLowerCase()) ||
    machine.type.toLowerCase().includes(filter.toLowerCase())) &&
    (statusFilter === '' || machine.status === statusFilter)
  );

  const handleEdit = (machine: Machinery) => {
    setEditingMachine(machine);
    setValue('name', machine.name);
    setValue('type', machine.type);
    setValue('model', machine.model);
    setValue('status', machine.status);
    setValue('location', machine.location);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingMachine(null);
    reset();
    setOpen(true);
  };

  const onSubmit = (data: Machinery) => {
    if (editingMachine) {
      setMachinery(prev => prev.map(m => 
        m.id === editingMachine.id ? { ...data, id: editingMachine.id } : m
      ));
    } else {
      const newMachine = { ...data, id: Date.now().toString() };
      setMachinery(prev => [...prev, newMachine]);
    }
    setOpen(false);
    reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'maintenance': return 'Mantenimiento';
      case 'inactive': return 'Inactiva';
      default: return 'Desconocido';
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" color="primary">
          Gestión de Maquinaria
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Agregar Maquinaria
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Buscar maquinaria..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 300 }}
              size="small"
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por estado</InputLabel>
              <Select
                value={statusFilter}
                label="Filtrar por estado"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="active">Activa</MenuItem>
                <MenuItem value="maintenance">Mantenimiento</MenuItem>
                <MenuItem value="inactive">Inactiva</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMachinery.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell sx={{ fontWeight: 'medium' }}>{machine.name}</TableCell>
                <TableCell>{machine.type}</TableCell>
                <TableCell>{machine.model}</TableCell>
                <TableCell>
                  <Chip 
                    color={getStatusColor(machine.status) as any} 
                    label={getStatusLabel(machine.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{machine.location}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(machine)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Machinery */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMachine ? 'Editar Maquinaria' : 'Agregar Maquinaria'}
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
                    <MenuItem value="Excavadora">Excavadora</MenuItem>
                    <MenuItem value="Cargadora">Cargadora</MenuItem>
                    <MenuItem value="Volquete">Volquete</MenuItem>
                    <MenuItem value="Trituradora">Trituradora</MenuItem>
                    <MenuItem value="Cinta transportadora">Cinta transportadora</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('model', { required: 'Modelo requerido' })}
                  label="Modelo"
                  fullWidth
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    {...register('status', { required: 'Estado requerido' })}
                    label="Estado"
                  >
                    <MenuItem value="active">Activa</MenuItem>
                    <MenuItem value="maintenance">Mantenimiento</MenuItem>
                    <MenuItem value="inactive">Inactiva</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
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
              {editingMachine ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
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
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Build as BuildIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface Machinery {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  lastMaintenance: string;
}

const mockMachinery: Machinery[] = [
  {
    id: '1',
    name: 'Excavadora CAT 320',
    type: 'Excavadora',
    status: 'active',
    location: 'Cantera Norte',
    lastMaintenance: '2024-01-15',
  },
  {
    id: '2',
    name: 'Volquete Mercedes 2644',
    type: 'Volquete',
    status: 'maintenance',
    location: 'Taller',
    lastMaintenance: '2024-01-10',
  },
];

export function MachineryPage() {
  const [machinery, setMachinery] = useState<Machinery[]>(mockMachinery);
  const [filter, setFilter] = useState('');
  const { hasPermission } = useAuth();

  if (!hasPermission('read')) {
    return (
      <Box>
        <Alert severity="error">
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  const filteredMachinery = machinery.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.type.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'maintenance': return 'Mantenimiento';
      case 'inactive': return 'Inactivo';
      default: return 'Desconocido';
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            Gestión de Maquinaria
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Control y seguimiento de equipos y maquinaria
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          Agregar Máquina
        </Button>
      </Stack>

      <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <BuildIcon sx={{ color: 'text.secondary' }} />
            <TextField
              placeholder="Buscar maquinaria..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 300 }}
              size="small"
            />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ubicación</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Último Mantenimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMachinery.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{machine.name}</TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(machine.status) as any} 
                      label={getStatusLabel(machine.status)} 
                      size="small"
                      sx={{ borderRadius: 2 }}
                    />
                  </TableCell>
                  <TableCell>{machine.location}</TableCell>
                  <TableCell>{machine.lastMaintenance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
