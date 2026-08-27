import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/data/site";

// ---------------------------------------------------------------------------
// ROBOTS.TXT — kaj sme iskalnik brati in kje najde sitemap
//
// Datoteka ima dve stanji, odvisno od IS_LIVE (glej src/data/site.ts):
//
//   ni v živo   vse prepovedano — da se začasni naslov *.vercel.app ne
//               indeksira in ne konkurira pravi domeni
//   v živo      vse dovoljeno, razen tehničnih poti, ki gostu nič ne pomenijo
//
// robots.txt sam po sebi NE zagotovi, da naslov ne bo nikoli naveden v
// iskalniku — če nanj kaže povezava z drugega mesta, ga Google lahko izpiše
// brez opisa. Zato je poleg tega v layout.tsx še oznaka noindex, ki je
// dokončna. Obe stanji upravlja isto stikalo.
// ---------------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Notranje poti Nexta in obdelava slik. Gostu ne pomenijo nič, Googlu
      // pa jemljejo čas, ki bi ga lahko porabil za prave strani.
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
