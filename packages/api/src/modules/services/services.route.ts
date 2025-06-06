import Elysia, { t } from "elysia";
import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import { serviceModule } from "@meetzen/api/src/modules/services/service.module";

export const serviceRouter = new Elysia({
    prefix: "/service",
    name: "service"
})
.use(betterAuthPlugin)
.use(serviceModule)
.get("/:category", ({ serviceService, user, params }) => serviceService.getAllServices(user.id), {
    company: true,
})
.post("/", ({ serviceService, body, user }) => serviceService.createService(body, user.id), {
    company: true,
    body: t.Object({
        name: t.String(),
        duration: t.Number(),
        price: t.Number(),
        categoryId: t.Optional(t.String()),
    })
})
.patch("/:id", ({ serviceService, body, user, params }) => serviceService.updateService(body, user.id, params.id), {
    company: true,
    body: t.Object({
        name: t.String(),
        duration: t.Number(),
        price: t.Number(),
        categoryId: t.Optional(t.String()),
    })
})
.delete("/:id", ({ serviceService, user, params }) => serviceService.deleteService(user.id, params.id), {
    company: true,
})