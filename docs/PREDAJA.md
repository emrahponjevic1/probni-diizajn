# Šeherezada — predaja rada

**Zalijepi ovaj fajl u novi chat da nastaviš odakle smo stali.**

Datum: 25. 8. 2026 · Grana: `main` · Sajt je **živ na Vercelu**: `seherezadav2.vercel.app`

---

## 1. Šta je projekat

Sajt za **Šeherezada**, halal kebab restoran u Ljubljani sa **dvije poslovalnice**.
Cilj vlasnika (Emrah): biti prvi na Google pretrazi za kebab u Ljubljani.

**Tehnologija:** Next.js 16.3.1 (App Router, Turbopack), React 19.2.8, TypeScript strict, CSS Modules.
**Pravno lice:** ADL d.o.o., Trubarjeva cesta 31, 1000 Ljubljana · matična 3999521000
**Domena:** `seherezada.net` (kupljena, **DNS još nije prebačen na Vercel**).
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

**Ovo pravilo važi i za pravne tekstove.** Politika kolačića je opisivala tri kolačića kojih nema, politika zasebnosti se pozivala na DPO-a i newsletter koji ne postoje. Popravljeno — vidi sekciju 5.

---

## 3. Arhitektonske odluke — ne mijenjaj ih bez razloga

### Jezik je prefiks URL-a, lokacija je stranica

```
jezik    →  seherezada.net/en/...     varijanta cijelog sajta
lokacija →  seherezada.net/lokacije/  sadržaj jedne stranice
```

Lokacija kao prefiks bi napravila 2 × 6 jezika × 12 stranica = **144 skoro identične stranice** = duplikat sadržaja. Odbačeno.

### Sve rute su slovenačke
`/menu` i `/contact` su **obrisane**, ne preusmjerene — sajt nije bio živ, pa nije bilo šta da se spašava. `/faq` je preimenovan u `/pogosta-vprasanja` jer je „faq" engleski i rezervisan za `/en/faq` u Fazi 5.

**Ne vraćaj engleske rute na korijen.** Sudariće se sa Fazom 5.

### Lokacijske stranice postoje zbog Google profila, ne zbog navigacije

Restoran ima **dva Google Business Profila**. Svaki ima polje „Website". Ako oba pokazuju na naslovnicu, Google ne zna koja stranica pripada kojem lokalu.

```
GBP Trubarjeva  →  seherezada.net/lokacije/trubarjeva-31
GBP Slovenska   →  seherezada.net/lokacije/slovenska-55
```

**Vlasnik još nije upisao te adrese u GBP.** To treba uraditi.

### Stranica bez linkova se ne indeksira
Stranica na koju niko ne linkuje (*orphan page*) rijetko se indeksira. Trenutno:

```
/halal                 2 linka
/studentski-boni       2 linka
/piskotki              3 linka
/politika-zasebnosti   2 linka
```

Kad praviš novu stranicu, **odmah je nalinkuj** sa bar dvije postojeće.

### Nikad `AggregateRating` o sebi
Google od 2019. ignoriše ocjene koje firma objavi sama o sebi. Recenzije na sajtu su prave, prepisane s Googla, sa inicijalima umjesto fotografija.

### Statički izvoz je uklonjen
`output: "export"` i GitHub Pages workflow su izbačeni. Hosting je Vercel.

---

## 4. Jedini izvori podataka

| Fajl | Šta drži |
|---|---|
| `src/data/locations.ts` | obje poslovalnice: ime, adresa, satnica po danima, mape, prevoz, parking, opisi, fotografije |
| `src/data/company.ts` | pravno lice: ADL d.o.o., sjedište, matična — za pravne tekstove |
| `src/data/halal.ts` | halal oznaka, podaci o certifikatu (**prazni**), Zavod Halal, postupak |
| `src/data/studentski-boni.ts` | subvencija 5,19 € + datum provjere, pravila bonova, linkovi aplikacija |
| `src/components/menu/MenuData.ts` | 29 jela po redoslijedu iz PDF-a |
| `src/data/reviews.ts` | tri prave Google recenzije |
| `src/data/jobs.ts` | oglasi za posao — **prazno**, sa šablonom |
| `src/data/blog.ts` | blog postovi — **prazno**, sa šablonom |
| `src/lib/hours.ts` | računa da li je sad otvoreno |
| `src/lib/consent.ts` | pristanak na kolačiće + prekidač `ANALYTICS_ENABLED` |

