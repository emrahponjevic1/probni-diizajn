# Plan ispravki po nezavisnoj reviziji — faza 6

Izvor: `docs/SEO-MISLJENJE.md` (30. 8. 2026).
Svaka stavka ispod ima slovo koje pokazuje na tačku u tom nalazu.

**Prije pisanja ovog plana sam sve nalaze provjerio sam, na produkcijskom
serveru.** Nisu prepisani na vjeru. Šta je potvrđeno stoji u poglavlju 1.

---

## 0. Pravila za ovu fazu

1. **Popravlja se samo ono što je u nalazu.** Ništa se ne dodaje „usput".
   Ako mi tokom rada nešto zapadne za oko, zapisujem u nalaze, ne mijenjam.
2. **Ne izmišljamo podatke.** Koordinate, linkovi Google profila, drugi
   telefon, fotografije — to su stvarni podaci koje moraš dati ti. Dok ih
   nema, polje ostaje prazno, a funkcija se ne iscrtava (isto pravilo kao za
   Wolt dugme).
3. **Jedna faza = jedan commit**, s imenom koje ti javljam, da se možeš vratiti.
4. **Prije i poslije svake faze: snimak.** Vidljivi tekst, JSON-LD i meta
   oznake svih stranica, pa razlika. Ako se promijenilo nešto što nismo htjeli,
   vidi se odmah.
5. **Slovenački tekst koji si odobrio ne diram bez tvoje riječi.** Gdje to
   dolazi u pitanje, u planu piše „čeka tvoju odluku".

---

## 1. Šta sam provjerio prije nego što sam pisao plan

Sve dolje je moj vlastiti ispis sa servera, ne prepis iz nalaza.

```
A  drustvene mreze     SiteFooter.tsx:80,90,100 + ContactPageContent.tsx:317,332,347
                       footer:  facebook.com | instagram.com/seherezada_si | tiktok.com
                       kontakt: instagram.com/ | facebook.com/ | tiktok.com/
                       → dva fajla se čak i međusobno razilaze oko Instagrama

B  meta lokacija       /de/standorte/trubarjeva-31
                         og:description = "Naša izvirna lokacija v samem osrčju…"  (slovenački)
                         description    = "Geöffnet 09:00 – 02:00, pet in sob do 03:00."
                       isto na en, it, bs, tr

F  priceRange          lokacije/[slug]/page.tsx:116  "€€"
                       OrganizationJsonLd.tsx:37     "€"      ← na istoj stranici

E  sameAs              nema nigdje osim u JobPosting (pokazuje na naslovnicu)
   geo / koordinate    nema polja u locations.ts

D  glavni meni         /, /meni, /galerija, /o-nas, /pogosta-vprasanja,
                       /zaposlitev, /blog, /kontakt
                       → /halal i /studentski-boni nisu u meniju

I  naslovi na /meni    H1 = "Meni in cene…", H2 = "Prikazanih 29 jedi"  (jedini H2)

K  NEXT_LOCALE         curl / → set-cookie: NEXT_LOCALE=sl
                       curl /en → set-cookie: NEXT_LOCALE=en
                       → postavlja se prije pristanka, nije u tabeli kolačića

L  og:locale           sl_SI ✔ ; en, de, it, bs, tr — bez države
L  keywords            3 fajla × 6 jezika = 18 stranica, sve slovenački
L  opisi > 155 znakova 19 stranica (165 … 156)
L  naslovi > 60        5 stranica (64 … 61)
L  lastmod             identičan na svih 84
L  /lokacije           404
L  /sl/meni            307 (ne 308)
L  unsplash            next.config.ts:23 — nijedna slika se više ne koristi
L  slike               share.jpg 375 KB · logo.png 783 KB
```

**Sve stoji.** Nijedan nalaz nije bio pogrešan.

### Zašto ovo moja revizija nije uhvatila

Moja `revizija.js` je za opise provjeravala **dužinu, praznoću i duplikate** —
ali ne i **da li je opis ostao slovenački**. A `curenje2.js` gleda samo vidljivi
tekst stranice, ne zaglavlje. Zato je slovenački `og:description` na pet jezika
prošao kroz obje mreže.

