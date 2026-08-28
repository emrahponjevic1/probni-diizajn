import { useTranslations } from "next-intl";
import type { MenuItem } from "@/components/menu/MenuData";

// ---------------------------------------------------------------------------
// PREVOD JEDI
//
// Meni se NE preseli v datoteke s prevodi. Slovenska imena, opisi, sestavine
// in alergeni ostanejo v src/components/menu/MenuData.ts, ker se ta datoteka
// primerja z uradnim PDF-jem. Če bi se besedilo razdelilo na dve mesti, bi se
// ta primerjava razdelila z njim.
//
// Prevodi za druge jezike gredo v messages/<jezik>.json pod ključ "jedi",
// oštevilčen po ISTI številki, kot jo ima jed na tabli (1–29):
//
//   "jedi": {
//     "1": {
//       "ime": "Doner Kebab",
//       "opis": "Freshly grilled meat, homemade flatbread ...",
//       "kategorija": "Kebab & wraps",
//       "sestavine": { "0": "meat", "1": "salad" },
//       "alergeni": { "0": "gluten" }
//     }
//   }
//
// Kar ni prevedeno, ostane slovensko — gost nikoli ne vidi prazne vrstice.
// Zato tudi ni nevarnosti, da bi se pri prevajanju izgubila kakšna jed:
// seznam jedi in njihovo število prideta iz MenuData.ts, ne iz prevodov.
// ---------------------------------------------------------------------------

export function useMenuText() {
  const t = useTranslations("jedi");

  /** Vzame prevod, če obstaja; sicer slovensko besedilo iz MenuData.ts. */
  const vzemi = (kljuc: string, slovensko: string) =>
    t.has(kljuc) ? t(kljuc) : slovensko;

  /**
   * Seznam prevede po postavkah in OHRANI dolžino. Število sestavin in
   * alergenov je podatek s table, ne stvar prevajalca.
   */
  const vzemiSeznam = (pot: string, slovenski: string[]) =>
    slovenski.map((besedilo, i) => vzemi(`${pot}.${i}`, besedilo));

  return function prevediJed(item: MenuItem): MenuItem {
    const p = String(item.id);
    return {
      ...item,
      name: vzemi(`${p}.ime`, item.name),
      categoryLabel: vzemi(`${p}.kategorija`, item.categoryLabel),
      desc: vzemi(`${p}.opis`, item.desc),
      note: item.note ? vzemi(`${p}.opomba`, item.note) : item.note,
      ingredientsList: vzemiSeznam(`${p}.sestavine`, item.ingredientsList),
      allergensList: vzemiSeznam(`${p}.alergeni`, item.allergensList),
    };
  };
}

/**
 * Isto načelo za kategorije v meniju (Kebab & jufke, Pizze …). Slovenska
 * imena ostanejo v MENU_CATEGORIES, prevodi gredo v messages pod "kategorije",
 * ključ je id kategorije:
 *
 *   "kategorije": { "kebab": { "ime": "Kebab & wraps", "kratko": "Kebab" } }
 */
export function useCategoryText() {
  const t = useTranslations("kategorije");
  const vzemi = (kljuc: string, slovensko: string) =>
    t.has(kljuc) ? t(kljuc) : slovensko;

  return function prevediKategorijo<T extends { id: string; label: string; shortLabel?: string }>(
    cat: T
  ): T {
    return {
      ...cat,
      label: vzemi(`${cat.id}.ime`, cat.label),
      shortLabel: cat.shortLabel ? vzemi(`${cat.id}.kratko`, cat.shortLabel) : cat.shortLabel,
    };
  };
}
