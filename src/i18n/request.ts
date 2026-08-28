import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// ---------------------------------------------------------------------------
// Za vsako zahtevo pove, kateri jezik velja in kje so besedila zanj.
//
// Če pride neznana oznaka jezika, ne pademo v napako, ampak na slovenščino.
// ---------------------------------------------------------------------------

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
