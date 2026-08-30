# Druga revizija — nalaz

Datum: 30. 8. 2026 · Provjereno na **produkcijskom serveru** (`npm run build && npx next start -p 3100`).

**Ništa u kodu nije mijenjano.** Ovo je samo nalaz.

---

## Kratak odgovor na pitanje „možemo li objaviti"

**Tehnički — da.** Sajt je u boljem stanju nego većina onoga što se objavljuje.
Provjerio sam svih 90 adresa i nisam našao nijednu regresiju od devet commita.

**Ali prije nego pritisneš dugme, popravi jednu stvar** — ugrađena mapa za
Slovensku 55 pokazuje mjesto **253 metra** od lokala. To je nalaz A niže.
Popravka traje pet minuta i ne bih je odgađao, jer je to podatak po kojem gost
hoda.

Ostalo može poslije objave.

---

## Šta sam provjerio

Skinuo sam svih **90 adresa** iz sitemapa i uporedio ono što server stvarno
vraća sa onim što tvrdite. Dodatno sam:

- **razriješio oba Google linka profila** i uporedio prave koordinate sa vašim
- **provjerio da svaka vanjska adresa na sajtu stvarno postoji** (11 različitih)
- ponovo napravio mapu internih linkova
- uporedio strukturirane podatke sa vidljivim tekstom, jelo po jelo, cijenu po cijenu
- ponovo pustio tražilac slovenizama u meta oznakama, u svih pet jezika

Brzinu i dalje ne mjerim — kartica preglednika u kojem radim je skrivena, a
skrivena kartica ne crta. Svaki LCP broj bio bi izmišljen.

---

# 1. Šta je potvrđeno da radi

Nisam vam vjerovao na riječ. Ovo je izmjereno.

### Struktura sajta — bez nalaza
```
90 adresa iz sitemapa            svih 90 vraća 200, nijedna nije preusmjerenje
138 blokova strukturiranih pod.  svih 138 je validan JSON
canonical                        svih 90 pokazuje na samu sebe
hreflang                         7 tagova na svakoj, svaka navodi i sebe
og:image                         na svih 90
naslovi                          0 duplikata, 0 preko 60 znakova
opisi                            0 duplikata, 0 preko 155 znakova
H1                               tačno jedan na svakoj od 90
slike bez alt teksta             0
meta keywords                    0 / 90
noindex zaostao negdje           0
```

### Nalaz A iz prve revizije — zatvoren
```
linkovi na facebook/instagram/tiktok na cijelom sajtu:  0
```
`src/data/social.ts` sa praznim poljima, isto pravilo kao Wolt. Korisničko ime
je izašlo i iz prevoda. Nema više ni imena profila bez profila.

### Nalaz B — zatvoren, i bolje nego što sam tražio
Njemačka stranica lokala sada vraća:
```
description     Šeherezada in der Trubarjeva cesta 31, 1000 Ljubljana.
                Geöffnet 09:00 – 02:00, Fr und Sa bis 03:00. Anfahrt und die
                Speisekarte mit Studentenbons.
og:description  Unser erster Standort mitten in der Altstadt von Ljubljana…
og:locale       de_DE
```
Italijanska: `og:title` piše **Lubiana**, a `description` zadržava „1000
Ljubljana" — poštanska adresa ostaje poštanska adresa. To je tačno razlikovanje.

Tražilac slovenizama u meta oznakama sada javlja samo `og:title` tipa
„Šeherezada — Trubarjeva cesta 31, Ljubljana" na osam stranica. **To je lažni
alarm** — u toj rečenici nema šta da se prevede osim imena grada, koje je u
en/de/bs/tr ionako „Ljubljana". Nema šta popravljati.

### Nalaz C — rezervacije i catering
```
grep "rezervacij|reservation|reservierung|prenotazi|rezervasyon|catering"
   sl 0 · en 0 · de 0 · it 0 · bs 0 · tr 0
```
Nula u svih šest jezika.

