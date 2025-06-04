import { apiClient } from "@/utils/api-connection";

export const CompanyService = {
  createBasicInformation: async (body: {
    name: string;
    companyDescription: string;
    image?: File;
    phoneNumber: string;
    mapsLocation: string;
    availableDays: string[];
    startTime: string;
    endTime: string;
    pmamStart: string;
    pmamEnd: string;
  }) => {
    const response = await apiClient.company.post(body, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getUserCompany: async () => {
    const response = await apiClient.company.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
