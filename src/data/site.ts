// ---------------------------------------------------------------------------
// NASLOV SPLETNEGA MESTA IN JEZIKI — EDINI VIR
//
// Iz te datoteke izhajajo kanonični naslovi, sitemap, robots in pozneje
// hreflang. Če je naslov zapisan na več mestih, se prej ali slej razidejo —
// in Google takrat ne ve, katera stran je prava.
// ---------------------------------------------------------------------------

/** Naslov, pod katerim naj bo stran v iskalniku. Brez poševnice na koncu. */
export const SITE_URL = "https://seherezada.net";

/** Ime, kot ga uporabljamo v strukturiranih podatkih in naslovih strani. */
export const SITE_NAME = "Šeherezada";

/** Barva znamke, vzeta iz datoteke logotipa. */
export const BRAND_COLOR = "#a41023";

/**
 * LOGOTIP — celoten, z napisom.
 * Google ga vzame od tod za znamko ob zadetku. Prikazan je velik, zato je
 * napis berljiv.
 */
export const LOGO = {
  src: "/images/seherezada-logo.png",
  width: 1024,
  height: 1024,
} as const;

/**
 * SLIKA ZA DELJENJE POVEZAVE
 *
 * To se pokaže, ko kdo pošlje povezavo v WhatsApp, Viber ali na Facebook.
 * Razmerje 1200 × 630 je tisto, ki ga te aplikacije pričakujejo.
 *
 * Namenoma JPEG in ne PNG: gre za fotografijo, pri kateri PNG ničesar ne
 * stisne. In namenoma ne AVIF — teh aplikacij AVIF ne zna prebrati in
 * predogleda sploh ne bi pokazale.
 */
export const SHARE_IMAGE = {
  src: "/images/seherezada-share.jpg",
  width: 1200,
  height: 630,
} as const;

/**
 * Jeziki spletnega mesta.
 *
 * `prefix: ""` pomeni, da jezik nima predpone v naslovu: slovenščina je
 * /meni, ne /sl/meni.
 *
 * Ta seznam je edini vir resnice o jezikih. Iz njega izhajajo sitemap,
 * kanonični naslovi, hreflang in usmerjanje (next-intl). Jezika ni nikjer
 * drugje zapisanega — dodajanje jezika je vrstica tukaj in nova datoteka
 * s prevodi, nič drugega.
 *
 * Vrstni red ni naključen: prvi je privzeti jezik.
 */
export const LOCALES = [
  // Slovenščina nima predpone: /meni, ne /sl/meni.
  { code: "sl", prefix: "", hreflang: "sl-SI", default: true },
  { code: "en", prefix: "/en", hreflang: "en", default: false },
  { code: "de", prefix: "/de", hreflang: "de", default: false },
  { code: "it", prefix: "/it", hreflang: "it", default: false },
  { code: "bs", prefix: "/bs", hreflang: "bs", default: false },
  { code: "tr", prefix: "/tr", hreflang: "tr", default: false },
] as const;

export type Locale = (typeof LOCALES)[number];


export const DEFAULT_LOCALE: Locale =
  LOCALES.find((l) => l.default) ?? LOCALES[0];

/** Samo oznake jezikov: ["sl", "en", "de", "it", "bs", "tr"]. next-intl dela z njimi. */
export const LOCALE_CODES = LOCALES.map((l) => l.code);

export type LocaleCode = (typeof LOCALES)[number]["code"];

/** Iz oznake ("de") dobi cel zapis jezika. Neznana oznaka pade na privzeti jezik. */
export function localeByCode(code: string): Locale {
  return LOCALES.find((l) => l.code === code) ?? DEFAULT_LOCALE;
}

/**
 * Sestavi cel naslov v SLOVENŠČINI: "/meni" -> "https://seherezada.net/meni"
 *
 * Namenoma ne sprejme jezika. V drugih jezikih se poti tudi prevajajo
 * (/meni -> /en/menu), tega pa ta datoteka ne ve — tabela prevodov je v
 * src/i18n/routing.ts. Če bi tu dodali jezik, bi tiho vrnil /en/meni,
 * torej naslov, ki obstaja samo kot preusmeritev.
 *
 * Za naslove v drugih jezikih uporabi localizedUrl() iz src/i18n/urls.ts.
 */
export function absoluteUrl(path: string) {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}${clean}`;
}
