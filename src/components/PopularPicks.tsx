"use client";

import { useState } from "react";
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
  isSpicy?: boolean;
}

export default function PopularPicks() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orderedDishId, setOrderedDishId] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "Vse izbire", icon: "✨" },
    { id: "kebab", label: "Kebabi & Plošče", icon: "🥙" },
    { id: "durum", label: "Dürüm & Zvitki", icon: "🌯" },
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

  const handleOrderClick = (dishId: number) => {
    setOrderedDishId(dishId);
    setTimeout(() => {
      setOrderedDishId(null);
    }, 1600);
  };

  return (
    <section className={styles.popularSection} id="meni">
      <div className={styles.container}>
        {/* Section Header */}
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

          {/* Filter Pills */}
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
        </div>

        {/* Dishes Grid */}
        <div className={styles.dishesGrid}>
          {filteredDishes.map((dish) => (
            <article key={dish.id} className={styles.dishCard}>
              {/* Image Container with Floating Badges */}
              <div className={styles.cardImageWrapper}>
                <Image
                  src={dish.image}
                  alt={dish.title}
                  width={420}
                  height={280}
                  className={styles.dishImage}
                />

                {/* Badge Tag */}
                {dish.badge && (
                  <span
                    className={`${styles.dishBadge} ${
                      dish.badgeType === "bestseller"
                        ? styles.badgeBestseller
                        : dish.badgeType === "vegi"
                        ? styles.badgeVegi
                        : dish.badgeType === "platter"
                        ? styles.badgePlatter
                        : styles.badgeRecommended
                    }`}
                  >
                    {dish.badgeType === "vegi" && "🌱 "}
                    {dish.badgeType === "bestseller" && "⭐ "}
                    {dish.badge}
                  </span>
                )}

                {/* Prep Time Tag */}
                <span className={styles.timeTag}>
                  <span>⏱</span>
                  <span>{dish.time}</span>
                </span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                {/* Meta Row: Rating */}
                <div className={styles.cardMetaRow}>
                  <div className={styles.ratingBadge}>
                    <span className={styles.starIcon}>★</span>
                    <span className={styles.ratingScore}>{dish.rating}</span>
                    <span className={styles.reviewsCount}>
                      ({dish.reviewsCount})
                    </span>
                  </div>
                  <span className={styles.halalGuarantee}>✓ 100% Halal</span>
                </div>

                {/* Dish Title */}
                <h3 className={styles.dishTitle}>{dish.title}</h3>

                {/* Dish Description */}
                <p className={styles.dishDescription}>{dish.description}</p>

                {/* Card Footer: Price & CTA Button */}
                <div className={styles.cardFooter}>
                  <div className={styles.priceColumn}>
                    <span className={styles.priceLabel}>Cena</span>
                    <div className={styles.priceRow}>
                      <span className={styles.currentPrice}>{dish.price}</span>
                      {dish.oldPrice && (
                        <span className={styles.oldPrice}>{dish.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrderClick(dish.id)}
                    className={`${styles.orderBtn} ${
                      orderedDishId === dish.id ? styles.orderBtnAdded : ""
                    }`}
                    aria-label={`Naroči ${dish.title}`}
                  >
                    {orderedDishId === dish.id ? (
                      <>
                        <span>✓</span>
                        <span>Dodano!</span>
                      </>
                    ) : (
                      <>
                        <span>+</span>
                        <span>Naroči</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Banner */}
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
