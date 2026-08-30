// FAZA 5E, drugi dio — ono sto prva skripta ne pokriva:
//   404 po jeziku, robots/sitemap/llms, tipovi strukturiranih podataka,
//   i da strukturirani podaci NISU ostali slovenacki na stranoj stranici.
const BASE = process.argv[2];
const JEZICI = [
  { k: "sl", pre: "", faq: "/pogosta-vprasanja", meni: "/meni", lok: "/lokacije/trubarjeva-31", posao: "/zaposlitev" },
  { k: "en", pre: "/en", faq: "/en/faq", meni: "/en/menu", lok: "/en/locations/trubarjeva-31", posao: "/en/careers" },
  { k: "de", pre: "/de", faq: "/de/haeufige-fragen", meni: "/de/speisekarte", lok: "/de/standorte/trubarjeva-31", posao: "/de/karriere" },
  { k: "it", pre: "/it", faq: "/it/domande-frequenti", meni: "/it/menu", lok: "/it/sedi/trubarjeva-31", posao: "/it/lavora-con-noi" },
  { k: "bs", pre: "/bs", faq: "/bs/cesta-pitanja", meni: "/bs/meni", lok: "/bs/lokacije/trubarjeva-31", posao: "/bs/posao" },
  { k: "tr", pre: "/tr", faq: "/tr/sss", meni: "/tr/menu", lok: "/tr/subeler/trubarjeva-31", posao: "/tr/kariyer" },
];

const nalazi = [];
const javi = (s) => { nalazi.push(s); console.log("  ✗ " + s); };

async function ld(put) {
  const h = await (await fetch(BASE + put)).text();
  return [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1].replace(/&quot;/g, String.fromCharCode(34))));
}

