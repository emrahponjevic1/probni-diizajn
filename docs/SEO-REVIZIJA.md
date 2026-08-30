# Molba za nezavisno mišljenje o sajtu Šeherezada

Sajt je gotov i sprema se za objavu. Prije nego što ga pustimo u svijet, želimo
mišljenje sa strane.

**Šta tražimo od tebe:** pređi kroz cijeli sajt sam, onako kako ti smatraš da
treba, i reci nam iskreno šta misliš. Jesmo li uradili kako valja? Šta bi ti
uradio drugačije? Šta smo previdjeli?

Ovaj dokument ti daje kontekst — šta je sajt, šta smo htjeli postići i kako je
napravljen — da ne bi trošio vrijeme na pogađanje. Namjerno ti **ne dajemo
spisak stvari koje treba da provjeriš**. Ti si taj koji zna šta je važno; nas
zanima tvoja procjena, ne potvrda naše.

---

## Šta je sajt

Restoran **Šeherezada** — halal kebab, falafel i pizza u Ljubljani, radi od
1998. godine. **Dvije poslovnice**: Trubarjeva cesta 31 i Slovenska cesta 55.
Pravno lice je ADL d.o.o.

Vlasnik nije programer. Sajt mu je glavni kanal za nove goste — nema
marketinški budžet i ne plaća oglase.

| | |
|---|---|
| Domena | `https://seherezada.net` — **još nije objavljeno** |
| Tehnologija | Next.js 16.3.1 (App Router), React 19, TypeScript, CSS Modules |
| Prevodi | `next-intl` 4.14.1 |
| Hosting | Vercel (planiran) |
| Jezici | 6 — slovenački (bez prefiksa u adresi), engleski, njemački, italijanski, bosanski, turski |
| Adresa ukupno | 84 (14 stranica × 6 jezika) |
| Meni | 29 jela, 19 na studentski bon, 7 veganskih |

---

## Šta smo htjeli postići

Da nas Google nađe kad neko u Ljubljani traži gdje jesti — na svom jeziku.

Ciljne namjere po jeziku:

| Namjera | SL | EN | DE | IT | BS | TR |
|---|---|---|---|---|---|---|
| halal restoran | halal restavracija Ljubljana | halal restaurant Ljubljana | Halal Restaurant Ljubljana | ristorante halal Lubiana | halal restoran Ljubljana | Ljubljana helal restoran |
| kebab | kebab Ljubljana | kebab Ljubljana | Döner Ljubljana | kebab Lubiana | kebab Ljubljana | Ljubljana döner |
| gdje jesti | kje jesti v Ljubljani | where to eat in Ljubljana | wo essen in Ljubljana | dove mangiare a Lubiana | gdje jesti u Ljubljani | Ljubljana nerede yemek |
| jeftino | poceni hrana | cheap food / good value | günstig essen | mangiare economico | jeftino jesti | ucuz yemek |
| studenti | študentski boni | student meals | Studentenbon | pasti studenti | studentski boni | öğrenci yemeği |

Osim rangiranja, zanima nas i **kako će sajt izgledati kad se pojavi**: u
Google rezultatima, kad neko podijeli link na WhatsAppu ili Facebooku, i kad
neko potraži „Šeherezada" po imenu.

---

## Kako je napravljen — da znaš gdje da gledaš

