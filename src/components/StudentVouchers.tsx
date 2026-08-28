import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LOCATIONS } from "@/data/locations";
import { MENU_STATS, STUDENT_BON } from "./menu/MenuData";
import StatusBadge from "./locations/StatusBadge";
import styles from "./StudentVouchers.module.css";

// Clean Vector SVG Icons (No Emojis)
const LocationPinSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UtensilsSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 11v11" />
    <path d="M6 2v20" />
    <path d="M9 2v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
  </svg>
);

const SoupSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11h16a8 8 0 0 1-16 0z" />
    <path d="M6 8V5" />
    <path d="M10 8V4" />
    <path d="M14 8V5" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </svg>
);

const AppleSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.94c1.5 0 2.75-1.06 4-1.06 1.3 0 2.4 1.06 4 1.06 1.7 0 3-1.6 3-3.5 0-3.5-2.5-6.5-6-6.5-1.5 0-2.5.5-3 1-.5-.5-1.5-1-3-1-3.5 0-6 3-6 6.5 0 1.9 1.3 3.5 3 3.5 1.6 0 2.7-1.06 4-1.06z" />
    <path d="M12 10V6c0-2 2-3 4-3" />
  </svg>
);

const DrinkSvg = ({ size = 16 }: { size?: number }) => (
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
  // Besedila so v messages/<jezik>.json pod ključem "boniOdsek".
  const t = useTranslations("boniOdsek");

  // Doplačilo se ne prepisuje: pride iz STUDENT_BON v MenuData.ts.
  const doplacilo = `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`;

  return (
    <section className={styles.studentSection} id="boni">
      <div className={styles.bgWarmGlow} />

      <div className={styles.studentContainer}>
        {/* Section Header with Editorial Chapter Lockup */}
        <div className={styles.sectionHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>04</span> / {t("oznakaPoglavja")}
              </span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            {t.rich("naslov", {
              poudarek: (chunks) => <span className={styles.titleEmphasis}>{chunks}</span>,
              druga: (chunks) => <span className={styles.titleSecondLine}>{chunks}</span>,
            })}
          </h2>

          <p className={styles.sectionSubtitle}>
            {t("podnaslov", {
              naBon: MENU_STATS.student,
              vseh: MENU_STATS.total,
              doplacilo: doplacilo,
            })}
          </p>
        </div>

        {/* Bento Grid Master Layout */}
        <div className={styles.bentoLayoutWrapper}>
          {/* Top Row: Hero Banner (60%) + Photo Card (40%) */}
          <div className={styles.bentoTopRow}>
            {/* Left Large Card */}
            <div className={styles.bentoHeroBanner}>
              <span className={styles.bannerGhostWatermark}>{t("vodniZnak")}</span>

              <div>
                <div className={styles.bannerTopBadge}>
                  <span>{t("znacka")}</span>
                </div>

                <h3 className={styles.bannerMainHeading}>{t("bannerNaslov")}</h3>
              </div>

              <div className={styles.bannerBottomRow}>
                <Link href="/studentski-boni" className={styles.bannerCtaBtn}>
                  <span>{t("bannerGumb")}</span>
                  <ArrowRightSvg size={16} />
                </Link>

                <p className={styles.bannerLeadText}>
                  {t("bannerVrstica1")}
                  <br />{t("bannerVrstica2")}
                </p>
              </div>
            </div>

            {/* Right Photo Card */}
            <div className={styles.bentoRightPhotoCard}>
              <Image
                src="/images/seherezada-student-kitchen.avif"
                alt={t("altEkipa")}
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
                <h4 className={styles.locCardTitle}>{t("naVsehLokacijah")}</h4>
                <span className={styles.locCountBadge}>{t("steviloLokacij", { stevilo: LOCATIONS.length })}</span>
              </div>

              <div className={styles.locList}>
                {LOCATIONS.map((loc) => (
                  <div key={loc.id} className={styles.locItem}>
                    <div className={styles.locNameCol}>
                      <LocationPinSvg size={16} />
                      <span>
                        {loc.name}{" "}
                        <span className={styles.locAddress}>({loc.street})</span>
                      </span>
                    </div>
                    <StatusBadge hours={loc.hours} />
                  </div>
                ))}
              </div>

              <div className={styles.locBottomAccentBar}>
                <div className={styles.locAccentFill} />
              </div>
            </div>

            {/* Card 2: Doplačilo */}
            <div className={styles.bentoPriceCard}>
              <span className={styles.priceCardLabel}>{t("doplaciloOznaka")}</span>
              <span className={styles.priceMinHighlight}>{doplacilo}</span>
              <p className={styles.priceCardDesc}>{t("doplaciloOpis")}</p>
            </div>

            {/* Card 3: Food Preview Card */}
            <div className={styles.bentoFoodPreviewCard}>
              <Image
                src="/images/seherezada-student-meal.avif"
                alt={t("altObrok")}
                width={300}
                height={200}
                className={styles.bentoFoodBgImg}
              />
              <div className={styles.bentoFoodOverlay} />

              <h4 className={styles.bentoFoodTitle}>{t("kebabMeni")}</h4>

              <div className={styles.bentoFoodIconsRow}>
                <div className={styles.bentoFoodIconCircle} title={t("ikonaGlavnaJed")}>
                  <UtensilsSvg size={16} />
                </div>
                <div className={styles.bentoFoodIconCircle} title={t("ikonaSolata")}>
                  <SoupSvg size={16} />
                </div>
                <div className={styles.bentoFoodIconCircle} title={t("ikonaSadje")}>
                  <AppleSvg size={16} />
                </div>
                <div className={styles.bentoFoodIconCircle} title={t("ikonaPijaca")}>
                  <DrinkSvg size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
