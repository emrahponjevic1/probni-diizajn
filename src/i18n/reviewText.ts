import { useTranslations } from "next-intl";
import type { GoogleReview } from "@/data/reviews";

// ---------------------------------------------------------------------------
// PREVOD OZNAK OB MNENJIH
//
// Besedilo mnenja se NE prevaja. To so dobesedne besede resničnih gostov z
// Googla; prevod bi jim pripisal, česar niso rekli.
//
// Prevedeta se samo naši oznaki ob mnenju: kdaj je bilo objavljeno in v
// kakšnem kontekstu. Ti dve vrednosti dodaja Google, ne gost.
//
// Prevodi so v messages/<jezik>.json pod ključem "ocenePodatki", po id-ju
// mnenja. Kar ni prevedeno, ostane slovensko.
// ---------------------------------------------------------------------------

export function useReviewText() {
  const t = useTranslations("ocenePodatki");
  const vzemi = (kljuc: string, slovensko: string) =>
    t.has(kljuc) ? t(kljuc) : slovensko;

  return function prevediMnenje(r: GoogleReview): GoogleReview {
    return {
      ...r,
      when: vzemi(`${r.id}.kdaj`, r.when),
      context: r.context ? vzemi(`${r.id}.kontekst`, r.context) : r.context,
    };
  };
}
