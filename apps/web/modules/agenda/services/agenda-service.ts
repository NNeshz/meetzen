import { apiClient } from "@/utils/api-connection";

export const AgendaService = {
    getCompany: async (companyNameId: string) => {
        const response = await apiClient.public.agenda({ companyNameId}).get({
            fetch: {
                credentials: "include",
            },
        })
        return response.data
    },
    getCompanyServices: async (companyNameId: string) => {
        const response = await apiClient.public.agenda({ companyNameId }).services.get({
            fetch: {
                credentials: "include",
            },
        })
        return response.data
    },

    getAvailableDays: async (companyNameId: string) => {
        const response = await apiClient.public.agenda({companyNameId}).availability.get({
            fetch: {
                credentials: "include",
            },
        })
        return response.data
    },
}