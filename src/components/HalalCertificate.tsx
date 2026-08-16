import Image from "next/image";
import styles from "./HalalCertificate.module.css";

// Clean Vector SVG Icons (No Emojis)
const ShieldCheckSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
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
                height={540}
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

          {/* Right: Story & 3 Numbered Strips */}
          <div className={styles.halalRightCol}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>HALAL</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>03</span> / GARANCIJA KAKOVOSTI
                </span>
                <span className={styles.chapterDash} />
              </div>
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

            <div className={styles.numberedStripsList}>
              {/* Strip 1 */}
              <div className={styles.stripCard}>
                <div className={styles.stripNumberBadge}>01</div>
                <div className={styles.stripContent}>
                  <h3 className={styles.stripTitle}>Preverjeno in Certificirano Poreklo</h3>
                  <p className={styles.stripDesc}>
                    Uporabljamo izključno telečje in piščančje meso iz nadzorovanih
                    evropskih virov z veljavnim mednarodnim certifikatom in sledljivostjo.
                  </p>
                </div>
              </div>

              {/* Strip 2: Highlighted 0% Pork Guarantee */}
              <div className={`${styles.stripCard} ${styles.stripCardHighlight}`}>
                <div className={styles.stripNumberBadge}>02</div>
                <div className={styles.stripContent}>
                  <h3 className={styles.stripTitle} style={{ color: "#ea580c" }}>
                    0% Svinjskega Mesa &amp; Brez Alkohola
                  </h3>
                  <p className={styles.stripDesc}>
                    V naših kuhinjah velja stroga prepoved svinjine, svinjskih derivatov,
                    alkohola ali kakršnihkoli skritih živalskih maščob.
                  </p>
                </div>
              </div>

              {/* Strip 3 */}
              <div className={styles.stripCard}>
                <div className={styles.stripNumberBadge}>03</div>
                <div className={styles.stripContent}>
                  <h3 className={styles.stripTitle}>Dnevno Sveže Pripravljeno</h3>
                  <p className={styles.stripDesc}>
                    Vsako jutro sveže pečene domače lepinje, marinada po tajnem
                    receptu in lokalno pridelana sveža zelenjava.
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
