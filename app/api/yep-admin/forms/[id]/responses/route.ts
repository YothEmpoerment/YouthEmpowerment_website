import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

// DELETE /api/yep-admin/forms/[id]/responses - reset (delete all responses) for a form
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const deleted = await db.attendanceResponse.deleteMany({ where: { formId: id } });
    return NextResponse.json({ deleted: deleted.count });
  } catch (error) {
    console.error("Reset responses error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
