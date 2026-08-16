import styles from "./HeaderStylesPreview.module.css";

export default function HeaderStylesPreview() {
  return (
    <section className={styles.previewSection} id="header-styles">
      <div className={styles.previewContainer}>
        {/* Intro */}
        <div className={styles.showcaseTopIntro}>
          <span className={styles.topPill}>Ekskluzivni Predogled</span>
          <h2 className={styles.showcaseMainTitle}>
            4 Editorial Dizajna Naslova (Brez Generičnih Bedžev)
          </h2>
          <p className={styles.showcaseDesc}>
            Spodaj so 4 unikatni, luksuzni pristopi za označevanje sekcij, ki
            nadomestijo generične AI pilule. Poglejte, kako vsak slog deluje v
            praksi.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className={styles.stylesGrid}>
          {/* Option 1: Editorial Chapter Index */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 1</span>
              <span className={styles.optionVibe}>Michelin / Editorial Knjižni Slog</span>
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
                linijama. Popolnoma brez okvira ali ozadja.
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

          {/* Option 3: Ghost Typography / Layered Watermark */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Opcija 3</span>
              <span className={styles.optionVibe}>Luxury Hotel &amp; Fine Dining</span>
            </div>

            <div className={styles.ghostTagWrapper}>
              <span className={styles.ghostWatermarkText}>TRADICIJA</span>

              <div className={styles.cardMockBody}>
                <div className={styles.ghostFrontTag}>
                  <span>Tradicija okusov od leta 2004 →</span>
                </div>

                <h3 className={styles.mockHeading}>
                  100% Halal. Brez kompromisov pri čistosti.
                </h3>

                <p className={styles.mockSubtext}>
                  V ozadju je velik, komaj opazen vodni žig (4% vidljivost),
                  spredaj pa eleganten, čist mikro-podnaslov.
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
                Ustvari vtis resne gastronomske institucije.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
