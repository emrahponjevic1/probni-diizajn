/**
 * FAQPage — strukturirani podatki za pogosta vprašanja.
 *
 * Google zna takšna vprašanja prikazati razširjeno pod zadetkom. Pogoj je,
 * da so vprašanja in odgovori VIDNI na strani — skritih ali izmišljenih ne
 * sme biti. Zato ta komponenta ne nosi svojega besedila, ampak dobi natanko
 * tisto, kar stran že prikazuje.
 *
 * Uporaba na strežniški strani (page.tsx), ne v odjemalski komponenti.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export default function FaqJsonLd({ items }: { items: readonly FaqEntry[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
