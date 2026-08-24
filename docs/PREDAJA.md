# Šeherezada — predaja rada

**Zalijepi ovaj fajl u novi chat da nastaviš odakle smo stali.**

Datum: 25. 8. 2026 · Grana: `seo/slovenski-tekst-in-podatki` · 15 commita, `main` netaknut

---

## 1. Šta je projekat

Sajt za **Šeherezada**, halal kebab restoran u Ljubljani sa **dvije poslovalnice**.
Cilj vlasnika (Emrah): biti prvi na Google pretrazi za kebab u Ljubljani.

**Tehnologija:** Next.js 16.3.1 (App Router, Turbopack), React 19.2.8, TypeScript strict, CSS Modules.
**Domena:** `seherezada.net` (kupljena, još nije lansirana).
**Jezici:** slovenački sada; planirano BS, EN, DE, IT, TR.

Dizajnerska pravila su u `CLAUDE.md` u korijenu — font Plus Jakarta Sans, topla svijetla paleta, tačni razmaci sekcija. **Ne odstupaj od njih.**

---

## 2. Dvije stvari koje su iznad koda

### PDF je izvor istine za meni
Jelo kojeg nema u zvaničnom PDF-u **ne smije** biti na sajtu. Isto vrijedi za cijene, nazive, radno vrijeme i adrese. Ako kod kaže drugačije od PDF-a — kod je pogrešan.

### Ništa se ne izmišlja
Ranije verzije sajta imale su izmišljena jela, lažne recenzije sa stock fotografijama, tri nepostojeća oglasa za posao sa izmišljenim platama, šest lažnih blog postova i tvrdnje tipa „Ljubljana #1" i „Najboljši kebab". Sve je uklonjeno.

Konkretno **ne postoji** i ne smije se pominjati:
- krušna peć (nemaju je)
- dnevna juha (ne služe je)
- Glovo dostava (samo Wolt)
- bilo kakav superlativ koji se ne može dokazati

Slovenački zakon o zaštiti potrošača tretira nedokazive superlative kao zavaravajuće oglašavanje. Abi Falafel je devet vrata dalje na Trubarjevoj.

---

## 3. Arhitektonske odluke — ne mijenjaj ih bez razloga

### Jezik je prefiks URL-a, lokacija je stranica

```
jezik    →  seherezada.net/en/...     varijanta cijelog sajta
lokacija →  seherezada.net/lokacije/  sadržaj jedne stranice
```

Lokacija kao prefiks bi napravila 2 × 6 jezika × 12 stranica = **144 skoro identične stranice** = duplikat sadržaja. Odbačeno.

### Lokacijske stranice postoje zbog Google profila, ne zbog navigacije

Restoran ima **dva Google Business Profila**. Svaki ima polje „Website". Ako oba pokazuju na naslovnicu, Google ne zna koja stranica pripada kojem lokalu.

```
GBP Trubarjeva  →  seherezada.net/lokacije/trubarjeva-31
GBP Slovenska   →  seherezada.net/lokacije/slovenska-55
```

**Vlasnik još nije upisao te adrese u GBP** — trenutno planira upisati samo `seherezada.net`. To treba uraditi.

### Switcher lokacija je uklonjen, linkovi nisu

Bio je padajući meni koji je mijenjao jednu riječ i ništa više. Zamijenjen menijem **linkova** na dvije lokacijske stranice.

Bitna razlika: stranice moraju imati interne linkove. Stranica na koju niko ne linkuje (*orphan page*) rijetko se indeksira i loše rangira. Trenutno stanje linkova:

```
naslovnica  →  2
/o-nas      →  2
/kontakt    →  3
```

### Nikad `AggregateRating` o sebi
Google od 2019. ignoriše ocjene koje firma objavi sama o sebi. Recenzije na sajtu su prave, prepisane s Googla, sa inicijalima umjesto fotografija.

### Statički izvoz je uklonjen
`output: "export"` je izbačen iz `next.config.ts`. Razlog: ne podržava middleware, preusmjerenja ni optimizaciju slika — a to je tačno ono što treba za višejezičnost. Hosting ide na Vercel (Faza 3).

---

## 4. Jedini izvori podataka

Podaci su ranije bili raspoređeni na četiri mjesta i razilazili se — subota je bila pogrešna na **sedam mjesta**. Sada:

| Fajl | Šta drži |
|---|---|
| `src/data/locations.ts` | obje poslovalnice: ime, adresa, satnica po danima, mape, prevoz, parking, opisi, mjesta za fotografije |
| `src/components/menu/MenuData.ts` | 29 jela po redoslijedu iz PDF-a |
| `src/data/reviews.ts` | tri prave Google recenzije |
| `src/data/jobs.ts` | oglasi za posao — **prazno**, sa šablonom i uputstvom |
| `src/data/blog.ts` | blog postovi — **prazno**, sa šablonom i uputstvom |
| `src/lib/hours.ts` | računa da li je sad otvoreno |

