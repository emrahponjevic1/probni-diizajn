import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import HalalPageContent from "@/components/halal/HalalPageContent";
import { HALAL_FAQS } from "@/components/halal/halalFaqs";
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
    pot: "/halal",
    naslovKljuc: "halalNaslov",
    opisKljuc: "halalOpis",
  });
}

export default function HalalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Brez te vrstice se stran ne zgradi vnaprej, ampak ob vsakem obisku.
  // use() namesto await, da komponenta ostane sinhrona in sme uporabljati hooke.
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      {/* Vprašanja so vidna na strani — schema samo ponovi, kar gost že bere. */}
      <FaqJsonLd items={HALAL_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      <SiteNavbar activeRoute="halal" />
      <HalalPageContent />
      <SiteFooter />
    </main>
  );
}
