import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import FaqPageContent from "@/components/faq/FaqPageContent";
import { FAQ_SECTIONS } from "@/components/faq/faqSections";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Pogosta vprašanja — halal, boni, delovni čas | Šeherezada",
  description:
    "Odgovori o halal certifikatu, študentskih bonih z doplačilom 3,00 €, veganski ponudbi in delovnem času obeh lokacij v Ljubljani.",
};

export default function FaqPage() {
  return (
    <main>
      {/* Vsa vprašanja iz vseh treh sklopov, v istem vrstnem redu kot na strani. */}
      <FaqJsonLd
        items={FAQ_SECTIONS.flatMap((sekcija) =>
          sekcija.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))
        )}
      />
      <SiteNavbar activeRoute="pogosta-vprasanja" />
      <FaqPageContent />
      <SiteFooter />
    </main>
  );
}