### Nalaz D — interno povezivanje
```
prije:  /halal 2 stranice, /studentski-boni 2 stranice
sada:   /halal 15 stranica, /studentski-boni 15 stranica
```
Glavni meni: `Domov · Meni · Galerija · O nas · Študentski boni · Halal ·
Zaposlitev · Kontakt`. (O `Zaposlitev` u ovom spisku — vidi nalaz C niže.)

### Nalaz E — Google profili · **razriješio sam oba linka, oba su prava**
```
maps.app.goo.gl/dmCFr6EhV1ycSDg4A
  → 302 → .../maps/place/Šeherezada/@46.0524433,14.5098335
maps.app.goo.gl/M3aL2Bz8ND1q1e3v5
  → 302 → .../maps/place/Šeherezada+2+pizza&falafel/@46.0561156,14.5049406
```
`sameAs` stoji na tri nivoa — firma, oba `department`-a, i svaki lokal. Nula
linkova na pretragu, kako i pišete.

### Nalaz F — koordinate su tačne na metar i po
Uporedio sam vaše koordinate sa onim što Google sam vrati za te profile:
```
Trubarjeva   vaše 46.052483990380814, 14.50992102057708
             Google 46.0524756, 14.5099062        razmak: 1,5 m
Slovenska    vaše 46.05616240965046, 14.505044866008422
             Google 46.0561569, 14.5050245        razmak: 1,7 m
```
Vlasnik ih je odčitao tačno. `priceRange` je sada `€` u oba bloka, `hasMenu`
pokazuje na meni tog jezika, `openingHoursSpecification` i `image` su na firmi.

### Nalaz I — naslovi na `/meni`
```
H1  Meni in cene — kebab, falafel in pizza v Ljubljani
H2  Kebab & jufke (6) · Falafel & priloge (7) · Krožniki & piščanec (6) ·
    Burgerji (4) · Pizze (6)
```
Njemačka verzija: `Döner & Wraps · Falafel & Beilagen · Teller & Hähnchen ·
Burger · Pizzen`. Prevedeno, ne prepisano.

Uporedio sam brojeve pod krugovima sa izvorom: `6+7+6+4+6 = 29`, a
`MenuData.ts` daje `student: true` 19 puta i `diet: "vegan"` 7 puta — tačno ono
što piše u uvodu stranice. Cijene: svih 36 vidljivih iznosa postoji i u
strukturiranim podacima, nijedan iznos ne postoji samo na jednom mjestu.

### Nalaz K — politika kolačića
Tabela sada glasi:
```
cookie_consent        Nujni          Šeherezada (1. oseba)      V uporabi
NEXT_LOCALE           Funkcionalni   Šeherezada (1. oseba)      V uporabi
_ga, _ga_*            Analitični     Google Analytics           Ni v uporabi
Google Maps           Tretja oseba   Google Ireland Ltd.        V uporabi
```
Tvrdnja „en sam piškotek" više ne postoji ni u jednom prevodu.

### Sitnice — sve zatvorene
```
og:locale        sl_SI · en_GB · de_DE · it_IT · bs_BA · tr_TR
lastmod          uklonjen        changefreq  uklonjen
/sl/meni         308 (ne 307), kolačić jezika preživi preusmjerenje
zaglavlja        X-Content-Type-Options · Referrer-Policy ·
                 X-Frame-Options · Permissions-Policy
share slika      375 KB → 153 KB
unsplash         izbačen iz remotePatterns
404              /asdf i /tr/asdf oba vraćaju 404
```

### Vanjski linkovi — provjerio sam da svaki postoji
```
11 različitih vanjskih adresa, 0 mrtvih
studentska-prehrana.si 200 · halal-slovenia.si 200 · ip-rs.si 200
Google Play 200 · App Store 200 · oba Google profila 302 na pravo mjesto
```

---

# 2. Nove stvari koje sam našao

---

## 🔴 A · Ugrađena mapa za Slovensku 55 pokazuje mjesto 253 metra dalje

