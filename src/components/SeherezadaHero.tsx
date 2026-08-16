"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SeherezadaHero.module.css";

// Clean Vector SVG Icons
const UtensilsSvg = ({ size = 19, className }: { size?: number; className?: string }) => (
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
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v18" />
    <path d="M5 2v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
    <path d="M8 12v8" />
  </svg>
);

const PhoneSvg = ({ size = 17, className }: { size?: number; className?: string }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PinSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const TrophySvg = ({ size = 18, className }: { size?: number; className?: string }) => (
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const ArrowRightSvg = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function SeherezadaHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Interactive Location & Language state
  const [selectedLocation, setSelectedLocation] = useState<"1" | "2">("1");
  const [selectedLang, setSelectedLang] = useState<"SLO" | "ENG" | "BHS">("SLO");

  // Dropdown Open States (Desktop & Mobile Drawer)
  const [isDesktopLocOpen, setIsDesktopLocOpen] = useState(false);
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [isDrawerLocOpen, setIsDrawerLocOpen] = useState(false);
  const [isDrawerLangOpen, setIsDrawerLangOpen] = useState(false);

  const desktopNavActionsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopNavActionsRef.current && !desktopNavActionsRef.current.contains(event.target as Node)) {
        setIsDesktopLocOpen(false);
        setIsDesktopLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bulletproof Lock body & html scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("drawerActive");
      document.body.classList.add("drawerActive");

      const preventTouch = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        // Allow scroll only inside drawer if drawer itself is scrollable
        if (!target.closest(`.${styles.mobileDrawer}`)) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", preventTouch, { passive: false });

      return () => {
        document.documentElement.classList.remove("drawerActive");
        document.body.classList.remove("drawerActive");
        document.removeEventListener("touchmove", preventTouch);
      };
    } else {
      document.documentElement.classList.remove("drawerActive");
      document.body.classList.remove("drawerActive");
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Desktop full-width threshold
      setIsScrolled(currentScrollY > 20);

      // Mobile Smart Hide-on-Scroll Logic (<= 1120px)
      if (currentScrollY <= 60) {
        setIsMobileNavVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 8) {
        // Scrolling down -> hide mobile navbar
        setIsMobileNavVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 8) {
        // Scrolling up -> reveal mobile navbar
        setIsMobileNavVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Domov", href: "#", active: true },
    { label: "Meni", href: "#meni", active: false },
    { label: "Galerija", href: "#galerija", active: false },
    { label: "O nas", href: "#onas", active: false },
    { label: "Pogosta vprašanja", href: "#faq", active: false },
    { label: "Blog", href: "#blog", active: false },
    { label: "Kontakt", href: "#kontakt", active: false },
  ];

  const locationsList = [
    { id: "1" as const, name: "Šeherezada 1", address: "Trubarjeva cesta 31", status: "Odprto", isOpen: true },
    { id: "2" as const, name: "Šeherezada 2", address: "Dunajska cesta 106", status: "Zaprto", isOpen: false },
  ];

  const languagesList = [
    { code: "SLO" as const, name: "Slovenščina" },
    { code: "ENG" as const, name: "English" },
    { code: "BHS" as const, name: "Bos / Hrv / Srp" },
  ];

  const currentLocObj = locationsList.find((l) => l.id === selectedLocation) || locationsList[0];
  const currentLangObj = languagesList.find((l) => l.code === selectedLang) || languagesList[0];

  return (
    <div className={styles.heroWrapper}>
      {/* Background Soft Glow */}
      <div className={styles.bgGraphics}>
        <div className={styles.leftSoftGlow} />
      </div>

      {/* Floating Island at Top (Desktop) / Smart Sticky Hide-on-Scroll (Mobile <= 1120px) */}
      <div
        className={`${styles.navbarStickyWrapper} ${
          isScrolled ? styles.navbarStickyWrapperScrolled : ""
        } ${!isMobileNavVisible ? styles.mobileNavHidden : styles.mobileNavVisible}`}
      >
        <header className={`${styles.navbarIsland} ${isScrolled ? styles.navbarFullWidth : ""}`}>
          <div className={styles.navbarInnerContainer}>
            {/* Brand Logo */}
            <a href="#" className={styles.logoArea}>
              <div className={styles.logoIcon}>Š</div>
              <span className={styles.logoText}>
                Šeherezada<span className={styles.logoAccent}>.</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav>
              <ul className={styles.navLinks}>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Action Utilities (Interactive Location & Language Dropdowns) */}
            <div className={styles.navActions} ref={desktopNavActionsRef}>
              {/* 1. Location Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDesktopLocOpen(!isDesktopLocOpen);
                  setIsDesktopLangOpen(false);
                }}
                className={`${styles.locationPillBtn} ${isDesktopLocOpen ? styles.locationPillBtnActive : ""}`}
                aria-expanded={isDesktopLocOpen}
              >
                <PinSvg size={15} />
                <span>{currentLocObj.name}</span>
                <span style={{ fontSize: "0.72rem", opacity: 0.6 }}>▾</span>
              </button>

              {/* 2. Language Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDesktopLangOpen(!isDesktopLangOpen);
                  setIsDesktopLocOpen(false);
                }}
                className={`${styles.langPillBtn} ${isDesktopLangOpen ? styles.langPillBtnActive : ""}`}
                aria-label="Izbira jezika"
                aria-expanded={isDesktopLangOpen}
              >
                <span style={{ fontWeight: 800 }}>{currentLangObj.code}</span>
                <span style={{ fontSize: "0.72rem", opacity: 0.6 }}>▾</span>
              </button>

              {/* Location Dropdown - Exact width across both buttons */}
              {isDesktopLocOpen && (
                <div className={styles.desktopDropdownMenu}>
                  {locationsList.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc.id);
                        setIsDesktopLocOpen(false);
                      }}
                      className={`${styles.dropdownOptionItem} ${
                        selectedLocation === loc.id ? styles.dropdownOptionItemActive : ""
                      }`}
                    >
                      <div className={styles.dropdownItemMeta}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span>📍 {loc.name}</span>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              color: loc.isOpen ? "#059669" : "#dc2626",
                              background: loc.isOpen ? "#ecfdf5" : "#fef2f2",
                              padding: "1px 6px",
                              borderRadius: "6px",
                            }}
                          >
                            {loc.status}
                          </span>
                        </span>
                        <span className={styles.dropdownItemSub}>{loc.address}</span>
                      </div>
                      {selectedLocation === loc.id && <span className={styles.dropdownItemCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Language Dropdown - Exact width across both buttons */}
              {isDesktopLangOpen && (
                <div className={`${styles.desktopDropdownMenu} ${styles.langDesktopDropdown}`}>
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setIsDesktopLangOpen(false);
                      }}
                      className={`${styles.dropdownOptionItem} ${
                        selectedLang === lang.code ? styles.dropdownOptionItemActive : ""
                      }`}
                    >
                      <div className={styles.dropdownItemMeta}>
                        <span style={{ fontWeight: 800, color: "#1c1917" }}>{lang.code}</span>
                        <span className={styles.dropdownItemSub}>{lang.name}</span>
                      </div>
                      {selectedLang === lang.code && <span className={styles.dropdownItemCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={styles.hamburgerBtn}
              aria-label="Odpri navigacijski meni"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer Navigation & Backdrop Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ""}`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsDrawerLocOpen(false);
          setIsDrawerLangOpen(false);
        }}
      />

      {/* ====================================================================
          SIDE DRAWER (EDITORIAL BOUTIQUE LUXURY RESTAURANT STYLE)
          ==================================================================== */}
      <aside className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ""}`}>
        {/* Top Content Area */}
        <div>
          {/* Header */}
          <div className={styles.editorialHeader}>
            <a href="#" className={styles.logoArea} onClick={() => setIsMobileMenuOpen(false)}>
              <div className={styles.logoIcon}>Š</div>
              <span className={styles.logoText}>
                Šeherezada<span className={styles.logoAccent}>.</span>
              </span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDrawerLocOpen(false);
                setIsDrawerLangOpen(false);
              }}
              className={styles.closeDrawerBtn}
              aria-label="Zapri meni"
            >
              ✕
            </button>
          </div>

          {/* Numbered Editorial Navigation List */}
          <ul className={styles.editorialNavList}>
            {navItems.map((item, idx) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`${styles.editorialNavItem} ${item.active ? styles.editorialNavItemActive : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.editorialNavTitle}>{item.label}</span>
                  <span className={styles.editorialNavNum}>0{idx + 1} ➔</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Drawer Section (100% Width Mint Status Card + Divider + Buttons) */}
        <div className={styles.drawerBottomSection}>
          {/* 100% Width Mint Live Status Card (Single Horizontal Row) */}
          <div className={styles.drawerStatusFullCard}>
            <div className={styles.drawerStatusLeft}>
              <span className={styles.statusOpenDotWrapper}>
                <span className={styles.statusOpenDotPing} />
                <span className={styles.statusOpenDot} />
              </span>
              <span className={styles.drawerStatusTitle}>Odprto zdaj</span>
            </div>
            <span className={styles.drawerStatusTime}>09:00 – 05:00</span>
          </div>

          {/* Editorial Footer: Location Selector & Language Selector Utility Buttons */}
          <div className={styles.editorialFooter}>
            {/* Popover 1: Mobile Drawer Location Picker (Opens Upwards) */}
            {isDrawerLocOpen && (
              <div className={styles.drawerDropdownMenu}>
                {locationsList.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc.id);
                      setIsDrawerLocOpen(false);
                    }}
                    className={`${styles.dropdownOptionItem} ${
                      selectedLocation === loc.id ? styles.dropdownOptionItemActive : ""
                    }`}
                  >
                    <div className={styles.dropdownItemMeta}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span>📍 {loc.name}</span>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            color: loc.isOpen ? "#059669" : "#dc2626",
                            background: loc.isOpen ? "#ecfdf5" : "#fef2f2",
                            padding: "1px 6px",
                            borderRadius: "6px",
                          }}
                        >
                          {loc.status}
                        </span>
                      </span>
                      <span className={styles.dropdownItemSub}>{loc.address}</span>
                    </div>
                    {selectedLocation === loc.id && <span className={styles.dropdownItemCheck}>✓</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Popover 2: Mobile Drawer Language Picker (Opens Upwards) */}
            {isDrawerLangOpen && (
              <div className={styles.drawerDropdownMenu}>
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsDrawerLangOpen(false);
                    }}
                    className={`${styles.dropdownOptionItem} ${
                      selectedLang === lang.code ? styles.dropdownOptionItemActive : ""
                    }`}
                  >
                    <div className={styles.dropdownItemMeta}>
                      <span style={{ fontWeight: 800, color: "#1c1917" }}>{lang.code}</span>
                      <span className={styles.dropdownItemSub}>{lang.name}</span>
                    </div>
                    {selectedLang === lang.code && <span className={styles.dropdownItemCheck}>✓</span>}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.drawerActionsGrid}>
              {/* Location Selector Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDrawerLocOpen(!isDrawerLocOpen);
                  setIsDrawerLangOpen(false);
                }}
                className={`${styles.drawerLocationBtn} ${isDrawerLocOpen ? styles.drawerBtnActive : ""}`}
              >
                <PinSvg size={18} className={styles.drawerActionIcon} />
                <div className={styles.drawerActionTextCol}>
                  <span className={styles.drawerActionLabel}>Lokal</span>
                  <span className={styles.drawerActionValue}>{currentLocObj.name}</span>
                </div>
                <span className={styles.drawerActionArrow}>{isDrawerLocOpen ? "▴" : "▾"}</span>
              </button>

              {/* Language Selector Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDrawerLangOpen(!isDrawerLangOpen);
                  setIsDrawerLocOpen(false);
                }}
                className={`${styles.drawerLangBtn} ${isDrawerLangOpen ? styles.drawerBtnActive : ""}`}
                aria-label="Izbira jezika"
              >
                <span className={styles.drawerActionIcon} style={{ fontSize: "0.92rem", fontWeight: 800 }}>文A</span>
                <div className={styles.drawerActionTextCol}>
                  <span className={styles.drawerActionLabel}>Jezik</span>
                  <span className={styles.drawerActionValue}>{currentLangObj.code}</span>
                </div>
                <span className={styles.drawerActionArrow}>{isDrawerLangOpen ? "▴" : "▾"}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Hero Content Grid */}
      <main className={styles.heroContent}>
        {/* Left Column: Text & Locations */}
        <div className={styles.leftCol}>
          <div className={styles.dotGridLeft} />

          {/* 1. Main Title */}
          <h1 className={styles.mainTitle}>Šeherezada</h1>

          {/* 2. Subtitle Tagline */}
          <div className={styles.outlinedSubtitle}>Kebab · Pizza · Falafel</div>

          {/* 3. Description */}
          <p className={styles.description}>
            Doživi avtentične turške okuse, sočno meso pečeno na pravem ognju in
            domač kruh, pripravljen po tajnem receptu.
          </p>

          {/* 4. Google Reviews Rating Card */}
          <div className={styles.reviewsBadge}>
            <div className={styles.redStars}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className={styles.ratingScore}>4.5</span>
            <span className={styles.ratingCount}>(1.914+ Google ocen)</span>
          </div>

          {/* 5. Action Buttons */}
          <div className={styles.ctaRow}>
            <a href="#meni" className={styles.primaryMenuBtn}>
              <UtensilsSvg size={19} />
              <span>Prikaži Meni</span>
              <ArrowRightSvg size={16} />
            </a>
            <a href="tel:+38669444812" className={styles.phoneBtn}>
              <PhoneSvg size={17} className={styles.phoneRedIcon} />
              <span>+386 69 444 812</span>
            </a>
          </div>

          {/* 6. 2 Location Cards with Live Pulsing Indicator */}
          <div className={styles.locationCardsRow}>
            {/* Location 1 (Odprto) */}
            <div
              className={styles.locationCard}
              style={{
                borderColor: selectedLocation === "1" ? "#ea580c" : "#f2ede4",
                boxShadow: selectedLocation === "1" ? "0 8px 24px rgba(234, 88, 12, 0.14)" : undefined,
              }}
            >
              <div className={styles.locationTitle}>
                <PinSvg size={16} />
                <span>Šeherezada 1</span>
              </div>

              <div className={styles.locationAddress}>
                Trubarjeva cesta 31, Ljubljana
              </div>

              <div className={styles.statusOpenBadge}>
                <span className={styles.statusOpenDotWrapper}>
                  <span className={styles.statusOpenDotPing} />
                  <span className={styles.statusOpenDot} />
                </span>
                <span>Odprto</span>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Trubarjeva+cesta+31%2C+Ljubljana"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navodilaLink}
              >
                <span>Navodila</span>
                <span>&rarr;</span>
              </a>
            </div>

            {/* Location 2 (Zaprto) */}
            <div
              className={styles.locationCard}
              style={{
                borderColor: selectedLocation === "2" ? "#ea580c" : "#f2ede4",
                boxShadow: selectedLocation === "2" ? "0 8px 24px rgba(234, 88, 12, 0.14)" : undefined,
              }}
            >
              <div className={styles.locationTitle}>
                <PinSvg size={16} />
                <span>Šeherezada 2</span>
              </div>

              <div className={styles.locationAddress}>
                Dunajska cesta 106, Ljubljana
              </div>

              <div className={styles.statusClosedBadge}>
                <span className={styles.statusClosedDot} />
                <span>Zaprto</span>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Dunajska+cesta+106%2C+Ljubljana"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navodilaLink}
              >
                <span>Navodila</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Food Showcase with Tri-Layered Balanced Organic Blobs */}
        <div className={styles.rightCol}>
          {/* Layer 1: Top-Left Soft Warm Pastel Shape */}
          <div className={styles.heroPlateBlobTopLeft} />

          {/* Layer 2: Main Rich Orange Organic Blob (Center) */}
          <div className={styles.heroPlateBlob} />

          {/* Layer 3: Bottom-Right Soft Warm Pastel Shape */}
          <div className={styles.heroPlateBlobSecondary} />

          <div className={styles.dotGridRight} />

          <div className={styles.plateWrapper}>
            <div className={styles.plateAura} />
            <Image
              src="/images/doner-kebab.jpg"
              alt="Šeherezada Pravi Turški Döner Kebab"
              width={480}
              height={480}
              priority
              className={styles.mainPlateImage}
            />

            {/* Floating Badge 1: Halal Meso - 100% Sveže */}
            <div className={styles.floatingBadgeHalal}>
              <div className={styles.badgeHalalIcon}>✓</div>
              <div>
                <div className={styles.floatingBadgeHalalTitle}>Halal Meso</div>
                <div className={styles.floatingBadgeHalalSub}>100% Sveže</div>
              </div>
            </div>

            {/* Floating Badge 2: PREMIUM - Ljubljana #1 */}
            <div className={styles.floatingBadgePremium}>
              <div className={styles.trophyCircle}>
                <TrophySvg size={18} />
              </div>
              <span className={styles.premiumGoldTag}>PREMIUM</span>
              <div className={styles.floatingBadgePremiumTitle}>
                Ljubljana #1
              </div>
              <div className={styles.floatingBadgePremiumSub}>
                Najboljši Kebab &amp; Okusi
              </div>
            </div>

            {/* Floating Badge 3: Domač kruh po tajnem receptu */}
            <div className={styles.floatingBadgeRecipe}>
              <span>✓</span>
              <span>Domač kruh po tajnem receptu</span>
            </div>

            {/* Floating decorative leaf & chili accents */}
            <span className={styles.leaf1}>🌿</span>
            <span className={styles.chili1}>🌶️</span>
            <span className={styles.chili2}>🌶️</span>
          </div>
        </div>
      </main>
    </div>
  );
}
