import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import Elysia, {t }  from "elysia";
import { companyModule } from "@meetzen/api/src/modules/company/company.module";

export const companyRouter = new Elysia({
    prefix: "/company",
    name: "company"
})
.use(betterAuthPlugin)
.use(companyModule)
.post("/", ({ companyService, user, body }) => companyService.createCompany(body, user.id), {
    company: true,
    body: t.Object({
        name: t.String(),
        image: t.File({
            format: "image/*",
        }),
        companyDescription: t.String(),
    })
})
.get("/", ({ companyService, user }) => companyService.getUserCompany(user.id), {
    company: true,
})