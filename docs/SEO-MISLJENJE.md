# Nezavisno mišljenje o sajtu Šeherezada

Datum: 30. 8. 2026 · Sajt provjeren na **produkcijskom serveru** (`npm run build && npx next start -p 3100`), ne u `dev` režimu, ne iz koda.

**Ništa u kodu nije mijenjano.** Ovo je samo nalaz.

---

## Kako sam provjeravao

Prošao sam kroz svih **84 adrese** koje sajt sam navodi u `sitemap.xml`, i za svaku
skinuo ono što Google stvarno dobije: status, naslov, opis, kanonski URL,
`hreflang`, `og:` oznake, strukturirane podatke, naslove H1/H2, slike i alt
tekstove, te sve interne linkove. Zatim sam napravio mapu internih linkova —
koja stranica linkuje na koju i koliko puta.

Gdje god nešto tvrdim, ispod stoji **stvarni ispis servera**, ne pretpostavka.

**Šta nisam mogao izmjeriti:** brzinu učitavanja (LCP, FCP). Preglednik u kojem
radim drži karticu skrivenom, a skrivena kartica ne crta — svi brojevi o brzini
koje bih dobio bili bi lažni. Zato o brzini ne tvrdim ništa novo; jedini pošten
broj je vaš vlastiti sa Vercela (mobilni LCP ~4,1 s), i taj ostaje otvoren.

---

# 1. Šta ste uradili dobro — ne dirajte

Ovo nije ljubaznost. Ovo su stvari koje sam provjerio i koje **rade tačno**, a
većina sajtova ih ne uradi kako treba.

### Višejezičnost je urađena bolje nego na 90 % sajtova
```
84/84 adrese          status 200, nijedna nije preusmjerenje
7 hreflang tagova     na svakoj od 84 stranice
canonical             svaka jezička verzija pokazuje na samu sebe
```
Provjereno na `/tr/helal`:
```
hrefLang="sl-SI" → /halal          hrefLang="tr" → /tr/helal
hrefLang="en"    → /en/halal       hrefLang="x-default" → /halal
canonical        → https://seherezada.net/tr/helal
```
Veze su uzajamne i svaka stranica navodi i samu sebe — to su dva Googleova
uslova koja se najčešće promaše. **Ovo je najbolji dio sajta.**

### Odluka da nema automatskog prepoznavanja jezika je tačna — i dokazano radi
Provjerio sam tri načina na koja bi se moglo pokvariti:
```
curl -H "Cookie: NEXT_LOCALE=en" /     → 200, slovenačka strana (ne preusmjerava)
curl -H "Accept-Language: en-US"  /     → 200, slovenačka strana
curl -A "Googlebot"               /     → 200, naslov: "Šeherezada – halal kebab,
                                          pizza in falafel v Ljubljani"
```
Googlebot dobije slovenačku naslovnicu. Ovo je bilo dobro promišljeno i dobro
izvedeno.

### Naslovi i opisi — nijedan duplikat na 84 stranice
Ni jedan naslov se ne ponavlja, ni jedan opis se ne ponavlja. Naslovi nisu
mehanički prevodi nego pisani za pretragu u tom jeziku:
```
/de/speisekarte   "Günstig essen in Ljubljana — Speisekarte"
/it/menu          "Mangiare economico a Lubiana — menù"
/tr/menu          "Ljubljana'da ucuz yemek — menü ve fiyatlar"
/bs/meni          "Jeftino jesti u Ljubljani — meni i cijene"
```
Ovo je urađeno pametno. Egzonim „Lubiana" u italijanskom je tačan potez.

### Higijena koju ljudi obično zaborave
```
slike bez alt teksta        0 od svih slika na svih 84 stranice
stranice bez H1             0
stranice sa dva H1          0
noindex zaostao negdje      0
/asdf, /en/asdf             404 (ne 200, ne „soft 404")
/meni/ , /kontakt/          308 na verziju bez kose crte
```

### Meni u strukturiranim podacima je ozbiljno urađen
29 jela, 5 sekcija, cijene, `inLanguage` tačan po jeziku (`de` na njemačkoj,
`tr` na turskoj), i — što me iznenadilo — **`suitableForDiet` je već tu**:
```
schema.org/VeganDiet         14×
schema.org/VegetarianDiet     8×
```

