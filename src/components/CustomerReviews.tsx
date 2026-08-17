"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./CustomerReviews.module.css";

// Clean Vector SVG Icons (No Emojis)
const StarFilledSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
  img: string;
  persona: string;
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
    img: "/images/doner-kebab.jpg",
    persona: "Lokalni Gurman",
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
    img: "/images/falafel.jpg",
    persona: "Študentka (UL)",
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
    img: "/images/durum-falafel.jpg",
    persona: "Stalni Gost od 2012",
    timeAgo: "Pred 2 tednoma",
  },
];

export default function CustomerReviews() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3 | 4>(1);

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
              Opcija 1: Istaknuti Citat + Dvojna Mreža (Ohranjeno)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: Foto Recenzije Jedil (Live Photo Reviews)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Profili Gostov (Študent / Turist / Domačin)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(4)}
              className={`${styles.styleTabBtn} ${activeStyle === 4 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 4: Google Analitika + Horizontalne Trake
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
            OPCIJA 1 (OHRANJENO): FEATURED QUOTE HERO + DUAL COLUMN
            ================================================================== */}
        {activeStyle === 1 && (
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
            OPCIJA 2 (NOVO): FOTO RECENZIJE JEDIL (LIVE PHOTO REVIEWS)
            ================================================================== */}
        {activeStyle === 2 && (
          <div className={styles.photoReviewsGrid}>
            {mockReviews.map((rev) => (
              <div key={rev.id} className={styles.photoReviewCard}>
                <div className={styles.photoReviewImgWrapper}>
                  <Image
                    src={rev.img}
                    alt={rev.dish}
                    width={400}
                    height={180}
                    className={styles.photoReviewImg}
                  />
                  <span className={styles.photoDishBadge}>{rev.dish}</span>
                </div>

                <div className={styles.photoReviewBody}>
                  <div>
                    <div className={styles.reviewCardHeader} style={{ marginBottom: "0.8rem" }}>
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
                          <StarFilledSvg key={i} size={15} />
                        ))}
                      </div>
                    </div>

                    <p className={styles.reviewText}>&ldquo;{rev.text}&rdquo;</p>
                  </div>

                  <div className={styles.reviewFooterRow}>
                    <span>Preverjen obisk</span>
                    <span>{rev.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3 (NOVO): PROFILI GOSTOV (ŠTUDENT / TURIST / DOMAČIN)
            ================================================================== */}
        {activeStyle === 3 && (
          <div className={styles.personaGrid}>
            {mockReviews.map((rev, idx) => (
              <div
                key={rev.id}
                className={`${styles.personaCard} ${idx === 0 ? styles.personaCardHighlight : ""}`}
              >
                <div className={styles.personaBadge}>
                  <span>● Profil: {rev.persona}</span>
                </div>

                <div className={styles.starsRow}>
                  {[...Array(rev.stars)].map((_, i) => (
                    <StarFilledSvg key={i} size={18} />
                  ))}
                </div>

                <p className={styles.reviewText} style={{ fontSize: "0.96rem", lineHeight: "1.65" }}>
                  &ldquo;{rev.text}&rdquo;
                </p>

                <div style={{ marginTop: "auto" }}>
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

                  <div className={styles.reviewFooterRow} style={{ marginTop: "1rem" }}>
                    <span className={styles.favoriteDishTag}>{rev.dish}</span>
                    <span>{rev.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================================
            OPCIJA 4 (NOVO): GOOGLE ANALITIKA + HORIZONTALNE TRAKE
            ================================================================== */}
        {activeStyle === 4 && (
          <div className={styles.statsStripsGrid}>
            {/* Left Stats Hub */}
            <div className={styles.statsHubCol}>
              <div className={styles.statsHubCard}>
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Uradna Google Statistika
                  </span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 950, color: "#1c1917", margin: "0.3rem 0 0 0" }}>
                    Najvišje zaupanje v mestu
                  </h3>
                </div>

                <div className={styles.statItemRow}>
                  <span className={styles.statLabelText}>Google Ocena</span>
                  <span className={styles.statBigVal}>4.8 ★</span>
                </div>

                <div className={styles.statItemRow}>
                  <span className={styles.statLabelText}>Skupaj Ocen</span>
                  <span className={styles.statBigVal}>1.900+</span>
                </div>

                <div className={styles.statItemRow}>
                  <span className={styles.statLabelText}>Zadovoljnih Gostov</span>
                  <span className={styles.statBigVal}>99%</span>
                </div>

                <div className={styles.statItemRow} style={{ borderBottom: "none", paddingBottom: 0 }}>
                  <span className={styles.statLabelText}>Tradicija v LJ</span>
                  <span className={styles.statBigVal}>20+ Let</span>
                </div>
              </div>
            </div>

            {/* Right Horizontal Strips */}
            <div className={styles.horizontalStripsList}>
              {mockReviews.map((rev) => (
                <div key={rev.id} className={styles.horizontalStripCard}>
                  <div className={styles.reviewCardHeader}>
                    <div className={styles.authorCol}>
                      <div className={styles.authorAvatar} style={{ width: "32px", height: "32px", fontSize: "0.75rem" }}>
                        {rev.initials}
                      </div>
                      <div>
                        <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1c1917" }}>{rev.author}</span>
                        <span style={{ fontSize: "0.72rem", color: "#78716c", marginLeft: "8px" }}>· {rev.timeAgo}</span>
                      </div>
                    </div>

                    <div className={styles.starsRow}>
                      {[...Array(rev.stars)].map((_, i) => (
                        <StarFilledSvg key={i} size={14} />
                      ))}
                    </div>
                  </div>

                  <p className={styles.reviewText} style={{ fontSize: "0.88rem" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.76rem" }}>
                    <span className={styles.favoriteDishTag}>{rev.dish}</span>
                    <span style={{ color: "#047857", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
                      <CheckBadgeSvg size={12} /> Preverjeno
                    </span>
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
