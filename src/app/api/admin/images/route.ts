import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session";
import { listDir, putFile } from "@/lib/admin/github";

const IMAGES_DIR = "public/images";
const MAX_BYTES = 3 * 1024 * 1024; // Vercel request-body limit is ~4.5 MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("failure" in auth) return auth.failure;

  try {
    const entries = await listDir(IMAGES_DIR);
    return NextResponse.json({
      images: entries.map((e) => ({
        name: e.name,
        path: `/images/${e.name}`,
        size: e.size,
      })),
    });
  } catch (e) {
    console.error("Admin images GET:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Lecture impossible — réessayez." },
      { status: 502 },
    );
  }
}

function slugifyBaseName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("failure" in auth) return auth.failure;

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Format non pris en charge (JPG, PNG ou WebP)" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (3 Mo maximum)" },
      { status: 400 },
    );
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const name = `${slugifyBaseName(file.name)}-${stamp}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await putFile(
      `${IMAGES_DIR}/${name}`,
      buffer.toString("base64"),
      `admin: upload image ${name} (${auth.session.email})`,
    );
    return NextResponse.json({ ok: true, path: `/images/${name}` });
  } catch (e) {
    console.error("Admin images POST:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Téléversement impossible — réessayez." },
      { status: 502 },
    );
  }
}
