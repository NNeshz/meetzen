import { apiClient } from "@/utils/api-connection";

export const EmpleadosService = {

    async createEmployee(employee: {
        name: string;
        phoneNumber: string;
        address: string;
    }) {
        const response = await apiClient.employee.post(employee, {
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },

    async getEmployees() {
        const response = await apiClient.employee.get({
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    },

    async updateEmployee(id: string, employee: {
        name: string;
        phoneNumber: string;
        address: string;
    }) {
        const response = await apiClient.employee({
            id,
        }).patch(employee, {
            fetch: {
                credentials: "include",
            },
        });
        return response.data;
    }
}
    