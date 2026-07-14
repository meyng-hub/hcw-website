import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/session";
import { isEmailAllowed, signToken, verifyToken } from "@/lib/admin/token";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const payload = verifyToken(token, "login");

  // Re-check the allowlist at redemption time — a link must die if the
  // address was removed after it was requested.
  if (!payload || !isEmailAllowed(payload.email)) {
    return NextResponse.redirect(
      new URL("/admin?erreur=lien-invalide", req.nextUrl.origin),
    );
  }

  const res = NextResponse.redirect(
    new URL("/admin/tableau", req.nextUrl.origin),
  );
  res.cookies.set(SESSION_COOKIE, signToken(payload.email, "session"), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return res;
}
