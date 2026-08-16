"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./StudentVouchers.module.css";

// Clean Vector SVG Icons (No Emojis)
const LocationPinSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UtensilsSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 11v11" />
    <path d="M6 2v20" />
    <path d="M9 2v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
  </svg>
);

const SoupSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11h16a8 8 0 0 1-16 0z" />
    <path d="M6 8V5" />
    <path d="M10 8V4" />
    <path d="M14 8V5" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </svg>
);

const AppleSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.94c1.5 0 2.75-1.06 4-1.06 1.3 0 2.4 1.06 4 1.06 1.7 0 3-1.6 3-3.5 0-3.5-2.5-6.5-6-6.5-1.5 0-2.5.5-3 1-.5-.5-1.5-1-3-1-3.5 0-6 3-6 6.5 0 1.9 1.3 3.5 3 3.5 1.6 0 2.7-1.06 4-1.06z" />
    <path d="M12 10V6c0-2 2-3 4-3" />
  </svg>
);

const DrinkSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const ArrowRightSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function StudentVouchers() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3 | 4>(1);

  return (
    <section className={styles.studentSection} id="boni">
      <div className={styles.bgWarmGlow} />

      <div className={styles.studentContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnov Študentskih Bonov</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: Vaš Layout (Bento Grid Master)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: Kaj Vsebuje Bon (4-v-1 Pladenj)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Editorial Split-Magazine
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(4)}
              className={`${styles.styleTabBtn} ${activeStyle === 4 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 4: 3 Najboljši Študentski Meniji
            </button>
          </div>
        </div>

        {/* Section Header with Editorial Chapter Lockup */}
        <div className={styles.sectionHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>BONI</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>04</span> / ŠTUDENTSKA PREHRANA
              </span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            Šeherezada: <span className={styles.titleEmphasis}>Bodi sit</span> med študijem!
          </h2>

          <p className={styles.sectionSubtitle}>
            Ugodni, sveži in nasitni topli obroki na študentske bone. Izkoristite
            subvencionirano prehrano na obeh naših lokacijah v Ljubljani.
          </p>
        </div>

        {/* ==================================================================
            OPCIJA 1: USER LAYOUT (BENTO GRID MASTER)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.bentoLayoutWrapper}>
            {/* Top Row: Hero Banner (60%) + Photo Card (40%) */}
            <div className={styles.bentoTopRow}>
              {/* Left Large Card */}
              <div className={styles.bentoHeroBanner}>
                <span className={styles.bannerGhostWatermark}>BONI</span>

                <div>
                  <div className={styles.bannerTopBadge}>
                    <span>Študentski Boni Sprejeti</span>
                  </div>

                  <h3 className={styles.bannerMainHeading}>
                    Izkoristi študentske bone v Šeherezadi
                  </h3>
                </div>

                <div className={styles.bannerBottomRow}>
                  <a href="#meni" className={styles.bannerCtaBtn}>
                    <span>Več o Študentskih Bonih</span>
                    <ArrowRightSvg size={16} />
                  </a>

                  <p className={styles.bannerLeadText}>
                    Najboljši kebab in falafel v mestu zdaj še ugodneje za študente.
                  </p>
                </div>
              </div>

              {/* Right Photo Card */}
              <div className={styles.bentoRightPhotoCard}>
                <Image
                  src="/images/student-kitchen.jpg"
                  alt="Prijazna ekipa Šeherezade pripravlja sveže študentske obroke"
                  width={500}
                  height={380}
                  className={styles.bentoRightPhotoImg}
                />
              </div>
            </div>

            {/* Bottom Row: 3 Bento Cards */}
            <div className={styles.bentoBottomRow}>
              {/* Card 1: Locations */}
              <div className={styles.bentoLocCard}>
                <div className={styles.locCardHeader}>
                  <h4 className={styles.locCardTitle}>Na vseh lokacijah</h4>
                  <span className={styles.locCountBadge}>2 Lokaciji v LJ</span>
                </div>

                <div className={styles.locList}>
                  <div className={styles.locItem}>
                    <div className={styles.locNameCol}>
                      <LocationPinSvg size={16} />
                      <span>Šeherezada 1 <span className={styles.locAddress}>(Trubarjeva cesta 31)</span></span>
                    </div>
                    <span className={styles.liveOpenPill}>● Odprto</span>
                  </div>

                  <div className={styles.locItem}>
                    <div className={styles.locNameCol}>
                      <LocationPinSvg size={16} />
                      <span>Šeherezada 2 <span className={styles.locAddress}>(Dunajska cesta 106)</span></span>
                    </div>
                    <span className={styles.liveOpenPill}>● Odprto</span>
                  </div>
                </div>

                <div className={styles.locBottomAccentBar}>
                  <div className={styles.locAccentFill} />
                </div>
              </div>

              {/* Card 2: Doplačilo */}
              <div className={styles.bentoPriceCard}>
                <span className={styles.priceCardLabel}>DOPLAČILO</span>
                <span className={styles.priceMinHighlight}>MIN.</span>
                <p className={styles.priceCardDesc}>
                  Najnižje možno doplačilo v Ljubljani za celoten topel obrok,
                  juho/solato, pijačo in sadje.
                </p>
              </div>

              {/* Card 3: Food Preview Card */}
              <div className={styles.bentoFoodPreviewCard}>
                <Image
                  src="/images/student-meal.jpg"
                  alt="Kebab študentski meni"
                  width={300}
                  height={200}
                  className={styles.bentoFoodBgImg}
                />
                <div className={styles.bentoFoodOverlay} />

                <h4 className={styles.bentoFoodTitle}>Kebab Meni</h4>

                <div className={styles.bentoFoodIconsRow}>
                  <div className={styles.bentoFoodIconCircle} title="Glavna jed (Kebab)">
                    <UtensilsSvg size={16} />
                  </div>
                  <div className={styles.bentoFoodIconCircle} title="Sveža solata / Juha">
                    <SoupSvg size={16} />
                  </div>
                  <div className={styles.bentoFoodIconCircle} title="Sveže sadje (Jabolko)">
                    <AppleSvg size={16} />
                  </div>
                  <div className={styles.bentoFoodIconCircle} title="Voda / Pijača">
                    <DrinkSvg size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: KAJ VSEBUJE BON (4-V-1 PLADENJ)
            ================================================================== */}
        {activeStyle === 2 && (
          <div>
            <div className={styles.trayGrid}>
              {/* Item 1 */}
              <div className={styles.trayCard}>
                <div className={styles.trayIconBox}>
                  <UtensilsSvg size={24} />
                </div>
                <span className={styles.trayStepNum}>Del 01 / Glavna Jed</span>
                <h4 className={styles.trayTitle}>Topel Döner, Wrap ali Falafel</h4>
                <p className={styles.trayDesc}>
                  Izberite svojo najljubšo glavno jed s sveže pečenim domačim kruhom ali rižem.
                </p>
              </div>

              {/* Item 2 */}
              <div className={styles.trayCard}>
                <div className={styles.trayIconBox}>
                  <SoupSvg size={24} />
                </div>
                <span className={styles.trayStepNum}>Del 02 / Predjed</span>
                <h4 className={styles.trayTitle}>Dnevna Juha ali Solata</h4>
                <p className={styles.trayDesc}>
                  Sveža hrustljava zelenjava z mediteranskim prelivom ali topla domača juha.
                </p>
              </div>

              {/* Item 3 */}
              <div className={styles.trayCard}>
                <div className={styles.trayIconBox}>
                  <AppleSvg size={24} />
                </div>
                <span className={styles.trayStepNum}>Del 03 / Vitamini</span>
                <h4 className={styles.trayTitle}>Sezonsko Sveže Sadje</h4>
                <p className={styles.trayDesc}>
                  Vsak obrok vključuje sveže jabolko, banano ali sezonsko sadje za energijo.
                </p>
              </div>

              {/* Item 4 */}
              <div className={styles.trayCard}>
                <div className={styles.trayIconBox}>
                  <DrinkSvg size={24} />
                </div>
                <span className={styles.trayStepNum}>Del 04 / Odžejanje</span>
                <h4 className={styles.trayTitle}>Voda ali Osvežilna Pijača</h4>
                <p className={styles.trayDesc}>
                  Brezplačna voda ali izbira osvežilnega naravnega napitka ob vsakem bonu.
                </p>
              </div>
            </div>

            <div className={styles.traySummaryBanner}>
              <div className={styles.traySummaryText}>
                <h4 className={styles.traySummaryTitle}>Popoln obrok z minimalnim doplačilom</h4>
                <span className={styles.traySummarySub}>Velja vsak delovnik in vikend na Trubarjevi 31 &amp; Dunajski 106.</span>
              </div>
              <a href="#lokacije" className={styles.bannerCtaBtn}>
                <span>Najdi Najbližjo Lokacijo</span>
                <ArrowRightSvg size={16} />
              </a>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: EDITORIAL SPLIT-MAGAZINE (ŠTUDENTSKI VODNIK)
            ================================================================== */}
        {activeStyle === 3 && (
          <div className={styles.splitGuideGrid}>
            {/* Left Photo Column */}
            <div className={styles.splitGuidePhotoCol}>
              <Image
                src="/images/student-meal.jpg"
                alt="Študentski pladenj kosila Šeherezada"
                width={550}
                height={500}
                className={styles.splitGuidePhotoImg}
              />
              <span className={styles.splitGuidePillBadge}>Subvencionirana Prehrana</span>
              <div className={styles.splitGuideFloatingCard}>
                <LocationPinSvg size={18} />
                <span style={{ fontSize: "0.86rem", fontWeight: 800, color: "#1c1917" }}>
                  Trubarjeva 31 &amp; Dunajska 106 · Ljubljana
                </span>
              </div>
            </div>

            {/* Right Steps Guide */}
            <div>
              <h3 className={styles.sectionTitle} style={{ fontSize: "2.2rem" }}>
                Preprost postopek unovčenja študentskih bonov
              </h3>

              <div className={styles.splitGuideStepsList}>
                <div className={styles.splitGuideStepItem}>
                  <span className={styles.splitStepNum}>01</span>
                  <div className={styles.splitStepContent}>
                    <h4 className={styles.splitStepTitle}>Izberi svoj meni na blagajni</h4>
                    <p className={styles.splitStepDesc}>
                      Povejte osebju, katero glavno jed želite (döner, wrap, falafel ali pizzo).
                    </p>
                  </div>
                </div>

                <div className={styles.splitGuideStepItem}>
                  <span className={styles.splitStepNum}>02</span>
                  <div className={styles.splitStepContent}>
                    <h4 className={styles.splitStepTitle}>Brezkontaktna identifikacija</h4>
                    <p className={styles.splitStepDesc}>
                      Prislonite telefon ali študentsko kartico k terminalu za hitro unovčenje bona.
                    </p>
                  </div>
                </div>

                <div className={styles.splitGuideStepItem}>
                  <span className={styles.splitStepNum}>03</span>
                  <div className={styles.splitStepContent}>
                    <h4 className={styles.splitStepTitle}>Prevzemi topel in bogat obrok</h4>
                    <p className={styles.splitStepDesc}>
                      V nekaj minutah prejmete sveže pripravljeno kosilo s solato, sadjem in pijačo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 4: 3 NAJBOLJŠI ŠTUDENTSKI MENIJI
            ================================================================== */}
        {activeStyle === 4 && (
          <div className={styles.menusGrid}>
            {/* Menu 1 */}
            <div className={styles.menuCard}>
              <div className={styles.menuCardImgWrapper}>
                <Image
                  src="/images/doner-kebab.jpg"
                  alt="Döner Kebab Študentski Meni"
                  width={400}
                  height={220}
                  className={styles.menuCardImg}
                />
                <span className={styles.menuCardBadge}>Najbolj Priljubljeno</span>
              </div>
              <div className={styles.menuCardBody}>
                <h4 className={styles.menuCardTitle}>Döner Kebab Meni</h4>
                <div className={styles.menuCardIncludesList}>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Döner sendvič v domačem kruhu</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Hrustljav pomfri ali mešana solata</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Sveže jabolko + voda</div>
                </div>
                <div className={styles.menuPriceRow}>
                  <span className={styles.menuPriceLabel}>Doplačilo</span>
                  <span className={styles.menuPriceValue}>MIN.</span>
                </div>
              </div>
            </div>

            {/* Menu 2 */}
            <div className={styles.menuCard}>
              <div className={styles.menuCardImgWrapper}>
                <Image
                  src="/images/durum-falafel.jpg"
                  alt="Dürüm Wrap Študentski Meni"
                  width={400}
                  height={220}
                  className={styles.menuCardImg}
                />
                <span className={styles.menuCardBadge} style={{ background: "#f59e0b" }}>Hiter Prevzem</span>
              </div>
              <div className={styles.menuCardBody}>
                <h4 className={styles.menuCardTitle}>Dürüm Wrap Meni</h4>
                <div className={styles.menuCardIncludesList}>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Velik zvit lavaš wrap z mesom</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Sveža solata z jogurtovim prelivom</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Sveže sadje + voda</div>
                </div>
                <div className={styles.menuPriceRow}>
                  <span className={styles.menuPriceLabel}>Doplačilo</span>
                  <span className={styles.menuPriceValue}>MIN.</span>
                </div>
              </div>
            </div>

            {/* Menu 3 */}
            <div className={styles.menuCard}>
              <div className={styles.menuCardImgWrapper}>
                <Image
                  src="/images/falafel.jpg"
                  alt="Falafel Vegi Študentski Meni"
                  width={400}
                  height={220}
                  className={styles.menuCardImg}
                />
                <span className={styles.menuCardBadge} style={{ background: "#059669" }}>100% Vegi Hit</span>
              </div>
              <div className={styles.menuCardBody}>
                <h4 className={styles.menuCardTitle}>Falafel Vegi Meni</h4>
                <div className={styles.menuCardIncludesList}>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Zlati falafel polpeti + domač humus</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Topel lepinja kruh + mešana solata</div>
                  <div className={styles.menuIncludeItem}><span className={styles.menuIncludeDot} /> Sveže sadje + voda</div>
                </div>
                <div className={styles.menuPriceRow}>
                  <span className={styles.menuPriceLabel}>Doplačilo</span>
                  <span className={styles.menuPriceValue}>MIN.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
