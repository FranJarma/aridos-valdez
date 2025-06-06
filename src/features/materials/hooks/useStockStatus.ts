export function useStockStatus(current: number, min: number) {
  const percentage = (current / min) * 100;
  if (percentage < 100)
    return { color: "error", label: "Stock Bajo", percentage };
  if (percentage < 150)
    return { color: "warning", label: "Stock Medio", percentage };
  return { color: "success", label: "Stock Alto", percentage: 100 };
}
