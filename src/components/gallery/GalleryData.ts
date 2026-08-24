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
  { id: "ambient", label: "Vzdušje" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Sveže pečen Kebab & priloge",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Pizza Margarita iz peči",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Rebrca z žara s pomfrijem",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Ambient naše restavracije",
    category: "ambient",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Orientalska jed s prilogo",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Priprava nabodal na žaru",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Domači hrustljavi Falafli",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Sočen Double Cheeseburger",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    title: "Zlato ocvrt soljen pomfri",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    title: "Pečeno meso narezano na koščke",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    title: "Hišne omake & začimbe",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    title: "Nočni utrip & postrežba",
    category: "ambient",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    title: "Sveže pečen domači kruh",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 14,
    title: "Krožnik mešanega mesa",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 15,
    title: "Sveža sezonska solata",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 16,
    title: "Pečen piščanec z zelišči",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 17,
    title: "Žar mojster pri delu",
    category: "priprava",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 18,
    title: "Pizza s suho salamo",
    category: "hrana",
    src: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 20,
    title: "Sodobna notranjost",
    category: "ambient",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80",
  },
];
