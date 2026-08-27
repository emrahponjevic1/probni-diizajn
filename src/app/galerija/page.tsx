import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import GalleryPageContent from "@/components/gallery/GalleryPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/galerija" },
  title: "Galerija · Vizualna Zgodba | Šeherezada Ljubljana",
  description:
    "Poglejte, kako nastajajo vaše najljubše jedi, sveže pečeno meso in domače dobrote v restavraciji Šeherezada v Ljubljani. Foto utrinki iz naše kuhinje in ambienta.",
};

export default function GalerijaPage() {
  return (
    <main>
      <SiteNavbar activeRoute="galerija" />
      <GalleryPageContent />
      <SiteFooter />
    </main>
  );
}
