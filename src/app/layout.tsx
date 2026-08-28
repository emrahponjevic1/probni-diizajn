import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import CookieBanner from "@/components/legal/CookieBanner";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { BRAND_COLOR, SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/data/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Barva vrstice brskalnika na telefonu — na Androidu se obarva okoli strani.
  themeColor: BRAND_COLOR,
};

export const metadata: Metadata = {
  /**
   * Brez tega Next ne zna sestaviti celega naslova iz poti, zato kanonični
   * naslovi in Open Graph ostanejo nedokončani. To je temelj vsega spodaj.
   */
  metadataBase: new URL(SITE_URL),
  title: "Šeherezada – halal kebab, pizza in falafel v Ljubljani",
  description:
    "Halal kebab, jufka, falafel in pizza v središču Ljubljane. Dve lokaciji — Trubarjeva 31 in Slovenska 55. Študentski boni z doplačilom 3,00 €.",
  alternates: { canonical: "/" },

  /**
   * IKONE
   *
   * Datoteke so izvožene iz logotipa in ležijo v public/. Google za ikono ob
   * zadetku zahteva kvadrat, ki je večkratnik 48 px — to pokriva
   * android-chrome-192x192.png. favicon.ico vsebuje 16, 32 in 48 px za
   * brskalnike, ki gledajo samo v koren.
   */
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",


  openGraph: {
    type: "website",
    locale: "sl_SI",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: SHARE_IMAGE.src,
        width: SHARE_IMAGE.width,
        height: SHARE_IMAGE.height,
        alt: "Šeherezada — halal kebab, falafel in humus v Ljubljani",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className={plusJakartaSans.variable}>
      <body>
        {children}
        {/* Pasica se pokaže samo, dokler gost ni izbral. Skripte za analitiko
            se sme naložiti šele, ko privolitev to dovoli — glej src/lib/consent.ts */}
        <OrganizationJsonLd />
        <CookieBanner />
      </body>
    </html>
  );
}
