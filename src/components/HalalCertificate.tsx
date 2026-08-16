"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HalalCertificate.module.css";

// Clean Vector SVG Icons (No Emojis)
const ShieldCheckSvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SparklesPuritySvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="m5.6 5.6 12.8 12.8" />
    <path d="m5.6 18.4 12.8-12.8" />
  </svg>
);

const HerbOrganicSvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
    <path d="M11 20V10" />
  </svg>
);

const BadgeRibbonSvg = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const CheckCircleSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const HelpCircleSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function HalalCertificate() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3>(1);

  return (
    <section className={styles.halalSection} id="halal">
      <div className={styles.bgMintGlow} />

      <div className={styles.halalContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnerskih Stilov (Halal)</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: Zlati Standard (Certifikat + 3 Garancije)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: Halal Trust Bento Banner
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Zaveza + 3 Ključna Vprašanja (FAQ)
            </button>
          </div>
        </div>

        {/* ==================================================================
            OPCIJA 1: ZLATI STANDARD ČISTOSTI (CERTIFIKAT + 3 GARANCIJE)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.option1Grid}>
            {/* Left: Certificate Visual Frame */}
            <div className={styles.certVisualWrapper}>
              <div className={styles.certCardFrame}>
                <Image
                  src="/images/halal-certificate.jpg"
                  alt="Uradni Halal Certifikat Šeherezada Ljubljana"
                  width={460}
                  height={540}
                  className={styles.certImg}
                />
                <div className={styles.certFloatingVerifiedPill}>
                  <div className={styles.certPillIcon}>
                    <ShieldCheckSvg size={20} />
                  </div>
                  <div className={styles.certPillMeta}>
                    <span className={styles.certPillTitle}>100% Halal Certificirano</span>
                    <span className={styles.certPillSub}>Stalni veterinarski in halal nadzor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story & 3 Pillars of Trust */}
            <div className={styles.option1RightCol}>
              <div className={styles.mintSectionBadge}>
                <span className={styles.mintBadgeDot} />
                <span>Garancija Kakovosti &amp; Čistosti</span>
              </div>

              <h2 className={styles.halalHeading}>
                100% Halal. Brez kompromisov pri čistosti in izvoru.
              </h2>

              <p className={styles.halalLeadText}>
                Pri Šeherezadi spoštujemo vaše zaupanje in kulinarično tradicijo.
                Vsak kos mesa, vsaka omaka in vsaka sestavina v naših dveh
                restavracijah v Ljubljani ustreza najvišjim halal standardom in
                strogemu nadzoru kakovosti.
              </p>

              <div className={styles.guaranteesList}>
                {/* Guarantee 1 */}
                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIconBox}>
                    <ShieldCheckSvg size={24} />
                  </div>
                  <div className={styles.guaranteeContent}>
                    <h3 className={styles.guaranteeTitle}>Strogo nadzorovano poreklo</h3>
                    <p className={styles.guaranteeDesc}>
                      Uporabljamo izključno telečje in piščančje meso z veljavnim
                      mednarodnim certifikatom in popolno sledljivostjo od kmetije.
                    </p>
                  </div>
                </div>

                {/* Guarantee 2 */}
                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIconBox}>
                    <SparklesPuritySvg size={24} />
                  </div>
                  <div className={styles.guaranteeContent}>
                    <h3 className={styles.guaranteeTitle}>Ničelna toleranca za nečistoče</h3>
                    <p className={styles.guaranteeDesc}>
                      V naših kuhinjah ni prisotnega svinjskega mesa, alkohola ali
                      kakršnihkoli skritih živalskih maščobnih dodatkov.
                    </p>
                  </div>
                </div>

                {/* Guarantee 3 */}
                <div className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIconBox}>
                    <HerbOrganicSvg size={24} />
                  </div>
                  <div className={styles.guaranteeContent}>
                    <h3 className={styles.guaranteeTitle}>Čiste naravne sestavine</h3>
                    <p className={styles.guaranteeDesc}>
                      Vse omake, solate in kruh so pripravljeni dnevno sveže iz
                      naravnih rastlinskih sestavin in pristnih orientalskih zelišč.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: HALAL TRUST BENTO BANNER
            ================================================================== */}
        {activeStyle === 2 && (
          <div className={styles.bentoBannerCard}>
            <div className={styles.bentoBannerTopRow}>
              <div className={styles.bentoSealEmblem}>
                <BadgeRibbonSvg size={42} />
              </div>
              <div className={styles.bentoBannerText}>
                <div className={styles.mintSectionBadge}>
                  <span className={styles.mintBadgeDot} />
                  <span>Uradna Zaveza Gostom</span>
                </div>
                <h2 className={styles.bentoBannerTitle}>
                  Avtentična Halal Tradicija v Srcu Ljubljane.
                </h2>
                <p className={styles.bentoBannerDesc}>
                  Pri Šeherezadi je vsaka jed pripravljena v skladu s strogimi
                  halal načeli. Zavezani smo popolni transparentnosti, higieni
                  in kulinarični odličnosti, ki ji zaupajo tisoči gostov.
                </p>
              </div>
            </div>

            <div className={styles.bentoBannerPillGrid}>
              <div className={styles.bentoPillItem}>
                <div className={styles.bentoPillCheckIcon}>✓</div>
                <span className={styles.bentoPillText}>
                  100% Certificirano Telečje in Piščančje Meso
                </span>
              </div>

              <div className={styles.bentoPillItem}>
                <div className={styles.bentoPillCheckIcon}>✓</div>
                <span className={styles.bentoPillText}>
                  Strogo Brez Svinjskega Mesa in Brez Alkohola
                </span>
              </div>

              <div className={styles.bentoPillItem}>
                <div className={styles.bentoPillCheckIcon}>✓</div>
                <span className={styles.bentoPillText}>
                  Dnevno Sveže Pripravljeno v Naših 2 Lokacijah
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: HALAL ZAVEZA + 3 NAJPOGOSTEJŠA VPRAŠANJA (FAQ)
            ================================================================== */}
        {activeStyle === 3 && (
          <div className={styles.faqGrid}>
            <div className={styles.faqLeftIntro}>
              <div className={styles.mintSectionBadge}>
                <span className={styles.mintBadgeDot} />
                <span>Transparentnost &amp; Odgovori</span>
              </div>
              <h2 className={styles.halalHeading}>
                Vse, kar morate vedeti o naši Halal certifikaciji.
              </h2>
              <p className={styles.halalLeadText}>
                Ker je zaupanje temelj našega dela, smo zbrali najpogostejša
                vprašanja naših gostov o pripravi hrane, sestavinah in nadzoru.
              </p>
            </div>

            <div className={styles.faqList}>
              {/* FAQ Item 1 */}
              <div className={styles.faqItemCard}>
                <div className={styles.faqQuestionRow}>
                  <span className={styles.faqQIcon}>Q:</span>
                  <h3 className={styles.faqQuestionText}>
                    Ali so vse jedi na celotnem meniju 100% Halal?
                  </h3>
                </div>
                <p className={styles.faqAnswerText}>
                  Da, celoten meni v Šeherezadi (kebabi, dürüm zvitki, pizze,
                  falafel, kruh in hišne omake) je 100% Halal in pripravljen po
                  strogih pravilih čistoče.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className={styles.faqItemCard}>
                <div className={styles.faqQuestionRow}>
                  <span className={styles.faqQIcon}>Q:</span>
                  <h3 className={styles.faqQuestionText}>
                    Od kod prihaja vaše meso in kako je preverjeno?
                  </h3>
                </div>
                <p className={styles.faqAnswerText}>
                  Meso nabavljamo izključno pri certificiranih evropskih
                  dobaviteljih z veljavnimi halal potrdili in rednim
                  veterinarskim ter higienskim nadzorom.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className={styles.faqItemCard}>
                <div className={styles.faqQuestionRow}>
                  <span className={styles.faqQIcon}>Q:</span>
                  <h3 className={styles.faqQuestionText}>
                    Ali v kuhinji uporabljate alkohol ali svinjske dodatke?
                  </h3>
                </div>
                <p className={styles.faqAnswerText}>
                  Nikoli. V naših prostorih in recepturah velja stroga ničelna
                  toleranca do svinjine, alkohola in živalskih želatin ali
                  primesi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
