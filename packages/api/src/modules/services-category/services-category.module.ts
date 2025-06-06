import Elysia from "elysia";
import { ServiceCategoryService } from "@meetzen/api/src/modules/services-category/service-category.service";

export const serviceCategoryModule = new Elysia({
    name: "service-category-module",
}).decorate(() => ({
    serviceCategoryService: new ServiceCategoryService(),
}));
