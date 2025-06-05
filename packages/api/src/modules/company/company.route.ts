import Elysia, {t }  from "elysia";

import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import { companyModule } from "@meetzen/api/src/modules/company/company.module";
import { WeekDay } from "@meetzen/database";

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
        nameId: t.String(),
        image: t.Optional(t.File({
            format: "image/*",
        })),
        companyDescription: t.String(),
        availableDays: t.Array(t.Enum(WeekDay)),
        phoneNumber: t.String(),
        mapsLocation: t.String(),
        startTime: t.String(),
        endTime: t.String(),
        pmamStart: t.String(),
        pmamEnd: t.String(),
    })
})
.get("/", ({ companyService, user }) => companyService.getUserCompany(user.id), {
    company: true,
})
.get("/validate", ({ companyService, user, body }) => companyService.validateNameId(user.id, body.nameId), {
    company: true,
    body: t.Object({
        nameId: t.String(),
    })
})