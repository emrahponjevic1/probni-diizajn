import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Animated Glows & Grid */}
      <div className={styles.bgGlowContainer}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.heroContent}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Novi Next.js Projekat</span>
        </div>

        {/* Heading */}
        <h1 className={styles.title}>
          Dobrodošli na vašu novu <br />
          <span className={styles.gradientText}>Hero Sekciju</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Moderno dizajnirana, brza i u potpunosti prilagođena Next.js stranica. 
          Spremna za vaš dalji sadržaj i prilagođavanje.
        </p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>
            Započni odmah &rarr;
          </button>
          <button className={styles.secondaryBtn}>
            Saznaj više
          </button>
        </div>

        {/* Stats / Highlights */}
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Performanse</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Next.js 15</span>
            <span className={styles.statLabel}>App Router</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Modern UI</span>
            <span className={styles.statLabel}>Responsive & Glassmorphism</span>
          </div>
        </div>
      </div>
    </section>
  );
}
