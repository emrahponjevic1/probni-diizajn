import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import FaqPageContent from "@/components/faq/FaqPageContent";
import { useFaqSections } from "@/components/faq/faqSections";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/pogosta-vprasanja" },
  title: "Pogosta vprašanja — halal, boni, delovni čas | Šeherezada",
  description:
    "Odgovori o halal certifikatu, študentskih bonih z doplačilom 3,00 €, veganski ponudbi in delovnem času obeh lokacij v Ljubljani.",
};

export default function FaqPage() {
  // Isti seznam, ki ga prikaže harmonika — schema in stran se ne moreta razhajati.
  const sklopi = useFaqSections();

  return (
    <main>
      {/* Vsa vprašanja iz vseh treh sklopov, v istem vrstnem redu kot na strani. */}
      <FaqJsonLd
        items={sklopi.flatMap((sekcija) =>
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
