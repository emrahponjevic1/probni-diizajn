import { useTranslations } from "next-intl";
import type { StaticPathname } from "@/i18n/routing";
import { LOCATIONS, PHONE } from "@/data/locations";
import { hoursSummary } from "@/lib/hours";
import { STUDENT_BON } from "@/components/menu/MenuData";
import { BON_RULES } from "@/data/studentski-boni";

// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA — ZGRADBA
//
// Ločen modul in ne del FaqPageContent.tsx: ta je odjemalska komponenta
// ("use client"), iz nje pa strežnik ne more brati navadnih izvozov. Stran
// /pogosta-vprasanja iz teh podatkov sestavi FAQPage schemo, komponenta pa
// harmoniko — oba bereta isti vir.
//
// Tukaj je samo ZGRADBA: kateri sklopi obstajajo, katera vprašanja so v njih
// in kam vodi povezava "več". Besedila so v messages/<jezik>.json pod ključem
// "faqStran", ker gredo v šest jezikov.
//
// Delovni čas, doplačilo in telefon se ne prepisujejo v odgovore — vstavijo
// se iz istih virov, ki jih prikazuje ostala stran. Ob spremembi urnika ali
// cene se odgovori popravijo sami, v vseh jezikih hkrati.
// ---------------------------------------------------------------------------

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

/** Zgradba: vrstni red sklopov in vprašanj ter povezave. */
const ZGRADBA: { id: string; vprasanja: { id: string; vec?: StaticPathname }[] }[] = [
  {
    id: "seherezada",
    vprasanja: [{ id: "seh-1" }, { id: "seh-2" }, { id: "seh-3" }],
  },
  {
    id: "difference",
    vprasanja: [
      { id: "diff-1", vec: "/halal" },
      { id: "diff-2" },
      { id: "diff-3" },
      { id: "diff-4" },
    ],
  },
  {
    id: "boni",
    vprasanja: [
      { id: "boni-1", vec: "/studentski-boni" },
      { id: "boni-3", vec: "/studentski-boni" },
      { id: "boni-2" },
    ],
  },
];

/**
 * Sestavi vprašanja in odgovore v jeziku strani.
 *
 * Uporabljata jo tako odjemalska komponenta kot strežniška stran, ki iz
 * istega seznama sestavi FAQPage schemo — zato sta harmonika in schema
 * vedno enaki.
 */
export function useFaqSections(): FaqCategory[] {
  const t = useTranslations("faqStran");

  const [prva, druga] = LOCATIONS;
  const urnikPrva = hoursSummary(prva.hours);
  const urnikDruga = hoursSummary(druga.hours);
  const doplacilo = `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`;

  /** Vrednosti, ki jih posamezni odgovori vstavijo v besedilo. */
  const vrednosti: Record<string, Record<string, string>> = {
    "seh-3": {
      ime1: prva.name,
      od1: urnikPrva.opens,
      do1: urnikPrva.closes,
      vikend1: urnikPrva.weekendCloses ?? urnikPrva.closes,
      ime2: druga.name,
      od2: urnikDruga.opens,
      do2: urnikDruga.closes,
    },
    "boni-1": { doplacilo },
    "boni-3": {
      oknoOd: BON_RULES.windowFrom,
      oknoDo: BON_RULES.windowTo,
      od1: urnikPrva.opens,
      od2: urnikDruga.opens,
    },
    "boni-2": { telefon: PHONE.restaurant.display },
  };

  return ZGRADBA.map((sklop) => ({
    id: sklop.id,
    title: t(`sklopi.${sklop.id}`),
    items: sklop.vprasanja.map((v) => ({
      id: v.id,
      question: t(`vprasanja.${v.id}.vprasanje`),
      answer: t(`vprasanja.${v.id}.odgovor`, vrednosti[v.id] ?? {}),
      ...(v.vec
        ? { more: { href: v.vec, label: t(`vprasanja.${v.id}.vec`) } }
        : {}),
    })),
  }));
}
