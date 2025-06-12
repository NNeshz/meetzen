import { useQuery } from "@tanstack/react-query";
import { AgendaService } from "@/modules/agenda/services/agenda-service";

export function useAgenda({ companyNameId }: { companyNameId: string }) {
  return useQuery({
    queryKey: ["agenda", companyNameId],
    queryFn: () => AgendaService.getCompany(companyNameId),
    enabled: !!companyNameId,
    staleTime: 60 * 60 * 1000,
  });
}

export function useAgendaServices({ companyNameId }: { companyNameId: string }) {
  return useQuery({
    queryKey: ["agenda-services", companyNameId],
    queryFn: () => AgendaService.getCompanyServices(companyNameId),
    enabled: !!companyNameId,
    staleTime: 60 * 60 * 1000,
  });
}

export function useCompanyAvailability({ companyNameId, serviceId }: { companyNameId: string, serviceId: string }) {
  return useQuery({
    queryKey: ["company-availability", companyNameId, serviceId],
    queryFn: () => AgendaService.getCompanyAvailability(companyNameId, serviceId),
    enabled: !!companyNameId && !!serviceId,
    staleTime: 60 * 60 * 1000,
  });
}