### Tri odluke koje su bile teške i tačne
- **Nema `AggregateRating` o sebi.** Tačno. Zvjezdice ionako dolaze iz GBP-a.
- **Wolt dugme se ne iscrtava dok je URL prazan** (`WOLT_URL = ""`). Ovo je
  disciplina koju rijetko vidim — radije bez dugmeta nego dugme u prazno.
- **Fotografije lokala su prazne (`src: ""`) umjesto da stoji nasumična slika.**
  Isto pravilo. Poštuje se.

---

# 2. Šta je pogrešno — poredano po tome koliko košta

---

## 🔴 A. Sajt izmišlja tri društvene mreže koje nema

**Gdje:** `src/components/SiteFooter.tsx:80, 90, 100` — podnožje, dakle **svih 84
stranica**. Plus `src/components/contact/ContactPageContent.tsx:317, 332, 347`.

**Šta server stvarno vraća** (ispis sa `/kontakt`):
```
href="https://facebook.com/"    ← korijen Facebooka
href="https://tiktok.com/"      ← korijen TikToka
href="https://instagram.com/"   ← korijen Instagrama
```
A vidljivi tekst pored njih glasi:
```
Instagram & Sporočila    @seherezada_si
Facebook stran           Šeherezada Ljubljana
TikTok profil            @seherezada_si
```

**U čemu je stvar:** sajt **imenuje** tri profila kao da postoje — daje im ime i
korisničko ime — a nijedan link ne vodi ni na kakav profil. Gost klikne „Facebook
stran — Šeherezada Ljubljana" i završi na naslovnici Facebooka.

`docs/PREDAJA.md` u sekciji 8 kaže: *„Facebook i TikTok linkovi — ikone su
uklonjene dok ne stignu."* **Nisu uklonjene.** Žive su i objavljuju se sutra.

**Šta biznis gubi:** ovo je tačno ona greška zbog koje je cijeli projekat dobio
pravilo „ništa se ne izmišlja" — izmišljena jela, lažne recenzije, nepostojeći
oglasi za posao. Sve to je počišćeno, a ovo je ostalo. Gost koji klikne i završi
na praznom Facebooku ne misli „nemaju profil", nego „sajt me laže". A vi ste
halal restoran — povjerenje vam je proizvod.

**Šta uraditi:** isto što i sa Woltom — **prazan niz znači da se ikona ne
iscrtava.** Instagram `@seherezada_si` izgleda kao pravi nalog: potvrdite ga i
ostavite. Facebook i TikTok sklonite dok ne budu stvarni.

---

## 🔴 B. Kad neko podijeli link na lokal — pregled je na slovenačkom, u svih pet stranih jezika

**Gdje:** `src/app/[locale]/lokacije/[slug]/page.tsx`, redovi 48 i 59.

**Šta server vraća** — ovo je ispis sa **njemačke** stranice
`/de/standorte/trubarjeva-31`:
```
og:title        Šeherezada — Trubarjeva cesta 31, Ljubljana
og:description  Naša izvirna lokacija v samem osrčju stare Ljubljane. Popolna
                točka za hitro kosilo, nočni prigrizek ali sproščeno posedanje
                v bohemskem ritmu Trubarjeve ulice.
```
Isti slovenački tekst stoji na `en`, `it`, `bs` i `tr` verzijama. Programski
sam uporedio sve jezike sa slovenačkim izvorom:
```
og:title              identično slovenačkom na 10 stranica
og:description        identično slovenačkom na 10 stranica
twitter:title         identično slovenačkom na 10 stranica
twitter:description   identično slovenačkom na 10 stranica
```
**Isto tako, opis koji ide u Google rezultat** ima slovenački komad usred
prevedene rečenice:
```
/en/locations/trubarjeva-31   "Open 09:00 – 02:00, pet in sob do 03:00."
/de/standorte/slovenska-55    "Geöffnet 08:00 – 01:00, vsak dan."
/it/sedi/trubarjeva-31        "Aperto 09:00 – 02:00, pet in sob do 03:00."
/tr/subeler/slovenska-55      "Açılış: 08:00 – 01:00, vsak dan."
```

**Zašto se to dešava:** prevodi **postoje** — `messages/en.json:850` sadrži
`"09:00 – 02:00, Fri and Sat until 03:00"`. Vidljivi dio stranice ih uredno
koristi (provjerio sam njemačku stranicu — potpuno prevedena). Ali generator
meta oznaka uzima podatke direktno iz `src/data/locations.ts`, zaobilazeći
prevodilački sloj `src/i18n/locationText.ts` koji koristi ostatak stranice.

