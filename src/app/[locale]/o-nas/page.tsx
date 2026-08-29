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

  // Google keywords ignorira od leta 2009. Ostajajo, ker jih nismo
  // odstranili z odločitvijo lastnika — glej PREDAJA, razdelek 7.
  const keywords = [
    "Šeherezada Ljubljana",
    "O nas Šeherezada",
    "kebab tradicija Ljubljana",
    "sveže pečene lepinje Ljubljana",
    "halal restavracija Ljubljana",
    "Trubarjeva kebab",
    "Slovenska orientalska hrana",
  ];

  const meta = await metaZaStran({
    locale,
    pot: "/o-nas",
    naslovKljuc: "oNasNaslov",
    opisKljuc: "oNasOpis",
    ogOpisKljuc: "oNasOgOpis",
  });

  return { ...meta, keywords };
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
