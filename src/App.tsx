import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { MachineryPage } from "./pages/MachineryPage";
import { MaterialsPage } from "./pages/MaterialsPage";
import { MovementsPage } from "./pages/MovementsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { UsersPage } from "./pages/UsersPage";
import { theme } from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <OfflineProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route element={<LoginPage />} path="/login" />
                <Route
                  element={<Navigate replace to="/dashboard" />}
                  path="/"
                />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Routes>
                          <Route
                            element={<DashboardPage />}
                            path="/dashboard"
                          />
                          <Route
                            element={<MaterialsPage />}
                            path="/materials"
                          />
                          <Route
                            element={<MachineryPage />}
                            path="/machinery"
                          />
                          <Route
                            element={<MovementsPage />}
                            path="/movements"
                          />
                          <Route element={<UsersPage />} path="/users" />
                          <Route element={<ReportsPage />} path="/reports" />
                          <Route
                            element={<Navigate replace to="/dashboard" />}
                            path="/"
                          />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </AuthProvider>
        </OfflineProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
