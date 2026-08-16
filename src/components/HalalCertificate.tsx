"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HalalCertificate.module.css";

// Clean Vector SVG Icons (No Emojis)
const ShieldCheckSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const BanPorkSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const SparklesPuritySvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="m5.6 5.6 12.8 12.8" />
    <path d="m5.6 18.4 12.8-12.8" />
  </svg>
);

const HerbOrganicSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
    <path d="M11 20V10" />
  </svg>
);

const AwardSealSvg = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export default function HalalCertificate() {
  const [activeVersion, setActiveVersion] = useState<1 | 2 | 3>(1);

  return (
    <section className={styles.halalSection} id="halal">
      <div className={styles.bgWarmGlow} />

      <div className={styles.halalContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnerskih Verzija (Halal &amp; 0% Svinjine)</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveVersion(1)}
              className={`${styles.styleTabBtn} ${activeVersion === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Verzija 1: Editorial Certifikat (Split-View)
            </button>
            <button
              type="button"
              onClick={() => setActiveVersion(2)}
              className={`${styles.styleTabBtn} ${activeVersion === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Verzija 2: Warm Bento Trust Grid
            </button>
            <button
              type="button"
              onClick={() => setActiveVersion(3)}
              className={`${styles.styleTabBtn} ${activeVersion === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Verzija 3: 3 Varnostna Stebra (Tri-Card)
            </button>
          </div>
        </div>

        {/* ==================================================================
            VERZIJA 1: EDITORIAL CERTIFICATE SHOWCASE (SPLIT-VIEW)
            ================================================================== */}
        {activeVersion === 1 && (
          <div className={styles.v1Grid}>
            {/* Left: Certificate Frame */}
            <div className={styles.v1CertWrapper}>
              <div className={styles.v1CertFrame}>
                <Image
                  src="/images/halal-certificate.jpg"
                  alt="Uradni Halal Certifikat Šeherezada Ljubljana"
                  width={480}
                  height={520}
                  className={styles.v1CertImg}
                />
                <div className={styles.v1FloatingPill}>
                  <div className={styles.v1PillIconBox}>
                    <ShieldCheckSvg size={20} />
                  </div>
                  <div className={styles.v1PillMeta}>
                    <span className={styles.v1PillTitle}>100% Halal Certificirano</span>
                    <span className={styles.v1PillSub}>0% Svinjskega mesa · Brez kompromisov</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative & 3 Trust Guarantees */}
            <div className={styles.v1RightCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Garancija Kakovosti &amp; Čistosti</span>
              </div>

              <h2 className={styles.v1Heading}>
                100% Halal. Brez kompromisov pri čistosti in izvoru.
              </h2>

              <div className={styles.trustPillsRow}>
                <span className={`${styles.trustPillTag} ${styles.trustPillTagHighlight}`}>
                  <span>✓</span>
                  <span>100% Halal Meso</span>
                </span>
                <span className={`${styles.trustPillTag} ${styles.trustPillTagHighlight}`}>
                  <span>✓</span>
                  <span>0% Svinjskega Mesa</span>
                </span>
                <span className={styles.trustPillTag}>
                  <span>✓</span>
                  <span>100% Brez Alkohola</span>
                </span>
              </div>

              <p className={styles.v1LeadText}>
                Pri Šeherezadi spoštujemo vaše zaupanje in kulinarično tradicijo.
                Vsak kos mesa, vsaka omaka in vsaka sestavina v naših dveh
                restavracijah v Ljubljani ustreza najvišjim halal standardom in
                strogemu nadzoru kakovosti.
              </p>

              <div className={styles.v1GuaranteesList}>
                {/* Guarantee 1 */}
                <div className={styles.v1GuaranteeCard}>
                  <div className={styles.v1IconBox}>
                    <ShieldCheckSvg size={24} />
                  </div>
                  <div className={styles.v1CardContent}>
                    <h3 className={styles.v1CardTitle}>Strogo nadzorovano poreklo</h3>
                    <p className={styles.v1CardDesc}>
                      Uporabljamo izključno telečje in piščančje meso z veljavnim
                      mednarodnim certifikatom in popolno sledljivostjo od kmetije.
                    </p>
                  </div>
                </div>

                {/* Guarantee 2 */}
                <div className={styles.v1GuaranteeCard}>
                  <div className={styles.v1IconBox}>
                    <BanPorkSvg size={24} />
                  </div>
                  <div className={styles.v1CardContent}>
                    <h3 className={styles.v1CardTitle}>0% Svinjskega mesa &amp; ničelna toleranca</h3>
                    <p className={styles.v1CardDesc}>
                      V naših kuhinjah velja stroga prepoved svinjine, svinjskih
                      derivatov, alkohola ali kakršnihkoli skritih živalskih maščob.
                    </p>
                  </div>
                </div>

                {/* Guarantee 3 */}
                <div className={styles.v1GuaranteeCard}>
                  <div className={styles.v1IconBox}>
                    <HerbOrganicSvg size={24} />
                  </div>
                  <div className={styles.v1CardContent}>
                    <h3 className={styles.v1CardTitle}>Čiste naravne sestavine</h3>
                    <p className={styles.v1CardDesc}>
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
            VERZIJA 2: WARM LUXURY BENTO TRUST GRID
            ================================================================== */}
        {activeVersion === 2 && (
          <div>
            <div className={styles.v2Header}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Standard Zaupanja</span>
              </div>
              <h2 className={styles.v1Heading}>100% Halal &amp; 0% Svinjskega Mesa</h2>
              <div className={styles.trustPillsRow}>
                <span className={`${styles.trustPillTag} ${styles.trustPillTagHighlight}`}>
                  <span>✓</span>
                  <span>100% Halal Certificirano</span>
                </span>
                <span className={`${styles.trustPillTag} ${styles.trustPillTagHighlight}`}>
                  <span>✓</span>
                  <span>0% Svinjskega Mesa</span>
                </span>
                <span className={styles.trustPillTag}>
                  <span>✓</span>
                  <span>Stalni Veterinarski Nadzor</span>
                </span>
              </div>
            </div>

            <div className={styles.v2BentoGrid}>
              {/* Left Large Bento Card */}
              <div className={styles.v2LargeBentoCard}>
                <div className={styles.v2BentoCertThumb}>
                  <Image
                    src="/images/halal-certificate.jpg"
                    alt="Halal certifikat"
                    width={200}
                    height={260}
                    className={styles.v2BentoCertImg}
                  />
                </div>
                <div className={styles.v2LargeBentoContent}>
                  <div className={styles.sectionBadge} style={{ alignSelf: "flex-start" }}>
                    <span>Uradni Dokument</span>
                  </div>
                  <h3 className={styles.v2LargeBentoTitle}>
                    Certificirana Priprava &amp; Izvor Mesa
                  </h3>
                  <p className={styles.v2LargeBentoDesc}>
                    Vsak dobavitelj mesa je podvržen strogim mednarodnim
                    halal standardom. Zagotavljamo popolno sledljivost in
                    vrhunsko higiensko neoporečnost v obeh naših poslovalnicah v Ljubljani.
                  </p>
                </div>
              </div>

              {/* Right Stack of 3 Bento Cards */}
              <div className={styles.v2RightBentoCol}>
                <div className={`${styles.v2MiniBentoCard} ${styles.v2MiniBentoCardHighlight}`}>
                  <div className={styles.v2MiniIconBox}>
                    <BanPorkSvg size={22} />
                  </div>
                  <div>
                    <h4 className={styles.v2MiniTitle}>0% Svinjskega Mesa</h4>
                    <p className={styles.v2MiniDesc}>
                      Popolnoma ločeni procesi in ničelna toleranca za svinjino ter alkohol.
                    </p>
                  </div>
                </div>

                <div className={styles.v2MiniBentoCard}>
                  <div className={styles.v2MiniIconBox}>
                    <ShieldCheckSvg size={22} />
                  </div>
                  <div>
                    <h4 className={styles.v2MiniTitle}>100% Halal Meso</h4>
                    <p className={styles.v2MiniDesc}>
                      Izključno certificirano telečje in piščančje meso visoke kakovosti.
                    </p>
                  </div>
                </div>

                <div className={styles.v2MiniBentoCard}>
                  <div className={styles.v2MiniIconBox}>
                    <HerbOrganicSvg size={22} />
                  </div>
                  <div>
                    <h4 className={styles.v2MiniTitle}>Naravne Rastlinske Omake</h4>
                    <p className={styles.v2MiniDesc}>
                      Domači prelivi in sveže pečen kruh brez skritih živalskih emulgatorjev.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            VERZIJA 3: 3 TRI-CARD TRUST PILLARS
            ================================================================== */}
        {activeVersion === 3 && (
          <div>
            <div className={styles.v3Header}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>3 Stebri Naše Zaveze</span>
              </div>
              <h2 className={styles.v1Heading}>Brezkompromisna Čistost in Kakovost</h2>
              <p className={styles.v1LeadText}>
                Za vas izbiramo le najboljše. Spoznajte 3 ključne stebre, ki
                zagotavljajo pristnost in varnost vsakega obroka v Šeherezadi.
              </p>
            </div>

            <div className={styles.v3TriCardsGrid}>
              {/* Card 1 */}
              <div className={styles.v3Card}>
                <div className={styles.v3CardIconBox}>
                  <AwardSealSvg size={28} />
                </div>
                <h3 className={styles.v3CardTitle}>Uradni Halal Certifikat</h3>
                <p className={styles.v3CardDesc}>
                  Vsi mesni izdelki imajo veljaven mednarodni halal certifikat z
                  jasno sledljivostjo porekla in stalnim veterinarskim nadzorom.
                </p>
                <div className={styles.v3CardCheckList}>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>100% Telečje &amp; Piščančje</span>
                  </div>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>Mednarodna Verifikacija</span>
                  </div>
                </div>
              </div>

              {/* Card 2 (Featured - 0% Pork) */}
              <div className={`${styles.v3Card} ${styles.v3CardFeatured}`}>
                <span className={styles.v3CardTopBadge}>Glavna Zaveza</span>
                <div className={styles.v3CardIconBox}>
                  <BanPorkSvg size={28} />
                </div>
                <h3 className={styles.v3CardTitle}>0% Svinjskega Mesa</h3>
                <p className={styles.v3CardDesc}>
                  V naših kuhinjah velja stroga ničelna toleranca. Nikoli ne
                  uporabljamo svinjine, svinjske masti, alkohola ali živalskih želatin.
                </p>
                <div className={styles.v3CardCheckList}>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>Brez Svinjskih Derivatov</span>
                  </div>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>100% Brez Alkohola</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.v3Card}>
                <div className={styles.v3CardIconBox}>
                  <SparklesPuritySvg size={28} />
                </div>
                <h3 className={styles.v3CardTitle}>Čiste Naravne Sestavine</h3>
                <p className={styles.v3CardDesc}>
                  Domač kruh pečemo sproti v krušni peči, omake pa pripravljamo
                  izključno iz svežih rastlinskih zelišč in izbranih začimb.
                </p>
                <div className={styles.v3CardCheckList}>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>Dnevno Sveže Pripravljeno</span>
                  </div>
                  <div className={styles.v3CardCheckItem}>
                    <span className={styles.v3CheckMark}>✓</span>
                    <span>Brez Umetnih Dodatkov</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
