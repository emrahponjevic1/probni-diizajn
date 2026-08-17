"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";

// Clean Vector SVG Icons
const ChevronDownSvg = ({ size = 18 }: { size?: number }) => (
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

const ClockSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldCheckSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const GraduationCapSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const BikeSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18.5" cy="17.5" r="3.5" />
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="15" cy="5" r="1" />
    <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

const PhoneSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

interface FaqItem {
  id: number;
  badgeNum: string;
  category: string;
  question: string;
  answer: string;
  isDarkBadge?: boolean;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    badgeNum: "01",
    category: "DELOVNI ČAS",
    question: "KAKŠEN JE DELOVNI ČAS ŠEHEREZADE?",
    answer:
      "Odprti smo vsak dan pozno v noč! Lokacija na Trubarjevi cesti 31 je odprta vse do 05:00 zjutraj za nočne lačneže, lokacija na Dunajski cesti 106 (Bežigrad) pa deluje do 04:00. Vedno sveže pečeno.",
  },
  {
    id: 2,
    badgeNum: "02",
    category: "KAKOVOST & HALAL",
    question: "ALI JE VSE MESO 100% HALAL CERTIFICIRANO?",
    answer:
      "Da, 100% vseh naših mesnih jedi ustreza strogim Halal standardom. Ponosno zagotavljamo 0% svinjskega mesa, 0% alkohola pri pripravi ter popolno sledljivost od preverjenih certificiranih rejcev.",
  },
  {
    id: 3,
    badgeNum: "03",
    category: "ŠTUDENTSKI BONI",
    question: "KAKO DELUJEJO ŠTUDENTSKI BONI V ŠEHEREZADI?",
    answer:
      "Študentske bone sprejemamo na obeh lokacijah (Trubarjeva in Dunajska). Ob minimalnem doplačilu prejmete celoten topel meni: glavno jed po izbiri (kebab, wrap, falafel), juho ali solato, sveže sadje in vodo.",
    isDarkBadge: true,
  },
  {
    id: 4,
    badgeNum: "04",
    category: "DOSTAVA & PREVZEM",
    question: "ALI NUDITE DOSTAVO HRANE NA DOM ALI OSEBNI PREVZEM?",
    answer:
      "Seveda! Naročite lahko preko priljubljenih dostavnih služb (Wolt, Glovo) ali pa naročilo oddate vnaprej po telefonu in hrana vas bo topla čakala za hiter osebni prevzem brez čakanja.",
  },
];

