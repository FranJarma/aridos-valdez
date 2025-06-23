// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111", // Negro suave
      light: "#3f3f3f",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6b7280", // Slate gray
      light: "#9ca3af",
      dark: "#4b5563",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb",
    },
    text: {
      primary: "#111827", // Muy oscuro
      secondary: "#6b7280",
    },
    divider: "#e5e7eb", // Gris claro
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    success: {
      main: "#15803d",
      light: "#22c55e",
      dark: "#166534",
    },
    warning: {
      main: "#ca8a04",
      light: "#facc15",
      dark: "#a16207",
    },
    error: {
      main: "#b91c1c",
      light: "#ef4444",
      dark: "#7f1d1d",
    },
  },
  typography: {
    fontFamily:
      '"Rubik", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
      fontSize: "0.875rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
