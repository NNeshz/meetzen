import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/modules/company/servicios/category/services/category-service";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoryService.getAllCategories(),
        staleTime: 60 * 60 * 1000,
    })
}