To je rupa u alatu, ne slučajnost. Popravljam je u fazi 6B.

---

## 2. Redoslijed — i zašto baš taj

Faze idu ovim redom iz tri razloga:

- **prvo ono što laže gostu**, jer to je jedino što šteti od prvog dana;
- **onda ono što je u jednom sistemu**, da se ne vraćamo dva puta u isti fajl;
- **na kraju ono što čeka tvoje podatke**, da nas ne blokira.

| Faza | Šta | Treba li tebe | Prije objave? |
|---|---|---|---|
| **6A** | Tri mjesta gdje sajt govori neistinu | jedna odluka | **da** |
| **6B** | Prevodi u meta oznakama + rupa u alatu | ne | **da** |
| **6C** | Strukturirani podaci | dijelom | dio da |
| **6D** | Meni, naslovi, `/lokacije`, prazne rubrike | ne | **da** |
| **6E** | Sitnice u zaglavlju i konfiguraciji | ne | poželjno |
| **6F** | Ono što čeka tvoje podatke | **da** | ne |
| **6G** | Sadržaj — blog | **da** | ne |

---

## Faza 6A — Tri mjesta gdje sajt govori neistinu

**Zašto prvo:** ovo je jedina grupa koja šteti odmah po objavi, i jedina koja
krši pravilo od kojeg je cijeli projekat počeo — „ništa se ne izmišlja".

### 6A.1 · Društvene mreže (nalaz A)

Trenutno stanje: sajt **imenuje** tri profila („Facebook stran — Šeherezada
Ljubljana", „@seherezada_si") a linkovi vode na korijen Facebooka, TikToka i
Instagrama. Dva fajla se čak i ne slažu — u podnožju Instagram ima korisničko
ime, na kontaktu nema.

Šta radim:

- Podaci o mrežama sele u `src/data/social.ts` — **jedan izvor**, kao sve
  ostalo. Prazan niz znači: ikona se ne iscrtava. Isto pravilo kao Wolt.
- Podnožje i kontakt čitaju odatle, pa se više ne mogu razići.
- Facebook i TikTok ostaju **prazni** dok mi ne daš prave adrese.
- Instagram: u podnožju već stoji `instagram.com/seherezada_si`. **Potvrdi mi
  da je taj nalog stvarno vaš** pa ga ostavljam; ako nije, i on ide u prazno.

Fajlovi: `src/data/social.ts` (novi), `SiteFooter.tsx`, `ContactPageContent.tsx`

### 6A.2 · Kontakt forma nudi rezervaciju koju niko ne primi (nalaz C)

Znamo da forma ne šalje. Novo u nalazu je **šta nudi**: opciju „Rezervacija
mize za skupine" i tekst „Želite rezervirati mizo za večjo skupino…".

Gost rezerviše sto za dvanaest ljudi, dobije „poslano", dođe u subotu — i nema
ništa. To je loša recenzija na Googlu, a loša recenzija direktno obara poziciju
u lokalnoj pretrazi.

**Ovdje mi treba tvoja odluka.** Tri mogućnosti:

| | Šta se radi | Posljedica |
|---|---|---|
| **1** *(predlažem)* | Sklonim opciju rezervacije i sve o rezervacijama iz forme; umjesto toga vidno: **„Za rezervacije nas pokličite: +386 69 314 316"** | Forma ostaje za obična pitanja. Rezervacije idu telefonom, koji radi. |
| 2 | Sklonim cijelu formu do SMTP-a | Nema više laganja, ali ni kanala za pitanja |
| 3 | Ostaje kako jest | Ne preporučujem |

Fajlovi: `ContactPageContent.tsx`, `messages/*.json` (6 jezika)

### 6A.3 · Politika kolačića opisuje kolačiće koje nema, a prešućuje one koje ima (nalaz K)

Stranica tvrdi da tabela prikazuje **sve** kolačiće. Četiri neslaganja:

1. **`NEXT_LOCALE` nije u tabeli**, a postavlja se pri svakom učitavanju, prije
   pristanka. (Provjerio sam curlom — stoji.)
