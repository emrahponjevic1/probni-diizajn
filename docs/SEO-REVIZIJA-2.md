# Druga runda — šta se promijenilo od tvoje prve revizije

Ovo je dopuna, ne zamjena. **Prvo pročitaj `docs/SEO-REVIZIJA.md`** — tamo je kontekst o
sajtu, cilj i odluke koje smo donijeli svjesno. Sve to i dalje vrijedi.

Tvoju prvu reviziju smo pročitali cijelu i po njoj radili. Ovaj dokument ti kaže
**šta je zatvoreno i šta je ostalo**, da ne trošiš vrijeme na ono što već znamo.

**Traži se isto što i prvi put:** pređi kroz sajt sam, kako ti smatraš da treba, i
reci nam šta misliš. Ne tražimo potvrdu — tražimo ono što smo previdjeli.

---

## Prvo: hvala, sve je stajalo

Provjerili smo **svaki tvoj nalaz** na produkcijskom serveru prije nego što smo
išta dirali. **Nijedan nije bio pogrešan.** Nekoliko ih je bilo gore nego što je
izgledalo, jer se ista greška ponavljala na više mjesta nego što si vidio.

---

## Šta je zatvoreno

### 🔴 A · Izmišljene društvene mreže
Sve tri povezave su vodile na korijen Facebooka, TikToka i Instagrama, a pored njih
je stajalo ime profila. Sad postoji `src/data/social.ts` kao jedini izvor: **prazan
naslov znači da se ikona uopšte ne iscrtava** — isto pravilo kao Wolt dugme.
Vlasnik nije potvrdio nijedan nalog, pa su **sva tri prazna**. Korisničko ime je
izašlo iz koda i iz prevoda u podatke.

### 🔴 B · Meta oznake lokala su bile slovenačke na pet jezika
Uzrok je bio što je `generateMetadata` čitao pravo iz `locations.ts` i zaobilazio
prevodilački sloj. Preslikavanje ključeva je sada **jedna čista funkcija**
(`prevediZ`), nad njom dvije kvake: `useLocationText()` za komponente i novi
`locationText.server.ts` za metapodatke. Razići se ne mogu.

Popravljeno i ono što si nazvao sitnicom: italijanski `og:title` sad piše **Lubiana**.
Namjerno **ne** mijenja `addressLocality` u strukturiranim podacima — tamo mora
ostati „Ljubljana", jer je to poštanska činjenica po kojoj Google spaja sajt s
Google profilom.

### 🔴 C · Forma je nudila rezervaciju
Vlasnik je rekao da lokal **rezervacije uopšte ne prima**, a ni catering ne radi.
Time forma nije bila jedino mjesto koje je obećavalo nešto čega nema — riječ je
stajala na **devet mjesta**, uključujući meta opis za Google, dugme na `/halal` i
politiku privatnosti. Sve uklonjeno u šest jezika.

**Forma i dalje ništa ne šalje** — vidi „Šta je ostalo".

### 🟠 D · Interno povezivanje
`/halal` i `/studentski-boni` su ušli u glavni meni, `/pogosta-vprasanja` i `/blog`
u podnožje, gdje ne gube povezave (podnožje je na svakoj stranici).

```
/halal             2 → 32
/studentski-boni   2 → 34
```

