import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import StudentBoniPageContent from "@/components/student/StudentBoniPageContent";
import SiteFooter from "@/components/SiteFooter";
import { STUDENT_BON, MENU_STATS } from "@/components/menu/MenuData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaZaStran({
    locale,
    pot: "/studentski-boni",
    naslovKljuc: "boniNaslov",
    opisKljuc: "boniOpis",
    vrednosti: {
      doplacilo: `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`,
      naBon: MENU_STATS.student,
    },
  });
}

export default function StudentskiBoniPage({
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
      <SiteNavbar activeRoute="studentski-boni" />
      <StudentBoniPageContent />
      <SiteFooter />
    </main>
  );
}
