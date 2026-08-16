"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./PopularPicks.module.css";

interface Dish {
  id: number;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviewsCount: number;
  time: string;
  badge?: string;
  badgeType?: "bestseller" | "recommended" | "vegi" | "special" | "platter";
  description: string;
  image: string;
  calories?: string;
}

export default function PopularPicks() {
  // Layout Switcher: "plates" | "carousel" | "bento" | "split"
  const [activeLayout, setActiveLayout] = useState<"plates" | "carousel" | "bento" | "split">("plates");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDishId, setActiveDishId] = useState<number>(1);
  const [orderedDishId, setOrderedDishId] = useState<number | null>(null);

  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const layoutsList = [
    { id: "plates" as const, label: "1. Lebdeći tanjiri", icon: "🍽️" },
    { id: "carousel" as const, label: "2. Karusel Slider", icon: "🎠" },
    { id: "bento" as const, label: "3. Bento mreža", icon: "🍱" },
    { id: "split" as const, label: "4. Split-View lista", icon: "📖" },
  ];

  const categories = [
    { id: "all", label: "Vse izbire", icon: "✨" },
    { id: "kebab", label: "Kebabi", icon: "🥙" },
    { id: "durum", label: "Dürüm", icon: "🌯" },
    { id: "pizza", label: "Pizze", icon: "🍕" },
    { id: "falafel", label: "Falafel & Vegi", icon: "🌱" },
  ];

  const dishes: Dish[] = [
    {
      id: 1,
      title: "Kraljevi Döner Kebab",
      category: "kebab",
      price: "6,50 €",
      rating: 4.9,
      reviewsCount: 420,
      time: "10-12 min",
      calories: "580 kcal",
      badge: "Bestseller",
      badgeType: "bestseller",
      description:
        "Sočno telečje in piščančje meso v sveže pečenem domačem lepinji kruhu, hrustljava zelenjava in hišna jogurtova omaka.",
      image: "/images/doner-kebab.jpg",
    },
    {
      id: 2,
      title: "Šeherezada Dürüm Wrap",
      category: "durum",
      price: "7,20 €",
      rating: 4.9,
      reviewsCount: 318,
      time: "8-10 min",
      calories: "540 kcal",
      badge: "Priporočamo",
      badgeType: "recommended",
      description:
        "Domač tanek lavaš zvit z bogatim slojem mariniranega mesa, sveže solate, paradižnika in pristnih orientalskih začimb.",
      image: "/images/durum-falafel.jpg",
    },
    {
      id: 3,
      title: "Tradicionalni Falafel Krožnik",
      category: "falafel",
      price: "7,80 €",
      rating: 4.8,
      reviewsCount: 265,
      time: "12-15 min",
      calories: "490 kcal",
      badge: "100% Vegi",
      badgeType: "vegi",
      description:
        "Zlato ocvrti čičerikini polpeti z orientalskimi zelišči, kremast humus, sveža solata, tahini preliv in topel kruh.",
      image: "/images/falafel.jpg",
    },
    {
      id: 4,
      title: "Šeherezada Special Pizza",
      category: "pizza",
      price: "8,90 €",
      oldPrice: "9,90 €",
      rating: 4.9,
      reviewsCount: 190,
      time: "15 min",
      calories: "780 kcal",
      badge: "Hišna specialiteta",
      badgeType: "special",
      description:
        "Hrustljavo testo pečeno na kamnu, hišni paradižnikov sugo, mozzarella, narezano döner meso, gobe in sveža rukola.",
      image: "/images/pizza.jpg",
    },
    {
      id: 5,
      title: "Kraljevska Mešana Plošča",
      category: "kebab",
      price: "13,90 €",
      rating: 5.0,
      reviewsCount: 512,
      time: "15-18 min",
      calories: "980 kcal",
      badge: "Za 2 osebi",
      badgeType: "platter",
      description:
        "Vrhunski kulinarični izbor: döner meso, domači falafli, aromatični riž, zlati pomfri, pečen paradižnik in 3 omake.",
      image: "/images/hero-platter.jpg",
    },
    {
      id: 6,
      title: "Dürüm Falafel Zvitek",
      category: "durum",
      price: "6,80 €",
      rating: 4.8,
      reviewsCount: 140,
      time: "8-10 min",
      calories: "460 kcal",
      badge: "Vegi hit",
      badgeType: "vegi",
      description:
        "Hrustljav falafel v toplem lavaš kruhu s svežo kumaro, paradižnikom, metinim jogurtom in blagim sezamovim prelivom.",
      image: "/images/durum-falafel.jpg",
    },
  ];

  const filteredDishes =
    activeCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  const selectedDish = dishes.find((d) => d.id === activeDishId) || dishes[0];

  const handleOrderClick = (dishId: number) => {
    setOrderedDishId(dishId);
    setTimeout(() => {
      setOrderedDishId(null);
    }, 1600);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselTrackRef.current) {
      const scrollAmount = 380;
      carouselTrackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.popularSection} id="meni">
      <div className={styles.container}>
        {/* ==================================================================
            LAYOUT SWITCHER TOOLBAR
            ================================================================== */}
        <div className={styles.layoutSwitcherBanner}>
          <div className={styles.layoutSwitcherHeader}>
            <span className={styles.layoutSwitcherTag}>PREIZKUSI LAYOUTE</span>
            <span className={styles.layoutSwitcherSub}>Izberite želen videz sekcije:</span>
          </div>
          <div className={styles.layoutSwitcherButtons}>
            {layoutsList.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setActiveLayout(l.id)}
                className={`${styles.layoutSwitchBtn} ${
                  activeLayout === l.id ? styles.layoutSwitchBtnActive : ""
                }`}
              >
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTopBadge}>
            <span className={styles.fireEmoji}>🔥</span>
            <span>Najbolj iskano</span>
          </div>

          <h2 className={styles.sectionTitle}>Priljubljene izbire</h2>

          <p className={styles.sectionSubtitle}>
            Okusi, ki so osvojili Ljubljano. Vsak dan pripravljeno sveže iz
            skrbno izbranih 100% Halal sestavin in domačega kruha.
          </p>

          {/* Filter Pills (Shown on standard, plates, and carousel layouts) */}
          {activeLayout !== "split" && (
            <div className={styles.filterPillsRow}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`${styles.filterPill} ${
                    activeCategory === cat.id ? styles.filterPillActive : ""
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================================
            LAYOUT 1: FLOATING PLATES (LEBDEČI TANJIRI Z ORGANSKO PODLOGO)
            ================================================================== */}
        {activeLayout === "plates" && (
          <div className={styles.platesGrid}>
            {filteredDishes.map((dish) => (
              <article key={dish.id} className={styles.plateCard}>
                {/* Organic pastel glow in card background */}
                <div className={styles.plateCardBgBlob} />

                {/* Floating Plate Area */}
                <div className={styles.floatingPlateContainer}>
                  <div className={styles.plateAuraRing} />
                  <Image
                    src={dish.image}
                    alt={dish.title}
                    width={240}
                    height={240}
                    className={styles.floatingRoundPlate}
                  />

                  {dish.badge && (
                    <span
                      className={`${styles.plateBadge} ${
                        dish.badgeType === "bestseller"
                          ? styles.badgeBestseller
                          : dish.badgeType === "vegi"
                          ? styles.badgeVegi
                          : dish.badgeType === "platter"
                          ? styles.badgePlatter
                          : styles.badgeRecommended
                      }`}
                    >
                      {dish.badge}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.plateCardBody}>
                  <div className={styles.cardMetaRow}>
                    <div className={styles.ratingBadge}>
                      <span className={styles.starIcon}>★</span>
                      <span className={styles.ratingScore}>{dish.rating}</span>
                      <span className={styles.reviewsCount}>({dish.reviewsCount})</span>
                    </div>
                    <span className={styles.timeTagText}>⏱ {dish.time}</span>
                  </div>

                  <h3 className={styles.plateDishTitle}>{dish.title}</h3>
                  <p className={styles.plateDishDesc}>{dish.description}</p>

                  <div className={styles.plateCardFooter}>
                    <div className={styles.priceColumn}>
                      <span className={styles.priceLabel}>Cena</span>
                      <span className={styles.currentPrice}>{dish.price}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOrderClick(dish.id)}
                      className={`${styles.orderBtn} ${
                        orderedDishId === dish.id ? styles.orderBtnAdded : ""
                      }`}
                    >
                      {orderedDishId === dish.id ? "✓ Dodano!" : "+ Naroči"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ==================================================================
            LAYOUT 2: HORIZONTAL LUXURY CAROUSEL / SLIDER
            ================================================================== */}
        {activeLayout === "carousel" && (
          <div className={styles.carouselWrapper}>
            {/* Carousel Controls */}
            <div className={styles.carouselNavRow}>
              <span className={styles.carouselCounterText}>
                Prikazano <strong>{filteredDishes.length}</strong> specialitet
              </span>
              <div className={styles.carouselArrows}>
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className={styles.carouselArrowBtn}
                  aria-label="Prejšnja jed"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className={styles.carouselArrowBtn}
                  aria-label="Naslednja jed"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Scrollable Track */}
            <div className={styles.carouselTrack} ref={carouselTrackRef}>
              {filteredDishes.map((dish) => (
                <div key={dish.id} className={styles.carouselCardItem}>
                  <div className={styles.dishCard}>
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={dish.image}
                        alt={dish.title}
                        width={420}
                        height={280}
                        className={styles.dishImage}
                      />
                      {dish.badge && (
                        <span
                          className={`${styles.dishBadge} ${
                            dish.badgeType === "bestseller"
                              ? styles.badgeBestseller
                              : dish.badgeType === "vegi"
                              ? styles.badgeVegi
                              : styles.badgeRecommended
                          }`}
                        >
                          {dish.badge}
                        </span>
                      )}
                      <span className={styles.timeTag}>
                        <span>⏱</span>
                        <span>{dish.time}</span>
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardMetaRow}>
                        <div className={styles.ratingBadge}>
                          <span className={styles.starIcon}>★</span>
                          <span className={styles.ratingScore}>{dish.rating}</span>
                          <span className={styles.reviewsCount}>({dish.reviewsCount})</span>
                        </div>
                        <span className={styles.halalGuarantee}>✓ 100% Halal</span>
                      </div>

                      <h3 className={styles.dishTitle}>{dish.title}</h3>
                      <p className={styles.dishDescription}>{dish.description}</p>

                      <div className={styles.cardFooter}>
                        <div className={styles.priceColumn}>
                          <span className={styles.priceLabel}>Cena</span>
                          <span className={styles.currentPrice}>{dish.price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOrderClick(dish.id)}
                          className={`${styles.orderBtn} ${
                            orderedDishId === dish.id ? styles.orderBtnAdded : ""
                          }`}
                        >
                          {orderedDishId === dish.id ? "✓ Dodano!" : "+ Naroči"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            LAYOUT 3: BENTO GRID SHOWCASE (APPLE STYLE ASYMMETRIC MESH)
            ================================================================== */}
        {activeLayout === "bento" && (
          <div className={styles.bentoGrid}>
            {/* Bento Cell 1: Master Hero (Spans 2 rows) */}
            <article className={`${styles.bentoCell} ${styles.bentoHeroCell}`}>
              <div className={styles.bentoHeroContent}>
                <div className={styles.bentoGoldTag}>👑 ŠEHEREZADA #1 HIT</div>
                <h3 className={styles.bentoHeroTitle}>Kraljevi Döner Kebab</h3>
                <p className={styles.bentoHeroDesc}>
                  Sočno telečje in piščančje meso pečeno na pravem ognju, postreženo v domačem
                  hrustljavem kruhu z originalno hišno omako.
                </p>
                <div className={styles.bentoMetaRow}>
                  <span>★ 4.9 (420+ ocen)</span>
                  <span>⏱ 10-12 min</span>
                  <span>✓ 100% Halal</span>
                </div>
                <div className={styles.bentoHeroFooter}>
                  <div className={styles.priceColumn}>
                    <span className={styles.priceLabel}>Cena</span>
                    <span className={styles.currentPrice} style={{ fontSize: "1.8rem" }}>
                      6,50 €
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(1)}
                    className={`${styles.orderBtn} ${orderedDishId === 1 ? styles.orderBtnAdded : ""}`}
                    style={{ padding: "0.85rem 1.8rem" }}
                  >
                    {orderedDishId === 1 ? "✓ Dodano!" : "+ Naroči zdaj"}
                  </button>
                </div>
              </div>
              <div className={styles.bentoHeroImageWrapper}>
                <Image
                  src="/images/doner-kebab.jpg"
                  alt="Kraljevi Döner Kebab"
                  width={340}
                  height={340}
                  className={styles.bentoHeroPlate}
                />
              </div>
            </article>

            {/* Bento Cell 2: Dürüm Wrap */}
            <article className={`${styles.bentoCell} ${styles.bentoMediumCell}`}>
              <div className={styles.bentoMediumImage}>
                <Image src="/images/durum-falafel.jpg" alt="Dürüm" width={200} height={200} />
              </div>
              <div className={styles.bentoMediumContent}>
                <span className={styles.bentoMiniBadge}>🌯 Priporočamo</span>
                <h4 className={styles.bentoTitle}>Šeherezada Dürüm</h4>
                <p className={styles.bentoDesc}>Tanek domač lavaš z bogatim mariniranim mesom.</p>
                <div className={styles.bentoPriceRow}>
                  <span className={styles.currentPrice}>7,20 €</span>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(2)}
                    className={styles.bentoQuickAddBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>

            {/* Bento Cell 3: Falafel */}
            <article className={`${styles.bentoCell} ${styles.bentoMediumCell}`}>
              <div className={styles.bentoMediumImage}>
                <Image src="/images/falafel.jpg" alt="Falafel" width={200} height={200} />
              </div>
              <div className={styles.bentoMediumContent}>
                <span className={`${styles.bentoMiniBadge} ${styles.badgeVegi}`}>🌱 100% Vegi</span>
                <h4 className={styles.bentoTitle}>Falafel Krožnik</h4>
                <p className={styles.bentoDesc}>Čičerikini polpeti s humusom in tahinijem.</p>
                <div className={styles.bentoPriceRow}>
                  <span className={styles.currentPrice}>7,80 €</span>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(3)}
                    className={styles.bentoQuickAddBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>

            {/* Bento Cell 4: Pizza Special (Wide Bottom) */}
            <article className={`${styles.bentoCell} ${styles.bentoWideCell}`}>
              <Image
                src="/images/pizza.jpg"
                alt="Pizza"
                width={180}
                height={180}
                className={styles.bentoWideImg}
              />
              <div className={styles.bentoWideContent}>
                <span className={styles.bentoMiniBadge}>🍕 Na kamnu pečeno</span>
                <h4 className={styles.bentoTitle}>Šeherezada Special Pizza</h4>
                <p className={styles.bentoDesc}>Döner meso, mozzarella, gobe in hišni paradižnikov sugo.</p>
                <div className={styles.bentoPriceRow}>
                  <span className={styles.currentPrice}>8,90 €</span>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(4)}
                    className={styles.bentoQuickAddBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>

            {/* Bento Cell 5: Kraljevska Plošča (Wide Bottom) */}
            <article className={`${styles.bentoCell} ${styles.bentoWideCell}`}>
              <Image
                src="/images/hero-platter.jpg"
                alt="Plošča"
                width={180}
                height={180}
                className={styles.bentoWideImg}
              />
              <div className={styles.bentoWideContent}>
                <span className={styles.bentoMiniBadge}>👥 Za 2 osebi</span>
                <h4 className={styles.bentoTitle}>Kraljevska Mešana Plošča</h4>
                <p className={styles.bentoDesc}>Döner meso, falafli, riž, pomfri in 3 hišne omake.</p>
                <div className={styles.bentoPriceRow}>
                  <span className={styles.currentPrice}>13,90 €</span>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(5)}
                    className={styles.bentoQuickAddBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ==================================================================
            LAYOUT 4: SPLIT-VIEW EDITORIAL (LIVE SHOWCASE + INTERACTIVE LIST)
            ================================================================== */}
        {activeLayout === "split" && (
          <div className={styles.splitLayoutGrid}>
            {/* Left: Sticky Live Showcase */}
            <div className={styles.splitStickyShowcase}>
              <div className={styles.splitShowcaseCard}>
                <div className={styles.splitPlateWrapper}>
                  <div className={styles.splitPlateGlow} />
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    width={360}
                    height={360}
                    className={styles.splitMainPlate}
                  />
                  {selectedDish.badge && (
                    <span className={styles.splitBadgeTag}>{selectedDish.badge}</span>
                  )}
                </div>

                <div className={styles.splitShowcaseMeta}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.splitRating}>★ {selectedDish.rating} ({selectedDish.reviewsCount} ocen)</span>
                    <span className={styles.splitTime}>⏱ {selectedDish.time}</span>
                    <span className={styles.halalGuarantee}>✓ 100% Halal</span>
                  </div>

                  <h3 className={styles.splitShowcaseTitle}>{selectedDish.title}</h3>
                  <p className={styles.splitShowcaseDesc}>{selectedDish.description}</p>

                  <div className={styles.splitShowcaseFooter}>
                    <div className={styles.priceColumn}>
                      <span className={styles.priceLabel}>Cena jedi</span>
                      <span className={styles.currentPrice} style={{ fontSize: "1.75rem" }}>
                        {selectedDish.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOrderClick(selectedDish.id)}
                      className={`${styles.orderBtn} ${
                        orderedDishId === selectedDish.id ? styles.orderBtnAdded : ""
                      }`}
                      style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}
                    >
                      {orderedDishId === selectedDish.id ? "✓ Dodano v naročilo!" : "Dodaj v naročilo →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Editorial List */}
            <div className={styles.splitMenuRightCol}>
              <div className={styles.splitListHeader}>
                <span className={styles.splitListHeaderTitle}>Izberite jed za podrobnosti:</span>
                <span className={styles.splitListHeaderCount}>{dishes.length} specialitet</span>
              </div>

              <div className={styles.splitItemsList}>
                {dishes.map((dish, idx) => (
                  <div
                    key={dish.id}
                    onClick={() => setActiveDishId(dish.id)}
                    className={`${styles.splitMenuItem} ${
                      activeDishId === dish.id ? styles.splitMenuItemActive : ""
                    }`}
                  >
                    <div className={styles.splitItemLeft}>
                      <span className={styles.splitItemNum}>0{idx + 1}</span>
                      <div className={styles.splitItemText}>
                        <div className={styles.splitItemTitleRow}>
                          <h4 className={styles.splitItemName}>{dish.title}</h4>
                          {dish.badge && (
                            <span className={styles.splitItemMiniBadge}>{dish.badge}</span>
                          )}
                        </div>
                        <p className={styles.splitItemIngredients}>
                          {dish.category === "kebab" && "Telečje & piščančje meso · lepinja · omake"}
                          {dish.category === "durum" && "Lavaš kruh · solata · orientalske začimbe"}
                          {dish.category === "falafel" && "Čičerika · humus · tahini · sveža solata"}
                          {dish.category === "pizza" && "Krušna peč · mozzarella · döner meso"}
                        </p>
                      </div>
                    </div>

                    <div className={styles.splitItemRight}>
                      <span className={styles.splitItemPrice}>{dish.price}</span>
                      <span className={styles.splitItemArrow}>➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
    </section>
  );
}
