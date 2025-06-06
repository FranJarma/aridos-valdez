// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c52a37",
      light: "#e6505c",
      dark: "#961f2b",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-feature-settings: 'kern' 1, 'liga' 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          padding: "10px 20px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
        outlined: {
          borderColor: "#e2e8f0",
          "&:hover": {
            borderColor: "#cbd5e1",
            backgroundColor: "#f8fafc",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "#cbd5e1",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "& fieldset": {
              borderColor: "#e2e8f0",
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c52a37",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
        filled: {
          "&.MuiChip-colorSuccess": {
            backgroundColor: "#dcfce7",
            color: "#166534",
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "#fef3c7",
            color: "#92400e",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#fee2e2",
            color: "#991b1b",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: "#f1f5f9",
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0f172a",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          padding: "12px 16px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#f8fafc",
          },
          "&.Mui-selected": {
            color: "#c52a37",

            "& .MuiListItemIcon-root": {
              color: "#c52a37",
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8fafc",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#64748b",
          borderBottom: "1px solid #e2e8f0",
        },
        body: {
          borderBottom: "1px solid #f1f5f9",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.125rem",
          fontWeight: 600,
          padding: "24px 24px 8px 24px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px 24px 24px",
          gap: "12px",
        },
      },
    },
  },
});
