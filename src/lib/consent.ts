// ---------------------------------------------------------------------------
// PRIVOLITEV V PIŠKOTKE
//
// Eno mesto, ki ve, ali je gost privolil v neobvezne piškotke.
// Politika piškotkov (/piskotki) opisuje natanko to, kar je tu zapisano —
// če spremeniš eno, popravi drugo.
//
// KAKO DELUJE
// Izbira se shrani v piškotek `cookie_consent` za eno leto. Piškotek in ne
// localStorage zato, ker je izbira zapisana v politiki kot piškotek in ker
// jo bo pozneje moral prebrati tudi strežnik.
//
// KO BO PRIŠEL GOOGLE ANALYTICS (Faza 7)
// Skripta se sme naložiti šele, ko `readConsent()?.analytics === true`.
// Nikoli prej. Do takrat analitičnih piškotkov ni — in politika to tudi piše.
// ---------------------------------------------------------------------------

export const CONSENT_COOKIE = "cookie_consent";
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

/**
 * EDINO STIKALO ZA ANALITIKO.
 *
 * false = Google Analytics še ni vključen. Skripta se ne naloži, piškotkov
 *         `_ga` ni, politika piškotkov jih prikaže kot „ni v uporabi".
 * true  = analitika je vključena. Naloži se samo gostom, ki so privolili.
 *
 * KO BOŠ VKLAPLJAL ANALITIKO (Faza 7), naredi troje:
 *   1. tu nastavi `true`
 *   2. v layout.tsx dodaj skripto, ki se naloži samo ob
 *      `readConsent()?.analytics === true`
 *   3. preveri, da /piskotki zdaj kaže `_ga` kot dejaven
 *
 * Stran o piškotkih bere prav to vrednost, zato se besedilo in resnica
 * ne moreta razhajati — ena vrstica premakne oboje hkrati.
 */
export const ANALYTICS_ENABLED = false;

export interface Consent {
  /** Nujni piškotki so vedno vklopljeni — brez njih stran ne deluje. */
  essential: true;
  /** Analitika je izbirna. Privzeto izklopljena. */
  analytics: boolean;
  /** Kdaj je gost izbral, v obliki ISO. Za dokazovanje privolitve. */
  savedAt: string;
}

/** Dogodek, ki ga sprožimo ob shranjeni izbiri, da se vmesnik osveži. */
export const CONSENT_EVENT = "seherezada:consent";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return {
      essential: true,
      analytics: parsed.analytics,
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : "",
    };
  } catch {
    // Pokvarjen zapis obravnavamo kot "ni izbire" — gosta raje vprašamo znova.
    return null;
  }
}

export function writeConsent(analytics: boolean): Consent {
  const consent: Consent = {
    essential: true,
    analytics,
    savedAt: new Date().toISOString(),
  };

  const value = encodeURIComponent(JSON.stringify(consent));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Izbriše privolitev — gost bo znova vprašan. */
export function clearConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
