import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import ZasebnostPageContent from "@/components/legal/ZasebnostPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Politika zasebnosti | Šeherezada Ljubljana",
  description:
    "Politika varstva osebnih podatkov in zasebnosti v restavraciji Šeherezada Ljubljana skladno z GDPR in ZVOP-2. Transparentnost, pravice posameznikov in varnost.",
};

export default function PolitikaZasebnostiPage() {
  return (
    <main>
      <SiteNavbar />
      <ZasebnostPageContent />
      <SiteFooter />
    </main>
  );
}
