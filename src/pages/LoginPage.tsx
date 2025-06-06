import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, user } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>();

  if (user) {
    return <Navigate replace to="/dashboard" />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/aridos-valdez-bg.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          zIndex: -1,
        },
      }}
    >
      <Container component="main" maxWidth="sm">
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            mx: "auto",
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <img
                alt="Áridos Valdez Logo"
                src="/aridos-valdez-logo.webp"
                width={100}
              />
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "error.light",
                      bgcolor: "error.50",
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  {...register("email", {
                    required: "Email requerido",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  label="Correo electrónico"
                  type="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                    },
                  }}
                />

                <TextField
                  {...register("password", {
                    required: "Contraseña requerida",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  label="Contraseña"
                  type="password"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                    },
                  }}
                />

                <Button
                  fullWidth
                  disabled={loading}
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    height: 48,
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </Stack>
            </form>

            <Box
              sx={{
                mt: 4,
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ fontWeight: 500, mb: 1 }}
                variant="body2"
              >
                Credenciales de demostración:
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontFamily: "monospace" }}
                variant="body2"
              >
                admin@aridosvaldez.com
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontFamily: "monospace" }}
                variant="body2"
              >
                123456
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
