import { createAuthClient as createAuthClientVanilla } from "better-auth/client";
import { inferAdditionalFields, phoneNumberClient } from "better-auth/client/plugins";
import { auth } from "@meetzen/auth";

export const authClientVanilla = createAuthClientVanilla({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [inferAdditionalFields<typeof auth>(), phoneNumberClient()],
});