import type { ColumnDef } from "@tanstack/react-table";

import type { Material } from "../types/materials.types";

interface GetColumnsOptions {
  onEdit: (material: Material) => void;
}

export const MATERIALS_CONSTANTS = {
  PAGE_TITLE: "Gestión de Materiales",
  PAGE_SUBTITLE: "Control de inventario y stock de materiales",
  CREATE_LABEL: "Agregar Material",
  EDIT_LABEL: "Editar Material",
  DELETE_LABEL: "Eliminar Material",
};

export const MATERIAL_TYPES = [
  { value: "Arena", label: "Arena" },
  { value: "Grava", label: "Grava" },
  { value: "Piedra", label: "Piedra" },
  { value: "Cemento", label: "Cemento" },
  { value: "Aditivo", label: "Aditivo" },
];

export const MATERIAL_UNITS = [
  { value: "m³", label: "Metros cúbicos" },
  { value: "Toneladas", label: "Toneladas" },
  { value: "Bolsas", label: "Bolsas" },
];

export const getMaterialsColumns = ({
  onEdit,
}: GetColumnsOptions): ColumnDef<Material>[] => [
  {
    accessorKey: "name",
    header: "Material",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorFn: (row) => `${row.currentStock} ${row.unit}`,
    header: "Stock Actual",
  },
  {
    accessorFn: (row) => `${row.minStock} ${row.unit}`,
    header: "Stock Mínimo",
  },
  // {
  //   id: "estado",
  //   header: "Estado",
  //   cell: ({ row }) => {
  //     const { color, label } = useStockStatus(row.original.currentStock, row.original.minStock);
  //     return <Chip color={color as any} label={label} size="small" sx={{ borderRadius: 2 }} />;
  //   },
  // },
  // {
  //   accessorKey: "location",
  //   header: "Ubicación",
  // },
  // {
  //   id: "acciones",
  //   header: "Acciones",
  //   cell: ({ row }) => (
  //     <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(row.original)}>
  //       Editar
  //     </Button>
  //   ),
  //   enableSorting: false,
  // },
];

export const mockMaterials: Material[] = [
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
