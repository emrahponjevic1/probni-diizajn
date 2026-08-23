import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
  title: "Šeherezada | Kebab · Pizza · Falafel",
  description:
    "Doživi avtentične turške okuse, sočno meso pečeno na pravem ognju in domač kruh, pripravljen po tajnem receptu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
}
