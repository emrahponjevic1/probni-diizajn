import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPANY } from "@/data/company";
import { LOCATIONS } from "@/data/locations";
import sl from "../../../../messages/sl.json";

// ---------------------------------------------------------------------------
// STREŽNIŠKA POT ZA KONTAKTNI OBRAZEC
//
// Prej je obrazec samo počakal 0,9 sekunde in gostu sporočil "poslano".
// Nič ni bilo poslano. Gost je mislil, da smo prejeli njegovo vprašanje,
// mi pa nismo vedeli zanj. To je popravek tega.
//
// GESLO NI IN NE SME BITI V KODI. Bere se iz okolja (ZOHO_APP_PASSWORD),
// ki ga lastnik vpiše sam — lokalno v .env.local, na strežniku v Vercel.
// Datoteka .env.local je v .gitignore, zato nikoli ne pride na GitHub.
//
// POŠILJATELJ je vedno naš predal, ODGOVORI PA gredo gostu. Obratno ne gre:
// če bi kot pošiljatelja navedli gostov naslov, bi Zoho pošto zavrnil, ker
// nismo lastnik tuje domene (SPF). Zato Reply-To.
// ---------------------------------------------------------------------------

export const runtime = "nodejs";

/** Zoho, evropsko podatkovno središče — račun je odprt na zoho.eu. */
const SMTP_HOST = "smtp.zoho.eu";
const SMTP_PORT = 465;

const NAJVEC = { ime: 100, email: 200, telefon: 40, sporocilo: 4000 } as const;

/**
 * Preprosta zavora proti botom: koliko oddaj z istega naslova IP dovolimo.
 * Živi v pomnilniku posameznega strežniškega primerka — ni popolna zaščita,
 * je pa dovolj, da en bot ne zasuje predala. Prava obramba je polje vaba.
 */
const OKNO_MS = 10 * 60 * 1000;
const NAJVEC_ODDAJ = 5;
const zgodovina = new Map<string, number[]>();

function prehitro(ip: string) {
  const zdaj = Date.now();
  const prej = (zgodovina.get(ip) ?? []).filter((t) => zdaj - t < OKNO_MS);
  prej.push(zdaj);
  zgodovina.set(ip, prej);
  if (zgodovina.size > 500) zgodovina.clear(); // da pomnilnik ne raste v nedogled
  return prej.length > NAJVEC_ODDAJ;
}

const jeEposta = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Prepreči, da bi vsiljena nova vrstica dopisala svojo glavo v e-pošto. */
const brezGlave = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

