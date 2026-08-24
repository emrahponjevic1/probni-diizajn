"use client";

import { useState } from "react";
import { PHONE } from "@/data/locations";
import Link from "next/link";
import styles from "./FaqPageContent.module.css";

// Clean Vector SVG Icons
const HelpCircleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.faqIconSvg}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqCategory[] = [
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

export default function FaqPageContent() {
  // Only one accordion item can be active at a time
  const [openItemId, setOpenItemId] = useState<string | null>("seh-1");

  const toggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.faqSection}>
      {/* ========================================================================= */}
      {/* GEOMETRIJSKI POLIGON (TOPLI AMBER TON - TOP: 0, RIGHT: 0) */}
      {/* ========================================================================= */}
      <div className={styles.polygonWrapper}>
        <svg
          className={styles.polygonSvg}
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMin meet"
        >
          <polygon
            points="
              750,0 
              1200,0 
              1200,320 
              960,480 
              840,330 
              480,390 
              40,450 
              510,270 
              680,150 
              750,0"
            fill="#FDE68A"
          />
        </svg>
      </div>

      {/* Background Warm Ambient Glow */}
      <div className={styles.bgWarmGlow} />

      {/* ========================================================================= */}
      {/* STRICT UNIVERSAL CONTAINER (MAX-WIDTH: 1360PX, MARGIN: 0 AUTO) */}
      {/* ========================================================================= */}
      <div className={styles.faqContainer}>
        {/* HERO HEADER */}
        <header className={styles.heroHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>POMOČ</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>CENTER POMOČI &amp; ODGOVORI</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.heroTitle}>Pogosta vprašanja — halal, boni in delovni čas</h1>

          <p className={styles.heroSubtitle}>
            Vse o 100 % halal ponudbi, veganskih jedeh, študentskih bonih z
            doplačilom 3,00 € in delovnem času obeh lokacij v Ljubljani.
          </p>
        </header>

        {/* FAQ CONTENT - 3 CATEGORIES */}
        <div className={styles.faqContentWrapper}>
          {FAQ_SECTIONS.map((category) => (
            <section key={category.id} className={styles.faqCategorySection}>
              <div className={styles.categoryHeading}>
                <span className={styles.categoryDot} />
                <h2 className={styles.categoryTitle}>{category.title}</h2>
              </div>

              <div className={styles.accordionCard}>
                {category.items.map((item) => {
                  const isOpen = openItemId === item.id;
                  return (
                    <div key={item.id} className={styles.accordionItem}>
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={`${styles.faqButton} ${
                          isOpen ? styles.faqButtonActive : ""
                        }`}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.faqQuestionText}>
                          {item.question}
                        </span>
                        <div className={styles.faqIconCircle}>
                          <PlusIcon />
                        </div>
                      </button>

                      <div
                        className={`${styles.faqAnswerWrapper} ${
                          isOpen ? styles.faqAnswerWrapperOpen : ""
                        }`}
                      >
                        <div className={styles.faqAnswerInner}>
                          <div className={styles.faqAnswerContent}>
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* SUPPORT & QUICK ACTIONS CTA CARD */}
          <div className={styles.supportCtaCard}>
            <div className={styles.ctaTextGroup}>
              <h3 className={styles.ctaTitle}>Imate še kakšno vprašanje?</h3>
              <p className={styles.ctaSubtitle}>
                Naša ekipa vam z veseljem priskoči na pomoč.
              </p>
            </div>

            <div className={styles.ctaActionsGroup}>
              <a href={`tel:${PHONE.restaurant.e164}`} className={styles.ctaCallBtn}>
                <PhoneIcon />
                <span>{PHONE.restaurant.display}</span>
              </a>
              <Link href="/meni" className={styles.ctaOrderBtn}>
                <BagIcon />
                <span>Oglejte si meni</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
