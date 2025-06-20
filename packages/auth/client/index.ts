import { createAuthClient } from "better-auth/react";
import { getSessionCookie } from "better-auth/cookies";
import { inferAdditionalFields, phoneNumberClient } from "better-auth/client/plugins";
import { NextRequest } from "next/server";
import type { auth } from "@meetzen/auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [inferAdditionalFields<typeof auth>(), phoneNumberClient()],
});

export const getSession = async (request: NextRequest) => {
  return await getSessionCookie(request);
};