// ---------------------------------------------------------------------------
// ODPRTA DELOVNA MESTA — EDINI VIR
//
// ===========================================================================
//  KAKO DODAM OGLAS?
//
//  1. Kopiraj cel blok med /* ZAČETEK PREDLOGE */ in /* KONEC PREDLOGE */
//  2. Prilepi ga med oglate oklepaje OPEN_POSITIONS spodaj
//  3. Zamenjaj besedilo. Vsa polja so obvezna, razen `pay`.
//  4. Shrani. Oglas se takoj pojavi na strani /zaposlitev.
//
//  KAKO ODSTRANIM OGLAS?
//  Izbriši njegov blok. Če ne ostane noben, stran sama pokaže sporočilo,
//  da trenutno ni odprtih mest, in povabi k oddaji ponudbe.
//
//  SLUG = del naslova strani
//  slug: "zar-mojster"  ->  seherezada.net/zaposlitev/zar-mojster
//  Male črke in vezaji, brez šumnikov. Ko je oglas javen, ga ne spreminjaj.
//
//  POZOR — `pay` (plača):
//  Piši ga samo, če je znesek res dogovorjen. Izmišljena plača v oglasu je
//  zavajajoča za kandidata. Če ni določena, polje preprosto izpusti.
// ===========================================================================
//
// Prejšnja različica strani je vsebovala tri izmišljene oglase z izmišljenimi
// plačami. Odstranjeni so: restavracija trenutno nima odprtih mest.
// ---------------------------------------------------------------------------

export interface JobPosition {
  /** Del naslova strani: /zaposlitev/<slug>. Male črke in vezaji, brez šumnikov. */
  slug: string;
  /** Majhna oznaka nad naslovom, npr. "Kuhinja • Žar" */
  badge: string;
  /** Naziv delovnega mesta */
  title: string;
  /** Plača — IZPUSTI, če ni dogovorjena. Nikoli ne ugibaj zneska. */
  pay?: string;
  /** npr. "Ljubljana, Trubarjeva 31" */
  location: string;
  /** npr. "Polni delovni čas" ali "Študentsko delo" */
  type: string;
  /** Dva do trije stavki o delu */
  desc: string;
  /** Kaj bo oseba delala */
  tasks: string[];
  /** Kaj ponujamo */
  perks: string[];
  /** Datum objave, oblika YYYY-MM-DD. */
  datePosted: string;
  /**
   * Do kdaj oglas velja, oblika YYYY-MM-DD.
   * Google to ZAHTEVA — brez tega pretečeni oglasi ostanejo v iskalniku.
   */
  validThrough: string;
}

/*  ZAČETEK PREDLOGE — kopiraj od tu

  {
    slug: "zar-mojster",
    badge: "Kuhinja • Žar",
    title: "Žar mojster",
    pay: "po dogovoru",
    location: "Ljubljana, Trubarjeva 31",
    type: "Polni delovni čas",
    datePosted: "2026-09-01",
    validThrough: "2026-12-01",
    desc: "Na kratko opiši delo — kaj oseba dela in v kakšni ekipi.",
    tasks: [
      "Prva naloga",
      "Druga naloga",
      "Tretja naloga",
    ],
    perks: [
      "Kaj ponujamo — na primer topel obrok med izmeno",
      "Redno mesečno izplačilo",
    ],
  },

    KONEC PREDLOGE — kopiraj do tu  */

export const OPEN_POSITIONS: JobPosition[] = [
  // Trenutno ni odprtih delovnih mest.
  // Nov oglas dodaj tako, da sem prilepiš predlogo zgoraj.
];

/** Ali imamo trenutno odprto vsaj eno mesto? */
export const HAS_OPEN_POSITIONS = OPEN_POSITIONS.length > 0;

export function jobBySlug(slug: string): JobPosition | undefined {
  return OPEN_POSITIONS.find((j) => j.slug === slug);
}
