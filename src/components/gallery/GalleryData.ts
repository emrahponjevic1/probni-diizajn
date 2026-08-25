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

export const GALLERY_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "Vse Slike" },
  { id: "hrana", label: "Jedi & Kebab" },
  { id: "priprava", label: "Priprava & Žar" },
  { id: "ambient", label: "Vzdušje & Ekipa" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Pravi Turški Döner Kebab",
    category: "hrana",
    src: "/images/seherezada-hero-doner-kebab.avif",
  },
  {
    id: 2,
    title: "Žar mojster pri pripravi svežega kebaba",
    category: "priprava",
    src: "/images/seherezada-story-chef.avif",
  },
  {
    id: 3,
    title: "Sveže zvita Jufka Kebab",
    category: "hrana",
    src: "/images/seherezada-jufka-kebab.avif",
  },
  {
    id: 4,
    title: "Peka domače lepinje v vroči peči",
    category: "priprava",
    src: "/images/seherezada-story-oven.avif",
  },
  {
    id: 5,
    title: "Kebab Krožnik z zlatim pomfrijem",
    category: "hrana",
    src: "/images/seherezada-kebab-na-krozniku.avif",
  },
  {
    id: 6,
    title: "Topel ambient restavracije",
    category: "ambient",
    src: "/images/seherezada-about-chef-lamps.avif",
  },
  {
    id: 7,
    title: "Domači hrustljavi Falafli s humusom",
    category: "hrana",
    src: "/images/seherezada-falafel-humus.avif",
  },
  {
    id: 8,
    title: "Mojster pri dekoraciji krožnika",
    category: "priprava",
    src: "/images/seherezada-about-chef-plating.avif",
  },
  {
    id: 9,
    title: "Klasični Cheeseburger s stopljenim sirom",
    category: "hrana",
    src: "/images/seherezada-cheese-burger.avif",
  },
  {
    id: 10,
    title: "Kuhinjski utrip in priprava sveže hrane",
    category: "ambient",
    src: "/images/seherezada-student-kitchen.avif",
  },
  {
    id: 11,
    title: "Kebab v škatli s pomfrijem (Box)",
    category: "hrana",
    src: "/images/seherezada-doner-kebab-box.avif",
  },
  {
    id: 12,
    title: "Sveža priprava in začimbe",
    category: "priprava",
    src: "/images/seherezada-about-dish-orange.avif",
  },
  {
    id: 13,
    title: "Pizza Kebab z domačo paradižnikovo osnovo",
    category: "hrana",
    src: "/images/seherezada-pizza-kebab.avif",
  },
  {
    id: 14,
    title: "100 % Goveji čevapčiči v lepinji",
    category: "hrana",
    src: "/images/seherezada-cevapcici.avif",
  },
  {
    id: 15,
    title: "Študentski meni z izbranimi prilogami",
    category: "ambient",
    src: "/images/seherezada-student-meal.avif",
  },
  {
    id: 16,
    title: "Pizza Klasik s puranjo šunko",
    category: "hrana",
    src: "/images/seherezada-pizza-classic.avif",
  },
  {
    id: 17,
    title: "Hrustljavi Falafel Krožnik",
    category: "hrana",
    src: "/images/seherezada-falafel-kroznik.avif",
  },
  {
    id: 18,
    title: "Hrustljav Crispy Burger",
    category: "hrana",
    src: "/images/seherezada-chicken-crispy.avif",
  },
  {
    id: 19,
    title: "Zelenjavni Kebab s svežo solato",
    category: "hrana",
    src: "/images/seherezada-zelenjavni-kebab.avif",
  },
  {
    id: 20,
    title: "Sveže pečena Pizza Margarita",
    category: "hrana",
    src: "/images/seherezada-pizza-margarita.avif",
  },
  {
    id: 21,
    title: "Sveža Zelenjavna Jufka",
    category: "hrana",
    src: "/images/seherezada-vegi-jufka.avif",
  },
  {
    id: 22,
    title: "Naročila za prevzem & prijazna postrežba",
    category: "ambient",
    src: "/images/seherezada-contact-call-hero.avif",
  },
];
