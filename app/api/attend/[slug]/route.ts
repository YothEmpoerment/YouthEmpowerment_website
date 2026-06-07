import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/attend/[slug] - get public form info
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const form = await db.attendanceForm.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      eventDate: true,
      isOpen: true,
      _count: { select: { responses: true } },
    },
  });

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json(form);
}

// POST /api/attend/[slug] - submit attendance
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const form = await db.attendanceForm.findUnique({
      where: { slug },
      select: { id: true, isOpen: true },
    });

    if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    if (!form.isOpen) return NextResponse.json({ error: "This form is closed" }, { status: 403 });

    const { name, email, phone } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check for duplicate
    const existing = await db.attendanceResponse.findUnique({
      where: { formId_email: { formId: form.id, email } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already submitted attendance with this email" },
        { status: 409 }
      );
    }

    const response = await db.attendanceResponse.create({
      data: { formId: form.id, name, email, phone: phone || null },
    });

    return NextResponse.json({ success: true, id: response.id }, { status: 201 });
  } catch (error) {
    console.error("Submit attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
