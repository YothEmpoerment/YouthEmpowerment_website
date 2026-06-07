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
