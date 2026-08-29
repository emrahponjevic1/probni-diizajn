import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import { MENU_STATS } from "@/components/menu/MenuData";
import SiteNavbar from "@/components/SiteNavbar";
import MenuPageContent from "@/components/menu/MenuPageContent";
import MenuJsonLd from "@/components/seo/MenuJsonLd";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/meni",
    naslovKljuc: "meniNaslov",
    opisKljuc: "meniOpis",
    vrednosti: { vseh: MENU_STATS.total, naBon: MENU_STATS.student, vegan: MENU_STATS.vegan },
  });
}

export default function MeniPage({
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
      {/* Jedi in cene so prebrane iz MenuData.ts — istega vira kot stran. */}
      <MenuJsonLd />
      <SiteNavbar activeRoute="meni" />
      <MenuPageContent />
      <SiteFooter />
    </main>
  );
}