2. **Google mapa na `/kontakt`** se učitava bez ikakve provjere pristanka i
   postavlja Googleove kolačiće. Nije u tabeli.
3. **Tekst sam sebi protivrječi**: u tekstu „analitične *uporabljamo*", u
   tabeli „ni v uporabi".
4. **Opisan je funkcionalni kolačić koji ne postoji** — „pamti izbor
   poslovnice". Ništa se ne pamti.

Šta radim: dopišem `NEXT_LOCALE` i Google mapu u tabelu, uskladim vrijeme
glagola za analitiku, obrišem opis nepostojećeg kolačića. Sve na 6 jezika.

Za mapu predlažem i **da se ne učitava dok gost ne pristane** — do tada slika
sa dugmetom „Prikaži zemljevid". To je i pravno čistije i brže. **Reci da/ne** —
ako ne, ostaje samo upis u tabelu.

Fajlovi: `messages/*.json`, `PiskotkiPageContent.tsx`, po potrebi
`ContactPageContent.tsx`

---

## Faza 6B — Prevodi u meta oznakama

**Zašto druga:** jedan uzrok, jedan popravak, i tiče se svih pet stranih jezika.

### 6B.1 · Meta oznake lokacija čitaju slovenačke podatke (nalaz B)

Prevodi **postoje** i vidljivi dio stranice ih uredno koristi. Ali
`generateMetadata` uzima podatke direktno iz `locations.ts` i zaobilazi
prevodilački sloj `src/i18n/locationText.ts`.

Posljedica: `og:title`, `og:description`, `twitter:*` su **potpuno slovenački**
na 10 stranica, a opis za Google ima slovenački komad usred prevedene rečenice
(„Geöffnet 09:00 – 02:00, **pet in sob do 03:00**").

Šta radim: `generateMetadata` čita iz istog sloja iz kojeg čita i stranica.
Usput: italijanski `og:title` treba da kaže **Lubiana**, po našoj vlastitoj
odluci.

Fajlovi: `src/app/[locale]/lokacije/[slug]/page.tsx`

### 6B.2 · `og:locale` nije u traženom obliku (nalaz L)

Open Graph traži `jezik_DRŽAVA`. Kod radi `.replace("-", "_")` nad
`hreflang` vrijednošću — a samo `sl-SI` ima crticu, pa samo on ispadne tačan.
Facebook na neispravnu vrijednost pada nazad na `en_US`.

Šta radim: u `site.ts` dodajem posebno polje za Open Graph oznaku
(`sl_SI`, `en_GB`, `de_DE`, `it_IT`, `bs_BA`, `tr_TR`) i kod čita njega.
**`hreflang` ostaje kakav jeste** — tamo je jezik bez države namjeran i tačan.

Fajlovi: `src/data/site.ts`, `src/i18n/meta.ts`, tri stranice sa slugom

### 6B.3 · Brisanje `keywords` (nalaz L)

Na 18 stranica (3 fajla × 6 jezika) stoje **slovenačke** ključne riječi — i na
turskoj i na njemačkoj stranici. Google ovaj tag ignoriše od 2009., dakle ne
šteti rangiranju, ali je to neprevedeni slovenački u zaglavlju stranih stranica.

Ranije sam ga ostavio jer brisanje nije bila moja odluka. Sada je nalaz.
**Brišem sa sve tri stranice** — osim ako kažeš da ostane.

Fajlovi: `blog/page.tsx`, `kontakt/page.tsx`, `o-nas/page.tsx`

### 6B.4 · Krpljenje rupe u alatu

Dopunjujem `revizija.js` da za svaku stranu stranicu provjeri da **naslov,
opis, `og:title` i `og:description` nisu identični slovenačkima**. To je
provjera koja bi nalaz B uhvatila prvog dana.

Fajl: skripta u `scripts/`

---

## Faza 6C — Strukturirani podaci

### 6C.1 · Isti restoran, dvije cijene (nalaz F)

Na istoj stranici: blok lokacije kaže `€€`, blok firme kaže `€`. Google uzme
jednu, ne znamo koju. **Usklađujem na `€`** — to je realno za vas (jela od
1,00 €). Reci ako misliš drugačije.

### 6C.2 · Meni nije povezan sa firmom (nalaz F)

`Menu` blok ima svoj `@id` (`…/meni#menu`), ali ga blok o firmi ne poziva. Dva
tačna podatka stoje jedan pored drugog, a Google ne zna da su povezani.
Dodajem `hasMenu` na blok firme, preko `@id`.

### 6C.3 · Radno vrijeme i slika na bloku firme (nalaz F)

Blok firme nema `openingHoursSpecification` ni `image` na lokacijama. Oboje se
**već računa iz podataka** koje imamo — samo se ne prosljeđuje u oznaku.
Slika: dok fotografija lokala nema, ide zajednička slika sajta.

### 6C.4 · Koordinate (nalaz F) — **čeka tvoje podatke**

`locations.ts` nema polja za geografsku širinu i dužinu. Za lokalnu pretragu
je to korisno.

**Neću ih izmisliti ni izvući iz ugrađene mape** — one u linku mape su
zaokružene i mogu pokazati preko puta. Treba mi tačna vrijednost: na Google
Maps desni klik na svaki lokal → prvi red u meniju su koordinate. Pošalji dva
para brojeva.

Dok ne stignu, polje ostaje prazno i `geo` se ne ispisuje.

### 6C.5 · `sameAs` ka Google profilima (nalaz E) — **čeka tvoje podatke**

Ovo je važnije nego što zvuči. Cijela strategija stoji na tome da Google poveže
sajt sa **dva** Google profila. U profil upisuješ adresu lokacijske stranice —
to je jedna polovina. Druga polovina, da sajt pokaže nazad, **ne postoji**.

Treba mi **pravi link profila** za oba lokala — onaj `maps.app.goo.gl/…` iz
dugmeta „Deli" na Google Maps. **Ne link pretrage** (dugme „Kako priti"
trenutno vodi na pretragu, ne na profil).

