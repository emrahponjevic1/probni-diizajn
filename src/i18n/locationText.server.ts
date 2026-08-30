import { getTranslations } from "next-intl/server";
import { prevediZ } from "./locationText";
import type { Vzemi } from "./locationText";
import type { LocationCore } from "@/data/locations";

// ---------------------------------------------------------------------------
// PREVOD BESEDIL O POSLOVALNICAH — STREŽNIŠKA RAZLIČICA
//
// Ista preslikava ključev kot v locationText.ts, samo drugačna kljuka:
// generateMetadata teče na strežniku in tam useTranslations ni na voljo.
//
// Zakaj sploh obstaja: meta oznake strani lokala so brale naravnost iz
// locations.ts in prevajalski sloj obšle. Na petih tujih jezikih je zato
// og:title, og:description in twitter:* ostal SLOVENSKI, opis za Google pa
// je imel sredi prevedene povedi slovenski kos:
//
//   /de/standorte/…  "Geöffnet 09:00 – 02:00, pet in sob do 03:00."
//   /it/sedi/…       "Aperto 09:00 – 02:00, pet in sob do 03:00."
//
// Prevodi so ves čas obstajali in jih je vidni del strani pravilno
// uporabljal — samo zaglavje jih ni. Odkrito v neodvisni reviziji (6B.1).
//
// Datoteka je ločena namenoma: "next-intl/server" se ne sme znajti v svežnju
// odjemalca, locationText.ts pa uvažajo tudi komponente z "use client".
// ---------------------------------------------------------------------------

/** Prevajalnik lokala za dani jezik. Uporabi ga v generateMetadata. */
export async function locationTextZaJezik(locale: string) {
  const t = await getTranslations({ locale, namespace: "lokacijePodatki" });
  const vzemi: Vzemi = (kljuc, slovensko) => (t.has(kljuc) ? t(kljuc) : slovensko);
  return (loc: LocationCore) => prevediZ(loc, vzemi);
}

/**
 * Ime mesta, kot ga zapiše ta jezik.
 *
 * Namenoma NI del prevediZ(): loc.city gre v strukturirane podatke kot
 * addressLocality, tam pa mora ostati "Ljubljana" — to je poštno dejstvo, po
 * katerem Google ujame Google Business Profil. Prevaja se samo tisto, kar
 * gost bere: v italijanščini je mesto "Lubiana", ker to Italijani vtipkajo.
 */
export async function imeMesta(locale: string, privzeto: string) {
  const t = await getTranslations({ locale, namespace: "lokacijePodatki" });
  return t.has("mesto") ? t("mesto") : privzeto;
}
