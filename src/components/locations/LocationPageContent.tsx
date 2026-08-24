import Link from "next/link";
import { PHONE, type LocationCore } from "@/data/locations";
import { STUDENT_BON } from "@/components/menu/MenuData";
import styles from "./LocationPageContent.module.css";

const PinSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BusSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11" />
    <path d="M4 11h16" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
  </svg>
);

const CarSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17h14l-1.5-5.5A2 2 0 0 0 15.6 10H8.4a2 2 0 0 0-1.9 1.5L5 17Z" />
    <path d="M5 17v2" /><path d="M19 17v2" />
    <circle cx="8" cy="17" r="1" /><circle cx="16" cy="17" r="1" />
  </svg>
);

const WalkSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13" cy="4" r="1.6" />
    <path d="M11 21l2-6-3-2.5V8l4 1.5 2 3" />
    <path d="M10 12.5 7.5 21" />
  </svg>
);

export default function LocationPageContent({
  loc,
  slug,
  dishCount,
  other,
}: {
  loc: LocationCore;
  slug: string;
  dishCount: number;
  other: { name: string; slug: string; street: string };
}) {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <nav aria-label="Drobtice" className={styles.crumbs}>
            <Link href="/">Domov</Link>
            <span className={styles.sep}>/</span>
            <Link href="/kontakt">Lokaciji</Link>
            <span className={styles.sep}>/</span>
            <span className={styles.crumbCurrent}>{loc.name}</span>
          </nav>

          <span className={styles.badge}>{loc.badge}</span>

          <h1 className={styles.title}>
            {loc.name}, {loc.street}
          </h1>

          <p className={styles.subtitle}>{loc.subtitle}</p>

          <div className={styles.addressRow}>
            <PinSvg size={17} />
            <span>{loc.fullAddress}</span>
          </div>

          <p className={styles.vibe}>{loc.vibeText}</p>

          <div className={styles.ctaRow}>
            <a
              href={loc.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Google Zemljevidi
            </a>
            <a
              href={loc.appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              Apple Maps ↗
            </a>
            <a href={`tel:${PHONE.restaurant.e164}`} className={styles.btnGhost}>
              {PHONE.restaurant.display}
            </a>
          </div>
        </div>
      </section>

      {/* Delovni čas + kaj tu dobiš */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <h2 className={styles.h2}>Delovni čas</h2>
              <div className={styles.hoursList}>
                {loc.hours.map((h) => (
                  <div key={h.day} className={styles.hoursRow}>
                    <span className={styles.day}>{h.day}</span>
                    <span className={styles.time}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className={styles.h2}>Kaj tu dobiš</h2>
              <ul className={styles.highlights}>
                {loc.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <p className={styles.menuNote}>
                Na tej lokaciji je na voljo <strong>{dishCount} jedi</strong> z
                našega menija. Za doplačilo{" "}
                {STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} € dobiš
                glavno jed, solato, jabolko in pijačo.
              </p>

              <Link href="/meni" className={styles.btnPrimary}>
                Poglej meni in cene
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kako priti */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Kako priti</h2>

          <div className={styles.transportGrid}>
            <div className={styles.transportCard}>
              <BusSvg size={19} />
              <span className={styles.transportLabel}>Z avtobusom</span>
              <p>{loc.transport.lpp}</p>
            </div>
            <div className={styles.transportCard}>
              <CarSvg size={19} />
              <span className={styles.transportLabel}>Parkiranje</span>
              <p>{loc.transport.parking}</p>
            </div>
            <div className={styles.transportCard}>
              <WalkSvg size={19} />
              <span className={styles.transportLabel}>Peš</span>
              <p>{loc.transport.walking}</p>
            </div>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              src={loc.mapEmbed}
              title={`Zemljevid — ${loc.name}, ${loc.fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Druga poslovalnica */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.otherBox}>
            <div>
              <span className={styles.otherLabel}>Naša druga poslovalnica</span>
              <h2 className={styles.otherTitle}>
                {other.name}, {other.street}
              </h2>
            </div>
            <Link href={`/lokacije/${other.slug}`} className={styles.btnPrimary}>
              Poglej lokacijo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
