import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
}
