import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALE_CODES } from "@/data/site";

// ---------------------------------------------------------------------------
// USMERJANJE JEZIKOV
//
// Seznam jezikov se NE ponavlja tukaj — bere se iz src/data/site.ts, ki je
// edini vir. Tu je zapisano samo, kako se poti prevajajo.
//
// localePrefix: "as-needed" pomeni, da privzeti jezik nima predpone:
//   slovenščina  /meni
//   nemščina     /de/speisekarte
//
// localeDetection: false je namerno. Če bi Next gosta samodejno preusmerjal
// po jeziku brskalnika, bi Googlov robot (ki se predstavi kot angleški)
// ob obisku / pristal na /en in slovenske naslovnice sploh ne bi videl.
// Jezik izbere gost sam, prek stikala v navigaciji.
// ---------------------------------------------------------------------------

/**
 * PREVEDENE POTI
 *
 * Ključ na levi je notranja pot — ta se ujema z mapo v src/app/[locale]/.
 * Ključ se NIKOLI ne spreminja, tudi če se naslov v slovenščini spremeni.
 *
 * Vrednosti na desni so tisto, kar vidi gost v naslovni vrstici.
 * Naslovi se ne smejo podvajati znotraj istega jezika.
 */
export const pathnames = {
  "/": "/",

  "/meni": {
    sl: "/meni",
    en: "/menu",
    de: "/speisekarte",
    it: "/menu",
    bs: "/meni",
    tr: "/menu",
  },

  "/kontakt": {
    sl: "/kontakt",
    en: "/contact",
    de: "/kontakt",
    it: "/contatti",
    bs: "/kontakt",
    tr: "/iletisim",
  },

  "/o-nas": {
    sl: "/o-nas",
    en: "/about",
    de: "/ueber-uns",
    it: "/chi-siamo",
    bs: "/o-nama",
    tr: "/hakkimizda",
  },

  "/pogosta-vprasanja": {
    sl: "/pogosta-vprasanja",
    en: "/faq",
    de: "/haeufige-fragen",
    it: "/domande-frequenti",
    bs: "/cesta-pitanja",
    tr: "/sss",
  },

  "/galerija": {
    sl: "/galerija",
    en: "/gallery",
    de: "/galerie",
    it: "/galleria",
    bs: "/galerija",
    tr: "/galeri",
  },

  "/halal": {
    sl: "/halal",
    en: "/halal",
    de: "/halal",
    it: "/halal",
    bs: "/halal",
    tr: "/helal",
  },

  "/studentski-boni": {
    sl: "/studentski-boni",
    en: "/student-vouchers",
    de: "/studentenbons",
    it: "/buoni-studenti",
    bs: "/studentski-boni",
    tr: "/ogrenci-fisleri",
  },

  // ---- Poti, ki jih v načrtu ni bilo; dopisane tu -------------------------

  // Blog ostane "blog" povsod: beseda je v vseh šestih jezikih razumljena,
  // prevod pa bi prinesel /bitik, /tagebuch in podobne, ki jih nihče ne išče.
  "/blog": "/blog",
  "/blog/[slug]": "/blog/[slug]",

  "/zaposlitev": {
    sl: "/zaposlitev",
    en: "/careers",
    de: "/karriere",
    it: "/lavora-con-noi",
    bs: "/posao",
    tr: "/kariyer",
  },
  "/zaposlitev/[slug]": {
    sl: "/zaposlitev/[slug]",
    en: "/careers/[slug]",
    de: "/karriere/[slug]",
    it: "/lavora-con-noi/[slug]",
    bs: "/posao/[slug]",
    tr: "/kariyer/[slug]",
  },

  // Pregled obeh poslovalnic. Prej te strani ni bilo in /lokacije je vračal
  // 404, drobtine na straneh lokalov pa so imele samo dva člena. Odkrito v
  // neodvisni reviziji (6D.3).
  "/lokacije": {
    sl: "/lokacije",
    en: "/locations",
    de: "/standorte",
    it: "/sedi",
    bs: "/lokacije",
    tr: "/subeler",
  },

  "/lokacije/[slug]": {
    sl: "/lokacije/[slug]",
    en: "/locations/[slug]",
    de: "/standorte/[slug]",
    it: "/sedi/[slug]",
    bs: "/lokacije/[slug]",
    tr: "/subeler/[slug]",
  },

  "/piskotki": {
    sl: "/piskotki",
    en: "/cookies",
    de: "/cookie-richtlinie",
    it: "/cookie",
    bs: "/kolacici",
    tr: "/cerezler",
  },

  "/politika-zasebnosti": {
    sl: "/politika-zasebnosti",
    en: "/privacy-policy",
    de: "/datenschutz",
    it: "/privacy",
    bs: "/politika-privatnosti",
    tr: "/gizlilik-politikasi",
  },
} as const;

export const routing = defineRouting({
  locales: LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE.code,
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames,
});

/**
 * TIPI POTI
 *
 * Uporabi ju povsod, kjer se pot shrani v podatke (seznam v navigaciji,
 * povezava v odgovoru na pogosto vprašanje). Če je polje tipa `string`,
 * lahko kdo zapiše pot, ki ne obstaja, in prevajalnik tega ne ujame.
 */
export type SlugPathname =
  | "/blog/[slug]"
  | "/zaposlitev/[slug]"
  | "/lokacije/[slug]";

/** Poti brez sluga — tiste, ki so cele že v tabeli zgoraj. */
export type StaticPathname = Exclude<keyof typeof pathnames, SlugPathname>;