Kad stignu: idu u `sameAs`, i kao dugme na lokacijskim stranicama.

Fajlovi: `OrganizationJsonLd.tsx`, `lokacije/[slug]/page.tsx`, `locations.ts`

---

## Faza 6D — Gdje sajt kaže Googlu šta mu je važno

### 6D.1 · Dvije najvrjednije stranice nisu u meniju (nalaz D)

Mjereno po broju stranica koje linkuju na njih:

```
 2 linka   /studentski-boni      ← napravljena baš za "študentski boni"
 2 linka   /halal                ← napravljena baš za "halal restavracija"
14 linkova /blog                 ← prazan
14 linkova /zaposlitev           ← prazan
14 linkova /piskotki             ← politika kolačića
```

Sajt trenutno govori Googlu da je politika kolačića sedam puta važnija od halal
stranice.

Šta radim: `/halal` i `/studentski-boni` **u glavni meni**, `/zaposlitev` i
`/blog` **u podnožje**. Ništa se ne briše, samo mijenja mjesto. Meni ostaje
iste dužine (8 stavki).

Fajlovi: `SiteNavbar.tsx`, `SiteFooter.tsx`

### 6D.2 · `/meni` nema naslove kategorija (nalaz I)

Najvažnija komercijalna stranica ima **jedan jedini H2**, i to brojač
(„Prikazanih 29 jedi"). Kategorije postoje u strukturiranim podacima, ali su na
stranici običan `<span>` u dugmadima za filtriranje.

Ciljamo „kebab Ljubljana", „falafel Ljubljana", „pizza Ljubljana" — a te riječi
nisu naslov nigdje na toj stranici.

Šta radim: iznad svake grupe jela pravi `<h2>` s imenom kategorije. **Podatak
već postoji**, mijenja se samo kako se iscrtava. Vizuelno se mijenja malo —
pokazaću ti snimak prije nego što potvrdim.

Fajlovi: `MeniPageContent.tsx` (+ CSS)

### 6D.3 · Stranica `/lokacije` (nalaz L)

`/lokacije` sada vraća 404. Zbog toga su i mrvice na lokacijskim stranicama
skraćene na dva člana.

Mala stranica sa obje poslovnice rješava oboje: nestaje 404, mrvice dobijaju
treći član, i dobijamo prirodno mjesto za namjeru „kje jesti v Ljubljani"
(nalaz G) bez ijedne izmišljene riječi — samo adrese, radno vrijeme i po jedan
pasus o okolini.

Ide u sitemap i u `hreflang`, dakle 6 novih adresa (84 → 90).

**Ovo je jedina faza koja pravi novu stranicu.** Ako ti se ne sviđa, preskačemo
je i ostaje na 404 — reci.

### 6D.4 · Dvanaest praznih adresa (nalaz H)

`/blog` i `/zaposlitev` u šest jezika = 12 adresa koje Googlu nude „ovdje još
nema ničega". To su najtanje stranice na sajtu (194–231 riječ, naspram 1.416 na
`/studentski-boni`).

