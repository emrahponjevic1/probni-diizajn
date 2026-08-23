import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import ContactPageContent from "@/components/contact/ContactPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kontakt & Lokacije · Trubarjeva & Slovenska | Šeherezada Ljubljana",
  description:
    "Obiščite Šeherezado na Trubarjevi 31 ali Slovenski cesti 55. Pokličite nas za hitra naročila na +386 (01) 430 52 40 ali pošljite povpraševanje za catering in rezervacije.",
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
    title: "Kontakt & Lokacije · Trubarjeva & Slovenska | Šeherezada Ljubljana",
    description:
      "Dve lokaciji v Ljubljani (Trubarjeva 31 & Slovenska 55). Hitri klici, catering in interaktivni zemljevid.",
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
