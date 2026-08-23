import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import FaqPageContent from "@/components/faq/FaqPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Pogosta Vprašanja (FAQ) | Šeherezada Ljubljana",
  description:
    "Vse, kar morate vedeti o naši hrani, 100% Halal certifikatu, študentskih bonih z doplačilom 3,00 € ter naročanju za osebni prevzem v restavraciji Šeherezada.",
};

export default function FaqPage() {
  return (
    <main>
      <SiteNavbar activeRoute="faq" />
      <FaqPageContent />
      <SiteFooter />
    </main>
  );
}
