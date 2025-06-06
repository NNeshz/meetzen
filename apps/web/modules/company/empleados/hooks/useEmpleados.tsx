import { useQuery } from "@tanstack/react-query";
import { EmpleadosService } from "@/modules/company/empleados/services/empleados-service";

export function useEmpleados() {
  return useQuery({
    queryKey: ["empleados"],
    queryFn: () => EmpleadosService.getEmployees(),
    staleTime: 60 * 60 * 1000,
  });
}