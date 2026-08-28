# Šeherezada — predaja rada

**Zalijepi ovaj fajl u novi chat da nastaviš odakle smo stali.**

Datum: 28. 8. 2026 · Grana: `main` · Sajt **nije objavljen** — radi samo lokalno

**Faze 1, 2, 4 i 6 su gotove. Faza 5 je u toku — korak 5A je gotov.**
**Ostaju 3 (objava) i 7 (Google).**

---

## 1. Šta je projekat

Sajt za **Šeherezada**, halal kebab restoran u Ljubljani sa **dvije poslovalnice**.
Cilj vlasnika (Emrah): biti prvi na Google pretrazi za kebab u Ljubljani.

**Tehnologija:** Next.js 16.3.1 (App Router, Turbopack), React 19.2.8, TypeScript strict, CSS Modules.
**Pravno lice:** ADL d.o.o., Trubarjeva cesta 31, 1000 Ljubljana · matična 3999521000
**Domena:** `seherezada.net` (kupljena). Kod je već postavljen na nju — pri prvom deployu ide odmah na pravu domenu, ne na privremenu adresu.
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
| `src/data/site.ts` | **adresa sajta, spisak svih 6 jezika, logo, share slika, brend boja** |
| `src/i18n/routing.ts` | **prevedene adrese stranica po jezicima** + tipovi putanja |
| `src/i18n/navigation.ts` | `Link` koji pamti jezik — uvozi se odavde, ne iz `next/link` |
| `src/i18n/urls.ts` | računa punu adresu stranice u bilo kom jeziku |
| `messages/<jezik>.json` | prevodi — šest fajlova, još prazni (puni se u 5B/5C) |

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

### ⬜ Faza 3 — hosting (nije počela)
Raniji Vercel projekat je **obrisan**, sa njim i Speed Insights. Sajt trenutno radi samo lokalno.
**Odluka vlasnika:** pri sljedećem deployu ide odmah na `seherezada.net`, bez privremene adrese. Zato u kodu nema nikakvog prekidača za indeksiranje — sve je spremno da radi od prve sekunde.

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
- Sekcija „Komu podatke posredujemo" — imenuje ponuđača hostinga, bez imena firme dok se ne zna konačno

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

### ✅ Logo i ikone
- Ikone izvezao vlasnik iz logotipa: 16, 32, 180, 192, 512 px + `favicon.ico`
- **Vlasnik je odlučio da natpis ostaje i na ikoni** — upozoren je da se na 16 px slije; njegova odluka
- `site.webmanifest` je iz generatora došao praznog imena i sa bijelom bojom — popravljeno, boja `#a41023` uzeta iz samog fajla logotipa
- Slika za dijeljenje 1200×630 — **namjerno JPEG, ne AVIF**: WhatsApp, Viber i Facebook AVIF ne čitaju i preview se ne bi prikazao
- Obrisane Next-ove podrazumijevane datoteke: `favicon.ico`, `file/globe/next/vercel/window.svg`

### ✅ SEO na stranici
`FAQPage` schema na `/halal` (6 pitanja) i `/pogosta-vprasanja` (10 pitanja). Podaci su izdvojeni u `halalFaqs.ts` i `faqSections.ts` — **serverska komponenta ne može čitati izvoze iz `"use client"` fajla**, build pukne.

---

## 6. Šta slijedi

### ✅ Faza 6 — SEO infrastruktura (gotova)
- `metadataBase`, kanonski URL na svih 12 stranica
- `src/app/sitemap.ts` — 14 adresa, čita lokacije, blog i oglase iz istih fajlova koje stranica prikazuje
- `src/app/robots.ts` — pokazuje na sitemap
- `Organization` schema (znamka + ADL d.o.o. + obje poslovalnice), `Menu` schema (29 jela sa cijenama)
- **`src/data/site.ts`** — adresa i spisak jezika na jednom mjestu. Spisak danas ima jedan red; u Fazi 5 se dopisuju redovi i sitemap, canonical i `hreflang` se sami prošire.

**Nema prekidača za indeksiranje.** Sajt je spreman da bude indeksiran čim se objavi.

- `BreadcrumbList` na `/blog/<slug>`, `/zaposlitev/<slug>` i `/lokacije/<slug>`
- `llms.txt` — generiše se iz podataka, ne piše se rukom

**Faza 6 je u cijelosti gotova.**

