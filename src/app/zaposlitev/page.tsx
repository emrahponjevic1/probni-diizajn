import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import CareersPageContent from "@/components/careers/CareersPageContent";
import SiteFooter from "@/components/SiteFooter";
import { JOBS_DATA } from "@/components/careers/CareersData";

export const metadata: Metadata = {
  title: "Kariera & Zaposlitev | Šeherezada Ljubljana",
  description:
    "Pridruži se ekipi Šeherezada v centru Ljubljane! Odprta delovna mesta za žar mojstre, peko lepinj in študentsko delo. Prijavi se preko spleta.",
  openGraph: {
    title: "Kariera & Zaposlitev — Šeherezada Ljubljana",
    description:
      "Odprte pozicije za žar mojstre, pica mojstre in študente. Prijavi se preko spleta!",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Šeherezada Kariera & Zaposlitev",
      },
    ],
  },
};

export default function ZaposlitevPage() {
  return (
    <main>
      <SiteNavbar activeRoute="zaposlitev" />
      <CareersPageContent />
      <SiteFooter />
    </main>
  );
}
