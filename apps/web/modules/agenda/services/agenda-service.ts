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
}