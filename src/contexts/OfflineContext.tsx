import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OfflineContextType {
  addPendingOperation: (operation: any) => void;
  isOnline: boolean;
  pendingOperations: any[];
  syncData: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    open: boolean;
    severity: "success" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "warning" | "error",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showSnackbar("Conexión restaurada. Sincronizando datos...", "success");
      syncData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showSnackbar("Sin conexión. Trabajando en modo offline", "warning");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const addPendingOperation = (operation: any) => {
    setPendingOperations((prev) => [
      ...prev,
      { ...operation, timestamp: Date.now() },
    ]);
  };

  const syncData = async () => {
    if (!isOnline || pendingOperations.length === 0) return;

    try {
      // Simulate sync process
      console.log("Syncing pending operations:", pendingOperations);

      // Here you would sync with Supabase
      // await supabase.from('table').insert(pendingOperations);

      setPendingOperations([]);
      showSnackbar("Datos sincronizados correctamente", "success");
    } catch (error) {
      console.error("Error syncing data:", error);
      showSnackbar("Error al sincronizar datos", "error");
    }
  };

  const contextValue: OfflineContextType = {
    isOnline,
    pendingOperations,
    addPendingOperation,
    syncData,
  };

  return (
    <OfflineContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={4000}
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error("useOffline must be used within an OfflineProvider");
  }
  return context;
}
