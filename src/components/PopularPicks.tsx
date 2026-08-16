"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./PopularPicks.module.css";

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
  oldPrice?: string;
  badge?: string;
  badgeType?: "bestseller" | "recommended" | "vegi" | "special" | "platter";
  description: string;
  image: string;
  ingredients: string;
  ingredientsList: string[];
  allergensList: string[];
}

export default function PopularPicks() {
  const [activeDishId, setActiveDishId] = useState<number>(1);
  const [orderedDishId, setOrderedDishId] = useState<number | null>(null);

  // Carousel scroll index tracker
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Modal / Popup State for Dish Details (Ingredients, Allergens, Description)
  const [modalDish, setModalDish] = useState<Dish | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  const dishes: Dish[] = [
    {
      id: 1,
      title: "Kraljevi Döner Kebab",
      category: "Kebabi & Plošče",
      price: "6,50 €",
      badge: "Bestseller",
      badgeType: "bestseller",
      description:
        "Hišna posebnost – sočno telečje in piščančje meso pečeno na pravem ognju, domač lepinji kruh po tajnem receptu, hrustljava zelenjava in hišna jogurtova omaka.",
      ingredients: "Telečje meso · Domač lepinja kruh · Sveža solata · Jogurtov preliv",
      ingredientsList: [
        "Domač lepinja kruh (sveže pečen)",
        "Telečje & piščančje meso (100% Halal)",
        "Sveža hrustljava solata & paradižnik",
        "Rdeča čebula & rdeče zelje",
        "Hišna kremasta jogurtova omaka",
      ],
      allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam"],
      image: "/images/doner-kebab.jpg",
    },
    {
      id: 2,
      title: "Šeherezada Dürüm Wrap",
      category: "Dürüm & Zvitki",
      price: "7,20 €",
      badge: "Priporočamo",
      badgeType: "recommended",
      description:
        "Domač tanek lavaš zvit z bogatim slojem mariniranega mesa, sveže solate, paradižnika in pristnih orientalskih začimb.",
      ingredients: "Tanek lavaš kruh · Mariniran döner · Paradižnik · Začimbe",
      ingredientsList: [
        "Tanek domač lavaš kruh",
        "Marinirano döner meso na ognju",
        "Sveži paradižniki & kumare",
        "Zeliščna jogurtova omaka",
        "Pristne orientalske začimbe",
      ],
      allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
      image: "/images/durum-falafel.jpg",
    },
    {
      id: 3,
      title: "Tradicionalni Falafel Krožnik",
      category: "Falafel & Vegi",
      price: "7,80 €",
      badge: "100% Vegi",
      badgeType: "vegi",
      description:
        "Zlato ocvrti čičerikini polpeti z orientalskimi zelišči, kremast domač humus, sveža mešana solata, tahini preliv in topel kruh.",
      ingredients: "Hrustljava čičerika · Domač humus · Tahini · Solata",
      ingredientsList: [
        "Zlati čičerikini polpeti z zelišči",
        "Domač kremast humus s sezamom",
        "Tahini sezamov preliv",
        "Mešana sveža solata z oljčnim oljem",
        "Topel domač kruh",
      ],
      allergensList: ["Sezam", "Gluten (pšenica)"],
      image: "/images/falafel.jpg",
    },
    {
      id: 4,
      title: "Kebab Pizza",
      category: "Pice na kamnu",
      price: "8,90 €",
      oldPrice: "9,90 €",
      badge: "Hišna specialiteta",
      badgeType: "special",
      description:
        "Hišna posebnost – pica pečena na kamnu z domačim paradižnikovim sugojem, mozzarello, sočnim kebab mesom in jogurtovim prelivom.",
      ingredients: "Pelati · Mozzarella · Kebab meso · Čebula · Jogurtov preliv",
      ingredientsList: [
        "Domače testo pečeno na kamnu",
        "Pelati (paradižnikov sugo)",
        "Mozzarella",
        "Kebab meso",
        "Čebula",
        "Jogurtov preliv",
        "Origano",
      ],
      allergensList: ["Gluten (pšenica)", "Laktoza (mleko)"],
      image: "/images/pizza.jpg",
    },
    {
      id: 5,
      title: "Kraljevska Mešana Plošča",
      category: "Za 2 osebi",
      price: "13,90 €",
      badge: "Za 2 osebi",
      badgeType: "platter",
      description:
        "Vrhunski kulinarični izbor: döner meso, domači falafli, aromatični orientalski riž, zlati pomfri, pečen paradižnik in 3 hišne omake.",
      ingredients: "Döner meso · Falaflji · Riž · Pomfri · 3 hišne omake",
      ingredientsList: [
        "Telečji in piščančji döner",
        "Domači hrustljavi falaflji",
        "Aromatični orientalski riž",
        "Zlato ocvrt pomfri",
        "Pečen paradižnik & paprika",
        "3 hišne omake (jogurtova, čilijeva, tahini)",
      ],
      allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam"],
      image: "/images/hero-platter.jpg",
    },
    {
      id: 6,
      title: "Dürüm Falafel Zvitek",
      category: "Dürüm & Zvitki",
      price: "6,80 €",
      badge: "Vegi hit",
      badgeType: "vegi",
      description:
        "Hrustljav domač falafel v toplem lavaš kruhu s svežo kumaro, paradižnikom, metinim jogurtom in blagim sezamovim prelivom.",
      ingredients: "Falafel polpeti · Lavaš · Metin jogurt · Sezam",
      ingredientsList: [
        "Domači čičerikini falaflji",
        "Tanek topel lavaš kruh",
        "Sveže kumare in paradižnik",
        "Osvežilen metin jogurt",
        "Sezamov tahini preliv",
      ],
      allergensList: ["Gluten (pšenica)", "Laktoza (mleko)", "Sezam"],
      image: "/images/durum-falafel.jpg",
    },
  ];

  const selectedDish = dishes.find((d) => d.id === activeDishId) || dishes[0];

  // Lock scroll when detail modal is open
  useEffect(() => {
    if (modalDish) {
      document.documentElement.classList.add("drawerActive");
      document.body.classList.add("drawerActive");

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalDish(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.documentElement.classList.remove("drawerActive");
        document.body.classList.remove("drawerActive");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.documentElement.classList.remove("drawerActive");
      document.body.classList.remove("drawerActive");
    }
  }, [modalDish]);

  const handleOrderClick = (dishId: number) => {
    setOrderedDishId(dishId);
    setTimeout(() => {
      setOrderedDishId(null);
    }, 1600);
  };

  const openDetailsModal = (dish: Dish) => {
    setOrderQuantity(1);
    setModalDish(dish);
  };

  const handleCarouselScroll = () => {
    if (carouselTrackRef.current) {
      const scrollLeft = carouselTrackRef.current.scrollLeft;
      const cardWidth = carouselTrackRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentSlideIndex(Math.min(newIndex, dishes.length - 1));
    }
  };

  return (
    <section className={styles.popularSection} id="meni">
      <div className={styles.container}>
        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Priljubljene izbire</h2>

          <p className={styles.sectionSubtitle}>
            Okusi, ki so osvojili Ljubljano. Pripravljeno sveže vsak dan iz
            skrbno izbranih sestavin in domačega kruha.
          </p>
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
                  priority
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
                    <span className={styles.showcasePriceLabel}>Cena</span>
                    <span className={styles.showcasePriceValue}>{selectedDish.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.detailsModalTriggerBtn}
                  >
                    <InfoCircleSvg size={18} />
                    <span>Sestavine in alergeni</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography Lines List */}
          <div className={styles.magazineListCol}>
            <div className={styles.listHeaderRow}>
              <span className={styles.listHeaderText}>Izberite jed za prikaz:</span>
              <span className={styles.listCountBadge}>{dishes.length} specialitet</span>
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
                    <p className={styles.lineIngredients}>{dish.ingredients}</p>
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
              <span className={styles.swipeHintText}>Povlecite za več specialitet</span>
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
                        aria-label={`Poglej sestavine in alergene za ${dish.title}`}
                        title="Poglej sestavine in alergene"
                      >
                        <InfoCircleSvg size={24} />
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
            <h4 className={styles.bannerTitle}>Želite pogledati celoten meni?</h4>
            <p className={styles.bannerSubtitle}>
              Preverite našo celotno ponudbo kebabov, pic, prilog, pijač in sladic.
            </p>
          </div>
          <a href="#celoten-meni" className={styles.bannerBtn}>
            <span>Odpri Celoten Meni</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* ==================================================================
          FOOD DETAIL MODAL / POPUP (SESTAVINE, ALERGENI, OPIS JEDI)
          ================================================================== */}
      {modalDish && (
        <div className={styles.modalBackdrop} onClick={() => setModalDish(null)}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Bar */}
            <div className={styles.modalHeaderBar}>
              <div className={styles.modalHeaderCategory}>
                <span className={styles.modalCategoryBadge}>{modalDish.category}</span>
                <span className={styles.modalHalalBadge}>✓ 100% Halal</span>
              </div>
              <button
                type="button"
                onClick={() => setModalDish(null)}
                className={styles.modalCloseBtn}
                aria-label="Zapri podrobnosti"
              >
                ✕
              </button>
            </div>

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
                    <span className={styles.modalHalalBadge}>✓ 100% Halal</span>
                  </div>
                  <div className={styles.modalPriceText}>{modalDish.price}</div>
                </div>
              </div>

              {/* 1. Opis Jedi */}
              <div className={styles.modalSectionBox}>
                <h4 className={styles.modalSectionTitle}>Opis Jedi</h4>
                <p className={styles.modalDescText}>{modalDish.description}</p>
              </div>

              {/* 2. Sestavine (Ingredients Checklist) */}
              <div className={styles.modalSectionBox}>
                <h4 className={styles.modalSectionTitle}>Sestavine</h4>
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
                <h4 className={styles.modalSectionTitle}>Alergeni</h4>
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

            {/* Modal Footer / Order Bar */}
            <div className={styles.modalFooterBar}>
              <div className={styles.quantityPicker}>
                <button
                  type="button"
                  onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                  className={styles.quantityBtn}
                  disabled={orderQuantity <= 1}
                >
                  −
                </button>
                <span className={styles.quantityNum}>{orderQuantity}</span>
                <button
                  type="button"
                  onClick={() => setOrderQuantity(orderQuantity + 1)}
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleOrderClick(modalDish.id);
                  setTimeout(() => setModalDish(null), 900);
                }}
                className={styles.modalOrderConfirmBtn}
              >
                {orderedDishId === modalDish.id ? (
                  "✓ Dodano v naročilo!"
                ) : (
                  <>
                    <span>Dodaj v naročilo</span>
                    <span>•</span>
                    <span>{modalDish.price}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
