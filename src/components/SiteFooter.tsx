"use client";

import { useState } from "react";
import styles from "./SiteFooter.module.css";

// Clean Vector SVG Social & Contact Icons
const FacebookSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YouTubeSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LocationPinSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowUpRightSvg = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const daysData = [
  { day: "Ponedeljek", time: "10:00 – 05:00" },
  { day: "Torek", time: "10:00 – 05:00" },
  { day: "Sreda", time: "10:00 – 05:00" },
  { day: "Četrtek", time: "10:00 – 05:00" },
  { day: "Petek", time: "10:00 – 05:00" },
  { day: "Sobota", time: "10:00 – 05:00" },
  { day: "Nedelja", time: "11:00 – 05:00" },
];

export default function SiteFooter() {
  const [activeStyle, setActiveStyle] = useState<1 | 2 | 3 | 4>(1);

  return (
    <footer className={styles.footerSection}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.footerContainer}>
        {/* Style Selector Tabs (For Visual Comparison) */}
        <div className={styles.styleSelectorWrapper}>
          <span className={styles.styleSelectorLabel}>Predogled Dizajnov Footera (White Luxury)</span>
          <div className={styles.styleSwitcherTabs}>
            <button
              type="button"
              onClick={() => setActiveStyle(1)}
              className={`${styles.styleTabBtn} ${activeStyle === 1 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 1: 4-Kolonski Klasični Grid (Priporočamo)
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(2)}
              className={`${styles.styleTabBtn} ${activeStyle === 2 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 2: Modularne Bento Kartice
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(3)}
              className={`${styles.styleTabBtn} ${activeStyle === 3 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 3: Grand Brand Header + 3 Kolone
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle(4)}
              className={`${styles.styleTabBtn} ${activeStyle === 4 ? styles.styleTabBtnActive : ""}`}
            >
              Opcija 4: Minimalist Modernist White
            </button>
          </div>
        </div>

        {/* ==================================================================
            OPCIJA 1: 4-COLUMN CLASSIC GRID (RECOMMENDED)
            ================================================================== */}
        {activeStyle === 1 && (
          <div className={styles.footerGrid}>
            {/* Column 1: Brand & Bio & Socials */}
            <div className={styles.brandCol}>
              <span className={styles.brandLogo}>
                ŠEHEREZADA<span className={styles.logoDot}>.</span>
              </span>

              <p className={styles.brandBioText}>
                Ljubljanski street food od leta 1998. Kebab, pica in falafel —
                pripravljeni sveže, 100% halal, odprti do zgodnjih jutranjih ur.
              </p>

              <div className={styles.socialRow}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}><FacebookSvg size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}><InstagramSvg size={18} /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialBtn}><TikTokSvg size={18} /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}><YouTubeSvg size={18} /></a>
              </div>
            </div>

            {/* Column 2: Delovni Čas Day-by-Day */}
            <div className={styles.hoursCol}>
              <span className={styles.colTitle}>DELOVNI ČAS</span>

              <div className={styles.liveMintPill}>
                <span>● Odprto vsak dan do 05:00</span>
              </div>

              <div className={styles.hoursList}>
                {daysData.map((d, i) => (
                  <div key={i} className={styles.hoursRow}>
                    <span className={styles.dayName}>{d.day}</span>
                    <span className={styles.dayTime}>{d.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Lokacije & Kontakt */}
            <div className={styles.locContactCol}>
              <span className={styles.colTitle}>LOKACIJE &amp; KONTAKT</span>

              <div className={styles.locationCard}>
                <div className={styles.locNameRow}>
                  <LocationPinSvg size={16} />
                  <span>Šeherezada Center</span>
                </div>
                <span className={styles.locStreet}>Trubarjeva cesta 31, 1000 Ljubljana</span>
              </div>

              <div className={styles.locationCard}>
                <div className={styles.locNameRow}>
                  <LocationPinSvg size={16} />
                  <span>Šeherezada Bežigrad</span>
                </div>
                <span className={styles.locStreet}>Dunajska cesta 106, 1000 Ljubljana</span>
              </div>

              <div className={styles.contactLinksList}>
                <a href="tel:+38614305240" className={styles.contactItemLink}>
                  <PhoneSvg size={16} />
                  <span>+386 (01) 430 52 40</span>
                </a>
                <a href="mailto:info@seherezada.si" className={styles.contactItemLink}>
                  <MailSvg size={16} />
                  <span>info@seherezada.si</span>
                </a>
              </div>
            </div>

            {/* Column 4: Hitre Povezave & Wolt Dostava */}
            <div className={styles.linksCol}>
              <span className={styles.colTitle}>HITRE POVEZAVE</span>

              <div className={styles.navLinksList}>
                <a href="#meni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Priljubljene izbire</span></a>
                <a href="#zgodba" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Naša zgodba &amp; tradicija</span></a>
                <a href="#halal" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>100% Halal Certifikat</span></a>
                <a href="#boni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Študentski boni</span></a>
                <a href="#faq" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Pogosta vprašanja</span></a>
              </div>

              <div className={styles.deliveryMiniCard}>
                <h4 className={styles.deliveryCardTitle}>Naročilo na dom</h4>
                <p className={styles.deliveryCardSub}>Hitra dostava v Ljubljani prek Wolt &amp; Glovo</p>
                <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className={styles.deliveryBtnLink}>
                  <span>Naroči prek Wolt</span>
                  <ArrowUpRightSvg size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 2: MODULARNE BENTO KARTICE
            ================================================================== */}
        {activeStyle === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {/* Top Row: Brand Card + Delivery Card */}
            <div className={styles.bentoFooterGrid}>
              <div className={styles.bentoFooterCard}>
                <div>
                  <span className={styles.brandLogo}>
                    ŠEHEREZADA<span className={styles.logoDot}>.</span>
                  </span>
                  <p className={styles.brandBioText} style={{ maxWidth: "550px", marginTop: "0.8rem" }}>
                    Ljubljanski street food od leta 1998. Kebab, pica in falafel — pripravljeni sveže, 100% halal, odprti do zgodnjih jutranjih ur.
                  </p>
                </div>

                <div className={styles.socialRow}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}><FacebookSvg size={18} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}><InstagramSvg size={18} /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialBtn}><TikTokSvg size={18} /></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}><YouTubeSvg size={18} /></a>
                </div>
              </div>

              <div className={`${styles.bentoFooterCard} ${styles.bentoDeliveryHighlight}`}>
                <div>
                  <span className={styles.colTitle}>SPLETNA NAROČILA</span>
                  <p style={{ fontSize: "0.92rem", color: "#57534e", lineHeight: "1.5", margin: "0.4rem 0 1rem 0" }}>
                    Želite vroč kebab ali pizzo naravnost na vaša vrata?
                  </p>
                  <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className={styles.deliveryBtnLink} style={{ padding: "0.8rem 1.4rem", fontSize: "0.9rem" }}>
                    <span>Naroči dostavo (Wolt &amp; Glovo)</span>
                    <ArrowUpRightSvg size={16} />
                  </a>
                </div>

                <div className={styles.contactLinksList}>
                  <a href="tel:+38614305240" className={styles.contactItemLink}><PhoneSvg size={16} /><span>+386 (01) 430 52 40</span></a>
                  <a href="mailto:info@seherezada.si" className={styles.contactItemLink}><MailSvg size={16} /><span>info@seherezada.si</span></a>
                </div>
              </div>
            </div>

            {/* Bottom Row: Hours Card + Locations Card */}
            <div className={styles.bentoFooterGrid}>
              <div className={styles.bentoFooterCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={styles.colTitle} style={{ margin: 0 }}>DELOVNI ČAS</span>
                  <div className={styles.liveMintPill} style={{ margin: 0 }}>
                    <span>● Odprto do 05:00</span>
                  </div>
                </div>

                <div className={styles.bentoHours2Col}>
                  {daysData.map((d, i) => (
                    <div key={i} className={styles.hoursRow}>
                      <span className={styles.dayName}>{d.day}</span>
                      <span className={styles.dayTime}>{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.bentoFooterCard}>
                <span className={styles.colTitle}>LOKACIJI V LJUBLJANI</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <div className={styles.locationCard}>
                    <div className={styles.locNameRow}><LocationPinSvg size={16} /><span>Šeherezada Center</span></div>
                    <span className={styles.locStreet}>Trubarjeva cesta 31, 1000 Ljubljana</span>
                  </div>
                  <div className={styles.locationCard}>
                    <div className={styles.locNameRow}><LocationPinSvg size={16} /><span>Šeherezada Bežigrad</span></div>
                    <span className={styles.locStreet}>Dunajska cesta 106, 1000 Ljubljana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 3: GRAND BRAND HEADER + 3 COLUMNS
            ================================================================== */}
        {activeStyle === 3 && (
          <div>
            {/* Top Brand Banner */}
            <div className={styles.grandBrandHeader}>
              <span className={styles.grandWatermarkText}>LJUBLJANA 1998</span>

              <div>
                <span className={styles.brandLogo} style={{ fontSize: "2.4rem" }}>
                  ŠEHEREZADA<span className={styles.logoDot}>.</span>
                </span>
                <p className={styles.brandBioText} style={{ maxWidth: "600px", marginTop: "0.4rem" }}>
                  Ljubljanski street food od leta 1998. Kebab, pica in falafel — pripravljeni sveže, 100% halal, odprti do zgodnjih jutranjih ur.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", alignItems: "flex-end" }}>
                <div className={styles.socialRow}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}><FacebookSvg size={18} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}><InstagramSvg size={18} /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialBtn}><TikTokSvg size={18} /></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}><YouTubeSvg size={18} /></a>
                </div>
                <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className={styles.deliveryBtnLink} style={{ background: "#ea580c" }}>
                  <span>Naroči na Wolt</span>
                  <ArrowUpRightSvg size={14} />
                </a>
              </div>
            </div>

            {/* 3 Columns Grid */}
            <div className={styles.triColumnsGrid}>
              <div className={styles.hoursCol}>
                <span className={styles.colTitle}>DELOVNI ČAS</span>
                <div className={styles.hoursList}>
                  {daysData.map((d, i) => (
                    <div key={i} className={styles.hoursRow}>
                      <span className={styles.dayName}>{d.day}</span>
                      <span className={styles.dayTime}>{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.locContactCol}>
                <span className={styles.colTitle}>LOKACIJE &amp; KONTAKT</span>
                <div className={styles.locationCard}>
                  <div className={styles.locNameRow}><LocationPinSvg size={16} /><span>Trubarjeva cesta 31</span></div>
                  <span className={styles.locStreet}>Center, 1000 Ljubljana</span>
                </div>
                <div className={styles.locationCard}>
                  <div className={styles.locNameRow}><LocationPinSvg size={16} /><span>Dunajska cesta 106</span></div>
                  <span className={styles.locStreet}>Bežigrad, 1000 Ljubljana</span>
                </div>
                <div className={styles.contactLinksList}>
                  <a href="tel:+38614305240" className={styles.contactItemLink}><PhoneSvg size={16} /><span>+386 (01) 430 52 40</span></a>
                  <a href="mailto:info@seherezada.si" className={styles.contactItemLink}><MailSvg size={16} /><span>info@seherezada.si</span></a>
                </div>
              </div>

              <div className={styles.linksCol}>
                <span className={styles.colTitle}>POVEZAVE</span>
                <div className={styles.navLinksList}>
                  <a href="#meni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Priljubljene izbire</span></a>
                  <a href="#zgodba" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Naša zgodba</span></a>
                  <a href="#halal" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>100% Halal Certifikat</span></a>
                  <a href="#boni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Študentski boni</span></a>
                  <a href="#faq" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Pogosta vprašanja</span></a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            OPCIJA 4: MINIMALIST MODERNIST WHITE
            ================================================================== */}
        {activeStyle === 4 && (
          <div className={styles.minimalistGrid}>
            <div className={styles.brandCol}>
              <span className={styles.brandLogo} style={{ fontSize: "1.8rem" }}>
                ŠEHEREZADA<span className={styles.logoDot}>.</span>
              </span>
              <p className={styles.brandBioText} style={{ fontSize: "0.88rem" }}>
                Ljubljanski street food od leta 1998. Kebab, pica in falafel — pripravljeni sveže, 100% halal, odprti do zgodnjih jutranjih ur.
              </p>
              <div className={styles.socialRow}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}><FacebookSvg size={16} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}><InstagramSvg size={16} /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialBtn}><TikTokSvg size={16} /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}><YouTubeSvg size={16} /></a>
              </div>
            </div>

            <div className={styles.hoursCol}>
              <span className={styles.colTitle}>DELOVNI ČAS</span>
              <div className={styles.hoursList}>
                {daysData.map((d, i) => (
                  <div key={i} className={styles.hoursRow} style={{ fontSize: "0.84rem" }}>
                    <span className={styles.dayName}>{d.day}</span>
                    <span className={styles.dayTime}>{d.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.locContactCol}>
              <span className={styles.colTitle}>LOKACIJI &amp; KONTAKT</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", color: "#1c1917" }}>
                <strong>Center:</strong> Trubarjeva cesta 31
                <strong>Bežigrad:</strong> Dunajska cesta 106
              </div>
              <div className={styles.contactLinksList} style={{ marginTop: "0.6rem" }}>
                <a href="tel:+38614305240" className={styles.contactItemLink}><PhoneSvg size={15} /><span>+386 (01) 430 52 40</span></a>
                <a href="mailto:info@seherezada.si" className={styles.contactItemLink}><MailSvg size={15} /><span>info@seherezada.si</span></a>
              </div>
            </div>

            <div className={styles.linksCol}>
              <span className={styles.colTitle}>NAROČILA &amp; INFO</span>
              <div className={styles.navLinksList}>
                <a href="#meni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Priljubljene izbire</span></a>
                <a href="#boni" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Študentski boni</span></a>
                <a href="#faq" className={styles.navLinkItem}><span className={styles.navLinkDot} /><span>Pogosta vprašanja</span></a>
              </div>
              <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className={styles.deliveryBtnLink} style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                <span>Dostava Wolt</span>
                <ArrowUpRightSvg size={14} />
              </a>
            </div>
          </div>
        )}

        {/* Slim Bottom Sub-Footer Bar */}
        <div className={styles.subFooterBar}>
          <p className={styles.copyrightText}>
            © 2026 Šeherezada Ljubljana. Vse pravice pridržane.
          </p>

          <div className={styles.legalLinksRow}>
            <a href="#piskotki" className={styles.legalLink}>
              Piškotki
            </a>
            <span className={styles.legalSeparator} />
            <a href="#zasebnost" className={styles.legalLink}>
              Politika zasebnosti
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
