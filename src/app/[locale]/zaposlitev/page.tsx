import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import CareersPageContent from "@/components/careers/CareersPageContent";
import SiteFooter from "@/components/SiteFooter";

// Opis namenoma ne obljublja odprtih mest — teh trenutno ni, seznam pa se
// spreminja. Besedilo drži tudi takrat, ko je kakšno mesto odprto.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/zaposlitev",
    naslovKljuc: "zaposlitevNaslov",
    opisKljuc: "zaposlitevOpis",
    ogOpisKljuc: "zaposlitevOgOpis",
  });
}

export default function ZaposlitevPage({
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
      <SiteNavbar activeRoute="zaposlitev" />
      <CareersPageContent />
      <SiteFooter />
    </main>
  );
}
