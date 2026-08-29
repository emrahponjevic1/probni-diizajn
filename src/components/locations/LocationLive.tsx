"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { openState, todayIndex, type OpenState } from "@/lib/hours";
import styles from "./LocationPageContent.module.css";

/**
 * Status in delovni čas se izračunata šele po nalaganju v brskalniku.
 * Strežnik ne ve, koliko je ura pri gostu, zato bi statična različica čez
 * nekaj minut lagala. Do izračuna je prikazan nevtralen zapis — tako tudi
 * ne pride do neujemanja med strežniško in brskalniško različico.
 */

export function LiveBadge({ hours }: { hours: { day: string; time: string }[] }) {
  // Besedila so v messages/<jezik>.json pod ključem "znacka".
  const t = useTranslations("znacka");
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const posodobi = () => setState(openState(hours));
    posodobi();
    const t = setInterval(posodobi, 60_000);
    return () => clearInterval(t);
  }, [hours]);

  if (!state) {
    return (
      <div className={styles.liveBadgeIdle}>
        <span className={styles.liveDotIdle} />
        <span>{t("preverjamo")}</span>
      </div>
    );
  }

  if (state.open) {
    return (
      <div className={styles.liveBadgeOpen}>
        <span className={styles.liveDotWrap}>
          <span className={styles.liveDotPing} />
          <span className={styles.liveDot} />
        </span>
        <span>
          <strong>{t("odprtoZdaj")}</strong>
          <span className={styles.liveSub}>&nbsp;{t("doUre", { ura: state.closesAt ?? "" })}</span>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.liveBadgeClosed}>
      <span className={styles.liveDotClosed} />
      <span>
        <strong>{t("trenutnoZaprto")}</strong>
        <span className={styles.liveSub}>
          &nbsp;
          {t("odUre", {
            kdaj: state.opensTomorrow ? t("jutri") : t("danes"),
            ura: state.opensAt ?? "",
          })}
        </span>
      </span>
    </div>
  );
}

export function HoursTable({ hours }: { hours: { day: string; time: string }[] }) {
  const t = useTranslations("znacka");
  const [danes, setDanes] = useState<number | null>(null);

  useEffect(() => {
    setDanes(todayIndex(new Date()));
  }, []);

  return (
    <div className={styles.hoursList}>
      {hours.map((h, i) => (
        <div
          key={h.day}
          className={i === danes ? styles.hoursRowToday : styles.hoursRow}
        >
          <span className={styles.day}>
            {h.day}
            {i === danes && <span className={styles.todayTag}>{t("danesOznaka")}</span>}
          </span>
          <span className={styles.time}>{h.time}</span>
        </div>
      ))}
    </div>
  );
}
