import { useTranslations } from "next-intl";
import { GOOGLE_REVIEWS } from "@/data/reviews";
import { LOCATIONS, locationById } from "@/data/locations";
import { hoursSummary } from "@/lib/hours";
import { useReviewText } from "@/i18n/reviewText";
import { STUDENT_BON } from "@/components/menu/MenuData";

// ---------------------------------------------------------------------------
// STRAN O NAS — ZGRADBA
//
// Tukaj je zgradba: kateri razdelki obstajajo, katera ikona gre h kateremu
// in od kod pridejo naslovi ter povezave. Besedila so v messages/<jezik>.json
// pod ključem "oNasPodatki", ker gredo v šest jezikov.
//
// Delovni čas se ne prepisuje. Tri mesta so ga prej nosila kot navadno
// besedilo — kartica "nočna postojanka" in obe kartici poslovalnic — in bi ob
// spremembi urnika ostala stara. Zdaj se izlušči iz locations.ts, iz istega
// seznama, ki ga kaže značka Odprto/Zaprto.
// ---------------------------------------------------------------------------

export interface HeroMicroItem {
  id: string;
  title: string;
  desc: string;
  iconType: "spice" | "bread" | "halal" | "pin";
}

export interface StatsBannerItem {
  value: string;
  label: string;
  subtext: string;
  iconType: "calendar" | "fire" | "award" | "people";
}

export interface PhilosophyCard {
  id: string;
  number: string;
  title: string;
  description: string;
  iconType: "halal" | "bread" | "clock" | "students";
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface LocationProfile {
  id: "trubarjeva" | "slovenska";
  name: string;
  subtitle: string;
  address: string;
  description: string;
  features: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export interface AboutContent {
  heroMicroItems: HeroMicroItem[];
  statsBannerItems: StatsBannerItem[];
  philosophyCards: PhilosophyCard[];
  processSteps: ProcessStep[];
  testimonials: TestimonialItem[];
  locationProfiles: LocationProfile[];
  tickerItems: string[];
}

/** Vsa vsebina strani O nas, v jeziku strani. */
export function useAboutContent(): AboutContent {
  const t = useTranslations("oNasPodatki");
  const prevediMnenje = useReviewText();

  const trubarjeva = locationById("trubarjeva");
  const slovenska = locationById("slovenska");
  const urnikT = hoursSummary(trubarjeva.hours);
  const urnikS = hoursSummary(slovenska.hours);
  const doplacilo = `${STUDENT_BON.surcharge.toFixed(2).replace(".", ",")} €`;

  /** Ure, ki jih besedila vstavljajo. Na enem mestu, da se ne razidejo. */
  const ure = {
    do1: urnikT.closes,
    vikend1: urnikT.weekendCloses ?? urnikT.closes,
    od2: urnikS.opens,
    do2: urnikS.closes,
  };

  return {
    heroMicroItems: [
      { id: "spices", title: t("mikro.spicesNaslov"), desc: t("mikro.spicesOpis"), iconType: "spice" },
      { id: "bread", title: t("mikro.breadNaslov"), desc: t("mikro.breadOpis"), iconType: "bread" },
      { id: "halal", title: t("mikro.halalNaslov"), desc: t("mikro.halalOpis"), iconType: "halal" },
      {
        id: "locations",
        title: t("mikro.locationsNaslov", { stevilo: LOCATIONS.length }),
        desc: t("mikro.locationsOpis", {
          prva: trubarjeva.street,
          druga: slovenska.street,
        }),
        iconType: "pin",
      },
    ],

    statsBannerItems: [
      { value: t("stat.letoVrednost"), label: t("stat.letoOznaka"), subtext: t("stat.letoPod"), iconType: "calendar" },
      { value: t("stat.tradicijaVrednost"), label: t("stat.tradicijaOznaka"), subtext: t("stat.tradicijaPod"), iconType: "fire" },
      { value: t("stat.halalVrednost"), label: t("stat.halalOznaka"), subtext: t("stat.halalPod"), iconType: "award" },
      {
        value: t("stat.lokacijeVrednost", { stevilo: LOCATIONS.length }),
        label: t("stat.lokacijeOznaka"),
        subtext: t("stat.lokacijePod"),
        iconType: "people",
      },
    ],

    philosophyCards: [
      { id: "halal", number: "01", title: t("filozofija.halalNaslov"), description: t("filozofija.halalOpis"), iconType: "halal" },
      { id: "bread", number: "02", title: t("filozofija.breadNaslov"), description: t("filozofija.breadOpis"), iconType: "bread" },
      {
        id: "hours",
        number: "03",
        title: t("filozofija.hoursNaslov"),
        description: t("filozofija.hoursOpis", { do1: ure.do1, vikend1: ure.vikend1 }),
        iconType: "clock",
      },
      { id: "students", number: "04", title: t("filozofija.studentsNaslov"), description: t("filozofija.studentsOpis"), iconType: "students" },
    ],

    processSteps: [
      { stepNumber: "01", title: t("postopek.korak1Naslov"), description: t("postopek.korak1Opis") },
      { stepNumber: "02", title: t("postopek.korak2Naslov"), description: t("postopek.korak2Opis") },
      { stepNumber: "03", title: t("postopek.korak3Naslov"), description: t("postopek.korak3Opis") },
      { stepNumber: "04", title: t("postopek.korak4Naslov"), description: t("postopek.korak4Opis") },
    ],

    // Mnenja izhajajo iz src/data/reviews.ts — samo resnične ocene z Googla.
    // Prej so bila tukaj izmišljena mnenja z naključnimi fotografijami s spleta.
    testimonials: GOOGLE_REVIEWS.map(prevediMnenje).map((r) => ({
      id: String(r.id),
      quote: r.text,
      author: r.author,
      role: [r.context, t("mnenjeVloga", { kdaj: r.when })].filter(Boolean).join(" · "),
    })),

    locationProfiles: [
      {
        id: "trubarjeva",
        name: trubarjeva.name,
        subtitle: t("poslovalnice.trubarjevaPodnaslov"),
        address: trubarjeva.fullAddress,
        description: t("poslovalnice.trubarjevaOpis"),
        features: [
          t("poslovalnice.trubarjevaLastnost1"),
          t("poslovalnice.trubarjevaLastnost2", { do1: ure.do1, vikend1: ure.vikend1 }),
          t("poslovalnice.trubarjevaLastnost3", { doplacilo }),
          t("poslovalnice.trubarjevaLastnost4"),
        ],
        googleMapsUrl: trubarjeva.googleMapsUrl,
        appleMapsUrl: trubarjeva.appleMapsUrl,
      },
      {
        id: "slovenska",
        name: slovenska.name,
        subtitle: t("poslovalnice.slovenskaPodnaslov"),
        address: slovenska.fullAddress,
        description: t("poslovalnice.slovenskaOpis"),
        features: [
          t("poslovalnice.slovenskaLastnost1"),
          t("poslovalnice.slovenskaLastnost2", { od2: ure.od2, do2: ure.do2 }),
          t("poslovalnice.slovenskaLastnost3"),
          t("poslovalnice.slovenskaLastnost4"),
        ],
        googleMapsUrl: slovenska.googleMapsUrl,
        appleMapsUrl: slovenska.appleMapsUrl,
      },
    ],

    tickerItems: [
      t("trak.t1"),
      t("trak.t2"),
      t("trak.t3"),
      t("trak.t4"),
      t("trak.t5"),
      t("trak.t6", { doplacilo }),
      t("trak.t7"),
      t("trak.t8"),
      t("trak.t9"),
    ],
  };
}
