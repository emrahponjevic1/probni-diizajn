"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MENU_STATS, MENU_ITEMS } from "@/components/menu/MenuData";
import {
  HALAL_OZNAKA,
  NAS_CERTIFIKAT,
  POSTOPEK,
  ZAVOD_HALAL,
} from "@/data/halal";
import { LOCATIONS, LOCATION_SLUG, PHONE } from "@/data/locations";
import { useLocationText } from "@/i18n/locationText";
import StatusBadge from "@/components/locations/StatusBadge";
import { useHalalFaqs } from "./halalFaqs";
import styles from "./HalalPageContent.module.css";

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

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const NoPorkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <path d="M16 11c0-2-1.5-3-3.5-3S9 9 9 11s1 2.5 3 2.5h2" />
  </svg>
);

const WineOffIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <line x1="2" y1="2" x2="22" y2="22" />
    <path d="M7 10h10" />
    <path d="M12 15v7" />
    <path d="M8 22h8" />
    <path d="M7.3 7.3C7.1 7.8 7 8.4 7 9c0 2.8 2.2 5 5 5 .6 0 1.2-.1 1.7-.3" />
    <path d="M9.7 4C10.4 4 11 4 12 4c3.3 0 6 2.7 6 6 0 .4 0 .7-.1 1.1" />
  </svg>
);

const TraceabilityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M4 4v6h6" />
    <path d="M4 10a8 8 0 1 1 2 5.3" />
    <path d="M12 8v4l3 2" />
  </svg>
);

const KitchenCleanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
    <path d="M4 20c3-6 7-9 12-11" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.6}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SproutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22V12" />
    <path d="M12 12C12 8 9 5 4 5c0 5 3 7 8 7Z" />
    <path d="M12 14c0-3.5 2.5-6 7-6 0 4.5-2.5 6-7 6Z" />
  </svg>
);

const SaladBowlIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...stroke}>
    <path d="M4 11h16a8 8 0 0 1-16 0z" />
    <path d="M6 8V5" />
    <path d="M10 8V4" />
    <path d="M14 8V5" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </svg>
);

const PizzaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 2 2 20a2 2 0 0 0 2.4 2.8L12 21l7.6 1.8A2 2 0 0 0 22 20Z" />
    <circle cx="10" cy="11" r="1.1" />
    <circle cx="14.5" cy="15" r="1.1" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const DocumentCertificateIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M12 18v-4" />
    <path d="M9 15h6" />
  </svg>
);

// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA (FAQ DATA)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GLAVNA KOMPONENTA
// ---------------------------------------------------------------------------

