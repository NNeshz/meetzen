import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClientVanilla } from "@meetzen/auth/client/vanilla";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await authClientVanilla.getSession({
      fetchOptions: {
          headers: await headers(),
          next: {
            revalidate: 0,
          }
      }
  })

  return NextResponse.next();
}

export const config = {
  matcher: ["/company", "/user"],
};