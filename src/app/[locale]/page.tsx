import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import { STUDENT_BON } from "@/components/menu/MenuData";
import SiteNavbar from "@/components/SiteNavbar";
import SeherezadaHero from "@/components/SeherezadaHero";
import PopularPicks from "@/components/PopularPicks";
import OurStory from "@/components/OurStory";
import HalalCertificate from "@/components/HalalCertificate";
import StudentVouchers from "@/components/StudentVouchers";
import CustomerReviews from "@/components/CustomerReviews";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";

/**
 * Naslovnica ima svoj kanonični naslov: /de kaže nase, ne na slovenski koren.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/",
    naslovKljuc: "naslovnicaNaslov",
    opisKljuc: "naslovnicaOpis",
    vrednosti: {
      doplacilo: `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`,
    },
  });
}

export default function Home({
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
      <SiteNavbar activeRoute="home" />
      <SeherezadaHero />
      <PopularPicks />
      <OurStory />
      <HalalCertificate />
      <StudentVouchers />
      <CustomerReviews />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
