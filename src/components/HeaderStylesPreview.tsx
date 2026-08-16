import styles from "./HeaderStylesPreview.module.css";

export default function HeaderStylesPreview() {
  return (
    <section className={styles.previewSection} id="header-styles">
      <div className={styles.previewContainer}>
        {/* Intro */}
        <div className={styles.showcaseTopIntro}>
          <span className={styles.topPill}>Ekskluzivni Predogled</span>
          <h2 className={styles.showcaseMainTitle}>
            Editorial Dizajni Naslova (Brez Generičnih Bedžev)
          </h2>
          <p className={styles.showcaseDesc}>
            Spodaj je vaša nova <strong>Opcija 5 (Hibrid 1 + 3)</strong> ter
            preostale opcije za primerjavo.
          </p>
        </div>

        {/* ==================================================================
            FEATURED HERO: OPCIJA 5 (HIBRID 1 + 3)
            ================================================================== */}
        <div className={styles.featuredHeroCard}>
          {/* Ghost Watermark in Background */}
          <span className={styles.heroWatermark}>TRADICIJA</span>

          <div className={styles.featuredHeaderRow}>
            <span className={styles.featuredBadge}>
              ★ Vaša Ideja: Opcija 5 (Hibrid 1 + 3)
            </span>
            <span className={styles.featuredSubtitle}>
              Editorial Chapter Index + Layered Ghost Watermark
            </span>
          </div>

          <div className={styles.heroContentStack}>
            {/* Editorial Chapter Tag from Option 1 */}
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>02</span> / NAŠA ZGODBA &amp; TRADICIJA
              </span>
              <span className={styles.chapterDash} />
            </div>

            {/* Main Heading */}
            <h3 className={styles.heroHeading}>
              Od pravega ognja do popolnega okusa.
            </h3>

            <p className={styles.heroDesc}>
              V restavraciji Šeherezada že več kot dve desetletji ohranjamo
              pristno kulinarično dediščino. Naša skrivnost ni v zapletenosti,
              temveč v potrpežljivosti, izbranih sestavinah in spoštovanju
              tradicionalnih receptur.
            </p>
          </div>
        </div>

        {/* ==================================================================
            4 COMPARISON CARDS (PREOSTALE OPCIJE)
            ================================================================== */}
        <div className={styles.stylesGrid}>
          {/* Option 1: Pure Editorial Chapter Index */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 1</span>
              <span className={styles.optionVibe}>Čisti Knjižni Indeks</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>02</span> / NAŠA ZGODBA &amp; TRADICIJA
                </span>
                <span className={styles.chapterDash} />
              </div>

              <h3 className={styles.mockHeading}>
                Od pravega ognja do popolnega okusa.
              </h3>

              <p className={styles.mockSubtext}>
                Časopisni indeks z diskretno številko poglavja in tankima
                linijama. Brez vodnega žiga.
              </p>
            </div>
          </div>

          {/* Option 2: Artisanal Line Accent */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 2</span>
              <span className={styles.optionVibe}>Organski Minimalizem</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.lineAccentTag}>
                <span className={styles.accentBar} />
                <span>Kulinarična Dediščina Ljubljane</span>
              </div>

              <h3 className={styles.mockHeading}>
                Zaveza čistosti in avtentičnemu poreklu.
              </h3>

              <p className={styles.mockSubtext}>
                Kratka topla akcentna linija (28px) pred čistim tekstom, ki ustvari
                prijeten vizualni fokus in ritem branja.
              </p>
            </div>
          </div>

          {/* Option 3: Pure Ghost Typography */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 3</span>
              <span className={styles.optionVibe}>Luxury Hotel &amp; Fine Dining</span>
            </div>

            <div className={styles.ghostTagWrapper}>
              <span className={styles.ghostWatermarkText}>ČISTOST</span>

              <div className={styles.cardMockBody}>
                <div className={styles.ghostFrontTag}>
                  <span>Tradicija okusov od leta 2004 →</span>
                </div>

                <h3 className={styles.mockHeading}>
                  100% Halal. Brez kompromisov pri čistosti.
                </h3>

                <p className={styles.mockSubtext}>
                  V ozadju je velik, komaj opazen vodni žig, spredaj pa
                  klasičen tekst.
                </p>
              </div>
            </div>
          </div>

          {/* Option 4: Frameless Minimalist Tag */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 4</span>
              <span className={styles.optionVibe}>Sodobni Prestižni Monogram</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.framelessLeadTag}>
                <span>Ljubljana</span>
                <span className={styles.tagDotSeparator}>·</span>
                <span className={styles.tagAccentWord}>Trubarjeva &amp; Dunajska</span>
                <span className={styles.tagDotSeparator}>·</span>
                <span>Od 2004</span>
              </div>

              <h3 className={styles.mockHeading}>
                Pristni orientalski žar in domači kruh.
              </h3>

              <p className={styles.mockSubtext}>
                Popolnoma raven tekst s srednjimi pikicami kot separatorji.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
