import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClientVanilla } from "@meetzen/auth/client/vanilla";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data } = await authClientVanilla.getSession({
    fetchOptions: {
      headers: await headers(),
      next: {
        revalidate: 0,
      },
    },
  });
  
  if (!data && (pathname.startsWith("/company") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (data && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (data && data.user.role === "user" && pathname.startsWith("/company")) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (data && data.user.role === "company" && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/company", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/company", "/user", "/auth", "/company/:path*", "/user/:path*"],
};