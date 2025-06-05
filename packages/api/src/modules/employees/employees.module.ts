import Elysia from "elysia";
import { EmployeeService } from "@meetzen/api/src/modules/employees/employee.service";

export const employeeModule = new Elysia({
    name: "employee-module",
}).decorate(() => ({
    employeeService: new EmployeeService(),
}));