(async () => {
  console.log("1) 404 po jeziku");
  for (const j of JEZICI) {
    const put = j.pre + "/ove-stranice-nema";
    const r = await fetch(BASE + put);
    const h = await r.text();
    const lang = (h.match(/<html lang="([^"]+)"/) || [])[1];
    const nasa = /404/.test(h) && /Šeherezada/.test(h);
    if (r.status !== 404) javi(put + " vraca " + r.status + ", ocekujem 404");
    if (!nasa) javi(put + " nije NASA 404 stranica");
    if (lang !== j.k) javi(put + " ima lang=" + lang + ", ocekujem " + j.k);
  }

  console.log("\n2) robots / sitemap / llms");
  for (const [put, mora] of [["/robots.txt", "Sitemap:"], ["/sitemap.xml", "<urlset"], ["/llms.txt", "Šeherezada"]]) {
    const r = await fetch(BASE + put);
    const t = await r.text();
    if (r.status !== 200) javi(put + " vraca " + r.status);
    else if (!t.includes(mora)) javi(put + " ne sadrzi \"" + mora + "\"");
  }

  console.log("\n3) tipovi strukturiranih podataka");
  for (const j of JEZICI) {
    const tipovi = async (p) => (await ld(p)).map((x) => x["@type"]);
    const provjeri = async (p, ocekivani) => {
      const t = await tipovi(p);
      for (const o of ocekivani) if (!t.includes(o)) javi(p + " nema " + o + " (ima: " + t.join(",") + ")");
    };
    await provjeri(j.pre || "/", ["Restaurant"]);
    await provjeri(j.faq, ["FAQPage", "Restaurant"]);
    await provjeri(j.meni, ["Menu", "Restaurant"]);
    await provjeri(j.lok, ["BreadcrumbList", "Restaurant"]);
  }

  console.log("\n4) strukturirani podaci nisu ostali slovenacki");
  const sl = {
    faq: (await ld(JEZICI[0].faq)).find((x) => x["@type"] === "FAQPage").mainEntity[0].name,
    meni: (await ld(JEZICI[0].meni)).find((x) => x["@type"] === "Menu").hasMenuSection[0].name,
    mrvica: (await ld(JEZICI[0].lok)).find((x) => x["@type"] === "BreadcrumbList").itemListElement[0].name,
  };
  for (const j of JEZICI.slice(1)) {
    const f = (await ld(j.faq)).find((x) => x["@type"] === "FAQPage").mainEntity[0].name;
    const m = (await ld(j.meni)).find((x) => x["@type"] === "Menu").hasMenuSection[0].name;
    const b = (await ld(j.lok)).find((x) => x["@type"] === "BreadcrumbList").itemListElement[0].name;
    if (f === sl.faq) javi(j.faq + " FAQ pitanje je i dalje slovenacko");
    if (m === sl.meni) javi(j.meni + " kategorija menija je i dalje slovenacka");
    if (b === sl.mrvica) javi(j.lok + " mrvica je i dalje slovenacka");
  }

  console.log("\n5) radno vrijeme u Restaurant oznaci lokala");
  for (const j of JEZICI) {
    const r = (await ld(j.lok)).find((x) => x["@type"] === "Restaurant" && x.openingHoursSpecification);
    if (!r) { javi(j.lok + " nema openingHoursSpecification"); continue; }
    const dani = r.openingHoursSpecification.flatMap((o) => o.dayOfWeek);
    const EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (dani.length !== 7) javi(j.lok + " ima " + dani.length + " dana umjesto 7");
    for (const d of dani) if (!EN.includes(d)) javi(j.lok + " ima neengleski dan: " + d);
  }

  console.log("\n6) isti podatak na dva mjesta mora govoriti isto");
  // ------------------------------------------------------------------
  // TRECA VRSTA PROVJERE
  //
  // Prve dvije gledaju OBLIK: status, ispravnost JSON-a, duzinu naslova,
  // slovenizme. Ugradjena karta je prosla obje: njen naslov je bio savrseno
  // ispravnog oblika — samo je pokazivao 254 m od lokala, a identifikator
  // mjesta mu je zavrsavao s ":0x1", dakle popunjenom prazninom.
  //
  // Isti oblik rupe je u prvoj reviziji propustio "facebook.com": adresa je
  // bila ispravna, samo nije bila nasa.
  //
  // Pravilo: kad isti podatak postoji na dva mjesta, provjeri da se ta dva
  // mjesta slazu — nemoj svako gledati posebno.
  // ------------------------------------------------------------------
  const koordinateIzNaslova = (u) => {
    const q = u.match(/[?&]q=(-?[\d.]+),(-?[\d.]+)/);
    if (q) return { lat: +q[1], lng: +q[2] };
    const pb = u.match(/!2d(-?[\d.]+)!3d(-?[\d.]+)/);   // stari oblik
    if (pb) return { lat: +pb[2], lng: +pb[1] };
    return null;
  };

  const razdalja = (a, b) => {
    const R = 6371000, rad = (x) => (x * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  // Tabela JEZICI ima samo Trubarjevu; drugi lokal izvedemo iz iste putanje.
  // Prva verzija ove provjere gledala je samo prvi lokal — a pogresna karta
  // je bila bas na drugom. Provjera koja gleda pola podataka nije provjera.
  const straniceLokala = JEZICI.flatMap((j) => [
    j.lok,
    j.lok.replace("trubarjeva-31", "slovenska-55"),
  ]);

  for (const put of straniceLokala) {
    const h = await (await fetch(BASE + put)).text();

    const geo = (await ld(put)).find((x) => x["@type"] === "Restaurant" && x.geo)?.geo;
    if (!geo) { javi(put + " nema geo u strukturiranim podacima"); continue; }

    const naslovi = [...h.matchAll(/https:\/\/(?:www\.)?maps\.google\.com\/maps\?[^"\ ]+/g)]
      .map((m) => m[0].replace(/\u0026/g, "&"));
    if (!naslovi.length) { javi(put + " nema naslova ugradjene karte"); continue; }

    for (const u of naslovi) {
      const k = koordinateIzNaslova(u);
      if (!k) { javi(put + " ne umijem procitati koordinate iz " + u.slice(0, 70)); continue; }
      const m = razdalja(k, { lat: geo.latitude, lng: geo.longitude });
      if (m > 50)
        javi(put + ": karta pokazuje " + Math.round(m) + " m od koordinata u strukturiranim podacima");
    }
  }

  console.log("\n" + (nalazi.length ? "NALAZA: " + nalazi.length : "NEMA NALAZA"));
})();
