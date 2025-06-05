import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import Elysia from "elysia";
import { agendaRouter } from "@meetzen/api/src/modules/public/agenda/agenda.route";

export const publicRoute = new Elysia({
    name: "public-router",
    prefix: "/public",
})
.use(betterAuthPlugin)
.use(agendaRouter)