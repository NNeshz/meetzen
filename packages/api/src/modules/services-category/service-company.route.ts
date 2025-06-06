import Elysia from "elysia";
import { serviceCategoryModule } from "@meetzen/api/src/modules/services-category/services-category.module";
import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";

export const serviceCategoryRouter = new Elysia({
    prefix: "/service-category",
    name: "service-category"
})
.use(betterAuthPlugin)
.use(serviceCategoryModule)