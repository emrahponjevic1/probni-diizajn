// ---------------------------------------------------------------------------
// POGOSTA VPRAŠANJA O HALALU
//
// Ločen modul in ne del HalalPageContent.tsx: ta je odjemalska komponenta
// ("use client"), iz nje pa strežnik ne more brati navadnih izvozov. Stran
// /halal iz teh podatkov sestavi FAQPage schemo, komponenta pa harmoniko —
// oba bereta isti vir, zato se ne moreta razhajati.
// ---------------------------------------------------------------------------

export interface HalalFaq {
  id: string;
  q: string;
  a: string;
}

export const HALAL_FAQS: HalalFaq[] = [
  {
    id: "hfaq-1",
    q: "Ali je res celotna ponudba mesa v Šeherezadi 100 % halal?",
    a: "Da, brez izjeme. Vse telečje in piščančje meso za döner kebab, jufke, krožnike in plošče prihaja izključno iz nadzorovanih evropskih virov z veljavnimi mednarodnimi halal certifikati. V naših kuhinjah ni nobenega necertificiranega mesa.",
  },
  {
    id: "hfaq-2",
    q: "Kakšno šunko uporabljate na picah in v drugih jedeh?",
    a: "Na vseh naših picah (npr. Pizza Klasika) uporabljamo izključno 100 % halal puranjo šunko. Nobena jed na meniju ne vsebuje svinjskega mesa, pršuta ali svinjske slanine.",
  },
  {
    id: "hfaq-3",
    q: "Ali točite alkohol ali ga uporabljate pri kuhanju?",
    a: "Ne. V restavraciji Šeherezada ne točimo alkoholnih pijač, prav tako alkohola, vina ali alkoholnih ekstraktov ne uporabljamo v nobenih marinadah, omakah ali testu.",
  },
  {
    id: "hfaq-4",
    q: "Ali so tudi študentski boni 100 % halal?",
    a: "Vseh 19 jedi na študentski bon je pripravljenih po enakih strogih halal standardih iz enakega svežega certificiranega mesa ali rastlinskih sestavin kot jedi po rednem ceniku.",
  },
  {
    id: "hfaq-5",
    q: "Kje si lahko ogledam originalni halal certifikat?",
    a: "Uradni halal certifikat je stalno fizično izobešen na vidnem mestu ob naročniškem pultu v obeh naših poslovalnicah — na Trubarjevi cesti 31 in Slovenski cesti 55 v Ljubljani.",
  },
  {
    id: "hfaq-6",
    q: "Ali so falafli in vegetarijanske jedi pripravljeni ločeno od mesa?",
    a: "Da, falafli in rastlinske jedi se pripravljajo po strogih higienskih postopkih s čisto opremo, kar preprečuje navzkrižni stik in zagotavlja popolno varnost tako za halal kot za veganske in vegetarijanske goste.",
  },
];
