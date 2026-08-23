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
  avatar: string;
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
  mapLink: string;
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
    title: "Krušna peč vsak dan",
    desc: "Vsako jutro ročno zamesimo sveže testo za lepinje.",
    iconType: "bread",
  },
  {
    id: "halal",
    title: "100% Halal certifikat",
    desc: "Preverjeno poreklo in najvišji standardi kakovosti.",
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
    value: "25+ Let",
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
    title: "Krušna peč & domač kruh",
    description: "Vsako lepinjo zamesimo in spečemo sproti tik pred postrežbo. Toplina in hrustljavost, ki ju začutite takoj.",
    iconType: "bread",
  },
  {
    id: "hours",
    number: "03",
    title: "Mestna nočna postojanka",
    description: "Ko se mesto umiri, naši žari še gorijo. Na Trubarjevi vam toplo hrano strežemo do 02:00 (v petek do 03:00).",
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
    title: "Peka v krušni peči in žar na ognju",
    description: "Lepinje položimo na razbeljen šamotni kamen pri več kot 300°C, meso na žaru pa počasi pečemo do hrustljavosti.",
  },
  {
    stepNumber: "04",
    title: "Sveža sestava in topli sprejem",
    description: "Sočne rezine mesa ali falaflé položimo v vročo lepinjo s svežo solato in domačimi omakami ter postrežemo z nasmehom.",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote: "Ko ob dveh zjutraj v Ljubljani potrebuješ pravi, sočen in vroč kebab v domači lepinji, je Šeherezada edina prava izbira. Tradicija, ki traja že od mojih študentskih let.",
    author: "Luka M.",
    role: "Lokalni gost že od leta 2012",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    quote: "Domači falafel v sveže pečeni lepinji je daleč najboljši v celem mestu. Hrustljav zunaj, sočen znotraj in vedno z obilico sveže zelenjave.",
    author: "Ana K.",
    role: "Redna obiskovalka (Vegi navdušenka)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    quote: "Kot študent sem tukaj pojedel nešteto toplih obrokov na bone. Hitra postrežba, odlična juha in solata ter vedno prijazna ekipa za pultom.",
    author: "Timotej B.",
    role: "Študent Univerze v Ljubljani",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export const LOCATIONS_PROFILES: LocationProfile[] = [
  {
    id: "trubarjeva",
    name: "Šeherezada Trubarjeva",
    subtitle: "Zgodovinski začetek · Mestno jedro",
    address: "Trubarjeva cesta 31, 1000 Ljubljana",
    description:
      "Naša prva in najbolj prepoznavna poslovalnica v starem mestnem jedru. Prostor, kjer se prepletajo nočno življenje, študentski vrvež in več kot 25 let pristne orientalske tradicije.",
    hours: "Pon – Čet & Sob – Ned: 09:00 – 02:00, Pet: 09:00 – 03:00",
    phone: "+386 (01) 430 52 40",
    vibeTag: "Bohemski mestni utrip & nočna legenda",
    features: [
      "Center mesta (Trubarjeva ulica)",
      "Odprto vsak dan do 02:00 (petek do 03:00)",
      "Študentski boni (doplačilo 3,00 €)",
      "Hitri prevzem & Wolt dostava",
    ],
    mapLink: "https://maps.google.com/?q=Trubarjeva+cesta+31+Ljubljana",
  },
  {
    id: "slovenska",
    name: "Šeherezada Slovenska",
    subtitle: "Druga lokacija · Center prestolnice",
    address: "Slovenska cesta 55, 1000 Ljubljana",
    description:
      "Prostorna in sodobna restavracija ob osrednji Slovenski cesti v Ljubljani. Idealna za jutranje malice, poslovna kosila, študentske obede ter večerne prigrizke v prijetnem ambientu.",
    hours: "Ponedeljek – Nedelja: 08:00 – 01:00",
    phone: "+386 (01) 430 52 40",
    vibeTag: "Sodobna restavracija & mestni utrip",
    features: [
      "Center mesta (Slovenska cesta 55)",
      "Odprto vsak dan od 08:00 do 01:00",
      "Študentski boni & dnevne malice",
      "Hitri osebni prevzem & dostava",
    ],
    mapLink: "https://maps.google.com/?q=Slovenska+cesta+55+Ljubljana",
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
