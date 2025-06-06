import { useState } from "react";
import { useForm } from "react-hook-form";

// import { MaterialFormDialog } from "./components/MaterialFormDialog";
import { MaterialFormDialog } from "./components/material-form-dialog";
import {
  getMaterialsColumns,
  MATERIALS_CONSTANTS,
  mockMaterials,
} from "./constants/materials.constants";
import type { Material } from "./types/materials.types";

import { withEntityLayout } from "@/components/shared/with-entity-layout";
import { FORM_CONSTANTS } from "@/constants/form.constants";

function RawMaterialsPage() {
  return null;
}

export const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<Material>();

  const handleClose = () => {
    setOpen(false);
    setEditingMaterial(null);
    form.reset();
  };

  const handleSubmit = (data: Material) => {
    if (editingMaterial) {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === editingMaterial.id ? { ...data, id: m.id } : m,
        ),
      );
    } else {
      setMaterials((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    }

    handleClose();
  };

  const handleAdd = () => {
    setEditingMaterial(null);
    form.reset();
    setOpen(true);
  };

  const Wrapped = withEntityLayout(RawMaterialsPage, {
    title: MATERIALS_CONSTANTS.PAGE_TITLE,
    subtitle: MATERIALS_CONSTANTS.PAGE_SUBTITLE,
    createLabel: MATERIALS_CONSTANTS.CREATE_LABEL,
    columns: getMaterialsColumns({ onEdit: handleSubmit }),
    data: materials,
    onCreate: handleAdd,
    renderFormDialog: (
      <MaterialFormDialog
        editing={editingMaterial}
        form={form}
        open={open}
        confirmButtonTitle={
          editingMaterial
            ? FORM_CONSTANTS.EDIT_LABEL
            : FORM_CONSTANTS.CONFIRM_LABEL
        }
        dialogTitle={
          editingMaterial
            ? MATERIALS_CONSTANTS.EDIT_LABEL
            : MATERIALS_CONSTANTS.CREATE_LABEL
        }
        onClose={handleClose}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    ),
  });

  return <Wrapped />;
};