**Šta biznis gubi:** dvije stvari koje ste u zadatku sami naveli kao cilj.
Prvo — Nijemac koji vidi vaš rezultat u Googlu čita njemačku rečenicu koja se
usred sebe pretvori u slovenački; to obara postotak klikova. Drugo — kad neko
pošalje link na WhatsApp ili Facebook, pregled je **cijeli** na slovenačkom.
Turista koji je dobio link od prijatelja vidi jezik koji ne razumije.

**Šta uraditi:** ista ta stranica već ima gotov prevodilački sloj. Meta oznake
treba da uzimaju podatke odatle, kao što ih uzima vidljivi dio.

**Sitnica u istom fajlu:** italijanski `og:title` kaže „Ljubljana", a vaša
vlastita odluka je da u italijanskom ide „Lubiana".

---

## 🔴 C. Kontakt forma laže gostu — a nudi rezervaciju stola

Ovo znate i piše u `PREDAJA.md`. Ne bih ponavljao da nisam vidio **šta forma
nudi**:
```
Zadeva sporočila:  Splošno vprašanje ali pohvala
                   Rezervacija mize za skupine        ← ovo
                   Študentska prehrana (Boni)
                   Poslovno sodelovanje / Zaposlitev
```
I tekst iznad: *„Želite rezervirati mizo za večjo skupino…"*

**Zašto je gore nego što izgleda:** nije riječ o izgubljenom mejlu. Gost
rezerviše sto za grupu od dvanaest ljudi, dobije „poslano", dođe u subotu
naveče — i nema ništa. To je pokvarena večer, ljut gost i loša recenzija na
Googlu. A loša recenzija na Googlu **direktno** obara vašu poziciju u lokalnoj
pretrazi, koja je cijela poenta ovog sajta.

**Šta uraditi:** dok mail ne proradi, ili sklonite formu, ili joj sklonite
opciju rezervacije i ostavite jasno: **„Za rezervacije nas nazovite:
+386 69 314 316."** Telefon radi danas, forma ne.

---

## 🟠 D. Dvije najvrjednije stranice su najslabije nalinkovane na sajtu

Napravio sam mapu svih internih linkova. Evo koliko stranica linkuje na koju:

```
  2 linka   /studentski-boni      ← samo naslovnica i /pogosta-vprasanja
  2 linka   /halal                ← samo naslovnica i /pogosta-vprasanja
  6 linkova /lokacije/trubarjeva-31
  6 linkova /lokacije/slovenska-55
 14 linkova /blog                 ← sa SVAKE stranice (meni + podnožje)
 14 linkova /zaposlitev           ← sa SVAKE stranice
 14 linkova /piskotki             ← sa SVAKE stranice
 14 linkova /politika-zasebnosti  ← sa SVAKE stranice
```

Glavni meni sadrži:
```
/  /meni  /galerija  /o-nas  /pogosta-vprasanja  /zaposlitev  /blog  /kontakt
```

**U čemu je stvar:** `/halal` i `/studentski-boni` su jedine dvije stranice koje
ste napravili **baš zato** da uhvate „halal restavracija Ljubljana" i „študentski
boni". Nisu u meniju. Dobijaju najmanje interne snage na cijelom sajtu.

U istom tom meniju su **prazan blog** i **prazna stranica za posao**, koje
dobijaju maksimalnu snagu i nemaju šta ponuditi.

Google interne linkove čita kao vaše mišljenje o tome šta je važno. Trenutno
sajt Googlu govori: politika kolačića je sedam puta važnija od halal stranice.

**Šta biznis gubi:** „študentski boni Ljubljana" i „halal restavracija Ljubljana"
su vjerovatno vaše dvije najunosnije pretrage — student koji traži gdje da
potroši bon dolazi svaki dan, ne jednom. Te stranice se bore sa jednom rukom
vezanom.

**Šta uraditi:** u glavni meni: `/halal` i `/studentski-boni`. `/zaposlitev` i
`/blog` u podnožje. Ništa se ne briše, samo se mijenja mjesto.

---

## 🟠 E. Nigdje na sajtu nema veze ka Google profilima — a na njima sve stoji

