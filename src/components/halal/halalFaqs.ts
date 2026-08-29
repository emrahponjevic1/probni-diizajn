import { useTranslations } from "next-intl";
import { MENU_STATS } from "@/components/menu/MenuData";

// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA O HALALU — ZGRADBA
//
// Ločen modul in ne del HalalPageContent.tsx: ta je odjemalska komponenta
// ("use client"), iz nje pa strežnik ne more brati navadnih izvozov. Stran
// /halal iz teh podatkov sestavi FAQPage schemo, komponenta pa harmoniko —
// oba bereta isti vir, zato se ne moreta razhajati.
//
// Tu ostane samo vrstni red vprašanj. Besedila so v messages/<jezik>.json
// pod ključem "halalVprasanja", ker gredo v šest jezikov.
// ---------------------------------------------------------------------------

export interface HalalFaq {
  id: string;
  q: string;
  a: string;
}

/** Vrstni red vprašanj na strani in v schemi. */
const VPRASANJA = ["hfaq-1", "hfaq-2", "hfaq-3", "hfaq-4", "hfaq-5", "hfaq-6"];

export function useHalalFaqs(): HalalFaq[] {
  const t = useTranslations("halalVprasanja");

  // Število jedi na bon se ne prepisuje v odgovor — pride iz menija.
  const vrednosti: Record<string, Record<string, number>> = {
    "hfaq-4": { naBon: MENU_STATS.student },
  };

  return VPRASANJA.map((id) => ({
    id,
    q: t(`${id}.q`),
    a: t(`${id}.a`, vrednosti[id] ?? {}),
  }));
}
