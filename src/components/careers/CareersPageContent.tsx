"use client";

import React, { useState, useEffect } from "react";
import { PHONE } from "@/data/locations";
import Link from "next/link";
import styles from "./CareersPageContent.module.css";
import { JOBS_DATA, HAS_OPEN_POSITIONS, JobPosition } from "./CareersData";

// Clean Lucide-style SVG Icons
const ArrowDownSvg = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowUpRightSvg = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const ExternalLinkSvg = ({ size = 14, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const LinkSvg = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ArrowLeftSvg = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const CheckCircleSvg = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ea580c"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const GiftSvg = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ea580c"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const PinSvg = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailSvg = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneSvg = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function CareersPageContent() {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [modalJob, setModalJob] = useState<JobPosition | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form submission feedback
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [singleSubmitted, setSingleSubmitted] = useState(false);

  // Check URL query parameters or hash on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryJob =
        urlParams.get("delo") ||
        urlParams.get("posao") ||
        window.location.hash.replace("#", "");

      if (queryJob && JOBS_DATA.some((j) => j.slug === queryJob)) {
        setSelectedJobId(queryJob);
      }

      const handlePopState = (e: PopStateEvent) => {
        if (e.state && e.state.view === "single" && e.state.jobId) {
          setSelectedJobId(e.state.jobId);
        } else {
          setSelectedJobId(null);
        }
      };

      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalJob) {
      document.body.classList.add("modalActive");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalJob(null);
          setModalSubmitted(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.classList.remove("modalActive");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.classList.remove("modalActive");
    }
  }, [modalJob]);

  // Toggle Accordion in Hub View
  const handleToggleAccordion = (jobId: string) => {
    if (activeAccordionId === jobId) {
      setActiveAccordionId(null);
    } else {
      setActiveAccordionId(jobId);
    }
  };

  // Open Single Job View
  const handleOpenSingleJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setSingleSubmitted(false);
    if (typeof window !== "undefined") {
      window.history.pushState({ view: "single", jobId }, "", `?delo=${jobId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate back to Hub View
  const handleBackToHub = () => {
    setSelectedJobId(null);
    if (typeof window !== "undefined") {
      window.history.pushState({ view: "hub" }, "", window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Copy Job Link
  const handleCopyLink = (jobId: string) => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${window.location.pathname}?delo=${jobId}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopiedId(jobId);
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      });
    }
  };

  // Open Modal
  const handleOpenModal = (job: JobPosition) => {
    setModalJob(job);
    setModalSubmitted(false);
  };

  // Close Modal
  const handleCloseModal = () => {
    setModalJob(null);
    setModalSubmitted(false);
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2800);
  };

  const handleSingleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSingleSubmitted(true);
  };

  const currentSingleJob = JOBS_DATA.find((j) => j.slug === selectedJobId);

  return (
    <section className={styles.careersSection}>
      {/* Background Ambient Glows */}
      <div className={styles.bgWarmGlow} />
      <div className={styles.bgWarmGlowLeft} />

      <div className={styles.careersContainer}>
        {/* ========================================================================= */}
        {/* 1. HUB VIEW (HARMONIKA PREGLED VSEH DELOVNIH MEST) */}
        {/* ========================================================================= */}
        {!selectedJobId ? (
            <div className={styles.hubView}>
              {/* Header Banner */}
              <div className={styles.hubHeader}>
                <div className={styles.headerContent}>
                  <div className={styles.chapterTagContainer}>
                    <span className={styles.tagGhostWatermark}>EKIPA</span>
                    <div className={styles.chapterIndexTag}>
                      <span className={styles.chapterDash} />
                      <span>POSTANITE DEL EKIPE · KARIERA</span>
                      <span className={styles.chapterDash} />
                    </div>
                  </div>

                  <h1 className={styles.mainTitle}>Delo in zaposlitev v Šeherezadi, Ljubljana</h1>

                  <p className={styles.subtitle}>
                    Pridružite se naši ekipi v centru Ljubljane in soustvarjajte
                    pristne orientalske okuse z naravnimi marinadami, svežo peko
                    lepinj ter spoštljivim odnosom do dela.
                  </p>
                </div>
              </div>

              {/* Table / Accordion Section */}
              <div className={styles.tableSection}>
                {/* Ko ni odprtih mest, prazna tabela z glavo izgleda pokvarjeno.
                    Namesto tega povemo, kako je, in povabimo k oddaji ponudbe. */}
                {!HAS_OPEN_POSITIONS && (
                  <div className={styles.noOpeningsBox}>
                    <h3 className={styles.noOpeningsTitle}>
                      Trenutno nimamo odprtih delovnih mest
                    </h3>
                    <p className={styles.noOpeningsText}>
                      Kljub temu z veseljem prejmemo vašo ponudbo. Pišite nam prek
                      obrazca spodaj ali pošljite življenjepis na e-pošto — ko se
                      odpre mesto, najprej pogledamo prijave, ki jih že imamo.
                    </p>
                  </div>
                )}

                {/* Desktop Column Headers (Hidden on Tablet / Mobile) */}
                {HAS_OPEN_POSITIONS && (
                  <div className={styles.tableHeaderRow}>
                    <span>DELOVNO MESTO</span>
                    <span>LOKACIJA</span>
                    <span className={styles.tableHeaderRight}>TIP ZAPOSLITVE</span>
                  </div>
                )}

                {/* Job Accordion List */}
                <div className={styles.jobsList}>
                  {JOBS_DATA.map((job) => {
                    const isActive = activeAccordionId === job.slug;
                    const isCopied = copiedId === job.slug;

                    return (
                      <div
                        key={job.slug}
                        id={job.slug}
                        className={`${styles.jobRow} ${isActive ? styles.jobRowActive : ""}`}
                      >
                        {/* =======================================================
                            A) DESKTOP ROW HEADER (Visible > 860px)
                            ======================================================= */}
                        <div
                          className={styles.desktopRowHeader}
                          onClick={() => handleToggleAccordion(job.slug)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isActive}
                        >
                          <div className={styles.jobTitleCol}>
                            <span className={styles.jobTitle}>{job.title}</span>
                            <span className={styles.desktopPayTag}>{job.pay}</span>
                          </div>

                          <div className={styles.jobLocationCol}>
                            <span className={styles.desktopLocText}>{job.location}</span>
                          </div>

                          <div className={styles.jobTypeCol}>
                            <span className={styles.jobTypeTag}>{job.type}</span>
                            <button
                              type="button"
                              className={`${styles.arrowBtn} ${
                                isActive ? styles.arrowBtnActive : ""
                              }`}
                              aria-label="Razpri podrobnosti"
                            >
                              <ArrowDownSvg />
                            </button>
                          </div>
                        </div>

                        {/* =======================================================
                            B) MOBILE & TABLET CARD HEADER (Visible <= 860px)
                            ======================================================= */}
                        <div
                          className={styles.mobileCardHeader}
                          onClick={() => handleToggleAccordion(job.slug)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isActive}
                        >
                          {/* 1. Title */}
                          <h3 className={styles.mobileJobTitle}>{job.title}</h3>

                          {/* 2. Salary Row */}
                          <div className={styles.mobileSalaryText}>
                            {job.pay}
                          </div>

                          {/* 3. Type Row */}
                          <div className={styles.mobileTypeText}>
                            {job.type}
                          </div>

                          {/* 4. Bottom Row: Location & Accordion Button */}
                          <div className={styles.mobileBottomBar}>
                            <span className={styles.mobileLocationChip}>
                              <PinSvg size={13} />
                              <span>{job.location}</span>
                            </span>

                            <button
                              type="button"
                              className={`${styles.arrowBtn} ${
                                isActive ? styles.arrowBtnActive : ""
                              }`}
                              aria-label="Razpri podrobnosti"
                            >
                              <ArrowDownSvg />
                            </button>
                          </div>
                        </div>

                        {/* =======================================================
                            EXPANDABLE ACCORDION BODY (Shared Responsive)
                            ======================================================= */}
                        {isActive && (
                          <div className={styles.jobExpandedContent}>
                            <p className={styles.jobDesc}>{job.desc}</p>

                            {/* Vsak oglas ima tudi svojo stran — tam je
                                JobPosting oznaka za Google for Jobs. */}
                            <p className={styles.jobFullPageLink}>
                              <Link href={`/zaposlitev/${job.slug}`}>
                                Odpri celoten oglas &rarr;
                              </Link>
                            </p>

                            <div className={styles.jobSectionBlock}>
                              <span className={styles.jobSectionTitle}>
                                • Odgovornosti in ključne naloge:
                              </span>
                              <ul className={styles.jobBulletList}>
                                {job.tasks.map((task, idx) => (
                                  <li key={idx} className={styles.jobBulletItem}>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className={styles.jobSectionBlock}>
                              <span className={styles.jobSectionTitle}>• Kaj nudimo:</span>
                              <ul className={styles.jobBulletList}>
                                {job.perks.map((perk, idx) => (
                                  <li key={idx} className={styles.jobBulletItem}>
                                    {perk}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.jobActionsRow}>
                              <button
                                type="button"
                                onClick={() => handleOpenModal(job)}
                                className={styles.btnApply}
                              >
                                <span>Hitra Prijava</span>
                                <ArrowUpRightSvg size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenSingleJob(job.slug)}
                                className={styles.btnDetails}
                              >
                                <span>Celoten oglas &amp; deljenje</span>
                                <ExternalLinkSvg size={13} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCopyLink(job.slug)}
                                className={`${styles.btnCopy} ${
                                  isCopied ? styles.btnCopySuccess : ""
                                }`}
                              >
                                <LinkSvg size={13} />
                                <span>
                                  {isCopied ? "Povezava kopirana!" : "Kopiraj povezavo"}
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : currentSingleJob ? (
            /* ========================================================================= */
            /* 2. SINGLE JOB VIEW (ZASEBNA STRAN POSAMEZNEGA OGLASA) */
            /* ========================================================================= */
            <div className={styles.singleJobView}>
              {/* Back to Hub Nav */}
              <div className={styles.singleNavRow}>
                <button
                  type="button"
                  onClick={handleBackToHub}
                  className={styles.backBtn}
                >
                  <ArrowLeftSvg size={16} />
                  <span>Nazaj na vsa delovna mesta</span>
                </button>
              </div>

              {/* Title & Meta */}
              <div className={styles.singleHeaderGroup}>
                <h1 className={styles.singleJobTitle}>
                  {currentSingleJob.title}
                </h1>

                {/* Plača */}
                <div className={styles.metaPayHighlight}>
                  {currentSingleJob.pay}
                </div>

                {/* Lokacija & Tip zaposlitve v istem redu */}
                <div className={styles.singleSubMetaRow}>
                  <span className={styles.singleMetaLocation}>
                    <PinSvg size={14} />
                    <span>{currentSingleJob.location}</span>
                  </span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.singleMetaType}>
                    {currentSingleJob.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className={styles.jobDesc} style={{ fontSize: "1.02rem" }}>
                {currentSingleJob.desc}
              </p>

              {/* Two Column Grid: Responsibilities & Perks */}
              <div className={styles.cardsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailCardTitle}>
                    <CheckCircleSvg size={18} />
                    <span>Ključne odgovornosti in naloge:</span>
                  </span>
                  <ul className={styles.jobBulletList}>
                    {currentSingleJob.tasks.map((task, idx) => (
                      <li key={idx} className={styles.jobBulletItem}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${styles.detailCard} ${styles.detailCardPerks}`}>
                  <span className={styles.detailCardTitle}>
                    <GiftSvg size={18} />
                    <span>Kaj vam ponujamo:</span>
                  </span>
                  <ul className={styles.jobBulletList}>
                    {currentSingleJob.perks.map((perk, idx) => (
                      <li key={idx} className={styles.jobBulletItem}>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Embedded Direct Application Form */}
              <div className={styles.applyFormBlock}>
                <div className={styles.formHeader}>
                  <span className={styles.formOverline}>PRIJAVA NA TO MESTO</span>
                  <h3 className={styles.formTitle}>Oddajte svojo prijavnico</h3>
                  <p className={styles.formSub}>
                    Po oddaji vas bomo kontaktirali v roku 24 ur.
                  </p>
                </div>

                {singleSubmitted ? (
                  <div className={styles.successFeedback}>
                    <span className={styles.successFeedbackTitle}>
                      ✓ Hvala za vašo prijavo!
                    </span>
                    <span className={styles.successFeedbackSub}>
                      Vaša prijava je bila uspešno poslana. Poklicali vas bomo v 24 urah.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSingleSubmit} className={styles.appForm}>
                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          Ime in Priimek *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="npr. Marko Novak"
                          className={styles.inputField}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          Telefonska Številka *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="040 123 456"
                          className={styles.inputField}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        E-poštni Naslov *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="marko@email.com"
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Kratko sporočilo / izkušnje (neobvezno)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Opišite vaše dosedanje delo ali kdaj lahko začnete..."
                        className={styles.inputField}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Pošlji Prijavo
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : null}

          {/* ========================================================================= */}
          {/* 3. HR CONTACT FOOTER SECTION (Desktop text bar + Mobile Quick Action Pills) */}
          {/* ========================================================================= */}
          <div className={styles.hrFooterBar}>
            {/* A) Desktop Bar (> 768px) */}
            <div className={styles.desktopHrContent}>
              <div className={styles.hrItem}>
                <span className={styles.hrLabel}>Neposredni kontakt za življenjepise: </span>
                <a
                  href="mailto:info@seherezada.net"
                  className={styles.hrLink}
                >
                  info@seherezada.net
                </a>
              </div>

              <div className={styles.hrItem}>
                <span className={styles.hrLabel}>Kadrovska služba: </span>
                <a
                  href={`tel:${PHONE.hr.e164}`}
                  className={styles.hrPhoneLink}
                >
                  +386 64 183 155
                </a>
              </div>
            </div>

            {/* B) Mobile & Tablet Touch Action Pills (<= 768px) */}
            <div className={styles.mobileHrContent}>
              <span className={styles.mobileHrOverline}>KONTAKT ZA KANDIDATE &amp; VPRAŠANJA</span>
              <div className={styles.mobilePillsRow}>
                <a
                  href="mailto:info@seherezada.net"
                  className={styles.mobilePillBtn}
                >
                  <div className={styles.mobilePillIcon}>
                    <MailSvg size={15} />
                  </div>
                  <span>Pošlji CV na e-mail</span>
                </a>

                <a
                  href={`tel:${PHONE.hr.e164}`}
                  className={styles.mobilePillBtn}
                >
                  <div className={styles.mobilePillIcon}>
                    <PhoneSvg size={15} />
                  </div>
                  <span>Pokliči kadrovsko</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* 4. MODAL ZA HITRO PRIJAVO (QUICK APPLY MODAL) */}
      {/* ========================================================================= */}
      {modalJob && (
        <div
          className={styles.modalBackdrop}
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className={styles.closeModalBtn}
              aria-label="Zapri modal"
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.modalOverline}>
                PRIJAVA NA DELOVNO MESTO
              </span>
              <h3 className={styles.modalTitle}>{modalJob.title}</h3>
              <p className={styles.modalSub}>
                Izpolnite kratek obrazec in kontaktirali vas bomo v 24 urah.
              </p>
            </div>

            {modalSubmitted ? (
              <div className={styles.successFeedback}>
                <span className={styles.successFeedbackTitle}>
                  ✓ Hvala za vašo prijavo!
                </span>
                <span className={styles.successFeedbackSub}>
                  Vaša prijava na delovno mesto &quot;{modalJob.title}&quot; je
                  bila uspešno poslana.
                </span>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className={styles.appForm}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Ime in Priimek *</label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Marko Novak"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      Telefonska Številka *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="040 123 456"
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      E-poštni Naslov *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marko@email.com"
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Izbrana Pozicija</label>
                  <input
                    type="text"
                    readOnly
                    value={modalJob.title}
                    className={styles.inputField}
                    style={{
                      background: "#faf8f5",
                      fontWeight: 700,
                      color: "#1c1917",
                      cursor: "default",
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Dosedanje izkušnje &amp; opombe (neobvezno)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Opišite vaše dosedanje izkušnje v kuhinji ali kdaj lahko začnete z delom..."
                    className={styles.inputField}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Oddaj Prijavo
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