**Šta sam tražio i nisam našao:**
```
sameAs u strukturiranim podacima          nema ga ni u jednom bloku
link na Google Business Profil            nema ga nigdje na sajtu
link na Google recenzije                  nema ga nigdje
```

Dugme „Kako priti" vodi na **pretragu**, ne na profil:
```
https://www.google.com/maps/search/?api=1&query=Šeherezada+Trubarjeva+cesta+31+Ljubljana
```

**U čemu je stvar:** cijela vaša strategija stoji na tome da Google poveže ovaj
sajt sa **dva** Google Business Profila. U `PREDAJA.md` piše da ćete u svaki GBP
upisati adresu njegove lokacijske stranice — to je jedna polovina veze. Druga
polovina — da sajt pokaže nazad na profile — **ne postoji**.

`sameAs` je tačno to polje. Njime kažete Googlu: „ovaj sajt i onaj profil na
mapi su isti posao." Bez njega Google to mora pogađati.

**Šta biznis gubi:** restoran ima ~1.900 pravih recenzija sa prosjekom 4,5 (piše
u `src/data/reviews.ts`). To je vaša najveća imovina i ona živi na Google
profilu. Sajt je ne koristi i ne pokazuje na nju. Gost koji je stigao na sajt
nema gdje kliknuti da vidi da vam 1.900 ljudi vjeruje.

