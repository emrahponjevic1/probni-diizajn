"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PHONE, LOCATION_SLUG, type LocationId } from "@/data/locations";
import styles from "./ContactPageContent.module.css";
import WorldMapPattern from "./WorldMapPattern";
import {
  CONTACT_LOCATIONS,
  DIRECT_CHANNELS,
  LocationDetail,
} from "./ContactData";

// Clean Vector SVG Icons
interface SvgProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PhoneSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPinSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowUpRightSvg = ({ size = 16, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const CheckSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UserSvg = ({ size = 16, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SendSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const InstagramSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.48V8.75a8.16 8.16 0 0 0 4.91 1.63v-3.45a4.85 4.85 0 0 1-1-.24z" />
  </svg>
);

const WoltBagSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const BusSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M8 6v6" />
    <path d="M16 6v6" />
    <path d="M4 6h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <path d="M2 12h20" />
    <path d="M6 19v2" />
    <path d="M18 19v2" />
  </svg>
);

const CarParkingSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </svg>
);

const FootWalkSvg = ({ size = 18, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="m13 4 3 6-3 4-2-2" />
    <path d="m9 20 3-6" />
    <path d="M4 17l4-5" />
    <circle cx="13" cy="2" r="1.5" fill="currentColor" />
  </svg>
);

const CopySvg = ({ size = 14, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const NavigationSvg = ({ size = 16, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const CompassSvg = ({ size = 16, className, style }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
  </svg>
);

export default function ContactPageContent() {
  // Active map location state
  const [selectedMapLoc, setSelectedMapLoc] = useState<"trubarjeva" | "slovenska">("trubarjeva");

  // Map copy feedback state
  const [mapCopied, setMapCopied] = useState(false);

  const handleMapCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setMapCopied(true);
    setTimeout(() => setMapCopied(false), 2400);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "splosno",
    location: "vseeno",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form submit simulation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  // Reset form
  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "splosno",
      location: "vseeno",
      message: "",
    });
  };

  const activeMapLocationData = useMemo(() => {
    return CONTACT_LOCATIONS.find((loc) => loc.id === selectedMapLoc) || CONTACT_LOCATIONS[0];
  }, [selectedMapLoc]);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* ==================================================================
          1. HERO SECTION (FIRST PAGE SECTION — STRICT PADDING)
          Desktop: padding: 7rem 2rem 5.5rem;
          Tablet:  padding: 6rem 1.5rem 4.5rem;
          Mobile:  padding: 5.25rem 1.25rem 4rem;
          ================================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroSplitGrid}>
            {/* Left Column: Heading, Subtitle, and 3 Quick Contact Cards */}
            <div className={styles.heroLeftCol}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>KONTAKT</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>STOPITE V STIK · ŠEHEREZADA</span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.heroTitle}>
                Kontakt in obe lokaciji v središču Ljubljane
              </h1>

              <p className={styles.heroSubtitle}>
                Obiščite nas v mestnem jedru na Trubarjevi ali ob osrednji Slovenski cesti.
                Pokličite nas za hitro naročilo za osebni prevzem, rezervacijo ali nam preprosto pošljite sporočilo.
              </p>

              {/* 3 Floating Cards Row (Matching Locations & Email) */}
              <div className={styles.heroThreeCardsRow}>
                {/* Card 1: Šeherezada */}
                <div className={styles.heroCardItem}>
                  <div className={styles.heroCardHeading}>Šeherezada</div>
                  <div className={styles.heroCardSubtext}>Trubarjeva cesta 31</div>
                  <a href={`tel:${PHONE.restaurant.e164}`} className={styles.heroCardPhoneLink}>
                    <PhoneSvg size={14} />
                    <span>{PHONE.restaurant.display}</span>
                  </a>
                </div>

                {/* Card 2: Šeherezada 2 */}
                <div className={styles.heroCardItem}>
                  <div className={styles.heroCardHeading}>Šeherezada 2</div>
                  <div className={styles.heroCardSubtext}>Slovenska cesta 55</div>
                  <a href={`tel:${PHONE.restaurant.e164}`} className={styles.heroCardPhoneLink}>
                    <PhoneSvg size={14} />
                    <span>{PHONE.restaurant.display}</span>
                  </a>
                </div>

                {/* Card 3: E-pošta */}
                <a
                  href="mailto:info@seherezada.net"
                  className={`${styles.heroCardItem} ${styles.heroCardItemLink}`}
                  title="Pošljite e-poštno sporočilo na info@seherezada.net"
                >
                  <div className={styles.heroCardHeading}>E-poštni predal</div>
                  <div className={styles.heroCardSubtext}>Vprašanja &amp; rezervacije</div>
                  <div className={styles.heroCardEmailAlt}>
                    <MailSvg size={14} />
                    <span>info@seherezada.net</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Cheerful Calling Photo with Rotated Rounded Rectangle Frame */}
            <div className={styles.heroRightCol}>
              <div className={styles.heroImageWrapper}>
                {/* Rotated Rounded Card (Zaobljeni kvadar) */}
                <div className={styles.heroRotatedCard}>
                  <span className={styles.heroRotatedTopTab} />
                </div>

                {/* Foreground Photo (Sitting in front of the rotated card) */}
                <div className={styles.heroImgContainer}>
                  <img
                    src="/images/contact-call-hero.png"
                    alt="Stopite v stik s Šeherezado"
                    className={styles.heroCallImg}
                    loading="eager"
                  />
                </div>

                {/* Floating Live Status Pill */}
                <div className={styles.heroFloatingPill}>
                  <span className={styles.heroFloatingPillPulse} />
                  <span>Odprti za klice &amp; naročila</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. INTERACTIVE CONTACT & INQUIRY FORM SECTION
          Desktop: padding: 5rem 2rem 5.5rem;
          ================================================================== */}
      <section className={styles.formSection}>
        {/* World Map Background Pattern */}
        <WorldMapPattern />

        <div className={styles.container} style={{ position: "relative", zIndex: 1 }}>
          <div className={styles.formLayoutGrid}>
            {/* Left Info Column */}
            <div className={styles.formInfoCol}>
              <div className={styles.sectionHeader} style={{ textAlign: "left", margin: "0 0 1.5rem" }}>
                <div className={styles.chapterTagContainer}>
                  <span className={styles.tagGhostWatermark}>SPOROČILO</span>
                  <div className={styles.chapterIndexTag}>
                    <span className={styles.chapterDash} />
                    <span>POŠLJITE SPOROČILO</span>
                    <span className={styles.chapterDash} />
                  </div>
                </div>
                <h2 className={styles.sectionTitle}>Pišite nam za vprašanja, rezervacije ali pohvale</h2>
                <p className={styles.sectionDesc}>
                  Želite rezervirati mizo za večjo skupino, povprašati o študentskih bonih ali izvedeti več o naši ponudbi?
                  Izpolnite obrazec in z veseljem vam odgovorimo v najkrajšem času.
                </p>
              </div>

              {/* Social Channels List */}
              <div className={styles.directChannelsList}>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directChannelCard}
                >
                  <div className={styles.directChannelIcon}>
                    <InstagramSvg size={20} />
                  </div>
                  <div className={styles.directChannelText}>
                    <span className={styles.directChannelLabel}>Instagram &amp; Sporočila</span>
                    <span className={styles.directChannelVal}>@seherezada_si</span>
                  </div>
                </a>

                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directChannelCard}
                >
                  <div className={styles.directChannelIcon}>
                    <FacebookSvg size={20} />
                  </div>
                  <div className={styles.directChannelText}>
                    <span className={styles.directChannelLabel}>Facebook stran</span>
                    <span className={styles.directChannelVal}>Šeherezada Ljubljana</span>
                  </div>
                </a>

                <a
                  href="https://tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directChannelCard}
                >
                  <div className={styles.directChannelIcon}>
                    <TikTokSvg size={20} />
                  </div>
                  <div className={styles.directChannelText}>
                    <span className={styles.directChannelLabel}>TikTok profil</span>
                    <span className={styles.directChannelVal}>@seherezada_si</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Clean Form Card */}
            <div className={styles.formCard}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contactName">
                        Ime in priimek *
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>
                          <UserSvg size={16} />
                        </span>
                        <input
                          id="contactName"
                          type="text"
                          required
                          placeholder="npr. Luka Novak"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contactEmail">
                        E-poštni naslov *
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>
                          <MailSvg size={16} />
                        </span>
                        <input
                          id="contactEmail"
                          type="email"
                          required
                          placeholder="luka@primer.si"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contactPhone">
                        Telefonska številka <span className={styles.formOptional}>(opcijsko)</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>
                          <PhoneSvg size={16} />
                        </span>
                        <input
                          id="contactPhone"
                          type="tel"
                          placeholder="+386 40 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contactSubject">
                        Zadeva sporočila
                      </label>
                      <div className={styles.inputWrapper}>
                        <select
                          id="contactSubject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className={styles.formSelect}
                          style={{ paddingLeft: "1rem" }}
                        >
                          <option value="splosno">Splošno vprašanje ali pohvala</option>
                          <option value="rezervacija">Rezervacija mize za skupine</option>
                          <option value="studenti">Študentska prehrana (Boni)</option>
                          <option value="poslovno">Poslovno sodelovanje / Zaposlitev</option>
                          <option value="drugo">Drugo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contactLocation">
                      Želena poslovalnica
                    </label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <MapPinSvg size={16} />
                      </span>
                      <select
                        id="contactLocation"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={styles.formSelect}
                      >
                        <option value="vseeno">Vseeno / Obe lokaciji</option>
                        <option value="trubarjeva">Šeherezada Trubarjeva 31 (Center)</option>
                        <option value="slovenska">Šeherezada Slovenska 55 (Center)</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contactMessage">
                      Vaše sporočilo ali želje *
                    </label>
                    <textarea
                      id="contactMessage"
                      required
                      rows={4}
                      placeholder="Vpišite vaše vprašanje, želje ali sporočilo za ekipo Šeherezada..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      maxLength={1200}
                      className={styles.formTextarea}
                    />
                    <div className={styles.formCharCounter}>
                      {formData.message.length} / 1200 znakov
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                    {isSubmitting ? (
                      <span>Pošiljanje sporočila...</span>
                    ) : (
                      <>
                        <SendSvg size={18} />
                        <span>Pošlji sporočilo</span>
                      </>
                    )}
                  </button>

                  <p className={styles.submitDisclaimer}>
                    S klikom na gumb soglašate s kontaktiranjem glede vašega povpraševanja.
                  </p>
                </form>
              ) : (
                <div className={styles.successCard}>
                  <div className={styles.successIconWrap}>
                    <CheckSvg size={36} />
                  </div>
                  <h3 className={styles.successTitle}>Sporočilo je bilo uspešno poslano!</h3>
                  <p className={styles.successText}>
                    Hvala, <strong>{formData.name}</strong>. Vaše sporočilo smo prejeli. Naša ekipa vas bo
                    kontaktirala na <strong>{formData.email}</strong> v najkrajšem možnem času.
                  </p>

                  <div className={styles.successDetailsBox}>
                    <div>
                      <strong>Zadeva:</strong>{" "}
                      {formData.subject === "rezervacija"
                        ? "Rezervacija mize"
                        : formData.subject === "studenti"
                        ? "Študentska prehrana"
                        : formData.subject === "poslovno"
                        ? "Poslovno sodelovanje / Zaposlitev"
                        : "Splošno vprašanje"}
                    </div>
                    <div>
                      <strong>Lokacija:</strong>{" "}
                      {formData.location === "trubarjeva"
                        ? "Trubarjeva 31"
                        : formData.location === "slovenska"
                        ? "Slovenska 55"
                        : "Vseeno"}
                    </div>
                  </div>

                  <div className={styles.successActionRow}>
                    <button type="button" onClick={handleReset} className={styles.resetFormBtn}>
                      Pošlji novo sporočilo
                    </button>
                    <a href={`tel:${PHONE.restaurant.e164}`} className={styles.callLocationBtn}>
                      <PhoneSvg size={16} />
                      <span>Hitri klic: {PHONE.restaurant.display}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. INTERACTIVE MAP & TRANSIT GUIDE SECTION (LUXURY REDESIGN)
          Desktop: padding: 5rem 2rem 5.5rem;
          ================================================================== */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.chapterTagContainerCenter}>
              <span className={styles.tagGhostWatermarkCenter}>VODNIK</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>INTERAKTIVNI VODNIK &amp; DOSTOP</span>
                <span className={styles.chapterDash} />
              </div>
            </div>
            <h2 className={styles.sectionTitle}>Kako do nas v Ljubljani</h2>
            <p className={styles.sectionDesc}>
              Izberite poslovalnico za ogled točne lokacije na zemljevidu, navodil za prihod z LPP avtobusom ter možnosti parkiranja.
            </p>
          </div>

          {/* Dual Interactive Location Switcher Cards */}
          <div className={styles.mapCardsSelectorRow}>
            <button
              type="button"
              onClick={() => setSelectedMapLoc("trubarjeva")}
              className={`${styles.locationSelectCard} ${
                selectedMapLoc === "trubarjeva" ? styles.locationSelectCardActive : ""
              }`}
            >
              <div className={styles.locationSelectIconWrap}>
                <MapPinSvg size={18} />
              </div>
              <div className={styles.locationSelectTextGroup}>
                <span className={styles.locationSelectTag}>01 · Mestno Jedro</span>
                <span className={styles.locationSelectTitle}>Trubarjeva cesta 31</span>
              </div>
              <div className={styles.locationSelectRadio}>
                <span className={styles.locationSelectRadioInner} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMapLoc("slovenska")}
              className={`${styles.locationSelectCard} ${
                selectedMapLoc === "slovenska" ? styles.locationSelectCardActive : ""
              }`}
            >
              <div className={styles.locationSelectIconWrap}>
                <MapPinSvg size={18} />
              </div>
              <div className={styles.locationSelectTextGroup}>
                <span className={styles.locationSelectTag}>02 · Center</span>
                <span className={styles.locationSelectTitle}>Slovenska cesta 55</span>
              </div>
              <div className={styles.locationSelectRadio}>
                <span className={styles.locationSelectRadioInner} />
              </div>
            </button>
          </div>

          {/* Redesigned Clean Map Showcase Card */}
          <div className={styles.mapWrapperCard}>
            {/* Left: Clean Map Frame */}
            <div className={styles.mapFrameContainer}>
              <iframe
                title={activeMapLocationData.name}
                src={activeMapLocationData.googleMapsEmbed}
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Store Details & Transit Cards */}
            <div className={styles.mapDetailsSide}>
              <div className={styles.mapSideTop}>
                <h3 className={styles.mapSideTitle}>{activeMapLocationData.name}</h3>

                {/* Interactive Address Box with One-Click Copy */}
                <div className={styles.mapAddressCard}>
                  <div className={styles.mapAddressLeft}>
                    <div className={styles.mapAddressIconWrap}>
                      <MapPinSvg size={18} />
                    </div>
                    <div className={styles.mapAddressTextGroup}>
                      <span className={styles.mapAddressStreet}>{activeMapLocationData.address}</span>
                      <span className={styles.mapAddressCity}>{activeMapLocationData.city} · Slovenija</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleMapCopy(`${activeMapLocationData.address}, ${activeMapLocationData.city}`)}
                    className={`${styles.mapCopyBtn} ${mapCopied ? styles.mapCopyBtnDone : ""}`}
                    title="Kopiraj točen naslov za navigacijo"
                  >
                    {mapCopied ? (
                      <>
                        <CheckSvg size={13} />
                        <span>Kopirano!</span>
                      </>
                    ) : (
                      <>
                        <CopySvg size={13} />
                        <span>Kopiraj</span>
                      </>
                    )}
                  </button>
                </div>

                <p className={styles.mapSideVibe}>{activeMapLocationData.vibeText}</p>

                {/* Refined Modern Transit Cards */}
                <div className={styles.transitGuidesList}>
                  <div className={styles.transitItem}>
                    <div className={styles.transitIconBadge}>
                      <BusSvg size={18} />
                    </div>
                    <div className={styles.transitContent}>
                      <div className={styles.transitLabel}>LPP Avtobusni Prihod</div>
                      <div className={styles.transitValue}>{activeMapLocationData.transport.lpp}</div>
                    </div>
                  </div>

                  <div className={styles.transitItem}>
                    <div className={styles.transitIconBadge}>
                      <CarParkingSvg size={18} />
                    </div>
                    <div className={styles.transitContent}>
                      <div className={styles.transitLabel}>Parkiranje &amp; Garaže</div>
                      <div className={styles.transitValue}>{activeMapLocationData.transport.parking}</div>
                    </div>
                  </div>

                  <div className={styles.transitItem}>
                    <div className={styles.transitIconBadge}>
                      <FootWalkSvg size={18} />
                    </div>
                    <div className={styles.transitContent}>
                      <div className={styles.transitLabel}>Dostop Peš &amp; BicikeLJ</div>
                      <div className={styles.transitValue}>{activeMapLocationData.transport.walking}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className={styles.mapSideActions}>
                <a
                  href={activeMapLocationData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapPrimaryNavBtn}
                >
                  <NavigationSvg size={16} />
                  <span>Google Maps</span>
                </a>

                <a
                  href={activeMapLocationData.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapSecondaryNavBtn}
                >
                  <CompassSvg size={16} />
                  <span>Apple Maps</span>
                </a>

                {/* Podrobnosti o posamezni poslovalnici imajo svojo stran —
                    tja vodi tudi Google Business Profile. */}
                <Link
                  href={`/lokacije/${LOCATION_SLUG[activeMapLocationData.id as LocationId]}`}
                  className={styles.mapSecondaryNavBtn}
                >
                  <NavigationSvg size={16} />
                  <span>Vse o tej poslovalnici</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