**Pravilo:** ako mijenjaš podatak o lokalu, mijenjaš ga **samo** u `locations.ts`. Dokazano: promjena telefona na jednom mjestu ažurirala je 40 mjesta na sajtu.

### Meni — provjereni brojevi
```
29 jela ukupno · 19 na bon · 7 veganskih · 4 vegetarijanska
1 samo na Trubarjevoj (Pečeni Piščanec)
```
Doplata za bon: **3,00 €** — glavno jelo, salata, **jabuka**, piće. Subvencija države **5,19 €** (provjereno 25. 8. 2026; zakon je usklađuje u januaru i julu, pa provjeravaj).

### Radno vrijeme — po PDF-u
```
Trubarjeva 31    pon–čet, ned  09:00–02:00   ·   pet, sob  09:00–03:00
Slovenska 55     svaki dan     08:00–01:00
```

Obje satnice prelaze ponoć. Zato `openState()` **uvijek gleda i jučerašnju smjenu**. Testirano na 8 slučajeva.

**Bedž Odprto/Zaprto se računa u pregledniku, ne pri gradnji** — inače bi zamrznuo na satu kad je sajt objavljen. Komponenta: `src/components/locations/StatusBadge.tsx`. Koristi je svugdje, ne piši „Odprto" kao tekst.

---

## 5. Šta je urađeno

### ✅ Faza 1 — čišćenje i jedan izvor podataka
Obrisano 1.909 linija mrtvog koda, navigacija spojena u `SiteNavbar`, `SeherezadaHero` postao serverska komponenta, uvedeni `src/data/*`, svi linkovi na `<Link>`.

### ✅ Faza 2 — slovenački tekst i SEO na stranici
Naslovnica i `/meni` prepisani, 29 jela sa opisima i alergenima, uklonjene netačne tvrdnje, meta naslovi svugdje.

### ✅ Faza 3 — hosting (dio)
Sajt je **živ na Vercelu**. Vercel Speed Insights instaliran (radi bez kolačića). **DNS za `seherezada.net` još nije prebačen.**

### ✅ Faza 4 — rute
- `/lokacije/trubarjeva-31` i `/lokacije/slovenska-55` — mapa u vrhu, živi bedž, `Restaurant` JSON-LD
- `/studentski-boni` — samostalna stranica (**ne** `/meni/studentski-boni`, plan promijenjen). Tabela „do kada bon važi" se računa iz `locations.ts`
- `/halal` — šta halal znači, Zavod Halal, postupak, naš certifikat
- `/piskotki` i `/politika-zasebnosti` — pravni tekstovi
- `/not-found` — stranica za nepostojeće adrese
- `/blog/<slug>` i `/zaposlitev/<slug>` sa `generateStaticParams()`

### ✅ Pravni dio i pristanak na kolačiće
- **Baner** koji stvarno upisuje `cookie_consent` sa datumom. Odbijanje = jedan klik, isto kao prihvatanje (GDPR)
- Politika kolačića opisuje **stvarno stanje** — jedan kolačić, plus red za GA označen „Ni v uporabi"
- `ANALYTICS_ENABLED` u `consent.ts` je **jedan prekidač** koji pomjera tabelu, uvod, sekciju o izboru i tekst banera
- Pravno lice (ADL d.o.o.) u oba teksta; DPO i newsletter obrisani jer ne postoje
- Sekcija o Vercelu kao obrađivaču (hosting + Speed Insights)

