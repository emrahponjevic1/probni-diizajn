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
  /** Delovni čas po dnevih, po uradnem PDF-ju. */
  hours: { day: string; time: string }[];
  /** Kratek povzetek za značke in kartice. */
  hoursShort: string;

  /** Kratka oznaka nad naslovom na strani lokala. */
  badge: string;
  /** Ena vrstica o značaju lokala. */
  subtitle: string;
  /** Dva do trije stavki — po čem se ta lokal razlikuje od drugega. */
  vibeText: string;
  /** Kaj gost tu dobi. Prikazano kot seznam. */
  highlights: string[];
  /** Kako priti. */
  transport: { lpp: string; parking: string; walking: string };
  /** Vgrajen Google zemljevid. */
  mapEmbed: string;
  email: string;
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
    hours: [
      { day: "Ponedeljek", time: "09:00 – 02:00" },
      { day: "Torek", time: "09:00 – 02:00" },
      { day: "Sreda", time: "09:00 – 02:00" },
      { day: "Četrtek", time: "09:00 – 02:00" },
      { day: "Petek", time: "09:00 – 03:00" },
      { day: "Sobota", time: "09:00 – 03:00" },
      { day: "Nedelja", time: "09:00 – 02:00" },
    ],
    hoursShort: "09:00 – 02:00, pet in sob do 03:00",
    badge: "Mestno jedro · Naša prva poslovalnica",
    subtitle: "Bohemski mestni vrvež in nočna postojanka",
    vibeText:
      "Naša izvirna lokacija v samem osrčju stare Ljubljane. Popolna točka za hitro kosilo, nočni prigrizek ali sproščeno posedanje v bohemskem ritmu Trubarjeve ulice.",
    highlights: [
      "Odprto do 02:00, ob petkih in sobotah do 03:00",
      "Študentski boni — doplačilo 3,00 €",
      "Peka domačih lepinj sproti, tik pred postrežbo",
      "Hitri osebni prevzem in dostava prek Wolta",
      "Vseh 29 jedi z menija, vključno s Pečenim Piščancem",
    ],
    transport: {
      lpp: "Postajališče Zmajski most (linije 2, 13, 20) — 2 min hoje",
      parking: "Parkirna hiša Kapitelj / Komenskega ali Petkovškovo nabrežje",
      walking: "3 min od Prešernovega trga in Tromostovja",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.1128405021235!2d14.5097223!3d46.0522222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47653282245b0a7d%3A0x6fb26227b2a6f23!2sTrubarjeva%20cesta%2031%2C%201000%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1700000000000!5m2!1ssl!2ssi",
    email: "info@seherezada.net",
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
    hours: [
      { day: "Ponedeljek", time: "08:00 – 01:00" },
      { day: "Torek", time: "08:00 – 01:00" },
      { day: "Sreda", time: "08:00 – 01:00" },
      { day: "Četrtek", time: "08:00 – 01:00" },
      { day: "Petek", time: "08:00 – 01:00" },
      { day: "Sobota", time: "08:00 – 01:00" },
      { day: "Nedelja", time: "08:00 – 01:00" },
    ],
    hoursShort: "08:00 – 01:00, vsak dan",
    badge: "Center · Bavarski dvor",
    subtitle: "Prostorna restavracija ob glavni mestni aveniji",
    vibeText:
      "Sodobna restavracija ob Slovenski cesti, tik ob Bavarskem dvoru. Idealna za jutranje malice, poslovna kosila, študentske obede in večerne prigrizke.",
    highlights: [
      "Odprto vsak dan od 08:00 do 01:00",
      "Zajtrki in dopoldanske malice od 08:00 naprej",
      "Študentski boni — doplačilo 3,00 €",
      "Hitri osebni prevzem in dostava prek Wolta",
      "28 jedi z menija — brez Pečenega Piščanca",
    ],
    transport: {
      lpp: "Postajališče Bavarski dvor / Pošta (glavno mestno vozlišče) — 1–2 min hoje",
      parking: "Parkirna hiša Kozolec / Trg republike / Kongresni trg",
      walking: "V neposredni bližini Bavarskega dvora in Ajdovščine",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.0!2d14.504!3d46.054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765329ebc0e9eb7%3A0x1!2sSlovenska%20cesta%2055%2C%201000%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1700000000000!5m2!1ssl!2ssi",
    email: "info@seherezada.net",
  },
];

/** Del naslova strani: /lokacije/<slug> */
export const LOCATION_SLUG: Record<LocationId, string> = {
  trubarjeva: "trubarjeva-31",
  slovenska: "slovenska-55",
};

export function locationBySlug(slug: string): LocationCore | undefined {
  const id = (Object.keys(LOCATION_SLUG) as LocationId[]).find(
    (k) => LOCATION_SLUG[k] === slug
  );
  return id ? locationById(id) : undefined;
}

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
