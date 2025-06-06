import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "./datatable";

import { useAuth } from "@/contexts/AuthContext";

type WithEntityLayoutProps<T> = {
  actions?: ReactNode;
  columns: ColumnDef<T, any>[];
  createLabel?: string;
  createRoute?: string;
  data: T[];
  emptyLabel?: string;
  onCreate?: () => void;
  renderFormDialog?: ReactNode;
  requiredPermissions?: string[];
  subtitle?: string;
  title: string;
};

export function withEntityLayout<T extends object, P extends object>(
  Component: React.ComponentType<P>,
  layoutProps: WithEntityLayoutProps<T>,
) {
  return function WrappedComponent(props: P) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { hasPermissions } = useAuth();
    const navigate = useNavigate();
    const {
      actions,
      columns,
      createLabel = "Crear",
      createRoute,
      data,
      emptyLabel = "No hay resultados",
      onCreate,
      renderFormDialog,
      requiredPermissions = ["read"],
      subtitle,
      title,
    } = layoutProps;

    if (!hasPermissions(requiredPermissions)) {
      return (
        <Alert severity="error">
          No tienes permisos para acceder a esta sección.
        </Alert>
      );
    }

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
              {title}
            </Typography>
            {subtitle && (
              <Typography color="text.secondary" variant="body1">
                {subtitle}
              </Typography>
            )}
          </Box>

          {(createRoute || onCreate) && (
            <Button
              startIcon={!isMobile ? <Add /> : undefined}
              variant="contained"
              sx={{
                borderRadius: isMobile ? "50%" : 2,
                minWidth: isMobile ? 0 : undefined,
                padding: isMobile ? 1 : undefined,
                width: isMobile ? 40 : undefined,
                height: isMobile ? 40 : undefined,
              }}
              onClick={() => {
                if (onCreate) onCreate();
                else if (createRoute) navigate(createRoute);
              }}
            >
              {isMobile ? <Add fontSize="small" /> : createLabel}
            </Button>
          )}
        </Stack>

        {actions && <Box sx={{ mb: 3 }}>{actions}</Box>}

        {data.length === 0 ? (
          <Alert severity="info">{emptyLabel}</Alert>
        ) : (
          <DataTable columns={columns} data={data} />
        )}

        {renderFormDialog && renderFormDialog}

        <Component {...props} />
      </Box>
    );
  };
}
