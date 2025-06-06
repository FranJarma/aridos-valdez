import { InfoOutlineRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export function NotFoundPage() {
  const [counter, setCounter] = React.useState(3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(interval);
      window.location.href = "/dashboard";
    }

    return () => clearInterval(interval);
  });

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <InfoOutlineRounded />
      <Typography variant="h5">404 - Página no encontrada</Typography>
      <Typography variant="body1">
        Volviendo a la página principal en... {counter}
      </Typography>
    </Box>
  );
}
