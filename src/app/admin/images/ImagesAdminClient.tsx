"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminT } from "@/lib/admin/i18n";
import AdminHeader from "../AdminHeader";

interface AdminImage {
  name: string;
  path: string;
  size: number;
}

const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function ImagesAdminClient({ email }: { email: string }) {
  const { t } = useAdminT();
  const [images, setImages] = useState<AdminImage[] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "uploading" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/images")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const json = (await res.json()) as { images: AdminImage[] };
        setImages(json.images);
        setState("ready");
      })
      .catch(() => setState("error"));
  };
  useEffect(load, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErrorMsg("");
    setUploadedPath(null);
    if (!ALLOWED.includes(file.type)) {
      setErrorMsg(t("images_bad_type"));
      return;
    }
    if (file.size > MAX_BYTES) {
      setErrorMsg(t("images_too_big"));
      return;
    }

    setState("uploading");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/images", { method: "POST", body: form });
      const json = (await res.json()) as { ok?: boolean; path?: string; error?: string };
      if (!res.ok || !json.path) throw new Error(json.error);
      setUploadedPath(json.path);
      setState("ready");
      load();
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : t("error_generic"));
      setState("ready");
    }
  };

  const copy = async (path: string) => {
    await navigator.clipboard?.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <AdminHeader email={email} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/admin/tableau" className="text-sm text-teal-600 hover:underline">
          ← {t("back")}
        </Link>
        <h1 className="mt-2 font-serif text-2xl font-bold">{t("images_title")}</h1>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-teal-100">
          <label className="inline-block cursor-pointer rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700">
            {state === "uploading" ? t("images_uploading") : t("images_upload")}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={upload}
              disabled={state === "uploading"}
              className="hidden"
            />
          </label>
          <p className="mt-3 text-xs text-gray-400">{t("images_hint")}</p>
          {uploadedPath && (
            <p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
              {t("saved_ok")} — <code className="font-mono">{uploadedPath}</code>
            </p>
          )}
          {errorMsg && (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {errorMsg}
            </p>
          )}
        </div>

        {state === "loading" && <p className="mt-8 text-gray-500">{t("loading")}</p>}
        {state === "error" && (
          <p className="mt-8 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {t("error_generic")}
          </p>
        )}

        {images && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.name}
                className="overflow-hidden rounded-xl bg-white ring-1 ring-gray-100"
              >
                {/* Plain <img>: served from the live site once deployed */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.path}
                  alt={img.name}
                  className="h-28 w-full bg-gray-50 object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="truncate text-xs text-gray-500" title={img.name}>
                    {img.name}
                  </p>
                  <button
                    onClick={() => copy(img.path)}
                    className="mt-2 w-full rounded-lg bg-teal-50 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-100"
                  >
                    {copied === img.path ? t("images_copied") : t("images_copy")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
