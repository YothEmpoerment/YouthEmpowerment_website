import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

// GET /api/yep-admin/forms/[id] - get single form with responses
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const form = await db.attendanceForm.findUnique({
    where: { id },
    include: { responses: { orderBy: { submittedAt: "asc" } } },
  });

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json(form);
}

// PATCH /api/yep-admin/forms/[id] - update form
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.eventDate !== undefined) updateData.eventDate = new Date(body.eventDate);
    if (body.isOpen !== undefined) updateData.isOpen = body.isOpen;
    if (body.questions !== undefined) updateData.questions = body.questions;
    if (body.socialLinks !== undefined) updateData.socialLinks = body.socialLinks;

    const form = await db.attendanceForm.update({ where: { id }, data: updateData });
    return NextResponse.json(form);
  } catch (error) {
    console.error("Update form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/yep-admin/forms/[id] - delete form and all responses
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await db.attendanceForm.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
