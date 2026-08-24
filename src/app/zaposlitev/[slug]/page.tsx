import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { OPEN_POSITIONS, jobBySlug } from "@/data/jobs";
import { LOCATIONS } from "@/data/locations";
import styles from "@/components/careers/CareersPageContent.module.css";

const BASE = "https://seherezada.net";

/** Vsako odprto mesto dobi svojo stran. Slug pride iz src/data/jobs.ts. */
export function generateStaticParams() {
  return OPEN_POSITIONS.map((job) => ({ slug: job.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = jobBySlug(slug);

  if (!job) return { title: "Delovno mesto ni najdeno | Šeherezada" };

  const url = `${BASE}/zaposlitev/${job.slug}`;

  return {
    title: `${job.title} — zaposlitev v Ljubljani | Šeherezada`,
    description: job.desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${job.title} — Šeherezada Ljubljana`,
      description: job.desc,
      url,
      type: "website",
      locale: "sl_SI",
    },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobBySlug(slug);

  if (!job) notFound();

  const loc = LOCATIONS[0];

  /**
   * JobPosting je eden redkih tipov, ki restavraciji prinese pravi rezultat
   * v Googlu — brezplačno oglaševanje v Google for Jobs.
   *
   * Pravila, ki jih ta stran spoštuje:
   *   • en oglas na en naslov (zato ta ločena stran, ne seznam)
   *   • vse, kar je v podatkih, je tudi vidno na strani
   *   • validThrough je obvezen, sicer pretečeni oglasi ostanejo v iskalniku
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.desc,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.type.toLowerCase().includes("študent")
      ? "PART_TIME"
      : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Šeherezada",
      sameAs: BASE,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.street,
        addressLocality: loc.city,
        postalCode: loc.postalCode,
        addressCountry: "SI",
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavbar activeRoute="zaposlitev" />

      <section className={styles.careersSection}>
        <div className={styles.container}>
          <nav aria-label="Drobtice" style={{ marginBottom: "1.5rem" }}>
            <Link href="/zaposlitev">&larr; Vsa delovna mesta</Link>
          </nav>

          <span>{job.badge}</span>
          <h1>{job.title}</h1>

          <ul>
            <li>Lokacija: {job.location}</li>
            <li>Tip zaposlitve: {job.type}</li>
            {job.pay && <li>Plačilo: {job.pay}</li>}
            <li>
              Oglas velja do:{" "}
              <time dateTime={job.validThrough}>{job.validThrough}</time>
            </li>
          </ul>

          <p>{job.desc}</p>

          <h2>Kaj boste delali</h2>
          <ul>
            {job.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h2>Kaj ponujamo</h2>
          <ul>
            {job.perks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <p>
            <Link href="/zaposlitev">Prijavi se prek obrazca</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
