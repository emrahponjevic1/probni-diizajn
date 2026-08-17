"use client";

import { useState } from "react";
import styles from "./CustomerReviews.module.css";

// Clean Vector SVG Icons (No Emojis)
const StarFilledSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GoogleGIconSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const CheckBadgeSvg = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

interface ReviewItem {
  id: number;
  author: string;
  initials: string;
  source: string;
  stars: number;
  text: string;
  dish: string;
  timeAgo: string;
}

const mockReviews: ReviewItem[] = [
  {
    id: 1,
    author: "Luka M.",
    initials: "LM",
    source: "Preverjena Google ocena",
    stars: 5,
    text: "Definitivno najboljši kebab v Ljubljani! Domača lepinja je še topla in hrustljava, meso pa neverjetno sočno in brez mastnih primesi. Še posebej priporočam hišno jogurtovo omako.",
    dish: "Kraljevi Döner Kebab",
    timeAgo: "Pred 3 dnevi",
  },
  {
    id: 2,
    author: "Sara K.",
    initials: "SK",
    source: "Preverjena Google ocena",
    stars: 5,
    text: "Kot študentka redno jem tukaj na bone. Porcija je ogromna, postrežba na Trubarjevi pa izjemno hitra tudi med največjo gnečo. Falafel krožnik z domačim humusom je vrhunski!",
    dish: "Falafel Krožnik & Boni",
    timeAgo: "Pred 1 tednom",
  },
  {
    id: 3,
    author: "Marko V.",
    initials: "MV",
    source: "Preverjena Google ocena",
    stars: 5,
    text: "Že več kot 10 let hodim v Šeherezado in kakovost je vedno na najvišjem nivoju. 100% Halal meso, prijazno osebje in res pristen okus orientalskega žara.",
    dish: "Dürüm Wrap Meni",
    timeAgo: "Pred 2 tednoma",
  },
];