const pobegni = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let telo: Record<string, unknown>;
  try {
    telo = await req.json();
  } catch {
    return NextResponse.json({ napaka: "oblika" }, { status: 400 });
  }

  const niz = (k: string) => (typeof telo[k] === "string" ? (telo[k] as string) : "");

  // Polje vaba: človek ga ne vidi in ne izpolni, bot pa skoraj vedno.
  // Odgovorimo z 200, da bot ne izve, da smo ga prepoznali.
  if (niz("podjetje").trim() !== "") return NextResponse.json({ ok: true });

  const ime = brezGlave(niz("name")).slice(0, NAJVEC.ime);
  const email = brezGlave(niz("email")).slice(0, NAJVEC.email);
  const telefon = brezGlave(niz("phone")).slice(0, NAJVEC.telefon);
  const zadeva = brezGlave(niz("subject")).slice(0, 60);
  const lokacija = brezGlave(niz("location")).slice(0, 60);
  const sporocilo = niz("message").trim().slice(0, NAJVEC.sporocilo);

  // Na šestjezični strani je koristno vedeti, v katerem jeziku je gost bral —
  // odgovor mu potem napišemo v istem.
  const JEZIKI: Record<string, string> = {
    sl: "slovenščina", en: "angleščina", de: "nemščina",
    it: "italijanščina", bs: "bosanščina", tr: "turščina",
  };
  const jezik = JEZIKI[niz("locale")] ?? "slovenščina";

  if (!ime || !sporocilo || !jeEposta(email))
    return NextResponse.json({ napaka: "podatki" }, { status: 400 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "neznan";
  if (prehitro(ip)) return NextResponse.json({ napaka: "prepogosto" }, { status: 429 });

  const geslo = process.env.ZOHO_APP_PASSWORD;
  if (!geslo) {
    // Brez gesla NE smemo gostu reči, da je poslano. Prej se je prav to
    // dogajalo — obrazec je lagal. Rajši odkrita napaka in telefon.
    console.error("ZOHO_APP_PASSWORD ni nastavljen — pošta ni bila poslana");
    return NextResponse.json({ napaka: "streznik" }, { status: 500 });
  }

  const prenos = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user: COMPANY.email, pass: geslo },
  });

  // ------------------------------------------------------------------------
  // BERLJIVA IMENA NAMESTO SUROVIH VREDNOSTI
  //
  // Obrazec pošlje "splosno" in "vseeno" — to so ključi za kodo, ne besedilo
  // za človeka. V predalu je pisalo prav to, z malo začetnico. Imena beremo
  // iz istih prevodov in istih podatkov o poslovalnicah, ki jih vidi gost,
  // da se ne razideta.
  // ------------------------------------------------------------------------
  const k = sl.kontaktStran;
  const imenaZadev: Record<string, string> = {
    splosno: k.zadevaSplosno,
    studenti: k.zadevaStudenti,
    poslovno: k.zadevaPoslovno,
    drugo: k.zadevaDrugo,
  };
  const imeZadeve = imenaZadev[zadeva] ?? zadeva ?? "—";

  const lokal = LOCATIONS.find((l) => l.id === lokacija);
  const imeLokala = lokal
    ? `${lokal.name} — ${lokal.fullAddress}`
    : lokacija === "vseeno"
    ? k.poslovalnicaVseeno
    : lokacija || "—";

  const vrstice: [string, string][] = [
    ["Ime", ime],
    ["E-pošta", email],
    ["Telefon", telefon || "—"],
    ["Zadeva", imeZadeve],
    ["Poslovalnica", imeLokala],
    ["Jezik strani", jezik],
  ];

  try {
    await prenos.sendMail({
      from: `"${COMPANY.brandName} — spletni obrazec" <${COMPANY.email}>`,
      to: COMPANY.email,
      replyTo: `"${ime}" <${email}>`,
      subject: `Sporočilo s spletne strani — ${ime}`,
      text:
        vrstice.map(([k, v]) => `${k}: ${v}`).join("\n") +
        `\n\nSporočilo:\n${sporocilo}\n`,
      html: `
<div style="background:#fffcf8;padding:24px 12px;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #f2ede4;border-radius:18px;overflow:hidden">
    <tr>
      <td style="background:#1c1917;padding:20px 24px">
        <div style="color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">${COMPANY.brandName}</div>
        <div style="color:#ffffff;font-size:19px;font-weight:700;margin-top:4px">Novo sporočilo s spletne strani</div>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 24px 6px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:#1c1917">
          ${vrstice
            .map(
              ([kljuc, vred], i) => `
          <tr>
            <td style="padding:9px 14px 9px 0;color:#78716c;white-space:nowrap;vertical-align:top;${
              i ? "border-top:1px solid #f7f3ec" : ""
            }">${kljuc}</td>
            <td style="padding:9px 0;font-weight:600;vertical-align:top;${
              i ? "border-top:1px solid #f7f3ec" : ""
            }">${pobegni(vred)}</td>
          </tr>`
            )
            .join("")}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 4px">
        <div style="color:#78716c;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:8px">Sporočilo</div>
        <div style="background:#fffcf8;border:1px solid #f2ede4;border-left:3px solid #ea580c;border-radius:12px;padding:14px 16px;font-size:15px;line-height:1.6;color:#1c1917;white-space:pre-wrap">${pobegni(
          sporocilo
        )}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 22px">
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:12px 14px;font-size:13px;color:#065f46;line-height:1.5">
          Odgovorite kar na to sporočilo — šlo bo naravnost gostu na
          <b style="color:#047857">${pobegni(email)}</b>.
        </div>
      </td>
    </tr>
  </table>
  <div style="max-width:560px;margin:12px auto 0;text-align:center;color:#a8a29e;font-size:11px">
    Poslano prek kontaktnega obrazca na ${COMPANY.email}
  </div>
</div>`,
    });
  } catch (e) {
    // Podrobnosti strežnika ostanejo v dnevniku, gost jih ne sme videti.
    console.error("Pošiljanje ni uspelo:", e);
    return NextResponse.json({ napaka: "posiljanje" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
