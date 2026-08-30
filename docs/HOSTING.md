# Objava sajta — sve što idući agent treba da zna

Ovaj fajl je namijenjen AI agentu koji će voditi objavu sajta na živu domenu.
Napisan je tako da razumije **kako sajt radi** i **šta je zatečeno stanje**, bez
pristupa ostatku razgovora u kojem je sajt napravljen.

Vlasnik **nije programer**. Piši mu tako da razumije šta radi i zašto, i traži
potvrdu prije svakog koraka koji mijenja živu domenu ili DNS.

> **Tajne ne idu u ovaj fajl.** Ovo je u javnom GitHub repozitoriju. Cloudflare
> Zone ID, Account ID i bilo koji API token vlasnik ti daje **direktno u chatu**,
> ne ovdje. Za ručno postavljanje DNS-a ti ti identifikatori ionako ne trebaju.

---

## 1. Šta je sajt

Restoran **Šeherezada** — halal kebab, falafel i pizza u Ljubljani, dvije
poslovnice. Sajt je glavni kanal za nove goste; vlasnik nema budžet za oglase.

| | |
|---|---|
| Repozitorij | `github.com/emrahponjevic1/seherezada-web`, grana `main` (javni) |
| Tehnologija | **Next.js 16.3.1**, App Router, React 19, TypeScript, CSS Modules |
| Prevodi | `next-intl` 4.14.1 — 6 jezika |
| Domena | `seherezada.net` (registrar i DNS: **Cloudflare**, Free plan) |
| Hosting | **Vercel** (nalog postoji, projekat NIJE spojen) |
| Adresa ukupno | **90** (15 stranica × 6 jezika) |
| Kanonski URL | **`https://seherezada.net`** — bez `www`. Ovo je ključno za DNS. |

### Zašto baš Vercel, a ne bilo koji statični hosting

Sajt **nije čisti statični izvoz.** Traži Node runtime za tri stvari:

1. **`src/proxy.ts`** — middleware (u Next 16 se zove `proxy.ts`, ne
   `middleware.ts`). Preusmjerava po jeziku i pretvara `/sl/...` u 308. Statični
   hosting ovo ne izvršava.
2. **Optimizacija slika** — `next/image` pretvara u AVIF/WebP na zahtjev.
3. **`generateMetadata`** i i18n usmjeravanje.

`output: "export"` je namjerno uklonjen (piše u `next.config.ts`). GitHub Pages
i slični statični hostovi **ne rade** za ovaj sajt. Vercel je ispravan izbor.

### Kako se gradi

| | |
|---|---|
| Build komanda | `next build` (Vercel auto-detektuje Next.js — ne diraj) |
| Output | Vercel prepoznaje sam |
| Runtime | Node (zbog middleware-a i slika) |
| **Env varijable** | **trenutno NIJEDNA.** `SITE_URL` je zakucan u `src/data/site.ts`. Provjereno: `grep process.env src/` ne vraća ništa. |
| Sigurnosna zaglavlja | u `next.config.ts`, funkcija `headers()` — rade na Vercelu |
| Sitemap / robots | generisani: `/sitemap.xml`, `/robots.txt`, `/llms.txt` |

**Ne treba postaviti nijednu env varijablu za objavu.** (SMTP za kontakt formu
doći će kasnije — vidi poglavlje 7.)

---

## 2. Zatečeno stanje infrastrukture

Ovo je vlasnik pročitao s Cloudflare dashboarda 30. 8. 2026:

```
Domena           seherezada.net
Registrar        Cloudflare (istječe 25. 7. 2027)
Plan             Free
DNS Setup        Full
DNS zapisi       NIJEDAN — ni A, ni CNAME za www, ni MX
Proxy            (nema zapisa, pa ni proxy statusa)
```

Cloudflare sam upozorava:
- „Visitors cannot reach seherezada.net" — nema A/CNAME zapisa
- „Visitors cannot reach www.seherezada.net" — nema www zapisa
- „Email cannot reach @seherezada.net" — **nema MX zapisa**

**Znači: čist teren.** Domena je na Cloudflareu, ali ništa ne pokazuje nigdje.
Ne postoji stari sajt koji bi se srušio kad prebacimo — jedina posljedica je da
oживи ono čega sada nema.

Zone ID i Account ID postoje (vlasnik ih ima na dashboardu) — **traži ih u chatu
ako ti zatrebaju**, nisu u ovom fajlu.

---

## 3. Cilj

`https://seherezada.net` prikazuje sajt, s ispravnim HTTPS-om, a
`www.seherezada.net` se 301-preusmjerava na verziju bez `www` (jer su svi
canonical i sitemap adrese bez `www`).

---

## 4. Redoslijed koraka

Radi ovim redom. **Poslije svakog koraka provjeri prije nego kreneš dalje.**

