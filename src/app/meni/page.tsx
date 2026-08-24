import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import MenuPageContent from "@/components/menu/MenuPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Meni · Ponudba & Cene | Šeherezada Ljubljana",
  description:
    "29 jedi v središču Ljubljane: kebab, jufka, falafel, burgerji in pizze, pečene po naročilu. 19 jedi na študentski bon, 7 veganskih. Cene od 1,00 €.",
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
