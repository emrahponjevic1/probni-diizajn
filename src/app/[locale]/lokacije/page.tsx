import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LocationsOverviewContent from "@/components/locations/LocationsOverviewContent";

// ---------------------------------------------------------------------------
// PREGLED OBEH POSLOVALNIC
//
// Te strani prej ni bilo: /lokacije je vračal 404, čeprav je v navigaciji
// stal spustni seznam "Lokaciji". Zaradi tega so bile tudi drobtine na
// straneh lokalov skrajšane na dva člena — tretji bi vodil v 404.
//
// Poleg tega je namen "kje jesti v Ljubljani" imel na celem spletnem mestu
// NIČ pojavitev v vseh šestih jezikih. Ta stran ga pokrije, ne da bi si
// karkoli izmislili: naslovi, urnik in opisi lokalov so isti podatki, ki jih
// stran že prikazuje drugod.
//
// Vse odkrito v neodvisni reviziji (6D.3, nalaz G in L).
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/lokacije",
    naslovKljuc: "lokacijeNaslov",
    opisKljuc: "lokacijeOpis",
  });
}

export default function LokacijePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <Drobtine locale={locale} />
      <SiteNavbar activeRoute="kontakt" />
      <LocationsOverviewContent />
      <SiteFooter />
    </main>
  );
}

/** Drobtine bere Google in jih pokaže pod naslovom v zadetkih. */
async function Drobtine({ locale }: { locale: string }) {
  const tn = await getTranslations({ locale, namespace: "navigacija" });
  return (
    <BreadcrumbJsonLd
      items={[{ name: tn("domov"), path: "/" }, { name: tn("lokaciji") }]}
    />
  );
}
