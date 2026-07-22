import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";

import { GtmNoScript, GtmScript } from "@/components/analytics/Gtm";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-wr-body", display: "swap" });
const displayFont = Syne({ subsets: ["latin"], variable: "--font-wr-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Skateboarding Classes in Hyderabad`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "BMX, skateboarding and a rider-built park for first tries, bigger lines and the community in between.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/wallride/logo.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <GtmScript />
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
