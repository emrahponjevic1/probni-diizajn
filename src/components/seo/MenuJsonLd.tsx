import { MENU_ITEMS, type MenuItem } from "@/components/menu/MenuData";
import { SITE_NAME, absoluteUrl } from "@/data/site";

/**
 * MENU — jedilnik, kot ga prebere iskalnik
 *
 * Google zna jedi s cenami prikazati razširjeno pod zadetkom. Za to mora
 * jedilnik prebrati v obliki, ki jo razume — sam iz slik in razporeditve
 * na strani tega ne izlušči.
 *
 * Podatki so prebrani iz MenuData.ts, torej iz istega vira kot stran. Cene
 * in imena se ne prepisujejo, zato se ne morejo razhajati z uradnim PDF-jem.
 *
 * Oznaki suitableForDiet ne dodajamo na slepo: postavljena je samo tam, kjer
 * je jed v podatkih res označena kot veganska ali vegetarijanska.
 */

const DIET_URI: Record<string, string> = {
  vegan: "https://schema.org/VeganDiet",
  vegetarian: "https://schema.org/VegetarianDiet",
};

function toMenuItem(item: MenuItem) {
  const offers: Record<string, unknown>[] = [
    { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "EUR" },
  ];

  // Pice imajo dve velikosti; ostale jedi eno ceno.
  if (item.priceLarge) {
    offers.push({
      "@type": "Offer",
      price: item.priceLarge.toFixed(2),
      priceCurrency: "EUR",
      name: "Velika",
    });
  }

  const entry: Record<string, unknown> = {
    "@type": "MenuItem",
    name: item.name,
    description: item.desc,
    offers,
  };

  const diet = item.diet ? DIET_URI[item.diet] : undefined;
  if (diet) entry.suitableForDiet = diet;

  return entry;
}

export default function MenuJsonLd() {
  // Jedi razvrstimo po razdelkih, kot so razvrščene na strani.
  const sections = Array.from(
    MENU_ITEMS.reduce((acc, item) => {
      const list = acc.get(item.categoryLabel) ?? [];
      list.push(item);
      acc.set(item.categoryLabel, list);
      return acc;
    }, new Map<string, MenuItem[]>())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl("/meni")}#menu`,
    name: `Meni — ${SITE_NAME}`,
    url: absoluteUrl("/meni"),
    inLanguage: "sl",
    hasMenuSection: sections.map(([label, items]) => ({
      "@type": "MenuSection",
      name: label,
      hasMenuItem: items.map(toMenuItem),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
