import Elysia, { t } from "elysia";
import { agendaModule } from "@meetzen/api/src/modules/public/agenda/agenda.module";
import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";

export const agendaRouter = new Elysia({
    name: "agenda-router",
    prefix: "/agenda",
})
.use(betterAuthPlugin)
.use(agendaModule)
.get("/:companyNameId", ({ agendaService, params }) => agendaService.getCompany(params.companyNameId), {
    params: t.Object({
        companyNameId: t.String(),
    })
})
.get("/:companyNameId/services", ({ agendaService, params }) => agendaService.getCompanyServices(params.companyNameId), {
    params: t.Object({
        companyNameId: t.String(),
    })
})
.post("/:companyNameId/availability", ({ agendaService, params, body }) => agendaService.getCompanyAvailability(params.companyNameId, body.serviceId), {
    params: t.Object({
        companyNameId: t.String(),
    }),
    body: t.Object({
        serviceId: t.String(),
    })
})