### ✅ Slike — riješen najveći problem
```
16 MB (JPG/PNG)  →  1,6 MB (AVIF), 34 fajla
```
**Važno:** Next **ne mijenja veličinu AVIF slika** — šalje izvorni fajl bez obzira na traženu širinu. Provjereno na tri slike. Zato `sizes` **ne pomaže**; jedini način je smanjiti sam fajl.

### ✅ Brzina
- Preload samo za sliku koja je stvarno prva vidljiva (bilo tri, sad jedna)
- `/meni`: prvih 6 slika više nije lazy (bile su, iako se vide odmah)
- Animacije `border-radius` u herou stoje na ekranima ≤768 px + `prefers-reduced-motion`
- Širina kartice u karuselu se mjeri jednom, ne pri svakom pomjeranju prsta

**Izmjereno na Vercelu:** desktop LCP 0,6 s / CLS 0 · mobilni LCP ~4,1 s / CLS 0

### ✅ SEO na stranici
`FAQPage` schema na `/halal` (6 pitanja) i `/pogosta-vprasanja` (10 pitanja). Podaci su izdvojeni u `halalFaqs.ts` i `faqSections.ts` — **serverska komponenta ne može čitati izvoze iz `"use client"` fajla**, build pukne.

---

## 6. Šta slijedi

### Faza 6 — SEO infrastruktura ← **PRVO OVO**
- [ ] `metadataBase` u `layout.tsx`
- [ ] Kanonski URL na svakoj stranici (sad ga imaju samo `[slug]` rute)
- [ ] `src/app/sitemap.ts` — neka **sam čita rute**, ne ručni spisak
- [ ] `src/app/robots.ts`
- [ ] `Menu` schema na `/meni` — 29 jela, cijene, `VeganDiet`
- [ ] `Organization` schema u `layout.tsx`
- [ ] `BreadcrumbList` gdje ima drobtina
- [ ] `public/llms.txt` (neobavezno, nije standard, ne utiče na Google)

**Ovo blokira sve ostalo.** Sve traži jednu odluku: **koja je konačna adresa?** Sad je `seherezadav2.vercel.app`, treba `seherezada.net`. Ako se sitemap napravi sa Vercel adresom, Google indeksira nju i to se poslije teško ispravlja.

JSON-LD trenutno imaju samo: `/halal`, `/pogosta-vprasanja`, `/lokacije/[slug]`, `/zaposlitev/[slug]`. Naslovnica, `/meni`, `/kontakt`, `/o-nas` nemaju ništa.

### Faza 4 — završena
Nema više ničega. **`/meni/vegan` je odbačen odlukom vlasnika** — ne pravi se.
Veganska jela su označena na `/meni` i pominju se na `/halal`; zasebna stranica se ne radi.

### Faza 3 — ostatak
- [ ] DNS za `seherezada.net` na Vercel
- [ ] HTTPS i preusmjerenje `www → bez www`
- [ ] Uključiti Speed Insights u Vercel tabli (kod je unutra, prikupljanje nije upaljeno)

### Faza 5 — šest jezika
- [ ] `next-intl`, `localePrefix: "as-needed"` (slovenački bez prefiksa)
- [ ] Prevedeni slugovi preko `pathnames` mape
- [ ] `hreflang` — svaka verzija mora pokazivati na sebe **i** na sve ostale

| SL | EN | DE | IT | BS | TR |
|---|---|---|---|---|---|
| `/meni` | `/menu` | `/speisekarte` | `/menu` | `/meni` | `/menu` |
| `/kontakt` | `/contact` | `/kontakt` | `/contatti` | `/kontakt` | `/iletisim` |
| `/o-nas` | `/about` | `/ueber-uns` | `/chi-siamo` | `/o-nama` | `/hakkimizda` |
| `/pogosta-vprasanja` | `/faq` | `/haeufige-fragen` | `/domande-frequenti` | `/cesta-pitanja` | `/sss` |
| `/lokacije` | `/locations` | `/standorte` | `/sedi` | `/lokacije` | `/subeler` |
| `/zaposlitev` | `/careers` | `/karriere` | `/lavora-con-noi` | `/posao` | `/kariyer` |
| `/galerija` | `/gallery` | `/galerie` | `/galleria` | `/galerija` | `/galeri` |
| `/halal` | `/halal` | `/halal` | `/halal` | `/halal` | `/helal` |
| `/studentski-boni` | `/student-vouchers` | `/studentenbons` | `/buoni-studenti` | `/studentski-boni` | `/ogrenci-fisleri` |

