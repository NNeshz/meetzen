import { apiClient } from "@/utils/api-connection";

export const CategoryService = {
    createCategory: async (body: { name: string }) => {
        const response = await apiClient.category.post(body, {
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },
    getAllCategories: async () => {
        const response = await apiClient.category.get({
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },
    updateCategory: async (id: string, body: { name: string }) => {
        const response = await apiClient.category({ id }).patch(body, {
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },
    deleteCategory: async (id: string) => {
        const response = await apiClient.category({ id }).delete({
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },
}
