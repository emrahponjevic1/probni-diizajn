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

export default function HalalCertificate() {
  return (
    <section className={styles.halalSection} id="halal">
      <div className={styles.bgWarmGlow} />

      <div className={styles.halalContainer}>
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

          {/* Right: Story & 3 Pillars of Trust */}
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
      </div>
    </section>
  );
}
