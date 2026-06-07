import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "yep-super-secret-key-change-in-production"
);
const COOKIE_NAME = "yep_admin_token";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /yep-admin routes except /yep-admin/login
  if (pathname.startsWith("/yep-admin") && !pathname.startsWith("/yep-admin/login")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/yep-admin/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/yep-admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/yep-admin/:path*"],
};
