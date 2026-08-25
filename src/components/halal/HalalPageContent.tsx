"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MENU_STATS, MENU_ITEMS } from "@/components/menu/MenuData";
import {
  HALAL_OZNAKA,
  NAS_CERTIFIKAT,
  POSTOPEK,
  ZAVOD_HALAL,
} from "@/data/halal";
import { LOCATIONS, LOCATION_SLUG, PHONE } from "@/data/locations";
import StatusBadge from "@/components/locations/StatusBadge";
import { HALAL_FAQS } from "./halalFaqs";
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
                <span className={styles.tagGhostWatermark}>HALAL</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>100 % HALAL CERTIFICIRANO · LJUBLJANA</span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.heroH1}>
                100 % halal hrana v Ljubljani —{" "}
                <span className={styles.heroH1Accent}>brez kompromisov</span>
              </h1>

              <p className={styles.heroLead}>
                V Šeherezadi halal ni marketinški izraz, temveč neomajna zaveza
                čistosti, sledljivosti in spoštovanju tradicije. Vse telečje in
                piščančje meso prihaja iz preverjenih virov z veljavnim
                certifikatom. V naših kuhinjah ni svinjine niti alkohola.
              </p>

              {/* Bento Trust Metric Badges */}
              <div className={styles.heroFactGrid}>
                <div className={`${styles.heroFactCard} ${styles.heroFactCardHighlight}`}>
                  <span className={styles.heroFactLabel}>Halal meso</span>
                  <span className={`${styles.heroFactValue} ${styles.heroFactValueAccent}`}>
                    100 %
                  </span>
                  <span className={styles.heroFactSubtitle}>telečje & piščančje</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Svinjina & alkohol</span>
                  <span className={styles.heroFactValue}>0 %</span>
                  <span className={styles.heroFactSubtitle}>brez izjem v nobeni jedi</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Lokaciji v LJ</span>
                  <span className={styles.heroFactValue}>2</span>
                  <span className={styles.heroFactSubtitle}>Trubarjeva & Slovenska</span>
                </div>

                <div className={styles.heroFactCard}>
                  <span className={styles.heroFactLabel}>Brezmesne jedi</span>
                  <span className={styles.heroFactValue}>
                    {MENU_STATS.vegan + MENU_STATS.vegetarian}
                  </span>
                  <span className={styles.heroFactSubtitle}>vegansko & vegetarijansko</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.heroActionsRow}>
                <Link href="/meni" className={styles.btnPrimary}>
                  <span>Poglej celoten meni</span>
                  <ArrowRightIcon />
                </Link>
                <a href="#certifikat-in-nadzor" className={styles.btnSecondary}>
                  <span>Preveri certifikat & standarde</span>
                </a>
              </div>
            </div>

            {/* Right Column: Luxury Gold Certificate Seal Frame */}
            <div className={styles.heroVisualCard}>
              <div className={styles.certCardFrame}>
                <Image
                  src={HALAL_OZNAKA.src}
                  alt={HALAL_OZNAKA.alt}
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
                    <span className={styles.certPillTitle}>
                      100 % Halal Certificirano
                    </span>
                    <span className={styles.certPillSub}>
                      0 % Svinjine · 0 % Alkohola · Nadzorovano poreklo
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.certLocationNoticeStrip}>
                <DocumentCertificateIcon />
                <span>
                  Originalni dokument certifikata je fizično izobešen v obeh lokalih.
                </span>
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
              <span className={styles.tagGhostWatermarkCenter}>STEBRI</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>V KAJ VERJAMEMO</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>
              Trije neomajni stebri halal varnosti
            </h2>
            <p className={styles.sectionSubtitle}>
              Halal pri nas pomeni celovit sistem odgovornosti — od izvora
              posamezne surovine do načina priprave na vašem krožniku.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <NoPorkIcon />
              </div>
              <span className={styles.pillarIndex}>01 / Čiste sestavine</span>
              <h3 className={styles.pillarTitle}>Brez prepovedanih sestavin</h3>
              <p className={styles.pillarDesc}>
                V naših prostorih ni svinjskega mesa, svinjske maščobe, želatine
                niti kapljice alkohola. Tudi v omakah, testu za jufke in marinadah
                uporabljamo izključno 100 % čiste sestavine.
              </p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>Puranja šunka & brezalkoholna kuhinja</span>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <TraceabilityIcon />
              </div>
              <span className={styles.pillarIndex}>02 / Popolna sledljivost</span>
              <h3 className={styles.pillarTitle}>100 % preverjeno poreklo</h3>
              <p className={styles.pillarDesc}>
                Uporabljamo izključno kakovostno telečje in piščančje meso iz
                priznanih evropskih klavnic z veljavnimi mednarodnimi halal
                certifikati in natančno sledljivostjo vsake serije.
              </p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>Mednarodno akreditirani dobavitelji</span>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <KitchenCleanIcon />
              </div>
              <span className={styles.pillarIndex}>03 / Strogi protokoli</span>
              <h3 className={styles.pillarTitle}>Higiensko ravnanje v kuhinji</h3>
              <p className={styles.pillarDesc}>
                Ločeni delovni prostori, namenska oprema in redno usposabljanje
                kuhinjskega osebja preprečujejo kakršnokoli navzkrižno onesnaženje.
                Za nas je higiena del verske in kulinarične odgovornosti.
              </p>
              <div className={styles.pillarFeatureTag}>
                <CheckIcon />
                <span>Redni in nenapovedani pregledi</span>
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
              <span className={styles.tagGhostWatermark}>MENI</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>POPOLNA TRANSPARENTNOST</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>
              Kaj je na našem meniju in česa pri nas nikoli ne boste našli
            </h2>
            <p className={styles.sectionSubtitle}>
              Transparentnost do vsakega gosta: jasen pregled sestavin, ki jih
              s ponosom uporabljamo, ter tistih, ki so v Šeherezadi strogo prepovedane.
            </p>
          </div>

          <div className={styles.matrixGrid}>
            {/* Left Card: Kaj uporabljamo */}
            <div className={styles.matrixCardAllowed}>
              <div className={styles.matrixCardHeader}>
                <div className={styles.matrixBadgeAllowed}>
                  <CheckIcon />
                  <span>Vedno uporabljamo (100 % Halal)</span>
                </div>
                <h3 className={styles.matrixCardTitle}>Dovoljeno & Certificirano</h3>
              </div>

              <ul className={styles.matrixItemsList}>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>100 % Halal telečje in piščančje meso</strong>
                    <p>Sočni döner kebab, zrezki na žaru, ražnjiči in plošče.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>Puranja šunka na picah</strong>
                    <p>Za vse pice z nadevom (npr. Pizza Klasika) uporabljamo izključno certificirano puranjo šunko.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>Dnevno sveže rastlinske sestavine</strong>
                    <p>Ročno pripravljeni falafli iz čičerike, sveža zelenjava, domače omake in sezamov kruh.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCheckIcon}><CheckIcon /></span>
                  <div>
                    <strong>100 % brezalkoholni napitki</strong>
                    <p>Tradicionalni turški čaj, kava, ayran, 100 % sokovi in gazirane ter negazirane vode.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Card: Česa pri nas ni */}
            <div className={styles.matrixCardForbidden}>
              <div className={styles.matrixCardHeader}>
                <div className={styles.matrixBadgeForbidden}>
                  <CrossIcon />
                  <span>Strogo prepovedano (0 % Prisotnosti)</span>
                </div>
                <h3 className={styles.matrixCardTitle}>Brez kompromisov</h3>
              </div>

              <ul className={styles.matrixItemsList}>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>0 % Svinjskega mesa</strong>
                    <p>Nobena od naših 29 jedi ne vsebuje svinjine, slanine, pršuta ali svinjske masti.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>0 % Alkohola v kuhi ali pijači</strong>
                    <p>Ne točimo piva ali vina, alkohola pa ni niti v marinadah, omakah, sladicah ali testu.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>0 % Necertificiranih mesnih izdelkov</strong>
                    <p>Vse meso prihaja izključno iz preverjenih verig s polno sledljivostjo in nadzorom.</p>
                  </div>
                </li>
                <li className={styles.matrixItem}>
                  <span className={styles.matrixCrossIcon}><CrossIcon /></span>
                  <div>
                    <strong>0 % Svinjske želatine ali spornih emulgatorjev</strong>
                    <p>Vsi dodatki in prelivi so skrbno pregledani in ustrezajo strogim predpisom.</p>
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
              <span className={styles.tagGhostWatermarkCenter}>NADZOR</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>URADNI DOKUMENT & ZAVOD</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>
              Kako se v Sloveniji uradno certificira halal
            </h2>
            <p className={styles.sectionSubtitle}>
              Halal certifikat ni le enkratna listina na steni, ampak stalen
              inšpekcijski nadzor, ki zagotavlja najvišji nivo zaupanja.
            </p>
          </div>

          <div className={styles.certShowcaseBox}>
            <div className={styles.certShowcaseLeft}>
              <div className={styles.certSealFrameShowcase}>
                <Image
                  src={HALAL_OZNAKA.src}
                  alt={HALAL_OZNAKA.alt}
                  width={HALAL_OZNAKA.width}
                  height={HALAL_OZNAKA.height}
                  className={styles.certShowcaseSeal}
                />
              </div>

              <div className={styles.certStatusCard}>
                <span className={styles.certStatusBadge}>
                  <CheckIcon />
                  <span>Veljaven status</span>
                </span>
                <h3 className={styles.certStatusTitle}>Halal certifikat Šeherezada</h3>
                <p className={styles.certStatusText}>
                  Restavracija Šeherezada ima uraden halal certifikat za pripravo
                  in strežbo hrane. Dokument je fizično izobešen na steni v obeh
                  naših poslovalnicah v Ljubljani.
                </p>
              </div>
            </div>

            <div className={styles.certShowcaseRight}>
              <h3 className={styles.issuerTitle}>Uradni izdajatelj v Sloveniji</h3>
              <div className={styles.issuerCard}>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>Izdajatelj:</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.name}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>Ustanova:</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.underAuspicesOf}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>Sedež:</span>
                  <span className={styles.issuerValue}>{ZAVOD_HALAL.address}</span>
                </div>
                <div className={styles.issuerRow}>
                  <span className={styles.issuerLabel}>Standard:</span>
                  <span className={styles.issuerValueCode}>{ZAVOD_HALAL.accreditation}</span>
                </div>
              </div>

              <p className={styles.issuerDesc}>
                Zavod Halal izvaja strokovne preglede dobaviteljev, analizira
                vse sestavine in redno preverja kuhinjske pogoje. Certifikat se
                izda le ob izpolnjevanju vseh strogih mednarodnih kriterijev.
              </p>

              <a
                href={ZAVOD_HALAL.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.issuerLink}
              >
                <span>Uradna stran Zavoda Halal ({ZAVOD_HALAL.url.replace("https://", "")})</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>

          {/* 4-Step Certification Process */}
          <div className={styles.processSection}>
            <h3 className={styles.processHeading}>
              4 koraki uradnega postopka certificiranja:
            </h3>

            <div className={styles.processStepsGrid}>
              {POSTOPEK.map((korak, idx) => (
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
                <span className={styles.plantBadge}>Rastlinska izbira</span>
                <h3 className={styles.plantTitle}>
                  {MENU_STATS.vegan} veganskih in {MENU_STATS.vegetarian} vegetarijanskih jedi
                </h3>
              </div>
              <p className={styles.plantText}>
                Halal in rastlinska prehrana se čudovito dopolnjujeta. Kdor mesa
                ne uživa, ima pri nas polno izbiro: hrustljav domač falafel iz
                čičerike, sveže mešane solate z oljčnim oljem, ocvrte priloge ter
                bogate brezmesne pice — jasno označene na meniju, da naročate z
                lahkotnim srcem.
              </p>

              <div className={styles.plantTagsRow}>
                <span className={styles.plantPill}>
                  <SproutIcon />
                  <span>100 % veganski falafel</span>
                </span>
                <span className={styles.plantPill}>
                  <SaladBowlIcon />
                  <span>Dnevno sveže solate</span>
                </span>
                <span className={styles.plantPill}>
                  <PizzaIcon />
                  <span>Brezmesne pice</span>
                </span>
                <span className={styles.plantPill}>
                  <CheckIcon />
                  <span>Ločena priprava</span>
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
              <span className={styles.tagGhostWatermarkCenter}>FAQ</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>POGOSTA VPRAŠANJA O HALAL HRANI</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Vse, kar vas najpogosteje zanima</h2>
            <p className={styles.sectionSubtitle}>
              Hitri in transparentni odgovori na vsa vprašanja glede halal
              priprave, certifikata in sestavin v Šeherezadi.
            </p>
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
              <span className={styles.tagGhostWatermark}>LOKACIJI</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>KJE NAS NAJDETE</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>
              Obiščite nas na obeh lokacijah v središču Ljubljane
            </h2>
            <p className={styles.sectionSubtitle}>
              V obeh poslovalnicah vas čaka enaka sveža 100 % halal ponudba,
              vrhunska prijaznost ter prijeten ambient.
            </p>
          </div>

          <div className={styles.locGrid}>
            {LOCATIONS.map((loc) => (
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
                  <span className={styles.locTimeLabel}>Delovni čas lokala:</span>
                  <span className={styles.locTimeVal}>{loc.hoursShort}</span>
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
            ))}
          </div>
        </section>

        {/* ===============================================================
            8. CTA BANNER
        =============================================================== */}
        <section className={styles.ctaBox}>
          <div>
            <h2 className={styles.ctaTitle}>
              Privoščite si pristno in varno halal kulinarično izkušnjo
            </h2>
            <p className={styles.ctaText}>
              Od sočnega telečjega kebaba in hrustljavih pic s puranjo šunko do
              domačih falaflov — okusite razliko, ki jo ustvarjata svežina in spoštovanje standardov.
            </p>
          </div>

          <div className={styles.ctaBtnGroup}>
            <Link href="/meni" className={styles.btnPrimary}>
              <span>Razišči meni ({MENU_STATS.total} jedi)</span>
              <ArrowRightIcon />
            </Link>
            <Link href="/kontakt" className={styles.btnSecondary}>
              <span>Kontakt & Rezervacije</span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
