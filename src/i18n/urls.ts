import { SITE_URL } from "@/data/site";
import { getPathname } from "./navigation";
import type { routing, SlugPathname, StaticPathname } from "./routing";

// ---------------------------------------------------------------------------
// NASLOVI V VSEH JEZIKIH
//
// absoluteUrl() iz src/data/site.ts zna samo slovenščino, ker ne pozna
// prevedenih poti. Tu jih pozna: getPathname() prebere tabelo iz routing.ts
// in vrne pot tako, kot res obstaja.
//
//   localizedUrl("/meni", "sl")  ->  https://seherezada.net/meni
//   localizedUrl("/meni", "de")  ->  https://seherezada.net/de/speisekarte
//
// To uporabljata sitemap in hreflang. Če bi naslove sestavljali sami
// (predpona + pot), bi Googlu oddali naslove, ki so samo preusmeritve.
// ---------------------------------------------------------------------------

/** Tipa poti sta zapisana v routing.ts, ob tabeli. Tu ju samo posredujemo. */
export type { SlugPathname, StaticPathname };

export type AppLocale = (typeof routing.locales)[number];

/** Cel naslov strani brez sluga, v izbranem jeziku. */
export function localizedUrl(pathname: StaticPathname, locale: AppLocale) {
  const path = getPathname({ href: pathname, locale });
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Cel naslov strani s slugom (objava, oglas, poslovalnica), v izbranem jeziku. */
export function localizedSlugUrl(
  pathname: SlugPathname,
  slug: string,
  locale: AppLocale
) {
  const path = getPathname({ href: { pathname, params: { slug } }, locale });
  return `${SITE_URL}${path}`;
}
