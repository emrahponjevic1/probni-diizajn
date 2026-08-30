"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";
import styles from "./LocationPageContent.module.css";

/**
 * VGRAJENI GOOGLOV ZEMLJEVID
 *
 * Dvoje naenkrat:
 *
 * 1. HITROST — zemljevid potegne skoraj megabajt Googlovih skript. Če ga
 *    naložimo takoj, se stran vidno počasneje odpre, kar Google meri.
 *    Zato ga naložimo šele, ko se približa vidnemu polju.
 *
 * 2. PRIVOLITEV — zemljevid je tretja oseba: ob prikazu ga naloži Google,
 *    prejme naslov IP obiskovalca in nastavi svoje piškotke. Prej se je
 *    naložil takoj, brez vprašanja, čeprav ga politika piškotkov našteva
 *    med piškotki tretjih oseb. Zdaj čaka privolitev.
 *
 * KAKO SE OBNAŠA
 *   gost izbere "Sprejmi vse"   -> zemljevid se pokaže TAKOJ, brez ponovnega
 *                                  klika in brez osveževanja strani
 *   gost izbere "Samo nujni"    -> ostane ploščica z gumbom "Prikaži
 *                                  zemljevid". Klik ga naloži SAMO za ta
 *                                  obisk; izbira o piškotkih se ne spremeni
 *   gost še ni izbral           -> enako kot zgoraj
 *
 * Gumb je namenoma tu: kdor je piškotke zavrnil, mora še vedno videti, kje
 * smo. Brez njega bi bila edina pot do zemljevida sprememba odločitve o
 * piškotkih.
 */
export default function LazyMap({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const t = useTranslations("zemljevid");
  const ref = useRef<HTMLDivElement>(null);

  /** Ali je gost privolil v neobvezne piškotke. */
  const [privolil, setPrivolil] = useState(false);
  /** Ali je gost sam kliknil "Prikaži zemljevid" — velja samo za ta obisk. */
  const [rocno, setRocno] = useState(false);
  /** Ali je ploščica že blizu vidnega polja. */
  const [blizu, setBlizu] = useState(false);

  // Privolitev beremo ob prikazu in ob vsaki spremembi. Dogodek sproži
  // pasica, zato se zemljevid pojavi takoj po kliku "Sprejmi vse".
  useEffect(() => {
    const posodobi = () => setPrivolil(readConsent()?.analytics === true);
    posodobi();
    window.addEventListener(CONSENT_EVENT, posodobi);
    return () => window.removeEventListener(CONSENT_EVENT, posodobi);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Če je zemljevid že v vidnem polju (na namizju je takoj ob naslovu),
    // ne čakamo. Opazovalec je samo za primer, ko je niže.
    const vVidnemPolju = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 300 && r.bottom > -300;
    };

    if (typeof IntersectionObserver === "undefined" || vVidnemPolju()) {
      setBlizu(true);
      return;
    }

    const obs = new IntersectionObserver(
      (vnosi) => {
        if (vnosi.some((v) => v.isIntersecting)) {
          setBlizu(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Odlašanje zaradi hitrosti velja za privolitev, NE za izrecen klik: kdor
  // pritisne "Prikaži zemljevid", ga mora dobiti takoj, tudi če opazovalec
  // še ni sprožil. Sicer klik ne naredi ničesar in gost misli, da je gumb
  // pokvarjen — kar se je pokazalo pri preizkusu v oknu z višino 0.
  const nalozi = rocno || (blizu && privolil);

  return (
    <div ref={ref} className={className ?? styles.mapWrap}>
      {nalozi ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className={styles.mapConsent}>
          <span className={styles.mapSkeletonPin} />
          <p className={styles.mapConsentText}>{t("opis")}</p>
          <button
            type="button"
            onClick={() => setRocno(true)}
            className={styles.mapConsentBtn}
          >
            {t("gumb")}
          </button>
        </div>
      )}
    </div>
  );
}
