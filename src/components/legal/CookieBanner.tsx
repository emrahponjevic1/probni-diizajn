"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  ANALYTICS_ENABLED,
  CONSENT_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";
import styles from "./CookieBanner.module.css";

/**
 * PASICA ZA PRIVOLITEV V PIŠKOTKE
 *
 * Prikaže se samo, dokler gost ni izbral. Izbira se shrani v piškotek
 * `cookie_consent` za eno leto — isti piškotek, kot ga našteva /piskotki.
 *
 * Zakaj pasica obstaja, čeprav analitike še ni:
 * analitika pride v Fazi 7. Privolitev mora biti pridobljena PREJ, ne
 * pozneje — zato mehanizem stoji že zdaj, skripte pa se ne naloži, dokler
 * gost ne reče da. Tako ob vklopu analitike ni treba spreminjati ničesar
 * razen ene vrstice v layoutu.
 *
 * Pasica ne blokira strani in nima gumba, ki bi gosta prisilil v "da".
 * Zavrnitev je en klik, enako kot sprejem — to zahteva GDPR.
 */
export default function CookieBanner() {
  // null = še ne vemo (strežniško izrisovanje), true/false = ali kažemo pasico
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const posodobi = () => setVisible(readConsent() === null);
    posodobi();
    window.addEventListener(CONSENT_EVENT, posodobi);
    return () => window.removeEventListener(CONSENT_EVENT, posodobi);
  }, []);

  if (visible !== true) return null;

  const izberi = (analytics: boolean) => {
    writeConsent(analytics);
    setVisible(false);
  };

  return (
    <div className={styles.wrap} role="dialog" aria-live="polite" aria-label="Privolitev v piškotke">
      <div className={styles.card}>
        <div className={styles.textCol}>
          <strong className={styles.title}>Piškotki na tej strani</strong>
          <p className={styles.text}>
            {ANALYTICS_ENABLED
              ? "Nujni piškotek si zapomni to izbiro. Analitične naložimo samo, če izberete „Sprejmi vse“."
              : "Uporabljamo samo piškotek, ki si zapomni to izbiro. Analitika še ni vklopljena — ko bo, se bo naložila le, če tu izberete „Sprejmi vse“."}{" "}
            Več v{" "}
            <Link href="/piskotki" className={styles.link}>
              politiki piškotkov
            </Link>
            .
          </p>
        </div>

        <div className={styles.btnRow}>
          <button
            type="button"
            onClick={() => izberi(false)}
            className={styles.btnGhost}
          >
            Samo nujni
          </button>
          <button
            type="button"
            onClick={() => izberi(true)}
            className={styles.btnPrimary}
          >
            Sprejmi vse
          </button>
        </div>
      </div>
    </div>
  );
}
