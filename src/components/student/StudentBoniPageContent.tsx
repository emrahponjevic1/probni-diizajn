"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { hoursSummary } from "@/lib/hours";
import { useLocationText } from "@/i18n/locationText";
import { useMenuText } from "@/i18n/menuText";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { createPortal } from "react-dom";
import { LOCATIONS, LOCATION_SLUG, PHONE } from "@/data/locations";
import {
  MENU_ITEMS,
  MENU_STATS,
  STUDENT_BON,
  MenuItem,
} from "@/components/menu/MenuData";
import {
  BON_APPS,
  BON_RULES,
  STUDENT_SUBSIDY,
  bonWindow,
} from "@/data/studentski-boni";
import StatusBadge from "@/components/locations/StatusBadge";
import styles from "./StudentBoniPageContent.module.css";

/** 5.19 -> "5,19 €" */
function eur(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

const MEAL_VALUE = STUDENT_SUBSIDY.subsidy + STUDENT_BON.surcharge;

// ---------------------------------------------------------------------------
// CLEAN VECTOR SVG ICONS (NO EMOJIS)
// ---------------------------------------------------------------------------

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const UtensilsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 11v11" />
    <path d="M6 2v20" />
    <path d="M9 2v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
  </svg>
);

const SaladIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M4 11h16a8 8 0 0 1-16 0z" />
    <path d="M6 8V5" />
    <path d="M10 8V4" />
    <path d="M14 8V5" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </svg>
);

const AppleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 20.94c1.5 0 2.75-1.06 4-1.06 1.3 0 2.4 1.06 4 1.06 1.7 0 3-1.6 3-3.5 0-3.5-2.5-6.5-6-6.5-1.5 0-2.5.5-3 1-.5-.5-1.5-1-3-1-3.5 0-6 3-6 6.5 0 1.9 1.3 3.5 3 3.5 1.6 0 2.7-1.06 4-1.06z" />
    <path d="M12 10V6c0-2 2-3 4-3" />
  </svg>
);

const DrinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...stroke} strokeWidth={2.2}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IdIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M5 16c.7-1.4 2-2 3.5-2s2.8.6 3.5 2" />
    <line x1="15" y1="10" x2="19" y2="10" />
    <line x1="15" y1="14" x2="19" y2="14" />
  </svg>
);

const RepeatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...stroke} strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ---------------------------------------------------------------------------
// TERMINAL SVG ILLUSTRATION
// ---------------------------------------------------------------------------

function TerminalIllustration({ target }: { target: "phone" | "card" }) {
  const arrowId = `bonArrow-${target}`;
  return (
    <svg
      viewBox="0 0 200 150"
      className={styles.terminalSvg}
      role="img"
      aria-label={
        target === "phone"
          ? "Mobilni telefon prislonjen na spodnji rob terminala"
          : "Kartica prislonjena na zgornji rob terminala s strani"
      }
    >
      {/* terminal */}
      <rect
        x="62"
        y="26"
        width="62"
        height="104"
        rx="12"
        className={styles.svgTerminalBody}
      />
      <rect
        x="70"
        y="34"
        width="46"
        height="34"
        rx="5"
        className={styles.svgTerminalScreen}
      />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={73 + col * 14}
            y={76 + row * 13}
            width="10"
            height="9"
            rx="2.5"
            className={styles.svgTerminalKey}
          />
        ))
      )}

      {target === "phone" ? (
        <>
          <rect
            x="24"
            y="92"
            width="34"
            height="52"
            rx="7"
            className={styles.svgDevice}
          />
          <rect
            x="30"
            y="98"
            width="22"
            height="34"
            rx="3"
            className={styles.svgDeviceScreen}
          />
          <path
            d="M60 118h6"
            className={styles.svgArrow}
            markerEnd={`url(#${arrowId})`}
          />
        </>
      ) : (
        <>
          <rect
            x="132"
            y="18"
            width="48"
            height="32"
            rx="5"
            className={styles.svgDevice}
          />
          <path
            d="M148 40c3-3 3-8 0-11M153 43c5-5 5-13 0-18"
            className={styles.svgWave}
          />
          <path
            d="M130 40h-6"
            className={styles.svgArrow}
            markerEnd={`url(#${arrowId})`}
          />
        </>
      )}

      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9 z" className={styles.svgArrowHead} />
        </marker>
      </defs>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA (FAQ DATA)