⚠️ Drobtine na lokacijskim stranicama imaju **namjerno samo dva člana** — `/lokacije` kao stranica ne postoji, pa bi član „Lokacije" vodio u 404.

### Faza 4 — završena
Nema više ničega. **`/meni/vegan` je odbačen odlukom vlasnika** — ne pravi se.
Veganska jela su označena na `/meni` i pominju se na `/halal`; zasebna stranica se ne radi.

### Faza 3 — hosting *(parkirana odlukom vlasnika: čeka se)*
- [ ] Objaviti sajt **odmah na `seherezada.net`**, ne na privremenoj adresi
- [ ] DNS zapisi kod registrara
- [ ] HTTPS i preusmjerenje `www → bez www`

U kodu nema šta da se mijenja — `SITE_URL` već pokazuje na pravu domenu i nema prekidača koji bi se mogao zaboraviti.

### Faza 5 — jezici ← **U TOKU**

**Odluka vlasnika 28. 8. 2026: idu svih šest jezika odjednom.** Preporuka je bila
SL + EN prvo; vlasnik je odlučio drugačije i to je njegov poziv.

Faza je podijeljena na pet koraka. **Poslije svakog sajt radi** — nijedan korak
ne ostavlja sajt slomljen.

| | Korak | Šta se dobije |
|---|---|---|
| ✅ | **5A** Temelj | `next-intl`, adrese u 6 jezika. Slovenački izgleda identično |
| ⬜ | **5B** Izvlačenje teksta | tekst iz koda u `messages/sl.json`. Vizuelno ništa |
| ⬜ | **5C** Prevodi | EN, DE, IT, BS, TR — pet JSON fajlova |
| ⬜ | **5D** Google sloj | `hreflang`, canonical po jeziku, **pravi** prekidač jezika |
| ⬜ | **5E** Provjera | svih 84 adresa, meta naslovi, JSON-LD po jeziku |

#### ✅ 5A — gotov 28. 8. 2026

- `next-intl@4.14.1` (zvanično podržava Next 16)
- `LOCALES` u `site.ts` ima **6 redova**: sl, en, de, it, bs, tr
- `src/i18n/routing.ts` — tabela prevedenih adresa iz ove predaje, plus adrese
  koje u tabeli nisu postojale: `/blog` (ostaje `blog` u svim jezicima),
  `/piskotki`, `/politika-zasebnosti`
- Sve stranice premještene u `src/app/[locale]/`. Van njega ostaju samo
  `sitemap.ts`, `robots.ts`, `llms.txt/` i `globals.css` — oni nemaju jezik
- `src/proxy.ts` — preusmjeravanje. **U Next 16 se zove `proxy.ts`, ne
  `middleware.ts`**; staro ime radi ali javlja upozorenje
- Svih 22 fajla više ne uvoze `next/link` nego `Link` iz `@/i18n/navigation`
- Sitemap računa **prave prevedene adrese** — `/de/speisekarte`, ne `/de/meni`

**Provjereno na pravom serveru (`next start`), ne na pretpostavci:**

```
17 slovenačkih ruta            svih 17 vraća 200
84 adrese iz sitemapa          svih 84 vraća 200, nijedna nije preusmjerenje
/asdf, /en/nepostojece         404 sa NAŠOM stranicom
<html lang>                    sl, en, de, it, bs, tr — tačno po jeziku
linkovi na /de stranici        svi ostaju u /de/... adresama
naslovnica                     sadržaj netaknut, bedž Odprto radi
```

#### Odluke donesene u 5A — ne mijenjaj bez razloga

**Nema automatskog prepoznavanja jezika** (`localeDetection: false`).
Da Next sam preusmjerava po jeziku preglednika, Googlov robot — koji se
predstavlja kao engleski — bi na `/` završio na `/en` i slovenačku naslovnicu
ne bi ni vidio. A slovenački je jedini koji nam treba za „kebab Ljubljana".
Jezik bira gost, prekidačem.

**`absoluteUrl()` više ne prima jezik.** Prima samo slovenačke adrese.
Za druge jezike ide `localizedUrl()` iz `src/i18n/urls.ts`. Razlog: adrese se
prevode, a `site.ts` tabelu prevoda ne poznaje — primio bi jezik i tiho vratio
`/de/meni`, adresu koja postoji samo kao preusmjerenje.

