import type { Metadata } from "next";
import { PHONE } from "@/data/locations";
import SiteNavbar from "@/components/SiteNavbar";
import ContactPageContent from "@/components/contact/ContactPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/kontakt" },
  title: "Kontakt — dve lokaciji v središču Ljubljane | Šeherezada",
  description:
    `Šeherezada na Trubarjevi 31 in Slovenski 55 v Ljubljani. Telefon ${PHONE.restaurant.display}, e-pošta in obrazec za povpraševanja, catering in rezervacije.`,
  keywords: [
    "Kontakt Šeherezada",
    "Šeherezada Trubarjeva delovni čas",
    "Šeherezada Slovenska telefon",
    "kebab Ljubljana kontakt",
    "catering kebab Ljubljana",
    "nočna hrana Ljubljana Trubarjeva",
    "halal hrana Ljubljana naročila",
  ],
  openGraph: {
    title: "Kontakt — dve lokaciji v središču Ljubljane | Šeherezada",
    description:
      "Dve lokaciji v Ljubljani — Trubarjeva 31 in Slovenska 55. Telefon, e-pošta in obrazec za povpraševanja.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function KontaktPage() {
  return (
    <main>
      <SiteNavbar activeRoute="kontakt" />
      <ContactPageContent />
      <SiteFooter />
    </main>
  );
}
