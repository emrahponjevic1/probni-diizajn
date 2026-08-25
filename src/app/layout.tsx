import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import CookieBanner from "@/components/legal/CookieBanner";
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
  title: "Šeherezada – halal kebab, pizza in falafel v Ljubljani",
  description:
    "Halal kebab, jufka, falafel in pizza v središču Ljubljane. Dve lokaciji — Trubarjeva 31 in Slovenska 55. Študentski boni z doplačilom 3,00 €.",
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
        <CookieBanner />
      </body>
    </html>
  );
}
