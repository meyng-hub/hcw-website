import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdminLocaleProvider } from "@/lib/admin/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Administration — HCW",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-cream-50 font-sans text-charcoal-900 antialiased">
        <AdminLocaleProvider>{children}</AdminLocaleProvider>
      </body>
    </html>
  );
}
