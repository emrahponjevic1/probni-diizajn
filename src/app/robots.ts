import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// ---------------------------------------------------------------------------
// ROBOTS.TXT — kaj sme iskalnik brati in kje najde sitemap
//
// Brez te datoteke mora Google sam ugibati, kje je seznam strani. S sitemapom
// mu ga pokažemo naravnost.
//
// Prepovedani sta samo notranji poti Nexta in obdelava slik: gostu ne pomenita
// nič, iskalniku pa jemljeta čas, ki bi ga lahko porabil za prave strani.
// ---------------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
