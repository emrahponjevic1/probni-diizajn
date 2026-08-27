import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import PiskotkiPageContent from "@/components/legal/PiskotkiPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/piskotki" },
  title: "Politika piškotkov | Šeherezada Ljubljana",
  description:
    "Informacije o uporabi piškotkov na spletnem mestu Šeherezada Ljubljana v skladu z ZEKom-2 in GDPR. Vrste piškotkov in možnosti upravljanja.",
};

export default function PiskotkiPage() {
  return (
    <main>
      <SiteNavbar />
      <PiskotkiPageContent />
      <SiteFooter />
    </main>
  );
}
