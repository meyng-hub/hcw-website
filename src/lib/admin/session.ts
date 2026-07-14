import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, type AdminTokenPayload } from "./token";

export const SESSION_COOKIE = "hcw_admin";

/** Server-component helper: current admin session or null. */
export async function getAdminSession(): Promise<AdminTokenPayload | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyToken(raw, "session");
}

/** API-route helper: session payload, or a ready 401 response. */
export function requireAdmin(
  req: NextRequest,
): { session: AdminTokenPayload } | { failure: NextResponse } {
  const raw = req.cookies.get(SESSION_COOKIE)?.value;
  const session = raw ? verifyToken(raw, "session") : null;
  if (!session) {
    return {
      failure: NextResponse.json({ error: "Non autorisé" }, { status: 401 }),
    };
  }
  return { session };
}
