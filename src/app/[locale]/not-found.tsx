import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import NotFoundContent from "@/components/not-found/NotFoundContent";
import SiteFooter from "@/components/SiteFooter";

// ---------------------------------------------------------------------------
// STRAN 404
//
// Telo strani (navigacija, besedilo, noga) se PREVEDE pravilno — gost na
// /en/karkoli vidi angleško stran, na /tr/karkoli turško. Preverjeno v
// brskalniku.
//
// Naslov strani pa NE more biti preveden, in to ni naša odločitev:
// not-found.tsx v Nextu ne dobi parametra poti (torej ne ve, kateri jezik je),
// in nima generateMetadata, ampak samo ta nespremenljivi zapis. Zato tu ne sme
// stati slovensko besedilo — na angleški strani bi bila laž. Napis "404" je
// enak v vseh šestih jezikih, zato je edini pošten.
//
// Iz istega razloga tu ni opisa: opis brez jezika ne pove ničesar, Google pa
// strani s stanjem 404 tako ali tako ne uvrsti v zadetke.
//
// Prej je tu stalo "Stran ne obstaja (404) | Šeherezada Ljubljana" in opis s
// številom 29, prepisanim na roko — oboje samo v slovenščini. Odkrito v 5E.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "404 | Šeherezada",
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