**Gdje:** `src/data/locations.ts:165`, polje `mapEmbed`. Prikazuje se na
`/lokacije/slovenska-55` i na `/kontakt`, u svih šest jezika.

**Šta stoji u kodu:**
```
!1d2769.0 !2d14.504 !3d46.054 … !1s0x4765329ebc0e9eb7%3A0x1
```

**Šta je stvarno** — razriješio sam vaš vlastiti `googleProfileUrl` za taj lokal:
```
pravo mjesto:   46.0561569, 14.5050245
                place id 0x476533a0f6f41f97:0x3d162be1cf8520a
mapa pokazuje:  46.054,     14.504
                place id 0x4765329ebc0e9eb7:0x1
```

**Izmjereni razmak: 253 metra.**

Dvije stvari ovdje ne valjaju:

1. **Koordinate su pogrešne.** 46.054 je oko 250 m južno od Bavarskog dvora, niz
   Slovensku. Gost koji gleda mapu na vašoj stranici traži lokal na pogrešnom
   bloku.

2. **Identifikator mjesta je izmišljen.** `0x4765329ebc0e9eb7:0x1` — dio iza
   dvotačke je `0x1`. To nije stvarno mjesto na Google Mapsu; to je popunjena
   praznina. Za poređenje, pravi identifikator tog lokala završava sa
   `0x3d162be1cf8520a`.

**Sama stranica sebi protivrječi.** Na `/lokacije/slovenska-55` istovremeno stoje:
```
ugrađena mapa           centrirana na 46.054, 14.504
dugme „Navodila za pot" vodi na 46.05616240965046, 14.505044866008422
strukturirani podaci    geo: 46.05616240965046, 14.505044866008422
```
Dakle mapa pokazuje jedno mjesto, a dugme ispod nje šalje gosta na drugo,
253 m dalje.

**Za Trubarjevu** je isti podatak **32 m** od pravog — to je unutar granice
tolerancije za geokodiranu adresu i pogađa pravu zgradu. Ali i tu se
identifikator mjesta (`0x47653282245b0a7d:0x6fb26227b2a6f23`) ne poklapa sa
pravim (`0x47652d62bb7c99f5:0xa07a0f9960d0cea8`). Oba `mapEmbed` niza su
sastavljena rukom, ne uzeta iz Googla.

**Šta biznis gubi:** gost s telefonom u ruci koji gleda mapu na vašoj stranici
stiže na pogrešno mjesto, ne nađe lokal i ode kod nekog drugog. Na Slovenskoj
cesti ima još lokala u tih 250 metara. A za sajt koji je cijeli sagrađen na
pravilu „ništa se ne izmišlja", ovo je isti tip greške kao izmišljeni Facebook —
samo skriven u nizu znakova koji niko ne čita.

**Šta uraditi:** ne sastavljati taj niz rukom. Na Google Mapsu otvoriti lokal →
**Deli → Vdelaj zemljevid** → iskopirati `src` iz ponuđenog `<iframe>`. To je
minut po lokalu i Google sam upiše i koordinate i identifikator. Uraditi za oba,
ne samo za Slovensku.

---

## 🟠 B · Apple Maps je ostao na pretrazi, iako je Google popravljen

**Gdje:** `src/data/locations.ts`, polje `appleMapsUrl`. Na 18 odnosno 12 stranica.

```
https://maps.apple.com/?q=Šeherezada+Trubarjeva+cesta+31+Ljubljana
   → 301 → /search?query=Šeherezada%20Trubarjeva%20cesta%2031%20Ljubljana
```

**U čemu je stvar:** popravili ste Google — dugmad više ne vode na pretragu nego
na profil. Isti popravak nije primijenjen na Apple. Ovo je i dalje tekstualna
pretraga: Apple Maps traži niz znakova i vraća **spisak rezultata**, ne vaš
lokal. Na iPhoneu se otvara aplikacija Karte sa spiskom pogodaka, među kojima
gost mora sam pogađati.

