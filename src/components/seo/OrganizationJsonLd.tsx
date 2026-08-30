import { LOCATIONS, LOCATION_SLUG, PHONE } from "@/data/locations";
import { groupHours } from "@/lib/hours";
import { COMPANY } from "@/data/company";
import { LOGO, SHARE_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/data/site";
import { localizedUrl } from "@/i18n/urls";
import type { AppLocale } from "@/i18n/urls";

/**
 * ORGANIZATION — kdo smo, za iskalnik
 *
 * Restaurant oznaka na straneh poslovalnic pove, kakšen je posamezen lokal.
 * Ta oznaka pove, da oba pripadata istemu podjetju — in poveže znamko
 * Šeherezada s pravno osebo ADL d.o.o.
 *
 * Vsi podatki so prebrani iz locations.ts in company.ts. Nič ni prepisano,
 * zato se ne more razhajati s tem, kar piše na strani.
 *
 * Namenoma NI aggregateRating: Google od 2019 ignorira ocene, ki jih podjetje
 * objavi samo o sebi. Zvezdice v iskalniku pridejo iz Google profila.
 */
export default function OrganizationJsonLd({ locale }: { locale: AppLocale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    // Google od tod vzame logotip za znamko ob zadetku.
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${LOGO.src}`,
      width: LOGO.width,
      height: LOGO.height,
    },
    image: `${SITE_URL}${SHARE_IMAGE.src}`,
    /**
     * Povezava na Google Business Profila obeh lokalov. S tem Googlu
     * povemo, da sta ta stran in profila na zemljevidu isti posel — prej
     * je to moral ugibati. Odkrito v neodvisni reviziji (6C.5).
     */
    sameAs: LOCATIONS.map((loc) => loc.googleProfileUrl),
    /**
     * Meni ima svojo oznako na /meni s svojim @id. Prej sta stali druga ob
     * drugi in Google ni vedel, da sta povezani (6C.2).
     */
    hasMenu: `${localizedUrl("/meni", locale)}#menu`,
    telephone: PHONE.restaurant.e164,
    email: COMPANY.privacyEmail,
    servesCuisine: ["Kebab", "Turkish", "Falafel", "Pizza", "Halal"],
    priceRange: "€",
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCATIONS[0].street,
      postalCode: LOCATIONS[0].postalCode,
      addressLocality: LOCATIONS[0].city,
      addressCountry: "SI",
    },
    /** Koordinate glavnega lokala; vsak lokal ima svoje na svoji strani. */
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCATIONS[0].geo.lat,
      longitude: LOCATIONS[0].geo.lng,
    },
    /**
     * Delovni čas se izpelje iz istega seznama, ki ga vidi gost. Prej ga
     * ta oznaka sploh ni imela (6C.3).
     */
    openingHoursSpecification: groupHours(LOCATIONS[0].hours),
    // Vsaka poslovalnica ima svojo stran s svojo Restaurant oznako; tu ju
    // samo povežemo, da Google ve, da gre za isto podjetje.
    department: LOCATIONS.map((loc) => ({
      "@type": "Restaurant",
      "@id": `${absoluteUrl(`/lokacije/${LOCATION_SLUG[loc.id]}`)}#restaurant`,
      name: loc.name,
      url: absoluteUrl(`/lokacije/${LOCATION_SLUG[loc.id]}`),
      sameAs: loc.googleProfileUrl,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
