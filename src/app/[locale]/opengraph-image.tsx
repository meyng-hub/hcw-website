import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "HCW — L'éducation est une liberté";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The "Le H-Porte" mark, reversed (cream pillars + amber doorway) for the teal ground.
const MARK =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<rect x="13" y="12" width="8.5" height="40" rx="3" fill="#fdf8f0"/>' +
  '<rect x="42.5" y="12" width="8.5" height="40" rx="3" fill="#fdf8f0"/>' +
  '<path d="M21.5 52 V28 a10.5 10.5 0 0 1 21 0 V52" fill="none" stroke="#f5a623" stroke-width="6" stroke-linejoin="round"/>' +
  "</svg>";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline =
    locale === "fr" ? "L'éducation est une liberté" : "Education is Freedom";
  const sub =
    locale === "fr"
      ? "Depuis 2009 · Éducation en Afrique centrale"
      : "Since 2009 · Education in Central Africa";
  const markSrc = `data:image/svg+xml,${encodeURIComponent(MARK)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d6e6e",
          color: "#fdf8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markSrc}
            width={116}
            height={116}
            style={{ marginRight: 28 }}
            alt=""
          />
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: 4 }}>
            HCW
          </div>
        </div>
        <div style={{ fontSize: 52, marginTop: 40, color: "#ffffff" }}>
          {tagline}
        </div>
        <div style={{ fontSize: 28, marginTop: 22, color: "#ccefef" }}>
          {sub}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            background: "#f5a623",
            borderRadius: 3,
            marginTop: 44,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
