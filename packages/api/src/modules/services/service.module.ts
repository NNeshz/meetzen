import Elysia from "elysia";
import { ServiceService } from "@meetzen/api/src/modules/services/service.service";

export const serviceModule = new Elysia({
    name: "service-module",
}).decorate(() => ({
    serviceService: new ServiceService(),
}));
