"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SeherezadaHero.module.css";
import { LOCATIONS, PHONE } from "@/data/locations";

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
  // Navigacija je skupna komponenta <SiteNavbar />, vkljucena v app/page.tsx.
  // Prej je bila tukaj se ena, podvojena kopija — z lastnim stanjem za jezik
  // in lokacijo, ki se je lahko razhajalo s tistim v navigaciji.

  /** Katera poslovalnica je poudarjena med karticama pod naslovom. */
  const [selectedLocation] = useState<"1" | "2">("1");

  return (
    <div className={styles.heroWrapper}>
      {/* Background Soft Glow */}
      <div className={styles.bgGraphics}>
        <div className={styles.leftSoftGlow} />
      </div>


      {/* Main Hero Content Grid */}
      <main className={styles.heroContent}>
        {/* Left Column: Text & Locations */}
        <div className={styles.leftCol}>
          <div className={styles.dotGridLeft} />

          {/* 1. Main Title — nosi glavne iskalne pojme, ne blagovne znamke.
              Ime "Šeherezada" je že v navbaru, <title> tagu in nogi. */}
          <h1 className={styles.mainTitle}>Kebab, pizza in falafel v središču Ljubljane</h1>

          {/* 2. Slogan pod naslovom — namenoma <p>, ne <h2>.
              Ne uvaja nobenega razdelka, zato ne sme biti naslov: sicer bi se v
              strukturi dokumenta postavil ob bok pravim razdelkom (Priljubljene
              izbire, Naša zgodba …) in zavajal bralnike zaslona.
              Ključna beseda "študentski boni" dobi svoj H2 nižje, v razdelku o bonih. */}
          <p className={styles.outlinedSubtitle}>
            Študentski&nbsp;boni&nbsp;· odprto&nbsp;pozno
          </p>

          {/* 3. Description */}
          <p className={styles.description}>
            100 % sveže pečeno halal meso in hrustljav domač falafel.
            Najdete nas na Trubarjevi 31 in Slovenski 55.
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
            <span className={styles.ratingScore}>4,5</span>
            <span className={styles.ratingCount}>(1.972 Google ocen)</span>
          </div>

          {/* 5. Action Buttons */}
          <div className={styles.ctaRow}>
            <Link href="/meni" className={styles.primaryMenuBtn}>
              <UtensilsSvg size={19} />
              <span>Poglej meni in cene</span>
              <ArrowRightSvg size={16} />
            </Link>
            <a href={`tel:${PHONE.restaurant.e164}`} className={styles.phoneBtn}>
              <PhoneSvg size={17} className={styles.phoneRedIcon} />
              <span>{PHONE.restaurant.display}</span>
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
                <span>{LOCATIONS[0].name}</span>
              </div>

              <div className={styles.locationAddress}>
                {LOCATIONS[0].fullAddress}
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

            {/* Location 2 */}
            <div
              className={styles.locationCard}
              style={{
                borderColor: selectedLocation === "2" ? "#ea580c" : "#f2ede4",
                boxShadow: selectedLocation === "2" ? "0 8px 24px rgba(234, 88, 12, 0.14)" : undefined,
              }}
            >
              <div className={styles.locationTitle}>
                <PinSvg size={16} />
                <span>{LOCATIONS[1].name}</span>
              </div>

              <div className={styles.locationAddress}>
                {LOCATIONS[1].fullAddress}
              </div>

              <div className={styles.statusOpenBadge}>
                <span className={styles.statusOpenDotWrapper}>
                  <span className={styles.statusOpenDotPing} />
                  <span className={styles.statusOpenDot} />
                </span>
                <span>Odprto</span>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Slovenska+cesta+55%2C+Ljubljana"
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

            {/* Floating Badge 2: preverljivo dejstvo namesto nedokazljivega superlativa.
                "Ljubljana #1 / Najboljši kebab" je odstranjeno — nedokazljive trditve
                so po ZVPot in direktivi EU o nepoštenih praksah zavajajoče oglaševanje. */}
            <div className={styles.floatingBadgePremium}>
              <div className={styles.trophyCircle}>
                <TrophySvg size={18} />
              </div>
              <span className={styles.premiumGoldTag}>OD 1998</span>
              <div className={styles.floatingBadgePremiumTitle}>
                Dve lokaciji
              </div>
              <div className={styles.floatingBadgePremiumSub}>
                Trubarjeva &amp; Slovenska
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
