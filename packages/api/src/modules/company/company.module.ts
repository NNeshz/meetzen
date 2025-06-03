import Elysia from "elysia";
import { CompanyService } from "@meetzen/api/src/modules/company/company.service";

export const companyModule = new Elysia({
  name: "company-module",
}).decorate(() => ({
  companyService: new CompanyService(),
}));