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

import { COMPANY } from "./company";

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
  /**
   * Naslov Google Business Profila tega lokala — tisti iz gumba "Deli" na
   * Google Zemljevidih, ne naslov iskanja.
   *
   * Od tod izhaja sameAs v strukturiranih podatkih. Brez njega mora Google
   * sam ugibati, da sta ta stran in profil na zemljevidu isti posel; s tem
   * mu to povemo naravnost. Prej ga na strani ni bilo nikjer — odkrito v
   * neodvisni reviziji (6C.5).
   */
  googleProfileUrl: string;
  appleMapsUrl: string;
  /**
   * Zemljepisna širina in dolžina vhoda v lokal, odčitani na Google
   * Zemljevidih (desni klik na vhod). Namenoma NISO vzeti iz vgrajenega
   * zemljevida spodaj — tam so zaokrožene in lahko kažejo čez cesto.
   *
   * Iz njiju izhajata geo v strukturiranih podatkih in povezava do navodil
   * za pot, ki je natančnejša od iskanja po imenu.
   */
  geo: { lat: number; lng: number };
  /** Delovni čas po dnevih, po uradnem PDF-ju. */
  hours: { day: string; time: string }[];
  /** Kratek povzetek za značke in kartice. */
  hoursShort: string;

  /** Kratka oznaka nad naslovom na strani lokala. */
  badge: string;
  /**
   * Naslov H1 na strani lokala. Nosi ime, ključno besedo in ulico hkrati —
   * ljudje iščejo "kebab Trubarjeva", ne samo imena lokala.
   */
  h1: string;
  /** Ena vrstica o značaju lokala. */
  subtitle: string;
  /** Dva do trije stavki — po čem se ta lokal razlikuje od drugega. */
  vibeText: string;
  /** Kaj gost tu dobi. Prikazano kot seznam. */
  highlights: string[];
  /** Kako priti. */
  transport: { lpp: string; parking: string; walking: string };

  email: string;

  /**
   * Fotografije lokala. Dokler je polje prazno, stran prikaže lepo ogrado
   * namesto slike — nič ni pokvarjeno. Ko imaš fotografije, jih daj v
   * public/images/ in tu vpiši pot, npr.:
   *   { src: "/images/trubarjeva-notranjost.jpg", alt: "Notranjost lokala" }
   * Alt naj opiše, kaj je na sliki — to bere Google in bralnik zaslona.
   */
  photos: { src: string; alt: string }[];
}

export const LOCATIONS: LocationCore[] = [
  {
    id: "trubarjeva",
    name: "Šeherezada",
    street: "Trubarjeva cesta 31",
    postalCode: "1000",
    city: "Ljubljana",
    fullAddress: "Trubarjeva cesta 31, 1000 Ljubljana",
    googleProfileUrl: "https://maps.app.goo.gl/dmCFr6EhV1ycSDg4A",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Trubarjeva+cesta+31+Ljubljana",
    geo: { lat: 46.052483990380814, lng: 14.50992102057708 },
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
    h1: "Šeherezada — halal kebab na Trubarjevi 31",
    subtitle: "Bohemski mestni vrvež in nočna postojanka",
    vibeText:
      "Naša izvirna lokacija v samem osrčju stare Ljubljane. Popolna točka za hitro kosilo, nočni prigrizek ali sproščeno posedanje v bohemskem ritmu Trubarjeve ulice.",
    highlights: [
      "Odprto do 02:00, ob petkih in sobotah do 03:00",
      "Študentski boni — doplačilo 2,55 €",
      "Peka domačih lepinj sproti, tik pred postrežbo",
      "Hitri osebni prevzem in dostava prek Wolta",
      "Vseh 29 jedi z menija, vključno s Pečenim Piščancem",
    ],
    transport: {
      lpp: "Postajališče Zmajski most (linije 2, 13, 20) — 2 min hoje",
      parking: "Parkirna hiša Kapitelj / Komenskega ali Petkovškovo nabrežje",
      walking: "3 min od Prešernovega trga in Tromostovja",
    },
    email: COMPANY.email,
    photos: [
      { src: "", alt: "Notranjost lokala na Trubarjevi cesti 31" },
      { src: "", alt: "Priprava döner kebaba na ražnju" },
      { src: "", alt: "Vhod v lokal s Trubarjeve ceste" },
    ],
  },
  {
    id: "slovenska",
    name: "Šeherezada 2",
    street: "Slovenska cesta 55",
    postalCode: "1000",
    city: "Ljubljana",
    fullAddress: "Slovenska cesta 55, 1000 Ljubljana",
    googleProfileUrl: "https://maps.app.goo.gl/M3aL2Bz8ND1q1e3v5",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Slovenska+cesta+55+Ljubljana",
    geo: { lat: 46.05616240965046, lng: 14.505044866008422 },
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
    h1: "Šeherezada 2 — halal kebab na Slovenski 55",
    subtitle: "Prostorna restavracija ob glavni mestni aveniji",
    vibeText:
      "Sodobna restavracija ob Slovenski cesti, tik ob Bavarskem dvoru. Idealna za jutranje malice, poslovna kosila, študentske obede in večerne prigrizke.",
    highlights: [
      "Odprto vsak dan od 08:00 do 01:00",
      "Zajtrki in dopoldanske malice od 08:00 naprej",
      "Študentski boni — doplačilo 2,55 €",
      "Hitri osebni prevzem in dostava prek Wolta",
      "28 jedi z menija — brez Pečenega Piščanca",
    ],
    transport: {
      lpp: "Postajališče Bavarski dvor / Pošta (glavno mestno vozlišče) — 1–2 min hoje",
      parking: "Parkirna hiša Kozolec / Trg republike / Kongresni trg",
      walking: "V neposredni bližini Bavarskega dvora in Ajdovščine",
    },
    email: COMPANY.email,
    photos: [
      { src: "", alt: "Notranjost lokala na Slovenski cesti 55" },
      { src: "", alt: "Pult in ponudba jedi" },
      { src: "", alt: "Vhod v lokal pri Bavarskem dvoru" },
    ],
  },
];

/**
 * Naslov vgrajenega zemljevida.
 *
 * Prej je bil zapisan kot podatek — dolg niz "maps/embed?pb=...", sestavljen
 * na roko. Oba sta kazala mimo: Trubarjeva za 33 m, Slovenska za 254 m, in
 * njen identifikator kraja se je končal z ":0x1", torej z zapolnjeno vrzeljo,
 * ne s pravim krajem z Google Zemljevidov.
 *
 * Najhuje je bilo, da si je stran nasprotovala sama: zemljevid je kazal eno
 * mesto, gumb "Navodila za pot" pod njim pa je gosta poslal 254 m stran.
 *
 * Zato niza ne popravljamo, ampak ga odpravimo. Zemljevid se zdaj sestavi iz
 * istih koordinat kot navodila za pot in strukturirani podatki — trije se
 * fizično ne morejo več raziti. Odkrito v drugi neodvisni reviziji.
 */
export function mapEmbedUrl(loc: LocationCore) {
  return `https://maps.google.com/maps?q=${loc.geo.lat},${loc.geo.lng}&z=17&hl=sl&output=embed`;
}

/**
 * Povezava do navodil za pot. Cilj so koordinate, ne ime — ime lahko Google
 * ujame na napačen lokal, koordinata ne more.
 */
export function directionsUrl(loc: LocationCore) {
  return `https://www.google.com/maps/dir/?api=1&destination=${loc.geo.lat},${loc.geo.lng}`;
}

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
