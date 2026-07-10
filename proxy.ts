import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, isAuthorizedStaff } from "@/lib/auth/session";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("unds_session")?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!isAuthorizedStaff(session)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
