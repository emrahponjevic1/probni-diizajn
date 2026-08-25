"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

const STUDENT_FAQS: StudentFaq[] = [
  {
    id: "faq-1",
    q: "Ali lahko študentski meni vzamem s seboj (takeaway)?",
    a: "Po pravilih sistema subvencionirane študentske prehrane je subvencioniran obrok namenjen zaužitju v lokalu. Embalažo za s seboj lahko pri nas seveda naročite po veljavnem ceniku embalaže.",
  },
  {
    id: "faq-2",
    q: "Kaj storiti, če terminal ne zazna mojega telefona?",
    a: "Najprej preverite, ali imate vklopljen NFC čip v nastavitvah telefona in ali ste telefon prislonili točno ob spodnji rob terminala (kjer je senzor). Če NFC ne deluje, lahko v aplikaciji 'Študentska prehrana' izberete možnost 'Ročni vnos kode' in osebju preprosto sporočite izpisano kodo.",
  },
  {
    id: "faq-3",
    q: "Ali boni veljajo med vikendi, prazniki in počitnicami?",
    a: "Da! Študentski boni so na voljo za vsak koledarski dan v letu, vključno s soboto, nedeljo, državnimi prazniki ter med poletnimi in zimskimi počitnicami.",
  },
  {
    id: "faq-4",
    q: "Koliko časa mora miniti med dvema bonoma istega dne?",
    a: "Po pravilih sistema mora med prvim in drugim bonom preteči najmanj 4 ure. Sistem pred iztekom tega časovnega razmika ne dovoli potrditve novega obroka.",
  },
  {
    id: "faq-5",
    q: "Ali so vse študentske jedi 100 % halal certificirane?",
    a: "Da, vse meso v Šeherezadi je 100 % halal certificirano, brez prisotnosti svinjine ali alkohola. Pripravljamo tudi 7 brezmesnih (vegetarijanskih in veganskih) jedi na bon, vključno s falafli in zelenjavnimi picami.",
  },
  {
    id: "faq-6",
    q: "Kaj če sem porabil vse bone za tekoči mesec?",
    a: "Vse naše jedi lahko naročite po rednih ugodnih cenah z menija. Število dodeljenih bonov se samodejno ponastavi vsak prvi dan v novem mesecu.",
  },
];

// ---------------------------------------------------------------------------
// GLAVNA KOMPONENTA
// ---------------------------------------------------------------------------

