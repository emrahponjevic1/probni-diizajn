import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// ---------------------------------------------------------------------------
// Za vsako zahtevo pove, kateri jezik velja in kje so besedila zanj.
//
// ZAKAJ SE BESEDILA ZLIJEJO S SLOVENSKIMI
//
// Če v nemškem prevodu kakšna vrstica manjka, stran ne sme pokazati ključa
// (npr. "cookies.title") in ne sme pasti. Pokaže naj slovensko besedilo.
//
// To ni samo za čas prevajanja. Tudi pozneje, ko bomo na stran dodali nov
// odstavek, bo ta najprej obstajal samo v slovenščini — in do prevoda bo
// gost videl slovensko poved namesto luknje.
//
// Zlivanje gre v globino: nemški {meni: {naslov}} se dopolni s slovenskim
// {meni: {naslov, opis}}, ne pa da nemški objekt povozi celega.
// ---------------------------------------------------------------------------

type Slovar = { [k: string]: string | Slovar };

function zlij(osnova: Slovar, vrh: Slovar): Slovar {
  const rezultat: Slovar = { ...osnova };
  for (const [kljuc, vrednost] of Object.entries(vrh)) {
    const obstojece = rezultat[kljuc];
    rezultat[kljuc] =
      typeof vrednost === "object" && typeof obstojece === "object"
        ? zlij(obstojece, vrednost)
        : vrednost;
  }
  return rezultat;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const slovenska: Slovar = (await import("../../messages/sl.json")).default;

  const messages =
    locale === routing.defaultLocale
      ? slovenska
      : zlij(slovenska, (await import(`../../messages/${locale}.json`)).default);

  return { locale, messages };
});
