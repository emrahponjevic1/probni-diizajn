"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./CustomerReviews.module.css";
import { GOOGLE_REVIEWS } from "@/data/reviews";

// Clean Vector SVG Star Icon
const StarFilledSvg = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fef08a" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Mnenja prihajajo iz src/data/reviews.ts — samo resnične ocene z Googla.

export default function CustomerReviews() {
  // Besedila so v messages/<jezik>.json pod ključem "ocene".
  const t = useTranslations("ocene");

  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-rotate reviews every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, activeQuoteIndex]);

  const currentReview = GOOGLE_REVIEWS[activeQuoteIndex];

  return (
    <section className={styles.reviewsSection} id="ocene">
      <div className={styles.bgWarmGlow} />

      <div className={styles.reviewsContainer}>
        {/* Section Header with Editorial Chapter Lockup */}
        <div className={styles.sectionHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>05</span> / {t("oznakaPoglavja")}
              </span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>{t("naslov")}</h2>

          <p className={styles.sectionSubtitle}>{t("podnaslov")}</p>
        </div>

        {/* Grand Testimonial Banner Card */}
        <div
          className={styles.grandBannerCard}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className={styles.grandBannerWatermark}>{t("vodniZnakGosti")}</span>

          {/* 5 Golden Stars */}
          <div className={styles.grandStarsRow}>
            {[...Array(5)].map((_, i) => (
              <StarFilledSvg key={i} size={28} />
            ))}
          </div>

          {/* Large Impact Quote */}
          <blockquote className={styles.grandQuoteText}>
            &ldquo;{currentReview.text}&rdquo;
          </blockquote>

          {/* Author Signature without dish badge */}
          <div className={styles.grandAuthorMeta}>
            <span className={styles.grandAuthorName}>
              — {currentReview.author} · Google · {currentReview.when}
            </span>
          </div>

          {/* Carousel Navigation Indicator Dots */}
          <div className={styles.dotsRow}>
            {GOOGLE_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={t("prikaziRecenzijo", { stevilka: idx + 1 })}
                onClick={() => setActiveQuoteIndex(idx)}
                className={`${styles.dotBtn} ${activeQuoteIndex === idx ? styles.dotBtnActive : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