export default function StudentBoniPageContent() {
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
  const studentItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.student),
    []
  );

  // Kategorije za filtre z ličnimi kratkimi oznakami
  const filterCategories = useMemo(
    () => [
      { id: "all", label: "Vse jedi", count: studentItems.length },
      {
        id: "kebab",
        label: "Kebab & Jufke",
        count: studentItems.filter((i) => i.category === "kebab").length,
      },
      {
        id: "pizza",
        label: "Pizze",
        count: studentItems.filter((i) => i.category === "pizza").length,
      },
      {
        id: "kroznik",
        label: "Krožniki",
        count: studentItems.filter((i) => i.category === "kroznik").length,
      },
      {
        id: "falafel",
        label: "Falafel",
        count: studentItems.filter((i) => i.category === "falafel").length,
      },
      {
        id: "vegi",
        label: "Brezmesno",
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
                <span className={styles.tagGhostWatermark}>BONI</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>ŠTUDENTSKA PREHRANA · LJUBLJANA</span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.heroH1}>
                Študentski boni v Šeherezadi —{" "}
                <span className={styles.heroH1Accent}>
                  doplačilo {eur(STUDENT_BON.surcharge)}
                </span>
              </h1>

              <p className={styles.heroLead}>
                {MENU_STATS.student} od {MENU_STATS.total} jedi z našega menija
                je na voljo na študentski bon na obeh lokacijah v središču
                Ljubljane. Za enotno doplačilo dobiš celoten 4-delni obrok: glavno
                jed, svežo solato, jabolko in pijačo.
              </p>

              {/* Bento Fact Grid */}
              <div className={styles.heroFactGrid}>
                <div className={`${styles.heroFactCard} ${styles.heroFactCardHighlight}`}>
                  <span className={styles.heroFactLabel}>Doplačilo</span>
                  <span className={`${styles.heroFactValue} ${styles.heroFactValueAccent}`}>
                    {eur(STUDENT_BON.surcharge)}
                  </span>
                  <span className={styles.heroFactSubtitle}>celoten meni</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Jedi na bon</span>
                  <span className={styles.heroFactValue}>
                    {MENU_STATS.student}{" "}
                    <span style={{ fontSize: "0.85rem", color: "#a8a29e" }}>
                      / {MENU_STATS.total}
                    </span>
                  </span>
                  <span className={styles.heroFactSubtitle}>
                    {MENU_STATS.vegan + MENU_STATS.vegetarian} brezmesnih
                  </span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Dnevna kvota</span>
                  <span className={styles.heroFactValue}>{BON_RULES.perDay} bona</span>
                  <span className={styles.heroFactSubtitle}>tudi med vikendi</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Lokaciji</span>
                  <span className={styles.heroFactValue}>2 v LJ</span>
                  <span className={styles.heroFactSubtitle}>center mesta</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.heroActionsRow}>
                <a href="#jedi-na-bon" className={styles.btnPrimary}>
                  <span>Poglej jedi na bon ({MENU_STATS.student})</span>
                  <ArrowRightIcon />
                </a>
                <a href="#kako-unovciti" className={styles.btnSecondary}>
                  <span>Kako unovčiti bon</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Bento Card */}
            <div className={styles.heroVisualCard}>
              <div className={styles.heroVisualMediaBox}>
                <Image
                  src="/images/seherezada-student-meal.avif"
                  alt="Celovit študentski meni v Šeherezadi — döner kebab, solata, jabolko in pijača"
                  width={600}
                  height={450}
                  priority
                  className={styles.heroVisualImg}
                />
                <div className={styles.heroVisualBadgeFloating}>
                  <UtensilsIcon />
                  <span>4-delni študentski paket</span>
                </div>
              </div>

              <div className={styles.heroVisualFooterStrip}>
                <div className={styles.heroVisualFooterText}>
                  Polna vrednost obroka: <strong>{eur(MEAL_VALUE)}</strong>
                  <span>Država subvencionira {eur(STUDENT_SUBSIDY.subsidy)}</span>
                </div>
                <span className={styles.heroVisualTagPill}>Plačaš le 3,00 €</span>
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
              <span className={styles.tagGhostWatermarkCenter}>IZRAČUN</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>SUBVENCIJA & DOPLAČILO</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Pregleden izračun: koliko dejansko plačaš</h2>
            <p className={styles.sectionSubtitle}>
              Vsak subvencioniran obrok je sestavljen iz prispevka države in
              tvojega fiksnega doplačila. Pri nas vedno doplačaš točno{" "}
              {eur(STUDENT_BON.surcharge)}.
            </p>
          </div>

          {/* Math Equation Formula */}
          <div className={styles.mathEquationGrid}>
            <div className={styles.mathCard}>
              <span className={styles.mathCardLabel}>Subvencija države</span>
              <span className={styles.mathCardValue}>
                {eur(STUDENT_SUBSIDY.subsidy)}
              </span>
              <p className={styles.mathCardDesc}>Krije Ministrstvo za delo</p>
            </div>

            <div className={styles.mathOperatorSign}>+</div>

            <div className={`${styles.mathCard} ${styles.mathCardUser}`}>
              <span className={styles.mathCardLabel}>Tvoje doplačilo</span>
              <span className={styles.mathCardValue}>
                {eur(STUDENT_BON.surcharge)}
              </span>
              <p className={styles.mathCardDesc}>Plačaš na naši blagajni</p>
            </div>

            <div className={styles.mathOperatorSign}>=</div>

            <div className={`${styles.mathCard} ${styles.mathCardTotal}`}>
              <span className={styles.mathCardLabel}>Vrednost obroka</span>
              <span className={styles.mathCardValue}>{eur(MEAL_VALUE)}</span>
              <p className={styles.mathCardDesc}>Toliko hrane dobiš na krožnik</p>
            </div>
          </div>

          {/* Interactive Savings Calculator */}
          <div className={styles.savingsInteractiveBox}>
            <div>
              <h3 className={styles.savingsControlsTitle}>
                Kalkulator študentskega prihranka
              </h3>
              <p className={styles.savingsControlsDesc}>
                Izberi, kolikokrat na teden načrtuješ jesti v Šeherezadi na
                študentski bon:
              </p>

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
                    {num} obrokov / teden
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.savingsResultCard}>
              <span className={styles.savingsResultLabel}>Tvoj mesečni prihranek</span>
              <span className={styles.savingsResultAmount}>
                ~{Math.round(monthlySavings)} €
              </span>
              <p className={styles.savingsResultNote}>
                v primerjavi z rednimi cenami ob {mealsPerWeek * 4} toplih obrokih na mesec.
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
              <span className={styles.tagGhostWatermarkCenter}>PAKET</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>VSEBINA OBROKA</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Kaj vsebuje vsak študentski meni</h2>
            <p className={styles.sectionSubtitle}>
              Celoten polnovreden obrok, ne le glavna jed. Vse 4 sestavine so
              vedno vključene v doplačilo {eur(STUDENT_BON.surcharge)} brez
              skritih doplačil.
            </p>
          </div>

          <div className={styles.fourPartGrid}>
            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <UtensilsIcon />
              </div>
              <span className={styles.packageIndexTag}>01 / Glavna jed</span>
              <h3 className={styles.packageTitle}>Glavna jed po izbiri</h3>
              <p className={styles.packageDesc}>
                Izbira med 19 jedmi: sočni döner kebab, hrustljava jufka,
                falafel, 6 vrst pic ali piščančji zrezki na žaru.
              </p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>100 % Halal meso</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <SaladIcon />
              </div>
              <span className={styles.packageIndexTag}>02 / Solata</span>
              <h3 className={styles.packageTitle}>Dnevno sveža solata</h3>
              <p className={styles.packageDesc}>
                Sveže narezana mešana solata (zelje, paradižnik, kumarice, zelena
                solata), pripravljena sproti skozi ves dan.
              </p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>Sveže pripravljeno sproti</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <AppleIcon />
              </div>
              <span className={styles.packageIndexTag}>03 / Sadje</span>
              <h3 className={styles.packageTitle}>Sveže sadje (Jabolko)</h3>
              <p className={styles.packageDesc}>
                Naraven vir vitaminov ob vsakem obroku. Sočno jabolko prejmete
                neposredno ob prevzemu hrane.
              </p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>Vitaminsko bogato</span>
              </div>
            </div>

            <div className={styles.packageCard}>
              <div className={styles.packageIconWrapper}>
                <DrinkIcon />
              </div>
              <span className={styles.packageIndexTag}>04 / Pijača</span>
              <h3 className={styles.packageTitle}>Osvežilna pijača</h3>
              <p className={styles.packageDesc}>
                Voda ali osvežilna pijača je vključena v meni in je ni potrebno
                posebej doplačevati.
              </p>
              <div className={styles.packageHighlightBadge}>
                <CheckIcon />
                <span>Vključeno brez doplačila</span>
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
              <span className={styles.tagGhostWatermarkCenter}>IZBIRA</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>19 JEDI NA BON</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Izberi svojo najljubšo jed na bon</h2>
            <p className={styles.sectionSubtitle}>
              Oglej si vseh {MENU_STATS.student} jedi, ki jih lahko naročiš za
              enotno doplačilo {eur(STUDENT_BON.surcharge)}. Klikni na posamezno
              jed za podrobnosti o sestavinah in alergenih.
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
                      <span className={styles.badgeDietVegi}>Vegansko</span>
                    )}
                    {dish.diet === "vegetarian" && (
                      <span className={styles.badgeDietVegi}>Vegetarijansko</span>
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
                        <span className={styles.mobileDietBadge}>Vegansko</span>
                      )}
                      {dish.diet === "vegetarian" && (
                        <span className={styles.mobileDietBadge}>Vegi</span>
                      )}
                    </div>
                  </div>

                  <p className={styles.dishCardDesc}>{dish.desc}</p>

                  <div className={styles.dishCardPriceFooter}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceOldRow}>
                        Redna: {eur(dish.price)}
                      </span>
                      <div className={styles.priceMainRow}>
                        <span className={styles.priceSurcharge}>
                          {eur(STUDENT_BON.surcharge)}
                        </span>
                        <span className={styles.priceSubtext}>na bon</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalDish(dish)}
                      className={styles.btnDetailModal}
                      aria-label={`Podrobnosti o jedi ${dish.name}`}
                    >
                      <InfoIcon />
                      <span>Sestavine</span>
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
              <span className={styles.tagGhostWatermark}>LOKACIJE</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>ČASOVNO OKNO & LOKACIJI</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Do kdaj lahko bon unovčiš pri nas</h2>
            <p className={styles.sectionSubtitle}>
              Sistem študentske prehrane po vsej državi sprejema bone med{" "}
              {BON_RULES.windowFrom} in {BON_RULES.windowTo}. Preveri delovni čas
              in časovno okno za unovčevanje na obeh naših lokacijah.
            </p>
          </div>

          <div className={styles.locGrid}>
            {LOCATIONS.map((loc) => {
              const win = bonWindow(loc.hours);
              return (
                <div key={loc.id} className={styles.locCard}>
                  <div className={styles.locCardTop}>
                    <div>
                      <h3 className={styles.locCardName}>{loc.name}</h3>
                      <div className={styles.locCardAddress}>
                        <PinIcon />
                        <span>{loc.street}, 1000 Ljubljana</span>
                      </div>
                    </div>
                    <StatusBadge hours={loc.hours} />
                  </div>

                  <div className={styles.locTimesBox}>
                    <div className={styles.locTimeRow}>
                      <span className={styles.locTimeLabel}>
                        <ClockIcon />
                        <span>Odpiralni čas lokala</span>
                      </span>
                      <span className={styles.locTimeVal}>{loc.hoursShort}</span>
                    </div>
                    <div className={styles.locTimeRow}>
                      <span className={styles.locTimeLabel}>
                        <UtensilsIcon />
                        <span>Bon velja (časovno okno)</span>
                      </span>
                      <span className={styles.locTimeValVoucher}>
                        {win.from} – {win.to}
                      </span>
                    </div>
                  </div>

                  <div className={styles.locActionRow}>
                    <Link
                      href={`/lokacije/${LOCATION_SLUG[loc.id]}`}
                      className={`${styles.locBtn} ${styles.locBtnPrimary}`}
                    >
                      <span>Podrobnosti poslovalnice</span>
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
              <h4 className={styles.nightWarnTitle}>
                Po polnoči smo odprti, bon pa po zakonu ne velja več
              </h4>
              <p className={styles.nightWarnText}>
                Oba naša lokala v središču Ljubljane ostajata odprta dolgo v noč
                (do 01:00 oz. 02:00 / 03:00 ob vikendih). Državni sistem bonov se
                ob 24:00 samodejno ustavi. Če pridete po polnoči, vas z veseljem
                postrežemo z enakimi svežimi jedmi po rednih cenah z menija.
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
              <span className={styles.tagGhostWatermark}>NAVODILA</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>TERMINAL & PRAVILA</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Kako enostavno unovčiš bon</h2>
            <p className={styles.sectionSubtitle}>
              Bon unovčiš z mobilno aplikacijo prek NFC čipa ali s študentsko čip
              kartico. Poglej pravilno mesto prislona na terminalu.
            </p>
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
                  <span>Mobilni telefon (Aplikacija)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceTab("card")}
                  className={`${styles.deviceTabBtn} ${
                    activeDeviceTab === "card" ? styles.deviceTabBtnActive : ""
                  }`}
                >
                  <span>Študentska čip kartica</span>
                </button>
              </div>

              <div className={styles.terminalSvgBox}>
                <TerminalIllustration target={activeDeviceTab} />
              </div>

              {activeDeviceTab === "phone" ? (
                <div>
                  <h3 className={styles.deviceInstructionTitle}>
                    Mobilni telefon (NFC / aplikacija)
                  </h3>
                  <p className={styles.deviceInstructionText}>
                    Telefon prislonite na <strong>spodnji rob terminala</strong> s
                    sprednje strani.
                  </p>
                  <ul className={styles.deviceTipsList}>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>
                        V nastavitvah telefona imejte vklopljen <strong>NFC</strong>.
                      </span>
                    </li>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>
                        Če terminal ne zazna telefona, lahko v aplikaciji izberete
                        <strong> Ročni vnos kode</strong>.
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className={styles.deviceInstructionTitle}>
                    Brezkontaktna čip kartica
                  </h3>
                  <p className={styles.deviceInstructionText}>
                    Študentsko kartico prislonite na{" "}
                    <strong>zgornji rob terminala</strong> s strani.
                  </p>
                  <ul className={styles.deviceTipsList}>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>Kartico pridobite ob registraciji na info točki.</span>
                    </li>
                    <li className={styles.deviceTipItem}>
                      <span className={styles.deviceTipIcon}>•</span>
                      <span>Kartica deluje brez baterije ali mobilnega signala.</span>
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
                    {BON_RULES.perDay} bona na koledarski dan
                  </h4>
                  <p className={styles.ruleDesc}>
                    Vsak študent ima pravico do 2 subvencij dnevno za vse dni v
                    letu, vključno z vikendi in počitnicami.
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <ClockIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>
                    Najmanj {BON_RULES.gapHours} ure razmika
                  </h4>
                  <p className={styles.ruleDesc}>
                    Med prvim in drugim bonom istega dne morajo miniti vsaj 4
                    ure, preden sistem dovoli novo potrditev.
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <ClockIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>
                    Časovno okno {BON_RULES.windowFrom} – {BON_RULES.windowTo}
                  </h4>
                  <p className={styles.ruleDesc}>
                    Vsi študentski boni v Sloveniji se lahko unovčijo med 07:00 zjutraj
                    in polnočjo (24:00).
                  </p>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={styles.ruleIconCircle}>
                  <IdIcon />
                </div>
                <div>
                  <h4 className={styles.ruleHeading}>Osebni dokument ob prevzemu</h4>
                  <p className={styles.ruleDesc}>
                    Ob unovčitvi bona je potrebno na zahtevo osebja pokazati osebni
                    dokument ali veljavno študentsko izkaznico.
                  </p>
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
              <span className={styles.tagGhostWatermarkCenter}>BRUCI</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>PRVA REGISTRACIJA</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>
              Prvič uporabljaš bone? Enostaven vpis v 3 korakih
            </h2>
            <p className={styles.sectionSubtitle}>
              Postopek opraviš le enkrat ob vpisu na fakulteto ali višjo šolo,
              nato pa status vsako študijsko leto enostavno podaljšaš prek aplikacije.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>1</div>
              <h3 className={styles.stepTitle}>Spletna prijava</h3>
              <p className={styles.stepBody}>
                Izpolnite spletno prijavnico na uradnem portalu Študentske prehrane.
                Ob oddaji si zapišite številko prijavnice.
              </p>
              <a
                href={STUDENT_SUBSIDY.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stepExternalLink}
              >
                Pojdi na studentska-prehrana.si →
              </a>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>2</div>
              <h3 className={styles.stepTitle}>Aktivacija na info točki</h3>
              <p className={styles.stepBody}>
                S številko prijavnice, osebnim dokumentom in dokazilom o vpisu
                obiščite katerokoli info točko (npr. ŠOU Ljubljana ali Kampus).
              </p>
              <span style={{ fontSize: "0.85rem", color: "#047857", fontWeight: 700 }}>
                ✓ Aktivacija opravljena v 3 minutah
              </span>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>3</div>
              <h3 className={styles.stepTitle}>Namesti uradno aplikacijo</h3>
              <p className={styles.stepBody}>
                Prenesi aplikacijo Študentska prehrana za hitro unovčevanje bonov,
                pregled stanja kvote in iskanje restavracij.
              </p>
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
              <span className={styles.tagGhostWatermarkCenter}>FAQ</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>POGOSTA VPRAŠANJA ŠTUDENTOV</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Vse, kar vas najpogosteje zanima</h2>
            <p className={styles.sectionSubtitle}>
              Hitri odgovori na najpogostejša vprašanja glede unovčevanja bonov v
              Šeherezadi.
            </p>
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
              {MENU_STATS.student} svežih jedi čaka na tvoj bon
            </h2>
            <p className={styles.ctaText}>
              Od {MENU_STATS.total} jedi na našem meniju jih je {MENU_STATS.student}{" "}
              na voljo na študentski bon — med njimi {MENU_STATS.vegan} veganskih
              in {MENU_STATS.vegetarian} vegetarijanskih. Obišči nas na Trubarjevi
              ali Slovenski!
            </p>
          </div>

          <div className={styles.ctaBtnGroup}>
            <Link href="/meni" className={styles.btnPrimary}>
              <span>Celoten meni</span>
              <ArrowRightIcon />
            </Link>
            <Link href="/kontakt" className={styles.btnSecondary}>
              <span>Kje smo</span>
            </Link>
          </div>
        </section>

        {/* Legal Transparency Note */}
        <footer className={styles.sourceLegalBox}>
          <span className={styles.sourceLegalLabel}>
            Uradni vir podatkov o subvencionirani prehrani
          </span>
          <p className={styles.sourceLegalText}>
            Podatki o višini subvencije ({eur(STUDENT_SUBSIDY.subsidy)}), pravilih
            unovčevanja in postopku vpisa povzemajo uradne informacije sistema
            študentske prehrane ŠOS, dostopne na{" "}
            <a
              href={STUDENT_SUBSIDY.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLegalLink}
            >
              {STUDENT_SUBSIDY.sourceName}
            </a>
            . Nazadnje preverjeno {STUDENT_SUBSIDY.checkedOn}. Podatki o ponudbi
            jedi, delovnem času lokalov in enotnem doplačilu {eur(STUDENT_BON.surcharge)}{" "}
            so neposredno določeni s strani restavracije Šeherezada.
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
                            ? "Vegansko"
                            : "Vegetarijansko"}
                        </span>
                      )}
                    </div>
                    <div className={styles.modalPriceText}>
                      Doplačilo na bon: {eur(STUDENT_BON.surcharge)}{" "}
                      <span style={{ fontSize: "0.82rem", color: "#8a817b" }}>
                        (redna cena {eur(modalDish.price)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1. Opis */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>Opis Jedi</h4>
                  <p className={styles.modalDescText}>{modalDish.desc}</p>
                </div>

                {/* 2. Sestavine */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>Sestavine</h4>
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
                  <h4 className={styles.modalSectionTitle}>Alergeni</h4>
                  <div className={styles.modalAllergensGrid}>
                    {modalDish.allergensList.length > 0 ? (
                      modalDish.allergensList.map((alg, idx) => (
                        <span key={idx} className={styles.modalAllergenPill}>
                          • {alg}
                        </span>
                      ))
                    ) : (
                      <span className={styles.modalAllergenPill}>
                        Brez deklariranih alergenov
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
