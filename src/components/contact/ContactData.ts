export interface LocationDetail {
  id: "trubarjeva" | "slovenska";
  name: string;
  badge: string;
  subtitle: string;
  address: string;
  city: string;
  phone: string;
  phoneRaw: string;
  email: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
  googleMapsEmbed: string;
  hours: {
    weekdays: string;
    sunday: string;
    note?: string;
  };
  schedule: Array<{ day: string; hours: string; isOpen: boolean }>;
  transport: {
    lpp: string;
    parking: string;
    walking: string;
  };
  highlights: string[];
  vibeText: string;
}

export interface ContactCategory {
  id: "general" | "catering" | "reservation" | "students";
  label: string;
  icon: string;
  description: string;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
  category: "splosno" | "lokacije" | "catering" | "placila";
}

export const CONTACT_LOCATIONS: LocationDetail[] = [
  {
    id: "trubarjeva",
    name: "Šeherezada Trubarjeva",
    badge: "Mestno jedro · Zgodovinska lokacija",
    subtitle: "Bohemski mestni vrvež in nočna kulinarična legenda",
    address: "Trubarjeva cesta 31",
    city: "1000 Ljubljana",
    phone: "+386 (01) 430 52 40",
    phoneRaw: "+38614305240",
    email: "info@seherezada.si",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Šeherezada+Trubarjeva+cesta+31+Ljubljana",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Trubarjeva+cesta+31+Ljubljana",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.1128405021235!2d14.5097223!3d46.0522222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47653282245b0a7d%3A0x6fb26227b2a6f23!2sTrubarjeva%20cesta%2031%2C%201000%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1700000000000!5m2!1ssl!2ssi",
    hours: {
      weekdays: "09:00 – 02:00 (petek do 03:00)",
      sunday: "09:00 – 02:00",
      note: "Kuhinja in žar odprta od 09:00 do 02:00 (ob petkih do 03:00)",
    },
    schedule: [
      { day: "Ponedeljek", hours: "09:00 – 02:00", isOpen: true },
      { day: "Torek", hours: "09:00 – 02:00", isOpen: true },
      { day: "Sreda", hours: "09:00 – 02:00", isOpen: true },
      { day: "Četrtek", hours: "09:00 – 02:00", isOpen: true },
      { day: "Petek", hours: "09:00 – 03:00", isOpen: true },
      { day: "Sobota", hours: "09:00 – 02:00", isOpen: true },
      { day: "Nedelja", hours: "09:00 – 02:00", isOpen: true },
    ],
    transport: {
      lpp: "Postajališče Zmajski most (linije 2, 13, 20) — 2 min hoje",
      parking: "Parkirna hiša Kapitelj / Komenskega ali Petkovškovo nabrežje",
      walking: "3 min od Prešernovega trga in Tromostovja",
    },
    highlights: [
      "Nočna postojanka — odprto do 02:00 (petek do 03:00)",
      "Študentski boni (doplačilo 3,00 €)",
      "Peka domačih lepinj v krušni peči sproti",
      "Hitri osebni prevzem & Wolt / Glovo dostava",
    ],
    vibeText:
      "Naša izvirna lokacija v samem osrčju stare Ljubljane. Popolna točka za hitro kosilo, nočni prigrizek ali sproščeno posedanje v bohemskem ritmu Trubarjeve ulice.",
  },
  {
    id: "slovenska",
    name: "Šeherezada Slovenska",
    badge: "Center · Slovenska cesta",
    subtitle: "Prostorna restavracija v srcu prestolnice",
    address: "Slovenska cesta 55",
    city: "1000 Ljubljana",
    phone: "+386 (01) 430 52 40",
    phoneRaw: "+38614305240",
    email: "info@seherezada.si",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Šeherezada+Slovenska+cesta+55+Ljubljana",
    appleMapsUrl: "https://maps.apple.com/?q=Šeherezada+Slovenska+cesta+55+Ljubljana",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.0!2d14.504!3d46.054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765329ebc0e9eb7%3A0x1!2sSlovenska%20cesta%2055%2C%201000%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1700000000000!5m2!1ssl!2ssi",
    hours: {
      weekdays: "08:00 – 01:00",
      sunday: "08:00 – 01:00",
      note: "Odprto vsak dan v tednu od 08:00 do 01:00",
    },
    schedule: [
      { day: "Ponedeljek", hours: "08:00 – 01:00", isOpen: true },
      { day: "Torek", hours: "08:00 – 01:00", isOpen: true },
      { day: "Sreda", hours: "08:00 – 01:00", isOpen: true },
      { day: "Četrtek", hours: "08:00 – 01:00", isOpen: true },
      { day: "Petek", hours: "08:00 – 01:00", isOpen: true },
      { day: "Sobota", hours: "08:00 – 01:00", isOpen: true },
      { day: "Nedelja", hours: "08:00 – 01:00", isOpen: true },
    ],
    transport: {
      lpp: "Postajališče Bavarski dvor / Pošta (glavno mestno vozlišče) — 1–2 min hoje",
      parking: "Parkirna hiša Kozolec / Trg republike / Kongresni trg",
      walking: "V neposredni bližini Bavarskega dvora in Ajdovščine",
    },
    highlights: [
      "Odprto vsak dan od 08:00 do 01:00",
      "Zajtrki in dopoldanske malice od 08:00 naprej",
      "Študentski boni (doplačilo 3,00 €)",
      "Hitri osebni prevzem & Wolt / Glovo dostava",
    ],
    vibeText:
      "Sodobna restavracija ob glavni mestni aveniji, idealna za jutranje malice, poslovna kosila, študentske obede ter večerne prigrizke.",
  },
];

