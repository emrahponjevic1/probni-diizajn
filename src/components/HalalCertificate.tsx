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

const BanPorkSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const NoAlcoholSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8" />
    <path d="M12 15v7" />
    <path d="m12 15 5-7.5V3H7v4.5l5 7.5z" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

export default function HalalCertificate() {
  const [activeSplitStyle, setActiveSplitStyle] = useState<"A" | "B" | "C">("A");

  return (
    <section className={styles.halalSection} id="halal">
      <div className={styles.bgWarmGlow} />

      <div className={styles.halalContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Split-View Variacij</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveSplitStyle("A")}
              className={`${styles.styleTabBtn} ${activeSplitStyle === "A" ? styles.styleTabBtnActive : ""}`}
            >
              Verzija A: Klasični Stebri (Pillars)
            </button>
            <button
              type="button"
              onClick={() => setActiveSplitStyle("B")}
              className={`${styles.styleTabBtn} ${activeSplitStyle === "B" ? styles.styleTabBtnActive : ""}`}
            >
              Verzija B: Bento 2x2 Mreža + Zlati Žig
            </button>
            <button
              type="button"
              onClick={() => setActiveSplitStyle("C")}
              className={`${styles.styleTabBtn} ${activeSplitStyle === "C" ? styles.styleTabBtnActive : ""}`}
            >
              Verzija C: Numerisane Široke Trake
            </button>
          </div>
        </div>

        {/* ==================================================================
            VERZIJA A: KLASIČNI RAM + 3 VERTIKALNA STEBRA (PILLARS)
            ================================================================== */}
        {activeSplitStyle === "A" && (
          <div className={styles.halalGrid}>
            {/* Left: Certificate Visual Frame */}
            <div className={styles.certVisualWrapper}>
              <div className={styles.certCardFrame}>
                <Image
                  src="/images/halal-certificate.jpg"
                  alt="Uradni Halal Certifikat Šeherezada Ljubljana"
                  width={480}
                  height={520}
                  className={styles.certImg}
                />
                <div className={styles.certFloatingVerifiedPill}>
                  <div className={styles.certPillIcon}>
                    <ShieldCheckSvg size={20} />
                  </div>
                  <div className={styles.certPillMeta}>
                    <span className={styles.certPillTitle}>100% Halal Certificirano</span>
                    <span className={styles.certPillSub}>0% Svinjskega mesa · Brez kompromisov</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story & 3 Pillars */}
            <div className={styles.halalRightCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Garancija Kakovosti &amp; Čistosti</span>
              </div>

              <h2 className={styles.halalHeading}>
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
                    <h3 className={styles.guaranteeTitle}>0% Svinjskega mesa &amp; ničelna toleranca</h3>
                    <p className={styles.guaranteeDesc}>
                      V naših kuhinjah velja stroga prepoved svinjine, svinjskih
                      derivatov, alkohola ali kakršnihkoli skritih živalskih maščob.
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
            VERZIJA B: BENTO 2X2 MREŽA + PREKLAPLJAJOČ ZLATI ŽIG
            ================================================================== */}
        {activeSplitStyle === "B" && (
          <div className={styles.halalGrid}>
            {/* Left: Certificate with Corner Badge */}
            <div className={styles.certVisualWrapper}>
              <div className={styles.certCornerBadge}>
                <span className={styles.cornerBadgeIcon}>★</span>
                <span className={styles.cornerBadgeText}>100% PREVERJENO</span>
              </div>

              <div className={styles.certCardFrame}>
                <Image
                  src="/images/halal-certificate.jpg"
                  alt="Uradni Halal Certifikat Šeherezada Ljubljana"
                  width={480}
                  height={520}
                  className={styles.certImg}
                />
                <div className={styles.certFloatingVerifiedPill}>
                  <div className={styles.certPillIcon}>
                    <ShieldCheckSvg size={20} />
                  </div>
                  <div className={styles.certPillMeta}>
                    <span className={styles.certPillTitle}>Uradno Halal Potrjeno</span>
                    <span className={styles.certPillSub}>0% Svinjine · 2 Lokaciji v Ljubljani</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative + 2x2 Bento Cards Grid */}
            <div className={styles.halalRightCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>4 Ključne Zaveze Čistosti</span>
              </div>

              <h2 className={styles.halalHeading}>
                Popolna varnost in zaupanje v vsakem grižljaju.
              </h2>

              <p className={styles.halalLeadText}>
                Pri Šeherezadi ne sklepamo kompromisov. Naš strog sistem nadzora
                vam zagotavlja brezskrbno kulinarično doživetje pristnih okusov.
              </p>

              <div className={styles.bento4Grid}>
                {/* Bento Card 1 */}
                <div className={styles.bento4Card}>
                  <div className={styles.bento4IconBox}>
                    <ShieldCheckSvg size={22} />
                  </div>
                  <h3 className={styles.bento4Title}>100% Halal Meso</h3>
                  <p className={styles.bento4Desc}>
                    Izključno certificirano telečje in piščančje meso z mednarodno sledljivostjo.
                  </p>
                </div>

                {/* Bento Card 2: 0% Pork Highlight */}
                <div className={`${styles.bento4Card} ${styles.bento4CardHighlight}`}>
                  <div className={styles.bento4IconBox}>
                    <BanPorkSvg size={22} />
                  </div>
                  <h3 className={styles.bento4Title} style={{ color: "#ea580c" }}>
                    0% Svinjskega Mesa
                  </h3>
                  <p className={styles.bento4Desc}>
                    Stroga ničelna toleranca za svinjino, slanino ali živalske želatine.
                  </p>
                </div>

                {/* Bento Card 3 */}
                <div className={styles.bento4Card}>
                  <div className={styles.bento4IconBox}>
                    <NoAlcoholSvg size={22} />
                  </div>
                  <h3 className={styles.bento4Title}>100% Brez Alkohola</h3>
                  <p className={styles.bento4Desc}>
                    V celotnem procesu priprave hrane in omak nikoli ne uporabljamo alkohola.
                  </p>
                </div>

                {/* Bento Card 4 */}
                <div className={styles.bento4Card}>
                  <div className={styles.bento4IconBox}>
                    <HerbOrganicSvg size={22} />
                  </div>
                  <h3 className={styles.bento4Title}>Čiste Začimbe &amp; Kruh</h3>
                  <p className={styles.bento4Desc}>
                    Dnevno sveže pečene lepinje in domače zeliščne omake brez kemičnih dodatkov.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            VERZIJA C: NUMERISANE ŠIROKE TRAKE (/01, /02, /03)
            ================================================================== */}
        {activeSplitStyle === "C" && (
          <div className={styles.halalGrid}>
            {/* Left: Clean Minimal Frame */}
            <div className={styles.certVisualWrapper}>
              <div className={styles.certCardFrame}>
                <Image
                  src="/images/halal-certificate.jpg"
                  alt="Uradni Halal Certifikat Šeherezada Ljubljana"
                  width={480}
                  height={520}
                  className={styles.certImg}
                />
                <div className={styles.certFloatingVerifiedPill}>
                  <div className={styles.certPillIcon}>
                    <ShieldCheckSvg size={20} />
                  </div>
                  <div className={styles.certPillMeta}>
                    <span className={styles.certPillTitle}>100% Halal Certificirano</span>
                    <span className={styles.certPillSub}>Vrhunska čistost in transparentnost</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative + 3 Numbered Strips */}
            <div className={styles.halalRightCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Standardi Kakovosti</span>
              </div>

              <h2 className={styles.halalHeading}>
                Zaveza čistosti in avtentičnemu poreklu.
              </h2>

              <p className={styles.halalLeadText}>
                Za vsakim obrokom stoji strogo spoštovanje halal standardov,
                ki zagotavljajo najvišjo raven higiene, etike in kulinaričnega užitka.
              </p>

              <div className={styles.numberedStripsList}>
                {/* Strip 1 */}
                <div className={styles.stripCard}>
                  <div className={styles.stripNumberBadge}>01</div>
                  <div className={styles.stripContent}>
                    <h3 className={styles.stripTitle}>Preverjeno in Certificirano Poreklo</h3>
                    <p className={styles.stripDesc}>
                      Vse meso prihaja iz nadzorovanih evropskih virov z veljavnim certifikatom.
                    </p>
                  </div>
                </div>

                {/* Strip 2 */}
                <div className={styles.stripCard} style={{ borderColor: "#fed7aa", background: "#fffdfa" }}>
                  <div className={styles.stripNumberBadge}>02</div>
                  <div className={styles.stripContent}>
                    <h3 className={styles.stripTitle} style={{ color: "#ea580c" }}>
                      0% Svinjskega Mesa &amp; Brez Alkohola
                    </h3>
                    <p className={styles.stripDesc}>
                      Brezkompromisna čistost kuhinje in popolna odsotnost vseh ne-halal sestavin.
                    </p>
                  </div>
                </div>

                {/* Strip 3 */}
                <div className={styles.stripCard}>
                  <div className={styles.stripNumberBadge}>03</div>
                  <div className={styles.stripContent}>
                    <h3 className={styles.stripTitle}>Dnevno Sveže Pripravljeno</h3>
                    <p className={styles.stripDesc}>
                      Sveže lepinje, marinada po tajnem receptu in lokalna zelenjava vsak dan.
                    </p>
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
