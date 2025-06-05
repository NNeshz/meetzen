import { useQuery } from "@tanstack/react-query";
import { ServiciosService } from "@/modules/company/servicios/services/servicios-service";

export const useServicios = () => {
  return useQuery({
    queryKey: ["servicios"],
    queryFn: () => ServiciosService.getServices(),
    staleTime: 60 * 60 * 1000,
  });
};
