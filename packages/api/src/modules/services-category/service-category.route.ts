import Elysia, { t } from "elysia";
import { serviceCategoryModule } from "@meetzen/api/src/modules/services-category/services-category.module";
import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";

export const serviceCategoryRouter = new Elysia({
    prefix: "/category",
    name: "category"
})
.use(betterAuthPlugin)
.use(serviceCategoryModule)
.post("/", ({ serviceCategoryService, user, body }) => serviceCategoryService.createServiceCategory(body, user.id), {
    company: true,
    body: t.Object({
        name: t.String(),
    })
})
.get("/", ({ serviceCategoryService, user }) => serviceCategoryService.getAllServiceCategories(user.id), {
    company: true,
})
.patch("/:id", ({ serviceCategoryService, user, body, params }) => serviceCategoryService.updateServiceCategory(user.id, body, params.id), {
    company: true,
    body: t.Object({
        name: t.String(),
    }),
    params: t.Object({
        id: t.String(),
    })
})
.delete("/:id", ({ serviceCategoryService, user, params }) => serviceCategoryService.deleteServiceCategory(user.id, params.id), {
    company: true,
})
