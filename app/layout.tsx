import type { Metadata } from "next";
import { Bebas_Neue, Hanken_Grotesk, Space_Mono } from "next/font/google";

import { GtmNoScript, GtmScript } from "@/components/analytics/Gtm";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Skateboarding for Kids · Hyderabad`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Skateboarding classes for kids in Hyderabad. Helmets + pads provided, small groups, coached by Hari since 2019.",
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
      className={`${bebas.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen overflow-x-clip bg-surface text-on-surface antialiased">
        <GtmScript />
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
