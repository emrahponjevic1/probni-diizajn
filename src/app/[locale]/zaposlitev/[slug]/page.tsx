import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangZaSlug, localizedSlugUrl } from "@/i18n/urls";
import type { AppLocale } from "@/i18n/urls";
import { SHARE_IMAGE, SITE_NAME, localeByCode } from "@/data/site";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tm = await getTranslations({ locale, namespace: "meta" });
  const job = jobBySlug(slug);

  if (!job) return { title: tm("oglasNiNajden") };

  // Kanonični naslov kaže na to stran v tem jeziku, ne na slovensko.
  const url = localizedSlugUrl("/zaposlitev/[slug]", job.slug, locale as AppLocale);

  return {
    title: tm("oglasNaslov", { mesto: job.title }),
    description: job.desc,
    alternates: {
      canonical: url,
      // Vseh šest jezikovnih različic te iste strani + x-default.
      languages: hreflangZaSlug("/zaposlitev/[slug]", job.slug),
    },
    openGraph: {
      title: tm("oglasOgNaslov", { mesto: job.title }),
      description: job.desc,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: localeByCode(locale).hreflang.replace("-", "_"),
      images: [
        {
          url: SHARE_IMAGE.src,
          width: SHARE_IMAGE.width,
          height: SHARE_IMAGE.height,
          alt: tm("ogSlikaOpis"),
        },
      ],
    },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Drobtine bere Google in jih pokaže pod naslovom v zadetkih.
  const tn = await getTranslations({ locale, namespace: "navigacija" });
  const t = await getTranslations({ locale, namespace: "oglasStran" });

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
      <BreadcrumbJsonLd
        items={[
          { name: tn("domov"), path: "/" },
          { name: tn("zaposlitev"), path: "/zaposlitev" },
          { name: job.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavbar activeRoute="zaposlitev" />

      <section className={styles.careersSection}>
        <div className={styles.container}>
          <nav aria-label="Drobtice" style={{ marginBottom: "1.5rem" }}>
            <Link href="/zaposlitev">{t("vsaMesta")}</Link>
          </nav>

          <span>{job.badge}</span>
          <h1>{job.title}</h1>

          <ul>
            <li>{t("lokacija", { vrednost: job.location })}</li>
            <li>{t("tipZaposlitve", { vrednost: job.type })}</li>
            {job.pay && <li>{t("placilo", { vrednost: job.pay })}</li>}
            <li>
              {t("veljaDo")}{" "}
              <time dateTime={job.validThrough}>{job.validThrough}</time>
            </li>
          </ul>

          <p>{job.desc}</p>

          <h2>{t("kajBostesDelali")}</h2>
          <ul>
            {job.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h2>{t("kajPonujamo")}</h2>
          <ul>
            {job.perks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <p>
            <Link href="/zaposlitev">{t("prijaviSe")}</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
