import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, cookieName } from "@/lib/auth";
import { logAdminAction } from "@/lib/adminLogger";

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (session) {
    await logAdminAction({
      adminName: session.adminName || session.username,
      action: "LOGOUT",
      details: `Admin "${session.adminName}" logged out`,
      req,
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(cookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
