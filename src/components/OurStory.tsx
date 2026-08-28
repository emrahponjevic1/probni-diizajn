import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./OurStory.module.css";

// Clean Vector SVG Icons (No Emojis)
const FlameSvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const BreadSvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="11" rx="9" ry="6" />
    <path d="M7 8.5c1-1 2-1 3 0" />
    <path d="M14 8.5c1-1 2-1 3 0" />
    <path d="M5 14v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2" />
  </svg>
);

const HalalShieldSvg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function OurStory() {
  // Besedila so v messages/<jezik>.json pod ključem "zgodba".
  const t = useTranslations("zgodba");

  return (
    <section className={styles.storySection} id="onas">
      <div className={styles.bgGlow} />

      <div className={styles.storyContainer}>
        <div className={styles.magGrid}>
          {/* Left Column: Storytelling & 3 Quality Pillars */}
          <div className={styles.magLeftCol}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>02</span> / {t("oznakaPoglavja")}
                </span>
                <span className={styles.chapterDash} />
              </div>
            </div>

            <h2 className={styles.magHeading}>{t("naslov")}</h2>

            <p className={styles.magLeadText}>{t("uvod")}</p>

            <div className={styles.pillarsList}>
              {/* Pillar 1 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <FlameSvg size={22} />
                </div>
                <div className={styles.pillarContent}>
                  <h3 className={styles.pillarTitle}>{t("stebri.ogenjNaslov")}</h3>
                  <p className={styles.pillarDesc}>{t("stebri.ogenjOpis")}</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <BreadSvg size={22} />
                </div>
                <div className={styles.pillarContent}>
                  <h3 className={styles.pillarTitle}>{t("stebri.kruhNaslov")}</h3>
                  <p className={styles.pillarDesc}>{t("stebri.kruhOpis")}</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <HalalShieldSvg size={22} />
                </div>
                <div className={styles.pillarContent}>
                  <h3 className={styles.pillarTitle}>{t("stebri.halalNaslov")}</h3>
                  <p className={styles.pillarDesc}>{t("stebri.halalOpis")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Layered Photo Collage */}
          <div className={styles.magVisualStack}>
            {/* Main Photo: Master Grill Chef */}
            <div className={styles.mainPhotoWrapper}>
              <Image
                src="/images/seherezada-story-chef.avif"
                alt={t("altMojster")}
                width={600}
                height={500}
                className={styles.mainPhotoImg}
              />
            </div>

            {/* Overlapping Secondary Photo: Fresh Baked Bread in Oven */}
            <div className={styles.overlappingPhotoCard}>
              <Image
                src="/images/seherezada-story-oven.avif"
                alt={t("altKruh")}
                width={220}
                height={160}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Floating Experience Glass Badge */}
            <div className={styles.floatingExperienceBadge}>
              {/* Letnica namesto števila let — ne zastara in je ne bo treba
                  posodabljati vsako leto. */}
              <span className={styles.experienceBadgeNum}>1998</span>
              <span className={styles.experienceBadgeText}>{t("letoOdprtja")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
