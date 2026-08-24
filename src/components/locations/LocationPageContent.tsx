import Link from "next/link";
import Image from "next/image";
import { PHONE, type LocationCore } from "@/data/locations";
import { STUDENT_BON } from "@/components/menu/MenuData";
import { LiveBadge, HoursTable } from "./LocationLive";
import LazyMap from "./LazyMap";
import styles from "./LocationPageContent.module.css";

/* ---------- ikone ---------- */
const Ikona = {
  pin: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  bus: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11" />
      <path d="M4 11h16" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
  car: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14l-1.5-5.5A2 2 0 0 0 15.6 10H8.4a2 2 0 0 0-1.9 1.5L5 17Z" />
      <path d="M5 17v2" /><path d="M19 17v2" />
      <circle cx="8" cy="17" r="1" /><circle cx="16" cy="17" r="1" />
    </svg>
  ),
  walk: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="1.6" />
      <path d="M11 21l2-6-3-2.5V8l4 1.5 2 3" />
      <path d="M10 12.5 7.5 21" />
    </svg>
  ),
  phone: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  ),
  camera: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  ),
  arrow: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

export default function LocationPageContent({
  loc,
  dishCount,
  other,
}: {
  loc: LocationCore;
  slug: string;
  dishCount: number;
  other: { name: string; slug: string; street: string };
}) {
  const imaFotografije = loc.photos.some((f) => f.src);

  return (
    <>
      {/* ================= GLAVA: podatki levo, zemljevid desno ================= */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="Drobtine" className={styles.crumbs}>
            <Link href="/">Domov</Link>
            <span className={styles.sep}>/</span>
            <Link href="/kontakt">Lokaciji</Link>
            <span className={styles.sep}>/</span>
            <span className={styles.crumbCurrent}>{loc.name}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className={styles.badge}>{loc.badge}</span>

              <h1 className={styles.title}>{loc.h1}</h1>

              <p className={styles.subtitle}>{loc.subtitle}</p>

              <div className={styles.metaRow}>
                <span className={styles.addressPill}>
                  {Ikona.pin(17)}
                  {loc.fullAddress}
                </span>
                <LiveBadge hours={loc.hours} />
              </div>

              <p className={styles.vibe}>{loc.vibeText}</p>

              <div className={styles.ctaRow}>
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  {Ikona.pin(16)} Navodila za pot
                </a>
                <a href={`tel:${PHONE.restaurant.e164}`} className={styles.btnGhost}>
                  {Ikona.phone(15)} {PHONE.restaurant.display}
                </a>
                <Link href="/meni" className={styles.btnGhost}>
                  Meni in cene
                </Link>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.mapCard}>
                <LazyMap
                  src={loc.mapEmbed}
                  title={`Zemljevid — ${loc.name}, ${loc.fullAddress}`}
                  className={styles.mapFrame}
                />
                <div className={styles.mapFoot}>
                  <div>
                    <span className={styles.mapFootLabel}>Najdeš nas na</span>
                    <strong className={styles.mapFootValue}>{loc.fullAddress}</strong>
                  </div>
                  <a
                    href={loc.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapFootLink}
                  >
                    Apple Maps {Ikona.arrow(14)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOTOGRAFIJE ================= */}
      <section className={styles.sectionTight}>
        <div className={styles.container}>
          <div className={styles.gallery}>
            {loc.photos.map((f, i) =>
              f.src ? (
                <div key={i} className={styles.galleryItem}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.galleryImg}
                  />
                </div>
              ) : (
                <div key={i} className={styles.galleryPlaceholder}>
                  {Ikona.camera(24)}
                  <span>{f.alt}</span>
                </div>
              )
            )}
          </div>
          {!imaFotografije && (
            <p className={styles.galleryNote}>
              Fotografije lokala pripravljamo. Do takrat si nas lahko ogledaš na
              Google Zemljevidih.
            </p>
          )}
        </div>
      </section>

      {/* ================= DELOVNI ČAS + KAJ TU DOBIŠ ================= */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <h2 className={styles.h2}>Delovni čas</h2>
              <HoursTable hours={loc.hours} />
              <p className={styles.hoursNote}>
                Kuhinja dela do zaprtja — zadnje naročilo sprejmemo nekaj minut
                prej.
              </p>
            </div>

            <div>
              <h2 className={styles.h2}>Kaj tu dobiš</h2>
              <ul className={styles.highlights}>
                {loc.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <div className={styles.bonCard}>
                <span className={styles.bonLabel}>Študentski boni</span>
                <p>
                  Na tej lokaciji je na voljo <strong>{dishCount} jedi</strong> z
                  našega menija. Za doplačilo{" "}
                  <strong>
                    {STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €
                  </strong>{" "}
                  dobiš glavno jed, solato, jabolko in pijačo.
                </p>
                <Link href="/meni" className={styles.bonLink}>
                  Poglej celoten meni {Ikona.arrow(14)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KAKO PRITI ================= */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Kako prideš do nas</h2>
          <p className={styles.sectionLead}>
            Lokal je v središču mesta, zato je pot najhitrejša peš ali z mestnim
            avtobusom.
          </p>

          <div className={styles.transportGrid}>
            {[
              { ikona: Ikona.bus(20), oznaka: "Z avtobusom", besedilo: loc.transport.lpp },
              { ikona: Ikona.car(20), oznaka: "Parkiranje", besedilo: loc.transport.parking },
              { ikona: Ikona.walk(20), oznaka: "Peš", besedilo: loc.transport.walking },
            ].map((t) => (
              <div key={t.oznaka} className={styles.transportCard}>
                <span className={styles.transportIcon}>{t.ikona}</span>
                <span className={styles.transportLabel}>{t.oznaka}</span>
                <p>{t.besedilo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DRUGA POSLOVALNICA ================= */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <Link href={`/lokacije/${other.slug}`} className={styles.otherBox}>
            <div>
              <span className={styles.otherLabel}>Naša druga poslovalnica</span>
              <span className={styles.otherTitle}>{other.name}</span>
              <span className={styles.otherStreet}>{other.street}, Ljubljana</span>
            </div>
            <span className={styles.otherArrow}>{Ikona.arrow(18)}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
