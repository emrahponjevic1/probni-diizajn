// ---------------------------------------------------------------------------
// DELOVNI ČAS — ali je zdaj odprto
//
// Oba lokala zapirata po polnoči (09:00–02:00, 08:00–01:00). Zato ne zadošča
// primerjava "zdaj je med opens in closes": ob 01:30 v torek je gost še vedno
// znotraj ponedeljkove izmene. Spodnja logika zato vedno pogleda dva dneva —
// današnjo izmeno in včerajšnjo, ki se lahko razteza čez polnoč.
// ---------------------------------------------------------------------------

/** Naš seznam se začne s ponedeljkom, JS getDay() z nedeljo. */
export function todayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "09:00 – 02:00" -> { opens: 540, closes: 120, cezPolnoc: true } */
function parseRange(time: string) {
  const [a, b] = time.split(/[–-]/).map((t) => t.trim());
  const opens = toMinutes(a);
  const closes = toMinutes(b);
  return { opens, closes, cezPolnoc: closes <= opens, closesLabel: b };
}

export interface OpenState {
  open: boolean;
  /** Ura zapiranja tekoče izmene, npr. "02:00". Samo kadar je odprto. */
  closesAt?: string;
  /** Ura odprtja naslednje izmene. Samo kadar je zaprto. */
  opensAt?: string;
  /** Ali se naslednja izmena začne šele jutri. */
  opensTomorrow?: boolean;
}

export function openState(
  hours: { day: string; time: string }[],
  now: Date = new Date()
): OpenState {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const t = todayIndex(now);
  const yesterday = (t + 6) % 7;

  // 1. Včerajšnja izmena, ki se razteza čez polnoč.
  const y = parseRange(hours[yesterday].time);
  if (y.cezPolnoc && minutes < y.closes) {
    return { open: true, closesAt: y.closesLabel };
  }

  // 2. Današnja izmena.
  const d = parseRange(hours[t].time);
  const konec = d.cezPolnoc ? 24 * 60 : d.closes;
  if (minutes >= d.opens && minutes < konec) {
    return { open: true, closesAt: d.closesLabel };
  }

  // 3. Zaprto — kdaj spet odpremo.
  if (minutes < d.opens) {
    return { open: false, opensAt: hours[t].time.split(/[–-]/)[0].trim() };
  }
  const jutri = (t + 1) % 7;
  return {
    open: false,
    opensAt: hours[jutri].time.split(/[–-]/)[0].trim(),
    opensTomorrow: true,
  };
}

// ---------------------------------------------------------------------------
// DELOVNI ČAS V POVEDIH
//
// Delovni čas je bil prepisan v besedilu na sedmih mestih (pogosta vprašanja,
// stran O nas, študentski boni). Ob spremembi urnika bi ta besedila ostala
// stara — po novem v šestih jezikih hkrati.
//
// Zato se ure ne tipkajo več. Povzetek spodaj jih izlušči iz istega seznama,
// ki ga prikazuje značka Odprto/Zaprto in noga: src/data/locations.ts.
//
// Kar OSTANE v besedilu: imena ulic v mestniku ("na Trubarjevi 31"). Sklona
// se iz "Trubarjeva cesta 31" ne da izpeljati brez slovnice, poleg tega se
// naslov ne spremeni, ne da bi poved tako ali tako na novo napisali.
// ---------------------------------------------------------------------------

export interface HoursSummary {
  /** Ura odprtja, ki velja večino dni. */
  opens: string;
  /** Ura zaprtja, ki velja večino dni. */
  closes: string;
  /**
   * Ura zaprtja ob petkih in sobotah, kadar se takrat zapre pozneje.
   * Kadar je ves teden enak, je undefined — takrat poved o vikendu odpade.
   */
  weekendCloses?: string;
}

/**
 * Iz sedmih dni izlušči poved: kdaj odpremo, kdaj zapremo in ali je ob
 * petkih in sobotah drugače.
 *
 * "Večino dni" ni ugibanje: vzame se čas, ki se pojavi največkrat. Če bi
 * kdaj urnik postal bolj razgiban (npr. vsak dan drugačen), bo ta povzetek
 * premalo natančen in bo treba poved napisati drugače — takrat to opazi
 * primerjava besedila strani, ne gost.
 */
export function hoursSummary(
  hours: { day: string; time: string }[]
): HoursSummary {
  const pogostost = new Map<string, number>();
  for (const { time } of hours) {
    pogostost.set(time, (pogostost.get(time) ?? 0) + 1);
  }

  const najpogostejsi = [...pogostost.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const osnovni = parseRange(najpogostejsi);

  // Petek je peti, sobota šesta v seznamu, ki se začne s ponedeljkom.
  const petek = parseRange(hours[4].time);
  const sobota = parseRange(hours[5].time);
  const vikendEnak =
    petek.closesLabel === sobota.closesLabel &&
    petek.closesLabel !== osnovni.closesLabel;

  return {
    opens: najpogostejsi.split(/[–-]/)[0].trim(),
    closes: osnovni.closesLabel,
    weekendCloses: vikendEnak ? petek.closesLabel : undefined,
  };
}

/**
 * Dneve z enakim časom združi v en zapis, kot pričakuje Google.
 * Kadar je closes manjši od opens (npr. 09:00–03:00), Google to razume
 * kot zapiranje naslednji dan.
 */
export function groupHours(hours: { day: string; time: string }[]) {
  // Google pričakuje angleška imena dni. Vzamemo jih po ZAPOREDJU, ne po
  // slovenskem imenu: seznam se v src/data/locations.ts vedno začne s
  // ponedeljkom, imena dni pa se v drugih jezikih prevedejo — iskanje po
  // imenu bi takrat tiho vrnilo prazno.
  const EN = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const byTime = new Map<string, string[]>();
  hours.forEach((h, i) => {
    const key = h.time;
    if (!byTime.has(key)) byTime.set(key, []);
    byTime.get(key)!.push(EN[i]);
  });

  return [...byTime.entries()].map(([time, days]) => {
    const [opens, closes] = time.split("–").map((t) => t.trim());
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}
