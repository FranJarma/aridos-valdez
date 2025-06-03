import React, { useState } from "react";
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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Movement {
  id: string;
  type: "entrada" | "salida" | "transferencia";
  materialName: string;
  machineryName?: string;
  quantity: number;
  origin?: string;
  destination?: string;
  userName: string;
  notes?: string;
  role?: string;
  createdAt: string;
}

const mockMovements: Movement[] = [
  {
    id: "1",
    type: "entrada",
    materialName: "Arena Fina",
    quantity: 50,
    origin: "Proveedor A",
    userName: "Juan Pérez",
    notes: "Entrega programada",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "salida",
    materialName: "Grava 20mm",
    machineryName: "Excavadora CAT 320",
    quantity: 25,
    destination: "Obra Central",
    userName: "María García",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const currentUserRole = "admin"; // Simulando role del usuario actual

export function MovementsPage() {
  if (currentUserRole === "admin") return null;

  const [movements, setMovements] = useState<Movement[]>(mockMovements);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Movement>();

  const watchedType = watch("type");

  const filteredMovements = movements.filter(
    (movement) =>
      (movement.materialName.toLowerCase().includes(filter.toLowerCase()) ||
        movement.type.includes(filter.toLowerCase())) &&
      (typeFilter === "" || movement.type === typeFilter),
  );

  const onSubmit = (data: Movement) => {
    const newMovement = {
      ...data,
      id: Date.now().toString(),
      userName: "Usuario Actual",
      createdAt: new Date().toISOString(),
    };

    setMovements((prev) => [newMovement, ...prev]);
    setOpen(false);
    reset();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "entrada":
        return "success";
      case "salida":
        return "error";
      case "transferencia":
        return "info";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "entrada":
        return "Entrada";
      case "salida":
        return "Salida";
      case "transferencia":
        return "Transferencia";
      default:
        return "Desconocido";
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" color="primary">
          Movimientos de Materiales
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Registrar Movimiento
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Buscar movimientos..."
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
                <MenuItem value="entrada">Entrada</MenuItem>
                <MenuItem value="salida">Salida</MenuItem>
                <MenuItem value="transferencia">Transferencia</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Origen/Destino</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Fecha/Hora</TableCell>
              <TableCell>Notas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.map((movement) => (
              <TableRow key={movement.id} hover>
                <TableCell>
                  <Chip
                    color={getTypeColor(movement.type) as any}
                    label={getTypeLabel(movement.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {movement.materialName}
                </TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>
                  <Box>
                    {movement.type === "entrada" && movement.origin && (
                      <Typography variant="body2">
                        <strong>Desde:</strong> {movement.origin}
                      </Typography>
                    )}
                    {movement.type === "salida" && movement.destination && (
                      <Typography variant="body2">
                        <strong>Hacia:</strong> {movement.destination}
                      </Typography>
                    )}
                    {movement.type === "transferencia" && (
                      <>
                        {movement.origin && (
                          <Typography variant="caption">
                            <strong>Desde:</strong> {movement.origin}
                          </Typography>
                        )}
                        {movement.destination && (
                          <Typography variant="caption" display="block">
                            <strong>Hacia:</strong> {movement.destination}
                          </Typography>
                        )}
                      </>
                    )}
                    {movement.machineryName && (
                      <Typography variant="caption" color="primary">
                        <strong>Máquina:</strong> {movement.machineryName}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{movement.userName}</TableCell>
                <TableCell>
                  {format(new Date(movement.createdAt), "dd/MM/yyyy HH:mm", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell>{movement.notes || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Registrar Movimiento</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Tipo de Movimiento</InputLabel>
                  <Select
                    {...register("type", { required: "Tipo requerido" })}
                    label="Tipo de Movimiento"
                  >
                    <MenuItem value="entrada">Entrada</MenuItem>
                    <MenuItem value="salida">Salida</MenuItem>
                    <MenuItem value="transferencia">Transferencia</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.materialName}>
                  <InputLabel>Material</InputLabel>
                  <Select
                    {...register("materialName", {
                      required: "Material requerido",
                    })}
                    label="Material"
                  >
                    <MenuItem value="Arena Fina">Arena Fina</MenuItem>
                    <MenuItem value="Grava 20mm">Grava 20mm</MenuItem>
                    <MenuItem value="Piedra Partida">Piedra Partida</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("quantity", {
                    required: "Cantidad requerida",
                    min: { value: 0.1, message: "Debe ser mayor a 0" },
                  })}
                  label="Cantidad"
                  type="number"
                  fullWidth
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              </Grid>

              {watchedType === "entrada" && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("origin")}
                    label="Origen"
                    placeholder="Ej: Proveedor A, Cantera Norte"
                    fullWidth
                  />
                </Grid>
              )}

              {watchedType === "salida" && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("destination")}
                    label="Destino"
                    placeholder="Ej: Obra Central, Cliente XYZ"
                    fullWidth
                  />
                </Grid>
              )}

              {watchedType === "transferencia" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register("origin")}
                      label="Origen"
                      placeholder="Ubicación de origen"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register("destination")}
                      label="Destino"
                      placeholder="Ubicación de destino"
                      fullWidth
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Maquinaria Asociada (Opcional)</InputLabel>
                  <Select
                    {...register("machineryName")}
                    label="Maquinaria Asociada (Opcional)"
                  >
                    <MenuItem value="">Ninguna</MenuItem>
                    <MenuItem value="Excavadora CAT 320">
                      Excavadora CAT 320
                    </MenuItem>
                    <MenuItem value="Cargadora JCB">Cargadora JCB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select {...register("role")} label="Rol">
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("notes")}
                  label="Notas (Opcional)"
                  placeholder="Observaciones adicionales..."
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
