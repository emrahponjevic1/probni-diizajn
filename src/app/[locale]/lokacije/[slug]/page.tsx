import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangZaSlug, localizedSlugUrl, localizedUrl } from "@/i18n/urls";
import { imeMesta, locationTextZaJezik } from "@/i18n/locationText.server";
import type { AppLocale } from "@/i18n/urls";
import { SHARE_IMAGE, SITE_NAME, localeByCode } from "@/data/site";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LocationPageContent from "@/components/locations/LocationPageContent";
import {
  LOCATIONS,
  LOCATION_SLUG,
  locationBySlug,
  PHONE,
} from "@/data/locations";
import { itemsForLocation } from "@/components/menu/MenuData";
import { groupHours } from "@/lib/hours";

const BASE = "https://seherezada.net";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: LOCATION_SLUG[l.id] }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const surovi = locationBySlug(slug);
  if (!surovi) return { title: t("lokacijaNiNajdena") };

  // Meta oznake berejo iz istega prevajalskega sloja kot vidni del strani.
  // Prej so brale naravnost iz locations.ts, zato so na tujih jezikih
  // ostajale slovenske — glej locationText.server.ts.
  const prevedi = await locationTextZaJezik(locale);
  const loc = prevedi(surovi);
  const mesto = await imeMesta(locale, surovi.city);

  // Kanonični naslov kaže na to stran v tem jeziku, ne na slovensko.
  const url = localizedSlugUrl("/lokacije/[slug]", slug, locale as AppLocale);

  return {
    title: t("lokacijaNaslov", { ime: loc.name, ulica: loc.street }),
    description: t("lokacijaOpis", {
      ime: loc.name,
      naslov: loc.fullAddress,
      urnik: loc.hoursShort,
    }),
    alternates: {
      canonical: url,
      // Vseh šest jezikovnih različic te iste strani + x-default.
      languages: hreflangZaSlug("/lokacije/[slug]", slug),
    },
    openGraph: {
      title: t("lokacijaOgNaslov", {
        ime: loc.name,
        ulica: loc.street,
        mesto,
      }),
      description: loc.vibeText,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: localeByCode(locale).og,
      images: [
        {
          url: SHARE_IMAGE.src,
          width: SHARE_IMAGE.width,
          height: SHARE_IMAGE.height,
          alt: t("ogSlikaOpis"),
        },
      ],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Drobtine bere Google in jih pokaže pod naslovom v zadetkih, zato morajo
  // biti v jeziku strani.
  const tn = await getTranslations({ locale, namespace: "navigacija" });

  const loc = locationBySlug(slug);
  if (!loc) notFound();

  const dishes = itemsForLocation(loc.id);
  const other = LOCATIONS.find((l) => l.id !== loc.id)!;

  /**
   * Restaurant oznaka za TA lokal — ne za podjetje kot celoto.
   * Vsak lokal ima svoj @id, svoj naslov in svoj delovni čas, tako da
   * Google ve, da gre za dve ločeni poslovalnici, in ju lahko poveže
   * z ustreznim Google Business Profilom.
   *
   * Ocen (AggregateRating) namenoma NI: Google od 2019 ignorira ocene,
   * ki jih podjetje objavi samo o sebi.
   */
  const openingHours = groupHours(loc.hours);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${BASE}/lokacije/${slug}#restaurant`,
    name: loc.name,
    url: `${BASE}/lokacije/${slug}`,
    telephone: PHONE.restaurant.e164,
    email: loc.email,
    servesCuisine: ["Turkish", "Kebab", "Falafel", "Pizza", "Halal"],
    // Isti lokal je tu imel "€€", oznaka podjetja pa "€". Google vzame eno
    // in ne vemo katero. Jedi gredo od 1,00 € — pravilno je "€" (6C.1).
    priceRange: "€",
    // Isti @id kot ga ima oznaka menija na tej jezikovni različici —
    // sicer bi kazal na vozlišče, ki na tej strani ne obstaja (6C.2).
    hasMenu: `${localizedUrl("/meni", locale as AppLocale)}#menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      postalCode: loc.postalCode,
      addressCountry: "SI",
    },
    openingHoursSpecification: openingHours,
    /** Koordinate vhoda, odčitane na Google Zemljevidih (6C.4). */
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    /** Google Business Profil TEGA lokala, ne podjetja kot celote (6C.5). */
    sameAs: loc.googleProfileUrl,
    /**
     * Google si za lokal želi sliko. Fotografij lokalov še ni (polja v
     * locations.ts so prazna namenoma), zato gre zaenkrat skupna slika
     * spletnega mesta — prava, ne izmišljena (6C.3).
     */
    image: `${BASE}${SHARE_IMAGE.src}`,
  };

  return (
    <main>
      {/* Trije členi: stran /lokacije zdaj obstaja, prej je vračala 404 in
          je bil zato srednji člen izpuščen (6D.3). */}
      <BreadcrumbJsonLd
        items={[
          { name: tn("domov"), path: "/" },
          { name: tn("lokaciji"), path: "/lokacije" },
          { name: loc.name },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavbar activeRoute="kontakt" />
      <LocationPageContent
        loc={loc}
        slug={slug}
        dishCount={dishes.length}
        other={{
          name: other.name,
          slug: LOCATION_SLUG[other.id],
          street: other.street,
          city: other.city,
        }}
      />
      <SiteFooter />
    </main>
  );
}

