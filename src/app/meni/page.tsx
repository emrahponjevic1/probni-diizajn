import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import MenuPageContent from "@/components/menu/MenuPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Meni · Ponudba & Cene | Šeherezada Ljubljana",
  description:
    "Odkrijte celotno ponudbo restavracije Šeherezada: pristni döner kebabi, hrustljavi falafli, sočni burgerji, bogati piščančji krožniki in sveže pečene pice. Študentski boni in vegi ponudba.",
};

export default function MeniPage() {
  return (
    <main>
      <SiteNavbar activeRoute="meni" />
      <MenuPageContent />
      <SiteFooter />
    </main>
  );
}
