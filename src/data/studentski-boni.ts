// ---------------------------------------------------------------------------
// ŠTUDENTSKI BONI — EDINI VIR PODATKOV
//
// Tu so podatki o subvencionirani študentski prehrani, ki jih določa država,
// ne mi. Naše doplačilo (3,00 €) in seznam jedi na bon živita v
// src/components/menu/MenuData.ts, delovni čas lokalov pa v src/data/locations.ts.
//
// KAJ MORAŠ POSODABLJATI IN KDAJ
//
// Višina subvencije se po zakonu uskladi DVAKRAT LETNO — januarja in julija.
// Ko se spremeni:
//   1. popravi `subsidy`
//   2. popravi `checkedOn` na datum, ko si znesek preveril
// Stran sama izračuna vrednost obroka (subvencija + doplačilo) in ob znesku
// izpiše datum preverjanja ter povezavo na uradni vir. Nikoli ne zapiši
// zneska, ki ga nisi preveril — napačna cena je za gosta hujša od manjkajoče.
// ---------------------------------------------------------------------------

export const STUDENT_SUBSIDY = {
  /** Subvencija države na obrok, v evrih. */
  subsidy: 5.19,
  /** Datum, ko je bil znesek nazadnje preverjen pri uradnem viru. */
  checkedOn: "25. 8. 2026",
  /** Uradni vir — vedno naveden ob znesku. */
  sourceName: "studentska-prehrana.si",
  sourceUrl: "https://www.studentska-prehrana.si",
} as const;

/** Pravila unovčevanja, ki jih določa sistem študentske prehrane. */
export const BON_RULES = {
  /** Koliko bonov na dan. */
  perDay: 2,
  /** Najmanjši razmik med dvema bonoma, v urah. */
  gapHours: 4,
  /** Čas, v katerem sistem sprejema bone — ne glede na delovni čas lokala. */
  windowFrom: "07:00",
  windowTo: "24:00",
} as const;

/** Uradna aplikacija Študentska prehrana (ŠOS). */
export const BON_APPS = {
  ios: "https://apps.apple.com/si/app/prehrana/id1398305066",
  android:
    "https://play.google.com/store/apps/details?id=com.margento.studentskaprehrana",
} as const;

/**
 * Ura, ob kateri lokal odpre, zapisana kot minute od polnoči.
 * "09:00 – 02:00" -> 540
 */
function openingMinutes(time: string): number {
  const [h, m] = time.split(/[–-]/)[0].trim().split(":").map(Number);
  return h * 60 + m;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function label(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Kdaj je bon pri nas res uporaben.
 *
 * Sistem sprejema bone od 07:00 do 24:00, oba lokala pa odpreta pozneje in
 * zapreta po polnoči. Uporabno okno je torej presek obojega — in tega gost
 * nikjer ne najde, čeprav je najpogostejše vprašanje ob enih zjutraj.
 *
 * Vrne tudi `closesAfterWindow`: lokal je takrat še odprt, bon pa ne velja več.
 */
export function bonWindow(hours: { day: string; time: string }[]) {
  const opens = Math.max(
    ...hours.map((h) => openingMinutes(h.time))
  );
  const from = Math.max(opens, toMinutes(BON_RULES.windowFrom));
  return {
    from: label(from),
    to: BON_RULES.windowTo,
    /** Lokal zapira po polnoči, bon pa takrat ne velja več. */
    closesAfterWindow: hours.some((h) => {
      const [a, b] = h.time.split(/[–-]/).map((t) => t.trim());
      return toMinutes(b) <= toMinutes(a);
    }),
  };
}