export const CONTACT_CATEGORIES: ContactCategory[] = [
  {
    id: "general",
    label: "Splošno vprašanje",
    icon: "💬",
    description: "Vprašanja glede ponudbe, sestavin, delovnega časa ali pohvale.",
  },
  {
    id: "catering",
    label: "Catering & Naročila",
    icon: "🍱",
    description: "Večja naročila za podjetja, rojstne dneve, piknike in posebne dogodke.",
  },
  {
    id: "reservation",
    label: "Rezervacija za skupine",
    icon: "🪑",
    description: "Rezervacija miz za večje družbe (nad 6 oseb) na lokaciji Slovenska.",
  },
  {
    id: "students",
    label: "Študenti & Sodelovanja",
    icon: "🎓",
    description: "Vprašanja glede unovčenja bonov ali poslovnih sodelovanj.",
  },
];

export const CONTACT_FAQS: ContactFaqItem[] = [
  {
    id: "faq-rezervacija",
    category: "splosno",
    question: "Ali je za obisk restavracije potrebna predhodna rezervacija?",
    answer:
      "Za posameznike in manjše skupine rezervacija ni potrebna — preprosto se oglasite pri nas! Za večje skupine (8 oseb ali več) ali poslovna kosila na Slovenski cesti pa priporočamo, da nam pošljete povpraševanje ali nas predhodno pokličete na +386 (01) 430 52 40, da vam pravočasno pripravimo mizo.",
  },
  {
    id: "faq-catering",
    category: "catering",
    question: "Kako poteka naročilo cateringa za podjetja ali praznovanja?",
    answer:
      "Catering naročila pripravljamo za skupine od 10 do 200+ oseb. Ponudba vključuje bogate plošče mariniranega mesa na žaru, sveže pečene lepinje neposredno iz krušne peči, hrustljavi falafel, domače orientalske omake, humus in sveže solate. Pišite nam prek obrazca vsaj 24–48 ur vnaprej s predvidenim številom oseb in datumom.",
  },
  {
    id: "faq-urnik-noc",
    category: "lokacije",
    question: "Do katere ure je odprta poslovalnica na Trubarjevi cesti?",
    answer:
      "Šeherezada na Trubarjevi 31 je odprta vsak dan od 09:00 do 02:00 (ob petkih do 03:00). Šeherezada 2 na Slovenski cesti 55 pa je odprta vsak dan od 08:00 do 01:00.",
  },
  {
    id: "faq-prevzem",
    category: "splosno",
    question: "Ali lahko hrano naročim za osebni prevzem (Take-away)?",
    answer:
      "Seveda! Pokličite nas na +386 (01) 430 52 40, oddajte svoje naročilo in vaša hrana bo sveže pečena ter skrbno zapakirana čakala na prevzem v roku 10–15 minut.",
  },
  {
    id: "faq-placila",
    category: "placila",
    question: "Kakšne so možnosti plačila (kartice, gotovina, študentski boni)?",
    answer:
      "Na obeh lokacijah sprejemamo gotovino, vse glavne plačilne in kreditne kartice (Visa, Mastercard, Maestro) ter brezstično plačevanje (Apple Pay, Google Pay). Sprejemamo tudi digitalne študentske bone (doplačilo znaša 3,00 €).",
  },
  {
    id: "faq-halal",
    category: "splosno",
    question: "Ali je vsa hrana 100% Halal certificirana?",
    answer:
      "Da, vsa naša mesna ponudba (piščančje in goveje meso) je 100% Halal certificirana z veljavnim certifikatom. Prav tako pri pripravi uporabljamo ločene pripomočke in stroge higienske standarde.",
  },
];

export const DIRECT_CHANNELS = [
  {
    name: "Telefonski klic",
    desc: "Za takojšnja naročila za prevzem in vprašanja",
    actionText: "+386 (01) 430 52 40",
    href: "tel:+38614305240",
    icon: "phone",
    highlight: "Priporočeno za hitra naročila",
  },
  {
    name: "E-poštni predal",
    desc: "Za vprašanja, rezervacije in splošne informacije",
    actionText: "info@seherezada.si",
    href: "mailto:info@seherezada.si",
    icon: "mail",
    highlight: "Odgovor v 24 urah",
  },
  {
    name: "Wolt Dostava",
    desc: "Dostava na dom ali v pisarno v 30 min",
    actionText: "Naroči na Wolt",
    href: "https://wolt.com/sl/svn/ljubljana/restaurant/seherezada",
    icon: "wolt",
    highlight: "Hitra dostava v Ljubljani",
  },
  {
    name: "Instagram & Sporočila",
    desc: "Spremljajte nas in nam pišite v DM",
    actionText: "@seherezada_ljubljana",
    href: "https://instagram.com/",
    icon: "instagram",
    highlight: "Dnevne kulinarične zgodbe",
  },
  {
    name: "Facebook stran",
    desc: "Novosti, odpiralni časi in sporočila",
    actionText: "Šeherezada Ljubljana",
    href: "https://facebook.com/",
    icon: "facebook",
    highlight: "Skupnost gostov",
  },
  {
    name: "TikTok profil",
    desc: "Peka domačih lepinj in utrinki iz žara",
    actionText: "@seherezada_ljubljana",
    href: "https://tiktok.com/",
    icon: "tiktok",
    highlight: "Video vsebine",
  },
];
