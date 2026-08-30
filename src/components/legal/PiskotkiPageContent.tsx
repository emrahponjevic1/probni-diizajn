"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/data/company";
import { PHONE } from "@/data/locations";
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

/** Barva značke po kategoriji. Prej sta bili dve, zdaj so štiri. */
const ZNACKA: Record<CookieRecord["category"], string> = {
  essential: styles.cookieBadgeEssential,
  functional: styles.cookieBadgeFunctional,
  analytics: styles.cookieBadgeAnalytics,
  thirdparty: styles.cookieBadgeThirdParty,
};

interface CookieRecord {
  name: string;
  category: "essential" | "analytics" | "functional" | "thirdparty";
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
 * Piškotek, ki ga nastavi next-intl ob prikazu strani, da povezave ostanejo v
 * istem jeziku. Ime je njegovo, ne naše — zato je tu zapisano kot dejstvo.
 * Nastavi se ob VSAKEM obisku, tudi preden gost karkoli izbere v pasici, zato
 * mora biti v tabeli. Odkrito v neodvisni reviziji (6A.3).
 */
const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Popis piškotkov — dejavnih in pripravljenih.
 *
 * `active` ni okras: analitika je pripravljena, a še ni vklopljena. Namesto
 * da bi vrstico skrivali do vklopa ali da bi trdili obdelavo, ki se še ne
 * dogaja, jo pokažemo z jasno oznako „ni v uporabi".
 *
 * Vklop je ena vrstica — ANALYTICS_ENABLED v src/lib/consent.ts.
 */
export default function PiskotkiPageContent() {
  // Besedila so v messages/<jezik>.json pod ključem "piskotkiStran".
  const t = useTranslations("piskotkiStran");

  // Trenutna izbira gosta. null = še ni izbral (pasica je še vidna).
  const [analytics, setAnalytics] = useState<boolean | null>(null);
  const [potrjeno, setPotrjeno] = useState(false);

  // Seznam je znotraj komponente, ker zunaj nje prevodi niso dosegljivi.
  // Imena piškotkov, trajanje in izdajatelj ostajajo dejstva, ne prevod;
  // prevaja se samo tisto, kar gost bere kot poved.
  const COOKIE_LIST: CookieRecord[] = [
    {
      name: CONSENT_COOKIE,
      category: "essential",
      categoryLabel: t("kategorijaNujni"),
      purpose: t("namenNujni"),
      duration: t("trajanjeLeto"),
      issuer: t("izdajateljPrvaOseba", { znamka: COMPANY.brandName }),
      active: true,
    },
    {
      name: LOCALE_COOKIE,
      category: "functional",
      categoryLabel: t("kategorijaFunkcionalni"),
      purpose: t("namenJezik"),
      duration: t("trajanjeSeja"),
      issuer: t("izdajateljPrvaOseba", { znamka: COMPANY.brandName }),
      active: true,
    },
    {
      name: "_ga, _ga_*",
      category: "analytics",
      categoryLabel: t("kategorijaAnaliticni"),
      purpose: t("namenAnaliticni"),
      duration: t("trajanjeDveLeti"),
      issuer: "Google Analytics (Google Ireland Ltd.)",
      active: ANALYTICS_ENABLED,
    },
    {
      // Piškotkov tretje osebe ne nastavljamo mi in njihovih imen ne
      // določamo — zato je vrstica ena sama, brez izmišljenih imen.
      name: t("imeZemljevid"),
      category: "thirdparty",
      categoryLabel: t("kategorijaTretjaOseba"),
      purpose: t("namenZemljevid"),
      duration: t("trajanjeGoogle"),
      issuer: "Google Ireland Ltd.",
      // Zemljevid se zdaj naloži šele po privolitvi, zato stanje bere
      // dejansko izbiro gosta in ne trdi obdelave, ki se ne dogaja.
      active: analytics === true,
    },
  ];


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
            <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>{t("oznaka")}</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.pageTitle}>{t("naslov")}</h1>

          <p className={styles.pageLead}>
            {/* Presledek mora biti izrecen: React med dvema izrazoma vstavi
                le ločilo <!-- -->, ki ga brskalnik ne izriše kot presledek. */}
            {t("uvodZacetek")}{" "}
            {ANALYTICS_ENABLED
              ? t.rich("uvodZAnalitiko", { b: (chunks) => <strong>{chunks}</strong> })
              : t.rich("uvodBrezAnalitike", { b: (chunks) => <strong>{chunks}</strong> })}
          </p>

          <div className={styles.metaUpdatedBar}>
            <span>{t("posodobitev")}</span>
          </div>
        </header>

