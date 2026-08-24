import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import FaqPageContent from "@/components/faq/FaqPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Pogosta vprašanja — halal, boni, delovni čas | Šeherezada",
  description:
    "Odgovori o halal certifikatu, študentskih bonih z doplačilom 3,00 €, veganski ponudbi in delovnem času obeh lokacij v Ljubljani.",
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
