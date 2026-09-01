// ---------------------------------------------------------------------------
// BLOG OBJAVE — EDINI VIR
//
// ===========================================================================
//  KAKO DODAM OBJAVO?
//
//  1. Kopiraj blok med /* ZAČETEK PREDLOGE */ in /* KONEC PREDLOGE */
//  2. Prilepi ga med oglate oklepaje BLOG_POSTS spodaj
//  3. Zamenjaj besedilo
//  4. Shrani. Objava dobi svojo stran na /blog/<slug>
//
//  SLUG = naslov v naslovu strani
//  slug: "kje-jesti-na-studentske-bone"  ->  seherezada.net/blog/kje-jesti-na-studentske-bone
//
//  Pravila za slug:
//    • samo male črke, številke in vezaji
//    • brez šumnikov: "č" -> "c", "š" -> "s", "ž" -> "z"
//    • kratko in razumljivo, 3–6 besed
//    • ko je objava enkrat javna, sluga NE spreminjaj — povezave se pokvarijo
//
//  KAKO ODSTRANIM OBJAVO?
//  Izbriši njen blok. Če ne ostane nobena, stran /blog sama pokaže,
//  da objav še ni.
// ===========================================================================
//
// Prejšnja različica je vsebovala šest izmišljenih objav — z izmišljenimi
// avtorji, fotografijami s spleta in trditvami o opremi, ki je nimamo.
// Odstranjene so.
// ---------------------------------------------------------------------------

export type BlogCategorySlug =
  | "kulinarka"
  | "pekarna"
  | "vegi"
  | "boni"
  | "tradicija"
  | "kakovost";

export interface BlogPost {
  /** Del naslova strani: /blog/<slug>. Male črke in vezaji, brez šumnikov. */
  slug: string;
  title: string;
  /** Dva stavka. Uporabi se kot opis v Googlu — naj bo do ~150 znakov. */
  excerpt: string;
  category: string;
  categorySlug: BlogCategorySlug;
  /** Datum za bralca, npr. "14. avgust 2026" */
  date: string;
  /** Isti datum v obliki YYYY-MM-DD — za Google. */
  isoDate: string;
  /** npr. "4 min branja" */
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  /** Pot do slike v mapi /public, npr. "/images/doner-kebab.jpg" */
  coverImage: string;
  imageCaption: string;
  /** Besedilo objave. Uporabljaj <p>, <h2>, <ul><li>, <strong>. */
  contentHtml: string;
  /** Prikaži veliko na vrhu arhiva. Samo ena objava naj ima true. */
  isFeatured?: boolean;
}

export interface BlogCategoryFilter {
  id: "vse" | BlogCategorySlug;
  label: string;
}

export const BLOG_CATEGORIES: BlogCategoryFilter[] = [
  { id: "vse", label: "Vse objave" },
  { id: "kulinarka", label: "Kulinarične zgodbe" },
  { id: "pekarna", label: "Pekarna & testo" },
  { id: "vegi", label: "Vegi & vegan" },
  { id: "boni", label: "Študentska prehrana" },
  { id: "tradicija", label: "Tradicija & sladice" },
  { id: "kakovost", label: "Kakovost & halal" },
];

/*  ZAČETEK PREDLOGE — kopiraj od tu

  {
    slug: "kje-jesti-na-studentske-bone",
    title: "Kje jesti na študentske bone v Ljubljani",
    excerpt:
      "Kako deluje študentski bon, koliko je doplačilo in kaj vse dobiš za 2,55 € pri nas.",
    category: "Študentska prehrana",
    categorySlug: "boni",
    date: "1. september 2026",
    isoDate: "2026-09-01",
    readTime: "4 min branja",
    author: { name: "Ekipa Šeherezada", role: "Šeherezada Ljubljana" },
    coverImage: "/images/seherezada-student-meal.avif",
    imageCaption: "Študentski meni z doplačilom 2,55 €.",
    contentHtml: `
      <p>Prvi odstavek objave.</p>

      <h2>Vmesni naslov</h2>
      <p>Naslednji odstavek.</p>

      <ul>
        <li>Prva točka</li>
        <li>Druga točka</li>
      </ul>
    `,
    isFeatured: true,
  },

    KONEC PREDLOGE — kopiraj do tu  */

export const BLOG_POSTS: BlogPost[] = [
  // Trenutno ni objav.
  // Novo objavo dodaš tako, da sem prilepiš predlogo zgoraj.
];

export const HAS_POSTS = BLOG_POSTS.length > 0;

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
