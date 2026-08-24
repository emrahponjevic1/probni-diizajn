"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";

// Clean Vector SVG Chevron
const ChevronDownSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRightSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface FaqItem {
  id: string;
  num: string;
  tag: string;
  question: string;
  answer: string;
  accent: "red" | "orange" | "dark";
  offsetClass: string;
  shadowClass: string;
}

const faqs: FaqItem[] = [
  {
    id: "hours",
    num: "01",
    tag: "DELOVNI ČAS",
    question: "KAKŠEN JE DELOVNI ČAS ŠEHEREZADE?",
    answer:
      "Šeherezada na Trubarjevi 31 je odprta vsak dan od 09:00 do 02:00, ob petkih in sobotah pa do 03:00. Šeherezada 2 na Slovenski 55 je odprta vsak dan od 08:00 do 01:00.",
    accent: "red",
    offsetClass: styles.offsetStart,
    shadowClass: styles.shadowRed,
  },
  {
    id: "halal",
    num: "02",
    tag: "KAKOVOST & HALAL",
    question: "ALI JE VSE MESO 100% HALAL CERTIFICIRANO?",
    answer:
      "Da, vse meso v naši ponudbi je 100 % certificirano halal, pripravljeno po strogih higienskih standardih, s popolno sledljivostjo in z 0 % svinjine.",
    accent: "orange",
    offsetClass: styles.offsetEnd,
    shadowClass: styles.shadowOrange,
  },
  {
    id: "boni",
    num: "03",
    tag: "ŠTUDENTSKI BONI",
    question: "KAKO DELUJEJO ŠTUDENTSKI BONI V ŠEHEREZADI?",
    answer:
      "Študenti se ob naročilu identificirate s študentsko izkaznico ali aplikacijo ŠTUDENTSKA PREHRANA. Doplačilo je 3,00 €, meni pa vključuje glavno jed, solato, jabolko in pijačo.",
    accent: "dark",
    offsetClass: styles.offsetMid,
    shadowClass: styles.shadowDark,
  },
  {
    id: "delivery",
    num: "04",
    tag: "DOSTAVA & PREVZEM",
    question: "ALI NUDITE DOSTAVO HRANE NA DOM?",
    answer:
      "Da! Naše jedi dostavljamo prek Wolta, lahko pa izberete tudi hitri osebni prevzem na katerikoli naši lokaciji po predhodnem klicu.",
    accent: "orange",
    offsetClass: styles.offsetEnd,
    shadowClass: styles.shadowOrange,
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("hours");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.faqContainer}>
        <div className={styles.userSplitGrid}>
          {/* Left Column: Sticky Header & Lockup */}
          <div className={styles.userLeftCol}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>VPRAŠANJA</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>06</span> / POGOSTA VPRAŠANJA
                </span>
                <span className={styles.chapterDash} />
              </div>
            </div>

            <h2 className={styles.leftMainHeading}>
              VSE, KAR <br className={styles.desktopBr} />
              <span className={styles.headingHighlight}>MORAŠ</span>{" "}
              <br className={styles.desktopBr} />
              VEDETI.
            </h2>

            {/* Description & CTA Button Inline Row with Auto-Wrapping */}
            <div className={styles.leadCtaRow}>
              <p className={styles.leftLeadText}>
                Nisi prepričan glede bonov, delovnega časa ali dostave? Tu so odgovori, servirani vroči.
              </p>

              <a href="/faq" className={styles.leftCtaBtn}>
                <span>Oglej Si Vsa Vprašanja (FAQ)</span>
                <ArrowRightSvg size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Staggered Accordion Cards */}
          <div className={styles.accordionList}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              const badgeColorClass =
                faq.accent === "red"
                  ? styles.badgeRed
                  : faq.accent === "orange"
                    ? styles.badgeOrange
                    : styles.badgeDark;

              return (
                <div key={faq.id} className={`${styles.accordionCardWrapper} ${faq.offsetClass}`}>
                  <div
                    onClick={() => toggle(faq.id)}
                    className={`${styles.accordionCard} ${isOpen ? styles.cardOpen : ""} ${faq.shadowClass}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggle(faq.id);
                      }
                    }}
                  >
                    {/* Floating Number Badge */}
                    <div className={`${styles.floatingBadgeNum} ${badgeColorClass}`}>
                      {faq.num}
                    </div>

                    {/* Category Tag */}
                    <div className={styles.accordionTag}>{faq.tag}</div>

                    {/* Question Row */}
                    <div className={styles.questionRow}>
                      <h3 className={styles.questionTitle}>{faq.question}</h3>

                      <div
                        className={`${styles.chevronCircle} ${isOpen ? styles.chevronCircleOpen : ""}`}
                      >
                        <ChevronDownSvg size={20} />
                      </div>
                    </div>

                    {/* Answer Grid Expansion */}
                    <div
                      className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : styles.answerClosed}`}
                    >
                      <div className={styles.answerInner}>
                        <p className={styles.answerText}>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
