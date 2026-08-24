import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) return { title: "Poslovalnica ni najdena | Šeherezada" };

  const url = `${BASE}/lokacije/${slug}`;

  return {
    title: `${loc.name}, ${loc.street} — halal kebab v Ljubljani`,
    description: `${loc.name} na naslovu ${loc.fullAddress}. Odprto ${loc.hoursShort}. Kako priti, parkiranje in celoten meni s študentskimi boni.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${loc.name} — ${loc.street}, Ljubljana`,
      description: loc.vibeText,
      url,
      type: "website",
      locale: "sl_SI",
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNavbar activeRoute="kontakt" />
      <LocationPageContent
        loc={loc}
        slug={slug}
        dishCount={dishes.length}
        other={{ name: other.name, slug: LOCATION_SLUG[other.id], street: other.street }}
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
  const EN: Record<string, string> = {
    Ponedeljek: "Monday",
    Torek: "Tuesday",
    Sreda: "Wednesday",
    Četrtek: "Thursday",
    Petek: "Friday",
    Sobota: "Saturday",
    Nedelja: "Sunday",
  };

  const byTime = new Map<string, string[]>();
  for (const h of hours) {
    const key = h.time;
    if (!byTime.has(key)) byTime.set(key, []);
    byTime.get(key)!.push(EN[h.day]);
  }

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
