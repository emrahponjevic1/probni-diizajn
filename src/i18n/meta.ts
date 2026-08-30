import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangZaPot, localizedUrl } from "./urls";
import type { AppLocale, StaticPathname } from "./urls";
import { SHARE_IMAGE, SITE_NAME, localeByCode } from "@/data/site";

// ---------------------------------------------------------------------------
// NASLOVI STRANI ZA ISKALNIK IN ZA DELJENJE POVEZAVE
//
// Vsaka stran ima naslov in opis, ki ju Google pokaže v zadetkih. Ker gresta
// v šest jezikov, sta v messages/<jezik>.json pod ključem "meta".
//
// KANONIČNI NASLOV
// Vsaka jezikovna različica kaže SAMA NASE: /de/speisekarte na
// /de/speisekarte, ne na slovenski /meni. Če bi kazala na slovenskega, bi
// Google prevedene strani obravnaval kot podvojene in jih izpustil iz
// zadetkov — s tem bi bilo prevajanje zaman.
//
// SLIKA ZA DELJENJE
// Slika je tu namenoma, čeprav jo postavlja že layout. Next namreč bloka
// openGraph ne zlije, ampak ga zamenja: stran, ki je imela svoj openGraph
// (Kontakt, O nas, Blog, Zaposlitev), je ostala BREZ slike in je predogled
// v WhatsAppu ali na Facebooku prikazal prazno polje. Ker naslov strani zdaj
// prevajamo, blok potrebuje vsaka stran — in z njim tudi sliko.
// ---------------------------------------------------------------------------

export async function metaZaStran(opts: {
  locale: string;
  /** Notranja pot, npr. "/meni". Pravi naslov za jezik izračuna localizedUrl. */
  pot: StaticPathname;
  /** Ključa v prevodih, brez predpone "meta.". */
  naslovKljuc: string;
  opisKljuc: string;
  /** Vrednosti, ki jih besedilo vstavi (cena, telefon, števila). */
  vrednosti?: Record<string, string | number>;
  /** Ločen, krajši opis za deljenje povezave. Kadar ga ni, se vzame glavni. */
  ogOpisKljuc?: string;
}): Promise<Metadata> {
  // Brez te vrstice Next strani ne zgradi vnaprej, ampak ob vsakem obisku.
  setRequestLocale(opts.locale);

  const t = await getTranslations({ locale: opts.locale, namespace: "meta" });
  const v = opts.vrednosti ?? {};

  const naslov = t(opts.naslovKljuc, v);
  const opis = t(opts.opisKljuc, v);
  const naslovStrani = localizedUrl(opts.pot, opts.locale as AppLocale);

  return {
    alternates: {
      canonical: naslovStrani,
      // Vseh šest jezikovnih različic te iste strani + x-default.
      languages: hreflangZaPot(opts.pot),
    },
    title: naslov,
    description: opis,
    openGraph: {
      title: naslov,
      description: opts.ogOpisKljuc ? t(opts.ogOpisKljuc, v) : opis,
      type: "website",
      url: naslovStrani,
      siteName: SITE_NAME,
      // og:locale pričakuje obliko jezik_DRŽAVA; naš zapis je sl-SI.
      locale: localeByCode(opts.locale).hreflang.replace("-", "_"),
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