        {/* 1. Kaj so piškotki */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>{t("razdelek1")}</h2>
          <p className={styles.sectionText}>
            {t.rich("kajSo1", { em: (chunks) => <em>{chunks}</em> })}
          </p>
          <p className={styles.sectionText}>{t("kajSo2")}</p>
        </section>

        {/* 2. Vrste piškotkov (Bento Grid) */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>{t("razdelek2")}</h2>
          <p className={styles.sectionText}>{t("razdelek2Uvod")}</p>

          <div className={styles.bentoGrid3}>
            {/* Card 1 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <ShieldCheckIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>{t("nujniNaslov")}</h3>
              <p className={styles.bentoCardText}>{t("nujniOpis")}</p>
            </div>

            {/* Card 2 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <SlidersIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>{t("funkcionalniNaslov")}</h3>
              <p className={styles.bentoCardText}>{t("funkcionalniOpis")}</p>
            </div>

            {/* Card 3 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <CookieIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>{t("analiticniNaslov")}</h3>
              {/* Tabela pravi "ni v uporabi"; besedilo je prej trdilo
                  "uporabljamo jih". Zdaj oboje bere isto stikalo. */}
              <p className={styles.bentoCardText}>
                {ANALYTICS_ENABLED ? t("analiticniOpis") : t("analiticniOpisBrez")}
              </p>
            </div>
          </div>

          {/* Vgrajeni Googlov zemljevid ni naša kategorija, ampak tuja
              vsebina — zato stoji ločeno pod tremi karticami. */}
          <div className={styles.highlightBox}>
            <div className={styles.highlightTitle}>{t("tretjaOsebaNaslov")}</div>
            <p className={styles.sectionText} style={{ marginBottom: 0 }}>
              {t("tretjaOsebaOpis")}
            </p>
          </div>
        </section>

        {/* 3. Tabela piškotkov */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>{t("razdelek3")}</h2>
          <p className={styles.sectionText}>{t("razdelek3Uvod")}</p>

          <div className={styles.tableWrapper}>
            <table className={styles.cookieTable}>
              <thead>
                <tr>
                  <th>{t("stolpecIme")}</th>
                  <th>{t("stolpecKategorija")}</th>
                  <th>{t("stolpecNamen")}</th>
                  <th>{t("stolpecHramba")}</th>
                  <th>{t("stolpecIzdajatelj")}</th>
                  <th>{t("stolpecStanje")}</th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_LIST.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <span className={styles.cookieCode}>{c.name}</span>
                    </td>
                    <td>
                      <span className={ZNACKA[c.category]}>{c.categoryLabel}</span>
                    </td>
                    <td>{c.purpose}</td>
                    <td>{c.duration}</td>
                    <td>{c.issuer}</td>
                    <td>
                      {c.active ? (
                        <span className={styles.cookieStateOn}>{t("vUporabi")}</span>
                      ) : (
                        <span className={styles.cookieStateOff}>{t("niVUporabi")}</span>
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
          <h2 className={styles.sectionTitle}>{t("razdelek4")}</h2>
          <p className={styles.sectionText}>
            {t("razdelek4Uvod")}{" "}
            <span className={styles.cookieCode}>{CONSENT_COOKIE}</span>.
          </p>

          <div className={styles.highlightBox}>
            <h3 className={styles.highlightTitle}>
              <span>
                {t("stanjeOznaka")}{" "}
                {analytics === null
                  ? t("stanjeNiIzbral")
                  : analytics
                  ? t("stanjeVse")
                  : t("stanjeSamoNujni")}
              </span>
            </h3>

            <p className={styles.sectionText}>
              {t("nujniVednoVklopljen")}{" "}
              {ANALYTICS_ENABLED
                ? t("razlagaZAnalitiko")
                : t("razlagaBrezAnalitike")}
            </p>

            <div className={styles.consentBtnRow}>
              <button
                type="button"
                onClick={() => shrani(false)}
                className={styles.consentBtnGhost}
              >
                {t("gumbSamoNujni")}
              </button>
              <button
                type="button"
                onClick={() => shrani(true)}
                className={styles.consentBtnPrimary}
              >
                {t("gumbSprejmiVse")}
              </button>
              <button
                type="button"
                onClick={ponastavi}
                className={styles.consentBtnGhost}
              >
                {t("gumbPonastavi")}
              </button>
            </div>

            <p className={styles.consentSavedMsg} aria-live="polite">
              {potrjeno ? t("izbiraShranjena") : " "}
            </p>
          </div>
        </section>

        {/* 4. Nadzor in izbris piškotkov v brskalniku */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>{t("razdelek5")}</h2>
          <p className={styles.sectionText}>{t("razdelek5Uvod")}</p>

          <div className={styles.highlightBox}>
            <h3 className={styles.highlightTitle}>
              <span>{t("navodilaNaslov")}</span>
            </h3>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              {t.rich("navodilaChrome", { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              {t.rich("navodilaFirefox", { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.5rem" }}>
              {t.rich("navodilaSafari", { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className={styles.sectionText} style={{ marginBottom: 0 }}>
              {t.rich("navodilaEdge", { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>

          <p className={styles.sectionText}>{t("opozorilo")}</p>
        </section>

        {/* 5. Upravljavec & Kontakt */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>{t("razdelek6")}</h2>
          <p className={styles.sectionText}>{t("razdelek6Uvod")}</p>

          <div className={styles.controllerCard}>
            <div>
              <h3 className={styles.controllerTitle}>{COMPANY.legalName}</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>{t("oznakaZnamka")}</strong>
                  <span>{COMPANY.brandName}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>{t("oznakaSedez")}</strong>
                  <span>{COMPANY.address}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>{t("oznakaMaticna")}</strong>
                  <span>{COMPANY.registrationNumber}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.controllerTitle}>{t("kontaktZaZasebnost")}</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>{t("oznakaEposta")}</strong>
                  <a
                    href={`mailto:${COMPANY.privacyEmail}`}
                    className={styles.controllerLink}
                  >
                    {COMPANY.privacyEmail}
                  </a>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>{t("oznakaTelefon")}</strong>
                  <a href={`tel:${PHONE.restaurant.e164}`} className={styles.controllerLink}>
                    {PHONE.restaurant.display}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Legal Navigation Bar */}
        <div className={styles.legalNavRow}>
          <Link href="/politika-zasebnosti" className={styles.legalNavBtnPrimary}>
            <span>{t("gumbZasebnost")}</span>
            <ArrowRightIcon />
          </Link>
          <Link href="/meni" className={styles.legalNavBtn}>
            <span>{t("gumbMeni")}</span>
          </Link>
          <Link href="/kontakt" className={styles.legalNavBtn}>
            <span>{t("gumbKontakt")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