Šta radim: **dok su prazne** — `noindex` i van sitemapa. Ostaju vidljive
gostima i u navigaciji, samo se ne nude Googlu. Čim se pojavi prva objava ili
prvi oglas, sami se vraćaju — provjera je na broju unosa, ne ručni prekidač.

Fajlovi: `blog/page.tsx`, `zaposlitev/page.tsx`, `sitemap.ts`

---

## Faza 6E — Sitnice

Sve pojedinačno malo, zajedno vrijedi.

| | Šta | Fajl |
|---|---|---|
| **6E.1** | 19 opisa preko 155 znakova, 5 naslova preko 60 | `messages/*.json` |
| **6E.2** | `lastmod` u sitemapu — isti na svih 84 pri svakom deployu; Google nauči da ne vrijedi i prestane ga gledati. Mičem ga (bolje nego lažan). | `sitemap.ts` |
| **6E.3** | Brisanje `unsplash` iz `remotePatterns` — nijedna slika se ne koristi, a dok stoji, `/_next/image` može posluživati bilo šta sa Unsplasha preko naše domene | `next.config.ts` |
| **6E.4** | Sigurnosna zaglavlja: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` | `next.config.ts` |
| **6E.5** | `/sl/…` → 308 umjesto 307 | `proxy.ts` |
| **6E.6** | `share.jpg` 375 KB → ~120 KB (kvalitet 80, bez vidljive razlike). WhatsApp ima granicu, a JPEG smo izabrali **baš zbog** WhatsAppa | `public/images/` |

**6E.1 — jedna napomena:** od 19 predugih opisa, četiri su slovenački
(`/galerija`, `/zaposlitev`, `/politika-zasebnosti`, `/lokacije/…`). Strane
skraćujem sam; **za slovenačke mi treba tvoje da** — kao prošli put.

**6E.6 — logo od 783 KB** skida samo Googleov robot, nije `<img>` na stranici,
pa gostima ne smeta. Mogu ga smanjiti, ali nije hitno. Reci hoćeš li.

---

## Faza 6F — Čeka tvoje podatke

Ovdje ne pišem kod dok ne stigne podatak. Spisak da ti bude na jednom mjestu:

| | Šta mi treba | Za šta |
|---|---|---|
| 1 | Link Google profila za **oba** lokala (`maps.app.goo.gl/…` iz „Deli") | `sameAs`, dugmad, veza sajt ↔ profil (6C.5) |
| 2 | Koordinate oba lokala (desni klik na Maps) | `geo` u strukturiranim podacima (6C.4) |
| 3 | Da li je `instagram.com/seherezada_si` vaš nalog | 6A.1 |
| 4 | Facebook i TikTok — postoje li uopšte | 6A.1 |
| 5 | Ima li Slovenska 55 **svoj telefon** | Google razlikuje poslovnice po broju |
| 6 | Fotografije oba lokala — 6 po lokalu, telefon i dnevno svjetlo je dovoljno: ulaz s ulice, unutrašnjost, raženj, pult | nalaz J — lokacijske stranice su odredište iz Google profila, a sada nemaju nijednu sliku |
| 7 | SMTP podaci kad zakupiš poslovni mail | kontakt forma |

Uz to, jedna stvar koja nije kod (nalaz 3.2): **prije objave prepiši brojke iz
Google profila** — pozivi mjesečno, zahtjevi za rutu, pregledi, broj recenzija
i prosjek. Za šest mjeseci ćeš se pitati je li sajt išta donio; bez polazne
tačke to je osjećaj, ne odgovor. Screenshot košta pet minuta.

---

## Faza 6G — Sadržaj (tvoja odluka)

Nalaz G je tačan: namjera **„gdje jesti u Ljubljani" ima nula pojavljivanja u
svih šest jezika**. To nije greška u kodu — to je tekst koji nije napisan.

Agent predlaže pet tema. Ne ulazim u to dok ne kažeš, jer je to sadržaj o vašem
poslu, ne kod:

1. Gdje jesti u Ljubljani sa studentskim bonom — sva pravila
2. Kako prepoznati pravi halal u Ljubljani
3. Jeftin ručak u centru — koliko košta i gdje
4. Veganska ponuda: 7 jela bez mesa
5. Šta jesti u Ljubljani u 2h ujutro

Sve podatke za prve četiri **već imamo u sajtu** (doplata 3,00 €, subvencija
5,19 €, dva bona dnevno, okno 07:00–24:00, certifikat, cijene od 1,00 €,
7 veganskih jela). Peta stoji na tome da Trubarjeva radi do 02:00, petkom i
subotom do 03:00 — to je stvarna prednost koju gotovo niko nema.

Ako kažeš da, **pišemo slovenački prvo**, jednu po jednu. Ne moraju sve
odjednom i ne moraju odmah na šest jezika.

---

## 3. Šta NE radimo — i zašto

Da bude jasno prije nego počnemo:

- **Ne dodajemo `AggregateRating`.** Ni agent to ne traži. Zvjezdice dolaze iz
  Google profila.
- **Ne izmišljamo koordinate ni linkove profila.** Prazno polje je pošteno,
  pogrešna koordinata šalje gosta preko puta.
- **Ne diramo `FAQPage`.** Google od 2023. ne prikazuje FAQ u rezultatima za
  ovakve sajtove, ali oznaka nije štetna i pomaže razumijevanju sadržaja.
- **Ne mijenjamo `hreflang`** u oblik sa državom. Tamo je jezik bez države
  namjeran: njemački gost iz Austrije treba istu stranicu.
- **Ne diramo brzinu u ovoj fazi.** Agent nije mogao izmjeriti LCP i pošteno je
  to rekao. Mjerimo tek na živoj domeni, pa onda odlučujemo.
- **Ne diramo kontrast** — tvoja ranija odluka.
- **Ne mijenjamo slovenački tekst koji si odobrio** bez tvoje riječi.

---

## 4. Kako provjeravam da nismo ništa pokvarili

Isto kao dosad, jer je dosad radilo:

```
prije faze   snimak vidljivog teksta, JSON-LD i meta oznaka svih stranica
poslije      isti snimak, pa razlika — mora se promijeniti samo ono što smo htjeli
uvijek       revizija.js + revizija2.js + hreflang.js na svih 84 (uskoro 90) adresa
             provjeri-prevod.js za svih 5 jezika
             npm run build — sve stranice moraju ostati statične
```

Nakon 6B mreža dobija i provjeru da meta oznake nisu ostale slovenačke — rupu
kroz koju je nalaz B prošao.

---

## 5. Šta mi treba od tebe da krenem

Četiri odluke. Ostalo je jasno.

| | Pitanje | Moj prijedlog |
|---|---|---|
| 1 | Kontakt forma (6A.2) | Sklonim rezervaciju, ostavim telefon |
| 2 | Google mapa iza pristanka (6A.3) | Da |
| 3 | Nova stranica `/lokacije` (6D.3) | Da |
| 4 | Skraćivanje 4 slovenačka opisa (6E.1) | Da |

I potvrda za Instagram (`@seherezada_si` — je li vaš).

Čim kažeš, krećem od **6A**.
