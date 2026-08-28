import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import NotFoundContent from "@/components/not-found/NotFoundContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Stran ne obstaja (404) | Šeherezada Ljubljana",
  description:
    "Iskana stran na spletnem mestu Šeherezada Ljubljana ne obstaja. Preverite naš meni z 29 jedmi ali poiščite najbližjo poslovalnico.",
};

export default function NotFound() {
  return (
    <main>
      <SiteNavbar />
      <NotFoundContent />
      <SiteFooter />
    </main>
  );
}
