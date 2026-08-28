import { absoluteUrl } from "@/data/site";

/**
 * BREADCRUMBLIST — kje na strani se gost nahaja
 *
 * Brez tega Google pod zadetkom izpiše goli naslov:
 *     seherezada.net/lokacije/trubarjeva-31
 * S tem pa pot, ki jo človek razume:
 *     Šeherezada › Trubarjeva 31
 *
 * PRAVILO, KI SE NE SME KRŠITI
 * Vsak člen mora kazati na stran, ki res obstaja. Zato tu ni člena
 * "Lokacije" — poti /lokacije ni, obstajata samo strani posameznih
 * poslovalnic. Člen, ki bi vodil v 404, je hujši od manjkajočega člena.
 *
 * Zadnji člen je stran sama in nima povezave — tam gost že je.
 */
export interface Crumb {
  /** Besedilo, kot ga vidi človek. */
  name: string;
  /** Pot brez domene, npr. "/blog". Zadnji člen je brez nje. */
  path?: string;
}

export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