### Faza 7 — poslije lansiranja
- [ ] Google Search Console, poslati sitemap
- [ ] Oba GBP profila: kategorije, atributi, satnica, fotografije, meni
- [ ] **U svaki GBP upisati adresu njegove lokacijske stranice**
- [ ] GA4 → tad se `ANALYTICS_ENABLED` postavlja na `true` (uputstvo je u `consent.ts`)
- [ ] Zabilježiti GBP Insights brojke **prije** lansiranja, kao polaznu tačku

---

## 7. Otvoreni problemi — po hitnosti

### 🔴 Kontakt forma ništa ne šalje
`ContactPageContent.tsx:165` — `handleSubmit` čeka 900 ms i prikaže „poslano". Nema slanja, nema mejla. **Gost misli da je poruka stigla, a nije.**
Politika zasebnosti se poziva na obradu podataka iz te forme. Vlasnik je rekao da to rješava sam.

### 🔴 Šest neprovjerenih tvrdnji na `/halal`
Vjerovatno su tačne, ali ih niko nije potvrdio:
- pića (turški čaj, kava, ayran, sokovi) — **pića uopšte nisu u `MenuData.ts`**
- „Ločeni delovni prostori, namenska oprema"
- „priznane evropske klavnice z mednarodnimi certifikati"
- „redni in nenapovedani pregledi"
- „0 % svinjske želatine, vsi dodatki pregledani"
- **„Pizza Klasika"** — u meniju se zove **Pizza Klasik**

Plus: Pizza Salami ima opis „goveja salama", a u sastojcima **„Goveja salama / kulen"**. Kulen je tradicionalno svinjski. Provjeriti u PDF-u.

### 🟡 Slike se mogu još smanjiti — 220 KB
Next ih ne mijenja (vidi sekciju 5), pa treba prekomprimovati izvorne fajlove:
```
seherezada-story-oven.avif    1200×857 → prikazuje se 212×158   ušteda ~53 KB
seherezada-hero-doner-kebab   1024×1024, 84 KB → jače kompresovati, dimenziju NE dirati
seherezada-story-chef.avif    1110×896 → 900×726
```
Hero mora ostati ~1024 px zbog gustih ekrana; 600 px bi bilo mutno.

### 🟡 Kontrast — pristupačnost 96/100
Narandžasta `#ea580c` na krem pozadini i presvijetli sivi tekst, na dvadesetak mjesta. **Mijenja izgled**, pa treba odluka vlasnika.

### 🟡 CSS blokira crtanje — ~450 ms
Naslovnica ima ~112 KB CSS-a (18 KB preneseno). Minifikacija i Brotli su **već uključeni** — nema šta da se dobije stiskanjem. Jedini put je manje CSS-a, a to je rizično (vidi grešku 1).

### 🟢 `browserslist` nije proradio
Dodat u `package.json`, ali Lighthouse i dalje prijavljuje istih 14 KB polyfilla i bundle je ostao iste veličine. Bezopasno, ali ne radi ništa.

### 🟢 Font traži težine koje ne postoje
CSS koristi `font-weight: 900` i `950`, a učitane su samo `400–800`. Plus Jakarta Sans ide do 800 — preglednik ih lažira. Isto za 450, 650, 750.

### 🟢 `keywords` meta tag
Postoji na nekim stranicama. Google ga ignoriše od 2009.

---

## 8. Čeka se od vlasnika

