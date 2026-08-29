// ---------------------------------------------------------------------------
// PODATKI ZA STRAN KONTAKT
//
// Tu je bila prej svoja kopija obeh poslovalnic — z imenoma "Šeherezada
// Trubarjeva" in "Šeherezada Slovenska", ki se nista ujemali z uradnim imenom
// na Google Business Profilu, in s svojim delovnim časom, ki se je razhajal
// s cenikom.
//
// Zdaj je vse izpeljano iz src/data/locations.ts. Popravek na enem mestu
// popravi celotno stran.
// ---------------------------------------------------------------------------

import { LOCATIONS, PHONE, type LocationId } from "@/data/locations";
import { useLocationText } from "@/i18n/locationText";

export interface LocationDetail {
  id: LocationId;
  name: string;
  badge: string;
  subtitle: string;
  /** Ulica in hišna številka. */
  address: string;
  /** Poštna številka in kraj. */
  city: string;
  phone: string;
  phoneRaw: string;
  email: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
  googleMapsEmbed: string;
  transport: {
    lpp: string;
    parking: string;
    walking: string;
  };
  vibeText: string;
}

/**
 * Opis lokala in navodila za prevoz gredo skozi prevod — brez tega bi na
 * tuji strani ostala slovenska besedila. Naslov, telefon in povezave do
 * zemljevidov so dejstva in ostanejo iz locations.ts.
 */
export function useContactLocations(): LocationDetail[] {
  const prevediLokal = useLocationText();

  return LOCATIONS.map(prevediLokal).map((l) => ({
    id: l.id,
    name: l.name,
    badge: l.badge,
    subtitle: l.subtitle,
    address: l.street,
    city: `${l.postalCode} ${l.city}`,
    phone: PHONE.restaurant.display,
    phoneRaw: PHONE.restaurant.e164,
    email: l.email,
    googleMapsUrl: l.googleMapsUrl,
    appleMapsUrl: l.appleMapsUrl,
    googleMapsEmbed: l.mapEmbed,
    transport: l.transport,
    vibeText: l.vibeText,
  }));
}
