import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangZaSlug, localizedSlugUrl } from "@/i18n/urls";
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
    priceRange: "€€",
    hasMenu: `${BASE}/meni`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      postalCode: loc.postalCode,
      addressCountry: "SI",
    },
    openingHoursSpecification: openingHours,
  };

  return (
    <main>
      {/* Samo dva člena: poti /lokacije ni, obstajata le strani poslovalnic. */}
      <BreadcrumbJsonLd
        items={[{ name: tn("domov"), path: "/" }, { name: loc.name }]}
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

/**
 * Dneve z enakim časom združi v en zapis, kot pričakuje Google.
 * Kadar je closes manjši od opens (npr. 09:00–03:00), Google to razume
 * kot zapiranje naslednji dan.
 */
function groupHours(hours: { day: string; time: string }[]) {
  // Google pričakuje angleška imena dni. Vzamemo jih po ZAPOREDJU, ne po
  // slovenskem imenu: seznam se v src/data/locations.ts vedno začne s
  // ponedeljkom, imena dni pa se v drugih jezikih prevedejo — iskanje po
  // imenu bi takrat tiho vrnilo prazno.
  const EN = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const byTime = new Map<string, string[]>();
  hours.forEach((h, i) => {
    const key = h.time;
    if (!byTime.has(key)) byTime.set(key, []);
    byTime.get(key)!.push(EN[i]);
  });

  return [...byTime.entries()].map(([time, days]) => {
    const [opens, closes] = time.split("–").map((t) => t.trim());
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}
