import { apiClient } from "@/utils/api-connection";

export const ServiciosService = {
  createService: async (body: {
    name: string;
    duration: number;
    price: number;
    categoryId?: string;
  }) => {
    const response = await apiClient.service.post(body, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getServices: async () => {
    const response = await apiClient.service.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  updateService: async (
    id: string,
    body: {
      name: string;
      duration: number;
      price: number;
      categoryId?: string;
    }
  ) => {
    const response = await apiClient
      .service({
        id,
      })
      .patch(body, {
        fetch: {
          credentials: "include",
        },
      });
    return response.data;
  },

  deleteService: async (id: string) => {
    const response = await apiClient
      .service({
        id,
      })
      .delete({
        fetch: {
          credentials: "include",
        },
      });
    return response.data;
  },
};
