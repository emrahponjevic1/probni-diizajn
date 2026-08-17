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

export default function SiteFooter() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.footerContainer}>
        {/* Main 4-Column Grid */}
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

            {/* Social Media Icons */}
            <div className={styles.socialRow}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sledite nam na Facebooku"
                className={styles.socialBtn}
              >
                <FacebookSvg size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sledite nam na Instagramu"
                className={styles.socialBtn}
              >
                <InstagramSvg size={18} />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sledite nam na TikToku"
                className={styles.socialBtn}
              >
                <TikTokSvg size={18} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Oglejte si naš YouTube kanal"
                className={styles.socialBtn}
              >
                <YouTubeSvg size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Delovni Čas Day-by-Day */}
          <div className={styles.hoursCol}>
            <span className={styles.colTitle}>DELOVNI ČAS</span>

            <div className={styles.liveMintPill}>
              <span>● Odprto vsak dan do 05:00</span>
            </div>

            <div className={styles.hoursList}>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Ponedeljek</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Torek</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Sreda</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Četrtek</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Petek</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Sobota</span>
                <span className={styles.dayTime}>10:00 – 05:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.dayName}>Nedelja</span>
                <span className={styles.dayTime}>11:00 – 05:00</span>
              </div>
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
              <a href="#meni" className={styles.navLinkItem}>
                <span className={styles.navLinkDot} />
                <span>Priljubljene izbire</span>
              </a>
              <a href="#zgodba" className={styles.navLinkItem}>
                <span className={styles.navLinkDot} />
                <span>Naša zgodba &amp; tradicija</span>
              </a>
              <a href="#halal" className={styles.navLinkItem}>
                <span className={styles.navLinkDot} />
                <span>100% Halal Certifikat</span>
              </a>
              <a href="#boni" className={styles.navLinkItem}>
                <span className={styles.navLinkDot} />
                <span>Študentski boni</span>
              </a>
              <a href="#faq" className={styles.navLinkItem}>
                <span className={styles.navLinkDot} />
                <span>Pogosta vprašanja</span>
              </a>
            </div>

            {/* Wolt & Glovo Delivery Mini Banner */}
            <div className={styles.deliveryMiniCard}>
              <h4 className={styles.deliveryCardTitle}>Naročilo na dom</h4>
              <p className={styles.deliveryCardSub}>
                Hitra dostava v Ljubljani prek Wolt &amp; Glovo
              </p>
              <a
                href="https://wolt.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.deliveryBtnLink}
              >
                <span>Naroči prek Wolt</span>
                <ArrowUpRightSvg size={14} />
              </a>
            </div>
          </div>
        </div>

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