| Šta | Gdje |
|---|---|
| Domena, jezici, `hreflang`, slika za dijeljenje | `src/data/site.ts` |
| Tabela prevedenih adresa (rute po jeziku) | `src/i18n/routing.ts` |
| Naslovi i opisi stranica | `src/i18n/meta.ts` + `messages/<jezik>.json`, ključ `meta` |
| `hreflang` | `src/i18n/urls.ts` |
| Sitemap / robots / llms.txt | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts` |
| Strukturirani podaci | `src/components/seo/` |
| Meni (jela, cijene, alergeni) | `src/components/menu/MenuData.ts` |
| Poslovnice, radno vrijeme, telefon | `src/data/locations.ts` |
| Svi tekstovi, 6 jezika, po 1263 ključa | `messages/*.json` |
| Prekidač jezika | `src/components/SiteNavbar.tsx` |
| Preusmjeravanje po jeziku | `src/proxy.ts` (u Next 16 se tako zove, ne `middleware.ts`) |

Sajt pokreni na pravom serveru, ne u `dev` režimu:

```bash
npm run build && npx next start -p 3000
```

Detaljna istorija projekta — šta je rađeno, kojim redom i zašto — je u
**`docs/PREDAJA.md`**. Vrijedi pročitati prije nego što doneseš zaključke.

---

## Odluke koje smo donijeli svjesno

Ne pišemo ovo da bismo ti vezali ruke — nego da ne trošiš vrijeme
objašnjavajući nam nešto što smo već izvagali. **Ako misliš da je neka od ovih
odluka pogrešna, reci to slobodno**, samo nam daj razlog.

- **Nema `AggregateRating` o samima sebi.** Google od 2019. ignoriše ocjene
  koje firma objavi sama o sebi. Recenzije na sajtu su prave, prepisane s
  Googla.
- **Nema automatskog prepoznavanja jezika.** Da Next preusmjerava po jeziku
  pregledača, Googleov robot bi na `/` završio na `/en` i slovenačku naslovnicu
  ne bi ni vidio. Jezik bira gost.
- **Slovenački nema prefiks u adresi** — `/meni`, ne `/sl/meni`.
- **Rute su prevedene** (`/de/speisekarte`, `/tr/helal`), ali interni ključevi
  ostaju slovenački.
- **Podaci o jelima i lokalima ostaju slovenački u kodu**, prevodi se ogledaju
  u `messages/*.json`. Razlog: meni se provjerava prema zvaničnom PDF-u.
- **U italijanskom pišemo „Lubiana"**, ne Ljubljana — to Italijani kucaju u
  Google. Ulice ostaju slovenačke.
- **U turskom pišemo „helal"**, ne „halal".
- **Bez superlativa.** Slovenački zakon o zaštiti potrošača tretira nedokazive
  tvrdnje („najbolji") kao zavaravajuće oglašavanje. Zato pišemo „poceni /
  cheap / günstig" — cijena to dokazuje.
- **Tvrdnje na stranici `/halal` je vlasnik lično provjerio.** Nisu marketing.

---

## Šta već znamo da nije riješeno

Da ne gubiš vrijeme na ovo:

- **Kontakt forma ništa ne šalje.** Sačeka i prikaže „poslano", ali nema
  slanja. Čeka se poslovni mail i SMTP podaci. Znamo da ovo mora biti riješeno
  prije objave.
- **Stranica 404 u sirovom HTML-u ima prazno tijelo** — ograničenje Next-a.
  Status je 404 i gost s JavaScriptom vidi cijelu prevedenu stranicu. Isprobali
  smo tri rješenja, nijedno nije pomoglo bez gubitka statusa 404.
- **Slike se mogu još smanjiti** (~220 KB) i **CSS blokira crtanje** (~450 ms).
- **Sajt nije objavljen**, pa se sve što zavisi od žive domene — Search
  Console, stvarni podaci o brzini iz terena, provjera dijeljenja linka — može
  provjeriti tek poslije.

---

## Kako da nam odgovoriš

Vlasnik nije programer. Piši tako da razumije **šta je problem, zašto je bitan
za posao i koliko je hitno**.

Za svaki nalaz nam treba: gdje je, u čemu je stvar, šta biznis gubi ako ostane
tako, i šta konkretno uraditi. Ako nešto tvrdiš, priloži dokaz — šta je server
vratio, šta je alat izmjerio. U ovom projektu su se greške već dešavale zato
što je neko provjerio pretpostavku umjesto stvarnog izlaza.

Na kraju nam reci tri stvari:

1. **Šta smo uradili dobro** — da znamo šta da ne diramo.
2. **Šta je pogrešno ili nedostaje**, poredano po tome koliko šteti.
3. **Šta bi ti uradio da je tvoj sajt**, a mi nismo ni pomislili.

I budi iskren. Ako nešto ne valja, radije to čujemo sada nego od Googla za šest
mjeseci.
