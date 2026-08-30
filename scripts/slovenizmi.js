// Trazac slovenackih rijeci koje su ostale na bosanskoj stranici.
// Curenje2 ne radi za bosanski: previse rijeci je legitimno isto
// ("Meni", "Kontakt", "Galerija"), pa bi sve bilo lazna uzbuna.
// Ovdje idemo obrnuto: trazimo rijeci koje POSTOJE u slovenackom,
// a u bosanskom ne postoje ili znace nesto drugo.
const BASE = process.argv[2];
const PUTANJE = process.argv.slice(3);

const RIJECI = [
  "in","ali","so","ki","je na voljo","tudi","lahko","zdaj","prek","vsak",
  "vse","vsi","nas","kje","kdaj","kaj","vec","zelo","samo","ker","kot",
  "studentski","studentska","studentske","studentsko","jed","jedi","jedmi",
  "vprasanje","vprasanja","vprasanj","sveze","odprto","zaprto","cena","cene",
  "doplacilo","piskotek","piskotki","piskotkov","restavracija","restavraciji",
  "zelenjava","zelenjave","delovni cas","stevilka","stevilo","izberite",
  "oglejte","oglej","najdete","ponujamo","naslednja","prejsnja","obisci",
  "obiscite","lokaciji","poslovalnica","poslovalnici","poslovalnice",
  "izkaznica","narocilo","narocila","kosilo","malica","malice","krozniki",
  "kroznik","solata","solate","peka","pecemo","strezemo","gost","gostje",
];

const bezSumnika = (s) => s
  .replace(/[čć]/g,"c").replace(/Č|Ć/g,"C")
  .replace(/š/g,"s").replace(/Š/g,"S")
  .replace(/ž/g,"z").replace(/Ž/g,"Z")
  .replace(/đ/g,"d").replace(/Đ/g,"D");

function tekst(html){
  return html.replace(/<script[\s\S]*?<\/script>/gi," ")
             .replace(/<style[\s\S]*?<\/style>/gi," ")
             .replace(/<!--[\s\S]*?-->/g," ")
             .replace(/<[^>]+>/g,"\n")
             .split("\n").map(r=>r.trim()).filter(Boolean);
}

(async()=>{
  let ukupno = 0;
  for (const p of PUTANJE) {
    const redovi = tekst(await (await fetch(BASE+p)).text());
    const nadjeno = [];
    for (const red of redovi) {
      const male = bezSumnika(red.toLowerCase());
      for (const r of RIJECI) {
        // granica rijeci bez regexa: razdvoj na rijeci i uporedi
        const rijeci = male.split(/[^a-z0-9]+/).filter(Boolean);
        if (r.includes(" ")) { if (male.includes(r)) nadjeno.push([r,red]); }
        else if (rijeci.includes(r)) nadjeno.push([r,red]);
      }
    }
    if (nadjeno.length) {
      console.log("### "+p+"  ("+nadjeno.length+")");
      for (const [r,red] of nadjeno) console.log("    ["+r+"] "+red.slice(0,110));
      ukupno += nadjeno.length;
    }
  }
  console.log("\nslovenizama: "+ukupno);
})();
