// ---------------------------------------------------------------------------
// PRAVNI PODATKI O PODJETJU — EDINI VIR
//
// Ime blagovne znamke ("Šeherezada") ni isto kot ime pravne osebe. V pravnih
// besedilih — politiki zasebnosti, politiki piškotkov, splošnih pogojih —
// mora biti naveden upravljavec, torej podjetje, ne znamka.
//
// Podatki o poslovalnicah, delovnem času in telefonu so v src/data/locations.ts.
// Tu je samo tisto, kar pravno besedilo zahteva.
// ---------------------------------------------------------------------------

/**
 * Elektronski naslov podjetja — EDINI zapis v celotni kodi.
 *
 * Prej je bil ročno prepisan na osmih mestih: v nogi, na strani za zaposlitev
 * (trikrat), pri obeh poslovalnicah in tu. Ko obrazec dobi še strežniško pot,
 * bi bilo deveto. Isti vzorec nas je že stal napačnega zemljevida, zato je
 * naslov od zdaj tu, vse ostalo ga uvozi.
 */
const EMAIL = "info@seherezada.net";

export const COMPANY = {
  /** Uradno ime pravne osebe, kot je vpisano v register. */
  legalName: "ADL d.o.o.",
  /** Ime, pod katerim nas gostje poznajo. */
  brandName: "Šeherezada",
  /** Naslov sedeža. */
  address: "Trubarjeva cesta 31, 1000 Ljubljana, Slovenija",
  /** Matična (registracijska) številka. */
  registrationNumber: "3999521000",
  /** Elektronski naslov za vsa vprašanja gostov. */
  email: EMAIL,
  /** Elektronski naslov za vprašanja o zasebnosti — isti predal. */
  privacyEmail: EMAIL,
} as const;
