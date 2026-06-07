import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { logAdminAction } from "@/lib/adminLogger";

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
  const random = Math.random().toString(36).slice(2, 7);
  return `${base}-${random}`;
}

// GET /api/yep-admin/forms - list all forms
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const forms = await db.attendanceForm.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { responses: true } } },
  });

  return NextResponse.json(forms);
}

// POST /api/yep-admin/forms - create a new form
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, eventDate, questions, socialLinks } = await req.json();

    if (!title || !eventDate) {
      return NextResponse.json({ error: "Title and event date are required" }, { status: 400 });
    }

    const slug = generateSlug(title);
    const form = await db.attendanceForm.create({
      data: {
        title,
        description: description || null,
        eventDate: new Date(eventDate),
        slug,
        isOpen: true,
        questions: questions || null,
        socialLinks: socialLinks || null,
      },
    });

    await logAdminAction({
      adminName: session.adminName || session.username,
      action: "FORM_CREATED",
      details: `Created form "${title}" (slug: ${slug})`,
      req,
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("Create form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
