import { PrismaClient } from "@meetzen/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, admin } from "better-auth/plugins";
import { user, company } from "@meetzen/auth/utils/permissions";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Meetzen",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      },
      companyId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_FRONTEND_URL as string,
    process.env.NEXT_PUBLIC_BACKEND_URL as string,
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  plugins: [
    openAPI(),
    admin({
      roles: {
        user,
        company,
      },
      defaultRole: "user",
    }),
  ],
});
