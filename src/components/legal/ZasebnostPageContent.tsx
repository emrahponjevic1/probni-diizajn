"use client";

import React from "react";
import { COMPANY } from "@/data/company";
import Link from "next/link";
import styles from "./LegalPage.module.css";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ShieldLockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <rect width="8" height="5" x="8" y="11" rx="1" />
    <path d="M10 11V9a2 2 0 0 1 4 0v2" />
  </svg>
);

const UserCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const TrashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ZasebnostPageContent() {
  return (
    <div className={styles.page}>
      <div className={styles.bgWarmGlow} />

      <div className={styles.container}>
        {/* Editorial Chapter Watermark Header */}
        <header className={styles.heroHeader}>
          <div className={styles.chapterTagContainer}>
            <span className={styles.tagGhostWatermark}>ZASEBNOST</span>
            <div className={styles.chapterIndexTag}>
              <span className={styles.chapterDash} />
              <span>VARSTVO OSEBNIH PODATKOV · GDPR & ZVOP-2</span>
              <span className={styles.chapterDash} />
            </div>
          </div>

          <h1 className={styles.pageTitle}>
            Politika varstva osebnih podatkov in zasebnosti
          </h1>

          <p className={styles.pageLead}>
            V restavraciji Šeherezada visoko cenimo vaše zaupanje. Vaše osebne
            podatke obdelujemo skladno z Uredbo (EU) 2016/679 (Splošna uredba o
            varstvu podatkov – GDPR), Zakonom o varstvu osebnih podatkov
            (ZVOP-2) in veljavno slovensko zakonodajo.
          </p>

          <div className={styles.metaUpdatedBar}>
            <span>Zadnja posodobitev: 25. avgust 2026</span>
          </div>
        </header>

        {/* 1. Upravljavec osebnih podatkov */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>1. Upravljavec osebnih podatkov</h2>
          <p className={styles.sectionText}>
            Upravljavec vaših osebnih podatkov, zbranih prek tega spletnega mesta
            ali v okviru naših gostinskih storitev, je:
          </p>

          <div className={styles.controllerCard}>
            <div>
              <h3 className={styles.controllerTitle}>{COMPANY.legalName}</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>Blagovna znamka:</strong>
                  <span>{COMPANY.brandName}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Sedež:</strong>
                  <span>{COMPANY.address}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Matična številka:</strong>
                  <span>{COMPANY.registrationNumber}</span>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Poslovalnici:</strong>
                  <span>Trubarjeva cesta 31 in Slovenska cesta 55, Ljubljana</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.controllerTitle}>Kontaktna točka za zasebnost</h3>
              <ul className={styles.controllerMetaList}>
                <li className={styles.controllerMetaItem}>
                  <strong>E-pošta:</strong>
                  <a
                    href={`mailto:${COMPANY.privacyEmail}`}
                    className={styles.controllerLink}
                  >
                    {COMPANY.privacyEmail}
                  </a>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Telefon:</strong>
                  <a href="tel:+38669314316" className={styles.controllerLink}>
                    +386 69 314 316
                  </a>
                </li>
                <li className={styles.controllerMetaItem}>
                  <strong>Vprašanja o zasebnosti:</strong>
                  <span>naslovite na zgornji e-naslov ali telefon</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Katere podatke zbiramo in zakaj */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>2. Katere osebne podatke zbiramo in nameni obdelave</h2>
          <p className={styles.sectionText}>
            Osebne podatke zbiramo in obdelujemo izključno v obsegu, ki je nujno
            potreben za izpolnitev posameznega namena:
          </p>

          <div className={styles.bentoGrid2}>
            {/* Box 1 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <FileTextIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Kontaktni obrazec in povpraševanja</h3>
              <p className={styles.bentoCardText}>
                Kadar nam pošljete sporočilo prek spletnega obrazca, zbiramo vaše
                ime, e-poštni naslov, telefonsko številko in vsebino sporočila.
                Podatke uporabljamo izključno za pripravo odgovora ali potrditev
                vašega povpraševanja.
              </p>
            </div>

            {/* Box 2 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <UserCheckIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Prijave na prosta delovna mesta</h3>
              <p className={styles.bentoCardText}>
                Ob prijavi na zaposlitev obdelujemo vaše kontaktne podatke, življenjepis
                in delovne izkušnje. Te podatke hranimo izključno za čas trajanja
                izbirnega postopka oziroma z vašim soglasjem za prihodnje priložnosti.
              </p>
            </div>

            {/* Box 3 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <ShieldLockIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Tehnični dnevniki strežnika</h3>
              <p className={styles.bentoCardText}>
                Ob obisku spletnega mesta spletni strežnik samodejno beleži tehnične
                podatke (IP naslov, tip brskalnika, datum in čas dostopa). Ti podatki
                služijo zagotavljanju varnosti in nemotenega delovanja omrežja.
              </p>
            </div>

            {/* Box 4 */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIconWrapper}>
                <TrashIcon />
              </div>
              <h3 className={styles.bentoCardTitle}>Študentska prehrana (Boni)</h3>
              <p className={styles.bentoCardText}>
                Pri unovčevanju študentskih bonov se postopek validacije izvede
                prek uradnega državnega terminala ŠOS. Šeherezada ne shranjuje vaših
                osebnih študentskih podatkov v lastnih bazah.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Pravne podlage za obdelavo */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>3. Pravne podlage za obdelavo podatkov</h2>
          <p className={styles.sectionText}>
            Vaše osebne podatke obdelujemo na podlagi naslednjih pravnih temeljev
            iz 6. člena GDPR:
          </p>
          <div className={styles.highlightBox}>
            <p className={styles.sectionText} style={{ marginBottom: "0.6rem" }}>
              • <strong>Izvajanje pogodbe ali predpogodbenih ukrepov (člen 6(1)(b) GDPR):</strong> Obdelava naročil hrane, rezervacij in odgovorov na povpraševanja.
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.6rem" }}>
              • <strong>Izrecna privolitev (člen 6(1)(a) GDPR):</strong> Za neobvezne piškotke in za hranjenje življenjepisa za prihodnja delovna mesta. Novic po e-pošti ne pošiljamo.
            </p>
            <p className={styles.sectionText} style={{ marginBottom: 0 }}>
              • <strong>Zakoniti interesi (člen 6(1)(f) GDPR):</strong> Za zagotavljanje varnosti IT sistemov, preprečevanje zlorab in optimizacijo delovanja spletne strani.
            </p>
          </div>
        </section>

        {/* 4. Vaše pravice po GDPR */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>4. Vaše pravice glede osebnih podatkov</h2>
          <p className={styles.sectionText}>
            V skladu s Splošno uredbo GDPR imate kadarkoli naslednje pravice:
          </p>

          <div className={styles.bentoGrid3}>
            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Pravica do dostopa</h4>
              <p className={styles.bentoCardText}>
                Pravico imate dobiti potrditev, ali obdelujemo vaše podatke, in
                zahtevati brezplačen vpogled v njih.
              </p>
            </div>

            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Pravica do popravka</h4>
              <p className={styles.bentoCardText}>
                Zahtevate lahko takojšen popravek netočnih ali dopolnitev nepopolnih
                osebnih podatkov.
              </p>
            </div>

            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Pravica do izbrisa</h4>
              <p className={styles.bentoCardText}>
                Zahtevate lahko izbris svojih podatkov (&quot;pravica do pozabe&quot;),
                če ni več zakonskega razloga za njihovo hrambo.
              </p>
            </div>

            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Omejitev obdelave</h4>
              <p className={styles.bentoCardText}>
                Pravico imate zahtevati začasno omejitev obdelave vaših podatkov
                v primeru ugovora ali preverjanja točnosti.
              </p>
            </div>

            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Prenosljivost podatkov</h4>
              <p className={styles.bentoCardText}>
                Podatke, ki ste nam jih posredovali, lahko prejmete v strukturirani,
                splošno uporabljani in strojno berljivi obliki.
              </p>
            </div>

            <div className={styles.bentoCard}>
              <h4 className={styles.bentoCardTitle}>Pravica do ugovora</h4>
              <p className={styles.bentoCardText}>
                Kadarkoli lahko ugovarjate obdelavi, ki temelji na zakonitem interesu,
                ali prekličete dano privolitev.
              </p>
            </div>
          </div>

          <p className={styles.sectionText}>
            Vse zgoraj navedene pravice lahko uveljavljate z enostavnim pisnim
            sporočilom na naslov <strong>info@seherezada.net</strong>. Na vašo zahtevo
            bomo odgovorili brez nepotrebnega odlašanja, najkasneje pa v 30 dneh.
          </p>
        </section>

        {/* 5. Varnost podatkov in čas hrambe */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>5. Varnost podatkov in čas hrambe</h2>
          <p className={styles.sectionText}>
            Za varovanje vaših podatkov uporabljamo napredne tehnične in organizacijske
            ukrepe, vključno s šifriranjem povezav (SSL/TLS certifikat), varnimi
            strežniškimi protokoli in omejenim dostopom pooblaščenih oseb.
          </p>
          <p className={styles.sectionText}>
            Podatke hranimo le toliko časa, kolikor je potrebno za dosego namena,
            zaradi katerega so bili zbrani, oziroma do preklica vaše privolitve ali
            izteka zakonsko določenih rokov za hrambo poslovne dokumentacije.
          </p>
        </section>

        {/* 6. Pritožba pri nadzornem organu */}
        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>6. Nadzorni organ v Republiki Sloveniji</h2>
          <p className={styles.sectionText}>
            Če menite, da obdelava vaših osebnih podatkov krši veljavno zakonodajo,
            imate pravico vložiti pritožbo pri pristojnem nadzornem organu:
          </p>

          <div className={styles.highlightBoxOrange}>
            <h3 className={styles.highlightTitle}>
              <span>Informacijski pooblaščenec Republike Slovenije</span>
            </h3>
            <p className={styles.sectionText} style={{ marginBottom: "0.4rem" }}>
              Naslov: Dunajska cesta 22, 1000 Ljubljana
            </p>
            <p className={styles.sectionText} style={{ marginBottom: "0.4rem" }}>
              E-pošta: gp.ip@ip-rs.si | Telefon: +386 1 230 97 30
            </p>
            <p className={styles.sectionText} style={{ marginBottom: 0 }}>
              Spletna stran:{" "}
              <a
                href="https://www.ip-rs.si"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.controllerLink}
              >
                www.ip-rs.si
              </a>
            </p>
          </div>
        </section>

        {/* Bottom Legal Navigation Bar */}
        <div className={styles.legalNavRow}>
          <Link href="/piskotki" className={styles.legalNavBtnPrimary}>
            <span>Preberi Politiko piškotkov</span>
            <ArrowRightIcon />
          </Link>
          <Link href="/meni" className={styles.legalNavBtn}>
            <span>Nazaj na Meni</span>
          </Link>
          <Link href="/kontakt" className={styles.legalNavBtn}>
            <span>Kontakt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
