import { Box, Paper, Stack, Typography } from "@mui/material";
import { type ColumnDef, flexRender } from "@tanstack/react-table";

interface Props<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
}

export function DataListView<T extends object>({ columns, data }: Props<T>) {
  return (
    <Stack spacing={2}>
      {data.map((item, i) => (
        <Paper key={i} sx={{ p: 2, borderRadius: 2 }} variant="outlined">
          <Stack spacing={1}>
            {columns.map((column, index) => {
              const columnKey =
                "id" in column
                  ? column.id
                  : "accessorKey" in column &&
                      typeof column.accessorKey === "string"
                    ? column.accessorKey
                    : `col-${index}`;

              const header = column.header;
              const rawValue =
                "accessorFn" in column
                  ? column.accessorFn?.(item, index)
                  : "accessorKey" in column &&
                      typeof column.accessorKey === "string"
                    ? (item as any)[column.accessorKey]
                    : undefined;

              return (
                <Box key={columnKey}>
                  <Typography color="text.secondary" variant="caption">
                    {typeof header === "string" ? header : ""}
                  </Typography>
                  <Typography fontWeight={500} variant="body2">
                    {column.cell
                      ? flexRender(column.cell, {
                          row: { original: item },
                          getValue: () => rawValue,
                        } as any)
                      : rawValue}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
