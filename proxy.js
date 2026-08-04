import { NextResponse } from "next/server";

import { ADMIN_LOGIN_PATH, ADMIN_TOKEN_COOKIE } from "@/lib/constants";

/**
 * Optimistic admin auth gate (Next.js 16 Proxy).
 * Cookie presence only — not a full session validation.
 * @param {import("next/server").NextRequest} request
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const isLoginPage = pathname === ADMIN_LOGIN_PATH;

  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    
    // const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    // const next = `${pathname}${request.nextUrl.search}`;

    // if (next && next !== ADMIN_LOGIN_PATH) {
    //   loginUrl.searchParams.set("next", next);
    // }

    // return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
