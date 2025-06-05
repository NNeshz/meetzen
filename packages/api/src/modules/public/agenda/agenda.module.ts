import Elysia from "elysia";
import { AgendaService } from "@meetzen/api/src/modules/public/agenda/agenda.service";

export const agendaModule = new Elysia({
  name: "agenda-module",
}).decorate("agendaService", new AgendaService());
