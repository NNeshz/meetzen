import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "./utils/envs";

import { betterAuthPlugin } from "@meetzen/api/src/utils/better-auth-plugin";
import { companyRouter } from "@meetzen/api/src/modules/company/company.route";

export const api = new Elysia({
  prefix: "/api",
})
.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
}))
.use(betterAuthPlugin)
.use(companyRouter)
  
export type Api = typeof api;