**Šta biznis gubi:** među turistima u centru Ljubljane iPhone nije mala manjina.
Za njih je „Navodila za pot" i dalje pogađanje, dok je za korisnike Androida
riješeno.

**Šta uraditi:** sada imate tačne koordinate, pa Apple ne mora ništa tražiti:
```
https://maps.apple.com/?ll=46.052483990380814,14.50992102057708&q=Šeherezada
https://maps.apple.com/?ll=46.05616240965046,14.505044866008422&q=Šeherezada%202
```
`ll` je tačka na koju se centrira, `q` je natpis uz pribadaču.

---

## 🟠 C · Popravak D je premjestio problem: prazna stranica je ostala u meniju, a puna je ispala

Ovo je odgovor na vaše pitanje **„je li ijedan popravak samo premjestio problem"**.

**Glavni meni sada:**
```
Domov · Meni · Galerija · O nas · Študentski boni · Halal · Zaposlitev · Kontakt
```
**Podnožje:**
```
Obe poslovalnici · Pogosta vprašanja · Blog · Piškotki · Politika zasebnosti
```

`/halal` i `/studentski-boni` su ušli — to je bilo tačno. Ali:

- **`/zaposlitev` je ostao u glavnom meniju**, a to je stranica koja kaže
  „Trenutno nimamo odprtih delovnih mest". Mjereno: 223 riječi, među tri
  najtanje stranice na sajtu.
- **`/pogosta-vprasanja` je izbačen u podnožje**, a to je stranica sa deset
  pravih pitanja, `FAQPage` oznakom i 500+ riječi — i jedina je (uz naslovnicu)
  koja je do sada linkovala na `/halal` i `/studentski-boni`.

**U čemu je stvar:** zamijenili ste mjesta pogrešnom paru. Gost koji dođe sa
pretrage „je li kod vas halal" ili „do kad važi bon" traži odgovore, ne oglase
za posao. A Google glavni meni čita kao vaš spisak prioriteta.

**Šta uraditi:** zamijeniti `Zaposlitev` i `Pogosta vprašanja`. Posao ide u
podnožje — tamo ga traži onaj ko ga traži.

---

## 🟠 D · `/lokacije` je dobra stranica, ali neće uzeti „kje jesti v Ljubljani"

Neću vam reći da je nešto pokvareno, jer nije. Reći ću vam da očekivanje nije
realno.

**Izmjereno:**
```
naslov      Kje jesti v Ljubljani — dve lokaciji | Šeherezada     ✔
H1          Kje jesti v Ljubljani — dve lokaciji Šeherezade       ✔
riječi      370
pojava fraze „kje jesti"  2   (naslov + H1, ništa u tekstu)
```
Isto u svih šest jezika — po dva pojavljivanja.

**U čemu je stvar:** stranica je odlična kao raskrsnica — riješila je 404,
popravila mrvice na treći član, i dala objema poslovnicama zajedničko mjesto.
To je vrijedno i ostaje.

Ali „kje jesti v Ljubljani" je **informativna** pretraga. Ono što na njoj danas
stoji u vrhu su spiskovi sa dvadeset restorana i 1.500+ riječi. Stranica sa 370
riječi, od kojih su većina adrese i satnica, tu se ne takmiči. Fraza u naslovu
nije pokrivanje namjere — ona je samo najava.

**Šta uraditi:** ne dirati stranicu, nego joj dodati sadržaj koji ta pretraga
traži — nekoliko pasusa o tome **šta je oko svake poslovnice**: dokle se stigne
pješke, šta je otvoreno kad ostalo nije, gdje sjesti, gdje je najbliža stanica.
To je tekst koji samo vi možete napisati i koji tu pretragu stvarno pokriva.
Cilj: 700–900 riječi.

---

## 🟡 E · Oznaka firme na svih 90 stranica nosi satnicu samo jednog lokala

