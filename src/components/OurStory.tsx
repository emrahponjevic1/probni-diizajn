"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./OurStory.module.css";

// Clean Vector SVG Icons (No Emojis)
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

const HalalShieldSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LocationPinSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AwardStarSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function OurStory() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3>(1);

  return (
    <section className={styles.storySection} id="onas">
      <div className={styles.bgGlow} />

      <div className={styles.storyContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnerskih Stilov</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: Editorial Storyboard (Priporočamo)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: Bento Trust Grid
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: 3 Poglavlja Tradicije
            </button>
          </div>
        </div>

        {/* ==================================================================
            OPCIJA 1: EDITORIAL MAGAZINE STORYBOARD (RECOMMENDED)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.magGrid}>
            {/* Left Column: Storytelling & 3 Quality Pillars */}
            <div className={styles.magLeftCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Naša Zgodba &amp; Tradicija</span>
              </div>

              <h2 className={styles.magHeading}>
                Od pravega ognja do popolnega okusa.
              </h2>

              <p className={styles.magLeadText}>
                V restavraciji Šeherezada že več kot dve desetletji ohranjamo
                pristno kulinarično dediščino. Naša skrivnost ni v zapletenosti,
                temveč v potrpežljivosti, izbranih sestavinah in spoštovanju
                tradicionalnih receptur.
              </p>

              <div className={styles.pillarsList}>
                {/* Pillar 1 */}
                <div className={styles.pillarCard}>
                  <div className={styles.pillarIconBox}>
                    <FlameSvg size={22} />
                  </div>
                  <div className={styles.pillarContent}>
                    <h3 className={styles.pillarTitle}>Pravi ogenj &amp; 24h marinada</h3>
                    <p className={styles.pillarDesc}>
                      Meso mariniramo 24 ur v mešanici pristnih orientalskih začimb
                      in ga pečemo na vročem žaru za neustavljivo sočnost.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className={styles.pillarCard}>
                  <div className={styles.pillarIconBox}>
                    <BreadSvg size={22} />
                  </div>
                  <div className={styles.pillarContent}>
                    <h3 className={styles.pillarTitle}>Domač kruh po tajnem receptu</h3>
                    <p className={styles.pillarDesc}>
                      Vsako jutro ročno zamesimo in v krušni peči sveže spečemo
                      hrustljave lepinje in tanek lavaš kruh.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className={styles.pillarCard}>
                  <div className={styles.pillarIconBox}>
                    <HalalShieldSvg size={22} />
                  </div>
                  <div className={styles.pillarContent}>
                    <h3 className={styles.pillarTitle}>100% Halal &amp; dnevna svežina</h3>
                    <p className={styles.pillarDesc}>
                      Uporabljamo izključno certificirano kakovostno telečje in
                      piščančje meso ter lokalno pridelano svežo zelenjavo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Layered Photo Collage */}
            <div className={styles.magVisualStack}>
              {/* Main Photo */}
              <div className={styles.mainPhotoWrapper}>
                <Image
                  src="/images/story-chef.jpg"
                  alt="Šeherezada žar mojster priprava kebaba"
                  width={600}
                  height={500}
                  className={styles.mainPhotoImg}
                />
              </div>

              {/* Overlapping Secondary Photo: Fresh Baked Bread */}
              <div className={styles.overlappingPhotoCard}>
                <Image
                  src="/images/story-oven.jpg"
                  alt="Sveže pečen domač lepinja kruh v peči"
                  width={220}
                  height={160}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Floating Badge */}
              <div className={styles.floatingExperienceBadge}>
                <span className={styles.experienceBadgeNum}>20+</span>
                <span className={styles.experienceBadgeText}>
                  Let tradicije v Ljubljani
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: BENTO TRUST GRID & DOKAZI KAKOVOSTI
            ================================================================== */}
        {activeStyle === 2 && (
          <div className={styles.bentoGrid}>
            {/* Left Hero Photo Card */}
            <div className={styles.bentoLeftCard}>
              <Image
                src="/images/story-oven.jpg"
                alt="Peka domačega kruha v peči"
                width={500}
                height={520}
                className={styles.bentoHeroImg}
              />
              <div className={styles.bentoFloatingPill}>
                <h4 className={styles.bentoPillTitle}>Vsak dan sveže pečeno</h4>
                <p className={styles.bentoPillSub}>
                  Ročno zamešeno testo brez industrijskih dodatkov.
                </p>
              </div>
            </div>

            {/* Right Column: Narrative + 4 Bento Trust Cards */}
            <div className={styles.bentoRightCol}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Zakaj izbrati Šeherezado</span>
              </div>

              <h2 className={styles.magHeading}>
                Zaveza brezkompromisni kakovosti in tradiciji.
              </h2>

              <p className={styles.magLeadText}>
                Zgodba Šeherezade je zgodba o predanosti. Vsak grižljaj odraža
                našo ljubezen do pristne kulinarike in željo, da vam ponudimo
                najboljši kebab v Ljubljani.
              </p>

              <div className={styles.bentoCardsGrid}>
                {/* Card 1 */}
                <div className={styles.bentoMiniCard}>
                  <div className={styles.bentoIconBox}>
                    <LocationPinSvg size={20} />
                  </div>
                  <h4 className={styles.bentoStatTitle}>2 Lokaciji</h4>
                  <p className={styles.bentoStatDesc}>
                    Trubarjeva cesta 31 &amp; Dunajska cesta 106.
                  </p>
                </div>

                {/* Card 2 */}
                <div className={styles.bentoMiniCard}>
                  <div className={styles.bentoIconBox}>
                    <HalalShieldSvg size={20} />
                  </div>
                  <h4 className={styles.bentoStatTitle}>100% Halal</h4>
                  <p className={styles.bentoStatDesc}>
                    Certificirano meso najvišjih higienskih standardov.
                  </p>
                </div>

                {/* Card 3 */}
                <div className={styles.bentoMiniCard}>
                  <div className={styles.bentoIconBox}>
                    <ClockSvg size={20} />
                  </div>
                  <h4 className={styles.bentoStatTitle}>24h Marinada</h4>
                  <p className={styles.bentoStatDesc}>
                    Dolgotrajno mariniranje za polno mehkobo in aromo.
                  </p>
                </div>

                {/* Card 4 */}
                <div className={styles.bentoMiniCard}>
                  <div className={styles.bentoIconBox}>
                    <AwardStarSvg size={20} />
                  </div>
                  <h4 className={styles.bentoStatTitle}>1.900+ Ocen</h4>
                  <p className={styles.bentoStatDesc}>
                    Zaupanje tisočev zadovoljnih gostov vsak dan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: 3 POGLAVLA TRADICIJE (TIMELINE CARDS)
            ================================================================== */}
        {activeStyle === 3 && (
          <div className={styles.timelineWrapper}>
            <div className={styles.timelineHeader}>
              <div className={styles.sectionBadge}>
                <span className={styles.sectionBadgeDot} />
                <span>Zgodba o Strasti</span>
              </div>
              <h2 className={styles.magHeading}>3 Poglavja Našega Uspeha</h2>
              <p className={styles.magLeadText}>
                Odkrijte potovanje okusov, ki se je začelo v starem mestnem jedru
                in postalo nepogrešljiv del ljubljanske kulinarične scene.
              </p>
            </div>

            <div className={styles.timelineCardsGrid}>
              {/* Step 1 */}
              <div className={styles.timelineCard}>
                <div className={styles.timelineCardImgWrapper}>
                  <Image
                    src="/images/story-chef.jpg"
                    alt="Začetek na Trubarjevi cesti"
                    width={400}
                    height={220}
                    className={styles.timelineCardImg}
                  />
                  <span className={styles.timelineStepBadge}>01 / Začetek</span>
                </div>
                <div className={styles.timelineCardBody}>
                  <h3 className={styles.timelineCardTitle}>Začetek na Trubarjevi</h3>
                  <p className={styles.timelineCardDesc}>
                    Vse se je začelo z majhno delavnico in veliko vizijo: ponuditi
                    prvi pravi turški kebab z originalnimi začimbami in žarom.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={styles.timelineCard}>
                <div className={styles.timelineCardImgWrapper}>
                  <Image
                    src="/images/story-oven.jpg"
                    alt="Tajna receptura kruha"
                    width={400}
                    height={220}
                    className={styles.timelineCardImg}
                  />
                  <span className={styles.timelineStepBadge}>02 / Receptura</span>
                </div>
                <div className={styles.timelineCardBody}>
                  <h3 className={styles.timelineCardTitle}>Umetnost Domačega Kruha</h3>
                  <p className={styles.timelineCardDesc}>
                    Razvili smo lastno tajno recepturo za lepinje, ki jih pečemo
                    sproti, da vsak gost prejme hrustljav in topel kruh.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={styles.timelineCard}>
                <div className={styles.timelineCardImgWrapper}>
                  <Image
                    src="/images/hero-platter.jpg"
                    alt="Druga lokacija na Dunajski cesti"
                    width={400}
                    height={220}
                    className={styles.timelineCardImg}
                  />
                  <span className={styles.timelineStepBadge}>03 / Širitev</span>
                </div>
                <div className={styles.timelineCardBody}>
                  <h3 className={styles.timelineCardTitle}>Nova Doba na Dunajski</h3>
                  <p className={styles.timelineCardDesc}>
                    Z odprtjem druge lokacije na Dunajski cesti smo tradicijo
                    približali še večjemu številu ljubiteljev pristnih okusov.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