export default function FaqSection() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3 | 4>(1);
  const [openIds, setOpenIds] = useState<number[]>([1]); // First FAQ open by default
  const [activeCategory, setActiveCategory] = useState<string>("VSE");

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === "VSE"
      ? faqData
      : faqData.filter((item) => item.category.includes(activeCategory));

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.bgWarmGlow} />

      <div className={styles.faqContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnov FAQ Sekcije</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: Vaš Layout (Split-Accordion Badges)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: 2-Kolonski Bento FAQ Grid
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Filtrirane Kategorije (Tabs)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(4)}
              className={`${styles.styleTabBtn} ${activeStyle === 4 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 4: Editorial Split Hub + Kontakt
            </button>
          </div>
        </div>

        {/* ==================================================================
            OPCIJA 1: USER LAYOUT (NUMBERED FLOATING BADGES SPLIT-ACCORDION)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.userSplitGrid}>
            {/* Left Column: Heading, Lead & CTA */}
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
                VSE, KAR <span className={styles.headingHighlight}>MORAŠ</span> VEDETI.
              </h2>

              <p className={styles.leftLeadText}>
                Nisi prepričan glede bonov, delovnega časa ali dostave? Tu so odgovori, servirani vroči.
              </p>

              <a href="#kontakt" className={styles.leftCtaBtn}>
                <span>Oglej Si Vsa Vprašanja (FAQ)</span>
                <ArrowRightSvg size={16} />
              </a>
            </div>

            {/* Right Column: Numbered Accordion Cards */}
            <div className={styles.accordionList}>
              {faqData.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ""}`}
                  >
                    {/* Floating Numbered Badge */}
                    <div
                      className={`${styles.floatingBadgeNum} ${faq.isDarkBadge ? styles.floatingBadgeNumDark : ""}`}
                    >
                      {faq.badgeNum}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className={styles.accordionHeaderBtn}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.accordionHeaderMeta}>
                        <span className={styles.accordionCategoryTag}>{faq.category}</span>
                        <h3 className={styles.accordionQuestionTitle}>{faq.question}</h3>
                      </div>

                      <div
                        className={`${styles.chevronCircle} ${isOpen ? styles.chevronCircleOpen : ""}`}
                      >
                        <ChevronDownSvg size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: 2-COLUMN BENTO FAQ GRID
            ================================================================== */}
        {activeStyle === 2 && (
          <div>
            <div className={styles.sectionHeader}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>FAQ</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>06</span> / POGOSTA VPRAŠANJA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h2 className={styles.sectionTitle}>
                Pogosto zastavljena vprašanja na enem mestu.
              </h2>
            </div>

            <div className={styles.bentoGridFaq}>
              <div className={styles.bentoFaqCard}>
                <div className={styles.bentoFaqIconRow}>
                  <div className={styles.bentoFaqIconBox}>
                    <ClockSvg size={22} />
                  </div>
                  <span className={styles.accordionCategoryTag}>Urnik &amp; Nočni obisk</span>
                </div>
                <h3 className={styles.bentoFaqQuestion}>Kakšen je delovni čas?</h3>
                <p className={styles.bentoFaqAnswer}>
                  Trubarjeva 31 dela vsak dan do 05:00 zjutraj, Dunajska 106 pa do 04:00. Pripravljeni kadarkoli ogladnite!
                </p>
              </div>

              <div className={styles.bentoFaqCard}>
                <div className={styles.bentoFaqIconRow}>
                  <div className={styles.bentoFaqIconBox}>
                    <ShieldCheckSvg size={22} />
                  </div>
                  <span className={styles.accordionCategoryTag}>100% Halal Meso</span>
                </div>
                <h3 className={styles.bentoFaqQuestion}>Ali je meso halal?</h3>
                <p className={styles.bentoFaqAnswer}>
                  Vsa naša hrana ima uraden Halal certifikat. Zagotavljamo 0% svinjine in najvišjo higiensko čistost.
                </p>
              </div>

              <div className={styles.bentoFaqCard}>
                <div className={styles.bentoFaqIconRow}>
                  <div className={styles.bentoFaqIconBox}>
                    <GraduationCapSvg size={22} />
                  </div>
                  <span className={styles.accordionCategoryTag}>Študentska Prehrana</span>
                </div>
                <h3 className={styles.bentoFaqQuestion}>Kako koristiti bone?</h3>
                <p className={styles.bentoFaqAnswer}>
                  Prislonite telefon na terminal. Za minimalno doplačilo prejmete topel obrok, solato/juho, sadje in vodo.
                </p>
              </div>

              <div className={styles.bentoFaqCard}>
                <div className={styles.bentoFaqIconRow}>
                  <div className={styles.bentoFaqIconBox}>
                    <BikeSvg size={22} />
                  </div>
                  <span className={styles.accordionCategoryTag}>Dostava &amp; Prevzem</span>
                </div>
                <h3 className={styles.bentoFaqQuestion}>Ali dostavljate na dom?</h3>
                <p className={styles.bentoFaqAnswer}>
                  Naročite preko Wolt ali Glovo, ali pa naročite po telefonu za takojšen osebni prevzem brez čakanja.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: CATEGORY TABS FILTERED ACCORDION
            ================================================================== */}
        {activeStyle === 3 && (
          <div>
            <div className={styles.sectionHeader} style={{ alignItems: "center", textAlign: "center", margin: "0 auto 2.5rem auto" }}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark} style={{ left: "50%", transform: "translate(-50%, -50%)" }}>ODGOVORI</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>06</span> / POGOSTA VPRAŠANJA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h2 className={styles.sectionTitle}>Vse, kar morate vedeti.</h2>
            </div>

            {/* Filter Tabs */}
            <div className={styles.categoryTabsRow}>
              {["VSE", "DELOVNI ČAS", "HALAL", "ŠTUDENTSKI BONI", "DOSTAVA"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.catFilterBtn} ${activeCategory === cat ? styles.catFilterBtnActive : ""}`}
                >
                  {cat === "VSE" ? "Vsa Vprašanja" : cat}
                </button>
              ))}
            </div>

            {/* Filtered Accordion List */}
            <div className={styles.centerAccordionList}>
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className={styles.accordionHeaderBtn}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.accordionHeaderMeta}>
                        <span className={styles.accordionCategoryTag}>{faq.category}</span>
                        <h3 className={styles.accordionQuestionTitle}>{faq.question}</h3>
                      </div>

                      <div
                        className={`${styles.chevronCircle} ${isOpen ? styles.chevronCircleOpen : ""}`}
                      >
                        <ChevronDownSvg size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 4: EDITORIAL SPLIT HUB + DIRECT CONTACT CARD
            ================================================================== */}
        {activeStyle === 4 && (
          <div className={styles.userSplitGrid}>
            <div className={styles.userLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>POMOČ</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>06</span> / POGOSTA VPRAŠANJA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h2 className={styles.leftMainHeading}>Hitri odgovori &amp; Pomoč.</h2>

              <p className={styles.leftLeadText}>
                Zbrali smo najpogostejša vprašanja naših gostov. Za specifična naročila pa nas lahko neposredno pokličete.
              </p>

              <div className={styles.hubContactCard}>
                <h4 className={styles.hubContactTitle}>Niste našli odgovora?</h4>
                <p className={styles.hubContactDesc}>
                  Naša prijazna ekipa na Trubarjevi in Dunajski vam je vedno na voljo.
                </p>
                <a href="tel:+38612345678" className={styles.hubPhoneBtn}>
                  <PhoneSvg size={18} />
                  <span>+386 (01) 430 52 40</span>
                </a>
              </div>
            </div>

            <div className={styles.accordionList}>
              {faqData.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className={styles.accordionHeaderBtn}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.accordionHeaderMeta}>
                        <span className={styles.accordionCategoryTag}>{faq.category}</span>
                        <h3 className={styles.accordionQuestionTitle}>{faq.question}</h3>
                      </div>

                      <div
                        className={`${styles.chevronCircle} ${isOpen ? styles.chevronCircleOpen : ""}`}
                      >
                        <ChevronDownSvg size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
