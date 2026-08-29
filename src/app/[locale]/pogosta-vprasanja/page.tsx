import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import { STUDENT_BON } from "@/components/menu/MenuData";
import SiteNavbar from "@/components/SiteNavbar";
import FaqPageContent from "@/components/faq/FaqPageContent";
import { useFaqSections } from "@/components/faq/faqSections";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/pogosta-vprasanja",
    naslovKljuc: "faqNaslov",
    opisKljuc: "faqOpis",
    vrednosti: { doplacilo: `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €` },
  });
}

export default function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Brez te vrstice se stran ne zgradi vnaprej, ampak ob vsakem obisku.
  // use() namesto await, da komponenta ostane sinhrona in sme uporabljati hooke.
  const { locale } = use(params);
  setRequestLocale(locale);

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
