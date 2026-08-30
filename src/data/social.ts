// ---------------------------------------------------------------------------
// DRUŽBENA OMREŽJA — EDINI VIR
//
// Prej sta bili povezavi zapisani na dveh mestih (noga in stran Kontakt) in
// sta se že razšli: v nogi je Instagram imel uporabniško ime, na Kontaktu ne.
// Predvsem pa nobena ni vodila na profil — vse tri so kazale na korenino
// Facebooka, Instagrama in TikToka, ob njih pa je pisalo ime profila, kot da
// obstaja. Gost je kliknil "Facebook stran — Šeherezada Ljubljana" in pristal
// na prazni naslovnici Facebooka.
//
// PRAVILO
// Prazen `url` pomeni, da omrežja NIMAMO. Gumb se takrat sploh ne izriše —
// ne ikona, ne ime. Enako kot pri gumbu za Wolt: raje brez gumba kot gumb v
// prazno.
//
// KAKO DODAŠ OMREŽJE
// Odpri profil v brskalniku, prekopiraj naslov iz naslovne vrstice in ga
// prilepi v `url`. V `oznaka` napiši, kako naj piše ob ikoni — uporabniško
// ime ali ime strani. Ikona se pojavi sama, v nogi in na strani Kontakt.
//
//   instagram: { url: "https://www.instagram.com/seherezada_si/", oznaka: "@seherezada_si" }
//
// Oznaka NI prevod: uporabniško ime je enako v vseh šestih jezikih, zato je
// tu, med podatki, in ne v messages/<jezik>.json.
// ---------------------------------------------------------------------------

export interface SocialNetwork {
  /** Cel naslov profila. Prazno = omrežja nimamo, gumb se ne izriše. */
  url: string;
  /** Kar piše ob ikoni: "@seherezada_si" ali "Šeherezada Ljubljana". */
  oznaka: string;
}

export const SOCIAL: Record<"instagram" | "facebook" | "tiktok", SocialNetwork> = {
  instagram: { url: "", oznaka: "" },
  facebook: { url: "", oznaka: "" },
  tiktok: { url: "", oznaka: "" },
};

/** Ali imamo sploh kakšno omrežje. Če ne, se skrije tudi okvir okoli ikon. */
export const HAS_SOCIAL = Object.values(SOCIAL).some((s) => s.url !== "");