export default function HalalPageContent() {
  // Besedila so v messages/<jezik>.json pod ključem "halalStran".
  const t = useTranslations("halalStran");

  // Kratek zapis delovnega časa se prevede; ure same ostanejo iz locations.ts.
  const prevediLokal = useLocationText();
  const HALAL_FAQS = useHalalFaqs();

  // Opis halal oznake in koraki certificiranja se prevedejo; imena zavoda,
  // naslov in standard ostanejo v src/data/halal.ts kot dejstva.
  const tp = useTranslations("halalPodatki");
  const oznakaOpis = tp.has("oznakaOpisSlike")
    ? tp("oznakaOpisSlike")
    : HALAL_OZNAKA.alt;
  const postopek = POSTOPEK.map((korak, i) => ({
    title: tp.has(`postopek.korak${i + 1}Naslov`)
      ? tp(`postopek.korak${i + 1}Naslov`)
      : korak.title,
    text: tp.has(`postopek.korak${i + 1}Opis`)
      ? tp(`postopek.korak${i + 1}Opis`)
      : korak.text,
  }));

  const [openFaqId, setOpenFaqId] = useState<string | null>("hfaq-1");

  return (
    <section className={styles.page}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.container}>
        {/* ===============================================================
            1. MASTER HERO SECTION (BENTO LAYOUT)
        =============================================================== */}
        <section className={styles.heroSection} id="halal-hero">
          <div className={styles.heroMasterGrid}>
            {/* Left Column: Editorial Header & Trust Metrics */}
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
                  poudarek: (chunks) => <span className={styles.heroH1Accent}>{chunks}</span>,
                })}
              </h1>

              <p className={styles.heroLead}>{t("uvod")}</p>

              {/* Bento Trust Metric Badges */}
              <div className={styles.heroFactGrid}>
                <div className={`${styles.heroFactCard} ${styles.heroFactCardHighlight}`}>
                  <span className={styles.heroFactLabel}>{t("factMeso")}</span>
                  <span className={`${styles.heroFactValue} ${styles.heroFactValueAccent}`}>
                    {t("factMesoVrednost")}
                  </span>
                  <span className={styles.heroFactSubtitle}>{t("factMesoPod")}</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factSvinjina")}</span>
                  <span className={styles.heroFactValue}>{t("factSvinjinaVrednost")}</span>
                  <span className={styles.heroFactSubtitle}>{t("factSvinjinaPod")}</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factLokacije")}</span>
                  <span className={styles.heroFactValue}>{LOCATIONS.length}</span>
                  <span className={styles.heroFactSubtitle}>{t("factLokacijePod")}</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>{t("factBrezmesne")}</span>
                  <span className={styles.heroFactValue}>
                    {MENU_STATS.vegan + MENU_STATS.vegetarian}
                  </span>
                  <span className={styles.heroFactSubtitle}>{t("factBrezmesnePod")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.heroActionsRow}>
                <Link href="/meni" className={styles.btnPrimary}>
                  <span>{t("gumbMeni")}</span>
                  <ArrowRightIcon />
                </Link>
                <a href="#certifikat-in-nadzor" className={styles.btnSecondary}>
                  <span>{t("gumbCertifikat")}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Luxury Gold Certificate Seal Frame */}
            <div className={styles.heroVisualCard}>
              <div className={styles.certCardFrame}>
                <Image
                  src={HALAL_OZNAKA.src}
                  alt={oznakaOpis}
                  width={HALAL_OZNAKA.width}
                  height={HALAL_OZNAKA.height}
                  priority
                  className={styles.certSeal}
                />

                <div className={styles.certFloatingVerifiedPill}>
                  <div className={styles.certPillIcon}>
                    <ShieldCheckIcon />
                  </div>
                  <div className={styles.certPillMeta}>
                    <span className={styles.certPillTitle}>{t("certZnackaNaslov")}</span>
                    <span className={styles.certPillSub}>{t("certZnackaPod")}</span>
                  </div>
                </div>
              </div>

              <div className={styles.certLocationNoticeStrip}>
                <DocumentCertificateIcon />
                <span>{t("certObvestilo")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            2. SECTION: 3 STEBRI NAŠEGA HALAL STANDARDA
        =============================================================== */}
        <section className={styles.pillarsSection} id="stebri-standarda">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("stebriVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("stebriOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("stebriNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("stebriPodnaslov")}</p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <NoPorkIcon />
              </div>
              <span className={styles.pillarIndex}>{t("steber1Oznaka")}</span>
              <h3 className={styles.pillarTitle}>{t("steber1Naslov")}</h3>
              <p className={styles.pillarDesc}>{t("steber1Opis")}</p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>{t("steber1Znacka")}</span>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <TraceabilityIcon />
              </div>
              <span className={styles.pillarIndex}>{t("steber2Oznaka")}</span>
              <h3 className={styles.pillarTitle}>{t("steber2Naslov")}</h3>
              <p className={styles.pillarDesc}>{t("steber2Opis")}</p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>{t("steber2Znacka")}</span>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <KitchenCleanIcon />
              </div>
              <span className={styles.pillarIndex}>{t("steber3Oznaka")}</span>
              <h3 className={styles.pillarTitle}>{t("steber3Naslov")}</h3>
              <p className={styles.pillarDesc}>{t("steber3Opis")}</p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>{t("steber3Znacka")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            3. SECTION: TRANSPARENTNA PRIMERJALNA TABELA (KAJ DA / KAJ NE)
        =============================================================== */}
        <section className={styles.matrixSection} id="preglednost-menija">
          <div className={styles.sectionHeaderLeft}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>{t("meniVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("meniOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("meniNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("meniPodnaslov")}</p>
          </div>

          <div className={styles.matrixGrid}>
            {/* Left Card: Kaj uporabljamo */}
            <div className={styles.matrixCardAllowed}>
              <div className={styles.matrixCardHeader}>
                <div className={styles.matrixBadgeAllowed}>
                  <CheckIcon />
                  <span>{t("dovoljenoZnacka")}</span>
                </div>
                <h3 className={styles.matrixCardTitle}>{t("dovoljenoNaslov")}</h3>
              </div>

              <ul className={styles.matrixItemsList}>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>{t("dovoljeno1Naslov")}</strong>
                    <p>{t("dovoljeno1Opis")}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>{t("dovoljeno2Naslov")}</strong>
                    <p>{t("dovoljeno2Opis")}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>{t("dovoljeno3Naslov")}</strong>
                    <p>{t("dovoljeno3Opis")}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>{t("dovoljeno4Naslov")}</strong>
                    <p>{t("dovoljeno4Opis")}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Card: Česa pri nas ni */}
            <div className={styles.matrixCardForbidden}>
              <div className={styles.matrixCardHeader}>
                <div className={styles.matrixBadgeForbidden}>
                  <CrossIcon />
                  <span>{t("prepovedanoZnacka")}</span>
                </div>
                <h3 className={styles.matrixCardTitle}>{t("prepovedanoNaslov")}</h3>
              </div>

              <ul className={styles.matrixItemsList}>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>{t("prepovedano1Naslov")}</strong>
                    <p>{t("prepovedano1Opis", { vseh: MENU_STATS.total })}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>{t("prepovedano2Naslov")}</strong>
                    <p>{t("prepovedano2Opis")}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>{t("prepovedano3Naslov")}</strong>
                    <p>{t("prepovedano3Opis")}</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>{t("prepovedano4Naslov")}</strong>
                    <p>{t("prepovedano4Opis")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===============================================================
            4. SECTION: DOKUMENT CERTIFIKATA & URADNI NADZOR
        =============================================================== */}
        <section className={styles.certDetailSection} id="certifikat-in-nadzor">
          <div className={styles.sectionHeaderCenter}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>{t("nadzorVodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>{t("nadzorOznaka")}</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>{t("nadzorNaslov")}</h2>
            <p className={styles.sectionSubtitle}>{t("nadzorPodnaslov")}</p>
          </div>

          <div className={styles.certShowcaseBox}>
            <div className={styles.certShowcaseLeft}>
              <div className={styles.certSealFrameShowcase}>
                <Image
                  src={HALAL_OZNAKA.src}
                  alt={oznakaOpis}
                  width={HALAL_OZNAKA.width}
                  height={HALAL_OZNAKA.height}
                  className={styles.certShowcaseSeal}
                />
              </div>

              <div className={styles.certStatusCard}>
                <span className={styles.certStatusBadge}>
                  <CheckIcon />
                  <span>{t("statusZnacka")}</span>
                </span>
                <h3 className={styles.certStatusTitle}>{t("statusNaslov")}</h3>
                <p className={styles.certStatusText}>{t("statusOpis")}</p>
              </div>
            </div>

            <div className={styles.certShowcaseRight}>
              <h3 className={styles.issuerTitle}>{t("izdajateljNaslov")}</h3>
              <div className={styles.issuerCard}>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>{t("oznakaIzdajatelj")}</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.name}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>{t("oznakaUstanova")}</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.underAuspicesOf}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>{t("oznakaSedez")}</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.address}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>{t("oznakaStandard")}</span>
                  <span className={styles.issuerValueCode}>{ZAVOD_HALAL.accreditation}</span>
                </div>
              </div>

              <p className={styles.issuerDesc}>{t("izdajateljOpis")}</p>

              <a
                href={ZAVOD_HALAL.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.issuerLink}
              >
                <span>{t("uradnaStran", { naslov: ZAVOD_HALAL.url.replace("https://", "") })}</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>

          {/* 4-Step Certification Process */}
          <div className={styles.processSection}>
            <h3 className={styles.processHeading}>
              {t("postopekNaslov", { stevilo: postopek.length })}
            </h3>

            <div className={styles.processStepsGrid}>
              {postopek.map((korak, idx) => (
                <div key={korak.title} className={styles.processStepCard}>
                  <div className={styles.processStepNumberBadge}>
                    0{idx + 1}
                  </div>
                  <h4 className={styles.processStepTitle}>{korak.title}</h4>
                  <p className={styles.processStepText}>{korak.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===============================================================
            5. SECTION: VEGANSKO IN VEGETARIJANSKO SPOŠTOVANJE
        =============================================================== */}
        <section className={styles.plantSection} id="rastlinska-ponudba">
          <div className={styles.plantBox}>
            <div className={styles.plantIconCircle}>
              <LeafIcon />
            </div>

            <div className={styles.plantContent}>
              <div className={styles.plantHeaderRow}>
                <span className={styles.plantBadge}>{t("rastlinskaZnacka")}</span>
                <h3 className={styles.plantTitle}>
                  {t("rastlinskaNaslov", { vegan: MENU_STATS.vegan, vegetarijanskih: MENU_STATS.vegetarian })}
                </h3>
              </div>
              <p className={styles.plantText}>{t("rastlinskaOpis")}</p>

              <div className={styles.plantTagsRow}>
                <span className={styles.plantPill}>
                  <SproutIcon />
                  <span>{t("rastlinska1")}</span>
                </span>
                <span className={styles.plantPill}>
                  <SaladBowlIcon />
                  <span>{t("rastlinska2")}</span>
                </span>
                <span className={styles.plantPill}>
                  <PizzaIcon />
                  <span>{t("rastlinska3")}</span>
                </span>
                <span className={styles.plantPill}>
                  <CheckIcon />
                  <span>{t("rastlinska4")}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===============================================================
            6. SECTION: POGOSTA VPRAŠANJA (FAQ ACCORDION)
        =============================================================== */}
        <section className={styles.faqSection} id="halal-faq">
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
            {HALAL_FAQS.map((faq) => {
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
            7. SECTION: LOKACIJI V LJUBLJANI
        =============================================================== */}
        <section className={styles.locationsSection} id="kjer-nas-najdete">
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
            <p className={styles.sectionSubtitle}>{t("lokacijePodnaslov")}</p>
          </div>

          <div className={styles.locGrid}>
            {LOCATIONS.map(prevediLokal).map((loc) => (
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
                  <span className={styles.locTimeLabel}>{t("delovniCas")}</span>
                  <span className={styles.locTimeVal}>{loc.hoursShort}</span>
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
            ))}
          </div>
        </section>

        {/* ===============================================================
            8. CTA BANNER
        =============================================================== */}
        <section className={styles.ctaBox}>
          <div>
            <h2 className={styles.ctaTitle}>{t("ctaNaslov")}</h2>
            <p className={styles.ctaText}>{t("ctaOpis")}</p>
          </div>

          <div className={styles.ctaBtnGroup}>
            <Link href="/meni" className={styles.btnPrimary}>
              <span>{t("ctaMeni", { stevilo: MENU_STATS.total })}</span>
              <ArrowRightIcon />
            </Link>
            <Link href="/kontakt" className={styles.btnSecondary}>
              <span>{t("ctaKontakt")}</span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