**Šta stoji u bloku `#organization`** — a taj blok je na svakoj stranici sajta:
```
address   Trubarjeva cesta 31
geo       46.0524…, 14.5099…                    ← Trubarjeva
openingHoursSpecification
          pon–čet, ned 09:00–02:00
          pet, sob     09:00–03:00              ← satnica Trubarjeve
```
Slovenska 55 radi **08:00–01:00, svaki dan**.

**U čemu je stvar:** dodavanje `openingHoursSpecification` na firmu je bilo
dobro mišljeno, ali sada oznaka „Šeherezada kao firma" tvrdi satnicu koja važi
za jedan od dva lokala. Oba `department`-a imaju svoj `@id` pa ih Google
razlikuje — zato ovo nije greška koja će nešto srušiti. Ali je tvrdnja koja za
pola posla nije tačna, na svih 90 stranica.

**Šta uraditi:** ili ukloniti satnicu i koordinate sa oznake firme i ostaviti ih
tamo gdje pripadaju — na lokalima — ili ih zadržati uz jasnu odluku da je
Trubarjeva „matična". Prva opcija je čistija.

---

## 🟡 F · Ime na Google profilu i ime na sajtu se razilaze

Kad sam razriješio vaš link profila, Google je vratio:
```
Šeherezada 2 pizza&falafel        ← ime na Google profilu
```
Sajt i strukturirani podaci kažu:
```
Šeherezada 2                      ← ime na sajtu
```

**U čemu je stvar:** Google upoređuje ime, adresu i telefon sa sajta sa onima na
profilu da bi potvrdio da su isti posao. Kad se ime razilazi, veza je slabija.
Nije pogrešno — samo nije isto.

**Šta uraditi:** odlučiti koje je pravo ime lokala i uskladiti obje strane.
Ako je „Šeherezada 2 pizza&falafel" ono što piše na izlogu, neka tako bude i na
sajtu; ako nije, popraviti profil na Googlu. Bitno je da bude isto.

---

## 🟢 G · `llms.txt` ne zna za `/lokacije`

Nova stranica je u sitemapu, u navigaciji i u podnožju — ali spisak stranica u
`llms.txt` je nije dobio. Sitnica, ali `llms.txt` se generiše iz podataka baš da
se ovo ne bi dešavalo.

---

# 3. Treća rupa u vašim skriptama

Tražili ste je. Evo je, i baš ona je propustila nalaz A.

**Nijedna od šest skripti ne poredi dva podatka koja opisuju istu činjenicu iz
stvarnog svijeta.**

Vaše skripte provjeravaju **oblik**: je li status 200, je li JSON validan, je li
naslov predug, je li ostao slovenizam, vodi li link van jezika. Sve to je tačno
i sve to prolazi.

Ali nijedna ne pita: **da li ova dva broja govore istu stvar?**

```
locations.ts  geo.lat = 46.05616…    ← ovo je tačno
locations.ts  mapEmbed !3d46.054     ← ovo je 253 m dalje
```

Oba su validni podaci. Oba prolaze svaku provjeru oblika. Razlikuju se samo u
činjenici koju tvrde — a to niko ne gleda.

**Provjera koja bi je uhvatila, u desetak redova:**

```js
// za svaku poslovalnicu: izvuci !2d<lng>!3d<lat> iz mapEmbed
// i uporedi sa geo. Preko 50 m = nalaz.
const m = loc.mapEmbed.match(/!2d([\d.]+)!3d([\d.]+)/);
const [lng, lat] = [parseFloat(m[1]), parseFloat(m[2])];
const razmak = haversine(lat, lng, loc.geo.lat, loc.geo.lng);
if (razmak > 50) nalaz(`${loc.name}: mapa je ${razmak.toFixed(0)} m od geo`);
```

**Ista rupa, drugi oblik:** nijedna skripta ne provjerava da vanjski link
stvarno negdje vodi. To je ono što je u prvoj rundi propustilo
`https://facebook.com` — adresa je bila savršeno ispravna, samo nije bila vaša.
Ja sam tu provjeru danas pustio ručno (11 adresa, sve žive). Vrijedi je dopisati:
`fetch` sa `redirect: "manual"`, i nalaz na sve što nije 2xx/3xx ili što vodi na
korijen tuđe domene.

