"use client";

import { useState } from "react";
import styles from "./CustomerReviews.module.css";

// Clean Vector SVG Star Icon
const StarFilledSvg = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fef08a" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface ReviewItem {
  id: number;
  author: string;
  stars: number;
  text: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: 1,
    author: "Alen M.",
    stars: 5,
    text: "Fantastična hrana, domača sveža lepinja in neverjetno hitra postrežba. Najboljši kebab v celi Ljubljani, priporočam vsem!",
  },
  {
    id: 2,
    author: "Sara K.",
    stars: 5,
    text: "Kot študentka redno jem tukaj na bone. Porcija je ogromna, meso vedno sočno in sveže, ambient pa topel in prijeten.",
  },
  {
    id: 3,
    author: "Marko V.",
    stars: 5,
    text: "Že več kot 10 let hodim v Šeherezado in kakovost je vedno na vrhunskem nivoju. Pristen okus pravega orientalskega žara!",
  },
];

export default function CustomerReviews() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);

  const currentReview = reviewsData[activeQuoteIndex];

  return (
    <section className={styles.reviewsSection} id="ocene">
      <div className={styles.bgWarmGlow} />

      <div className={styles.reviewsContainer}>
        {/* Section Header with Editorial Chapter Lockup */}
        <div className={styles.sectionHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>OCENE</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>05</span> / MNENJA &amp; ZAUPANJE GOSTOV
              </span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            Besede tistih, ki se vedno znova vračajo.
          </h2>

          <p className={styles.sectionSubtitle}>
            Zaupanje tisočev zadovoljnih gostov je naša največja nagrada.
            Odkrijte pristne izkušnje z naših lokacij na Trubarjevi in Dunajski.
          </p>
        </div>

        {/* Grand Testimonial Banner Card */}
        <div className={styles.grandBannerCard}>
          <span className={styles.grandBannerWatermark}>GOSTI</span>

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
            <span className={styles.grandAuthorName}>— {currentReview.author}</span>
          </div>

          {/* Carousel Navigation Indicator Dots */}
          <div className={styles.dotsRow}>
            {reviewsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Prikaži recenzijo ${idx + 1}`}
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