### 🟠 E · Veza ka Google profilima
Vlasnik je poslao prave adrese profila (`maps.app.goo.gl/…`, iz dugmeta „Deli").
Sada su u `sameAs` na tri mjesta — firma, svaki `department`, i svaki lokal
pojedinačno. Dodano je i vidljivo dugme „Google profil" ispod karte.

Dugmad koja su vodila na **pretragu** sada vode gdje treba: „Navodila za pot" na
navigaciju s koordinatama, „Google Maps" na profil. Na svih 90 adresa: **0 linkova
pretrage, 762 na profil**.

### 🟠 F · Strukturirani podaci
- `priceRange` je bio `€€` u jednom bloku i `€` u drugom na istoj stranici → sada `€`
- `geo` — vlasnik je poslao koordinate oba ulaza, odčitane na Google Mapsu
- `hasMenu` na firmi, i to na **meni tog jezika** (prva verzija je i na njemačkoj
  stranici pokazivala na slovenački meni, dakle na čvor koji tamo ne postoji)
- `openingHoursSpecification` i `image` na oznaci firme
- `sameAs` — vidi E

### 🟠 H → **odbačeno odlukom vlasnika**
Nisi bio u krivu, ali vlasnik piše objave, pa `/blog` i `/zaposlitev` ostaju u
sitemapu i indeksu.

### 🟠 I · Naslovi na `/meni`
Jela su sada **grupisana po kategorijama**, iznad svake grupe stoji pravi `<h2>`.
Filter krugovi rade isto. Brojač („Prikazanih 29 jedi") je bio `<h2>` samo zato što
stranica nije imala nijedan drugi naslov — sada je običan tekst.

```
H1  Meni in cene — kebab, falafel in pizza v Ljubljani
H2  Kebab & jufke · Falafel & priloge · Krožniki & piščanec · Burgerji · Pizze
H3  29 jela
```

### 🟠 G + L · Nova stranica `/lokacije`
`/lokacije` je vraćao 404. Sada postoji u šest jezika i pokriva namjeru **„gdje
jesti u Ljubljani"**, koja je imala nula pojavljivanja. Mrvice na stranicama lokala
su dobile treći član.

**Sitemap: 84 → 90 adresa.**

### 🟡 K · Politika kolačića
Sva četiri neslaganja popravljena: `NEXT_LOCALE` i Google mapa su u tabeli,
tekst o analitici više ne protivrječi tabeli, izmišljeni funkcionalni kolačić je
obrisan. **Peto smo našli sami:** uvod i traka su tvrdili „uporabljamo **en sam**
piškotek", a troje ih je aktivno.

Google mapa **i dalje se učitava bez pristanka** — odluka vlasnika; sada je bar
prijavljena i u politici kolačića i u politici privatnosti.

### 🟢 L · Sitnice
- `og:locale` → `sl_SI`, `en_GB`, `de_DE`, `it_IT`, `bs_BA`, `tr_TR`
- `keywords` obrisan sa sve tri stranice (18 adresa)
- **13 opisa** preko 155 i **5 naslova** preko 60 skraćeno; prag u našem alatu spušten
- `lastmod` uklonjen iz sitemapa (bio je vrijeme gradnje, isti na svim adresama)
- `changefreq` uklonjen
- `images.unsplash.com` izbačen iz `remotePatterns`
- sigurnosna zaglavlja dodana: `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`
- `/sl/…` sada vraća **308**, ne 307
- slika za dijeljenje: vlasnik smanjio na **153 KB**

`FAQPage` ostaje — kako si i rekao, nije štetan.

---

## Šta je ostalo otvoreno

Ovo znamo. Ne treba nam ponovo prijavljeno — ako imaš bolje rješenje, to je drugo.

| | Šta | Zašto stoji |
|---|---|---|
| 🔴 | **Kontakt forma ništa ne šalje** | čeka poslovni mail i SMTP podatke. Opcija rezervacije je uklonjena, ali forma i dalje kaže „poslano" |
| 🟠 | **Lokacijske stranice nemaju fotografije** | vlasnik ih slika |
| 🟠 | **Blog je prazan** | vlasnik piše objave; tehnički dio za višejezične objave nije rađen |
| 🟠 | **Društvene mreže prazne** | vlasnik nema profile ili ih nije potvrdio |
| 🟡 | **Jedan telefon za oba lokala** | tako jest, drugi lokal nema svoju liniju |
| 🟡 | **404 u sirovom HTML-u ima prazno tijelo** | ograničenje Nexta; status je 404, gost s JS-om vidi cijelu prevedenu stranicu. Isprobana tri rješenja. **Ako znaš četvrto koje čuva status 404, to je vrijedan nalaz** |
| 🟡 | **Nema `Content-Security-Policy`** | ugrađena Google mapa i `next/font` traže pravilo koje se mora testirati na živoj domeni |
| 🟡 | **Brzina** | i dalje nemjerena; sajt nije objavljen |
| ⬜ | **Sajt nije objavljen** | sve što traži živu domenu — Search Console, terenski podaci o brzini, provjera dijeljenja — čeka |

---

## Šta bi nam najviše značilo u ovoj rundi

Prvi put si našao stvari koje smo previdjeli. Sad kad je to zatvoreno, zanima nas:

1. **Jesmo li nešto pokvarili dok smo popravljali?** Devet commita je diralo
   navigaciju, strukturirane podatke, sitemap, konfiguraciju i tekstove u šest
   jezika. Traži regresiju.
2. **Je li ijedan popravak samo premjestio problem?** Npr. skraćeni opisi — jesu li
   i dalje smisleni i drugačiji jedan od drugog, ili su postali generični.
3. **Šta sada, kad su ove stvari sređene, postaje sljedeće po važnosti?**

Naši alati su u `scripts/` — `revizija.js` (90 adresa), `revizija2.js`,
`hreflang.js`, `provjeri-prevod.js`, `curenje2.js`, `slovenizmi.js`. Svi trenutno
prolaze bez nalaza, što znači samo da **ne provjeravaju ono što bi trebalo**.
Prvi put si našao dvije takve rupe — meta oznake nisu bile provjeravane na
slovenizme, a vidljivi ključ prevoda niko nije tražio. Obje smo zakrpali. **Traži
treću.**

Format izvještaja isti kao prvi put: gdje, u čemu je stvar, šta biznis gubi, šta
uraditi — i dokaz uz svaku tvrdnju.
