import type { MetadataRoute } from "next";
import { LOCALES, absoluteUrl } from "@/data/site";
import { LOCATIONS, LOCATION_SLUG } from "@/data/locations";
import { BLOG_POSTS } from "@/data/blog";
import { OPEN_POSITIONS } from "@/data/jobs";

// ---------------------------------------------------------------------------
// SITEMAP — seznam strani, ki ga oddamo Googlu
//
// Brez tega mora Google sam uganiti, katere strani obstajajo. S tem mu jih
// predamo na pladnju in ve, katere so pomembnejše.
//
// Seznam ni prepisan ročno. Objave, oglasi in poslovalnice se preberejo iz
// istih datotek, ki jih prikazuje stran — zato se sitemap ne more razhajati
// z resnico. Ko dodaš objavo, se pojavi tu sama od sebe.
//
// KO PRIDEJO JEZIKI (faza 5)
// V src/data/site.ts dopiši vrstico v LOCALES. Spodnja zanka bo vsak naslov
// izpisala v vseh jezikih; tu ni treba spreminjati ničesar.
// ---------------------------------------------------------------------------

/**
 * `priority` ni obljuba Googlu, ampak namig, katera stran je za nas
 * pomembnejša. Naslovnica in meni sta tisto, po čemer nas gost išče.
 */
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/meni", priority: 0.9 },
  { path: "/kontakt", priority: 0.8 },
  { path: "/studentski-boni", priority: 0.8 },
  { path: "/halal", priority: 0.8 },
  { path: "/o-nas", priority: 0.7 },
  { path: "/pogosta-vprasanja", priority: 0.7 },
  { path: "/galerija", priority: 0.5 },
  { path: "/blog", priority: 0.5 },
  { path: "/zaposlitev", priority: 0.5 },
  // Pravni besedili sta obvezni in naj bosta najdljivi, a nista tisto,
  // po čemer želimo biti najdeni.
  { path: "/piskotki", priority: 0.2 },
  { path: "/politika-zasebnosti", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths: { path: string; priority: number }[] = [
    ...STATIC_PAGES,

    // Strani poslovalnic — nanje kažeta Google profila, zato visoko.
    ...LOCATIONS.map((loc) => ({
      path: `/lokacije/${LOCATION_SLUG[loc.id]}`,
      priority: 0.9,
    })),

    // Objave in oglasi. Dokler sta seznama prazna, teh vrstic preprosto ni.
    ...BLOG_POSTS.map((post) => ({ path: `/blog/${post.slug}`, priority: 0.6 })),
    ...OPEN_POSITIONS.map((job) => ({
      path: `/zaposlitev/${job.slug}`,
      priority: 0.6,
    })),
  ];

  return paths.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    }))
  );
}
