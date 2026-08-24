// ---------------------------------------------------------------------------
// MNENJA GOSTOV — EDINI VIR
//
// Samo RESNIČNE ocene z Googla, dobesedno prepisane. Nič izmišljenega.
//
// Prejšnja različica strani je vsebovala izmišljena mnenja z naključnimi
// fotografijami s spleta. To je odstranjeno: Google od 2023 obravnava lažna
// mnenja kot razlog za ročno kazen, restavracija pa ima ~1.900 pravih ocen
// s povprečjem 4,5 — ni razloga za izmišljanje.
//
// POMEMBNO: teh mnenj NE dodajamo v strukturirane podatke (Review /
// AggregateRating). Google od 2019 ignorira ocene, ki jih podjetje objavi
// samo o sebi, zvezdice v iskalniku pa itak prihajajo iz Google Business
// Profila. Tukaj so izključno za prikaz gostu.
// ---------------------------------------------------------------------------

export interface GoogleReview {
  id: number;
  /** Ime, kot je objavljeno na Googlu. */
  author: string;
  /** Dobesedno besedilo mnenja — ne prevajamo in ne popravljamo. */
  text: string;
  rating: number;
  /** Kdaj je bilo objavljeno (približno, kot kaže Google). */
  when: string;
  /** Kontekst, ki ga doda Google (npr. "Vacation | Family"). */
  context?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    author: "Haris Demir",
    rating: 5,
    when: "pred 9 meseci",
    context: "Dopust · Družina",
    text:
      "What I liked about this place is very professional service, very good quality food and more than affordable meal prices. Very convenient location with indoor and outdoor sitting available. There's also a good range of oriental food on the menu as well as beverages. Overall recommended!",
  },
  {
    id: 2,
    author: "Mujtaba Jan",
    rating: 5,
    when: "pred 6 meseci",
    context: "Dopust · Prijatelji",
    text:
      "Very good option in the centre of capital. The food served was outstanding and cheap as well. Good option for those looking for Halal. Definitely recommended.",
  },
  {
    id: 3,
    author: "Alex Merkulov",
    rating: 5,
    when: "pred letom dni",
    context: "Družina",
    text:
      "They offer wonderful sandwich options made with fresh-baked bread, featuring chicken or beef fillings and a variety of toppings. Highly recommended for a delicious, quick bite!",
  },
];

/** Začetnice za avatar — namesto naključnih fotografij ljudi s spleta. */
export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
