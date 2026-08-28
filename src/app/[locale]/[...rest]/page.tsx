import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// LOVILEC NEZNANIH NASLOVOV
//
// Brez te datoteke naslov, ki ne obstaja (npr. /asdf), pade mimo jezikovne
// veje in Next pokaže svojo golo stran "404: This page could not be found."
// Gost tam nima ne navigacije ne poti nazaj.
//
// Ta stran ne prikaže ničesar svojega — samo pove Nextu, naj uporabi
// not-found.tsx iz iste mape, kjer je naša 404 z navigacijo in nogo.
// ---------------------------------------------------------------------------

export default function CatchAll() {
  notFound();
}
