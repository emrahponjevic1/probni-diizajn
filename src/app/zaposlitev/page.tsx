import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import CareersPageContent from "@/components/careers/CareersPageContent";
import SiteFooter from "@/components/SiteFooter";

// Opis namenoma ne obljublja odprtih mest — teh trenutno ni, seznam pa se
// spreminja. Besedilo drži tudi takrat, ko je kakšno mesto odprto.
export const metadata: Metadata = {
  title: "Zaposlitev in delo v Ljubljani | Šeherezada",
  description:
    "Delo v Šeherezadi, restavraciji v središču Ljubljane. Oglej si trenutne priložnosti ali nam pošlji svojo ponudbo — dve lokaciji, Trubarjeva 31 in Slovenska 55.",
  openGraph: {
    title: "Zaposlitev in delo v Ljubljani | Šeherezada",
    description:
      "Delo v Šeherezadi, restavraciji v središču Ljubljane. Oglej si trenutne priložnosti ali nam pošlji svojo ponudbo.",
    type: "website",
    locale: "sl_SI",
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
