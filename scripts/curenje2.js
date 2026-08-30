// Bolji trazac curenja: NE oslanja se na slova č/š/ž.
//
// Ideja: uporedi isti red teksta na slovenackoj i stranoj stranici.
// Ako je red DOSLOVNO ISTI na oba jezika, to je ili ime/broj (u redu),
// ili neprevedeni tekst (curenje). Ovo hvata i "Redna:", koje nema
// nijedno slovenacko slovo.
const fs=require("fs");
const BASE=process.argv[2];
const PREF=process.argv[3];
const PAROVI=process.argv.slice(4); // "slovenska_putanja=strana_putanja"

const DOZVOLJENO=[
 "Šeherezada","Š","Ljubljana","Trubarjeva","Slovenska","Google","Wolt",
 "Instagram","Facebook","TikTok","Apple Maps","Google Maps","Falafel","Humus",
 "Hamburger","Pizza","Kebab","Blog","FAQ","ADL d.o.o.","GDPR","ZVOP-2",
 "ZEKom-2","Zavod Halal","BicikeLJ","Čevapčiči","Margarita","Klasik","Tuna",
 "Salami","XL","NFC","SSL/TLS","ŠOS","ŠOU","Crispy","Döner",
];
function tekst(html){
  return html.replace(/<script[\s\S]*?<\/script>/gi," ")
             .replace(/<style[\s\S]*?<\/style>/gi," ")
             .replace(/<!--[\s\S]*?-->/g,"")
             .replace(/<[^>]+>/g,"\n")
             .split("\n").map(r=>r.trim()).filter(Boolean);
}
const samoBrojIZnak = (s) => !/[a-zA-ZčšžćđČŠŽĆĐ]/.test(s);
const dozvoljen = (s) => {
  if (samoBrojIZnak(s)) return true;
  if (s.length < 3) return true;
  let o = s;
  for (const d of DOZVOLJENO) o = o.split(d).join("");
  return !/[a-zA-ZčšžČŠŽ]/.test(o);
};

(async()=>{
  let ukupno=0;
  for(const par of PAROVI){
    const [sl,xx]=par.split("=");
    const a=new Set(tekst(await (await fetch(BASE+sl)).text()));
    const b=tekst(await (await fetch(BASE+PREF+xx)).text());
    const isti=[...new Set(b.filter(r=>a.has(r) && !dozvoljen(r)))];
    if(isti.length){
      console.log("### "+PREF+xx+"  ("+isti.length+")");
      for(const x of isti.slice(0,12)) console.log("    "+x.slice(0,90));
      ukupno+=isti.length;
    }
  }
  console.log(ukupno===0 ? "\nNEMA NEPREVEDENOG TEKSTA" : "\nsumnjivih redova: "+ukupno);
})();
