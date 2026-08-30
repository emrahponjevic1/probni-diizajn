# Skripte za provjeru

Ovo nisu testovi jedinica nego **mreža**: pokreću se protiv pravog servera i
prijavljuju ono što bi tiho štetilo u Googleu. Sve su nastale zato što se neka
greška već desila — komentar na vrhu svake kaže koja.

**Pravilo:** skripta mora **pasti kad je nešto pogrešno**, a ne samo ispisati
podatke koje čovjek treba pregledati.

## Kako se pokreću

Sajt mora raditi u produkcijskom režimu, ne u `dev`:

```bash
npm run build && npx next start -p 3000
```

Zatim, iz korijena projekta:

```bash
node scripts/revizija.js http://localhost:3000
node scripts/revizija2.js http://localhost:3000
node scripts/hreflang.js http://localhost:3000
node scripts/provjeri-prevod.js en        # i de, it, bs, tr
node scripts/curenje2.js http://localhost:3000 /de "/=/" "/meni=/speisekarte"
node scripts/slovenizmi.js http://localhost:3000 /bs /bs/meni
```

## Šta koja radi

| Skripta | Traži |
|---|---|
| **revizija.js** | Po svakoj adresi iz sitemapa: status, `<html lang>`, naslov (prazan / predug / duplikat), opis (isto + prekratak), canonical, `og:` oznake, ispravnost JSON-LD-a, nezamijenjene `{oznake}`, spojene riječi bez razmaka, vidljive ključeve prevoda, linkove koji vode van svog jezika, i **zaglavlje koje je na stranoj stranici ostalo doslovno slovenačko** |
| **revizija2.js** | 404 po jeziku, `robots.txt` / `sitemap.xml` / `llms.txt`, tipove strukturiranih podataka po stranici, i da FAQ pitanje / kategorija menija / mrvica nisu ostali slovenački |
| **hreflang.js** | Uzajamnost `hreflang` veza na svim adresama: 7 oznaka po stranici, svaka navodi i samu sebe, svaka navedena adresa vraća 200 |
| **provjeri-prevod.js** | Nedostajuće i višak ključeva, izgubljene `{oznake}` i `<tagove>` u prevodu |
| **curenje2.js** | Red teksta koji je na stranoj stranici **identičan** slovenačkom — dakle neprevedeni ostatak. Ne oslanja se na slova č/š/ž |
| **slovenizmi.js** | Isto, ali obrnuto, za bosanski — jezici su preblizu, pa `curenje2.js` daje 238 lažnih alarma. Traži riječi koje postoje u slovenačkom a u bosanskom ne |

## Poznati lažni alarmi

Dvije skripte moraju znati šta **smije** biti isto u svim jezicima, inače
zatrpaju izvještaj:

- **`revizija.js`** — `og:title` lokala je „Šeherezada — Trubarjeva cesta 31,
  Ljubljana", dakle marka + ulica + grad. To su činjenice, ne tekst za prevod.
  Spisak imena je u konstanti `IMENA`.
- **`curenje2.js`** — vlastita imena, adrese, imena jela i engleska recenzija
  (koju namjerno ne prevodimo). Spisak je u `DOZVOLJENO`.
- **`slovenizmi.js`** — riječi koje su i bosanske (*studentski, samo, nas,
  pečemo*) moraju se odbiti ručno pri čitanju izvještaja.

## Ako pišeš novu provjeru

Dvije rupe su već pronađene tek okom, pošto su skripte prolazile bez nalaza:

1. Opisi su provjeravani na dužinu i duplikate, **ali ne na to jesu li ostali
   slovenački** — zato je slovenački `og:description` na pet jezika prošao.
2. Kad prevod ne postoji, next-intl ispiše **sam ključ** („lokacijaStran.nesto").
   Ni provjera prevoda to ne hvata, jer ključa nema ni u slovenačkom, pa
   poređenje jezika nema šta prijaviti.

Obje su zakrpane. Pretpostavi da postoji treća.
