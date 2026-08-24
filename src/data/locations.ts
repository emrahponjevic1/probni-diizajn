// ---------------------------------------------------------------------------
// LOKACIJI — EDINI VIR
//
// Podatki o poslovalnicah so bili razpršeni na štirih mestih (SiteNavbar,
// SeherezadaHero, ContactData, AboutData), vsakič v malo drugačni obliki.
// Zato so se razhajali: ime lokala, delovni čas ob sobotah in povezave do
// zemljevidov so bili ponekod napačni.
//
// Tukaj je ena resnica. Ostali moduli naj berejo od tod, ne pišejo svoje.
//
// Imena sledijo uradnemu PDF-ju: "Šeherezada" in "Šeherezada 2" — brez ulice
// v imenu, ker se mora ime ujemati z Google Business Profilom.
// ---------------------------------------------------------------------------

export type LocationId = "trubarjeva" | "slovenska";

export interface LocationCore {
  id: LocationId;
  /** Uradno ime, enako kot na Google Business Profilu. */
  name: string;
  street: string;
  postalCode: string;
  city: string;
  /** Cel naslov v eni vrstici. */
  fullAddress: string;
  /** Iskanje po imenu + naslovu da natančnejši zadetek kot samo naslov. */
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export const LOCATIONS: LocationCore[] = [
  {
    id: "trubarjeva",
    name: "Šeherezada",
    street: "Trubarjeva cesta 31",
    postalCode: "1000",
    city: "Ljubljana",
    fullAddress: "Trubarjeva cesta 31, 1000 Ljubljana",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Šeherezada+Trubarjeva+cesta+31+Ljubljana",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Trubarjeva+cesta+31+Ljubljana",
  },
  {
    id: "slovenska",
    name: "Šeherezada 2",
    street: "Slovenska cesta 55",
    postalCode: "1000",
    city: "Ljubljana",
    fullAddress: "Slovenska cesta 55, 1000 Ljubljana",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Šeherezada+Slovenska+cesta+55+Ljubljana",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Slovenska+cesta+55+Ljubljana",
  },
];

export function locationById(id: LocationId): LocationCore {
  return LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];
}

/**
 * Telefon je enak za obe poslovalnici. Kadrovska služba ima svojo številko,
 * ki se uporablja samo na strani Zaposlitev.
 */
export const PHONE = {
  restaurant: { display: "+386 69 314 316", e164: "+38669314316" },
  hr: { display: "+386 64 183 155", e164: "+38664183155" },
} as const;