### Korak 1 — Spoji repozitorij na Vercel
1. Vercel → **Add New Project** → import `emrahponjevic1/seherezada-web`
2. Framework: Vercel prepoznaje **Next.js** sam. Ne mijenjaj build/output.
3. Env varijable: **nijedna** (vidi poglavlje 1).
4. **Deploy.** Prvi build ide na `*.vercel.app` privremenu adresu.

**Provjeri:** otvori `*.vercel.app` adresu. Sajt mora raditi, svih 6 jezika,
prekidač jezika, `/meni`, `/lokacije`. Ako build padne — riješi to **prije**
nego diraš domenu.

### Korak 2 — Dodaj domenu u Vercel
1. Projekat → **Settings → Domains** → dodaj `seherezada.net`
2. Dodaj i `www.seherezada.net`, i postavi da se **`www` preusmjerava na
   `seherezada.net`** (apex kao primarni). Ovo je bitno: canonical je bez `www`.
3. Vercel će prikazati **tačne DNS vrijednosti** koje treba upisati u Cloudflare.

> **Ne izmišljaj DNS vrijednosti — pročitaj ih iz Vercela.** Tipično su:
> - apex `seherezada.net`: **A** zapis → `76.76.21.21`
> - `www`: **CNAME** → `cname.vercel-dns.com`
>
> Ali vrijednost koju Vercel prikaže je istina; ako se razlikuje, uzmi njegovu.

### Korak 3 — Upiši DNS zapise u Cloudflare
Cloudflare → `seherezada.net` → **DNS → Records** → Add record, s vrijednostima
iz koraka 2.

**NAJVAŽNIJA ODLUKA — proxy status (narandžasti vs sivi oblak):**

| | |
|---|---|
| **Preporuka: sivi oblak (DNS only)** | Vercel sam radi HTTPS i globalni CDN. Najmanje kvarova. Sajt je već brz i statičan — Cloudflareov proxy ne treba. |
| Narandžasti oblak (Proxied) | Samo ako vlasnik izričito želi Cloudflare zaštitu. Tada **SSL mode mora biti Full (strict)** — vidi zamke ispod. |

Za objavu postavi **sivi oblak (DNS only)** na oba zapisa. Vercel će sam izdati
Let's Encrypt certifikat. Kad proradi, može se kasnije prebaciti na narandžasti.

**Provjeri:** u Vercelu Settings → Domains, oba domena moraju dobiti zeleni
„Valid Configuration". Certifikat se izda za par minuta.

### Korak 4 — Provjera na živoj domeni
Vidi poglavlje 6.

---

## 5. Cloudflare zamke — pročitaj prije nego pokvariš

Ovo su greške koje se **najčešće** dese kod Vercel + Cloudflare:

1. **SSL mode „Flexible" pravi beskonačnu petlju.** Vercel forsira HTTPS;
   Flexible šalje HTTP na Vercel, Vercel vraća na HTTPS, u krug. Ako je proxy
   uključen (narandžasti oblak), SSL mode **mora biti Full (strict)**, nikad
   Flexible. Sa sivim oblakom ovo nije problem jer Cloudflare ne dira SSL.

2. **Auto Minify / Rocket Loader lome Next.js.** Cloudflare može ubacivati svoj
   JS/CSS „minify" i „Rocket Loader" koji kvare React hidraciju. Ako je proxy
   uključen — **isključi Auto Minify i Rocket Loader.** Sa sivim oblakom ne
   postoje.

3. **Cloudflare „Managed robots.txt" gazi naš.** Naš `/robots.txt` je generisan
   iz koda i pokazuje na sitemap. Cloudflare nudi da sam upravlja robots.txt-om
   — **ostavi to ISKLJUČENO**, da se servira naš.

4. **„Block AI training bots"** — Cloudflare nudi da blokira AI crawlere. To je
   **vlasnikova odluka**, ne tvoja. Sajt ima `llms.txt` (uredan sažetak za
   jezičke modele), dakle namjera nije da se AI blokira. Ne uključuj bez pitanja.

5. **Ako se odlučite za narandžasti oblak**, prvo pusti sa sivim da Vercel izda
   certifikat, pa tek onda prebaci. Obrnuto zna zaglaviti izdavanje certifikata.

---

## 6. Poslije objave — provjera na živoj domeni

U repozitoriju su skripte u **`scripts/`** (README je uz njih). Iste one koje su
sve dosad prolazile na lokalnom serveru — sad ih pusti protiv **žive domene**:

```bash
node scripts/revizija.js https://seherezada.net
node scripts/revizija2.js https://seherezada.net
node scripts/hreflang.js https://seherezada.net
```

