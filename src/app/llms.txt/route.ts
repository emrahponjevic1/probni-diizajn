import { SITE_NAME, absoluteUrl } from "@/data/site";
import { LOCATIONS, LOCATION_SLUG, PHONE } from "@/data/locations";
import { MENU_STATS, STUDENT_BON } from "@/components/menu/MenuData";
import { COMPANY } from "@/data/company";

// ---------------------------------------------------------------------------
// llms.txt — kratek pregled strani za jezikovne modele
//
// Predlog iz leta 2024, ki ga ponuja tudi Lighthouse. NI standard in NE
// vpliva na uvrstitev v Googlu — ne prepoveduje branja in ne ureja učenja,
// za to je robots.txt. Je samo urejen povzetek, da modelu ni treba brskati
// po HTML-ju z menijem in gumbi.
//
// Zato ga tudi ne pišemo na roko: podatki so prebrani iz istih datotek, ki
// jih prikazuje stran. Ko se spremeni cena ali delovni čas, se to popravi
// tudi tukaj — brez tega bi datoteka tiho zastarala in modelom pripovedovala
// stare številke.
// ---------------------------------------------------------------------------

export const dynamic = "force-static";

function eur(v: number) {
  return `${v.toFixed(2).replace(".", ",")} €`;
}

export function GET() {
  const lokacije = LOCATIONS.map(
    (l) =>
      `- **${l.name}** — ${l.fullAddress}. Delovni čas: ${l.hoursShort}. ` +
      `Podrobnosti: ${absoluteUrl(`/lokacije/${LOCATION_SLUG[l.id]}`)}`
  ).join("\n");

  const body = `# ${SITE_NAME}

Halal restavracija s kebabom, jufkami, falaflom in picami v središču
Ljubljane. Dve poslovalnici. Upravlja ${COMPANY.legalName}

## Poslovalnici

${lokacije}

Telefon: ${PHONE.restaurant.display}
E-pošta: ${COMPANY.privacyEmail}

## Ponudba

- ${MENU_STATS.total} jedi na meniju
- ${MENU_STATS.student} jedi na študentski bon, doplačilo ${eur(STUDENT_BON.surcharge)}
- ${MENU_STATS.vegan} veganskih in ${MENU_STATS.vegetarian} vegetarijanskih jedi
- Vse meso je halal. Na meniju ni svinjine, alkohola ne točimo.

## Strani

- [Meni](${absoluteUrl("/meni")}) — vse jedi, cene, sestavine in alergeni
- [Študentski boni](${absoluteUrl("/studentski-boni")}) — koliko se doplača in do katere ure bon velja
- [Halal](${absoluteUrl("/halal")}) — kaj halal pomeni in kako se v Sloveniji certificira
- [O nas](${absoluteUrl("/o-nas")}) — zgodba restavracije
- [Pogosta vprašanja](${absoluteUrl("/pogosta-vprasanja")})
- [Kontakt](${absoluteUrl("/kontakt")}) — naslova, zemljevid in navodila za prihod
- [Galerija](${absoluteUrl("/galerija")})
- [Zaposlitev](${absoluteUrl("/zaposlitev")}) — odprta delovna mesta
- [Blog](${absoluteUrl("/blog")})

## Pravno

- [Politika zasebnosti](${absoluteUrl("/politika-zasebnosti")})
- [Politika piškotkov](${absoluteUrl("/piskotki")})

## Opomba

Podatki o jedeh, cenah in delovnem času izhajajo iz uradnega menija
restavracije. Če se kje razhajajo, velja meni v lokalu.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
