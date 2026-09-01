import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPANY } from "@/data/company";

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

  const vrstice: [string, string][] = [
    ["Ime", ime],
    ["E-pošta", email],
    ["Telefon", telefon || "—"],
    ["Zadeva", zadeva || "—"],
    ["Poslovalnica", lokacija || "—"],
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
      html:
        `<table style="font-family:system-ui,sans-serif;font-size:14px">` +
        vrstice
          .map(
            ([k, v]) =>
              `<tr><td style="padding:2px 12px 2px 0;color:#78716c">${k}</td>` +
              `<td><b>${pobegni(v)}</b></td></tr>`
          )
          .join("") +
        `</table><p style="font-family:system-ui,sans-serif;font-size:14px;` +
        `white-space:pre-wrap;margin-top:16px">${pobegni(sporocilo)}</p>`,
    });
  } catch (e) {
    // Podrobnosti strežnika ostanejo v dnevniku, gost jih ne sme videti.
    console.error("Pošiljanje ni uspelo:", e);
    return NextResponse.json({ napaka: "posiljanje" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
