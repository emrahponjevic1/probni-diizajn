import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import AboutPageContent from "@/components/about/AboutPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "O nas — halal kebab v Ljubljani od leta 1998 | Šeherezada",
  description:
    "Halal restavracija v središču Ljubljane od leta 1998. Sveže pečene lepinje, žar na ognju in dve lokaciji — Trubarjeva 31 in Slovenska 55.",
  keywords: [
    "Šeherezada Ljubljana",
    "O nas Šeherezada",
    "kebab tradicija Ljubljana",
    "sveže pečene lepinje Ljubljana",
    "halal restavracija Ljubljana",
    "Trubarjeva kebab",
    "Slovenska orientalska hrana",
  ],
  openGraph: {
    title: "O nas — halal kebab v Ljubljani od leta 1998 | Šeherezada",
    description:
      "Od leta 1998 pristna kulinarična dediščina, pravi ogenj in domač kruh v Ljubljani.",
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
