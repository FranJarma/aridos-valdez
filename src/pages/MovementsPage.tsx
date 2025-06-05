import { Add as AddIcon } from "@mui/icons-material";
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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Movement {
  createdAt: string;
  destination?: string;
  id: string;
  machineryName?: string;
  materialName: string;
  notes?: string;
  origin?: string;
  quantity: number;
  role?: string;
  type: "entrada" | "salida" | "transferencia";
  userName: string;
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

export function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>(mockMovements);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
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
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography color="primary" variant="h4">
          Movimientos de Materiales
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Registrar Movimiento
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack alignItems="center" direction="row" spacing={2}>
            <TextField
              placeholder="Buscar movimientos..."
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
                          <Typography display="block" variant="caption">
                            <strong>Hacia:</strong> {movement.destination}
                          </Typography>
                        )}
                      </>
                    )}
                    {movement.machineryName && (
                      <Typography color="primary" variant="caption">
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
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Registrar Movimiento</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
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

              <Grid size={{ xs: 12, sm: 6 }}>
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

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("quantity", {
                    required: "Cantidad requerida",
                    min: { value: 0.1, message: "Debe ser mayor a 0" },
                  })}
                  fullWidth
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  label="Cantidad"
                  type="number"
                />
              </Grid>

              {watchedType === "entrada" && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register("origin")}
                    fullWidth
                    label="Origen"
                    placeholder="Ej: Proveedor A, Cantera Norte"
                  />
                </Grid>
              )}

              {watchedType === "salida" && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register("destination")}
                    fullWidth
                    label="Destino"
                    placeholder="Ej: Obra Central, Cliente XYZ"
                  />
                </Grid>
              )}

              {watchedType === "transferencia" && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      {...register("origin")}
                      fullWidth
                      label="Origen"
                      placeholder="Ubicación de origen"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      {...register("destination")}
                      fullWidth
                      label="Destino"
                      placeholder="Ubicación de destino"
                    />
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12, sm: 6 }}>
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

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register("notes")}
                  fullWidth
                  multiline
                  label="Notas (Opcional)"
                  placeholder="Observaciones adicionales..."
                  rows={3}
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
