import {
  Add as AddIcon,
  Edit as EditIcon,
  Build as BuildIcon,
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
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";

interface Machinery {
  id: string;
  lastMaintenance: string;
  location: string;
  model: string;
  name: string;
  status: "active" | "maintenance" | "inactive";
  type: string;
}

const mockMachinery: Machinery[] = [
  {
    id: "1",
    name: "Excavadora CAT 320",
    type: "Excavadora",
    model: "CAT 320D",
    status: "active",
    location: "Cantera Norte",
    lastMaintenance: "2024-01-15",
  },
  {
    id: "2",
    name: "Cargadora JCB",
    type: "Cargadora",
    model: "JCB 456",
    status: "maintenance",
    location: "Taller",
    lastMaintenance: "2024-01-10",
  },
];

export function MachineryPage() {
  const [machinery, setMachinery] = useState<Machinery[]>(mockMachinery);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingMachine, setEditingMachine] = useState<Machinery | null>(null);
  const [open, setOpen] = useState(false);
  const { hasPermissions } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<Machinery>();

  if (!hasPermissions(["read"])) {
    return (
      <Box>
        <Alert severity="error">
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  const filteredMachinery = machinery.filter(
    (machine) =>
      (machine.name.toLowerCase().includes(filter.toLowerCase()) ||
        machine.type.toLowerCase().includes(filter.toLowerCase())) &&
      (statusFilter === "" || machine.status === statusFilter),
  );

  const handleEdit = (machine: Machinery) => {
    setEditingMachine(machine);
    setValue("name", machine.name);
    setValue("type", machine.type);
    setValue("model", machine.model);
    setValue("status", machine.status);
    setValue("location", machine.location);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingMachine(null);
    reset();
    setOpen(true);
  };

  const onSubmit = (data: Machinery) => {
    if (editingMachine) {
      setMachinery((prev) =>
        prev.map((m) =>
          m.id === editingMachine.id ? { ...data, id: editingMachine.id } : m,
        ),
      );
    } else {
      const newMachine = { ...data, id: Date.now().toString() };
      setMachinery((prev) => [...prev, newMachine]);
    }
    setOpen(false);
    reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "maintenance":
        return "warning";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activa";
      case "maintenance":
        return "Mantenimiento";
      case "inactive":
        return "Inactiva";
      default:
        return "Desconocido";
    }
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
            Gestión de Maquinaria
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Control y seguimiento de equipos y maquinaria
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
          variant="contained"
          onClick={handleAdd}
        >
          Agregar Maquinaria
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
            <BuildIcon sx={{ color: "text.secondary" }} />
            <TextField
              placeholder="Buscar maquinaria..."
              size="small"
              sx={{ minWidth: 300 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por estado</InputLabel>
              <Select
                label="Filtrar por estado"
                value={statusFilter}
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

      <Card
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Modelo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ubicación</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Último Mantenimiento
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMachinery.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{machine.name}</TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>{machine.model}</TableCell>
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
      </Card>

      {/* Dialog for Add/Edit Machinery */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          {editingMachine ? "Editar Maquinaria" : "Agregar Maquinaria"}
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
                    <MenuItem value="Excavadora">Excavadora</MenuItem>
                    <MenuItem value="Cargadora">Cargadora</MenuItem>
                    <MenuItem value="Volquete">Volquete</MenuItem>
                    <MenuItem value="Trituradora">Trituradora</MenuItem>
                    <MenuItem value="Cinta transportadora">
                      Cinta transportadora
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("model", { required: "Modelo requerido" })}
                  fullWidth
                  error={!!errors.model}
                  helperText={errors.model?.message}
                  label="Modelo"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    {...register("status", { required: "Estado requerido" })}
                    label="Estado"
                  >
                    <MenuItem value="active">Activa</MenuItem>
                    <MenuItem value="maintenance">Mantenimiento</MenuItem>
                    <MenuItem value="inactive">Inactiva</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
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
              {editingMachine ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
