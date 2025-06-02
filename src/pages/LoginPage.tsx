
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Image,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, signIn } = useAuth();
  const toast = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');
      await signIn(data.email, data.password);
      toast({
        title: 'Bienvenido',
        description: 'Sesión iniciada correctamente',
        status: 'success',
        duration: 3000,
      });
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gradient-to-br"
      bgGradient="linear(to-br, aridos.light, aridos.primary)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card maxW="md" w="full" shadow="xl">
        <CardBody p={8}>
          <VStack spacing={6}>
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold" color="aridos.primary">
                Áridos Valdez SRL
              </Text>
              <Text color="gray.600" textAlign="center">
                Sistema de Gestión de Materiales
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Salta, Argentina
              </Text>
            </VStack>

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'El email es requerido',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email inválido',
                      },
                    })}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    {...register('password', {
                      required: 'La contraseña es requerida',
                    })}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  bg="aridos.primary"
                  _hover={{ bg: 'aridos.dark' }}
                  size="lg"
                  w="full"
                  isLoading={loading}
                  loadingText="Iniciando sesión..."
                >
                  Iniciar Sesión
                </Button>
              </VStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
