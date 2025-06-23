import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
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
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";

interface User {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: "admin" | "operator" | "viewer";
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@fidelix.com",
    role: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "María García",
    email: "maria.garcia@fidelix.com",
    role: "operator",
    createdAt: "2024-01-20",
  },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const { hasPermissions } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<User>();

  if (!hasPermissions(["manage_users"])) {
    return (
      <Box>
        <Alert severity="error">
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())) &&
      (roleFilter === "" || user.role === roleFilter),
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("role", user.role);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    reset();
    setOpen(true);
  };

  const onSubmit = (data: User) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...data, id: editingUser.id, createdAt: editingUser.createdAt }
            : u,
        ),
      );
    } else {
      const newUser = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setOpen(false);
    reset();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "secondary";
      case "operator":
        return "primary";
      case "viewer":
        return "success";
      default:
        return "default";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "operator":
        return "Operador";
      case "viewer":
        return "Visualizador";
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
        <Typography color="primary" variant="h4">
          Gestión de Usuarios
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAdd}>
          Agregar Usuario
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack alignItems="center" direction="row" spacing={2}>
            <TextField
              placeholder="Buscar usuarios..."
              size="small"
              sx={{ minWidth: 300 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por rol</InputLabel>
              <Select
                label="Filtrar por rol"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="operator">Operador</MenuItem>
                <MenuItem value="viewer">Visualizador</MenuItem>
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
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Fecha Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontWeight: "medium" }}>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    color={getRoleColor(user.role) as any}
                    label={getRoleLabel(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit User */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          {editingUser ? "Editar Usuario" : "Agregar Usuario"}
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
                  label="Nombre Completo"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register("email", {
                    required: "Email requerido",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  label="Email"
                  type="email"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    {...register("role", { required: "Rol requerido" })}
                    label="Rol"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="operator">Operador</MenuItem>
                    <MenuItem value="viewer">Visualizador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingUser ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
