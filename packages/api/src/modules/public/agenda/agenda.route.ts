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
.get("/:companyNameId/availability", ({ agendaService, params }) => agendaService.getCompanyAvailability(params.companyNameId), {
    params: t.Object({
        companyNameId: t.String(),
    })
})
.get("/schedules", ({ agendaService, body }) => agendaService.getCompanySchedules(body), {
    body: t.Object({
        companyNameId: t.String(),
        serviceId: t.String(),
        date: t.String(),
    })
})