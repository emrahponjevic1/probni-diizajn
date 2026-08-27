// ---------------------------------------------------------------------------
// EDINI VIR RESNICE ZA MENI
//
// Vsebina tega datoteka sledi uradnemu dokumentu `seherezada_final_crispy_jufka.pdf`.
// Jed, ki je ni v PDF-ju, ne sme obstajati tukaj — ne v meniju, ne v filtrih,
// ne v strukturiranih podatkih.
//
// Vrstni red v MENU_ITEMS je uradni vrstni red s table (1–29).
// ---------------------------------------------------------------------------

export type LocationId = "trubarjeva" | "slovenska";

/** VEGAN = brez živalskih sestavin. VEGETARIAN = brez mesa, lahko vsebuje sir/jogurt. */
export type DietType = "vegan" | "vegetarian";

export interface MenuItem {
  /** Uradna številka s table (1–29). */
  id: number;
  name: string;
  category: "kebab" | "burger" | "kroznik" | "pizza" | "falafel";
  categoryLabel: string;
  /** Osnovna cena v EUR. */
  price: number;
  /** Cena za veliko velikost (samo pizze: 9,50 €). */
  priceLarge?: number;
  /** Na voljo na študentski bon (doplačilo 3,00 €). */
  student: boolean;
  /** null = vsebuje meso ali ribe. */
  diet: DietType | null;
  /** V katerih poslovalnicah je jed na voljo. */
  locations: LocationId[];
  /** 1–6 = prikazano med priljubljenimi izbirami na naslovnici. */
  featured?: number;
  image: string;
  icon: string;
  desc: string;
  note?: string;
  ingredientsList: string[];
  allergensList: string[];
}

export interface MenuCategoryMeta {
  id: string;
  label: string;
  shortLabel?: string;
  icon: string;
  image: string;
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    id: "all",
    label: "Vse jedi",
    shortLabel: "Vse",
    icon: "✨",
    image: "/images/seherezada-kebab-na-krozniku.avif",
  },
  {
    id: "kebab",
    label: "Kebab & jufke",
    shortLabel: "Kebab",
    icon: "🌯",
    image: "/images/seherezada-doner-kebab.avif",
  },
  {
    id: "falafel",
    label: "Falafel & priloge",
    shortLabel: "Falafel",
    icon: "🧆",
    image: "/images/seherezada-falafel.avif",
  },
  {
    id: "kroznik",
    label: "Krožniki & piščanec",
    shortLabel: "Krožniki",
    icon: "🍗",
    image: "/images/seherezada-kebab-na-krozniku.avif",
  },
  {
    id: "burger",
    label: "Burgerji",
    shortLabel: "Burgerji",
    icon: "🍔",
    image: "/images/seherezada-hamburger.avif",
  },
  {
    id: "pizza",
    label: "Pizze",
    shortLabel: "Pizze",
    icon: "🍕",
    image: "/images/seherezada-pizza-classic.avif",
  },
];

const BOTH: LocationId[] = ["trubarjeva", "slovenska"];

