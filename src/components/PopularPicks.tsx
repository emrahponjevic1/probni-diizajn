"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PopularPicks.module.css";

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
  // Split-View Variations: "v1_classic" | "v2_contrast" | "v3_reversed" | "v4_magazine"
  const [activeVersion, setActiveVersion] = useState<"v1_classic" | "v2_contrast" | "v3_reversed" | "v4_magazine">("v1_classic");
  const [activeDishId, setActiveDishId] = useState<number>(1);
  const [orderedDishId, setOrderedDishId] = useState<number | null>(null);

  // Modal / Popup State for Dish Details (Ingredients, Allergens, Description)
  const [modalDish, setModalDish] = useState<Dish | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  const versionsList = [
    { id: "v1_classic" as const, label: "Verzija 1: Bistro Classic", icon: "🍽️" },
    { id: "v2_contrast" as const, label: "Verzija 2: Dark Contrast Card", icon: "✨" },
    { id: "v3_reversed" as const, label: "Verzija 3: Reversed Panorama", icon: "🔄" },
    { id: "v4_magazine" as const, label: "Verzija 4: Magazine Minimal", icon: "📰" },
  ];

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

  return (
    <section className={styles.popularSection} id="meni">
      <div className={styles.container}>
        {/* ==================================================================
            VERSION SWITCHER TOOLBAR
            ================================================================== */}
        <div className={styles.layoutSwitcherBanner}>
          <div className={styles.layoutSwitcherHeader}>
            <span className={styles.layoutSwitcherTag}>SPLIT-VIEW VERZIJE</span>
            <span className={styles.layoutSwitcherSub}>Izberite slog prikaza:</span>
          </div>
          <div className={styles.layoutSwitcherButtons}>
            {versionsList.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVersion(v.id)}
                className={`${styles.layoutSwitchBtn} ${
                  activeVersion === v.id ? styles.layoutSwitchBtnActive : ""
                }`}
              >
                <span>{v.icon}</span>
                <span>{v.label}</span>
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
            Okusi, ki so osvojili Ljubljano. Kliknite na kartico ali gumb za ogled
            vseh podrobnosti (sestavine, alergeni) in naročilo.
          </p>
        </div>

        {/* ==================================================================
            VERZIJA 1: BISTRO CLASSIC (TOPLI SVETLI IZLOG + KARTICE)
            ================================================================== */}
        {activeVersion === "v1_classic" && (
          <div className={styles.v1Grid}>
            {/* Left: Sticky Showcase Card */}
            <div className={styles.v1StickyCol}>
              <div className={styles.v1ShowcaseCard}>
                <div className={styles.v1PlateAuraContainer}>
                  <div className={styles.v1PlateBgGlow} />
                  <div className={styles.v1AuraRing} />
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    width={320}
                    height={320}
                    priority
                    className={styles.v1RoundPlate}
                  />
                  {selectedDish.badge && (
                    <span className={styles.v1PlateBadge}>{selectedDish.badge}</span>
                  )}
                </div>

                <div className={styles.v1CardInfo}>
                  <div className={styles.v1MetaBadgesRow}>
                    <span className={styles.v1CategoryBadge}>{selectedDish.category}</span>
                    <span className={styles.v1HalalBadge}>✓ 100% Halal</span>
                  </div>

                  <h3 className={styles.v1Title}>{selectedDish.title}</h3>
                  <p className={styles.v1Desc}>{selectedDish.description}</p>

                  <div className={styles.v1IngredientsTag}>
                    <span>Sestavine:</span> {selectedDish.ingredients}
                  </div>

                  {/* Detail Info Modal Trigger Button */}
                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.detailsModalTriggerBtn}
                  >
                    <span>ℹ️ Poglej sestavine in alergene</span>
                    <span>&rarr;</span>
                  </button>

                  <div className={styles.v1FooterRow}>
                    <div className={styles.priceColumn}>
                      <span className={styles.priceLabel}>Cena jedi</span>
                      <span className={styles.v1PriceText}>{selectedDish.price}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOrderClick(selectedDish.id)}
                      className={`${styles.orderBtn} ${
                        orderedDishId === selectedDish.id ? styles.orderBtnAdded : ""
                      }`}
                      style={{ padding: "0.85rem 1.8rem", fontSize: "0.95rem" }}
                    >
                      {orderedDishId === selectedDish.id ? "✓ Dodano v naročilo!" : "+ Naroči jed"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Menu Items */}
            <div className={styles.v1ListCol}>
              <div className={styles.v1ListHeader}>
                <span>Izberite specialiteto:</span>
                <span>{dishes.length} jedi</span>
              </div>

              <div className={styles.v1ItemsList}>
                {dishes.map((dish, idx) => (
                  <div
                    key={dish.id}
                    onClick={() => setActiveDishId(dish.id)}
                    className={`${styles.v1ListItem} ${
                      activeDishId === dish.id ? styles.v1ListItemActive : ""
                    }`}
                  >
                    <div className={styles.v1ItemLeft}>
                      <div className={styles.v1ThumbWrapper}>
                        <Image src={dish.image} alt={dish.title} width={54} height={54} />
                      </div>
                      <div className={styles.v1ItemTexts}>
                        <div className={styles.v1ItemTopRow}>
                          <span className={styles.v1ItemNum}>0{idx + 1}.</span>
                          <h4 className={styles.v1ItemTitle}>{dish.title}</h4>
                          {dish.badge && <span className={styles.v1MiniBadge}>{dish.badge}</span>}
                        </div>
                        <span className={styles.v1ItemCategory}>{dish.category}</span>
                      </div>
                    </div>

                    <div className={styles.v1ItemRight}>
                      <span className={styles.v1ItemPrice}>{dish.price}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsModal(dish);
                        }}
                        className={styles.itemInfoIconBtn}
                        title="Prikaži podrobnosti"
                      >
                        ℹ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            VERZIJA 2: DARK CONTRAST CARD (LUKSUZNI TEMNI CARD + SVETLA LISTA)
            ================================================================== */}
        {activeVersion === "v2_contrast" && (
          <div className={styles.v2Grid}>
            {/* Left: Deep Charcoal Contrast Card */}
            <div className={styles.v2StickyCol}>
              <div className={styles.v2DarkShowcaseCard}>
                <div className={styles.v2DarkHeader}>
                  <span className={styles.v2GoldTag}>👑 ŠEHEREZADA IZBOR</span>
                  <span className={styles.v2HalalPill}>100% Halal</span>
                </div>

                <div className={styles.v2PlateWrapper}>
                  <div className={styles.v2OrangeGlow} />
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    width={300}
                    height={300}
                    priority
                    className={styles.v2PlateImg}
                  />
                </div>

                <div className={styles.v2Content}>
                  <div className={styles.v2PillsRow}>
                    <span className={styles.v2DarkPill}>{selectedDish.category}</span>
                    <span className={styles.v2DarkPill}>✓ 100% Halal</span>
                    <span className={styles.v2DarkPill}>🔥 Sveže na ognju</span>
                  </div>

                  <h3 className={styles.v2Title}>{selectedDish.title}</h3>
                  <p className={styles.v2Desc}>{selectedDish.description}</p>

                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.darkDetailsTriggerBtn}
                  >
                    <span>ℹ️ Sestavine in alergeni</span>
                    <span>&rarr;</span>
                  </button>

                  <div className={styles.v2DarkFooter}>
                    <div className={styles.v2PriceBox}>
                      <span className={styles.v2PriceLabel}>Skupaj</span>
                      <span className={styles.v2PriceValue}>{selectedDish.price}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOrderClick(selectedDish.id)}
                      className={styles.v2OrangeOrderBtn}
                    >
                      {orderedDishId === selectedDish.id ? "✓ Dodano!" : "Naroči zdaj →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Light Minimal Cards */}
            <div className={styles.v2ListCol}>
              <div className={styles.v2ItemsList}>
                {dishes.map((dish, idx) => (
                  <div
                    key={dish.id}
                    onClick={() => setActiveDishId(dish.id)}
                    className={`${styles.v2ListItem} ${
                      activeDishId === dish.id ? styles.v2ListItemActive : ""
                    }`}
                  >
                    <div className={styles.v2ItemIndex}>0{idx + 1}</div>
                    <div className={styles.v2ItemMain}>
                      <div className={styles.v2ItemTitleRow}>
                        <h4 className={styles.v2ItemTitle}>{dish.title}</h4>
                        {dish.badge && <span className={styles.v2Badge}>{dish.badge}</span>}
                      </div>
                      <p className={styles.v2ItemSub}>{dish.ingredients}</p>
                    </div>
                    <div className={styles.v2ItemEnd}>
                      <span className={styles.v2PriceTag}>{dish.price}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsModal(dish);
                        }}
                        className={styles.itemInfoIconBtn}
                        title="Prikaži podrobnosti"
                      >
                        ℹ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            VERZIJA 3: REVERSED PANORAMA (DESNO HERO + LEVO KARTICE)
            ================================================================== */}
        {activeVersion === "v3_reversed" && (
          <div className={styles.v3Grid}>
            {/* Left: Categorized Dish Cards */}
            <div className={styles.v3ListCol}>
              <div className={styles.v3ItemsGrid}>
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => setActiveDishId(dish.id)}
                    className={`${styles.v3CardItem} ${
                      activeDishId === dish.id ? styles.v3CardItemActive : ""
                    }`}
                  >
                    <div className={styles.v3CardImageSmall}>
                      <Image src={dish.image} alt={dish.title} width={90} height={90} />
                    </div>
                    <div className={styles.v3CardContent}>
                      <span className={styles.v3CategoryLabel}>{dish.category}</span>
                      <h4 className={styles.v3CardTitle}>{dish.title}</h4>
                      <span className={styles.v3CardPrice}>{dish.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sticky Panorama Showcase */}
            <div className={styles.v3StickyCol}>
              <div className={styles.v3PanoramaCard}>
                <div className={styles.v3PanoramaImageArea}>
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    width={400}
                    height={400}
                    priority
                    className={styles.v3PanoramaImage}
                  />
                  <div className={styles.v3PanoramaBadges}>
                    <span className={styles.v3HalalTag}>✓ 100% Halal</span>
                  </div>
                </div>

                <div className={styles.v3PanoramaBody}>
                  <h3 className={styles.v3PanoramaTitle}>{selectedDish.title}</h3>
                  <p className={styles.v3PanoramaDesc}>{selectedDish.description}</p>
                  
                  <div className={styles.v3DetailRow}>
                    <div><strong>Kategorija:</strong> {selectedDish.category}</div>
                    <div><strong>Priprava:</strong> Sveže na ognju</div>
                    <div><strong>Kakovost:</strong> 100% Halal</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.detailsModalTriggerBtn}
                    style={{ margin: "0.2rem 0" }}
                  >
                    <span>ℹ️ Poglej sestavine in alergene</span>
                    <span>&rarr;</span>
                  </button>

                  <div className={styles.v3PanoramaFooter}>
                    <span className={styles.v3PanoramaPrice}>{selectedDish.price}</span>
                    <button
                      type="button"
                      onClick={() => handleOrderClick(selectedDish.id)}
                      className={styles.v3OrderBtn}
                    >
                      {orderedDishId === selectedDish.id ? "✓ Dodano!" : "Naroči to jed →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            VERZIJA 4: MAGAZINE EDITORIAL (ČISTI MINIMAL SA VELIKIM TEKSTOM)
            ================================================================== */}
        {activeVersion === "v4_magazine" && (
          <div className={styles.v4Grid}>
            {/* Left: Magazine Hero Poster */}
            <div className={styles.v4StickyCol}>
              <div className={styles.v4MagazineCard}>
                <div className={styles.v4ImageContainer}>
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.title}
                    width={380}
                    height={380}
                    priority
                    className={styles.v4MagazinePlate}
                  />
                  <div className={styles.v4WatermarkNum}>0{selectedDish.id}</div>
                </div>

                <div className={styles.v4MagazineContent}>
                  <div className={styles.v4MagazineHeader}>
                    <span className={styles.v4MagTag}>LJUBLJANA SIGNATURE</span>
                    <span className={styles.v4MagPrice}>{selectedDish.price}</span>
                  </div>

                  <h3 className={styles.v4MagTitle}>{selectedDish.title}</h3>
                  <p className={styles.v4MagDesc}>{selectedDish.description}</p>

                  <button
                    type="button"
                    onClick={() => openDetailsModal(selectedDish)}
                    className={styles.detailsModalTriggerBtn}
                    style={{ marginBottom: "0.6rem" }}
                  >
                    <span>ℹ️ Vse sestavine &amp; alergeni</span>
                    <span>&rarr;</span>
                  </button>

                  <div className={styles.v4MagButtonRow}>
                    <button
                      type="button"
                      onClick={() => handleOrderClick(selectedDish.id)}
                      className={styles.v4MagBtn}
                    >
                      {orderedDishId === selectedDish.id ? "✓ Dodano!" : "+ Naroči to specialiteto"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Typography Lines List */}
            <div className={styles.v4ListCol}>
              <div className={styles.v4LinesList}>
                {dishes.map((dish, idx) => (
                  <div
                    key={dish.id}
                    onClick={() => setActiveDishId(dish.id)}
                    className={`${styles.v4LineItem} ${
                      activeDishId === dish.id ? styles.v4LineItemActive : ""
                    }`}
                  >
                    <span className={styles.v4LineNum}>/0{idx + 1}</span>
                    <div className={styles.v4LineCenter}>
                      <h4 className={styles.v4LineTitle}>{dish.title}</h4>
                      <p className={styles.v4LineIngredients}>{dish.ingredients}</p>
                    </div>
                    <div className={styles.v4LineEnd}>
                      <span className={styles.v4LinePrice}>{dish.price}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsModal(dish);
                        }}
                        className={styles.itemInfoIconBtn}
                        title="Prikaži podrobnosti"
                      >
                        ℹ
                      </button>
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
                <h4 className={styles.modalSectionTitle}>
                  <span>📝</span>
                  <span>Opis Jedi</span>
                </h4>
                <p className={styles.modalDescText}>{modalDish.description}</p>
              </div>

              {/* 2. Sestavine (Ingredients Checklist) */}
              <div className={styles.modalSectionBox}>
                <h4 className={styles.modalSectionTitle}>
                  <span>🌿</span>
                  <span>Sestavine</span>
                </h4>
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
                <h4 className={styles.modalSectionTitle}>
                  <span>⚠️</span>
                  <span>Alergeni</span>
                </h4>
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
