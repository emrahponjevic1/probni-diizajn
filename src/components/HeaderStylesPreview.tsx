import styles from "./HeaderStylesPreview.module.css";

export default function HeaderStylesPreview() {
  return (
    <section className={styles.previewSection} id="header-styles">
      <div className={styles.previewContainer}>
        {/* Intro */}
        <div className={styles.showcaseTopIntro}>
          <span className={styles.topPill}>Ekskluzivni Predogled</span>
          <h2 className={styles.showcaseMainTitle}>
            Ghost Watermark Direktno Iza &quot;02 / NAŠA ZGODBA&quot;
          </h2>
          <p className={styles.showcaseDesc}>
            Spodaj je prikazano, kako vodni žig stoji neposredno v ozadju
            same vrstice <strong>&quot;— 02 / NAŠA ZGODBA &amp; TRADICIJA —&quot;</strong>,
            s 3 finimi različicami.
          </p>
        </div>

        {/* ==================================================================
            FEATURED HERO: GLAVNA RAZLIČICA (ZGODBA DIREKTNO IZA VRSTICE)
            ================================================================== */}
        <div className={styles.featuredHeroCard}>
          <div className={styles.featuredHeaderRow}>
            <span className={styles.featuredBadge}>
              ★ Vaš Predlog: Watermark točno za tekstom
            </span>
            <span className={styles.featuredSubtitle}>
              Editorial Chapter Index + Direct Text Watermark Lockup
            </span>
          </div>

          <div className={styles.heroContentStack}>
            {/* Tag with Watermark directly behind it */}
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermarkWord}>ZGODBA</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>02</span> / NAŠA ZGODBA &amp; TRADICIJA
                </span>
                <span className={styles.chapterDash} />
              </div>
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
            3 SUB-VARIATIONS GRID
            ================================================================== */}
        <div className={styles.stylesGrid}>
          {/* Variation A: Word Watermark Behind Text */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Varianta A</span>
              <span className={styles.optionVibe}>Beseda za tekstom</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermarkWord}>TRADICIJA</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>02</span> / NAŠA ZGODBA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h4 className={styles.mockHeading}>
                Pravi ogenj &amp; 24h marinada
              </h4>

              <p className={styles.mockSubtext}>
                Velika beseda &quot;TRADICIJA&quot; stoji neposredno v ozadju
                indeksa z mehkih 6% vidljivosti.
              </p>
            </div>
          </div>

          {/* Variation B: Huge Chapter Number Behind */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Varianta B</span>
              <span className={styles.optionVibe}>Velika številka &quot;02&quot;</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermarkNumber}>02</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>02</span> / NAŠA ZGODBA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h4 className={styles.mockHeading}>
                Kulinarična pot od leta 2004
              </h4>

              <p className={styles.mockSubtext}>
                Ogromna prosojna številka poglavja &quot;02&quot; v topli jantarni
                barvi se diskretno dviga za tekstom.
              </p>
            </div>
          </div>

          {/* Variation C: Halal Certificate Example */}
          <div className={styles.styleCard}>
            <div className={styles.cardHeaderLabel}>
              <span className={styles.optionNumber}>Varianta C (Halal Primer)</span>
              <span className={styles.optionVibe}>Sekcija 03 / Čistost</span>
            </div>

            <div className={styles.cardMockBody}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermarkWord}>HALAL</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>03</span> / GARANCIJA KAKOVOSTI
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h4 className={styles.mockHeading}>
                100% Halal &amp; 0% Svinjskega Mesa
              </h4>

              <p className={styles.mockSubtext}>
                Primer za Halal sekcijo z besedo &quot;HALAL&quot; ali
                &quot;ČISTOST&quot; točno za vrstico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
