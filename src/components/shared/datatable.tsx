import { useTheme, useMediaQuery } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";

import { DataListView } from "./datalist-view";
import { DataTableView } from "./datatable-view";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
}

export function DataTable<T extends object>({
  columns,
  data,
}: DataTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return isMobile ? (
    <DataTableView columns={columns} data={data} />
  ) : (
    <DataListView columns={columns} data={data} />
  );
}
