import { useTranslations } from "next-intl";
export interface GalleryItem {
  id: number;
  title: string;
  category: "hrana" | "priprava" | "ambient";
  src: string;
}

export type GalleryCategory = "all" | "hrana" | "priprava" | "ambient";

export interface CategoryOption {
  id: GalleryCategory;
  label: string;
}

/** Vrstni red kategorij. Njihova imena so v prevodih. */
const CATEGORY_IDS: GalleryCategory[] = ["all", "hrana", "priprava", "ambient"];

export const GALLERY_ITEMS: Omit<GalleryItem, "title">[] = [
  {
    id: 1,
    category: "hrana",
    src: "/images/seherezada-hero-doner-kebab.avif",
  },
  {
    id: 2,
    category: "priprava",
    src: "/images/seherezada-story-chef.avif",
  },
  {
    id: 3,
    category: "hrana",
    src: "/images/seherezada-jufka-kebab.avif",
  },
  {
    id: 4,
    category: "priprava",
    src: "/images/seherezada-story-oven.avif",
  },
  {
    id: 5,
    category: "hrana",
    src: "/images/seherezada-kebab-na-krozniku.avif",
  },
  {
    id: 6,
    category: "ambient",
    src: "/images/seherezada-about-chef-lamps.avif",
  },
  {
    id: 7,
    category: "hrana",
    src: "/images/seherezada-falafel-humus.avif",
  },
  {
    id: 8,
    category: "priprava",
    src: "/images/seherezada-about-chef-plating.avif",
  },
  {
    id: 9,
    category: "hrana",
    src: "/images/seherezada-cheese-burger.avif",
  },
  {
    id: 10,
    category: "ambient",
    src: "/images/seherezada-student-kitchen.avif",
  },
  {
    id: 11,
    category: "hrana",
    src: "/images/seherezada-doner-kebab-box.avif",
  },
  {
    id: 12,
    category: "priprava",
    src: "/images/seherezada-about-dish-orange.avif",
  },
  {
    id: 13,
    category: "hrana",
    src: "/images/seherezada-pizza-kebab.avif",
  },
  {
    id: 14,
    category: "hrana",
    src: "/images/seherezada-cevapcici.avif",
  },
  {
    id: 15,
    category: "ambient",
    src: "/images/seherezada-student-meal.avif",
  },
  {
    id: 16,
    category: "hrana",
    src: "/images/seherezada-pizza-classic.avif",
  },
  {
    id: 17,
    category: "hrana",
    src: "/images/seherezada-falafel-kroznik.avif",
  },
  {
    id: 18,
    category: "hrana",
    src: "/images/seherezada-chicken-crispy.avif",
  },
  {
    id: 19,
    category: "hrana",
    src: "/images/seherezada-zelenjavni-kebab.avif",
  },
  {
    id: 20,
    category: "hrana",
    src: "/images/seherezada-pizza-margarita.avif",
  },
  {
    id: 21,
    category: "hrana",
    src: "/images/seherezada-vegi-jufka.avif",
  },
  {
    id: 22,
    category: "ambient",
    src: "/images/seherezada-contact-call-hero.avif",
  },
];


// ---------------------------------------------------------------------------
// Naslovi slik in imena kategorij so v messages/<jezik>.json pod ključem
// "galerijaPodatki". Tukaj ostane samo zgradba: katera slika je katera,
// v kateri kategoriji je in kje leži datoteka.
// ---------------------------------------------------------------------------

export function useGalleryContent() {
  const t = useTranslations("galerijaPodatki");

  const categories: CategoryOption[] = CATEGORY_IDS.map((id) => ({
    id,
    label: t(`kategorije.${id}`),
  }));

  const items: GalleryItem[] = GALLERY_ITEMS.map((slika) => ({
    ...slika,
    title: t(`slike.${slika.id}`),
  }));

  return { categories, items };
}