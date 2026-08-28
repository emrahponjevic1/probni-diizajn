"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { STUDENT_BON } from "./menu/MenuData";
import { Link } from "@/i18n/navigation";
import styles from "./FaqSection.module.css";

// Clean Vector SVG Chevron
const ChevronDownSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRightSvg = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface FaqItem {
  id: string;
  num: string;
  tag: string;
  question: string;
  answer: string;
  accent: "red" | "orange" | "dark";
  offsetClass: string;
  shadowClass: string;
}

export default function FaqSection() {
  // Besedila so v messages/<jezik>.json pod ključem "faqOdsek".
  // Seznam je znotraj komponente in ne nad njo, ker zunaj ni dostopa
  // do prevodov — barve in zamiki ostajajo tu, besedilo pride iz prevoda.
  const t = useTranslations("faqOdsek");

  const doplacilo = `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`;

  const faqs: FaqItem[] = [
    {
      id: "hours",
      num: "01",
      tag: t("vprasanja.hoursTag"),
      question: t("vprasanja.hoursVprasanje"),
      answer: t("vprasanja.hoursOdgovor"),
      accent: "red",
      offsetClass: styles.offsetStart,
      shadowClass: styles.shadowRed,
    },
    {
      id: "halal",
      num: "02",
      tag: t("vprasanja.halalTag"),
      question: t("vprasanja.halalVprasanje"),
      answer: t("vprasanja.halalOdgovor"),
      accent: "orange",
      offsetClass: styles.offsetEnd,
      shadowClass: styles.shadowOrange,
    },
    {
      id: "boni",
      num: "03",
      tag: t("vprasanja.boniTag"),
      question: t("vprasanja.boniVprasanje"),
      answer: t("vprasanja.boniOdgovor", { doplacilo }),
      accent: "dark",
      offsetClass: styles.offsetMid,
      shadowClass: styles.shadowDark,
    },
    {
      id: "delivery",
      num: "04",
      tag: t("vprasanja.deliveryTag"),
      question: t("vprasanja.deliveryVprasanje"),
      answer: t("vprasanja.deliveryOdgovor"),
      accent: "orange",
      offsetClass: styles.offsetEnd,
      shadowClass: styles.shadowOrange,
    },
  ];

  const [openId, setOpenId] = useState<string | null>("hours");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.faqContainer}>
        <div className={styles.userSplitGrid}>
          {/* Left Column: Sticky Header & Lockup */}
          <div className={styles.userLeftCol}>
            <div className={styles.chapterTagContainer}>
              <span className={styles.tagGhostWatermark}>{t("vodniZnak")}</span>
              <div className={styles.chapterIndexTag}>
                <span className={styles.chapterDash} />
                <span>
                  <span className={styles.chapterNumber}>06</span> / {t("oznakaPoglavja")}
                </span>
                <span className={styles.chapterDash} />
              </div>
            </div>

            <h2 className={styles.leftMainHeading}>
              {t("naslovPrvaVrstica")} <br className={styles.desktopBr} />
              <span className={styles.headingHighlight}>{t("naslovPoudarek")}</span>{" "}
              <br className={styles.desktopBr} />
              {t("naslovTretjaVrstica")}
            </h2>

            {/* Description & CTA Button Inline Row with Auto-Wrapping */}
            <div className={styles.leadCtaRow}>
              <p className={styles.leftLeadText}>{t("uvod")}</p>

              <Link href="/pogosta-vprasanja" className={styles.leftCtaBtn}>
                <span>{t("gumb")}</span>
                <ArrowRightSvg size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Staggered Accordion Cards */}
          <div className={styles.accordionList}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              const badgeColorClass =
                faq.accent === "red"
                  ? styles.badgeRed
                  : faq.accent === "orange"
                    ? styles.badgeOrange
                    : styles.badgeDark;

              return (
                <div key={faq.id} className={`${styles.accordionCardWrapper} ${faq.offsetClass}`}>
                  <div
                    onClick={() => toggle(faq.id)}
                    className={`${styles.accordionCard} ${isOpen ? styles.cardOpen : ""} ${faq.shadowClass}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggle(faq.id);
                      }
                    }}
                  >
                    {/* Floating Number Badge */}
                    <div className={`${styles.floatingBadgeNum} ${badgeColorClass}`}>
                      {faq.num}
                    </div>

                    {/* Category Tag */}
                    <div className={styles.accordionTag}>{faq.tag}</div>

                    {/* Question Row */}
                    <div className={styles.questionRow}>
                      <h3 className={styles.questionTitle}>{faq.question}</h3>

                      <div
                        className={`${styles.chevronCircle} ${isOpen ? styles.chevronCircleOpen : ""}`}
                      >
                        <ChevronDownSvg size={20} />
                      </div>
                    </div>

                    {/* Answer Grid Expansion */}
                    <div
                      className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : styles.answerClosed}`}
                    >
                      <div className={styles.answerInner}>
                        <p className={styles.answerText}>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