// ---------------------------------------------------------------------------

interface StudentFaq {
  id: string;
  q: string;
  a: string;
}

// ---------------------------------------------------------------------------
// GLAVNA KOMPONENTA
// ---------------------------------------------------------------------------

export default function StudentBoniPageContent() {
  // Besedila so v messages/<jezik>.json pod ključem "boniStran".
  const t = useTranslations("boniStran");

  // Urnik se ne prepisuje v besedilo — izlušči se iz locations.ts.
  // Kratek zapis delovnega časa se prevede; ure same ostanejo iz locations.ts.
  const prevediLokal = useLocationText();
  const [prvaLok, drugaLok] = LOCATIONS;
  const urnikPrva = hoursSummary(prvaLok.hours);
  const urnikDruga = hoursSummary(drugaLok.hours);

  const STUDENT_FAQS: StudentFaq[] = [
    { id: "faq-1", q: t("vprasanja.faq-1.q"), a: t("vprasanja.faq-1.a") },
    { id: "faq-2", q: t("vprasanja.faq-2.q"), a: t("vprasanja.faq-2.a") },
    { id: "faq-3", q: t("vprasanja.faq-3.q"), a: t("vprasanja.faq-3.a") },
    {
      id: "faq-4",
      q: t("vprasanja.faq-4.q"),
      a: t("vprasanja.faq-4.a", { razmik: BON_RULES.gapHours }),
    },
    {
      id: "faq-5",
      q: t("vprasanja.faq-5.q"),
      a: t("vprasanja.faq-5.a", {
        brezmesnih: MENU_STATS.vegan + MENU_STATS.vegetarian,
      }),
    },
    { id: "faq-6", q: t("vprasanja.faq-6.q"), a: t("vprasanja.faq-6.a") },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mealsPerWeek, setMealsPerWeek] = useState<number>(4);
  const [activeDeviceTab, setActiveDeviceTab] = useState<"phone" | "card">("phone");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Vse jedi, ki so na voljo na bon (19 jedi)
  // Jedi morajo skozi prevod, sicer se na tuji strani pokažejo slovenska
  // imena in opisi — enako kot na strani /meni.
  const prevediJed = useMenuText();

  const studentItems = useMemo(
    () => MENU_ITEMS.map(prevediJed).filter((item) => item.student),
    []
  );

  // Kategorije za filtre z ličnimi kratkimi oznakami
  const filterCategories = useMemo(
    () => [
      { id: "all", label: t("filterVse"), count: studentItems.length },
      {
        id: "kebab",
        label: t("filterKebab"),
        count: studentItems.filter((i) => i.category === "kebab").length,
      },
      {
        id: "pizza",
        label: t("filterPizza"),
        count: studentItems.filter((i) => i.category === "pizza").length,
      },
      {
        id: "kroznik",
        label: t("filterKroznik"),
        count: studentItems.filter((i) => i.category === "kroznik").length,
      },
      {
        id: "falafel",
        label: t("filterFalafel"),
        count: studentItems.filter((i) => i.category === "falafel").length,
      },
      {
        id: "vegi",
        label: t("filterBrezmesno"),
        count: studentItems.filter(
          (i) => i.diet === "vegan" || i.diet === "vegetarian"
        ).length,
      },
    ],
    [studentItems]
  );

  // Filtrirane jedi po izbrani kategoriji
  const filteredDishes = useMemo(() => {
    if (activeCategory === "all") return studentItems;
    if (activeCategory === "vegi")
      return studentItems.filter((i) => i.diet === "vegan" || i.diet === "vegetarian");
    return studentItems.filter((item) => item.category === activeCategory);
  }, [studentItems, activeCategory]);

  // Izračun mesečnega prihranka za kalkulator
  const monthlyMeals = mealsPerWeek * 4.33;
  const monthlySavings = monthlyMeals * (7.5 - STUDENT_BON.surcharge);

  return (
    <section className={styles.page}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.container}>
        {/* ===============================================================
            1. MASTER HERO SECTION
        =============================================================== */}
        <section className={styles.heroSection} id="boni-hero">
          <div className={styles.heroMasterGrid}>
            {/* Left Column: Editorial Header & Metrics */}
            <div className={styles.heroLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>{t("oznaka")}</span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.heroH1}>
                {t.rich("naslov", {
                  doplacilo: eur(STUDENT_BON.surcharge),
                  poudarek: (chunks) => <span className={styles.heroH1Accent}>{chunks}</span>,
                })}
              </h1>

              <p className={styles.heroLead}>
                {t("uvod", { naBon: MENU_STATS.student, vseh: MENU_STATS.total })}
              </p>

              {/* Bento Fact Grid */}
              <div className={styles.heroFactGrid}>
                <div className={`${styles.heroFactCard} ${styles.heroFactCardHighlight}`}>
                  <span className={styles.heroFactLabel}>{t("factDoplacilo")}</span>
                  <span className={`${styles.heroFactValue} ${styles.heroFactValueAccent}`}>
                    {eur(STUDENT_BON.surcharge)}
                  </span>
                  <span className={styles.heroFactSubtitle}>{t("factDoplaciloPod")}</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factJedi")}</span>
                  <span className={styles.heroFactValue}>
                    {MENU_STATS.student}{" "}
                    <span style={{ fontSize: "0.85rem", color: "#a8a29e" }}>
                      / {MENU_STATS.total}
                    </span>
                  </span>
                  <span className={styles.heroFactSubtitle}>
                    {t("factJediPod", { stevilo: MENU_STATS.vegan + MENU_STATS.vegetarian })}
                  </span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factKvota")}</span>
                  <span className={styles.heroFactValue}>{t("factKvotaVrednost", { stevilo: BON_RULES.perDay })}</span>
                  <span className={styles.heroFactSubtitle}>{t("factKvotaPod")}</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factLokaciji")}</span>
                  <span className={styles.heroFactValue}>{t("factLokacijiVrednost", { stevilo: LOCATIONS.length })}</span>
                  <span className={styles.heroFactSubtitle}>{t("factLokacijiPod")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.heroActionsRow}>
                <a href="#jedi-na-bon" className={styles.btnPrimary}>
                  <span>{t("gumbJedi", { stevilo: MENU_STATS.student })}</span>
                  <ArrowRightIcon />
                </a>
                <a href="#kako-unovciti" className={styles.btnSecondary}>
                  <span>{t("gumbKakoUnovciti")}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Bento Card */}
            <div className={styles.heroVisualCard}>
              <div className={styles.heroVisualMediaBox}>
                <Image
                  src="/images/seherezada-student-meal.avif"
                  alt={t("altObrok")}
                  width={600}
                  height={450}
                  priority
                  className={styles.heroVisualImg}
                />
                <div className={styles.heroVisualBadgeFloating}>
                  <UtensilsIcon />
                  <span>{t("znackaPaket")}</span>
                </div>
              </div>

              <div className={styles.heroVisualFooterStrip}>
                <div className={styles.heroVisualFooterText}>
                  {t("polnaVrednost")} <strong>{eur(MEAL_VALUE)}</strong>
                  <span>{t("drzavaSubvencionira", { znesek: eur(STUDENT_SUBSIDY.subsidy) })}</span>
                </div>
                <span className={styles.heroVisualTagPill}>{t("placasLe", { znesek: eur(STUDENT_BON.surcharge) })}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            2. SECTION: FINANČNI IZRAČUN & KALKULATOR PRIHRANKOV
        =============================================================== */}
        <section className={styles.calcSection} id="izracun-prihranka">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("izracunVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("izracunOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("izracunNaslov")}</h2>
            <p className={styles.sectionSubtitle}>
              {t("izracunPodnaslov", { doplacilo: eur(STUDENT_BON.surcharge) })}
            </p>
          </div>

          {/* Math Equation Formula */}
          <div className={styles.mathEquationGrid}>
            <div className={styles.mathCard}>
              <span className={styles.mathCardLabel}>{t("subvencijaDrzave")}</span>
              <span className={styles.mathCardValue}>
                {eur(STUDENT_SUBSIDY.subsidy)}
              </span>
              <p className={styles.mathCardDesc}>{t("subvencijaOpis")}</p>
            </div>

            <div className={styles.mathOperatorSign}>+</div>

            <div className={`${styles.mathCard} ${styles.mathCardUser}`}>
              <span className={styles.mathCardLabel}>{t("tvojeDoplacilo")}</span>
              <span className={styles.mathCardValue}>
                {eur(STUDENT_BON.surcharge)}
              </span>
              <p className={styles.mathCardDesc}>{t("doplaciloOpis")}</p>
            </div>

            <div className={styles.mathOperatorSign}>=</div>

            <div className={`${styles.mathCard} ${styles.mathCardTotal}`}>
              <span className={styles.mathCardLabel}>{t("vrednostObroka")}</span>
              <span className={styles.mathCardValue}>{eur(MEAL_VALUE)}</span>
              <p className={styles.mathCardDesc}>{t("vrednostOpis")}</p>
            </div>
          </div>

          {/* Interactive Savings Calculator */}
          <div className={styles.savingsInteractiveBox}>
            <div>
              <h3 className={styles.savingsControlsTitle}>{t("kalkulatorNaslov")}</h3>
              <p className={styles.savingsControlsDesc}>{t("kalkulatorOpis")}</p>

              <div className={styles.mealsSelectorRow}>
                {[2, 4, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMealsPerWeek(num)}
                    className={`${styles.mealChoiceBtn} ${
                      mealsPerWeek === num ? styles.mealChoiceBtnActive : ""
                    }`}
                  >
                    {t("obrokovNaTeden", { stevilo: num })}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.savingsResultCard}>
              <span className={styles.savingsResultLabel}>{t("mesecniPrihranek")}</span>
              <span className={styles.savingsResultAmount}>
                ~{Math.round(monthlySavings)} €
              </span>
              <p className={styles.savingsResultNote}>
                {t("prihranekOpomba", { stevilo: mealsPerWeek * 4 })}
              </p>
            </div>
          </div>
        </section>

        {/* ===============================================================
            3. SECTION: 4-DELNI POLNI MENI ("KAJ DOBIŠ")
        =============================================================== */}
        <section className={styles.includesSection} id="kaj-dobis">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("paketVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("paketOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("paketNaslov")}</h2>
            <p className={styles.sectionSubtitle}>
              {t("paketPodnaslov", { doplacilo: eur(STUDENT_BON.surcharge) })}
            </p>
          </div>

          <div className={styles.fourPartGrid}>
            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <UtensilsIcon />
              </div>
              <span className={styles.packageIndexTag}>{t("paket1Oznaka")}</span>
              <h3 className={styles.packageTitle}>{t("paket1Naslov")}</h3>
              <p className={styles.packageDesc}>
                {t("paket1Opis", { stevilo: MENU_STATS.student })}
              </p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>{t("paket1Znacka")}</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <SaladIcon />
              </div>
              <span className={styles.packageIndexTag}>{t("paket2Oznaka")}</span>
              <h3 className={styles.packageTitle}>{t("paket2Naslov")}</h3>
              <p className={styles.packageDesc}>{t("paket2Opis")}</p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>{t("paket2Znacka")}</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <AppleIcon />
              </div>
              <span className={styles.packageIndexTag}>{t("paket3Oznaka")}</span>
              <h3 className={styles.packageTitle}>{t("paket3Naslov")}</h3>
              <p className={styles.packageDesc}>{t("paket3Opis")}</p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>{t("paket3Znacka")}</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <DrinkIcon />
              </div>
              <span className={styles.packageIndexTag}>{t("paket4Oznaka")}</span>
              <h3 className={styles.packageTitle}>{t("paket4Naslov")}</h3>
              <p className={styles.packageDesc}>{t("paket4Opis")}</p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>{t("paket4Znacka")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            4. SECTION: INTERAKTIVNI MENI JEDI NA BON (19 JEDI)
        =============================================================== */}
        <section className={styles.dishShowcaseSection} id="jedi-na-bon">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("izbiraVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("izbiraOznaka", { stevilo: MENU_STATS.student })}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("izbiraNaslov")}</h2>
            <p className={styles.sectionSubtitle}>
              {t("izbiraPodnaslov", {
                stevilo: MENU_STATS.student,
                doplacilo: eur(STUDENT_BON.surcharge),
              })}
            </p>
          </div>

          {/* Filter Pills with smooth scrollable track */}
          <div className={styles.filterPillsWrapper}>
            <div className={styles.filterTabsRow}>
              {filterCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`${styles.filterTabBtn} ${
                      isActive ? styles.filterTabBtnActive : ""
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={styles.filterTabCount}>{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dish Cards Grid (Desktop: 3-Col Grid / Tablet & Mobile: ListView) */}
          <div className={styles.dishCardsGrid}>
            {filteredDishes.map((dish) => (
              <article key={dish.id} className={styles.dishCard}>
                <div
                  className={styles.dishCardImgBox}
                  onClick={() => setModalDish(dish)}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={400}
                    height={250}
                    className={styles.dishCardImg}
                  />
                  <div className={styles.dishCardTopBadges}>
                    <span className={styles.badgeCategory}>{dish.categoryLabel}</span>
                    {dish.diet === "vegan" && (
                      <span className={styles.badgeDietVegi}>{t("znackaVegansko")}</span>
                    )}
                    {dish.diet === "vegetarian" && (
                      <span className={styles.badgeDietVegi}>{t("znackaVegetarijansko")}</span>
                    )}
                  </div>
                </div>

                <div className={styles.dishCardBody}>
                  <div className={styles.dishCardHeaderRow}>
                    <h3
                      className={styles.dishCardTitle}
                      onClick={() => setModalDish(dish)}
                    >
                      {dish.name}
                    </h3>
                    <div className={styles.dishCardMobileBadges}>
                      {dish.diet === "vegan" && (
                        <span className={styles.mobileDietBadge}>{t("znackaVegansko")}</span>
                      )}
                      {dish.diet === "vegetarian" && (
                        <span className={styles.mobileDietBadge}>{t("znackaVegi")}</span>
                      )}
                    </div>
                  </div>

                  <p className={styles.dishCardDesc}>{dish.desc}</p>

                  <div className={styles.dishCardPriceFooter}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceOldRow}>
                        {t("rednaCena", { cena: eur(dish.price) })}
                      </span>
                      <div className={styles.priceMainRow}>
                        <span className={styles.priceSurcharge}>
                          {eur(STUDENT_BON.surcharge)}
                        </span>
                        <span className={styles.priceSubtext}>{t("naBon")}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalDish(dish)}
                      className={styles.btnDetailModal}
                      aria-label={t("podrobnostiOznaka", { ime: dish.name })}
                    >
                      <InfoIcon />
                      <span>{t("gumbSestavine")}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===============================================================
            5. SECTION: DELOVNI ČAS & VELJAVNOST BONOV PO LOKACIJAH
        =============================================================== */}
        <section className={styles.locationsSection} id="veljavnost-in-lokacije">
          <div className={styles.sectionHeaderLeft}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>{t("lokacijeVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("lokacijeOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("lokacijeNaslov")}</h2>
            <p className={styles.sectionSubtitle}>
              {t("lokacijePodnaslov", { od: BON_RULES.windowFrom, do: BON_RULES.windowTo })}
            </p>
          </div>

          <div className={styles.locGrid}>
            {LOCATIONS.map(prevediLokal).map((loc) => {
              const win = bonWindow(loc.hours);
              return (
                <div key={loc.id} className={styles.locCard}>
                  <div className={styles.locCardTop}>
                    <div>
                      <h3 className={styles.locCardName}>{loc.name}</h3>
                      <div className={styles.locCardAddress}>
                        <PinIcon />
                        <span>{loc.fullAddress}</span>
                      </div>
                    </div>
                    <StatusBadge hours={loc.hours} />
                  </div>

                  <div className={styles.locTimesBox}>
                    <div className={styles.locTimeRow}>
                      <span className={styles.locTimeLabel}>
                        <ClockIcon />
                        <span>{t("odpiralniCas")}</span>
                      </span>
                      <span className={styles.locTimeVal}>{loc.hoursShort}</span>
                    </div>
                    <div className={styles.locTimeRow}>
                      <span className={styles.locTimeLabel}>
                        <UtensilsIcon />
                        <span>{t("bonVelja")}</span>
                      </span>
                      <span className={styles.locTimeValVoucher}>
                        {win.from} – {win.to}
                      </span>
                    </div>
                  </div>

                  <div className={styles.locActionRow}>
                    <Link
                      href={{ pathname: "/lokacije/[slug]", params: { slug: LOCATION_SLUG[loc.id] } }}
                      className={`${styles.locBtn} ${styles.locBtnPrimary}`}
                    >
                      <span>{t("podrobnostiPoslovalnice")}</span>
                      <ArrowRightIcon />
                    </Link>
                    <a
                      href={`tel:${PHONE.restaurant.e164}`}
                      className={`${styles.locBtn} ${styles.locBtnSecondary}`}
                    >
                      <PhoneIcon />
                      <span>{PHONE.restaurant.display}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Midnight Advisory Alert */}
          <div className={styles.nightWarningCard}>
            <div className={styles.nightWarnIcon}>
              <AlertIcon />
            </div>
            <div>
              <h4 className={styles.nightWarnTitle}>{t("polnocNaslov")}</h4>
              <p className={styles.nightWarnText}>
                {t("polnocOpis", {
                  do2: urnikDruga.closes,
                  do1: urnikPrva.closes,
                  vikend1: urnikPrva.weekendCloses ?? urnikPrva.closes,
                  oknoDo: BON_RULES.windowTo,
                })}
              </p>
            </div>
          </div>
        </section>

        {/* ===============================================================
            6. SECTION: KAKO UNOVČITI BON & PRAVILA
        =============================================================== */}
        <section className={styles.terminalSection} id="kako-unovciti">
          <div className={styles.sectionHeaderLeft}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>{t("navodilaVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("navodilaOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("navodilaNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("navodilaPodnaslov")}</p>
          </div>

          <div className={styles.terminalMasterGrid}>
            {/* Left Card: Interactive Device Instruction Box */}
            <div className={styles.terminalInteractiveCard}>
              <div className={styles.deviceTabButtons}>
                <button
                  type="button"
                  onClick={() => setActiveDeviceTab("phone")}
                  className={`${styles.deviceTabBtn} ${
                    activeDeviceTab === "phone" ? styles.deviceTabBtnActive : ""
                  }`}
                >
                  <span>{t("zavihekTelefon")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceTab("card")}
                  className={`${styles.deviceTabBtn} ${
                    activeDeviceTab === "card" ? styles.deviceTabBtnActive : ""
                  }`}
                >
                  <span>{t("zavihekKartica")}</span>
                </button>
              </div>

              <div className={styles.terminalSvgBox}>
                <TerminalIllustration target={activeDeviceTab} />
              </div>

              {activeDeviceTab === "phone" ? (
                <div>
                  <h3 className={styles.deviceInstructionTitle}>{t("telefonNaslov")}</h3>
                  <p className={styles.deviceInstructionText}>
                    {t.rich("telefonOpis", { b: (chunks) => <strong>{chunks}</strong> })}
                  </p>
                  <ul className={styles.deviceTipsList}>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>
                        {t.rich("telefonNasvet1", { b: (chunks) => <strong>{chunks}</strong> })}
                      </span>
                    </li>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>
                        {t.rich("telefonNasvet2", { b: (chunks) => <strong>{chunks}</strong> })}
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className={styles.deviceInstructionTitle}>{t("karticaNaslov")}</h3>
                  <p className={styles.deviceInstructionText}>
                    {t.rich("karticaOpis", { b: (chunks) => <strong>{chunks}</strong> })}
                  </p>
                  <ul className={styles.deviceTipsList}>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>{t("karticaNasvet1")}</span>
                    </li>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>{t("karticaNasvet2")}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Right Card: 4 Essential Rules */}
            <div className={styles.rulesContainer}>
              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <RepeatIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>
                    {t("pravilo1Naslov", { stevilo: BON_RULES.perDay })}
                  </h4>
                  <p className={styles.ruleDesc}>
                    {t("pravilo1Opis", { stevilo: BON_RULES.perDay })}
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <ClockIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>
                    {t("pravilo2Naslov", { stevilo: BON_RULES.gapHours })}
                  </h4>
                  <p className={styles.ruleDesc}>
                    {t("pravilo2Opis", { stevilo: BON_RULES.gapHours })}
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <ClockIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>
                    {t("pravilo3Naslov", { od: BON_RULES.windowFrom, do: BON_RULES.windowTo })}
                  </h4>
                  <p className={styles.ruleDesc}>
                    {t("pravilo3Opis", { od: BON_RULES.windowFrom, do: BON_RULES.windowTo })}
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <IdIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>{t("pravilo4Naslov")}</h4>
                  <p className={styles.ruleDesc}>{t("pravilo4Opis")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            7. SECTION: VODIČ ZA BRUCE (3 KORAKI)
        =============================================================== */}
        <section className={styles.onboardingSection} id="prvi-vpis">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("bruciVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("bruciOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("bruciNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("bruciPodnaslov")}</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>1</div>
              <h3 className={styles.stepTitle}>{t("korak1Naslov")}</h3>
              <p className={styles.stepBody}>{t("korak1Opis")}</p>
              <a
                href={STUDENT_SUBSIDY.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stepExternalLink}
              >
                {t("korak1Povezava", { vir: STUDENT_SUBSIDY.sourceName })}
              </a>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>2</div>
              <h3 className={styles.stepTitle}>{t("korak2Naslov")}</h3>
              <p className={styles.stepBody}>{t("korak2Opis")}</p>
              <span style={{ fontSize: "0.85rem", color: "#047857", fontWeight: 700 }}>
                {t("korak2Opomba")}
              </span>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>3</div>
              <h3 className={styles.stepTitle}>{t("korak3Naslov")}</h3>
              <p className={styles.stepBody}>{t("korak3Opis")}</p>
              <div className={styles.appLinksRow}>
                <a
                  href={BON_APPS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.appStoreBtn}
                >
                  <span>App Store (iOS)</span>
                </a>
                <a
                  href={BON_APPS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.appStoreBtn}
                >
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            8. SECTION: ŠTUDENTSKA POGOSTA VPRAŠANJA (ACCORDION)
        =============================================================== */}
        <section className={styles.faqSection} id="student-faq">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("faqVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("faqOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("faqNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("faqPodnaslov")}</p>
          </div>

          <div className={styles.faqContainerBox}>
            {STUDENT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className={styles.faqQuestionBtn}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestionText}>{faq.q}</span>
                    <span className={styles.faqChevron}>
                      <ChevronDownIcon />
                    </span>
                  </button>

                  {isOpen && (
                    <div className={styles.faqAnswerBox}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ===============================================================
            9. CTA & LEGAL TRANSPARENCY
        =============================================================== */}
        <section className={styles.ctaBox}>
          <div>
            <h2 className={styles.ctaTitle}>
              {t("ctaNaslov", { stevilo: MENU_STATS.student })}
            </h2>
            <p className={styles.ctaText}>
              {t("ctaOpis", {
                vseh: MENU_STATS.total,
                naBon: MENU_STATS.student,
                vegan: MENU_STATS.vegan,
                vegetarijanskih: MENU_STATS.vegetarian,
              })}
            </p>
          </div>

          <div className={styles.ctaBtnGroup}>
            <Link href="/meni" className={styles.btnPrimary}>
              <span>{t("ctaMeni")}</span>
              <ArrowRightIcon />
            </Link>
            <Link href="/kontakt" className={styles.btnSecondary}>
              <span>{t("ctaKjeSmo")}</span>
            </Link>
          </div>
        </section>

        {/* Legal Transparency Note */}
        <footer className={styles.sourceLegalBox}>
          <span className={styles.sourceLegalLabel}>{t("virOznaka")}</span>
          <p className={styles.sourceLegalText}>
            {t("virZacetek", { znesek: eur(STUDENT_SUBSIDY.subsidy) })}{" "}
            <a
              href={STUDENT_SUBSIDY.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLegalLink}
            >
              {STUDENT_SUBSIDY.sourceName}
            </a>
            {t("virKonec", {
              datum: STUDENT_SUBSIDY.checkedOn,
              doplacilo: eur(STUDENT_BON.surcharge),
            })}
          </p>
        </footer>
      </div>

      {/* ===============================================================
          10. INTERACTIVE FOOD DETAIL MODAL (PORTAL)
      =============================================================== */}
      {modalDish &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={styles.modalBackdrop}
            onClick={() => setModalDish(null)}
          >
            <div
              className={styles.modalContainer}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className={styles.modalScrollBody}>
                {/* Visual Header Row */}
                <div className={styles.modalVisualRow}>
                  <div className={styles.modalDishImgWrapper}>
                    <Image
                      src={modalDish.image}
                      alt={modalDish.name}
                      width={160}
                      height={160}
                      className={styles.modalDishImg}
                    />
                  </div>

                  <div className={styles.modalTitleMeta}>
                    <h3 className={styles.modalDishTitle}>{modalDish.name}</h3>
                    <div className={styles.modalQuickBadges}>
                      <span className={styles.modalCategoryBadge}>
                        {modalDish.categoryLabel}
                      </span>
                      <span className={styles.modalHalalBadge}>
                        ✓ 100 % Halal
                      </span>
                      {modalDish.diet && (
                        <span className={styles.modalHalalBadge}>
                          {modalDish.diet === "vegan"
                            ? t("znackaVegansko")
                            : t("znackaVegetarijansko")}
                        </span>
                      )}
                    </div>
                    <div className={styles.modalPriceText}>
                      {t("modalDoplacilo", { doplacilo: eur(STUDENT_BON.surcharge) })}{" "}
                      <span style={{ fontSize: "0.82rem", color: "#8a817b" }}>
                        {t("modalRednaCena", { cena: eur(modalDish.price) })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1. Opis */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("opisJedi")}</h4>
                  <p className={styles.modalDescText}>{modalDish.desc}</p>
                </div>

                {/* 2. Sestavine */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("sestavine")}</h4>
                  <ul className={styles.modalIngredientsList}>
                    {modalDish.ingredientsList.map((ing, idx) => (
                      <li key={idx} className={styles.modalIngredientItem}>
                        <span className={styles.ingredientCheckIcon}>✓</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Alergeni */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("alergeni")}</h4>
                  <div className={styles.modalAllergensGrid}>
                    {modalDish.allergensList.length > 0 ? (
                      modalDish.allergensList.map((alg, idx) => (
                        <span key={idx} className={styles.modalAllergenPill}>
                          • {alg}
                        </span>
                      ))
                    ) : (
                      <span className={styles.modalAllergenPill}>
                        {t("brezAlergenov")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooterBar}>
                <button
                  type="button"
                  onClick={() => setModalDish(null)}
                  className={styles.modalCloseWindowBtn}
                >
                  Zapri podrobnosti
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
