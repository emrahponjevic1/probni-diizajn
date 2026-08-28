import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import StudentBoniPageContent from "@/components/student/StudentBoniPageContent";
import SiteFooter from "@/components/SiteFooter";
import { STUDENT_BON, MENU_STATS } from "@/components/menu/MenuData";

export const metadata: Metadata = {
  alternates: { canonical: "/studentski-boni" },
  title:
    "Študentski boni v Ljubljani — doplačilo 3,00 € | Šeherezada",
  description:
    `Študentski bon v Šeherezadi: doplačilo ${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} € za glavno jed, solato, jabolko in pijačo. ${MENU_STATS.student} jedi na bon, dve lokaciji v središču Ljubljane. Do kdaj bon velja in kako ga unovčiš.`,
};

export default function StudentskiBoniPage() {
  return (
    <main>
      <SiteNavbar activeRoute="studentski-boni" />
      <StudentBoniPageContent />
      <SiteFooter />
    </main>
  );
}
