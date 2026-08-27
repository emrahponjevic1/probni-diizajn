import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieBanner from "@/components/legal/CookieBanner";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { IS_LIVE, SITE_NAME, SITE_URL } from "@/data/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
   * ⚠ Dokler stran ni na pravi domeni, je indeksiranje izklopljeno.
   *
   * robots.txt prepove branje, a to samo po sebi ne prepreči, da bi bil
   * naslov naveden — če nanj kaže povezava od drugod. Ta oznaka je dokončna
   * in Google je ne obide.
   *
   * Vklopi se z NEXT_PUBLIC_SITE_LIVE=true na Vercelu. Po objavi na pravi
   * domeni PREVERI, da noindex v izvorni kodi strani NI več — sicer strani
   * ne bo v iskalniku in tega nihče ne opazi mesece.
   */
  robots: IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },

  openGraph: {
    type: "website",
    locale: "sl_SI",
    siteName: SITE_NAME,
    url: SITE_URL,
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
        <SpeedInsights />
      </body>
    </html>
  );
}