**Pravilo:** ako mijenjaš podatak o lokalu, mijenjaš ga **samo** u `locations.ts`. Sve ostalo čita odatle. Dokazano: promjena telefona na jednom mjestu ažurirala je 40 mjesta na sajtu.

### Meni — provjereni brojevi
```
29 jela ukupno
19 na studentski bon
 7 veganskih
 4 vegetarijanska
 1 samo na Trubarjevoj (Pečeni Piščanec)
```
Doplata za bon: **3,00 €** — uključuje glavno jelo, salatu, **jabuku** i piće. (Ne juhu. FAQ je ranije griješio.)

### Radno vrijeme — po PDF-u
```
Trubarjeva 31    pon–čet, ned  09:00–02:00
                 pet, sob      09:00–03:00
Slovenska 55     svaki dan     08:00–01:00
```

Obje satnice prelaze ponoć. Zato `openState()` u `src/lib/hours.ts` **uvijek gleda i jučerašnju smjenu** — u utorak u 01:30 lokal je još uvijek otvoren iz ponedjeljka. Testirano na 8 slučajeva.

---

## 5. Šta je urađeno

### ✅ Faza 1 — čišćenje i jedan izvor podataka
- Obrisano 1.909 linija mrtvog koda (`Hero.tsx`, `HeroSwitcher.tsx`, `heros/*` — nula referenci)
- Navigacija je bila duplirana u herou; sad postoji samo `SiteNavbar`
- `SeherezadaHero` više ne koristi nijedan React hook → postao **serverska komponenta**, manje JavaScripta na naslovnici
- Uvedeni `src/data/*` izvori
- Svi interni linkovi prebačeni sa `<a>` na `<Link>`

### ✅ Faza 2 — slovenački tekst i SEO na stranici
- Naslovnica prepisana riječ po riječ (H1 sad nosi ključne riječi umjesto brenda)
- `/meni` prepisan, 29 jela iz PDF-a sa opisima, sastojcima i alergenima
- Uklonjene sve netačne tvrdnje
- Meta naslovi i opisi za svaku stranicu

### ✅ Faza 4 (dio) — lokacijske stranice
- `/lokacije/trubarjeva-31` i `/lokacije/slovenska-55`
- Mapa u vrhu (ne na dnu — zbog nje gost i dolazi), učitava se tek kad zatreba
- Živi bedž „Odprto / Zaprto" po pravom vremenu
- Današnji dan označen u rasporedu
- Mjesta za fotografije sa placeholderom
- `Restaurant` JSON-LD sa vlastitim `@id`, adresom i satnicom po lokalu
- `/kontakt` zadržao mapu i vodič za dolazak; podaci sad izvedeni iz `locations.ts`

### ✅ Posao i blog se sami dodaju
- `/zaposlitev/<slug>` i `/blog/<slug>` sa `generateStaticParams()`
- Svaki oglas ima `JobPosting` schema — realna prilika za rich result
- Obje liste su **prazne** sa šablonom za kopiranje i uputstvom na slovenačkom u zaglavlju fajla

---

## 6. Šta slijedi

### Faza 4 — ostatak
- [ ] `/halal` — stranica o halal certifikatu
- [ ] `/meni/vegan` — 7 veganskih jela
- [ ] `/meni/studentski-boni` — preseliti sa `/studentski-boni`
- [ ] Preusmjerenja 301: `/menu → /meni`, `/contact → /kontakt`, `/studentski-boni → /meni/studentski-boni`

`/menu` i `/contact` **trenutno postoje kao zasebne stranice** — to je duplikat sadržaja i treba ga riješiti preusmjerenjem.

### Faza 6 — SEO infrastruktura (ništa od ovoga još ne postoji)
- [ ] `src/app/sitemap.ts`
- [ ] `src/app/robots.ts`
- [ ] `metadataBase` u `layout.tsx`
- [ ] Kanonski URL na svakoj stranici
- [ ] `Menu` schema na `/meni`
- [ ] `FAQPage` schema na `/faq`
- [ ] `BreadcrumbList` gdje ima drobtina
- [ ] `Organization` schema u `layout.tsx`

Trenutno **samo lokacijske stranice imaju JSON-LD.** Naslovnica, `/meni`, `/kontakt`, `/o-nas`, `/faq` nemaju ništa.

### Faza 3 — hosting
- [ ] Vercel nalog
- [ ] DNS za `seherezada.net`
- [ ] HTTPS i preusmjerenje `www → bez www`

