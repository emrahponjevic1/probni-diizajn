"use client";

import React, { useEffect, useState } from "react";
import { COMPANY } from "@/data/company";
import {
  ANALYTICS_ENABLED,
  CONSENT_COOKIE,
  CONSENT_EVENT,
  clearConsent,
  readConsent,
  writeConsent,
} from "@/lib/consent";
import { Link } from "@/i18n/navigation";
import styles from "./LegalPage.module.css";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CookieIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01" />
    <path d="M7.5 15.5v.01" />
    <path d="M15.5 14.5v.01" />
    <path d="M12 12v.01" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SlidersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CookieRecord {
  name: string;
  category: "essential" | "analytics" | "functional";
  categoryLabel: string;
  purpose: string;
  duration: string;
  issuer: string;
  /**
   * Ali se ta piškotek res nastavi. Nedejavne naštejemo zato, da gost vnaprej
   * ve, kaj lahko pričakuje — a jih jasno označimo, da besedilo ne trdi
   * obdelave, ki se še ne dogaja.
   */
  active: boolean;
}

/**
 * Popis piškotkov — dejavnih in pripravljenih.
 *
 * `active` ni okras: analitika je pripravljena, a še ni vklopljena. Namesto
 * da bi vrstico skrivali do vklopa ali da bi trdili obdelavo, ki se še ne
 * dogaja, jo pokažemo z jasno oznako „ni v uporabi".
 *
 * Vklop je ena vrstica — ANALYTICS_ENABLED v src/lib/consent.ts.
 */
const COOKIE_LIST: CookieRecord[] = [
  {
    name: CONSENT_COOKIE,
    category: "essential",
    categoryLabel: "Nujni",
    purpose:
      "Shrani vašo izbiro glede piškotkov, da vas pasica ne vpraša znova ob vsakem obisku.",
    duration: "1 leto",
    issuer: `${COMPANY.brandName} (1. oseba)`,
    active: true,
  },
  {
    name: "_ga, _ga_*",
    category: "analytics",
    categoryLabel: "Analitični",
    purpose:
      "Anonimizirano štetje obiskov in ogledov podstrani, da vemo, kateri deli strani so gostom koristni. Naloži se izključno, če v pasici izberete „Sprejmi vse“.",
    duration: "2 leti",
    issuer: "Google Analytics (Google Ireland Ltd.)",
    active: ANALYTICS_ENABLED,
  },
];

