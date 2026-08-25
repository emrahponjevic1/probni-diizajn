// ---------------------------------------------------------------------------
// HALAL — EDINI VIR PODATKOV
//
// Tu sta dva ločena sklopa in ju ne smemo mešati:
//
//   NAS_CERTIFIKAT  — kaj velja za Šeherezado
//   ZAVOD_HALAL     — kdo v Sloveniji certifikate izdaja
//
// PRAVILO
// O certifikatu ne zapiši ničesar, česar nimaš na papirju. Izdajatelj,
// številka in datum veljavnosti so trditve o dokumentu — če jih ni v roki,
// naj polje ostane prazno. Stran prazna polja preprosto izpusti; nič ni
// pokvarjeno, samo manj piše.
//
// KO DOBIŠ DOKUMENT V ROKE
//   1. fotografiraj ga in datoteko daj v public/images/
//   2. spodaj vpiši pot pod `photo`
//   3. prepiši `issuer`, `certNumber` in `validUntil` točno tako, kot piše
//      na dokumentu — brez zaokroževanja in brez ugibanja
// ---------------------------------------------------------------------------

/**
 * HALAL OZNAKA — okrasna, ne dokument.
 *
 * To je grafika, ne certifikat. Zato alt ne sme trditi, da gre za uradni
 * dokument Šeherezade — to bi bilo zavajajoče. Pravi certifikat ima svoje
 * mesto spodaj, pod `NAS_CERTIFIKAT.photo`.
 */
export const HALAL_OZNAKA = {
  src: "/images/seherezada-halal-logo.avif",
  alt: "Halal oznaka — hrana brez svinjine in alkohola",
  width: 690,
  height: 690,
} as const;

export const NAS_CERTIFIKAT = {
  /** Ali ima lokal halal certifikat. Potrdil lastnik. */
  certified: true,

  /**
   * Kdo je certifikat izdal, npr. "Zavod Halal".
   * Prazno = stran o izdajatelju ne trdi ničesar.
   */
  issuer: "",

  /** Številka certifikata, prepisana z dokumenta. */
  certNumber: "",

  /** Datum veljavnosti z dokumenta, npr. "31. 12. 2026". */
  validUntil: "",

  /**
   * Fotografija dokumenta.
   * Dokler je `src` prazen, stran pokaže ograjo namesto slike.
   * Alt naj opiše, kaj je na sliki — to bere Google in bralnik zaslona.
   */
  photo: { src: "", alt: "Halal certifikat Šeherezada, Ljubljana" },
} as const;

/**
 * Uradni izdajatelj halal certifikatov v Sloveniji.
 * Podatki z uradne strani, preverjeno ob datumu spodaj.
 */
export const ZAVOD_HALAL = {
  name: "Zavod Halal",
  url: "https://halal-slovenia.si",
  address: "Grablovičeva ulica 14, Ljubljana",
  /** Pod okriljem katere ustanove deluje. */
  underAuspicesOf: "Islamska skupnost v Republiki Sloveniji",
  /** Akreditacijski standard, kot ga navaja sam zavod. */
  accreditation: "UAE.S GSO 2055-2:2021 (EIAC HBN-CB-054)",
  checkedOn: "25. 8. 2026",
} as const;

/** Postopek certificiranja, kot ga opisuje Zavod Halal. */
export const POSTOPEK = [
  {
    title: "Prijava in pregled dokumentacije",
    text: "Pregled vseh surovin, dodatkov in dobaviteljev — od kod pride vsaka sestavina.",
  },
  {
    title: "Inšpekcijski pregled",
    text: "Ogled celotnega postopka priprave in higienskih razmer v kuhinji.",
  },
  {
    title: "Usposabljanje osebja",
    text: "Zaposleni se naučijo ravnanja, ki prepreči navzkrižno onesnaženje z neustreznimi živili.",
  },
  {
    title: "Izdaja in obnova",
    text: "Certifikat se izda za določen čas, sledijo pa mu redne in nenapovedane kontrole.",
  },
] as const;
