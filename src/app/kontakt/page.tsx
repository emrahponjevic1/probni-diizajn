import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import ContactPageContent from "@/components/contact/ContactPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kontakt — dve lokaciji v središču Ljubljane | Šeherezada",
  description:
    "Šeherezada na Trubarjevi 31 in Slovenski 55 v Ljubljani. Telefon +386 69 314 316, navodila za prihod ter obrazec za catering in rezervacije.",
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
      "Dve lokaciji v Ljubljani — Trubarjeva 31 in Slovenska 55. Telefon, navodila za prihod in obrazec za povpraševanja.",
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
