import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin", req.nextUrl.origin), 303);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
