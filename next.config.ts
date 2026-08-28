import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // GitHub Pages je opuščen: ni več workflowa, basePath in statičnega izvoza.
  //
  // output: "export" je odstranjen.
  //
  // Statični izvoz zahteva, da ima vsaka dinamična pot vsaj eno stran.
  // Ker trenutno ni nobene objave, /blog/[slug] ne more obstajati.
  // Prav tako izvoz ne podpira middleware, preusmeritev in optimizacije slik —
  // torej natanko tega, kar potrebujemo za večjezičnost in hitrost.
  //
  // Naslednji korak: gostovanje na Vercelu (glej Fazo 3 v načrtu).
  allowedDevOrigins: ["192.168.1.88", "localhost:3001", "192.168.1.88:3001"],
  images: {
    // unoptimized je bil potreben samo zaradi statičnega izvoza.
    // Zdaj Next slike sam pretvori v AVIF/WebP in jih postreže v pravi velikosti.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Vklopi next-intl. Brez tega ovoja Next ne najde src/i18n/request.ts
// in besedila se ne naložijo.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
