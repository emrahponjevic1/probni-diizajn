import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// ---------------------------------------------------------------------------
// Prestreže vsako zahtevo in ugotovi, za kateri jezik gre.
//
// V Next 16 se ta datoteka imenuje proxy.ts (prej middleware.ts).
// Vsebina je ista, ime je novo.
//
// VZOREC
// [^.]* pomeni "pot brez pike". S tem izpustimo datoteke — slike,
// favicon.ico, sitemap.xml, robots.txt, llms.txt — ki ne smejo dobiti
// jezikovne predpone, sicer jih Google ne najde.
//
// Namerno ni zapisano kot ".*\..*", čeprav je to običajni vzorec:
// tam morata biti dve poševnici in če se ena izgubi pri urejanju, vzorec
// tiho neha loviti karkoli. Build tega ne javi. [^.]* nima te pasti.
// ---------------------------------------------------------------------------

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel)[^.]*)",
};
