import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signToken, cookieName } from "@/lib/auth";
import { logAdminAction } from "@/lib/adminLogger";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password, adminName } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    if (!adminName || !adminName.trim()) {
      return NextResponse.json({ error: "Please enter your display name" }, { status: 400 });
    }

    const admin = await db.admin.findUnique({ where: { username } });
    if (!admin) {
      await logAdminAction({
        adminName: adminName.trim() || "unknown",
        action: "LOGIN_FAILED",
        details: `Failed login attempt for username: ${username}`,
        req,
      });
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      await logAdminAction({
        adminName: adminName.trim() || "unknown",
        action: "LOGIN_FAILED",
        details: `Wrong password for username: ${username}`,
        req,
      });
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const name = adminName.trim();
    const token = await signToken({ username: admin.username, adminName: name });

    await logAdminAction({
      adminName: name,
      action: "LOGIN",
      details: `Admin "${name}" logged in as ${username}`,
      req,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(cookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // No maxAge = session cookie: expires when browser is closed
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