**Pravilo koje iz ovoga slijedi:** kad isti podatak postoji na dva mjesta,
skripta mora porediti ta dva mjesta — ne provjeravati svako posebno. Vi ste to
pravilo već primijenili na tekst (slovenizmi porede jezike međusobno). Sada ga
treba primijeniti i na brojeve.

---

# 4. Šta je sada sljedeće po važnosti

Sad kad je sve iz prve runde zatvoreno, redoslijed se promijenio.

| | Šta | Zašto sada |
|---|---|---|
| 1 | **Mapa za Slovensku** (nalaz A) | jedini nalaz koji fizički odvodi gosta na pogrešno mjesto. 5 minuta |
| 2 | **Kontakt forma** | jedina stvar na sajtu koja i dalje aktivno laže gostu |
| 3 | **Fotografije lokala** | lokacijske stranice su odredište oba Google profila, a nemaju nijednu sliku |
| 4 | **Zamijeniti Zaposlitev i Pogosta vprašanja u meniju** (nalaz C) | 15 minuta |
| 5 | **Apple Maps linkovi** (nalaz B) | 10 minuta |
| 6 | **Sadržaj na `/lokacije`** (nalaz D) | jedina prava šansa za „kje jesti v Ljubljani" bez bloga |
| 7 | **Blog** | i dalje najveći neiskorišćeni kanal |

Tačku 1 bih uradio prije objave. Tačka 2 je i dalje jedini razlog zbog kojeg bi
neko mogao reći da sajt nije spreman — ali to je odluka koju si već donio
svjesno, i ne mijenja se time što je ja ponavljam.

---

# 5. Odgovori na vaša tri pitanja

**1. Jeste li nešto pokvarili dok ste popravljali?**

Ne. Devet commita je diralo navigaciju, strukturirane podatke, sitemap,
konfiguraciju i tekstove u šest jezika — i nakon svega:
```
90/90 adresa 200 · 138/138 JSON-LD validan · 0 duplikata naslova i opisa
canonical i hreflang tačni na svih 90 · 0 slika bez alt · 1 H1 po stranici
0 mrtvih vanjskih linkova · cijene i brojevi jela se slažu sa izvorom
```
Ovo je čist rezultat. Nijedna regresija.

**2. Je li ijedan popravak samo premjestio problem?**

Jedan — nalaz C. Prazna stranica za posao je ostala u glavnom meniju, a puna
stranica sa pitanjima je izbačena u podnožje. Zamijenili ste pogrešan par.

Uz to jedno zapažanje, ne i nalaz: sada **sve** stranice dobijaju linkove sa
svih ostalih (15 od 15). Kad svako linkuje na svakoga, interno povezivanje
prestaje biti signal — politika kolačića i `/halal` stoje jednako. Na sajtu od
petnaest stranica to ništa ne košta i ne bih to dirao. Ono što stvarno
razlikuje stranice su linkovi **iz teksta**, ne iz menija — a njih dodaje tek
blog.

Skraćeni opisi nisu postali generični: nijedan se ne ponavlja, svih 90 je
različito, i ključne riječi po jeziku („günstig essen", „ucuz yemek", „jeftino
jesti") su ostale u njima.

**3. Šta postaje sljedeće po važnosti?**

Tabela u tački 4. Ukratko: jedna pogrešna koordinata, pa forma, pa fotografije.
Sve ostalo je sadržaj — a sadržaj je od sada jedino što vas dijeli od prve
stranice.

---

## Jedna rečenica na kraju

Prva revizija je našla stvari koje su bile **pogrešno napravljene**. Ova je
našla samo jednu stvar koja je **pogrešno prepisana** — i to onu koju nijedna
provjera oblika ne može uhvatiti, jer je i pogrešan podatak savršeno ispravnog
oblika. To je sada nivo na kojem se ovaj sajt griješi, i to je dobra vijest.