Ručno provjeri:
- `https://seherezada.net` → 200, HTTPS zelen (validan certifikat)
- `http://seherezada.net` → preusmjerava na `https://`
- `https://www.seherezada.net` → **301** na `https://seherezada.net` (bez www)
- **nema redirect petlje** (ako je ima → SSL mode je Flexible, vidi zamku 1)
- sigurnosna zaglavlja i dalje prisutna (`X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) — Cloudflare ih
  može dodati/promijeniti, provjeri
- `https://seherezada.net/sitemap.xml` → 90 adresa
- `https://seherezada.net/robots.txt` → pokazuje na sitemap (naš, ne Cloudflareov)

**Tek kad sve ovo prođe**, sajt je istinski objavljen.

### Faza 7 — poslije objave (Google)
- **Google Search Console**: potvrdi vlasništvo (DNS metoda, preko Cloudflarea),
  pošalji `sitemap.xml`
- Bing Webmaster Tools (opciono)
- **Oba Google Business Profila**: u svaki upiši adresu njegove lokacijske
  stranice (`/lokacije/trubarjeva-31`, `/lokacije/slovenska-55`), kategorije,
  radno vrijeme (mora se poklapati sa sajtom), fotografije, meni
- Prije objave zabilježi polazne brojke iz GBP-a (pozivi, rute, pregledi, broj
  recenzija) — inače za 6 mjeseci nema s čim uporediti

---

## 7. Otvoreni problemi koje objava NE rješava

Objava sajta ovo **ne popravlja** — zapisano da agent zna i ne prijavljuje kao
novo otkriće:

| | Šta | Napomena |
|---|---|---|
| 🔴 | **Kontakt forma kaže „poslano", a ništa ne šalje** | čeka poslovni mail + SMTP. SMTP podaci će ići kao env varijable u Vercel (ne u kod). Vlasnik ih daje kad zakupi mail. |
| 🔴 | **`info@seherezada.net` ne prima poštu — nema MX zapisa** | Sajt prikazuje taj mail na 8 mjesta kao `mailto:`, a Cloudflare kaže da adresa ne radi. **Cloudflare Email Routing (besplatno)** može proslijeđivati `info@` na vlasnikov lični mail — to je najlakši popravak, i rješava inbound. (Forma je zaseban, outbound problem.) |
| 🟠 | Lokacijske stranice nemaju fotografije | vlasnik slika |
| 🟠 | Blog prazan | vlasnik piše; višejezični dio bloga tehnički nije rađen |
| 🟠 | Društvene mreže prazne | `src/data/social.ts` — prazan link = ikona se ne prikazuje; vlasnik ubaci kad ima profile |
| 🟡 | Nema `Content-Security-Policy` | ugrađena Google mapa i `next/font` traže pravilo koje se mora testirati **na živoj domeni** — dobar zadatak tek poslije objave |
| 🟡 | Brzina (Core Web Vitals) nemjerena | mjeri tek na živoj domeni; PageSpeed Insights + terenski podaci |

---

## 8. Šta agent NE smije

- **Ne izmišljati DNS vrijednosti** — čitati ih iz Vercel dashboarda.
- **Ne uključivati Cloudflare SSL „Flexible"** — pravi beskonačnu petlju.
- **Ne mijenjati kod bez razloga** — `SITE_URL` je već `https://seherezada.net`,
  nema prekidača koji bi se mogao zaboraviti. Objava je posao na Vercelu i
  Cloudflareu, ne u kodu.
- **Ne postavljati env varijable** koje sajt ne traži (trenutno nijedna).
- **Ne uključivati „Block AI bots" ni „Managed robots.txt"** bez vlasnikovog da.
- **Ne dirati kontakt formu** da „radi" na brzinu — dok nema SMTP, rješava se
  tek s pravim mailom.

---

## 9. Kako je sajt dokazano ispravan (referenca)

Sve dolje je provjereno na lokalnom produkcijskom serveru (`next build &&
next start`) prije objave — da agent zna polazno stanje:

```
90 adresa                   sve 200, statične
hreflang                    uzajaman na svih 90 (7 oznaka/stranici)
canonical                   svaka pokazuje na samu sebe, bez www
prekidač jezika             radi, vodi na istu stranicu u drugom jeziku
strukturirani podaci        Restaurant + Menu + FAQ + Breadcrumb + geo + sameAs
karta                       koordinate se poklapaju sa strukturiranim podacima
sigurnosna zaglavlja        prisutna
revizija.js / hreflang.js   bez nalaza
```

Detaljna istorija projekta je u **`docs/PREDAJA.md`**; SEO revizije u
`docs/SEO-REVIZIJA.md` i `SEO-REVIZIJA-2.md`; nalazi agenta u
`docs/SEO-MISLJENJE.md` i `SEO-MISLJENJE-2.md`.
