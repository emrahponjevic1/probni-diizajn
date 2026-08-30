// Provjeri prevod naspram slovenačkog izvora.
// Traži tri stvari koje tiho lome stranicu:
//   1. ključ koji ne postoji u sl.json (višak — nikad se neće prikazati)
//   2. izgubljen ili dodan {broj} — rečenica ostane sa vitičastim zagradama
//   3. izgubljen ili dodan <b>/<link> — tekst se ne prikaže
// Upotreba: node provjeri-prevod.js en
const fs = require("fs");
const jezik = process.argv[2];
const sl = JSON.parse(fs.readFileSync("messages/sl.json", "utf8"));
const pr = JSON.parse(fs.readFileSync(`messages/${jezik}.json`, "utf8"));

const ravno = (o, put = "", out = {}) => {
  for (const [k, v] of Object.entries(o)) {
    const p = put ? put + "." + k : k;
    if (typeof v === "object" && v !== null) ravno(v, p, out);
    else out[p] = v;
  }
  return out;
};
const S = ravno(sl), P = ravno(pr);

// {ime} placeholderi i <oznake> — bez regexa sa kosim crtama
function znakovi(s, otvori, zatvori) {
  const out = []; let i = 0;
  while (i < s.length) {
    const a = s.indexOf(otvori, i);
    if (a < 0) break;
    const b = s.indexOf(zatvori, a);
    if (b < 0) break;
    out.push(s.slice(a + 1, b));
    i = b + 1;
  }
  return out.sort();
}
const polja = (s) => znakovi(s, "{", "}");
const oznake = (s) => znakovi(s, "<", ">").map(x => x.replace("/", "")).filter((v, i, a) => a.indexOf(v) === i).sort();

const greske = [], nedostaje = [], visak = [];
for (const k of Object.keys(S)) if (!(k in P)) nedostaje.push(k);
// Neki razdelci so v sl.json namerno prazni: slovensko besedilo živi v
// podatkovni datoteki (jedi v MenuData.ts, mnenja v reviews.ts). Ključi pod
// njimi so v prevodu pričakovani in niso višek.
const PRAZNI = Object.keys(sl).filter(
  (k) => typeof sl[k] === "object" && Object.keys(sl[k]).length === 0
);
const jePodatkovni = (k) => PRAZNI.some((n) => k === n || k.startsWith(n + "."));
for (const k of Object.keys(P)) if (!(k in S) && !jePodatkovni(k)) visak.push(k);

for (const k of Object.keys(P)) {
  if (!(k in S)) continue;
  const a = polja(S[k]).join(","), b = polja(P[k]).join(",");
  if (a !== b) greske.push([k, "polja", a || "(nema)", b || "(nema)"]);
  const c = oznake(S[k]).join(","), d = oznake(P[k]).join(",");
  if (c !== d) greske.push([k, "oznake", c || "(nema)", d || "(nema)"]);
}

console.log(`=== ${jezik}.json naspram sl.json ===`);
console.log(`  prevedeno: ${Object.keys(P).length} / ${Object.keys(S).length}`);
console.log(`  nedostaje: ${nedostaje.length}`);
console.log(`  visak (kljuc ne postoji u sl): ${visak.length}`);
console.log(`  polomljeno: ${greske.length}`);
for (const k of visak.slice(0, 10)) console.log("    VISAK: " + k);
for (const [k, t, a, b] of greske.slice(0, 15))
  console.log(`    ${t.toUpperCase()} ${k}\n       sl: ${a}\n       ${jezik}: ${b}`);
if (nedostaje.length && nedostaje.length <= 25)
  for (const k of nedostaje) console.log("    nedostaje: " + k);
process.exit(greske.length || visak.length ? 1 : 0);
