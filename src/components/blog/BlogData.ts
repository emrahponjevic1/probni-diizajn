export interface BlogPost {
  id: string;
  isFeatured?: boolean;
  category: "Kulinarične Zgodbe" | "Pekarna & Testo" | "Vegi & Vegan" | "Študentska Prehrana" | "Tradicija & Sladice" | "Kakovost & Halal";
  categorySlug: "kulinarka" | "pekarna" | "vegi" | "boni" | "tradicija" | "kakovost";
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  coverImage: string;
  imageCaption: string;
  contentHtml: string;
}

export interface BlogCategoryFilter {
  id: "vse" | "kulinarka" | "pekarna" | "vegi" | "boni" | "tradicija" | "kakovost";
  label: string;
}

export const BLOG_CATEGORIES: BlogCategoryFilter[] = [
  { id: "vse", label: "Vse objave" },
  { id: "kulinarka", label: "Kulinarične zgodbe" },
  { id: "pekarna", label: "Pekarna & Testo" },
  { id: "vegi", label: "Vegi & Vegan" },
  { id: "boni", label: "Študentska prehrana" },
  { id: "tradicija", label: "Tradicija & Sladice" },
  { id: "kakovost", label: "Kakovost & Halal" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "marinada-orientalski-zar",
    isFeatured: true,
    category: "Kulinarične Zgodbe",
    categorySlug: "kulinarka",
    title: "Umetnost 24-urne marinade za popoln orientalski žar",
    excerpt: "Kako skrbno izbrane orientalske začimbe, sveže stisnjeno oljčno olje in čas počitka ustvarijo neprimerljivo sočnost našega mesa.",
    date: "18. Avg 2026",
    isoDate: "2026-08-18",
    readTime: "5 min branja",
    author: {
      name: "Glavni Žar Mojster",
      role: "Šeherezada Ljubljana",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Priprava svežih rezin mariniranega mesa na odprtem ognju v naši kuhinji.",
    contentHtml: `
      <p class="dropCap">
        Prava orientalska kuhinja se nikoli ne zanaša na bližnjice. Medtem ko se sodobni tempo življenja vse bolj pospešuje, v naši kuhinji še vedno prisegamo na najstarejšo skrivnost vrhunskih mojstrov žara — čas, spoštovanje sestavin in neizmerno potrpežljivost. Vsak kos mesa, ki ga postrežemo v Šeherezadi, gre skozi natančno določen, 24-urni postopek naravnega mariniranja.
      </p>

      <h2>1. Izbira začimb: Harmonija, ki ne preglasi mesa</h2>
      <p>
        Bistvo pristne orientalske marinade ni v tem, da bi z agresivno ostrino prekrili naravni okus mesa, temveč da poudarimo njegovo sočnost in mehkobo. Uporabljamo izključno cela semena začimb, ki jih zmeljemo tik pred pripravo, saj le tako ohranijo vsa eterična olja:
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Orientalska kumina (Jeera):</strong> Daje prepoznavno toplo, rahlo zemeljsko in oreškasto aromo, ki je temelj balkansko-orientalskega žara.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Koriandrova semena & Kardamom:</strong> Poskrbita za nežen pridih svežine ter subtilno citrusno noto v ozadju vsakega grižljaja.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Sladka mleta paprika & Sveži česen:</strong> Ustvarita privlačno zlato-rdečo barvo ter globok, zaokrožen okus.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "Marinada mora meso zmehčati od znotraj, ne le obarvati zunanjosti. Če meso počiva polnih 24 ur na idealni temperaturi, med peko na vročem žaru ne izgubi niti kapljice lastnega naravnega soka."
        </p>
        <cite>— Mojster žara, Šeherezada Ljubljana</cite>
      </blockquote>

      <h2>2. Zakaj je 100% Halal certifikat temelj naše kakovosti?</h2>
      <p>
        Vsi naši mesni kosi prihajajo od strogo preverjenih dobaviteljev z veljavnimi Halal certifikati. To ne pomeni le spoštovanja tradicije, temveč predvsem popolno sledljivost porekla, najvišjo higiensko raven ter absolutno odsotnost umetnih ojačevalcev okusa, dodane vode ali industrijskih veziv v masi mesa.
      </p>

      <h2>3. Pečenje na optimalni temperaturi</h2>
      <p>
        Ko marinirano meso doseže sobno temperaturo, ga položimo na natančno kalibriran žar. Zaradi enakomerne porazdelitve marinade se na površini ustvari karamelizirana skorjica, sredica pa ostane neverjetno mehka in sočna. Postrežemo ga neposredno v vročo, sveže pečeno lepinjo ali jufko.
      </p>
    `,
  },
  {
    id: "skrivnost-domace-lepinje",
    isFeatured: false,
    category: "Pekarna & Testo",
    categorySlug: "pekarna",
    title: "Zakaj lepinje pečemo sproti tik pred postrežbo?",
    excerpt: "Skrivnost hrustljave skorjice in zračne sredice se skriva v visoki temperaturi peči in sveže zamesenem testu vsak dan.",
    date: "14. Avg 2026",
    isoDate: "2026-08-14",
    readTime: "4 min branja",
    author: {
      name: "Mojster Peke",
      role: "Šeherezada Pekarna",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Sveže pečena lepinja naravnost iz krušne peči s hrustljavo zlato skorjo.",
    contentHtml: `
      <p class="dropCap">
        Dobra lepinja je duša vsakega orientalskega sendviča. V Šeherezadi velja strogo pravilo: pri nas ne boste nikoli dobili vnaprej spečenega, ohlajenega in nato v mikrovalovni pečici pogretega kruha. Testo zamesimo večkrat dnevno iz preprostih, a brezhibno čistih naravnih sestavin.
      </p>

      <h2>Enostavne sestavine, vrhunski postopek</h2>
      <p>
        Pristno testo za lepinjo vsebuje le štiri osnovne sestavine: vrhunsko pšenično moko, čisto vodo, kvas in ščepec morske soli. Brez industrijskih konzervansov, brez sladkorjev in brez umetnih dodatkov za rahljanje.
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Čas vzhajanja:</strong> Testo počiva v dveh fazah, da se razvije naravna elastičnost glutenske mreže.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Peka na več kot 300°C:</strong> Ko testo položimo na vroč kamen, visoka temperatura v hipu upari vlago v testu.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "V manj kot dveh minutah v peči nastanejo značilni zračni žepki. Lepinja se napihne kot balon, skorjica zakrkne v hrustljavo popolnost, sredica pa ostane mehka in topla, pripravljena da vpije sokove svežega žara."
        </p>
        <cite>— Glavni pek Šeherezade</cite>
      </blockquote>

      <h2>Zakaj je svežina tako pomembna?</h2>
      <p>
        Ko v vročo lepinjo naložimo sveže pečen kebab, sir ali solato, toplota lepinje naravno sprosti arome vseh sestavin. To je tista razlika, ki jo začutite že ob prvem grižljaju.
      </p>
    `,
  },
  {
    id: "avtenticni-domaci-falafel",
    isFeatured: false,
    category: "Vegi & Vegan",
    categorySlug: "vegi",
    title: "Skrivnost pristnih hrustljavih domačih falaflov",
    excerpt: "Od surove namočene čičerike do svežega peteršilja, koriandra, česna in prave orientalske kumine.",
    date: "10. Avg 2026",
    isoDate: "2026-08-10",
    readTime: "3 min branja",
    author: {
      name: "Vegi Specialist",
      role: "Šeherezada Kuhinja",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Priprava domačih falaflov s svežimi zelišči in fino mleto čičeriko.",
    contentHtml: `
      <p class="dropCap">
        Pravi orientalski falafel je ena najbolj hranljivih in okusnih rastlinskih jedi na svetu. Vendar pa obstaja velika razlika med industrijskimi zamrznjenimi polpeti in pristnim falaphlom, pripravljenim po tradicionalnem receptu.
      </p>

      <h2>Pravilo številka 1: Nikoli iz kuhane čičerike</h2>
      <p>
        Najpogostejša napaka pri domači ali hitri pripravi falaflov je uporaba kuhane ali konzervirane čičerike. Takšna masa postane kašasta in v olju razpade. V Šeherezadi uporabljamo izključno suho čičeriko, ki jo namakamo v hladni vodi polnih 14 ur.
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Sveža zelišča:</strong> Bogat šop svežega gladkega peteršilja in mladega koriandra da masi tisto pristno smaragdno zeleno barvo v notranjosti.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>100% Brez glutena in jajc:</strong> Ker je razmerje mletja popolno, falafel ne potrebuje moke ali jajčnih veziv.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "Cvremo jih v ločenem, povsem čistem rastlinskem olju pri natančnih 175°C. Rezultat je izjemno hrustljava zunanja skorjica ter zračna, dišeča in sočna notranjost."
        </p>
        <cite>— Ekipa Šeherezada</cite>
      </blockquote>

      <h2>Kako ga postrežemo?</h2>
      <p>
        Falafel je odličen v topli lepinji s svežim paradižnikom, kumaricami, domačim sezamovim tahinijem in kančkom blagega ali pekočega preliva.
      </p>
    `,
  },
  {
    id: "studentski-boni-vodic",
    isFeatured: false,
    category: "Študentska Prehrana",
    categorySlug: "boni",
    title: "Kako z bonom do polnega toplega kosila za samo 3,00 €",
    excerpt: "Vse kar morate vedeti o koriščenju študentskih bonov pri nas: juha, glavna jed, solata, sadje in pijača.",
    date: "05. Avg 2026",
    isoDate: "2026-08-05",
    readTime: "4 min branja",
    author: {
      name: "Šeherezada Ekipa",
      role: "Študentska Postrežba",
      image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Bogat študentski meni z juho, glavno jedjo, solatnim barom in sadjem za doplačilo 3,00 €.",
    contentHtml: `
      <p class="dropCap">
        Študentska leta so čas predavanj, intenzivnega študija, druženja in potrebe po kakovostnem, toplem in cenovno dostopnem obroku. V Šeherezadi se zavedamo, kako pomembna je uravnotežena prehrana, zato z veseljem ponujamo subvencionirano študentsko prehrano z doplačilom točno 3,00 €.
      </p>

      <h2>Kaj vsebuje celoten študentski meni?</h2>
      <p>
        Za fiksno doplačilo 3,00 € pri nas ne dobite zgolj hitrega prigrizka, temveč polnovreden 5-delni obrok:
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Topla dnevna juha:</strong> Izbira med krepko govejo juho z rezanci ali domačo zelenjavno juho.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Glavna jed po izbiri:</strong> Kebab v sveži lepinji ali jufki, hrustljavi falafel krožnik, sočen burger ali sveža pica.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Sveža solata & Sadje:</strong> Izbor iz svežega solatnega bara ter sezonsko jabolko ali banana.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Pijača:</strong> Kozarec vode ali naravnega soka za popolno osvežitev med predavanji.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "Boni so pri nas unovčljivi vsak dan med odpiralnim časom, brez zapletov in z izjemno hitro postrežbo, da ne zamudite naslednjega predavanja."
        </p>
        <cite>— Šeherezada Študentski kotiček</cite>
      </blockquote>
    `,
  },
  {
    id: "orientalska-baklava-tradicija",
    isFeatured: false,
    category: "Tradicija & Sladice",
    categorySlug: "tradicija",
    title: "Prava orientalska baklava z orehi in nežnim sirupom",
    excerpt: "Kako nastane kraljica orientalskih sladic z več kot tridesetimi plastmi tanko vlečenega testa in maslom.",
    date: "01. Avg 2026",
    isoDate: "2026-08-01",
    readTime: "4 min branja",
    author: {
      name: "Mojster Sladic",
      role: "Šeherezada Sladice",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1519869325930-281384150729?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Ročno zložene plasti baklave, bogato posute z mletimi orehi in prelita z dišečim sirupom.",
    contentHtml: `
      <p class="dropCap">
        Nobeno pravo orientalsko kulinarično doživetje ni popolno brez sladkega zaključka. Baklava je simbol gostoljubja, praznovanja in mojstrstva slaščičarske potrpežljivosti, ki se prenaša iz roda v rod že stoletja.
      </p>

      <h2>Plasti, ki zahtevajo mirno roko</h2>
      <p>
        Skrivnost vrhunske baklave se skriva v prosojnih plasteh ročno razvlečenega testa, premazanih s stopljenim maslom ter bogato nadevanih s skrbno izbranimi orehi ali pistacijami.
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Pravi 'agda' sirup:</strong> Sirup mora imeti natančno določeno gostoto z dodatkom sveže limone, da uravnoteži sladkobo in prepreči kristalizacijo sladkorja.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Zlato rjava peka:</strong> Baklava se peče počasi na nizki temperaturi, da vsaka posamezna plast testa postane hrustljava in krhka.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "Ko vročo baklavo prelijemo s hladnim aromatičnim sirupom, zaslišite tisto značilno šumenje — to je trenutek, ko se hrustljavost in sočnost združita v popolnost."
        </p>
        <cite>— Tradicionalna receptura Šeherezade</cite>
      </blockquote>
    `,
  },
  {
    id: "halal-standardi-kakovost",
    isFeatured: false,
    category: "Kakovost & Halal",
    categorySlug: "kakovost",
    title: "100% Halal certifikat in sledljivost mesa v Šeherezadi",
    excerpt: "Kaj v praksi pomenijo naši strogi higienski in certifikacijski standardi od dobavitelja do vašega krožnika.",
    date: "26. Jul 2026",
    isoDate: "2026-07-26",
    readTime: "3 min branja",
    author: {
      name: "Vodja Kakovosti",
      role: "Šeherezada Standardi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=85",
    imageCaption: "Vrhunski standardi priprave in 100% Halal certificirana kakovost.",
    contentHtml: `
      <p class="dropCap">
        Za nas priprava hrane ni le posel, temveč zaveza do vsakega gosta, ki stopi skozi naša vrata. V Šeherezadi zagotavljamo 100% Halal certificirano poreklo mesa ter najvišje higienske standarde priprave v vseh fazah.
      </p>

      <h2>Kaj pomeni Halal standard v naši kuhinji?</h2>
      <p>
        Halal certifikacija zagotavlja, da je vsak korak v verigi — od vzreje, predelave do končne priprave — pod strogim nadzorom pristojnih certifikacijskih organov. To pomeni spoštovanje etičnih načel, čistost brez škodljivih primesi in popolno transparentnost.
      </p>

      <div class="spiceHighlightBox">
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Popolna sledljivost:</strong> Točno vemo, od kod prihaja vsaka pošiljka govedine, teletine in piščanca.
          </div>
        </div>
        <div class="spiceItem">
          <span class="spiceBullet"></span>
          <div>
            <strong>Brez svinjine in alkohola:</strong> Naša kuhinja je v celoti ločena in zavezana izključno čistim sestavinam.
          </div>
        </div>
      </div>

      <blockquote class="chefQuote">
        <div class="quoteIcon">“</div>
        <p>
          "Zaupanje naših gostov je naša največja vrednota. Zato pri kakovosti in certifikatih nikoli ne sprejemamo kompromisov."
        </p>
        <cite>— Vodstvo restavracije Šeherezada</cite>
      </blockquote>
    `,
  },
];
