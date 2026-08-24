"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem, WOLT_URL } from "./MenuData";
import styles from "./MenuPageContent.module.css";

// Clean Vector SVG Icons
const SparklesSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const UtensilsSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v18" />
    <path d="M5 2v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
    <path d="M8 12v8" />
  </svg>
);

const GraduationCapSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

const LeafSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SearchSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LayoutGridSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

const RowsSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="7" x="3" y="3" rx="1" />
    <rect width="18" height="7" x="3" y="14" rx="1" />
  </svg>
);

const PlusSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const InfoSvg = ({ size = 15, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const PhoneSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ScooterSvg = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="5.5" cy="17.5" r="3" />
    <circle cx="18.5" cy="17.5" r="3" />
    <path d="M8.5 17.5h7" />
    <path d="M15.5 17.5V7a2 2 0 0 1 2-2h1" />
    <path d="M6 14.5V11a2 2 0 0 1 2-2h5" />
    <path d="M13 5h4v4h-4z" />
  </svg>
);

export default function MenuPageContent() {
  const [menuType, setMenuType] = useState<"regular" | "student" | "vegi">("regular");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return MENU_ITEMS.length;
    return MENU_ITEMS.filter((i) => i.category === catId).length;
  };
  const avatarsTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const updateScrollIndicator = () => {
    if (!avatarsTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = avatarsTrackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const isOverflow = maxScroll > 8;
    setCanScroll(isOverflow);

    if (scrollThumbRef.current) {
      if (isOverflow && maxScroll > 0) {
        const trackTotalWidth = 80;
        const visibleRatio = clientWidth / scrollWidth;
        const thumbWidth = Math.max(22, Math.min(60, trackTotalWidth * visibleRatio));
        const maxTravel = trackTotalWidth - thumbWidth;
        const clampedScroll = Math.max(0, Math.min(maxScroll, scrollLeft));
        const progress = clampedScroll / maxScroll;
        const translateX = progress * maxTravel;

        scrollThumbRef.current.style.width = `${thumbWidth}px`;
        scrollThumbRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
      } else {
        scrollThumbRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    }
  };

  const handleCategorySelect = (catId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(catId);
    const btn = e.currentTarget;
    if (avatarsTrackRef.current) {
      const track = avatarsTrackRef.current;
      const targetScroll = btn.offsetLeft - (track.clientWidth / 2) + (btn.offsetWidth / 2);
      track.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type") || params.get("meni");
      if (typeParam === "student" || typeParam === "boni") {
        setMenuType("student");
      } else if (typeParam === "vegi" || typeParam === "vegan") {
        setMenuType("vegi");
      }

      // Default to List view on phones (<= 768px), and Grid view on desktop/tablets
      if (window.innerWidth <= 768) {
        setLayoutMode("list");
      }
    }
    // Guarantee that initial scroll position starts strictly on the left (at the first category)
    if (avatarsTrackRef.current) {
      avatarsTrackRef.current.scrollLeft = 0;
    }
    updateScrollIndicator();
    window.addEventListener("resize", updateScrollIndicator);
    return () => window.removeEventListener("resize", updateScrollIndicator);
  }, [menuType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalDish) {
      document.documentElement.classList.add("modalActive");
      document.body.classList.add("modalActive");
    } else {
      document.documentElement.classList.remove("modalActive");
      document.body.classList.remove("modalActive");
    }
  }, [modalDish]);

  const handleMenuTypeChange = (type: "regular" | "student" | "vegi") => {
    setMenuType(type);
    setSelectedCategory("all");
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.desc.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      // 2. Menu Type Filter
      if (menuType === "student" && !item.student) return false;
      if (menuType === "vegi" && item.diet === null) return false;

      // 3. Category Filter (only applicable in regular mode or when sub-selected)
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [menuType, selectedCategory, searchQuery]);

  return (
    <div className={styles.menuPageWrapper}>
      <div className={styles.bgGlow} />

      {/* ====================================================================
          HERO HEADER SECTION (100% WIDTH SECTION + 1200PX CENTERED INNER)
          ==================================================================== */}
      <section className={styles.headerSection}>
        <header className={styles.heroHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>MENI</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>JEDILNI LIST &amp; PONUDBA</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.mainTitle}>Odkrijte Našo Ponudbo</h1>

          <p className={styles.subtitle}>
            Pristen okus hitre prehrane, pripravljen z izbranimi svežimi sestavinami, 100% Halal mesom in domačimi recepti.
          </p>

          {/* Sub-tab Bar: Menu Type Switcher */}
          <div className={styles.typeTabsContainer}>
            <button
              type="button"
              onClick={() => handleMenuTypeChange("regular")}
              className={`${styles.typeTabBtn} ${menuType === "regular" ? styles.typeTabBtnActive : ""}`}
            >
              <UtensilsSvg size={16} />
              <span>Vsa Ponudba</span>
            </button>

            <button
              type="button"
              onClick={() => handleMenuTypeChange("student")}
              className={`${styles.typeTabBtn} ${menuType === "student" ? styles.typeTabBtnActive : ""}`}
            >
              <GraduationCapSvg size={16} />
              <span>Študentski Boni</span>
            </button>

            <button
              type="button"
              onClick={() => handleMenuTypeChange("vegi")}
              className={`${styles.typeTabBtn} ${menuType === "vegi" ? styles.typeTabBtnActive : ""}`}
            >
              <LeafSvg size={16} />
              <span>Vegi &amp; Vegan</span>
            </button>
          </div>

          {/* Search & Layout Mode Controls */}
          <div className={styles.controlsBar}>
            <div className={styles.searchBoxWrapper}>
              <SearchSvg size={16} className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Išči po jedeh (kebab, burger, pizza, falafel)..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                  aria-label="Počisti iskanje"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.layoutToggleGroup}>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`${styles.layoutBtn} ${layoutMode === "grid" ? styles.layoutBtnActive : ""}`}
                title="Mreža kartic"
                aria-label="Prikaz v mreži"
              >
                <LayoutGridSvg size={17} />
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode("list")}
                className={`${styles.layoutBtn} ${layoutMode === "list" ? styles.layoutBtnActive : ""}`}
                title="Seznam"
                aria-label="Prikaz v seznamu"
              >
                <RowsSvg size={17} />
              </button>
            </div>
          </div>
        </header>
      </section>

      {/* ====================================================================
          MAIN CONTENT AREA (100% WIDTH SECTION + 1200PX CENTERED INNER)
          ==================================================================== */}
      <section className={styles.contentSection}>
        <main className={styles.mainContainer}>
        {/* Student Hero Banner (Shown in Student mode) */}
        {menuType === "student" && (
          <div className={styles.studentHeroBanner}>
            <div className={styles.studentBannerLeft}>
              <div className={styles.studentBannerTag}>
                <GraduationCapSvg size={14} />
                <span>Študentska Prehrana</span>
              </div>
              <h2 className={styles.studentBannerTitle}>
                Izkoristi Študentske Bone v Šeherezadi
              </h2>
              <p className={styles.studentBannerDesc}>
                <span className={styles.studentBannerLead}>Vsak študentski meni vsebuje:</span>
                <span className={styles.studentBannerItems}>
                  <strong>Glavno jed po izbiri</strong> + <strong>Svežo solato</strong> + <strong>Jabolko</strong> + <strong>Pijačo</strong>.
                </span>
              </p>
            </div>

            <div className={styles.studentPriceBox}>
              <div className={styles.studentPriceLabel}>Doplačilo</div>
              <div className={styles.studentPriceValue}>3,00 €</div>
              <div className={styles.studentPriceSub}>z veljavnim bonom</div>
            </div>
          </div>
        )}

        {/* Story Avatars Category Filter (Clean Dish Photography) */}
        {menuType === "regular" && (
          <div className={styles.storyAvatarsContainer}>
            <div
              ref={avatarsTrackRef}
              onScroll={updateScrollIndicator}
              className={`${styles.storyAvatarsTrack} ${canScroll ? styles.storyAvatarsTrackScrollable : ""}`}
            >
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={(e) => handleCategorySelect(cat.id, e)}
                    className={`${styles.storyAvatarBtn} ${isActive ? styles.storyAvatarBtnActive : ""}`}
                    aria-label={`Kategorija ${cat.label}`}
                  >
                    <div className={styles.storyAvatarRing}>
                      <div className={styles.storyAvatarImgWrap}>
                        <Image
                          src={cat.image}
                          alt={cat.label}
                          width={80}
                          height={80}
                          className={styles.storyAvatarImg}
                        />
                      </div>
                    </div>
                    <span className={styles.storyAvatarLabel}>{cat.shortLabel || cat.label}</span>
                    <span className={styles.storyAvatarCount}>{count} jedi</span>
                  </button>
                );
              })}
            </div>

            {/* Mini Scroll Progress Indicator Bar - Only shown if scrollable */}
            {canScroll && (
              <div className={styles.storyScrollTrack}>
                <div
                  ref={scrollThumbRef}
                  className={styles.storyScrollThumb}
                />
              </div>
            )}
          </div>
        )}

        {/* Items Status Bar */}
        <div className={styles.itemsStatusBar}>
          {/* Naslov razdelka z jedmi. <h2> namesto <span> zaradi strukture
              dokumenta — videz je enak, ker .itemsCountText eksplicitno
              nastavi font-size in font-weight. */}
          <h2 className={styles.itemsCountText}>
            Prikazanih <span className={styles.itemsCountBold}>{filteredItems.length}</span> jedi
          </h2>
        </div>

        {/* ==================================================================
            DISHES PRESENTATION: GRID OR LIST
            ================================================================== */}
        {filteredItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyStateTitle}>Ni najdenih jedi</h3>
            <p className={styles.emptyStateSub}>
              Za izbrano iskanje ali filter trenutno ni zadetkov. Poskusite z drugim iskalnim pojmom ali ponastavite filtre.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setMenuType("regular");
              }}
              className={styles.resetFilterBtn}
            >
              Ponastavi filtre
            </button>
          </div>
        ) : layoutMode === "grid" ? (
          /* 1. GRID LAYOUT */
          <div className={styles.gridContainer}>
            {filteredItems.map((item) => (
              <article key={item.id} className={styles.gridCard}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.imageWrapper}
                    onClick={() => setModalDish(item)}
                    title="Klikni za podrobnosti o sestavinah in alergenih"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={380}
                      height={260}
                      className={styles.dishImage}
                    />

                    {/* Quick Badges on Image */}
                    <div className={styles.imageBadgesRow}>
                      {item.diet && (
                        <span className={styles.vegiBadge}>
                          <LeafSvg size={11} />
                          <span>{item.diet === "vegan" ? "Vegansko" : "Vegetarijansko"}</span>
                        </span>
                      )}
                      {item.student && menuType !== "student" && (
                        <span className={styles.studentBonBadge}>
                          <GraduationCapSvg size={11} />
                          <span>Na Bon</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={styles.cardCategory}>{item.categoryLabel}</span>
                  <h3 className={styles.cardTitle} onClick={() => setModalDish(item)}>
                    {item.name}
                  </h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>

                <div className={styles.cardBottom}>
                  {menuType === "student" ? (
                    <div className={styles.studentBonActiveTag}>
                      <span>✓ Na Študentski Bon (3,00 €)</span>
                    </div>
                  ) : (
                    <div className={styles.priceCol}>
                      <span className={styles.priceAmount}>
                        {item.price.toFixed(2).replace(".", ",")} €
                      </span>
                      {item.priceLarge && (
                        <span className={styles.priceNote}>
                          velika {item.priceLarge.toFixed(2).replace(".", ",")} €
                        </span>
                      )}
                      {item.note && <span className={styles.priceNote}>{item.note}</span>}
                    </div>
                  )}

                  <div className={styles.cardActions}>
                    {WOLT_URL && (
                      <a
                        href={WOLT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardActionBtn}
                        title="Naroči prek Wolta"
                        aria-label={`Naroči prek Wolta`}
                      >
                        <ScooterSvg size={18} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setModalDish(item)}
                      className={styles.cardActionBtn}
                      title="Podrobnosti o jedi (sestavine & alergeni)"
                      aria-label={`Podrobnosti o jedi ${item.name}`}
                    >
                      <InfoSvg size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* 2. LIST / BENTO LAYOUT */
          <div className={styles.listContainer}>
            {filteredItems.map((item) => (
              <article key={item.id} className={styles.listCard}>
                <div className={styles.listLeft}>
                  <div
                    className={styles.listImgWrapper}
                    onClick={() => setModalDish(item)}
                    title="Klikni za podrobnosti o sestavinah"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={160}
                      className={styles.listImg}
                    />
                  </div>

                  <div className={styles.listMeta}>
                    <div className={styles.listTitleRow}>
                      <h3 className={styles.listTitle} onClick={() => setModalDish(item)}>
                        {item.name}
                      </h3>
                      {item.diet && (
                        <span className={styles.vegiBadge} style={{ padding: "2px 7px", fontSize: "0.68rem" }}>
                          {item.diet === "vegan" ? "Vegansko" : "Vegi"}
                        </span>
                      )}
                      {item.student && menuType !== "student" && (
                        <span className={styles.studentBonBadge} style={{ padding: "2px 7px", fontSize: "0.68rem" }}>
                          Bon
                        </span>
                      )}
                    </div>

                    <p className={styles.listDesc}>{item.desc}</p>

                    <div className={styles.listPrice}>
                      {menuType === "student"
                        ? "Na bon (doplačilo 3,00 €)"
                        : `${item.price.toFixed(2).replace(".", ",")} €${
                            item.priceLarge ? ` · velika ${item.priceLarge.toFixed(2).replace(".", ",")} €` : ""
                          }`}
                    </div>
                  </div>
                </div>

                <div className={styles.listRightActions}>
                  {WOLT_URL && (
                    <a
                      href={WOLT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardActionBtn}
                      title="Naroči prek Wolta"
                      aria-label="Naroči prek Wolta"
                    >
                      <ScooterSvg size={18} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setModalDish(item)}
                    className={styles.cardActionBtn}
                    title="Podrobnosti o jedi (sestavine & alergeni)"
                    aria-label={`Podrobnosti o jedi ${item.name}`}
                  >
                    <InfoSvg size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      </section>

      {/* ====================================================================
          FOOD DETAIL MODAL / POPUP (PORTAL)
          ==================================================================== */}
      {modalDish &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={styles.modalBackdrop}
            onClick={() => setModalDish(null)}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) {
                e.preventDefault();
              }
            }}
          >
            <div
              className={styles.modalContainer}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className={styles.modalHeaderRow}>
                <div className={styles.modalDishImgWrapper}>
                  <Image
                    src={modalDish.image}
                    alt={modalDish.name}
                    width={220}
                    height={220}
                    className={styles.modalDishImg}
                  />
                </div>

                <div className={styles.modalTitleMeta}>
                  <span className={styles.modalCategoryBadge}>{modalDish.categoryLabel}</span>
                  <h3 className={styles.modalDishTitle}>{modalDish.name}</h3>
                  <div className={styles.modalPriceRow}>
                    <span className={styles.modalPrice}>
                      {modalDish.price.toFixed(2).replace(".", ",")} €
                    </span>
                    {modalDish.note && <span className={styles.priceNote}>{modalDish.note}</span>}
                    {modalDish.student && (
                      <span className={styles.studentBonBadge} style={{ marginLeft: "0.4rem" }}>
                        Študentski Bon (3,00 €)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalDish(null)}
                  className={styles.modalCloseTopBtn}
                  aria-label="Zapri okno"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                {/* 1. Opis */}
                <div>
                  <h4 className={styles.modalSectionTitle}>Opis Jedi</h4>
                  <p className={styles.modalDescText}>{modalDish.desc}</p>
                </div>

                {/* 2. Sestavine */}
                <div>
                  <h4 className={styles.modalSectionTitle}>Sestavine</h4>
                  <ul className={styles.ingredientsList}>
                    {modalDish.ingredientsList.map((ingredient, idx) => (
                      <li key={idx} className={styles.ingredientItem}>
                        <span className={styles.ingredientCheck}>✓</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Alergeni */}
                <div>
                  <h4 className={styles.modalSectionTitle}>Alergeni</h4>
                  {modalDish.allergensList.length > 0 ? (
                    <div className={styles.allergensGrid}>
                      {modalDish.allergensList.map((allergen, idx) => (
                        <span key={idx} className={styles.allergenPill}>
                          <span>•</span>
                          <span>{allergen}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.modalDescText} style={{ color: "#059669", fontWeight: 700 }}>
                      Brez znanih alergenov.
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setModalDish(null)}
                  className={styles.modalCloseBtn}
                >
                  Zapri okno
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
