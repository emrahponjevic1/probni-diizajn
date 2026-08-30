import { useTranslations } from "next-intl";
import type { LocationCore } from "@/data/locations";

// ---------------------------------------------------------------------------
// PREVOD BESEDIL O POSLOVALNICAH
//
// src/data/locations.ts ostane edini vir resnice o lokalih. Tam so naslov,
// telefon, urnik, povezave do zemljevidov in slovenska besedila — in tam jih
// lastnik ureja, tako kot doslej.
//
// Prevodi za druge jezike gredo v messages/<jezik>.json pod ključ
// "lokacijePodatki", oštevilčeni po id-ju lokala:
//
//   "lokacijePodatki": {
//     "dnevi": { "0": "Monday", ... },
//     "trubarjeva": { "h1": "...", "highlights": { "0": "..." } }
//   }
//
// Kar ni prevedeno, ostane slovensko. Ure, naslovi in povezave se NE
// prevajajo — to so dejstva, ne besedilo.
// ---------------------------------------------------------------------------

/**
 * Kako se prevod poišče. Kljuka se razlikuje med odjemalcem (useTranslations)
 * in strežnikom (getTranslations), preslikava ključev pa mora ostati ena sama.
 */
export type Vzemi = (kljuc: string, slovensko: string) => string;

/**
 * Preslikava ključev — edina na vsem spletnem mestu.
 *
 * Prej je bila zapisana samo tu, meta oznake strani lokala pa so brale
 * naravnost iz locations.ts in ta sloj obšle. Posledica: og:description je
 * na petih tujih jezikih ostal slovenski, opis za Google pa je imel sredi
 * prevedene povedi slovenski kos ("Geöffnet 09:00 – 02:00, pet in sob do
 * 03:00"). Odkrito v neodvisni reviziji (6B.1).
 */
export function prevediZ(loc: LocationCore, vzemi: Vzemi): LocationCore {
  const p = loc.id;
  return {
    ...loc,
    // Dnevi so isti za oba lokala, zato imajo svoj ključ.
    hours: loc.hours.map((dan, i) => ({
      ...dan,
      day: vzemi(`dnevi.${i}`, dan.day),
    })),
    hoursShort: vzemi(`${p}.hoursShort`, loc.hoursShort),
    badge: vzemi(`${p}.badge`, loc.badge),
    h1: vzemi(`${p}.h1`, loc.h1),
    subtitle: vzemi(`${p}.subtitle`, loc.subtitle),
    vibeText: vzemi(`${p}.vibeText`, loc.vibeText),
    highlights: loc.highlights.map((h, i) => vzemi(`${p}.highlights.${i}`, h)),
    transport: {
      lpp: vzemi(`${p}.transport.lpp`, loc.transport.lpp),
      parking: vzemi(`${p}.transport.parking`, loc.transport.parking),
      walking: vzemi(`${p}.transport.walking`, loc.transport.walking),
    },
    photos: loc.photos.map((f, i) => ({
      ...f,
      alt: vzemi(`${p}.photos.${i}`, f.alt),
    })),
  };
}

/** Za komponente. Strežniška različica je v locationText.server.ts. */
export function useLocationText() {
  const t = useTranslations("lokacijePodatki");
  const vzemi: Vzemi = (kljuc, slovensko) => (t.has(kljuc) ? t(kljuc) : slovensko);
  return (loc: LocationCore) => prevediZ(loc, vzemi);
}