**Šta uraditi:**
1. Otvorite oba lokala na Google Maps, uzmite **pravi link profila** (onaj
   `maps.app.goo.gl/...` iz dugmeta „Deli"), ne link pretrage.
2. Ti linkovi idu u `sameAs` u strukturiranim podacima, i kao dugmad na
   lokacijskim stranicama.
3. Dodajte vidljivo dugme **„Poglejte 1.900 mnenj na Googlu"**. Ne izmišljate
   ništa — brojka je prava.

---

## 🟠 F. Strukturirani podaci: nedostaju koordinate, a cijena se sama sebi protivi

**Šta server vraća na `/lokacije/trubarjeva-31`** — dva bloka o istom restoranu
na istoj stranici:
```
blok „lokacija"       "priceRange": "€€"
blok „firma"          "priceRange": "€"
```
Isti restoran, dvije različite cjenovne oznake u istom HTML-u. Google uzme jednu
— ne znate koju.

**Šta nedostaje u svim blokovima:**
```
geo (lat/lon)          nema ni u jednom bloku          ← za lokalnu pretragu
sameAs                 nema                            ← vidi tačku E
image na lokacijama    nema                            ← Google ga preporučuje
hasMenu na firmi       nema (postoji samo na lokaciji) ← meni nije povezan
openingHoursSpec       nema na bloku firme
acceptsReservations    nema (a nudite rezervacije)
```

Meni je uzgred odlično opisan — `Menu` blok ima svoj `@id`
(`https://seherezada.net/meni#menu`), ali ga blok o firmi **ne poziva**. Dva
tačna podatka stoje jedan pored drugog, a Google ne zna da su povezani.

`src/data/locations.ts` uopšte nema polja za geografsku širinu i dužinu.

**Šta uraditi:** uskladiti `priceRange` (kod vas je realno `€`), dodati
`lat`/`lng` u `locations.ts`, i povezati blok firme sa menijem preko `@id`.

---

## 🟠 G. Namjera „gdje jesti u Ljubljani" — 0 pojavljivanja, u svih šest jezika

U vlastitoj tabeli ciljeva imate pet namjera. Za jednu od njih na sajtu nema
**ni jedne riječi**:

```
grep "kje jesti"      messages/sl.json   →  0 pogodaka
grep "where to eat"   messages/en.json   →  0 pogodaka
grep "wo essen"       messages/de.json   →  0 pogodaka
grep "dove mangiare"  messages/it.json   →  0 pogodaka
grep "nerede yemek"   messages/tr.json   →  0 pogodaka
grep "gdje jesti"     messages/bs.json   →  0 pogodaka
```

**Zašto je to promašaj:** „kje jesti v Ljubljani" nije pretraga na koju odgovara
naslovnica restorana — to je pretraga na koju odgovara **tekst**. To je bio
posao bloga. Blog postoji kao prazna ljuska.

---

## 🟠 H. Dvanaest praznih adresa u sitemapu

```
/blog        i pet prevoda   →  „Objave pripravljamo"
/zaposlitev  i pet prevoda   →  „Trenutno nimamo odprtih delovnih mest"
```
To je **12 od 84 adrese** koje Googlu nude poruku „ovdje još nema ničega".
Izmjereno po broju riječi, to su najtanje stranice na sajtu:
```
194 riječi  /bs/blog        210  /bs/posao       218  /zaposlitev
204 riječi  /blog           212  /de/blog        231  /en/careers
```
(za poređenje: `/studentski-boni` ima 1.416 riječi, `/halal` 935)

**Šta biznis gubi:** ništa dramatično danas, ali u Search Console ćete za mjesec
dana vidjeti gomilu „Crawled – currently not indexed" i pomisliti da nešto ne
valja. Prazne rubrike su i signal da sajt nije dovršen.

**Šta uraditi:** dvije mogućnosti. Ili napišete prve objave (vidi tačku 3 na
kraju), ili im dodate `noindex` i izbacite ih iz sitemapa dok ne budu pune.
Ostaju vidljive gostima, samo se ne nude Googlu.

---

## 🟠 I. `/meni` nema naslove kategorija — jedini H2 je brojač

Ovo je vaša najvažnija komercijalna stranica. Njena struktura naslova izgleda
ovako:
```
H1   Meni in cene — kebab, falafel in pizza v Ljubljani     ✔ dobar
H2   Prikazanih 29 jedi                                     ← jedini H2
H3   Doner Kebab, Jufka Kebab, Kebab Krožnik, … (28 jela)
```
Kategorije **postoje** u strukturiranim podacima (`Kebab & jufke`, `Falafel`,
`Pizza`, …), ali na stranici su običan `<span>` u dugmadima za filtriranje:
```
"Kebab"    → tag: span
"Falafel"  → tag: span
"Pizza"    → nema samostalno
```

**U čemu je stvar:** jedini H2 na stranici je brojač korisničkog sučelja.
Google gleda naslove da razumije o čemu je koji dio stranice. Vi ciljate „kebab
Ljubljana", „falafel Ljubljana" i „pizza Ljubljana" — a riječi „Kebab",
„Falafel" i „Pizza" nisu naslov nigdje na toj stranici.

**Šta uraditi:** iznad svake grupe jela stavite pravi `<h2>` sa imenom
kategorije. Podatak već postoji, samo se drugačije iscrtava. Usput dobijate i
skokove u Google rezultatu („Jump to: Falafel").

---

## 🟠 J. Lokacijske stranice su najtanje, a baš one idu u Google profile

```
/lokacije/trubarjeva-31    375 riječi,  0 fotografija
/lokacije/slovenska-55     ~380 riječi, 0 fotografija
/kontakt                   397 riječi
```
`src/data/locations.ts` ima šest praznih fotografija (`src: ""`) i stranica
pošteno kaže „Fotografije tega lokala sledijo". Poštenje — da. Ali to su
stranice koje ćete upisati u oba Google Business Profila; one su odredište za
gosta koji vas je našao na mapi.

**Šta uraditi:** fotografije lokala su najlakši dobitak na cijelom sajtu.
Telefon, dnevno svjetlo, šest slika po lokalu: ulaz s ulice, unutrašnjost,
raženj, pult. Uz to još par pasusa o tome šta je oko svakog lokala. Cilj: 600+
riječi po stranici.

**Uzgred, jedan telefon za dva lokala:**
```
/lokacije/trubarjeva-31   "telephone": "+38669314316"
/lokacije/slovenska-55    "telephone": "+38669314316"
```
Google različite telefonske brojeve koristi da razlikuje poslovnice. Ako drugi
lokal ima svoju liniju — upišite je. Ako nema, ostaje ovako, samo je slabije.

---

## 🟡 K. Politika kolačića tvrdi da nabraja sve kolačiće — a ne nabraja

Ovo nije SEO. Ovo je zato što vam je poštenje pravnih tekstova bilo pravilo.

Stranica `/piskotki` kaže: *„Spodnja tabela prikazuje **vse** piškotke, ki se
lahko namestijo na vašo napravo."* U tabeli su dva reda: `cookie_consent`
(u upotrebi) i `_ga` (nije u upotrebi).

**Šta server stvarno radi:**
```
curl -D - http://localhost:3100/
    set-cookie: NEXT_LOCALE=sl; Path=/; SameSite=lax

curl -D - http://localhost:3100/en
    set-cookie: NEXT_LOCALE=en; Path=/; SameSite=lax
```
Kolačić `NEXT_LOCALE` se postavlja na **svakom** učitavanju, prije nego što gost
išta izabere u baneru, i **nije u tabeli**. Provjerio sam i u pregledniku: nakon
brisanja svih kolačića i učitavanja `/kontakt`, `document.cookie` vraća
`NEXT_LOCALE=sl`.

**Druga stvar — Google mapa.** `/kontakt` iscrtava:
```html
<iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy">
```
Nema nikakve provjere pristanka oko nje — pretražio sam `src/components/contact/`
i `src/components/locations/` za riječ `consent`: **nula pogodaka**. Ugrađena
Google mapa je treća strana i postavlja Googleove kolačiće. U tabeli je nema.

**Treća — tekst sam sebi protivrječi.** U sekciji 2 stoji: *„Analitični piškotki:
**Uporabljamo jih** za anonimno spremljanje obiskanosti"* (sadašnje vrijeme), a
u tabeli tri reda niže: *„Ni v uporabi"*.

**Četvrta — opisan je kolačić koji ne postoji.** *„Funkcionalni piškotki …
(npr. izbira poslovalnice Trubarjeva ali Slovenska), da vam ob naslednjem obisku
ni treba ponovno izbirati."* Pretražio sam cijeli `src/` za `localStorage`,
`sessionStorage` i `document.cookie` — jedini kolačić koji vaš kod piše je
`cookie_consent`. Izbor poslovnice se **nigdje ne pamti**.

**Zašto je ovo baš vaš problem:** `PREDAJA.md` sekcija 2 kaže da je politika
kolačića već jednom opisivala tri kolačića kojih nema, i da je to popravljeno.
Popravljeno je djelimično — ostala su četiri nova neslaganja.

**Šta uraditi:** dopisati `NEXT_LOCALE` i Google mapu u tabelu, uskladiti vrijeme
glagola za analitiku, i obrisati opis funkcionalnog kolačića koji ne postoji.
Za mapu je čistije rješenje: ne učitavati je dok gost ne pristane, a do tada
pokazati sliku sa dugmetom „Prikaži zemljevid".

---

## 🟢 L. Sitnice — jeftine, ali ih ima

### Pregled linka na Facebooku ima neispravnu oznaku jezika
```
/de  → og:locale = "de"       treba: de_DE
/it  → og:locale = "it"       treba: it_IT
/tr  → og:locale = "tr"       treba: tr_TR
/bs  → og:locale = "bs"       treba: bs_BA
/en  → og:locale = "en"       treba: en_US ili en_GB
/    → og:locale = "sl_SI"    ✔ jedini ispravan
```
Open Graph traži oblik `jezik_DRŽAVA`. Facebook na neispravnu vrijednost pada
nazad na `en_US`. Uzrok: `site.ts` ima `hreflang: "de"`, a kod radi
`.replace("-", "_")` — što na `de` nema šta zamijeniti. Samo `sl-SI` ima crticu,
zato samo on radi.

### Slika za dijeljenje je 375 KB — možda prevelika za WhatsApp
```
public/images/seherezada-share.jpg    375 586 B   (1200×630)
public/images/seherezada-logo.png     783 042 B   (1024×1024)
```
Namjerno ste izabrali JPEG umjesto AVIF **baš zato** da WhatsApp pokaže pregled.
Ali WhatsApp ima i ograničenje veličine, a 375 KB je blizu granice na koju se
žale. Ista slika na kvaliteti 80 staje u ~120 KB bez vidljive razlike. Bilo bi
šteta da preview ne prođe zbog kilobajta, kad ste zbog njega već žrtvovali format.

Logo od 783 KB skida samo Googleov robot (nije `<img>` na stranici), pa gostima
ne smeta — ali 783 KB za logotip je ipak mnogo.

### Meta `keywords` — 18 stranica, sve na slovenačkom
```
/tr/iletisim  keywords = "Kontakt Šeherezada, Šeherezada Trubarjeva delovni čas, …"
/de/ueber-uns keywords = "Šeherezada Ljubljana, O nas Šeherezada, kebab tradicija …"
```
Na turskoj i njemačkoj stranici stoje slovenačke ključne riječi. Google ovaj tag
ignoriše od 2009. i ne šteti — ali je to neprevedeni slovenački u zaglavlju
stranih stranica, dakle isto curenje koje ste lovili skriptom. Najjednostavnije:
obrisati ga sa svih 18.

### Osam opisa je preko granice na kojoj Google reže
Vaša `PREDAJA` kaže da su svi skraćeni na 128–154 znaka. Izmjereno sada:
```
165  /it/lavora-con-noi      162  /galerija        161  /en
164  /bs/halal               162  /en/careers      161  /de/ueber-uns
161  /lokacije/trubarjeva-31 161  /bs/lokacije/trubarjeva-31
```
Razlog je vjerovatno taj što se `{vseh}`, `{naBon}` i slično popunjavaju iz
podataka, pa dužina raste. Google reže oko 155–160 — zadnja rečenica otpada.

Pet naslova je 61–64 znaka (`/tr/hakkimizda` 64, `/de/blog` 63): Google reže
oko 60.

### `sitemap.xml` — `lastmod` je trenutak gradnje, ne izmjene
Svih 84 adresa imaju identičan datum:
```
<lastmod>2026-08-30T03:05:39.030Z</lastmod>   ← isti na svih 84
```
To znači da će nakon svakog deploya svih 84 stranica tvrditi da su izmijenjene,
i kad nijedna nije. Google na to nauči da vaš `lastmod` ne vrijedi i prestane ga
gledati. `changefreq` i `priority` Google ionako ignoriše od 2015.

### `/lokacije` vraća 404
```
/lokacije    → 404
/lokacije/   → 308 na /lokacije, dakle opet 404
```
U meniju stoji „Lokaciji ▾" kao padajući spisak, pa gost do 404 dolazi samo ako
sam otkuca adresu. Ali zbog toga su i mrvice na lokacijskim stranicama skraćene
na dva člana. Mala stranica `/lokacije` sa obje poslovnice riješila bi oboje i
usput dala prirodno mjesto za „kje jesti v Ljubljani".

### Mrtva postavka u `next.config.ts`
```js
remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]
```
Provjerio sam — nijedna Unsplash slika se više ne koristi. Ostatak iz doba
lažnih fotografija. Dok stoji, `/_next/image` može posluživati bilo koju sliku
sa Unsplasha preko vaše domene.

### Nijedno sigurnosno zaglavlje
```
X-Frame-Options, Content-Security-Policy, X-Content-Type-Options,
Referrer-Policy, Permissions-Policy   →  nema nijednog
```
Nije SEO i Vercel sam dodaje HSTS, ali za sajt sa kontakt formom je red da ima
bar `X-Content-Type-Options` i `Referrer-Policy`.

### `/sl/…` preusmjerava sa 307 umjesto 308
```
/sl/meni  →  307 (privremeno)  →  /meni
```
Trajno preusmjerenje (308) bi bilo tačnije. Kako niko ne linkuje na `/sl/…`,
posljedica je mala.

### `FAQPage` više ne daje zvjezdice
Imate `FAQPage` na `/halal` (6 pitanja) i `/pogosta-vprasanja` (10). Google je
u avgustu 2023. ograničio FAQ prikaz u rezultatima na državne i zdravstvene
sajtove. Oznaka nije štetna i pomaže razumijevanju sadržaja — samo ne očekujte
prošireni prikaz.

---

# 3. Šta bih ja uradio da je moj sajt

Tri stvari koje niste tražili, a koje bih ja stavio ispred pola gornjeg spiska.

## 3.1. Napisao bih pet blog objava — i to baš ovih pet

Blog vam je najveći neiskorišćeni resurs. Nemate budžet za oglase; tekst je
jedini kanal koji ne košta ništa osim vremena. A vi imate nešto što konkurencija
nema: **stvarno znanje o halalu, bonovima i cijenama u Ljubljani.**

Pet tema, po redu koliko donose:

1. **„Kje jesti v Ljubljani s študentskim bonom — celoten seznam pravil"**
   Pokriva namjeru koja vam sad fali (tačka G) i namjeru koja vam najviše
   donosi. Student traži ovo svakog septembra. Vi već imate sve podatke —
   doplata 3,00 €, subvencija 5,19 €, dva bona dnevno, okno 07:00–24:00.
   Konkurencija ovo nema napisano.

2. **„Kako prepoznati pravi halal v Ljubljani"**
   Vi imate certifikat Zavoda Halal i nenajavljene kontrole. Ovo je tekst koji
   samo vi možete napisati pošteno. Hvata i „halal restavracija Ljubljana" i
   povjerenje muslimanskih gostiju i turista.

3. **„Poceni kosilo v centru Ljubljane — koliko stane in kje"**
   Namjera „poceni hrana". Cijene od 1,00 € to dokazuju — bez ijednog
   superlativa, dakle bez sukoba sa zakonom o zaštiti potrošača.

4. **„Veganska ponudba: 7 jedi brez mesa"**
   Odbacili ste `/meni/vegan` kao zasebnu stranicu — to je bila tačna odluka
   jer bi bila prazna. Ali kao **tekst** je odlična: „vegan Ljubljana" je
   pretraga koju kebab restorani ne pokrivaju, a vi imate sedam jela.

5. **„Kaj jesti v Ljubljani ob 2h zjutraj"**
   Trubarjeva radi do 02:00, petkom i subotom do 03:00. To je stvarna prednost
   koju gotovo niko nema. Pretraga postoji svaki vikend.

Svaka objava dobija interni link na `/meni`, `/halal` ili `/studentski-boni` —
čime se usput rješava i problem iz tačke D. **I blog prestaje biti prazna
ljuska iz tačke H.**

Ne moraju sve odjednom i ne moraju na šest jezika. Slovenački prvo. Jedna
objava mjesečno je dovoljna.

## 3.2. Zabilježio bih brojke prije nego što sajt ode u zrak

`PREDAJA.md` to već pominje za GBP Insights, ali proširio bih:

```
prije objave zapiši:   pozivi mjesečno (GBP)
                       zahtjevi za rutu (GBP)
                       pregledi profila (GBP)
                       broj recenzija i prosjek
```

Za šest mjeseci ćete se pitati je li sajt išta donio. Bez polazne tačke to je
osjećaj, ne odgovor. Screenshot iz GBP-a danas košta pet minuta.

## 3.3. Recenzije bih pretvorio iz ukrasa u dokaz

Imate ~1.900 recenzija sa prosjekom 4,5. To je više nego što ima većina
restorana u centru Ljubljane. Na sajtu to živi kao tri citata bez veze prema
izvoru.

Ne mislim na `AggregateRating` — vaša odluka da ga ne stavljate je tačna i ne
diram je. Mislim na nešto jednostavnije: **vidljivu rečenicu i dugme.**

```
„1.900 mnenj na Googlu, povprečje 4,5"   →   [Poglej mnenja na Googlu]
```

Brojka je istinita, dugme vodi na pravi profil (koji vam ionako treba zbog
tačke E), i gost dobija razlog da vam vjeruje prije nego što uđe. To je jedna
rečenica koja radi više od pola SEO posla na ovoj stranici.

---

# Sažetak — šta prvo

| | Šta | Koliko posla |
|---|---|---|
| 1 | Skloniti lažne Facebook/TikTok linkove (tačka A) | 10 min |
| 2 | Riješiti kontakt formu ili skloniti rezervaciju (tačka C) | dok ne stigne mail |
| 3 | Meta oznake lokacija da čitaju prevode (tačka B) | jedan fajl |
| 4 | `/halal` i `/studentski-boni` u glavni meni (tačka D) | 15 min |
| 5 | Pravi linkovi Google profila + `sameAs` (tačka E) | 30 min, treba vlasnik |
| 6 | Fotografije oba lokala (tačka J) | jedno popodne |
| 7 | Naslovi kategorija na `/meni` (tačka I) | jedan fajl |
| 8 | Dopuniti politiku kolačića (tačka K) | 30 min |
| 9 | Prva blog objava (tačka 3.1) | jedno veče |

Tačke 1–4 bih uradio **prije** objave. Ostalo može poslije — ali 5 i 6 ne bih
odgađao duže od prve sedmice, jer bez njih Google profili i sajt ostaju dva
odvojena svijeta.

---

## Jedna rečenica na kraju

Tehnički temelj ovog sajta je bolji nego kod većine plaćenih izrada koje sam
vidio — `hreflang`, kanonski naslovi i disciplina oko izvora podataka su
odrađeni ozbiljno. Ono što fali nije tehnika, nego **posljednji korak**: tri
mjesta gdje sajt još govori nešto što nije istina (društvene mreže, kontakt
forma, politika kolačića), i nekoliko mjesta gdje najvrjedniji sadržaj nije
stavljen tamo gdje ga Google i gost mogu naći.