### Faza 5 — šest jezika
- [ ] `next-intl`, `localePrefix: "as-needed"` (slovenački bez prefiksa)
- [ ] Prevedeni slugovi preko `pathnames` mape
- [ ] `hreflang` — svaka verzija mora pokazivati na sebe **i** na sve ostale, inače Google ignoriše cijelu grupu

Dogovorena tabela slugova:

| SL | EN | DE | IT | BS | TR |
|---|---|---|---|---|---|
| `/meni` | `/menu` | `/speisekarte` | `/menu` | `/meni` | `/menu` |
| `/kontakt` | `/contact` | `/kontakt` | `/contatti` | `/kontakt` | `/iletisim` |
| `/o-nas` | `/about` | `/ueber-uns` | `/chi-siamo` | `/o-nama` | `/hakkimizda` |
| `/pogosta-vprasanja` | `/faq` | `/haeufige-fragen` | `/domande-frequenti` | `/cesta-pitanja` | `/sss` |
| `/lokacije` | `/locations` | `/standorte` | `/sedi` | `/lokacije` | `/subeler` |
| `/zaposlitev` | `/careers` | `/karriere` | `/lavora-con-noi` | `/posao` | `/kariyer` |

### Faza 7 — poslije lansiranja
- [ ] Google Search Console, poslati sitemap
- [ ] Oba GBP profila: kategorije, atributi, satnica, fotografije, meni
- [ ] **U svaki GBP upisati adresu njegove lokacijske stranice**

---

## 7. Čeka se od vlasnika

| Stavka | Status |
|---|---|
| Verifikacijski kod za GBP | čeka da stigne |
| Vercel nalog + DNS | odgođeno |
| Facebook i TikTok linkovi | ubaciće kasnije |
| Wolt URL | dostava preko Wolta postoji, link nije dat |
| Fotografije lokala | mjesta su spremna u `locations.ts`, polje `photos` |

---

## 8. Poznati problemi

### Slike — 16 MB
`public/images/` je **16 MB**. Najveći: `contact-call-hero.png` 1,6 MB, `chicken-platter.jpg` 1 MB.
Next optimizuje u AVIF/WebP pri isporuci, ali izvorne fajlove treba smanjiti prije lansiranja. Ovo je **veći problem za rangiranje** nego bilo koja preostala SEO sitnica.

### `keywords` meta tag
Postoji na nekim stranicama. Google ga ignoriše od 2009. Bezopasan, ali mrtav.

---

## 9. Greške koje su se već desile — ne ponavljaj ih

1. **Brisanje CSS-a red po red slomilo je build.** Pravilo sa više selektora ostane bez dijela i sve pukne. Koristi brojanje vitičastih zagrada i briši pravilo **samo ako su svi njegovi selektori neupotrijebljeni.**

2. **Nezatvoreni JSX komentar se prikazao kao tekst na stranici.** `/* ... */` bez vitičastih zagrada u JSX-u nije komentar nego tekst. Provjeri poslije svake veće izmjene.

3. **`generateStaticParams()` koji vrati praznu listu ruši build** kad je uključen statički izvoz. Zato je izvoz i uklonjen.

4. **Faze nisu išle redom** i plan je prestao odgovarati stvarnosti. Vlasnik se izgubio u tome. **Ako preskočiš fazu, odmah ažuriraj plan.**

5. **Nemoj brisati sadržaj koji izgleda kao duplikat bez pitanja.** Mapa i vodič za dolazak uklonjeni su sa `/kontakt` kao „duplikat" lokacijskih stranica — vlasnik je tražio da se vrate. Preklapanje sadržaja nije isto što i suvišan sadržaj.

---

## 10. Kako provjeriti da je sve u redu

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Sve stranice moraju vraćati 200, nepostojeći slug 404. Trenutne rute:

```
/  /meni  /kontakt  /o-nas  /faq  /blog  /zaposlitev  /galerija
/lokacije/trubarjeva-31  /lokacije/slovenska-55
/blog/[slug]  /zaposlitev/[slug]
/menu  /contact  /studentski-boni     ← ove tri treba preusmjeriti
```

---

## 11. Kako vlasnik voli da se radi

- Objašnjavaj **kao nekome ko nije programer** — on to izričito traži
- Piši **na bosanskom**; sadržaj sajta na slovenačkom
- Prije veće izmjene **pokaži šta se mijenja i zašto**
- **Provjeri tvrdnje prije nego ih izgovoriš** — nekoliko puta je uhvatio netačnu tvrdnju
- Kad nešto ne valja, reci **odmah i direktno**, bez uvijanja
- Commit poruke su **na slovenačkom**, objašnjavaju *zašto*, ne *šta*