**`src/app/[locale]/[...rest]/page.tsx`** hvata nepostojeće adrese.
Bez njega `/asdf` pada mimo jezičke grane i Next pokaže svoju golu 404 bez
navigacije. Provjereno: prije njega je `/asdf` davao Next-ovu stranicu.

#### Šta ostaje za 5B

- [ ] Izvući ~800–1000 komada teksta iz 31 komponente u `messages/sl.json`
- [ ] Najgušći fajlovi: `MenuData.ts`, `/studentski-boni`, `/piskotki`,
      `/politika-zasebnosti`, `/halal`
- [ ] Meta naslovi na 16 mjesta (`generateMetadata` umjesto `metadata`)

**Ključno pravilo za 5D:** kanonski URL svake jezičke verzije pokazuje **na
samu sebe**, nikad na slovenačku. Ako pokaže na slovenačku, prevedena stranica
nestaje iz Google-a.

#### Tabela prevedenih adresa — sada živi u kodu

Tabela je preseljena u `src/i18n/routing.ts` i **odatle se stvarno koristi**.
Ovdje je ostavljena samo za čitanje; ako se raziđu, kod je istina.

| SL | EN | DE | IT | BS | TR |
|---|---|---|---|---|---|
| `/meni` | `/menu` | `/speisekarte` | `/menu` | `/meni` | `/menu` |
| `/kontakt` | `/contact` | `/kontakt` | `/contatti` | `/kontakt` | `/iletisim` |
| `/o-nas` | `/about` | `/ueber-uns` | `/chi-siamo` | `/o-nama` | `/hakkimizda` |
| `/pogosta-vprasanja` | `/faq` | `/haeufige-fragen` | `/domande-frequenti` | `/cesta-pitanja` | `/sss` |
| `/lokacije/…` | `/locations/…` | `/standorte/…` | `/sedi/…` | `/lokacije/…` | `/subeler/…` |
| `/zaposlitev` | `/careers` | `/karriere` | `/lavora-con-noi` | `/posao` | `/kariyer` |
| `/galerija` | `/gallery` | `/galerie` | `/galleria` | `/galerija` | `/galeri` |
| `/halal` | `/halal` | `/halal` | `/halal` | `/halal` | `/helal` |
| `/studentski-boni` | `/student-vouchers` | `/studentenbons` | `/buoni-studenti` | `/studentski-boni` | `/ogrenci-fisleri` |
| `/piskotki` | `/cookies` | `/cookie-richtlinie` | `/cookie` | `/kolacici` | `/cerezler` |
| `/politika-zasebnosti` | `/privacy-policy` | `/datenschutz` | `/privacy` | `/politika-privatnosti` | `/gizlilik-politikasi` |
| `/blog` | `/blog` | `/blog` | `/blog` | `/blog` | `/blog` |

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

**Odluka vlasnika:** forma ostaje na sajtu. Spaja se kad zakupi poslovni mail; tad daje SMTP podatke.
**Lozinka ne ide u kod ni u razgovor** — u varijablu okoline koju vlasnik sam upiše kod hostinga.
**Prije objave forma mora biti spojena ili poštena** — sad laže gostu da je poruka poslana.

### 🔴 Prekidač za jezik u navigaciji ništa ne radi
`SiteNavbar.tsx:38` — dugme nudi tri jezika (Slovenščina, English, Bos/Hrv/Srp).
Klik samo pomjeri kvačicu. Nema prevoda, nema promjene stranice.

Isti problem kao kontakt forma: **gost misli da je prebacio jezik, a nije.**
Uz to nudi tri jezika, a dogovoreno je šest.

Spaja se u koraku **5D**. Do tada stoji — sajt nije objavljen, pa niko ne strada.

### ✅ Tvrdnje na `/halal` — provjerene 27. 8. 2026
Vlasnik je prošao kroz svih sedam. **Slovenački sadržaj je time zaključan** — uslov da se krene sa prevodima.

Potvrđeno i ostaje: odvojeni radni prostori i oprema, meso iz evropskih klaonica sa certifikatima, nenajavljene kontrole Zavoda Halal.

Ispravljeno:
- spisak pića (turški čaj, ayran, sokovi) **obrisan** — pića nisu u `MenuData.ts`, dodaju se kasnije
- „vsi dodatki so skrbno pregledani" → **„Sestavine kupujemo pri dobaviteljih s halal certifikatom"**; deklaracije niko nije prolazio, oslanja se na certifikat dobavljača
- „Pizza Klasika" → **„Pizza Klasik"** po meniju
- „kulen" → **„goveji kulen"** u sastojcima Pizza Salami

