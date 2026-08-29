"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { openState } from "@/lib/hours";
import styles from "./StatusBadge.module.css";

/**
 * Značka Odprto / Zaprto za posamezno poslovalnico.
 *
 * Stanje se izračuna v brskalniku, ne na strežniku: strani so pripravljene
 * vnaprej ob gradnji, zato bi strežniški izračun obtičal na uri, ko je bila
 * stran zgrajena, in bi lagal že isti večer.
 *
 * Do izračuna je značka skrita, a zavzame prostor — postavitev ne poskoči,
 * gost pa nikoli ne vidi napačnega stanja.
 */
export default function StatusBadge({
  hours,
  className,
}: {
  hours: { day: string; time: string }[];
  className?: string;
}) {
  // Besedila so v messages/<jezik>.json pod ključem "znacka".
  const t = useTranslations("znacka");

  const [odprto, setOdprto] = useState<boolean | null>(null);

  useEffect(() => {
    const posodobi = () => setOdprto(openState(hours).open);
    posodobi();
    const t = setInterval(posodobi, 60_000);
    return () => clearInterval(t);
  }, [hours]);

  const razred = [
    styles.badge,
    odprto === null ? styles.pending : odprto ? styles.open : styles.closed,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={razred} aria-live="polite">
      <span className={styles.dotWrap}>
        {odprto === false ? (
          <span className={styles.dotClosed} />
        ) : (
          <>
            <span className={styles.ping} />
            <span className={styles.dot} />
          </>
        )}
      </span>
      <span className={styles.label}>
        {odprto === false ? t("zaprto") : t("odprto")}
      </span>
    </span>
  );
}
