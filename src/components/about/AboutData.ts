import { GOOGLE_REVIEWS } from "@/data/reviews";
import { locationById } from "@/data/locations";

export interface HeroMicroItem {
  id: string;
  title: string;
  desc: string;
  iconType: "spice" | "bread" | "halal" | "pin";
}

export interface StatsBannerItem {
  value: string;
  label: string;
  subtext: string;
  iconType: "calendar" | "fire" | "award" | "people";
}

export interface PhilosophyCard {
  id: string;
  number: string;
  title: string;
  description: string;
  iconType: "halal" | "bread" | "clock" | "students";
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface LocationProfile {
  id: "trubarjeva" | "slovenska";
  name: string;
  subtitle: string;
  address: string;
  description: string;
  hours: string;
  phone: string;
  vibeTag: string;
  features: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export const HERO_MICRO_ITEMS: HeroMicroItem[] = [
  {
    id: "spices",
    title: "12 orientalskih začimb",
    desc: "24-urna počasna marinada za neustavljivo sočnost.",
    iconType: "spice",
  },
  {
    id: "bread",
    title: "Sveže pečeno vsak dan",
    desc: "Vsako jutro ročno zamesimo sveže testo za lepinje.",
    iconType: "bread",
  },
  {
    id: "halal",
    title: "100% Halal certifikat",
    desc: "Preverjeno poreklo in redno nadzorovana kakovost.",
    iconType: "halal",
  },
  {
    id: "locations",
    title: "2 lokaciji v Ljubljani",
    desc: "Trubarjeva cesta 31 in Slovenska cesta 55.",
    iconType: "pin",
  },
];

export const STATS_BANNER_ITEMS: StatsBannerItem[] = [
  {
    value: "1998",
    label: "Leto začetka v LJ",
    subtext: "Prvi ogenj na Trubarjevi cesti",
    iconType: "calendar",
  },
  {
    value: "Od 1998",
    label: "Neprekinjene tradicije",
    subtext: "Pristne družinske recepture",
    iconType: "fire",
  },
  {
    value: "100%",
    label: "Halal certifikat",
    subtext: "Brezkompromisna kakovost mesa",
    iconType: "award",
  },
  {
    value: "2 Lokaciji",
    label: "V osrčju Ljubljane",
    subtext: "Trubarjeva 31 & Slovenska 55",
    iconType: "people",
  },
];

export const FLOATING_PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    id: "halal",
    number: "01",
    title: "100% Halal certifikat",
    description: "Vsi mesni kosi prihajajo od strogo preverjenih dobaviteljev z veljavnimi Halal certifikati. Brez kompromisov.",
    iconType: "halal",
  },
  {
    id: "bread",
    number: "02",
    title: "Domač kruh, pečen sproti",
    description: "Vsako lepinjo zamesimo in spečemo sproti tik pred postrežbo. Toplina in hrustljavost, ki ju začutite takoj.",
    iconType: "bread",
  },
  {
    id: "hours",
    number: "03",
    title: "Mestna nočna postojanka",
    description: "Ko se mesto umiri, naši žari še gorijo. Na Trubarjevi vam toplo hrano strežemo do 02:00, ob petkih in sobotah pa do 03:00.",
    iconType: "clock",
  },
  {
    id: "students",
    number: "04",
    title: "Prijazno do študentov",
    description: "Uradni ponudnik subvencionirane študentske prehrane na bone. Bogat, topel in uravnotežen obrok v centru.",
    iconType: "students",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Izbira in 24-urno mariniranje mesa",
    description: "Vsak kos mesa ročno obrežemo in mariniramo v mešanici 12 orientalskih začimb ter oljčnega olja polnih 24 ur.",
  },
  {
    stepNumber: "02",
    title: "Dnevni zames in vzhajanje testa",
    description: "Vsako jutro naši peki ročno zamesijo sveže testo iz moke, vode, kvasa in soli brez industrijskih dodatkov.",
  },
  {
    stepNumber: "03",
    title: "Peka lepinj in žar na ognju",
    description: "Lepinje pečemo sproti, tik pred postrežbo, meso na žaru pa počasi do hrustljavosti.",
  },
  {
    stepNumber: "04",
    title: "Sveža sestava in topli sprejem",
    description: "Sočne rezine mesa ali falaflé položimo v vročo lepinjo s svežo solato in domačimi omakami ter postrežemo z nasmehom.",
  },
];

/**
 * Mnenja izhajajo iz src/data/reviews.ts — samo resnične ocene z Googla.
 * Prej so bila tukaj izmišljena mnenja z naključnimi fotografijami s spleta.
 */
export const TESTIMONIALS: TestimonialItem[] = GOOGLE_REVIEWS.map((r) => ({
  id: String(r.id),
  quote: r.text,
  author: r.author,
  role: [r.context, "Google · " + r.when].filter(Boolean).join(" · "),
}));

export const LOCATIONS_PROFILES: LocationProfile[] = [
  {
    id: "trubarjeva",
    name: "Šeherezada Trubarjeva",
    subtitle: "Zgodovinski začetek · Mestno jedro",
    address: "Trubarjeva cesta 31, 1000 Ljubljana",
    description:
      "Naša prva poslovalnica v starem mestnem jedru. Prostor, kjer se prepletajo nočno življenje, študentski vrvež in več kot četrt stoletja pristne orientalske tradicije.",
    hours: "Pon – Čet & Sob – Ned: 09:00 – 02:00, Pet: 09:00 – 03:00",
    phone: "+386 69 314 316",
    vibeTag: "Bohemski mestni utrip & nočna legenda",
    features: [
      "Center mesta (Trubarjeva ulica)",
      "Odprto vsak dan do 02:00, petek in sobota do 03:00",
      "Študentski boni (doplačilo 3,00 €)",
      "Hitri prevzem & dostava prek Wolta",
    ],
    googleMapsUrl: locationById("trubarjeva").googleMapsUrl,
    appleMapsUrl: locationById("trubarjeva").appleMapsUrl,
  },
  {
    id: "slovenska",
    name: "Šeherezada Slovenska",
    subtitle: "Druga lokacija · Center prestolnice",
    address: "Slovenska cesta 55, 1000 Ljubljana",
    description:
      "Prostorna in sodobna restavracija ob osrednji Slovenski cesti v Ljubljani. Idealna za jutranje malice, poslovna kosila, študentske obede ter večerne prigrizke v prijetnem ambientu.",
    hours: "Ponedeljek – Nedelja: 08:00 – 01:00",
    phone: "+386 69 314 316",
    vibeTag: "Sodobna restavracija & mestni utrip",
    features: [
      "Center mesta (Slovenska cesta 55)",
      "Odprto vsak dan od 08:00 do 01:00",
      "Študentski boni & dnevne malice",
      "Hitri prevzem & dostava prek Wolta",
    ],
    googleMapsUrl: locationById("slovenska").googleMapsUrl,
    appleMapsUrl: locationById("slovenska").appleMapsUrl,
  },
];

export const TICKER_ITEMS: string[] = [
  "DÖNER KEBAB",
  "SVEŽE LEPINJE IZ PEČI",
  "PRAVI ŽAR NA OGNJU",
  "100% HALAL CERTIFIKAT",
  "DOMAČI HRUSTLJAVI FALAFEL",
  "ŠTUDENTSKI BONI (DOPLAČILO 3,00 €)",
  "TRUBARJEVA CESTA 31",
  "SLOVENSKA CESTA 55",
  "ODPRTO VSAK DAN POZNO V NOČ",
];
