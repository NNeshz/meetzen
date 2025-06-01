import type { Api as server } from "@meetzen/api/src";
import { env } from "@meetzen/api/src/utils/envs";
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty<server>(env.NEXT_PUBLIC_BACKEND_URL).api;