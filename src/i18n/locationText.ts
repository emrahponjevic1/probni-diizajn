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

export function useLocationText() {
  const t = useTranslations("lokacijePodatki");

  const vzemi = (kljuc: string, slovensko: string) =>
    t.has(kljuc) ? t(kljuc) : slovensko;

  return function prevediLokal(loc: LocationCore): LocationCore {
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
  };
}
