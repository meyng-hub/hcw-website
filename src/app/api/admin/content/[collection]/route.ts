import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/session";
import { getJsonFile, putJsonFile } from "@/lib/admin/github";
import { campaignSchema, newsArticleSchema } from "@/lib/content/schemas";

/**
 * Read/write content collections. Every PUT is Zod-validated with the
 * same schemas the site's loaders use, then committed to main — an
 * editor cannot produce a payload the build won't accept.
 */

const COLLECTIONS: Record<string, { path: string; schema: z.ZodTypeAny }> = {
  news: { path: "content/news.json", schema: z.array(newsArticleSchema) },
  campaign: { path: "content/campaign.json", schema: campaignSchema },
};

type Params = { params: Promise<{ collection: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if ("failure" in auth) return auth.failure;

  const { collection } = await params;
  const def = COLLECTIONS[collection];
  if (!def) {
    return NextResponse.json({ error: "Collection inconnue" }, { status: 404 });
  }

  try {
    const { data, sha } = await getJsonFile(def.path);
    return NextResponse.json({ data, sha });
  } catch (e) {
    console.error(`Admin content GET ${collection}:`, e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Lecture impossible — réessayez." },
      { status: 502 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if ("failure" in auth) return auth.failure;

  const { collection } = await params;
  const def = COLLECTIONS[collection];
  if (!def) {
    return NextResponse.json({ error: "Collection inconnue" }, { status: 404 });
  }

  let body: { data?: unknown; sha?: unknown };
  try {
    body = (await req.json()) as { data?: unknown; sha?: unknown };
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = def.schema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Contenu invalide",
        details: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  try {
    await putJsonFile(
      def.path,
      parsed.data,
      `admin: update ${collection} (${auth.session.email})`,
      typeof body.sha === "string" ? body.sha : undefined,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(`Admin content PUT ${collection}:`, e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Publication impossible — réessayez." },
      { status: 502 },
    );
  }
}
