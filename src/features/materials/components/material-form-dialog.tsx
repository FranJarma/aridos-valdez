import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import type { UseFormReturn } from "react-hook-form";

import {
  MATERIAL_TYPES,
  MATERIAL_UNITS,
} from "../constants/materials.constants";
import type { Material } from "../types/materials.types";

type MaterialFormDialogProps = {
  confirmButtonTitle: string;
  dialogTitle: string;
  editing: Material | null;
  form: UseFormReturn<Material>;
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
};

export function MaterialFormDialog({
  confirmButtonTitle,
  dialogTitle,
  form,
  onClose,
  onSubmit,
  open,
}: MaterialFormDialogProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
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
                  defaultValue=""
                  label="Tipo"
                >
                  {MATERIAL_TYPES.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.unit}>
                <InputLabel>Unidad</InputLabel>
                <Select
                  {...register("unit", { required: "Unidad requerida" })}
                  defaultValue=""
                  label="Unidad"
                >
                  {MATERIAL_UNITS.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
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
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
