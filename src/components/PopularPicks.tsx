"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./PopularPicks.module.css";
import { FEATURED_ITEMS, MENU_STATS } from "./menu/MenuData";

// Clean, borderless SVG Info / Exclamation Icon
const InfoCircleSvg = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

interface Dish {
  id: number;
  title: string;
  category: string;
  price: string;
  /** Cena velike velikosti (samo pice). Prikazana samo v modalnem oknu s podrobnostmi. */
  priceLarge?: string;
  oldPrice?: string;
  badge?: string;
  badgeType?: "bestseller" | "recommended" | "vegi" | "special" | "platter";
  description: string;
  image: string;
  ingredientsList: string[];
  allergensList: string[];
}

export default function PopularPicks() {
  const [activeDishId, setActiveDishId] = useState<number>(FEATURED_ITEMS[0]?.id ?? 1);

  // Carousel scroll index tracker
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  /**
   * Širina ene kartice, izmerjena vnaprej.
   *
   * Prej se je offsetWidth bral ob vsakem premiku prsta. Vsako tako
   * vprašanje brskalnik prisili, da takoj na novo premeri celo stran
   * (forced reflow) — Lighthouse je na telefonu naštel 165 ms takega dela.
   * Širina se med drsenjem ne spreminja, zato jo izmerimo enkrat in znova
   * samo, ko se okno spremeni.
   */
  const cardWidthRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal / Popup State for Dish Details (Ingredients, Allergens, Description)
  const [modalDish, setModalDish] = useState<Dish | null>(null);

  // Besedila so v messages/<jezik>.json pod ključem "priljubljene".
  const t = useTranslations("priljubljene");

  // Priljubljene izbire se izpeljejo neposredno iz MENU_ITEMS.
  // Jed dodaš ali odstraniš s poljem `featured` v MenuData.ts — nikoli tukaj.
  // Tako se cene in imena na naslovnici ne morejo razhajati z menijem.
  const dishes: Dish[] = useMemo(
    () =>
      FEATURED_ITEMS.map((item) => {
        const base = `${item.price.toFixed(2).replace(".", ",")} €`;

        const badge =
          item.featured === 1
            ? t("znackaNajbolj")
            : item.diet === "vegan"
              ? t("znackaVegansko")
              : item.diet === "vegetarian"
                ? t("znackaVegetarijansko")
                : item.student
                  ? t("znackaNaBon")
                  : undefined;

        const badgeType: Dish["badgeType"] =
          item.featured === 1
            ? "bestseller"
            : item.diet
              ? "vegi"
              : item.category === "pizza"
                ? "special"
                : "recommended";

        return {
          id: item.id,
          title: item.name,
          category: item.categoryLabel,
          // Na karticah in v seznamu prikažemo samo osnovno ceno, da se ne lomi.
          // Cena velike velikosti gre v modalno okno s podrobnostmi.
          price: base,
          priceLarge: item.priceLarge
            ? `${item.priceLarge.toFixed(2).replace(".", ",")} €`
            : undefined,
          badge,
          badgeType,
          description: item.desc,
          image: item.image,
          ingredientsList: item.ingredientsList,
          allergensList: item.allergensList,
        };
      }),
    []
  );

  const selectedDish = dishes.find((d) => d.id === activeDishId) || dishes[0];

  // Bulletproof background scroll lock & navbar suppression when detail modal is open
  useEffect(() => {
    if (modalDish) {
      const scrollY = window.scrollY;

      // Lock global html & body with modalActive flag
      document.documentElement.classList.add("modalActive");
      document.body.classList.add("modalActive");

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalDish(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        const top = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        if (top) {
          const parsedScrollY = parseInt(top || "0", 10) * -1;
          window.scrollTo(0, parsedScrollY);
        }

        // Delay removing modalActive flag so scroll restoration does not trigger navbar animation
        setTimeout(() => {
          document.documentElement.classList.remove("modalActive");
          document.body.classList.remove("modalActive");
        }, 100);

        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modalDish]);

  const openDetailsModal = (dish: Dish) => {
    setModalDish(dish);
  };

  useEffect(() => {
    const izmeri = () => {
      if (carouselTrackRef.current) {
        cardWidthRef.current = carouselTrackRef.current.offsetWidth * 0.85;
      }
    };
    izmeri();
    window.addEventListener("resize", izmeri);
    return () => window.removeEventListener("resize", izmeri);
  }, []);

  const handleCarouselScroll = () => {
    const track = carouselTrackRef.current;
    if (!track) return;

    // Če meritve še ni (prvi dogodek pred učinkom), jo opravimo zdaj.
    if (cardWidthRef.current === 0) {
      cardWidthRef.current = track.offsetWidth * 0.85;
    }
    if (cardWidthRef.current === 0) return;

    const newIndex = Math.round(track.scrollLeft / cardWidthRef.current);
    setCurrentSlideIndex(Math.min(Math.max(newIndex, 0), dishes.length - 1));
  };

  return (
    <section className={styles.popularSection} id="meni">
      <div className={styles.container}>
        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className={styles.sectionHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>
                <span className={styles.chapterNumber}>01</span> / {t("oznakaPoglavja")}
              </span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>{t("naslov")}</h2>

          <p className={styles.sectionSubtitle}>{t("podnaslov")}</p>
        </div>

        {/* ==================================================================
            DESKTOP VIEW: EDITORIAL SPLIT VIEW (Visible on desktop > 1024px)
            ================================================================== */}
        <div className={styles.desktopMagazineGrid}>
          {/* Left: Sticky Magazine Hero Poster */}
          <div className={styles.magazineStickyCol}>
            <div className={styles.magazineCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.title}
                  width={420}
                  height={420}
                  className={styles.magazinePlate}
                />
                <div className={styles.watermarkNum}>0{selectedDish.id}</div>
                {selectedDish.badge && (
                  <span className={styles.magazineFloatingBadge}>
                    {selectedDish.badge}
                  </span>
                )}
              </div>

              <div className={styles.magazineContent}>
                <h3 className={styles.magTitle}>{selectedDish.title}</h3>
                <p className={styles.magDesc}>{selectedDish.description}</p>

                {/* Unified Bottom Row: Price + Sestavine & Alergeni Button */}
                <div className={styles.showcaseBottomRow}>
                  <div className={styles.showcasePriceBox}>
                    <span className={styles.showcasePriceLabel}>{t("cena")}</span>
                    <span className={styles.showcasePriceValue}>{selectedDish.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.detailsModalTriggerBtn}
                  >
                    <InfoCircleSvg size={18} />
                    <span>{t("poglejPodrobnosti")}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography Lines List */}
          <div className={styles.magazineListCol}>
            <div className={styles.listHeaderRow}>
              <span className={styles.listHeaderText}>{t("izberiteJed")}</span>
              <span className={styles.listCountBadge}>{t("steviloSpecialitet", { stevilo: dishes.length })}</span>
            </div>

            <div className={styles.linesList}>
              {dishes.map((dish, idx) => (
                <div
                  key={dish.id}
                  onClick={() => setActiveDishId(dish.id)}
                  className={`${styles.lineItem} ${
                    activeDishId === dish.id ? styles.lineItemActive : ""
                  }`}
                >
                  <span className={styles.lineNum}>/0{idx + 1}</span>

                  <div className={styles.lineCenter}>
                    <div className={styles.lineTitleRow}>
                      <h4 className={styles.lineTitle}>{dish.title}</h4>
                      {dish.badge && <span className={styles.lineMiniBadge}>{dish.badge}</span>}
                    </div>
                    <p className={styles.lineIngredients}>{dish.description}</p>
                  </div>

                  <div className={styles.lineEnd}>
                    <span className={styles.linePrice}>{dish.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            MOBILE & TABLET VIEW: TOUCH SWIPE CAROUSEL (<= 1024px)
            ================================================================== */}
        <div className={styles.mobileViewWrapper}>
          <div className={styles.mobileSwipeContainer}>
            {/* Top Counter and Swipe Hint */}
            <div className={styles.swipeTopInfo}>
              <span className={styles.swipeHintText}>{t("povlecite")}</span>
              <span className={styles.swipeCounterBadge}>
                0{currentSlideIndex + 1} / 0{dishes.length}
              </span>
            </div>

            {/* Scrollable Track with Snap Behavior */}
            <div
              className={styles.mobileSwipeTrack}
              ref={carouselTrackRef}
              onScroll={handleCarouselScroll}
            >
              {dishes.map((dish) => (
                <article key={dish.id} className={styles.mobileSwipeCard}>
                  <div className={styles.mobileCardImageArea}>
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      width={320}
                      height={240}
                      className={styles.mobileCardImg}
                    />
                    {dish.badge && (
                      <span className={styles.mobileCardBadge}>{dish.badge}</span>
                    )}
                  </div>

                  <div className={styles.mobileCardBody}>
                    <h3 className={styles.mobileCardTitle}>{dish.title}</h3>
                    <p className={styles.mobileCardDesc}>{dish.description}</p>

                    <div className={styles.mobileCardFooter}>
                      <div className={styles.mobilePriceBox}>
                        <span className={styles.mobilePriceLabel}>Cena</span>
                        <span className={styles.mobilePriceValue}>{dish.price}</span>
                      </div>

                      {/* Clean Borderless SVG Info Button */}
                      <button
                        type="button"
                        onClick={() => openDetailsModal(dish)}
                        className={styles.mobileInfoIconBtn}
                        aria-label={`Poglej podrobnosti za ${dish.title}`}
                        title="Poglej podrobnosti"
                      >
                        <InfoCircleSvg size={28} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className={styles.swipeDotsRow}>
              {dishes.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.swipeDot} ${
                    currentSlideIndex === idx ? styles.swipeDotActive : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            BOTTOM BANNER
            ================================================================== */}
        <div className={styles.bottomBanner}>
          <div className={styles.bannerText}>
            <h4 className={styles.bannerTitle}>{t("celotenMeni", { stevilo: MENU_STATS.total })}</h4>
            <p className={styles.bannerSubtitle}>{t("celotenMeniOpis", { stevilo: MENU_STATS.student })}</p>
          </div>
          <Link href="/meni" className={styles.bannerBtn}>
            <span>{t("odpriMeni")}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* ==================================================================
          FOOD DETAIL MODAL / POPUP (SESTAVINE, ALERGENI, OPIS JEDI)
          ================================================================== */}
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
              {/* Modal Content Scroll Area */}
              <div className={styles.modalScrollBody}>
                {/* Dish Visual Header */}
                <div className={styles.modalVisualRow}>
                  <div className={styles.modalDishImgWrapper}>
                    <Image
                      src={modalDish.image}
                      alt={modalDish.title}
                      width={200}
                      height={200}
                      className={styles.modalDishImg}
                    />
                  </div>

                  <div className={styles.modalTitleMeta}>
                    <h3 className={styles.modalDishTitle}>{modalDish.title}</h3>
                    <div className={styles.modalQuickBadges}>
                      <span className={styles.modalCategoryBadge}>{modalDish.category}</span>
                      <span className={styles.modalHalalBadge}>{t("halalZnacka")}</span>
                    </div>
                    <div className={styles.modalPriceText}>
                      {modalDish.price}
                      {modalDish.priceLarge && (
                        <span className={styles.modalPriceSize}>
                          {t("velika", { cena: modalDish.priceLarge })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 1. Opis Jedi */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("opisJedi")}</h4>
                  <p className={styles.modalDescText}>{modalDish.description}</p>
                </div>

                {/* 2. Sestavine (Ingredients Checklist) */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("sestavine")}</h4>
                  <ul className={styles.modalIngredientsList}>
                    {modalDish.ingredientsList.map((item, idx) => (
                      <li key={idx} className={styles.modalIngredientItem}>
                        <span className={styles.ingredientCheckIcon}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Alergeni (Allergens Pills) */}
                <div className={styles.modalSectionBox}>
                  <h4 className={styles.modalSectionTitle}>{t("alergeni")}</h4>
                  <div className={styles.modalAllergensGrid}>
                    {modalDish.allergensList.map((allergen, idx) => (
                      <span key={idx} className={styles.modalAllergenPill}>
                        <span className={styles.allergenDot}>•</span>
                        <span>{allergen}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className={styles.modalFooterBar}>
                <button
                  type="button"
                  onClick={() => setModalDish(null)}
                  className={styles.modalCloseWindowBtn}
                >
                  {t("zapriOkno")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
