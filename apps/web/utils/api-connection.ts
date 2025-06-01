import type { Api } from "@meetzen/api/src/index";
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty<Api>(process.env.NEXT_PUBLIC_BACKEND_URL).api;