export default function CustomerReviews() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3>(1);

  return (
    <section className={styles.reviewsSection} id="ocene">
      <div className={styles.bgWarmGlow} />

      <div className={styles.reviewsContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnov Recenzij</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: Editorial Bento Social Proof (Priporočamo)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: 3-Kolonske Kartice
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Istaknuti Citat + Dvojni Mreža
            </button>
          </div>
        </div>

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

        {/* ==================================================================
            OPCIJA 1: EDITORIAL BENTO SOCIAL PROOF (RECOMMENDED)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.bentoReviewsGrid}>
            {/* Left Hero Google Trust Card */}
            <div className={styles.googleTrustHeroCard}>
              <div className={styles.googleHeroTop}>
                <div className={styles.googlePillBadge}>
                  <span>Preverjene Ocene</span>
                </div>

                <div className={styles.scoreRow}>
                  <span className={styles.bigScoreNum}>4.8</span>
                  <span className={styles.maxScoreNum}>/ 5.0</span>
                </div>

                <div className={styles.starsRow}>
                  <StarFilledSvg size={22} />
                  <StarFilledSvg size={22} />
                  <StarFilledSvg size={22} />
                  <StarFilledSvg size={22} />
                  <StarFilledSvg size={22} />
                </div>

                <span className={styles.totalReviewsCount}>
                  Na podlagi več kot <strong>1.900+ resničnih ocen</strong> na Google Maps
                </span>

                <p className={styles.googleHeroQuote}>
                  &ldquo;Najbolje ocenjena orientalska restavracija in kebab v
                  Ljubljani z več kot 20-letno tradicijo.&rdquo;
                </p>
              </div>

              <div className={styles.googleVerifiedFooter}>
                <div className={styles.googleIconBox}>
                  <GoogleGIconSvg size={20} />
                </div>
                <div className={styles.googleFooterMeta}>
                  <span className={styles.googleFooterTitle}>Google Ocene Gostov</span>
                  <span className={styles.googleFooterSub}>Trubarjeva 31 &amp; Dunajska 106</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Reviews Stack */}
            <div className={styles.reviewsStackList}>
              {mockReviews.map((rev) => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <div className={styles.authorCol}>
                      <div className={styles.authorAvatar}>{rev.initials}</div>
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>{rev.author}</h4>
                        <span className={styles.authorTag}>
                          <CheckBadgeSvg size={14} /> {rev.source}
                        </span>
                      </div>
                    </div>

                    <div className={styles.starsRow}>
                      {[...Array(rev.stars)].map((_, i) => (
                        <StarFilledSvg key={i} size={16} />
                      ))}
                    </div>
                  </div>

                  <p className={styles.reviewText}>&ldquo;{rev.text}&rdquo;</p>

                  <div className={styles.reviewFooterRow}>
                    <span className={styles.favoriteDishTag}>
                      Najljubša jed: {rev.dish}
                    </span>
                    <span>{rev.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: 3-COLUMN EQUAL REVIEW CARDS
            ================================================================== */}
        {activeStyle === 2 && (
          <div className={styles.equalCardsGrid}>
            {mockReviews.map((rev) => (
              <div key={rev.id} className={styles.equalReviewCard}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className={styles.reviewCardHeader}>
                    <div className={styles.authorCol}>
                      <div className={styles.authorAvatar}>{rev.initials}</div>
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>{rev.author}</h4>
                        <span className={styles.authorTag}>
                          <CheckBadgeSvg size={14} /> {rev.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.starsRow}>
                    {[...Array(rev.stars)].map((_, i) => (
                      <StarFilledSvg key={i} size={16} />
                    ))}
                  </div>

                  <p className={styles.reviewText}>&ldquo;{rev.text}&rdquo;</p>
                </div>

                <div className={styles.reviewFooterRow}>
                  <span className={styles.favoriteDishTag}>{rev.dish}</span>
                  <span>{rev.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: FEATURED QUOTE HERO + DUAL COLUMN
            ================================================================== */}
        {activeStyle === 3 && (
          <div>
            <div className={styles.featuredQuoteCard}>
              <span className={styles.quoteWatermark}>OKUS</span>

              <div style={{ display: "flex", gap: "4px", color: "#f59e0b" }}>
                <StarFilledSvg size={20} />
                <StarFilledSvg size={20} />
                <StarFilledSvg size={20} />
                <StarFilledSvg size={20} />
                <StarFilledSvg size={20} />
              </div>

              <blockquote className={styles.quoteBigText}>
                &ldquo;Šeherezada ni le restavracija s hitro prehrano – je prava
                kulinarična institucija Ljubljane, kjer se pristna turška tradicija
                žara in domačega kruha ohranja na najvišji ravni.&rdquo;
              </blockquote>

              <div className={styles.quoteAuthorRow}>
                <span className={styles.quoteAuthorName}>Kulinarični Vodnik Ljubljana</span>
                <span className={styles.quoteAuthorSource}>1.900+ Ocen · 4.8 Zvezdic na Google</span>
              </div>
            </div>

            <div className={styles.dualReviewsGrid}>
              {mockReviews.slice(0, 2).map((rev) => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <div className={styles.authorCol}>
                      <div className={styles.authorAvatar}>{rev.initials}</div>
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>{rev.author}</h4>
                        <span className={styles.authorTag}>
                          <CheckBadgeSvg size={14} /> {rev.source}
                        </span>
                      </div>
                    </div>

                    <div className={styles.starsRow}>
                      {[...Array(rev.stars)].map((_, i) => (
                        <StarFilledSvg key={i} size={16} />
                      ))}
                    </div>
                  </div>

                  <p className={styles.reviewText}>&ldquo;{rev.text}&rdquo;</p>

                  <div className={styles.reviewFooterRow}>
                    <span className={styles.favoriteDishTag}>{rev.dish}</span>
                    <span>{rev.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
