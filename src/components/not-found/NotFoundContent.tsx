"use client";

import React from "react";
import Link from "next/link";
import styles from "./NotFoundContent.module.css";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v18" />
    <path d="M6 2v20" />
    <path d="M9 2v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function NotFoundContent() {
  return (
    <section className={styles.notFoundSection}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Editorial Chapter Watermark Header */}
        <div className={styles.chapterTagContainer}>
          <span className={styles.tagGhostWatermark}>404</span>
          <div className={styles.chapterIndexTag}>
            <span className={styles.chapterDash} />
            <span>NAPAKA 404 · STRAN NE OBSTAJA</span>
            <span className={styles.chapterDash} />
          </div>
        </div>

        {/* Visual Pill */}
        <div className={styles.visual404Badge}>
          <span>🔍 Izgubljeni na meniju?</span>
        </div>

        {/* Solid Charcoal Title */}
        <h1 className={styles.title}>Ups! Ta stran je izginila z našega menija</h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Povezava, ki ste ji sledili, ne obstaja ali pa je bila premaknjena.
          Brez skrbi — sveže pečen döner kebab, hrustljavi falafli in tople pizze
          vas še vedno čakajo na naših lokacijah!
        </p>

        {/* Action Buttons */}
        <div className={styles.actionsRow}>
          <Link href="/" className={styles.btnPrimary}>
            <HomeIcon />
            <span>Nazaj na prvo stran</span>
          </Link>
          <Link href="/meni" className={styles.btnSecondary}>
            <span>Oglej si celoten meni</span>
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Shortcuts Bento Grid */}
        <div className={styles.shortcutsSection}>
          <p className={styles.shortcutsHeader}>Morda ste iskali eno od teh strani:</p>

          <div className={styles.shortcutsGrid}>
            {/* Card 1: Meni */}
            <Link href="/meni" className={styles.shortcutCard}>
              <div className={styles.shortcutIconRow}>
                <div className={styles.shortcutIconBox}>
                  <UtensilsIcon />
                </div>
                <span className={styles.shortcutArrow}>
                  <ArrowRightIcon />
                </span>
              </div>
              <h3 className={styles.shortcutCardTitle}>Celoten meni</h3>
              <p className={styles.shortcutCardDesc}>
                29 svežih jedi: döner kebab, jufke, pizze, burgerji in falafli.
              </p>
            </Link>

            {/* Card 2: Boni */}
            <Link href="/studentski-boni" className={styles.shortcutCard}>
              <div className={styles.shortcutIconRow}>
                <div className={styles.shortcutIconBox}>
                  <GraduationCapIcon />
                </div>
                <span className={styles.shortcutArrow}>
                  <ArrowRightIcon />
                </span>
              </div>
              <h3 className={styles.shortcutCardTitle}>Študentski boni</h3>
              <p className={styles.shortcutCardDesc}>
                19 jedi na bon z enotnim doplačilom 3,00 € in prilogami.
              </p>
            </Link>

            {/* Card 3: Halal */}
            <Link href="/halal" className={styles.shortcutCard}>
              <div className={styles.shortcutIconRow}>
                <div className={styles.shortcutIconBox}>
                  <ShieldCheckIcon />
                </div>
                <span className={styles.shortcutArrow}>
                  <ArrowRightIcon />
                </span>
              </div>
              <h3 className={styles.shortcutCardTitle}>100 % Halal certifikat</h3>
              <p className={styles.shortcutCardDesc}>
                Strogi standardi čistosti, brez svinjine in alkohola od leta 1998.
              </p>
            </Link>

            {/* Card 4: Lokaciji */}
            <Link href="/kontakt" className={styles.shortcutCard}>
              <div className={styles.shortcutIconRow}>
                <div className={styles.shortcutIconBox}>
                  <MapPinIcon />
                </div>
                <span className={styles.shortcutArrow}>
                  <ArrowRightIcon />
                </span>
              </div>
              <h3 className={styles.shortcutCardTitle}>Lokaciji &amp; Kontakt</h3>
              <p className={styles.shortcutCardDesc}>
                Trubarjeva 31 in Slovenska 55. Odprto vsak dan do poznih ur.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