| Stavka | Za šta blokira |
|---|---|
| **Odluka o konačnoj adresi** (`seherezada.net`) | **cijelu Fazu 6** |
| Verifikacijski kod za GBP | Fazu 7 |
| DNS pristup | Fazu 3 |
| Potvrda šest tvrdnji na `/halal` | tačnost sajta |
| Fotografija pravog halal certifikata | polje `photo` u `halal.ts` |
| Facebook i TikTok linkovi | ikone su uklonjene dok ne stignu |
| Wolt URL | 29 dugmadi na `/meni` čeka |
| Fotografije lokala | polje `photos` u `locations.ts` |

---

## 9. Greške koje su se već desile — ne ponavljaj ih

1. **Brisanje CSS-a red po red slomilo je build.** Briši pravilo **samo ako su svi njegovi selektori neupotrijebljeni.**

2. **JSX komentar `/* */` unutar taga nije komentar nego greška.** Mora `{/* */}`, i **ne smije stajati između atributa** — samo između elemenata. Desilo se dvaput.

3. **`generateStaticParams()` koji vrati praznu listu ruši build** kad je uključen statički izvoz. Zato je izvoz uklonjen.

4. **Faze nisu išle redom** i plan je prestao odgovarati stvarnosti. **Ako preskočiš fazu ili promijeniš odluku, odmah ažuriraj ovaj fajl.** (Desilo se opet — ovaj fajl je stajao zastario kroz cijelu Fazu 4 i pravni dio.)

5. **Nemoj brisati sadržaj koji izgleda kao duplikat bez pitanja.** Mapa na `/kontakt` je uklonjena kao „duplikat", vlasnik je tražio da se vrati.

6. **Serverska komponenta ne može čitati izvoze iz `"use client"` fajla.** Build pukne sa `X.map is not a function`. Podaci idu u zaseban modul bez `"use client"`.

7. **Ne mjeri produkciju dok dev server radi.** Oba pišu u `.next`, pa `next start` servira staro. Mjeri na Vercelu ili ugasi dev server.

8. **Ne vjeruj izvještaju drugog agenta.** Vercelov agent je javio da je instalirao Speed Insights — na disku nije bilo ničega, radio je na grani u oblaku. Uvijek provjeri `git status` i sam fajl.

9. **Jedno Lighthouse mjerenje ne znači ništa.** Desktop je pao sa 100 na 56 bez ijedne izmjene koja bi to mogla izazvati — TBT je najnestabilnija mjera. Mjeri 3–5 puta i uzmi srednju vrijednost.

---

## 10. Kako provjeriti da je sve u redu

```bash
npx tsc --noEmit
```

```bash
npm run build
```

17 ruta, sve moraju vraćati 200, nepostojeći slug 404:

```
/  /meni  /kontakt  /o-nas  /pogosta-vprasanja  /galerija
/halal  /studentski-boni  /piskotki  /politika-zasebnosti
/blog  /blog/[slug]  /zaposlitev  /zaposlitev/[slug]
/lokacije/trubarjeva-31  /lokacije/slovenska-55
```

Provjeri i ovo troje, jer se ne vidi iz builda:
- **baner za kolačiće** — pojavi se, klik ga skloni, ne vraća se
- **bedž Odprto/Zaprto** — mora odgovarati stvarnom vremenu
- **`/asdf`** — mora dati našu 404, ne Vercelovu

---

## 11. Kako vlasnik voli da se radi

- Objašnjavaj **kao nekome ko nije programer** — on to izričito traži
- Piši **na bosanskom**; sadržaj sajta na slovenačkom
- Prije veće izmjene **pokaži šta se mijenja i zašto**
- **Provjeri tvrdnje prije nego ih izgovoriš** — više puta je uhvatio netačnu tvrdnju, i više puta je bio u pravu kad je sumnjao
- Kad nešto ne valja, reci **odmah i direktno**, bez uvijanja
- **Mjeri, ne pretpostavljaj.** Rečeno je da `sizes` rješava slike — mjerenje je pokazalo da Next AVIF uopšte ne dira
- Commit poruke su **na slovenačkom**, objašnjavaju *zašto*, ne *šta*
- Radi **jednu stvar po jednu** i mjeri poslije svake, umjesto svih odjednom
