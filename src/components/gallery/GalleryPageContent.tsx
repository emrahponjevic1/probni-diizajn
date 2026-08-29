"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import styles from "./GalleryPageContent.module.css";
import { useGalleryContent, GalleryItem } from "./GalleryData";

// Clean Vector Icons
const SparklesIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ZoomIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function GalleryPageContent() {
  // Besedila so v messages/<jezik>.json pod ključema "galerijaStran" in "galerijaPodatki".
  const t = useTranslations("galerijaStran");
  const { items: GALLERY_ITEMS } = useGalleryContent();

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // IntersectionObserver for the Waterfall in-focus focus highlight (.inbound)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Element is in focus when it is largely visible in the viewport
          const isInbound = entry.isIntersecting && entry.intersectionRatio >= 0.7;
          entry.target.classList.toggle(styles.itemInbound, isInbound);
        });
      },
      {
        root: null,
        threshold: [0, 0.35, 0.7, 0.9, 1],
      }
    );

    observerRef.current = observer;

    const currentGrid = gridContainerRef.current;
    if (currentGrid) {
      const items = currentGrid.querySelectorAll(`.${styles.item}`);
      items.forEach((item) => observer.observe(item));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Lightbox keyboard navigation and scroll locking
  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_ITEMS.length;
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (activeLightboxIndex !== null) {
      document.body.classList.add("modalActive");
      document.documentElement.classList.add("modalActive");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("modalActive");
      document.documentElement.classList.remove("modalActive");
    }

    return () => {
      document.body.classList.remove("modalActive");
      document.documentElement.classList.remove("modalActive");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLightboxIndex, closeLightbox, showNext, showPrev]);

  // Helper for row span classes (3n+1 -> span 4, 3n+2 -> span 5, 3n+3 -> span 6)
  const getSpanClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) return styles.itemSpan1; // 200px
    if (mod === 1) return styles.itemSpan2; // 250px
    return styles.itemSpan3; // 300px
  };

  // Active item in lightbox
  const currentLightboxItem: GalleryItem | null =
    activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <section className={styles.gallerySection}>
      <div className={styles.bgGlow} />

      {/* Strict Universal Container: max-width: 1360px, margin: 0 auto, width: 100% */}
      <div className={styles.galleryContainer}>
        {/* Gallery Header (Watermark, Chapter Tag, Title, Subtitle, Cool Divider) */}
        <header className={styles.galleryHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>{t("oznaka")}</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.heroTitle}>{t("naslov")}</h1>

          <p className={styles.heroSubtitle}>{t("podnaslov")}</p>

          {/* Cool Luxury Divider */}
          <div className={styles.coolDividerContainer}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerBadge}>
              <span className={styles.dividerDot} />
              <span>{t("utrinki")}</span>
              <span className={styles.dividerCountPill}>{GALLERY_ITEMS.length}</span>
            </div>
            <div className={styles.dividerLineRight} />
          </div>
        </header>

        {/* Waterfall Grid Main Content - All Photos in Seamless Flow */}
        <div
          ref={gridContainerRef}
          className={styles.waterfallGrid}
          id="waterfall-grid"
        >
          {GALLERY_ITEMS.map((item, index) => {
            const spanClass = getSpanClass(index);
            return (
              <div
                key={item.id}
                className={`${styles.item} ${spanClass}`}
                onClick={() => setActiveLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                aria-label={`Odpri sliko: ${item.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className={styles.itemImage}
                  loading="lazy"
                />

                {/* Subtle Hover/Focus Overlay */}
                <div className={styles.itemOverlay}>
                  <span className={styles.itemOverlayTitle}>{item.title}</span>
                </div>

                <div className={styles.itemOverlayZoomHint} aria-hidden="true">
                  <ZoomIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div
          className={styles.lightboxBackdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title}
        >
          <div
            className={styles.lightboxCard}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className={styles.lightboxCloseBtn}
              aria-label={t("zapriGalerijo")}
            >
              <CloseIcon />
            </button>

            {/* Navigation Arrows */}
            {GALLERY_ITEMS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className={`${styles.lightboxNavBtn} ${styles.lightboxNavPrev}`}
                  aria-label={t("prejsnjaSlika")}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className={`${styles.lightboxNavBtn} ${styles.lightboxNavNext}`}
                  aria-label={t("naslednjaSlika")}
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            {/* Image Box */}
            <div className={styles.lightboxImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentLightboxItem.src}
                alt={currentLightboxItem.title}
                className={styles.lightboxImage}
              />
            </div>

            {/* Lightbox Footer Info */}
            <div className={styles.lightboxFooter}>
              <span className={styles.lightboxCaption}>
                {currentLightboxItem.title}
              </span>
              <span className={styles.lightboxCategoryTag}>
                {activeLightboxIndex !== null ? `${activeLightboxIndex + 1} / ${GALLERY_ITEMS.length}` : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
