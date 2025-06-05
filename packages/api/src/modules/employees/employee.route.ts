import Elysia, { t } from "elysia";
import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import { employeeModule } from "@meetzen/api/src/modules/employees/employees.module";

export const employeeRouter = new Elysia({
    name: "employee-router",
    prefix: "/employee",
})
.use(betterAuthPlugin)
.use(employeeModule)
.post("/", ({ employeeService, user, body }) => employeeService.createEmployee(body, user.id), {
    company: true,
    body: t.Object({
        name: t.String(),
        phoneNumber: t.String(),
        address: t.String(),
    })
})
.get("/", ({ employeeService, user }) => employeeService.getEmployee(user.id), {
    company: true,
})