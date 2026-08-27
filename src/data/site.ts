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

/**
 * Jeziki spletnega mesta.
 *
 * `prefix: ""` pomeni, da jezik nima predpone v naslovu: slovenščina je
 * /meni, ne /sl/meni.
 *
 * Danes je vrstica ena. Struktura je vseeno seznam, ker sitemap in kanonični
 * naslovi že zdaj berejo od tod — ob dodajanju jezikov (faza 5) se dopiše
 * vrstica in nič drugega se ne prepisuje. Isti seznam bo bral tudi hreflang.
 */
export const LOCALES = [
  { code: "sl", prefix: "", hreflang: "sl-SI", default: true },
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale =
  LOCALES.find((l) => l.default) ?? LOCALES[0];

/** Sestavi cel naslov iz poti: "/meni" -> "https://seherezada.net/meni" */
export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE) {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}${locale.prefix}${clean}`;
}
