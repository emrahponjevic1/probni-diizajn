export interface HeroItem {
  id: number;
  title: string;
  subtitle: string;
  category: "Cyberpunk" | "Organic" | "Quantum" | "Brutalism" | "Hologram" | "Kinetic" | "Minimal" | "Retro" | "AI Custom";
  badge: string;
  primaryAction: string;
  secondaryAction: string;
  metrics: { label: string; value: string }[];
}

export const HEROS_DATA: HeroItem[] = [
  {
    id: 1,
    title: "CYBER-BITE 3000",
    subtitle: "Sintetička brza hrana budućnosti sa laser precizno prilagođenim hranjivim vrijednostima. Naručite u sekundi putem kognitivne mreže.",
    category: "Cyberpunk",
    badge: "⚡ Cyberpunk Matrix 2040",
    primaryAction: "Aktiviraj Narudžbu",
    secondaryAction: "Pregled Mreže",
    metrics: [
      { label: "Dopamina", value: "+98%" },
      { label: "Brzina Isporuke", value: "3.2 sec" },
      { label: "Ocjena Mreže", value: "99.9" }
    ]
  },
  {
    id: 2,
    title: "NEO-ORGANIC NUTRITION",
    subtitle: "Bioluminiscentne organske zdjele uzgojene u mikro-gravitacijskim vertikalnim biosferama Sarajeva 2040.",
    category: "Organic",
    badge: "🌱 Vertikalna Biosfera",
    primaryAction: "Probaj Bio-Capsule",
    secondaryAction: "Sastav Mikronutrijenata",
    metrics: [
      { label: "Čistoća Nutrijenata", value: "100%" },
      { label: "Eko Otisak", value: "0.00" },
      { label: "Bio Vitamini", value: "A++" }
    ]
  },
  {
    id: 3,
    title: "QUANTUM TELEPORT DELIVERIES",
    subtitle: "Kvantna instant dostava toplih burgera direktno na vaše koordinatne tačke uz pomoć dronova pete generacije.",
    category: "Quantum",
    badge: "🛸 Quantum Teleport Active",
    primaryAction: "Postavi Teleport Koordinatu",
    secondaryAction: "Radar Dostave",
    metrics: [
      { label: "Vrijeme Dostave", value: "0.5 sec" },
      { label: "Temperatura", value: "85°C Hot" },
      { label: "Kvantna Preciznost", value: "99.99%" }
    ]
  },
  {
    id: 4,
    title: "SYNTH-FOOD BRUTALISM",
    subtitle: "BEZ COMPROMISA. MAKSIMALNI FLAVOR. ULTRA BRUTALNA HRANA ZA FUTURISTIČKE GRADVE.",
    category: "Brutalism",
    badge: "🔥 BRUTAL NUTRITION",
    primaryAction: "NARRUČI ODMAH",
    secondaryAction: "MENU 2040",
    metrics: [
      { label: "KALORIJE", value: "1500 kcal" },
      { label: "PROTEINI", value: "85g" },
      { label: "OKUS", value: "MAXIMAL" }
    ]
  },
  {
    id: 5,
    title: "HOLOGRAM DINER 2040",
    subtitle: "Interaktivna 3D holografska projekcija hrane. Pregledajte i prilagodite svaki sloj burgera prije sintetiziranja.",
    category: "Hologram",
    badge: "✨ 3D Hologram Projection",
    primaryAction: "Pokreni Hologram",
    secondaryAction: "360° Skener",
    metrics: [
      { label: "Rezolucija", value: "8K Holo" },
      { label: "Prilagođavanje", value: "Realtime" },
      { label: "Laboratorij Okusa", value: "Aktivan" }
    ]
  },
  {
    id: 6,
    title: "HYPER-KINETIC VELOCITY BITES",
    subtitle: "Za ljude u ultra-brzom pokretu. Brza energija koncipirana za hiper-brze letove i urbana putovanja.",
    category: "Kinetic",
    badge: "⚡ Speed Fuel 2035",
    primaryAction: "Hiper-Punjenje",
    secondaryAction: "Brzina Reakcije",
    metrics: [
      { label: "Brzina Apsorpcije", value: "Instant" },
      { label: "Energija", value: "24h Shift" },
      { label: "Performanse", value: "+120%" }
    ]
  },
  {
    id: 7,
    title: "ORBITAL ZERO-GRAVITY BITES",
    subtitle: "Dizajnirano za orbitalne stanice i svemirske nulte gravitacije. Hrana koja lebdi u savršenoj ravnoteži.",
    category: "Quantum",
    badge: "🌌 Deep Space Station Food",
    primaryAction: "Lansiraj Narudžbu",
    secondaryAction: "Orbitalna Ruta",
    metrics: [
      { label: "Gravitacija", value: "0.0 G" },
      { label: "Orbita", value: "400 km" },
      { label: "Zalihe", value: "Stabilne" }
    ]
  },
  {
    id: 8,
    title: "BENTO-TECH CYBER GRID",
    subtitle: "Japanski sajber-bento modularni sistem. Izaberite do 6 modularnih kapsula ukusa u jednoj kutiji.",
    category: "Cyberpunk",
    badge: "🍱 Cyber Bento Modular",
    primaryAction: "Konfiguriši Bento",
    secondaryAction: "Izaberi Kapsule",
    metrics: [
      { label: "Modula", value: "6 Kapsula" },
      { label: "Estetika", value: "Cyber 10/10" },
      { label: "Proizvodnja", value: "Kyoto Lab" }
    ]
  },
  {
    id: 9,
    title: "MINIMALIST LUXURY 2040",
    subtitle: "Prefinjen, čist i luksuzan pristup brzoj hrani. Napravljeno od najrjeđih prirodnih molekula uz vrhunski dizajn.",
    category: "Minimal",
    badge: "💎 Titanium Luxury Edition",
    primaryAction: "Rezervišite Degustaciju",
    secondaryAction: "Filozofija Okusa",
    metrics: [
      { label: "Ocjena Estetike", value: "Awwwards Gold" },
      { label: "Sastojci", value: "Ultra Rare" },
      { label: "Čistoća", value: "99.9%" }
    ]
  },
  {
    id: 10,
    title: "GLITCH FLAVOR SYNTHESIZER",
    subtitle: "Eksperimentalni glitched ukusi koji mijenjaju aromu na jeziku u realnom vremenu uz pomoć soničnih talasa.",
    category: "Brutalism",
    badge: "👾 Glitch Audio-Food Lab",
    primaryAction: "Sintetiziraj Glitch",
    secondaryAction: "Sonična Frekvencija",
    metrics: [
      { label: "Glitch Nivo", value: "Maximum" },
      { label: "Audio Zvuk", value: "432 Hz" },
      { label: "Novi Okusi", value: "Neograničeno" }
    ]
  },
  {
    id: 11,
    title: "VOXEL 3D FAST FOOD",
    subtitle: "Izometrijski voksel dizajnerski piksel burgeri iz 2040 arcade univerzuma.",
    category: "Retro",
    badge: "🎮 Voxel Arcade 3D",
    primaryAction: "Igraj & Naruči",
    secondaryAction: "Voxel Galerija",
    metrics: [
      { label: "Pikseli", value: "3D Voxel" },
      { label: "Retro Score", value: "999,990" },
      { label: "Nivo Okusa", value: "MAX" }
    ]
  },
  {
    id: 12,
    title: "AURORA BIO-CAPSULE",
    subtitle: "Iridescentne svilene kapsule punjene tečnim aromama i eliksirima vitalnosti.",
    category: "Organic",
    badge: "✨ Aurora Glow Silk",
    primaryAction: "Probaj Aurora Kapsulu",
    secondaryAction: "Eliksir Sastav",
    metrics: [
      { label: "Sjaj", value: "Bioluminescent" },
      { label: "Hidratacija", value: "100%" },
      { label: "Vitalnost", value: "+85%" }
    ]
  },
  {
    id: 13,
    title: "SYNTHWAVE SUNSET 2099",
    subtitle: "Retro-futuristička vožnja kroz neonske noći uz najsočnije sajber-pomfrite i shake-ove.",
    category: "Retro",
    badge: "🌅 Synthwave 80s Cyber",
    primaryAction: "Noćna Vožnja Menu",
    secondaryAction: "Pusti Synth Beat",
    metrics: [
      { label: "BPM", value: "128 Synth" },
      { label: "Neon Glow", value: "Magenta" },
      { label: "Vibe", value: "100%" }
    ]
  },
  {
    id: 14,
    title: "AI DNA NUTRI-CUSTOMIZER",
    subtitle: "Skenirajte svoj DNA ili profil i AI će napraviti idealan omjer proteina, masti i ugljikohidrata za vas.",
    category: "AI Custom",
    badge: "🤖 AI DNA Algorithm",
    primaryAction: "Skeniraj Profil",
    secondaryAction: "Generiši Obrok",
    metrics: [
      { label: "AI Tačnost", value: "99.8%" },
      { label: "Prilagođavanje", value: "DNA Level" },
      { label: "Vrijeme Izrade", value: "4.1 sec" }
    ]
  },
  {
    id: 15,
    title: "COMMAND TACTICAL RADIAL HUD",
    subtitle: "Taktička radarska kontrolna tabla za izbor i selekciju vaših omiljenih visokokaloričnih obroka.",
    category: "Quantum",
    badge: "🎯 Tactical Radar HUD",
    primaryAction: "Zaključaj Metu",
    secondaryAction: "Prikaži Radar",
    metrics: [
      { label: "Targeting", value: "Locked" },
      { label: "Domet", value: "Global" },
      { label: "Status", value: "Ready" }
    ]
  },
  {
    id: 16,
    title: "3D PARALLAX DIMENSION",
    subtitle: "Veslajte kroz slojeve sočnog peciva, 100% organskog mesa, rastopljenog sira i svježih dodataka.",
    category: "Kinetic",
    badge: "🥞 3D Layer Parallax",
    primaryAction: "Istraži Slojeve",
    secondaryAction: "Demontaža Burgera",
    metrics: [
      { label: "Slojevi", value: "7 Nivoa" },
      { label: "Dubina", value: "True 3D" },
      { label: "Kvalitet", value: "Premium" }
    ]
  },
  {
    id: 17,
    title: "METAVERSE VR SPATIAL LAB",
    subtitle: "Naručite u virtualnoj stvarnosti i osjetite fizičku isporuku na vašim vratima u stvarnom svijetu.",
    category: "Hologram",
    badge: "🥽 Spatial VR Meta",
    primaryAction: "Ulaz u VR Restoran",
    secondaryAction: "Metaverse Mreža",
    metrics: [
      { label: "Spatial UI", value: "VR Ready" },
      { label: "Latencija", value: "<1ms" },
      { label: "Zajednica", value: "50k online" }
    ]
  },
  {
    id: 18,
    title: "CYBER-NOIR ALLEY DINER",
    subtitle: "Atmosferski noćni ugostiteljski objekat pod kišnim sajber-neonom i toplim parnim roštiljem.",
    category: "Cyberpunk",
    badge: "🌧️ Cyber-Noir 2045",
    primaryAction: "Naruči na Šanku",
    secondaryAction: "Noćna Mapan",
    metrics: [
      { label: "Atmosfera", value: "Moody Noir" },
      { label: "Roštilj", value: "Vruć 300°C" },
      { label: "Klijenti", value: "Noćne Ptice" }
    ]
  },
  {
    id: 19,
    title: "KINETIC TYPO LIQUID WAVE",
    subtitle: "Tečni ukusi i dinamika slova u stalnom pokretu koji reaguju na vaš miš i dodir.",
    category: "Kinetic",
    badge: "🌊 Kinetic Typo Waves",
    primaryAction: "Pokreni Tečnost",
    secondaryAction: "Eksperiment",
    metrics: [
      { label: "Fluidnost", value: "60 FPS" },
      { label: "Reakcija", value: "Instant" },
      { label: "Gradijent", value: "Dynamic" }
    ]
  },
  {
    id: 20,
    title: "SOLARPUNK ECO-EATS",
    subtitle: "Ekološki održiva solarna brza hrana koja se priprema direktno solarnom termalnom energijom.",
    category: "Organic",
    badge: "☀️ Solarpunk Clean Energy",
    primaryAction: "Solarni Obrok",
    secondaryAction: "Energetski Bilans",
    metrics: [
      { label: "Solarna Snaga", value: "100% Sun" },
      { label: "Karbon", value: "Negative" },
      { label: "Sastojci", value: "Lokalni Bio" }
    ]
  },
  {
    id: 21,
    title: "TOKYO CYBER NIGHT MARKET",
    subtitle: "Tradicionalne azijske nudle i rameni spojeni sa hiper-tehnološkim hologramskim šankovima.",
    category: "Cyberpunk",
    badge: "🍜 Tokyo Cyber Alley",
    primaryAction: "Naruči Ramen Kapsulu",
    secondaryAction: "Pregled Menija",
    metrics: [
      { label: "Useto", value: "Shibuya Cyber" },
      { label: "Juha", value: "Slow Cook 24h" },
      { label: "Ocjena", value: "5.0 ★" }
    ]
  },
  {
    id: 22,
    title: "TACTICAL MILITARY ARMOR FUEL",
    subtitle: "Teška balistička hrana za maksimalnu izdržljivost u najtežim uslovima rada.",
    category: "Brutalism",
    badge: "🛡️ Tactical Payload Fuel",
    primaryAction: "Aktiviraj Balistički Paket",
    secondaryAction: "Analiza Kalorija",
    metrics: [
      { label: "Izdržljivost", value: "48 Sati" },
      { label: "Kalorije", value: "2200 kcal" },
      { label: "Armatura", value: "Grade 5" }
    ]
  },
  {
    id: 23,
    title: "NEUMORPHIC MATRIX 2.0",
    subtitle: "Meki, taktilni i elegantni interfejs sa svjetlosnim utorima za najudobnije iskustvo naručivanja.",
    category: "Minimal",
    badge: "🔮 Neumorphic Soft UI",
    primaryAction: "Pritisni Za Narudžbu",
    secondaryAction: "Soft Taktilnost",
    metrics: [
      { label: "Mekoća UI", value: "Maximum" },
      { label: "Kontrast", value: "Perfektan" },
      { label: "Odziv", value: "Haptic" }
    ]
  },
  {
    id: 24,
    title: "HYPER-DRIVE WARP SPEED",
    subtitle: "Pritisnite Turbo dugme i pređite u brzinu svjetlosti prilikom odabira vaše omiljene brze hrane.",
    category: "Kinetic",
    badge: "🚀 Hyper Warp Speed",
    primaryAction: "TURBO NARUDŽBA",
    secondaryAction: "Warp Brzina",
    metrics: [
      { label: "Warp Fakt", value: "9.9" },
      { label: "Ubrzanje", value: "0-100 u 0.1s" },
      { label: "Pogon", value: "Plazma" }
    ]
  },
  {
    id: 25,
    title: "FLOATING GLASS PRISM ISLANDS",
    subtitle: "Nivoi kristalnog akrilnog stakla koji lebde u vazduhu sa prelamanjem svjetlosti duginih boja.",
    category: "Hologram",
    badge: "💎 Prism Glass Floating",
    primaryAction: "Dotakni Staklo",
    secondaryAction: "Refrakcija Svjetla",
    metrics: [
      { label: "Prozirnost", value: "95%" },
      { label: "Refrakcija", value: "Prism 4K" },
      { label: "Stil", value: "Futuristic" }
    ]
  },
  {
    id: 26,
    title: "DUAL-CONTRAST FLAVOR SPLITTER",
    subtitle: "Izaberite između 100% zdrave bio-zdjele i ultra sočnog sajber-burgera na interaktivnom klizaču.",
    category: "AI Custom",
    badge: "☯️ Dual Healthy vs Junk",
    primaryAction: "Izaberi Svoju Stranu",
    secondaryAction: "Balans Obroka",
    metrics: [
      { label: "Balans", value: "50 / 50" },
      { label: "Izbor", value: "Neograničen" },
      { label: "Zadovoljstvo", value: "100%" }
    ]
  },
  {
    id: 27,
    title: "PULSE AUDIO VISUALIZER BITES",
    subtitle: "Muza i hrana stvoreni u jedno. Obroci napravljeni uz ritam muzičkih basova i svjetlosnih frekvencija.",
    category: "Brutalism",
    badge: "🎵 Beat & Bite Equalizer",
    primaryAction: "Pusti Bass & Naruči",
    secondaryAction: "Audio Frekvencija",
    metrics: [
      { label: "Bas Reakcija", value: "Deep Bass" },
      { label: "BPM Ritam", value: "140 BPM" },
      { label: "Svjetlo", value: "Audio Synced" }
    ]
  },
  {
    id: 28,
    title: "RETRO-ATOMIC 2050 DINER",
    subtitle: "Kako su u 1950-ima zamišljali brzu hranu u 2050. godini! Leteći tanjiri, hromirani šankovi i tirkizni neon.",
    category: "Retro",
    badge: "🛸 Atomic Age 2050",
    primaryAction: "Leteći Tanjir Narudžba",
    secondaryAction: "Hromirana Galerija",
    metrics: [
      { label: "Retro Stil", value: "Atomic 50s" },
      { label: "Atomski Pogon", value: "Čist" },
      { label: "Osmijeh", value: "Garantovan" }
    ]
  },
  {
    id: 29,
    title: "MICRO-PHYSICS INGREDIENT LAB",
    subtitle: "Interaktivni laboratorij gdje možete prevlačiti fizikalne sastojke i kreirati svoj unikatni recept.",
    category: "AI Custom",
    badge: "🧪 Physics Canvas Lab",
    primaryAction: "Promiješaj Sastojke",
    secondaryAction: "Laboratorijski Protokol",
    metrics: [
      { label: "Fizika", value: "2D Canvas" },
      { label: "Sastojaka", value: "30+ Elementa" },
      { label: "Kreacija", value: "Unikatna" }
    ]
  },
  {
    id: 30,
    title: "GRAND AWWWARDS EDITORIAL 2040",
    subtitle: "Vrhunac visoke mode i visoke gastronomije. Elegantna, editorialna naslovna strana za najstilizovanije obroke.",
    category: "Minimal",
    badge: "🏆 Awwwards Site of the Year 2040",
    primaryAction: "Doživite Editorial",
    secondaryAction: "Kolekcija 2040",
    metrics: [
      { label: "Awwwards Score", value: "9.98 / 10" },
      { label: "Tipografija", value: "Custom Serif" },
      { label: "Prestiž", value: "Ultra High" }
    ]
  }
];