export default function PiskotkiPageContent() {

  // Trenutna izbira gosta. null = še ni izbral (pasica je še vidna).
  const [analytics, setAnalytics] = useState<boolean | null>(null);
  const [potrjeno, setPotrjeno] = useState(false);

  useEffect(() => {
    const posodobi = () => setAnalytics(readConsent()?.analytics ?? null);
    posodobi();
    window.addEventListener(CONSENT_EVENT, posodobi);
    return () => window.removeEventListener(CONSENT_EVENT, posodobi);
  }, []);

  const shrani = (dovoli: boolean) => {
    writeConsent(dovoli);
    setPotrjeno(true);
    setTimeout(() => setPotrjeno(false), 3000);
  };

  const ponastavi = () => {
    clearConsent();
    setPotrjeno(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.container}>
        {/* Editorial Chapter Watermark Header */}
        <header className={styles.heroHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>PIŠKOTKI</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>PRAVNO OBVESTILO · ZEKOM-2 & GDPR</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.pageTitle}>Politika uporabe spletnih piškotkov</h1>

          <p className={styles.pageLead}>
            Na spletnem mestu restavracije Šeherezada spoštujemo vašo zasebnost.
            {ANALYTICS_ENABLED ? (
              <>
                Uporabljamo nujni piškotek, ki si zapomni vašo izbiro, in
                analitične piškotke za anonimno statistiko obiska. Analitični se
                naložijo <strong>samo, če v to privolite</strong>. Oglaševalskih
                piškotkov ne uporabljamo.
              </>
            ) : (
              <>
                Trenutno uporabljamo <strong>en sam piškotek</strong> — tistega,
                ki si zapomni vašo izbiro. Analitika je pripravljena, a še ni
                vklopljena; ko bo, se bo naložila izključno gostom, ki so v
                pasici izbrali „Sprejmi vse“. Oglaševalskih piškotkov ne
                uporabljamo in vašega vedenja ne sledimo.
              </>
            )}
          </p>

          <div className={styles.metaUpdatedBar}>
            <span>Zadnja posodobitev: 25. avgust 2026</span>
          </div>
        </header>

        {/* 1. Kaj so piškotki */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>1. Kaj so piškotki in zakaj jih potrebujemo</h2>
          <p className={styles.sectionText}>
            Piškotki (angl. <em>cookies</em>) so majhne besedilne datoteke, ki jih
            spletno mesto shrani v vaš spletni brskalnik ob obisku strani. Ob vsakem
            ponovnem obisku spletno mesto prepozna piškotek in prilagodi vsebino
            ali ohrani vaše nastavitve (npr. izbrani jezik, privolitve ali
            priljubljeno poslovalnico).
          </p>
          <p className={styles.sectionText}>
            Piškotki sami po sebi ne vsebujejo programov in ne morejo poškodovati
            vaše naprave. Ne zbirajo vaših osebnih podatkov brez vaše izrecne
            privolitve.
          </p>
        </section>

        {/* 2. Vrste piškotkov (Bento Grid) */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>2. Vrste piškotkov, ki jih uporabljamo</h2>
          <p className={styles.sectionText}>
            V skladu z Zakonom o elektronskih komunikacijah (ZEKom-2) in Splošno
            uredbo o varstvu podatkov (GDPR) piškotke delimo v tri osnovne
            kategorije:
          </p>

          <div className={styles.bentoGrid3}>
            {/* Card 1 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <ShieldCheckIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Nujno potrebni piškotki</h3>
              <p className={styles.bentoCardText}>
                Ti piškotki so nujni za osnovno delovanje spletne strani (varnost,
                navigacija, shranjevanje vaše privolitve). Za njihovo namestitev
                po zakonu privolitev ni potrebna, saj spletna stran brez njih ne more delovati.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <SlidersIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Funkcionalni piškotki</h3>
              <p className={styles.bentoCardText}>
                Omogočajo naprednejše funkcije in shranjevanje vaših osebnih
                nastavitev (npr. izbira poslovalnice Trubarjeva ali Slovenska),
                da vam ob naslednjem obisku ni treba ponovno izbirati.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <CookieIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Analitični piškotki</h3>
              <p className={styles.bentoCardText}>
                Uporabljamo jih za anonimno spremljanje obiskanosti strani
                (število ogledov, priljubljenost jedi na meniju). IP naslovi so
                anonimizirani, podatki pa se uporabljajo izključno v zbirni obliki.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Tabela piškotkov */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>3. Seznam piškotkov na spletnem mestu</h2>
          <p className={styles.sectionText}>
            Spodnja tabela prikazuje vse piškotke, ki se lahko namestijo na vašo
            napravo. Stolpec „Stanje“ pove, ali je piškotek trenutno dejansko v
            uporabi — tako veste, kaj se na vaši napravi dogaja zdaj, in kaj
            šele načrtujemo:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.cookieTable}>
              <thead>
                <tr>
                  <th>Ime piškotka</th>
                  <th>Kategorija</th>
                  <th>Namen piškotka</th>
                  <th>Čas hrambe</th>
                  <th>Izdajatelj</th>
                  <th>Stanje</th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_LIST.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <span className={styles.cookieCode}>{c.name}</span>
                    </td>
                    <td>
                      {c.category === "essential" ? (
                        <span className={styles.cookieBadgeEssential}>
                          {c.categoryLabel}
                        </span>
                      ) : (
                        <span className={styles.cookieBadgeAnalytics}>
                          {c.categoryLabel}
                        </span>
                      )}
                    </td>
                    <td>{c.purpose}</td>
                    <td>{c.duration}</td>
                    <td>{c.issuer}</td>
                    <td>
                      {c.active ? (
                        <span className={styles.cookieStateOn}>V uporabi</span>
                      ) : (
                        <span className={styles.cookieStateOff}>Ni v uporabi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3b. Vaša izbira — pravi nadzor, ne okras */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>4. Vaša trenutna izbira</h2>
          <p className={styles.sectionText}>
            Tu lahko svojo izbiro kadarkoli spremenite. Sprememba začne veljati
            takoj in se zapiše v piškotek{" "}
            <span className={styles.cookieCode}>{CONSENT_COOKIE}</span>.
          </p>

          <div className={styles.highlightBox}>
            <h3 className={styles.highlightTitle}>
              <span>
                Stanje:{" "}
                {analytics === null
                  ? "še niste izbrali"
                  : analytics
                  ? "sprejeli ste vse piškotke"
                  : "sprejeli ste samo nujne piškotke"}
              </span>
            </h3>

            <p className={styles.sectionText}>
              Nujni piškotek je vedno vklopljen — brez njega si strani ne bi
              zapomnili vaše izbire.{" "}
              {ANALYTICS_ENABLED
                ? "Analitični piškotki se naložijo samo, če ste izbrali „Sprejmi vse“. Če izberete „Samo nujni“, se ne naložijo in obstoječi se ne uporabljajo."
                : "Analitika še ni vklopljena, zato vaša izbira zaenkrat ne spremeni ničesar, kar se naloži. Šteje pa vnaprej: ko analitiko uvedemo, se bo naložila izključno gostom, ki so tu izbrali „Sprejmi vse“."}
            </p>

            <div className={styles.consentBtnRow}>
              <button
                type="button"
                onClick={() => shrani(false)}
                className={styles.consentBtnGhost}
              >
                Samo nujni
              </button>
              <button
                type="button"
                onClick={() => shrani(true)}
                className={styles.consentBtnPrimary}
              >
                Sprejmi vse
              </button>
              <button
                type="button"
                onClick={ponastavi}
                className={styles.consentBtnGhost}
              >
                Ponastavi izbiro
              </button>
            </div>

            <p className={styles.consentSavedMsg} aria-live="polite">
              {potrjeno ? "Izbira je shranjena." : " "}
            </p>
          </div>
        </section>

        {/* 4. Nadzor in izbris piškotkov v brskalniku */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>5. Kako lahko upravljate ali izbrišete piškotke v brskalniku</h2>
          <p className={styles.sectionText}>
            Nastavitve za piškotke lahko kadarkoli spremenite tudi v vašem spletnem
            brskalniku. Večina brskalnikov vam omogoča, da zavrnete ali sprejmete vse
            piškotke, sprejmete le določene vrste piškotkov ali pa vas opozorijo,
            ko spletno mesto želi shraniti piškotek.
          </p>

          <div className={styles.highlightBox}>
            <h3 className={styles.highlightTitle}>
              <span>Navodila za urejanje piškotkov v priljubljenih brskalnikih:</span>
            </h3>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              • <strong>Google Chrome:</strong> Nastavitve → Zasebnost in varnost → Piškotki in drugi podatki spletnih mest.
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              • <strong>Mozilla Firefox:</strong> Možnosti → Zasebnost in varnost → Piškotki in podatki strani.
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              • <strong>Apple Safari:</strong> Nastavitve → Zasebnost → Upravljanje podatkov spletnih mest.
            </p>
            <p className={styles.sectionText} style={{ marginBottom: 0 }}>
              • <strong>Microsoft Edge:</strong> Nastavitve → Dovoljenja za spletna mesta → Piškotki in podatki spletnih mest.
            </p>
          </div>

          <p className={styles.sectionText}>
            Opozorilo: Če v celoti onemogočite piškotke, nekatere funkcionalnosti
            spletnega mesta morda ne bodo delovale optimalno.
          </p>
        </section>

        {/* 5. Upravljavec & Kontakt */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>6. Upravljavec podatkov in vprašanja</h2>
          <p className={styles.sectionText}>
            Upravljavec spletnega mesta in podatkov, zbranih prek piškotkov, je:
          </p>

          <div className={styles.controllerCard}>
            <div>
              <h3 className={styles.controllerTitle}>{COMPANY.legalName}</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>Blagovna znamka:</strong>
                  <span>{COMPANY.brandName}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Sedež:</strong>
                  <span>{COMPANY.address}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Matična številka:</strong>
                  <span>{COMPANY.registrationNumber}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.controllerTitle}>Kontakt za zasebnost</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>E-pošta:</strong>
                  <a
                    href={`mailto:${COMPANY.privacyEmail}`}
                    className={styles.controllerLink}
                  >
                    {COMPANY.privacyEmail}
                  </a>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Telefon:</strong>
                  <a href="tel:+38669314316" className={styles.controllerLink}>
                    +386 69 314 316
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Legal Navigation Bar */}
        <div className={styles.legalNavRow}>
          <Link href="/politika-zasebnosti" className={styles.legalNavBtnPrimary}>
            <span>Preberi Politiko zasebnosti</span>
            <ArrowRightIcon />
          </Link>
          <Link href="/meni" className={styles.legalNavBtn}>
            <span>Nazaj na Meni</span>
          </Link>
          <Link href="/kontakt" className={styles.legalNavBtn}>
            <span>Kontakt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
