"use client";

import { useTranslations } from "next-intl";
import { useLocationText } from "@/i18n/locationText";
import { Link } from "@/i18n/navigation";
import { LOCATIONS, LOCATION_SLUG, PHONE, directionsUrl } from "@/data/locations";
import { STUDENT_BON } from "@/components/menu/MenuData";
import { LiveBadge } from "./LocationLive";
import styles from "./LocationsOverviewContent.module.css";

// ---------------------------------------------------------------------------
// PREGLED OBEH POSLOVALNIC
//
// Nič novega si ne izmišlja: imena, naslovi, urnik, opisi in prednosti so
// isti podatki iz src/data/locations.ts, ki jih stran že prikazuje drugod.
// Prevodi gredo skozi isti sloj kot povsod (useLocationText).
// ---------------------------------------------------------------------------

const Ikona = {
  pin: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  ),
  check: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  arrow: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

export default function LocationsOverviewContent() {
  const t = useTranslations("lokacijeStran");
  const tl = useTranslations("lokacijaStran");
  const prevediLokal = useLocationText();
  const lokali = LOCATIONS.map(prevediLokal);

  const doplacilo = `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`;

  return (
    <section className={styles.page}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.container}>
        <header className={styles.head}>
          <div className={styles.tagRow}>
            <span className={styles.tagDash} />
            <span className={styles.tag}>{t("oznaka")}</span>
            <span className={styles.tagDash} />
          </div>

          <h1 className={styles.title}>{t("naslov")}</h1>
          <p className={styles.lead}>
            {t("uvod", { stevilo: LOCATIONS.length, doplacilo })}
          </p>
        </header>

        <div className={styles.cards}>
          {lokali.map((loc) => (
            <article key={loc.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.badge}>{loc.badge}</span>
                <h2 className={styles.cardTitle}>{loc.name}</h2>
                <p className={styles.cardSubtitle}>{loc.subtitle}</p>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.address}>
                  {Ikona.pin(14)} {loc.fullAddress}
                </span>
                <LiveBadge hours={loc.hours} />
              </div>

              <p className={styles.vibe}>{loc.vibeText}</p>

              <ul className={styles.list}>
                {loc.highlights.map((h, i) => (
                  <li key={i} className={styles.listItem}>
                    <span className={styles.listCheck}>{Ikona.check(13)}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <Link
                  href={{
                    pathname: "/lokacije/[slug]",
                    params: { slug: LOCATION_SLUG[loc.id] },
                  }}
                  className={styles.btnPrimary}
                >
                  {t("podrobnosti")} {Ikona.arrow(14)}
                </Link>
                <a
                  href={directionsUrl(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGhost}
                >
                  {Ikona.pin(14)} {tl("navodilaZaPot")}
                </a>
                <a href={`tel:${PHONE.restaurant.e164}`} className={styles.btnGhost}>
                  {Ikona.phone(14)} {PHONE.restaurant.display}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footNote}>
          <p className={styles.footText}>{t("opomba")}</p>
          <div className={styles.footLinks}>
            <Link href="/meni" className={styles.btnPrimary}>
              {tl("meniInCene")} {Ikona.arrow(14)}
            </Link>
            <Link href="/studentski-boni" className={styles.btnGhost}>
              {tl("boniOznaka")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