### 🟡 Slike se mogu još smanjiti — 220 KB
Next ih ne mijenja (vidi sekciju 5), pa treba prekomprimovati izvorne fajlove:
```
seherezada-story-oven.avif    1200×857 → prikazuje se 212×158   ušteda ~53 KB
seherezada-hero-doner-kebab   1024×1024, 84 KB → jače kompresovati, dimenziju NE dirati
seherezada-story-chef.avif    1110×896 → 900×726
```
Hero mora ostati ~1024 px zbog gustih ekrana; 600 px bi bilo mutno.

### ⬜ Kontrast — **odbačeno odlukom vlasnika**
Pristupačnost je 96/100 zbog narandžaste na krem pozadini. Vlasnik je odlučio da se **ne dira** — dizajn ostaje kakav jeste. Ne otvaraj ponovo.

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

9. **Ne donosi odluke o brendu umjesto vlasnika.** Kad se pokazalo da se logo ne čita na 16 px, nacrtana je pojednostavljena oznaka bez pitanja. Vlasnik je to odbio i tražio da se vrati. **Pokaži problem, ponudi opcije, čekaj odluku.**

10. **Favicon i share slika su izuzetak od AVIF pravila.** Ostatak sajta je AVIF, ali ikone i `og:image` čitaju Google-ov robot, iOS i WhatsApp — oni AVIF ne podržavaju. Tu ide PNG (ikone) i JPEG (fotografija za dijeljenje).

11. **Jedno Lighthouse mjerenje ne znači ništa.** Desktop je pao sa 100 na 56 bez ijedne izmjene koja bi to mogla izazvati — TBT je najnestabilnija mjera. Mjeri 3–5 puta i uzmi srednju vrijednost.

12. **`sed` je pojeo kosu crtu u regexu.** Iz `"...\..*"` je ispalo `".....*"`.
    U JavaScriptu je `"."` isto što i `"."` — dakle „bilo koji znak" umjesto „tačka".
    Vzorec za preusmjeravanje bi tiho prestao da lovi bilo šta, a **build to ne prijavi**.
    Zato je u `src/proxy.ts` sada `[^.]*`, bez ijedne kose crte.
    **Ne mijenjaj tekst sa `sed` ako sadrži ``** — koristi `node` ili alat za izmjene.

13. **Dev server drži foldere zaključane na Windowsu.** `git mv src/app/blog` je
    padao sa „Permission denied" dok je `npm run dev` radio. Ugasi dev server
    prije premještanja foldera. Isto važi i za `next start` — `pkill` ga ne hvata
    pouzdano, gasi ga preko PID-a koji drži port.

14. **Ne vjeruj testu dok ne provjeriš da server servira NOVI build.** Testirao sam
    404 i dobio Next-ovu stranicu; ispalo je da je odgovarao stari server koji nije
    ugašen, a novi je pao jer je port bio zauzet. Provjeri da je proces stvarno nov.

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

Plus tri koje ne izgledaju kao stranice:
```
/sitemap.xml   /robots.txt   /llms.txt
```

Provjeri i ovo troje, jer se ne vidi iz builda:
- **baner za kolačiće** — pojavi se, klik ga skloni, ne vraća se
- **bedž Odprto/Zaprto** — mora odgovarati stvarnom vremenu
- **`/asdf`** — mora dati našu 404, ne Vercelovu

### Otkad ima jezika — provjeri svih 84 adrese

Sitemap sam nabraja sve stranice u svih šest jezika. Ako ijedna vrati nešto
drugo od 200, adresa u sitemapu ne odgovara stvarnoj adresi stranice — a to je
tačno ona greška koju Google kažnjava.

Ugasi dev server, pa:

```bash
npm run build && npx next start -p 3100
```

U drugom prozoru:

```bash
for u in $(curl -s localhost:3100/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g'); do p=$(echo "$u" | sed 's|https://seherezada.net||'); [ -z "$p" ] && p=/; c=$(curl -s -o /dev/null -w '%{http_code}' "localhost:3100$p"); [ "$c" != 200 ] && echo "$c $p"; done; echo gotovo
```

Ne smije ispisati nijedan red prije „gotovo".

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
