import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import MenuPageContent from "@/components/menu/MenuPageContent";
import MenuJsonLd from "@/components/seo/MenuJsonLd";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/meni" },
  title: "Meni · Ponudba & Cene | Šeherezada Ljubljana",
  description:
    "29 jedi v središču Ljubljane: kebab, jufka, falafel, burgerji in pizze, pečene po naročilu. 19 jedi na študentski bon, 7 veganskih. Cene od 1,00 €.",
};

export default function MeniPage() {
  return (
    <main>
      {/* Jedi in cene so prebrane iz MenuData.ts — istega vira kot stran. */}
      <MenuJsonLd />
      <SiteNavbar activeRoute="meni" />
      <MenuPageContent />
      <SiteFooter />
    </main>
  );
}
