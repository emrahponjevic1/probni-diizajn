import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import AboutPageContent from "@/components/about/AboutPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "O nas · Naša Zgodba & Tradicija Žara | Šeherezada Ljubljana",
  description:
    "Več kot 25 let pristne orientalske kulinarične tradicije v Ljubljani. 24-urna marinada mesa, ročno zamešene lepinje iz krušne peči, 100% Halal certifikat ter dve lokaciji na Trubarjevi 31 in Slovenski 55.",
  keywords: [
    "Šeherezada Ljubljana",
    "O nas Šeherezada",
    "kebab tradicija Ljubljana",
    "peka lepinj krušna peč",
    "halal restavracija Ljubljana",
    "Trubarjeva kebab",
    "Slovenska orientalska hrana",
  ],
  openGraph: {
    title: "O nas · Naša Zgodba & Tradicija Žara | Šeherezada Ljubljana",
    description:
      "Več kot 25 let pristne kulinarične dediščine, pravega ognja in domačega kruha v Ljubljani.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function ONasPage() {
  return (
    <main>
      <SiteNavbar activeRoute="o-nas" />
      <AboutPageContent />
      <SiteFooter />
    </main>
  );
}
