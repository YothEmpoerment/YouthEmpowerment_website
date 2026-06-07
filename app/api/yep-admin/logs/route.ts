import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const logs = await db.adminLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 250, // Get last 250 logs
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Get admin logs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { logIds, password } = await req.json();
    if (!Array.isArray(logIds) || logIds.length === 0) {
      return NextResponse.json({ error: "No logs selected" }, { status: 400 });
    }

    const correctPassword = process.env.LOG_DELETE_PASSWORD || "yep-log-delete-secure-override-2026";
    if (password !== correctPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 403 });
    }

    await db.adminLog.deleteMany({
      where: {
        id: { in: logIds }
      }
    });

    // Log this deletion itself as an administrative audit log
    const { logAdminAction } = await import("@/lib/adminLogger");
    await logAdminAction({
      adminName: session.adminName || session.username,
      action: "LOGS_DELETED",
      details: `Deleted ${logIds.length} activity logs`,
      req
    });

    return NextResponse.json({ success: true, count: logIds.length });
  } catch (error) {
    console.error("Delete admin logs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
