"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AboutPageContent.module.css";
import { initials } from "@/data/reviews";
import {
  HERO_MICRO_ITEMS,
  STATS_BANNER_ITEMS,
  FLOATING_PHILOSOPHY_CARDS,
  PROCESS_STEPS,
  TESTIMONIALS,
  LOCATIONS_PROFILES,
  TICKER_ITEMS,
} from "./AboutData";

// Clean Vector SVG Icons
const FlameSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const BreadSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="11" rx="9" ry="6" />
    <path d="M7 8.5c1-1 2-1 3 0" />
    <path d="M14 8.5c1-1 2-1 3 0" />
    <path d="M5 14v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2" />
  </svg>
);

const ShieldSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const PinSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneSvg = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StudentSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const MoonSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const ArrowRightSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function AboutPageContent() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const getMicroIcon = (type: string) => {
    switch (type) {
      case "spice":
        return <FlameSvg size={18} />;
      case "bread":
        return <BreadSvg size={18} />;
      case "halal":
        return <ShieldSvg size={18} />;
      case "pin":
        return <PinSvg size={18} />;
      default:
        return <FlameSvg size={18} />;
    }
  };

  const getStatsIcon = (type: string) => {
    switch (type) {
      case "calendar":
        return <CalendarSvg size={22} />;
      case "flame":
        return <FlameSvg size={22} />;
      case "shield":
        return <ShieldSvg size={22} />;
      case "clock":
        return <ClockSvg size={22} />;
      default:
        return <FlameSvg size={22} />;
    }
  };

  const getPhilosophyIcon = (type: string) => {
    switch (type) {
      case "flame":
        return <FlameSvg size={22} />;
      case "bread":
        return <BreadSvg size={22} />;
      case "student":
        return <StudentSvg size={22} />;
      case "moon":
        return <MoonSvg size={22} />;
      default:
        return <FlameSvg size={22} />;
    }
  };

  const currentTestimonial = TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className={styles.aboutMainWrapper}>
      {/* ==========================================================================
          SECTION 1: HERO & ASYMMETRICAL MULTI-IMAGE COMPOSITION
          (Top-Level Section under Navbar: padding 7rem 2rem 5.5rem)
          ========================================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.bgGlowLayer} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Column: Asymmetrical Multi-Shape Photo Composition */}
            <div className={styles.heroVisualComposition}>
              {/* Main Arch Pill Photo */}
              <div className={styles.archMainCard}>
                <Image
                  src="/images/about-chef-lamps.jpg"
                  alt="Šeherezada mojster žara pri pripravi svežega mesa"
                  width={300}
                  height={480}
                  className={styles.archImg}
                  priority
                />
              </div>

              {/* Floating Top-Left Chef Plating Circle */}
              <div className={styles.floatChefCircle}>
                <Image
                  src="/images/about-chef-plating.jpg"
                  alt="Mojster pri dekoraciji krožnika"
                  width={180}
                  height={180}
                  className={styles.circleImg}
                  priority
                />
              </div>

              {/* Floating Bottom-Left Fresh Dish Squircle */}
              <div className={styles.floatDishSquircle}>
                <Image
                  src="/images/about-dish-orange.jpg"
                  alt="Sveže pripravljena orientalska jed Šeherezada"
                  width={160}
                  height={160}
                  className={styles.squircleImg}
                />
              </div>

              {/* Floating 1998 Heritage Badge */}
              <div className={styles.heroHeritageBadge}>
                <span className={styles.heritageBadgeIcon}>🔥</span>
                <div className={styles.heritageBadgeTextCol}>
                  <span className={styles.heritageBadgeNum}>1998</span>
                  <span className={styles.heritageBadgeLabel}>Dediščina Ljubljane</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Storytelling & Open Minimalist Features */}
            <div className={styles.heroContentCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>ZGODBA</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>01</span> / O RESTAVRACIJI ŠEHEREZADA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.sectionTitle}>
                Halal kebab in žar v Ljubljani —{" "}
                <span className={styles.sectionTitleAccent}>od leta 1998.</span>
              </h1>

              <p className={styles.sectionSubtitle}>
                Že od leta 1998 na Trubarjevi in Slovenski ohranjamo spoštovanje do pravega žara,
                24-urne marinade ter vsak dan sveže zamešanega testa. Brez industrijskih
                bližnjic, zmeraj z istim spoštovanjem do gosta.
              </p>

              {/* Open Minimalist Feature Rows */}
              <div className={styles.heroFeatureList}>
                {HERO_MICRO_ITEMS.map((item) => (
                  <div key={item.id} className={styles.heroFeatureItem}>
                    <div className={styles.heroFeatureIcon}>
                      {getMicroIcon(item.iconType)}
                    </div>
                    <div className={styles.heroFeatureText}>
                      <span className={styles.heroFeatureTitle}>{item.title}</span>
                      <p className={styles.heroFeatureDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.heroActionRow}>
                <a href="/meni" className={styles.btnPrimaryOrange}>
                  <span>Raziščite Meni</span>
                  <ArrowRightSvg size={16} />
                </a>

                <a href="tel:+38669314316" className={styles.phoneOrderPill}>
                  <div className={styles.phonePillIconBox}>
                    <PhoneSvg size={16} />
                  </div>
                  <div className={styles.phonePillTextCol}>
                    <span className={styles.phonePillLabel}>Naročila &amp; Prevzem</span>
                    <span className={styles.phonePillNumber}>+386 69 314 316</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: STATS COUNTER STRIP (OPEN EDITORIAL STRIP - NO BOXED CARD)
          (Padding: 5rem 2rem 5.5rem, border-top: 1px solid #f2ede4)
          ========================================================================== */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS_BANNER_ITEMS.map((stat, idx) => (
              <div key={idx} className={styles.statItemBox}>
                <div className={styles.statIconBox}>
                  {getStatsIcon(stat.iconType)}
                </div>
                <span className={styles.statBigNumber}>{stat.value}</span>
                <span className={styles.statItemLabel}>{stat.label}</span>
                <span className={styles.statItemSub}>{stat.subtext}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: PHILOSOPHY & 4 STEBRI OBRTI (OPEN MAGAZINE STORYBOARD)
          (Padding: 5rem 2rem 5.5rem, border-top: 1px solid #f2ede4)
          ========================================================================== */}
      <section className={styles.philosophySection}>
        <div className={styles.container}>
          <div className={styles.philosophyGrid}>
            {/* Left Column: Philosophy & Checks */}
            <div className={styles.philosophyLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>FILOZOFIJA</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>02</span> / ZAKAJ ŠEHEREZADA
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h2 className={styles.sectionTitle}>
                Zvestoba obrti, ki jo začutite v vsakem grižljaju.
              </h2>

              <p className={styles.sectionSubtitle}>
                V svetu hitre prehrane ostajamo zvesti tradiciji. Naše meso ne pozna industrijskih
                bližnjic, naše lepinje pa vzidejo počasi, natanko tako, kot so jih pekli pred
                desetletji.
              </p>

              <ul className={styles.checkList}>
                <li className={styles.checkListItem}>
                  <span className={styles.checkBullet}>✓</span>
                  <span>100% Halal certificirano telečje in piščančje meso</span>
                </li>
                <li className={styles.checkListItem}>
                  <span className={styles.checkBullet}>✓</span>
                  <span>Dnevno sveže pečene lepinje in tenak lavaš kruh</span>
                </li>
                <li className={styles.checkListItem}>
                  <span className={styles.checkBullet}>✓</span>
                  <span>Študentski boni z ugodnim doplačilom le 3,00 €</span>
                </li>
                <li className={styles.checkListItem}>
                  <span className={styles.checkBullet}>✓</span>
                  <span>Odprto vsak dan pozno v noč v središču mesta</span>
                </li>
              </ul>

              <div>
                <a href="#lokaciji" className={styles.btnPrimaryOrange}>
                  <span>Obiščite Naši Lokaciji</span>
                  <ArrowRightSvg size={16} />
                </a>
              </div>
            </div>

            {/* Right Column: Open 4 Pillars Rows */}
            <div className={styles.pillarsList}>
              {FLOATING_PHILOSOPHY_CARDS.map((card) => (
                <div key={card.id} className={styles.pillarRow}>
                  <div className={styles.pillarNumCol}>
                    <span className={styles.pillarNum}>{card.number}</span>
                    <div className={styles.pillarIcon}>
                      {getPhilosophyIcon(card.iconType)}
                    </div>
                  </div>

                  <div className={styles.pillarContent}>
                    <h3 className={styles.pillarTitle}>{card.title}</h3>
                    <p className={styles.pillarDesc}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: KULINARIČNI PROCES (OPEN TIMELINE SPLIT)
          (Padding: 5rem 2rem 5.5rem, border-top: 1px solid #f2ede4)
          ========================================================================== */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processSplit}>
            {/* Left Steps */}
            <div className={styles.processLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>PROCES</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>03</span> / KULINARIČNI PROCES
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h2 className={styles.sectionTitle}>Kako nastane vsaka jed</h2>

              <div className={styles.processTimelineList}>
                {PROCESS_STEPS.map((step) => (
                  <div key={step.stepNumber} className={styles.timelineStepItem}>
                    <div className={styles.timelineStepBadge}>{step.stepNumber}</div>
                    <div className={styles.timelineTextCol}>
                      <h3 className={styles.timelineStepTitle}>{step.title}</h3>
                      <p className={styles.timelineStepDesc}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Photo */}
            <div className={styles.processVisualWrapper}>
              <Image
                src="/images/student-kitchen.jpg"
                alt="Kuhinjski utrip in priprava sveže hrane v Šeherezadi"
                width={550}
                height={460}
                className={styles.processImg}
              />
              <div className={styles.processLiveBadge}>
                <span className={styles.liveDot} />
                <span className={styles.liveBadgeText}>Sveža priprava ob vsakem naročilu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: TESTIMONIALS (OPEN EDITORIAL SHOWCASE)
          (Padding: 5rem 2rem 5.5rem, border-top: 1px solid #f2ede4)
          ========================================================================== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsSplit}>
            {/* Left: Quote & Switcher */}
            <div className={styles.testimonialLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>MNENJA</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>
                    <span className={styles.chapterNumber}>04</span> / MNENJA GOSTOV
                  </span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <span className={styles.testimonialQuoteMark}>“</span>

              <blockquote className={styles.testimonialQuoteText}>
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className={styles.testimonialAuthorBlock}>
                <span className={styles.authorName}>{currentTestimonial.author}</span>
                <span className={styles.authorRole}>{currentTestimonial.role}</span>
              </div>

              {/* Interactive Avatar Switcher */}
              <div className={styles.avatarSwitcherRow}>
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`${styles.avatarBtn} ${
                      activeTestimonialIdx === idx ? styles.avatarBtnActive : ""
                    }`}
                    aria-label={`Prikaži mnenje: ${t.author}`}
                  >
                    {/* Začetnice namesto naključne fotografije neke osebe s spleta */}
                    <span className={styles.avatarInitials}>{initials(t.author)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Free-Standing Photo of Guests / Food */}
            <div className={styles.testimonialPhotoWrapper}>
              <Image
                src="/images/student-meal.jpg"
                alt="Zadovoljni gostje v restavraciji Šeherezada"
                width={550}
                height={420}
                className={styles.testimonialPhotoImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 6: DUAL LOCATIONS (OPEN EDITORIAL PILLARS)
          (Padding: 5rem 2rem 5.5rem, border-top: 1px solid #f2ede4)
          ========================================================================== */}
      <section className={styles.locationsSection} id="lokaciji">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>LOKACIJI</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>05</span> / OBIŠČITE NAS V LJUBLJANI
                </span>
                <span className={styles.chapterDash} />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Dve lokaciji v središču Ljubljane</h2>
            <p className={styles.sectionSubtitle}>
              Izberite lokacijo, ki vam je najbližje — na bohemski Trubarjevi ali ob
              osrednji Slovenski cesti.
            </p>
          </div>

          <div className={styles.locationsGrid}>
            {LOCATIONS_PROFILES.map((loc) => (
              <article key={loc.id} className={styles.locationPillar}>
                <div>
                  <div className={styles.locationHeaderRow}>
                    <div>
                      <h3 className={styles.locationName}>{loc.name}</h3>
                      <span className={styles.locationSubtitle}>{loc.subtitle}</span>
                    </div>
                  </div>

                  <div className={styles.locationAddressBlock} style={{ marginTop: "1rem", marginBottom: "0.85rem" }}>
                    <PinSvg size={16} />
                    <span>{loc.address}</span>
                  </div>

                  <p className={styles.locationDesc} style={{ marginBottom: "1.25rem" }}>
                    {loc.description}
                  </p>

                  <ul className={styles.locationFeaturesList}>
                    {loc.features.map((feat, fi) => (
                      <li key={fi} className={styles.locationFeatureItem}>
                        <span className={styles.featureDot} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Namesto telefona (ta je v nogi in na strani Kontakt) sta tu
                    obe navigaciji — gost na tem mestu išče pot, ne klica. */}
                <div className={styles.locationActionButtons}>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationBtnPrimary}
                    aria-label={`Odpri ${loc.name} v Google Zemljevidih`}
                  >
                    <PinSvg size={15} />
                    <span>Google Zemljevidi</span>
                  </a>
                  <a
                    href={loc.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationBtnSecondary}
                    aria-label={`Odpri ${loc.name} v Apple Maps`}
                  >
                    <span>Apple Maps ↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 7: MARQUEE TICKER & FINAL INVITATION CTA
          ========================================================================== */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
            <span key={idx} className={styles.marqueeItem}>
              <span>{item}</span>
              <span className={styles.marqueeDot}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.invitationArea}>
            <h2 className={styles.invitationHeading}>
              Pripravljeni na pristen okus s pravega ognja?
            </h2>

            <p className={styles.invitationText}>
              Oglejte si naš celotni meni, raziščite foto utrinke iz kuhinje ali pa se nam
              pridružite v ekipi Šeherezade.
            </p>

            <div className={styles.invitationBtnGroup}>
              <a href="/meni" className={styles.btnPrimaryOrange}>
                <span>Raziščite Celotni Meni</span>
                <ArrowRightSvg size={16} />
              </a>
              <a href="/galerija" className={styles.btnCtaSecondary}>
                <span>Foto Galerija</span>
              </a>
              <a href="/zaposlitev" className={styles.btnCtaSecondary}>
                <span>Postanite Del Ekipe</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
