import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export interface LogActionParams {
  adminName: string;
  action: string;
  details?: string;
  req?: NextRequest;
}

export async function logAdminAction({ adminName, action, details, req }: LogActionParams) {
  try {
    const ip = req
      ? (req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
         req.headers.get("x-real-ip") ||
         "unknown")
      : "unknown";

    const userAgent = req ? (req.headers.get("user-agent") || "unknown") : "unknown";

    await db.adminLog.create({
      data: { adminName, action, details: details || null, ip, userAgent },
    });
  } catch (err) {
    // Never let logging break the main flow
    console.error("Failed to write admin log:", err);
  }
}
