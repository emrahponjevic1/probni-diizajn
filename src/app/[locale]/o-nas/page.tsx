import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import AboutPageContent from "@/components/about/AboutPageContent";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;


  const meta = await metaZaStran({
    locale,
    pot: "/o-nas",
    naslovKljuc: "oNasNaslov",
    opisKljuc: "oNasOpis",
    ogOpisKljuc: "oNasOgOpis",
  });

  return meta;
}

export default function ONasPage({
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
      <SiteNavbar activeRoute="o-nas" />
      <AboutPageContent />
      <SiteFooter />
    </main>
  );
}