export const MENU_ITEMS: MenuItem[] = [
  // ---- 1–6 · Kebab & jufke ------------------------------------------------
  {
    id: 1,
    name: "Doner Kebab",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 6.0,
    student: true,
    diet: null,
    locations: BOTH,
    featured: 1,
    image: "/images/seherezada-doner-kebab.avif",
    icon: "🥪",
    desc: "Sveže pečeno meso, domača lepinja po hišnem receptu, mešana solata in izbrane omake. Naša najbolj prodajana jed.",
    ingredientsList: [
      "Domača sveže pečena lepinja",
      "Telečje & piščančje döner meso (100 % halal)",
      "Hrustljava solata, paradižnik, zelje, čebula",
      "Hišna kremasta jogurtova omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam"],
  },
  {
    id: 2,
    name: "Jufka Kebab",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 7.0,
    student: true,
    diet: null,
    locations: BOTH,
    featured: 2,
    image: "/images/seherezada-jufka-kebab.avif",
    icon: "🌯",
    desc: "Meso po izbiri, zavito v tanko jufko, s svežo zelenjavo in domačimi omakami.",
    ingredientsList: [
      "Tanka jufka (lavaš)",
      "Döner meso po izbiri (100 % halal)",
      "Sveža solata, paradižnik, čebula",
      "Jogurtova ali pikantna omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam"],
  },
  {
    id: 3,
    name: "Kebab Krožnik",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 9.0,
    student: false,
    diet: null,
    locations: BOTH,
    featured: 5,
    image: "/images/seherezada-kebab-na-krozniku.avif",
    icon: "🍽️",
    desc: "Bogat krožnik kebab mesa, hrustljav pomfri, sveža mešana solata in hišni prelivi. Za pravo lakoto.",
    ingredientsList: [
      "Obilna porcija döner mesa",
      "Zlati pomfri",
      "Mešana sezonska solata",
      "Hišni jogurtov in pikantni preliv",
    ],
    allergensList: ["Laktoza (mleko)", "Sezam"],
  },
  {
    id: 4,
    name: "Kebab v škatli",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 7.0,
    student: false,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-doner-kebab-box.avif",
    icon: "🍱",
    desc: "Praktična porcija sočnega kebab mesa s hrustljavim pomfrijem in izbranimi omakami.",
    ingredientsList: [
      "Döner meso (100 % halal)",
      "Pomfri krompirček",
      "Sveža solata & omake",
    ],
    allergensList: ["Laktoza (mleko)", "Sezam"],
  },
  {
    id: 5,
    name: "Zelenjavna Jufka",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 4.5,
    student: true,
    diet: "vegetarian",
    locations: BOTH,
    image: "/images/seherezada-vegi-jufka.avif",
    icon: "🌯",
    desc: "Sveža sezonska zelenjava in izbrane omake, zavite v toplo tanko jufko.",
    ingredientsList: [
      "Tanka jufka (lavaš)",
      "Raznolika hrustljava solata",
      "Kremasti sir & prelivi",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
  {
    id: 6,
    name: "Zelenjavni Kebab",
    category: "kebab",
    categoryLabel: "Kebab & jufke",
    price: 4.0,
    student: true,
    diet: "vegetarian",
    locations: BOTH,
    featured: 6,
    image: "/images/seherezada-zelenjavni-kebab.avif",
    icon: "🥬",
    desc: "Sveža zelenjava, sir in aromatični zeliščni prelivi v topli lepinji. Najugodnejša jed na našem meniju.",
    ingredientsList: [
      "Domača topla lepinja",
      "Bogat izbor sveže zelenjave",
      "Kremasti sir",
      "Zeliščni prelivi",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },

  // ---- 7–12 · Falafel & priloge -------------------------------------------
  {
    id: 7,
    name: "Falafel",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 7.0,
    student: true,
    diet: "vegan",
    locations: BOTH,
    featured: 3,
    image: "/images/seherezada-falafel.avif",
    icon: "🧆",
    desc: "Hrustljavi čičerikini polpeti po orientalskem receptu, v topli lepinji s solato in tahinijem. 100 % rastlinsko.",
    ingredientsList: [
      "Domači hrustljavi falafli",
      "Sveža lepinja",
      "Tahini sezamova omaka",
      "Paradižnik, kisle kumarice, peteršilj",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam"],
  },
  {
    id: 8,
    name: "Falafel XL",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 8.0,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-falafel.avif",
    icon: "🧆",
    desc: "Večja porcija hrustljavih falaflov z dodatno svežo zelenjavo in kremastim humusom.",
    ingredientsList: [
      "Ekstra porcija falafel kroglic",
      "Humus namaz & tahini",
      "Bogat izbor solate",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam"],
  },
  {
    id: 9,
    name: "Falafel Krožnik",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 8.9,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-falafel-kroznik.avif",
    icon: "🍽️",
    desc: "Falafel kroglice, zlati pomfri, sveža mešana solata, pita kruhek in orientalske omake.",
    ingredientsList: [
      "6x zlati falafel polpeti",
      "Pomfri krompirček",
      "Sveža solata & pita kruh",
      "Tahini & česnova omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam"],
  },
  {
    id: 10,
    name: "Falafel + Humus",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 10.0,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-falafel-humus.avif",
    icon: "🧆",
    desc: "Kombinacija hrustljavih falaflov in domačega kremastega humusa z oljčnim oljem.",
    ingredientsList: [
      "Sveži falafli",
      "Domač kremni čičerikin humus",
      "Deviško oljčno olje & pita",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam"],
  },
  {
    id: 11,
    name: "Falafel Kos (1 kos)",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 1.0,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-falafel-1kos.avif",
    icon: "🧆",
    desc: "Posamezen hrustljav ocvrt falafel po pristnem tradicionalnem receptu.",
    ingredientsList: ["Čičerika, česen, peteršilj, orientalske začimbe"],
    allergensList: ["Sezam"],
  },
  {
    id: 12,
    name: "Humus",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 3.0,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-humus.avif",
    icon: "🥣",
    desc: "Kremast tradicionalni namaz iz čičerike z deviškim oljčnim oljem in začimbami.",
    ingredientsList: ["Čičerika, tahini, limonin sok, česen, oljčno olje"],
    allergensList: ["Sezam"],
  },

  // ---- 13–22 · Krožniki, piščanec & burgerji ------------------------------
  {
    id: 13,
    name: "Piščančji Svet Riž",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 8.9,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-kebab-na-krozniku.avif",
    icon: "🍚",
    desc: "Sočni kosi mariniranega piščanca z aromatičnim rumenim rižem in svežo solato.",
    ingredientsList: [
      "Marinirani piščančji file (100 % halal)",
      "Aromatičen riž z začimbami",
      "Sveža solatna priloga",
      "Hišna jogurtova omaka",
    ],
    allergensList: ["Laktoza (mleko)"],
  },
  {
    id: 14,
    name: "Piščančji Svet Pomfri",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 8.9,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-kebab-na-krozniku.avif",
    icon: "🍟",
    desc: "Hrustljavo pečen piščanec v kombinaciji z zlatim pomfrijem in hišnimi prelivi.",
    ingredientsList: [
      "Sočni piščančji kosi",
      "Hrustljav krompirček pomfri",
      "Mešana sezonska solata",
      "Izbrana pomaka",
    ],
    allergensList: ["Laktoza (mleko)"],
  },
  {
    id: 15,
    name: "Crispy Jufka",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 7.0,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-chicken-crispy.avif",
    icon: "🌯",
    desc: "Hrustljavo paniran piščančji zrezek, sveža solata in blaga majonezna omaka v jufki.",
    ingredientsList: [
      "Paniran hrustljav piščančji file",
      "Tanka jufka (lavaš)",
      "Solata, paradižnik, blaga omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Jajca", "Laktoza (mleko)"],
  },
  {
    id: 16,
    name: "Crispy Burger",
    category: "burger",
    categoryLabel: "Burgerji",
    price: 6.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-chicken-crispy.avif",
    icon: "🍔",
    desc: "Hrustljav paniran piščančji file, sveža solata, paradižnik in hišna burger omaka v mehkem kruhku.",
    ingredientsList: [
      "Sezamov burger kruhek",
      "Paniran hrustljav piščanec",
      "Solata, paradižnik, kisle kumarice",
      "Kremasta burger omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Jajca", "Sezam", "Laktoza (mleko)"],
  },
  {
    id: 17,
    name: "Crispy Krožnik",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 8.9,
    student: false,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-chicken-crispy.avif",
    icon: "🍗",
    desc: "Panirani hrustljavi piščančji medaljoni s pomfrijem, solato in hišno pomako.",
    ingredientsList: [
      "Hrustljavo ocvrti piščančji zrezki",
      "Zlati pomfri",
      "Sveža solata & hišna omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Jajca", "Laktoza (mleko)"],
  },
  {
    id: 18,
    name: "Pečeni Piščanec",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 7.9,
    student: true,
    diet: null,
    // Na voljo samo na Trubarjevi 31 (vir: PDF).
    locations: ["trubarjeva"],
    image: "/images/seherezada-kebab-na-krozniku.avif",
    icon: "🍗",
    desc: "Sveže pečen sočen piščanec z izbranimi začimbami in domačimi prilogami.",
    note: "Na voljo samo na Trubarjevi 31.",
    ingredientsList: [
      "Pečen piščančji file",
      "Priloga po izbiri (riž ali pomfri)",
      "Solata z zeliščnim prelivom",
    ],
    allergensList: ["Laktoza (mleko)"],
  },
  {
    id: 19,
    name: "Hamburger",
    category: "burger",
    categoryLabel: "Burgerji",
    price: 7.0,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-hamburger.avif",
    icon: "🍔",
    desc: "Klasična sočna goveja polpeta, kumarice, rdeča čebula, sveža solata in hišna BBQ omaka.",
    ingredientsList: [
      "100 % goveja polpeta (halal)",
      "Mehka popečena bombetka",
      "Paradižnik, kumarice, čebula",
      "Klasična burger pomaka",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam", "Gorčica"],
  },
  {
    id: 20,
    name: "Piščančji Burger",
    category: "burger",
    categoryLabel: "Burgerji",
    price: 6.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-piscancji-burger.avif",
    icon: "🍔",
    desc: "Nežen na žaru pečen piščančji file z osvežilnimi dodatki v mehkem sezamovem kruhku.",
    ingredientsList: [
      "Grill piščančji file",
      "Burger kruhek s sezamom",
      "Paradižnik, solata, hišni preliv",
    ],
    allergensList: ["Gluten (pšenica)", "Sezam", "Laktoza (mleko)"],
  },
  {
    id: 21,
    name: "Hamburger s sirom",
    category: "burger",
    categoryLabel: "Burgerji",
    price: 7.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-cheese-burger.avif",
    icon: "🍔",
    desc: "Klasičen burger z izdatno rezino stopljenega sira cheddar, sočnim govejim mesom in omako.",
    ingredientsList: [
      "Sočna goveja polpeta",
      "Topljen cheddar sir",
      "Hrustljava solata & kumarice",
      "Hišna omaka",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam", "Gorčica"],
  },
  {
    id: 22,
    name: "Čevapčiči",
    category: "kroznik",
    categoryLabel: "Krožniki & piščanec",
    price: 11.0,
    student: false,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-cevapcici.avif",
    icon: "🥙",
    desc: "100 % goveji čevapčiči po tradicionalnem receptu v topli lepinji s čebulo in kajmakom.",
    ingredientsList: [
      "100 % goveji čevapčiči (halal)",
      "Domača topla lepinja",
      "Sveža narezana čebula",
      "Kremast domači kajmak & ajvar",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },

  // ---- 23 · Priloga -------------------------------------------------------
  {
    id: 23,
    name: "Pomfri",
    category: "falafel",
    categoryLabel: "Falafel & priloge",
    price: 3.0,
    student: false,
    diet: "vegan",
    locations: BOTH,
    image: "/images/seherezada-pomfri.avif",
    icon: "🍟",
    desc: "Zlato ocvrt, hrustljav in soljen krompirček, pripravljen sproti ob naročilu.",
    ingredientsList: ["Krompir, rastlinsko olje, morska sol"],
    allergensList: [],
  },

  // ---- 24–29 · Pizze (velika 9,50 €) ---------------------------------------
  {
    id: 24,
    name: "Pizza Zelenjava",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: "vegetarian",
    locations: BOTH,
    image: "/images/seherezada-pizza-zelenjavna.avif",
    icon: "🍕",
    desc: "Pelati, sir, sveža paprika, sladka koruza, šampinjoni, paradižnik in olive.",
    ingredientsList: [
      "Sveže zamešano testo",
      "Mocarela sir & pelati",
      "Paprika, gobe, paradižnik, koruza",
      "Origano",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
  {
    id: 25,
    name: "Pizza Salami",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-pizza-salami.avif",
    icon: "🍕",
    desc: "Pelati, mocarela sir in pikantna goveja salama z začimbami.",
    ingredientsList: [
      "Hrustljavo testo",
      "Paradižnikova osnova & sir",
      "Goveja salama / goveji kulen",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
  {
    id: 26,
    name: "Pizza Kebab",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: null,
    locations: BOTH,
    featured: 4,
    image: "/images/seherezada-pizza-kebab.avif",
    icon: "🍕",
    desc: "Pizza z domačo paradižnikovo osnovo, mocarelo, kebab mesom in jogurtovim prelivom. Na voljo v dveh velikostih.",
    ingredientsList: [
      "Hrustljavo testo",
      "Mocarela & paradižnik",
      "Kebab meso pečeno na ognju",
      "Hišni beli preliv",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
  {
    id: 27,
    name: "Pizza Klasik",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-pizza-classic.avif",
    icon: "🍕",
    desc: "Paradižnikovi pelati, mocarela sir, puranja šunka (halal) in sveži šampinjoni.",
    ingredientsList: [
      "Sveže zamešano testo",
      "Pelati & mocarela",
      "Kakovostna puranja šunka",
      "Sveži šampinjoni",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
  {
    id: 28,
    name: "Pizza Tuna",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: null,
    locations: BOTH,
    image: "/images/seherezada-pizza-tuna.avif",
    icon: "🍕",
    desc: "Paradižnikovi pelati, mocarela sir, izbrani koščki tune, rdeča čebula in olive.",
    ingredientsList: [
      "Domače testo",
      "Pelati & mocarela",
      "Kakovostna tuna",
      "Čebula & mediteranska zelišča",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Ribe"],
  },
  {
    id: 29,
    name: "Pizza Margarita",
    category: "pizza",
    categoryLabel: "Pizze",
    price: 8.0,
    priceLarge: 9.5,
    student: true,
    diet: "vegetarian",
    locations: BOTH,
    image: "/images/seherezada-pizza-margarita.avif",
    icon: "🍕",
    desc: "Domača paradižnikova omaka, kakovostna mocarela, oljčno olje in dišeč origano.",
    ingredientsList: [
      "Domače ročno vlečeno testo",
      "Paradižnikovi pelati",
      "Mocarela sir",
      "Origano & oljčno olje",
    ],
    allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
  },
];

// ---------------------------------------------------------------------------
// Izpeljani podatki — vse izhaja iz MENU_ITEMS zgoraj, nič ni podvojeno.
// ---------------------------------------------------------------------------

/** Doplačilo za študentski bon. */
export const STUDENT_BON = {
  surcharge: 3.0,
  includes: ["glavna jed", "solata", "jabolko", "pijača"],
} as const;

/** Šest jedi, prikazanih med priljubljenimi izbirami na naslovnici. */
export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS
  .filter((item) => typeof item.featured === "number")
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

/** Jedi, ki so na voljo v določeni poslovalnici. */
export function itemsForLocation(location: LocationId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.locations.includes(location));
}

export const MENU_STATS = {
  total: MENU_ITEMS.length,
  student: MENU_ITEMS.filter((i) => i.student).length,
  vegan: MENU_ITEMS.filter((i) => i.diet === "vegan").length,
  vegetarian: MENU_ITEMS.filter((i) => i.diet === "vegetarian").length,
};

// ---------------------------------------------------------------------------
// DOSTAVA
//
// Wolt ne podpira zanesljivih globokih povezav do posamezne jedi, zato gumb
// na kartici pelje na stran lokala, ne na konkretno jed.
//
// Dokler je niz prazen, se gumb NE izriše — raje brez gumba kot gumb v prazno.
// ---------------------------------------------------------------------------
export const WOLT_URL = "";
