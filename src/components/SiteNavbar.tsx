"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./SiteNavbar.module.css";
import { LOCATIONS } from "@/data/locations";

// Clean Vector SVG Icons
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

interface SiteNavbarProps {
  activeRoute?: "home" | "meni" | "galerija" | "o-nas" | "faq" | "zaposlitev" | "blog" | "kontakt";
}

export default function SiteNavbar({ activeRoute = "home" }: SiteNavbarProps) {
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

  // Lock body & html scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("drawerActive");
      document.body.classList.add("drawerActive");

      const preventTouch = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
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
      if (
        typeof document !== "undefined" &&
        (document.documentElement.classList.contains("modalActive") ||
          document.body.classList.contains("modalActive"))
      ) {
        return;
      }

      const currentScrollY = window.scrollY;

      // Desktop full-width threshold
      setIsScrolled(currentScrollY > 20);

      // Mobile Smart Hide-on-Scroll Logic (<= 1220px)
      if (currentScrollY <= 60) {
        setIsMobileNavVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 8) {
        setIsMobileNavVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 8) {
        setIsMobileNavVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Domov", href: "/", active: activeRoute === "home" },
    { label: "Meni", href: "/meni", active: activeRoute === "meni" },
    { label: "Galerija", href: "/galerija", active: activeRoute === "galerija" },
    { label: "O nas", href: "/o-nas", active: activeRoute === "o-nas" },
    { label: "Pogosta vprašanja", href: "/faq", active: activeRoute === "faq" },
    { label: "Zaposlitev", href: "/zaposlitev", active: activeRoute === "zaposlitev" },
    { label: "Blog", href: "/blog", active: activeRoute === "blog" },
    { label: "Kontakt", href: "/kontakt", active: activeRoute === "kontakt" },
  ];

  // Poslovalnice beremo iz src/data/locations.ts — prej je bil tu drug seznam,
  // ki se je lahko razhajal s tistim v nogi in na strani Kontakt.
  const locationsList = LOCATIONS.map((l, i) => ({
    id: String(i + 1) as "1" | "2",
    name: l.name,
    address: l.street,
    status: "Odprto",
    isOpen: true,
  }));

  const languagesList = [
    { code: "SLO" as const, name: "Slovenščina" },
    { code: "ENG" as const, name: "English" },
    { code: "BHS" as const, name: "Bos / Hrv / Srp" },
  ];

  const currentLocObj = locationsList.find((l) => l.id === selectedLocation) || locationsList[0];
  const currentLangObj = languagesList.find((l) => l.code === selectedLang) || languagesList[0];

  return (
    <>
      {/* Floating Island at Top (Desktop) / Smart Sticky Hide-on-Scroll (Mobile <= 1220px) */}
      <div
        className={`${styles.navbarStickyWrapper} ${
          isScrolled ? styles.navbarStickyWrapperScrolled : ""
        } ${!isMobileNavVisible ? styles.mobileNavHidden : styles.mobileNavVisible}`}
      >
        <header className={`${styles.navbarIsland} ${isScrolled ? styles.navbarFullWidth : ""}`}>
          <div className={styles.navbarInnerContainer}>
            {/* Brand Logo */}
            <Link href="/" className={styles.logoArea}>
              <div className={styles.logoIcon}>Š</div>
              <span className={styles.logoText}>
                Šeherezada<span className={styles.logoAccent}>.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav>
              <ul className={styles.navLinks}>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Action Utilities */}
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

              {/* Location Dropdown */}
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

              {/* Language Dropdown */}
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

      {/* Mobile Side Drawer */}
      <aside className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ""}`}>
        <div>
          {/* Header */}
          <div className={styles.editorialHeader}>
            <Link href="/" className={styles.logoArea} onClick={() => setIsMobileMenuOpen(false)}>
              <div className={styles.logoIcon}>Š</div>
              <span className={styles.logoText}>
                Šeherezada<span className={styles.logoAccent}>.</span>
              </span>
            </Link>
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
                <Link
                  href={item.href}
                  className={`${styles.editorialNavItem} ${item.active ? styles.editorialNavItemActive : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.editorialNavTitle}>{item.label}</span>
                  <span className={styles.editorialNavNum}>0{idx + 1} ➔</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Drawer Section */}
        <div className={styles.drawerBottomSection}>
          <div className={styles.drawerStatusFullCard}>
            <div className={styles.drawerStatusLeft}>
              <span className={styles.statusOpenDotWrapper}>
                <span className={styles.statusOpenDotPing} />
                <span className={styles.statusOpenDot} />
              </span>
              <span className={styles.drawerStatusTitle}>Odprto zdaj</span>
            </div>
            <span className={styles.drawerStatusTime}>
              {selectedLocation === "2" ? "08:00 – 01:00" : "09:00 – 02:00"}
            </span>
          </div>

          {/* Drawer Footer Utilities */}
          <div className={styles.editorialFooter}>
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
    </>
  );
}
