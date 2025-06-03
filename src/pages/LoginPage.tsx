
import React, { useState } from 'react';
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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Card sx={{ 
          width: '100%', 
          maxWidth: 420,
          mx: 'auto',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                Áridos Valdez
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Sistema de Gestión de Materiales
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'error.light',
                      bgcolor: 'error.50'
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  {...register('email', {
                    required: 'Email requerido',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email inválido',
                    },
                  })}
                  label="Correo electrónico"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 48,
                    }
                  }}
                />

                <TextField
                  {...register('password', {
                    required: 'Contraseña requerida',
                    minLength: {
                      value: 6,
                      message: 'Mínimo 6 caracteres',
                    },
                  })}
                  label="Contraseña"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 48,
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ 
                    mt: 3,
                    height: 48,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Stack>
            </form>

            <Box sx={{ 
              mt: 4, 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                Credenciales de demostración:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                admin@aridosvaldez.com
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                123456
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
