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
