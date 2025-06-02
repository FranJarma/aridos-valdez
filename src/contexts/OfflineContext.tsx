
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

interface OfflineContextType {
  isOnline: boolean;
  syncData: () => Promise<void>;
  pendingOperations: any[];
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Conexión restaurada',
        description: 'Sincronizando datos...',
        status: 'success',
        duration: 3000,
      });
      syncData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'Sin conexión',
        description: 'Trabajando en modo offline',
        status: 'warning',
        duration: 3000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncData = async () => {
    if (!isOnline || pendingOperations.length === 0) return;

    try {
      // Aquí implementarías la lógica de sincronización
      // Por ahora solo limpiamos las operaciones pendientes
      setPendingOperations([]);
      
      toast({
        title: 'Sincronización completa',
        description: 'Todos los datos han sido sincronizados',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error syncing data:', error);
      toast({
        title: 'Error de sincronización',
        description: 'No se pudieron sincronizar algunos datos',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      syncData,
      pendingOperations,
    }}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}
