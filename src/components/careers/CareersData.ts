export interface JobPosition {
  id: string;
  badge: string;
  title: string;
  pay: string;
  location: string;
  type: string;
  desc: string;
  tasks: string[];
  perks: string[];
}

export const JOBS_DATA: JobPosition[] = [
  {
    id: "zar-mojster",
    badge: "Kuhinja • Žar",
    title: "Samostojni Žar Mojster / Doner Kuhar",
    pay: "1.600 € – 2.000 € neto + dodatki",
    location: "Ljubljana, Center",
    type: "Polni delovni čas",
    desc: "Iščemo izkušenega in samostojnega žar mojstra za pripravo ter peko mesa na odprtem vertikalnem žaru, vodenje 24-urnega naravnega mariniranja ter hitro pripravo orientalskih jedi ob konicah.",
    tasks: [
      "Rezanje, priprava in peka mariniranega mesa na odprtem ognju",
      "Natančno upoštevanje higienskih smernic po HACCP protokolu",
      "Skrb za optimalno pripravo sestavin in sodelovanje pri hitri izdaji naročil",
      "Priprava dnevnih zalog in vzdrževanje čistoče delovnega pulta",
    ],
    perks: [
      "Redno in stimulativno mesečno plačilo (1.600 € – 2.000 € neto + dodatki)",
      "Brezplačen topel obrok in osvežilna pijača med vsako delovno izmeno",
      "Stabilno zaposlitev v uveljavljeni poslovalnici z možnostjo napredovanja",
    ],
  },
  {
    id: "pica-mojster",
    badge: "Pekarna • Krušna Peč",
    title: "Pica Mojster & Peka Domačih Lepinj",
    pay: "1.400 € – 1.800 € neto",
    location: "Ljubljana, Center",
    type: "Polni delovni čas",
    desc: "Zadolženi boste za vsakodnevno pripravo svežega kvašenega testa, oblikovanje ter sprotno peko domačih lepinj v krušni peči tik pred postrežbo ter peko orientalskih pic.",
    tasks: [
      "Zames in nadzor nad naravnim vzhajanjem svežega testa",
      "Peka lepinj na vročem ognju za zagotavljanje hrustljavosti in mehkobe",
      "Peka pic po recepturi restavracije ter vzdrževanje delovnega reda",
    ],
    perks: [
      "Redno mesečno plačilo (1.400 € – 1.800 € neto)",
      "Plačani vsi zakonski dodatki (nedelje, prazniki, prevoz, malica)",
      "Dolgotrajna zaposlitev v urejenem in prijetnem kolektivu",
    ],
  },
  {
    id: "studentsko-delo",
    badge: "Študentsko Delo",
    title: "Pomočnik v Strežbi & Kuhinji (Študent)",
    pay: "8,50 € – 10,50 € / uro neto",
    location: "Ljubljana, Center",
    type: "Študentsko delo",
    desc: "Iščemo komunikativne in nasmejane študente za pomoč pri strežbi, sprejemanju naročil in študentskih bonov ter izdaji svežih jedi v centru mesta.",
    tasks: [
      "Prijazna komunikacija z gosti in izdaja hrane",
      "Unovčevanje študentskih bonov in delo z blagajno",
      "Priprava solatnega bara ter skrb za urejen prostor za sedenje",
    ],
    perks: [
      "Postavka od 8,50 € do 10,50 € / uro neto z rednimi izplačili",
      "Popolno prilagajanje urnika izpitnim rokom in predavanjem",
      "Brezplačna prehrana in pijača med vsako delovno izmeno",
    ],
  },
];
