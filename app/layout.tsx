import type { Metadata } from "next";
import { JetBrains_Mono, Permanent_Marker, Space_Mono } from "next/font/google";

import { GtmNoScript, GtmScript } from "@/components/analytics/Gtm";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Skateboarding Coaching · Hyderabad`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Skateboarding classes, hourly bowl practice, and gear for kids and adults in Hyderabad. Coached by Hari.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/logo.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${spaceMono.variable} ${permanentMarker.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        <GtmScript />
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
