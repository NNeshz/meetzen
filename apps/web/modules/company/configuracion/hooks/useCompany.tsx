import { useQuery } from "@tanstack/react-query"
import { CompanyService } from "@/modules/company/configuracion/services/company-service"

export function useCompany() {
    return useQuery({
        queryKey: ["company"],
        queryFn: () => CompanyService.getUserCompany(),
        staleTime: 60 * 60 * 1000,
    })
}