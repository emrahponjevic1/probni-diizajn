import Image from "next/image";
import Link from "next/link";
import { HALAL_OZNAKA } from "@/data/halal";
import styles from "./HalalCertificate.module.css";

const ArrowRightSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

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
              {/* Oznaka, ne dokument. Fotografija pravega certifikata je
                  na strani /halal — tam, kjer je zanjo pravo mesto. */}
              <Image
                src={HALAL_OZNAKA.src}
                alt={HALAL_OZNAKA.alt}
                width={HALAL_OZNAKA.width}
                height={HALAL_OZNAKA.height}
                className={styles.certSeal}
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
              100 % halal hrana v Ljubljani — na obeh lokacijah
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
              Vse meso v Šeherezadi je 100 % halal certificirano. V naših kuhinjah
              na Trubarjevi 31 in Slovenski 55 ni svinjine, svinjskih derivatov
              ne alkohola — brez izjem. Na meniju je tudi 7 popolnoma
              rastlinskih jedi.
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

            <Link href="/halal" className={styles.halalMoreLink}>
              <span>Kaj halal pomeni in kako se certificira</span>
              <ArrowRightSvg size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
