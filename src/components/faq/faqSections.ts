import type { StaticPathname } from "@/i18n/routing";

// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA — VSEBINA
//
// Ločen modul in ne del FaqPageContent.tsx: ta je odjemalska komponenta
// ("use client"), iz nje pa strežnik ne more brati navadnih izvozov. Stran
// /pogosta-vprasanja iz teh podatkov sestavi FAQPage schemo, komponenta pa
// harmoniko — oba bereta isti vir.
//
// `more` je neobvezna povezava na stran, ki odgovor razloži do konca.
// ---------------------------------------------------------------------------

import { PHONE } from "@/data/locations";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Neobvezna povezava na stran, ki odgovor razloži do konca. */
  // Pot je tipizirana, ne navaden string: tako se v odgovor ne more
  // priplaziti naslov, ki ne obstaja.
  more?: { href: StaticPathname; label: string };
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_SECTIONS: FaqCategory[] = [
  {
    id: "seherezada",
    title: "Naša hrana in priprava",
    items: [
      {
        id: "seh-1",
        question: "Kaj dela Šeherezada kebab poseben?",
        answer:
          "Naše meso je 100 % halal, marinirano 24 ur v avtorskih orientalskih začimbah in pečeno na vročem odprtem žaru brez industrijskih dodatkov.",
      },
      {
        id: "seh-2",
        question: "Ali lepinje pečete sami?",
        answer:
          "Da! Testo zamesimo vsako jutro, vsako lepinjo pa spečemo sproti v naši peči tik preden vam postrežemo hrano, zato je vedno topla in hrustljava.",
      },
      {
        id: "seh-3",
        question: "Kje se nahajate in kakšen je delovni čas?",
        answer:
          "Imamo dve lokaciji v središču Ljubljane. Šeherezada na Trubarjevi 31 je odprta vsak dan od 09:00 do 02:00, ob petkih in sobotah pa do 03:00. Šeherezada 2 na Slovenski 55 je odprta vsak dan od 08:00 do 01:00.",
      },
    ],
  },
  {
    id: "difference",
    title: "Halal, vegansko in plačilo",
    items: [
      {
        id: "diff-1",
        question: "Ali je celotno meso 100% Halal certificirano?",
        answer:
          "Da, vsi naši dobavitelji imajo uradne halal certifikate s popolno sledljivostjo izvora mesa ter strogim higienskim nadzorom.",
        more: {
          href: "/halal",
          label: "Kaj halal pomeni in kako se certificira",
        },
      },
      {
        id: "diff-2",
        question: "Ali imate vegetarijanske in veganske jedi?",
        answer:
          "Seveda! Sami pripravljamo sveže falaflje iz čičerike in zelišč, kremast domači humus ter zelenjavne pice in jufke.",
      },
      {
        id: "diff-3",
        question: "Kakšne omake in prelive ponujate?",
        answer:
          "Izbirate lahko med blago jogurtovo omako s svežimi zelišči, hišno pikantno čili omako ter sezamovo tahini omako.",
      },
      {
        id: "diff-4",
        question: "Ali sprejemate kartice in gotovino?",
        answer:
          "Sprejemamo gotovino, plačilne kartice (Visa, Mastercard, Maestro) ter študentske bone preko mobilne aplikacije ali kartice.",
      },
    ],
  },
  {
    id: "boni",
    title: "Študentski boni in naročila",
    items: [
      {
        id: "boni-1",
        question: "Koliko znaša doplačilo in kaj vsebuje študentski meni?",
        answer:
          "Doplačilo z veljavnim bonom je 3,00 €. Meni vključuje glavno jed po izbiri (kebab, pizzo, burger, falafel) + svežo solato + jabolko + pijačo.",
        more: {
          href: "/studentski-boni",
          label: "Vse o študentskih bonih pri nas",
        },
      },
      {
        id: "boni-3",
        question: "Do katere ure lahko unovčim študentski bon?",
        answer:
          "Sistem študentske prehrane sprejema bone med 07:00 in 24:00. Ker oba lokala zapirata šele po polnoči, bon pri nas velja do 24:00 — na Trubarjevi od 09:00, na Slovenski od 08:00. Če prideš pozneje, te postrežemo po redni ceni z menija.",
        more: {
          href: "/studentski-boni",
          label: "Preveri, kdaj bon velja na posamezni lokaciji",
        },
      },
      {
        id: "boni-2",
        question: "Ali lahko naročim vnaprej po telefonu za prevzem?",
        answer:
          `Seveda! Pokličite nas na ${PHONE.restaurant.display} in vaše naročilo vas bo čakalo sveže in toplo pripravljeno ob dogovorjenem času brez čakanja v vrsti.`,
      },
    ],
  },
];
