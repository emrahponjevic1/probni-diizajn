"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LocationPageContent.module.css";

/**
 * Googlov vgrajeni zemljevid potegne skoraj megabajt skript. Če ga naložimo
 * takoj, stran vidno počasneje odpre — kar Google meri in upošteva pri
 * uvrstitvi. Zato ga naložimo šele, ko se približa vidnemu polju.
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
  const ref = useRef<HTMLDivElement>(null);
  const [nalozi, setNalozi] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Če je zemljevid že v vidnem polju (na namizju je takoj ob naslovu),
    // ga naložimo brez čakanja. Opazovalec je samo za primer, ko je niže.
    const vVidnemPolju = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 300 && r.bottom > -300;
    };

    if (typeof IntersectionObserver === "undefined" || vVidnemPolju()) {
      setNalozi(true);
      return;
    }

    const obs = new IntersectionObserver(
      (vnosi) => {
        if (vnosi.some((v) => v.isIntersecting)) {
          setNalozi(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
        <div className={styles.mapSkeleton} aria-hidden="true">
          <span className={styles.mapSkeletonPin} />
        </div>
      )}
    </div>
  );
}
