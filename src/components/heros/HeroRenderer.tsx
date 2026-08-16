import React from "react";
import { HEROS_DATA, HeroItem } from "./HeroData";
import styles from "./Heros.module.css";

interface HeroRendererProps {
  heroId: number;
}

export default function HeroRenderer({ heroId }: HeroRendererProps) {
  const item: HeroItem = HEROS_DATA.find((h) => h.id === heroId) || HEROS_DATA[0];

  // Render specific layout styling based on Hero ID
  switch (item.id) {
    case 1:
      return (
        <section className={styles.h1_container}>
          <div className={styles.h1_grid} />
          <div className={styles.h1_hud}>
            <span style={{ color: "#00f0ff", fontSize: "0.9rem", fontWeight: 700 }}>{item.badge}</span>
            <h1 className={styles.h1_title}>{item.title}</h1>
            <p className={styles.h1_subtitle}>{item.subtitle}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              <button className={styles.h1_btn}>{item.primaryAction}</button>
              <button className={styles.h1_btn} style={{ background: "transparent", border: "1px solid #00f0ff", color: "#00f0ff" }}>
                {item.secondaryAction}
              </button>
            </div>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", borderTop: "1px solid rgba(0, 240, 255, 0.2)", paddingTop: "1.5rem" }}>
              {item.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>{m.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "#8a99ad" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 2:
      return (
        <section className={styles.h2_container}>
          <div className={styles.h2_blob1} />
          <div className={styles.h2_blob2} />
          <div className={styles.h2_card}>
            <span style={{ color: "#34d399", fontWeight: 600, letterSpacing: 1 }}>{item.badge}</span>
            <h1 className={styles.h2_title}>{item.title}</h1>
            <p style={{ color: "#94a3b8", fontSize: "1.2rem", margin: "1.5rem 0 2rem" }}>{item.subtitle}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button className={styles.h2_btn}>{item.primaryAction}</button>
              <button className={styles.h2_btn} style={{ background: "rgba(255,255,255,0.08)" }}>{item.secondaryAction}</button>
            </div>
          </div>
        </section>
      );

    case 3:
      return (
        <section className={styles.h3_container}>
          <div className={styles.h3_radar} />
          <div className={styles.h3_content}>
            <div>
              <span style={{ color: "#3b82f6", fontWeight: 700 }}>{item.badge}</span>
              <h1 className={styles.h3_title}>
                QUANTUM <span className={styles.h3_highlight}>DELIVERIES</span>
              </h1>
              <p style={{ margin: "1.5rem 0" }}>{item.subtitle}</p>
              <button className={styles.h2_btn} style={{ background: "#3b82f6" }}>{item.primaryAction}</button>
            </div>
            <div className={styles.h3_widget}>
              <h3 style={{ color: "#fff", marginBottom: "1rem" }}>🛸 Live Teleport Station</h3>
              <div style={{ background: "#090d16", padding: "1rem", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "monospace", color: "#60a5fa" }}>
                <div>STATUS: ONLINE</div>
                <div>COORDINATES: 43.8563° N, 18.4131° E</div>
                <div>ETA: 00:00:03</div>
              </div>
            </div>
          </div>
        </section>
      );

    case 4:
      return (
        <section className={styles.h4_container}>
          <div className={styles.h4_marquee}>
            <div className={styles.h4_marqueeInner}>
              SYNTH-FOOD BRUTALISM 2040 &bull; MAXIMUM FLAVOR &bull; NO COMPROMISE &bull; ULTRA SPEED &bull; SYNTH-FOOD BRUTALISM 2040 &bull; 
            </div>
          </div>
          <div className={styles.h4_main}>
            <h1 className={styles.h4_title}>{item.title}</h1>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, maxWidth: "700px", margin: "1.5rem auto 0" }}>{item.subtitle}</p>
            <button className={styles.h4_btn}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 5:
      return (
        <section className={styles.h5_container}>
          <div className={styles.h5_beam} />
          <div className={styles.h5_card}>
            <span style={{ color: "#06b6d4" }}>{item.badge}</span>
            <h1 className={styles.h5_title}>{item.title}</h1>
            <p style={{ color: "#a5f3fc", margin: "1.5rem 0" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 6:
      return (
        <section className={styles.h6_container}>
          <div className={styles.h6_bgSplit} />
          <div className={styles.h6_content}>
            <h1 className={styles.h6_title}>{item.title}</h1>
            <p style={{ fontSize: "1.3rem", maxWidth: "600px", margin: "1.5rem auto" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#fff", color: "#000", fontWeight: 900 }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 7:
      return (
        <section className={styles.h7_container}>
          <div className={styles.h7_planet} />
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "800px" }}>
            <span style={{ color: "#a5b4fc", letterSpacing: 3 }}>{item.badge}</span>
            <h1 className={styles.h7_title}>{item.title}</h1>
            <p style={{ color: "#818cf8", margin: "1.5rem 0", fontSize: "1.2rem" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#6366f1" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 8:
      return (
        <section className={styles.h8_container}>
          <div className={styles.h8_grid}>
            <div className={`${styles.h8_tile} ${styles.h8_tileMain}`}>
              <span style={{ color: "#a855f7" }}>{item.badge}</span>
              <h1 style={{ fontSize: "3rem", margin: "0.5rem 0" }}>{item.title}</h1>
              <p style={{ color: "#a1a1aa" }}>{item.subtitle}</p>
              <button className={styles.h2_btn} style={{ background: "#a855f7", marginTop: "1.5rem" }}>
                {item.primaryAction}
              </button>
            </div>
            <div className={styles.h8_tile}>
              <h3>🍱 Capsule #1</h3>
              <p style={{ fontSize: "0.9rem", color: "#a1a1aa", marginTop: "0.5rem" }}>Synthesized Teriyaki Glaze + Cyber Rice</p>
            </div>
            <div className={styles.h8_tile}>
              <h3>🍣 Capsule #2</h3>
              <p style={{ fontSize: "0.9rem", color: "#a1a1aa", marginTop: "0.5rem" }}>Bioluminescent Cyber Sushi Roll</p>
            </div>
            <div className={styles.h8_tile}>
              <h3>🍵 Capsule #3</h3>
              <p style={{ fontSize: "0.9rem", color: "#a1a1aa", marginTop: "0.5rem" }}>Matcha Energy Plasma Drink</p>
            </div>
          </div>
        </section>
      );

    case 9:
      return (
        <section className={styles.h9_container}>
          <div style={{ textAlign: "center", maxWidth: "800px" }}>
            <span style={{ color: "#64748b", textTransform: "uppercase", letterSpacing: 2, fontSize: "0.85rem" }}>{item.badge}</span>
            <h1 className={styles.h9_title}>{item.title}</h1>
            <p className={styles.h9_subtitle}>{item.subtitle}</p>
            <button className={styles.h9_btn}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 10:
      return (
        <section className={styles.h10_container}>
          <div style={{ textAlign: "center" }}>
            <h1 className={styles.h10_title}>{item.title}</h1>
            <p style={{ color: "#00f0ff", fontSize: "1.3rem", margin: "1.5rem 0" }}>{item.subtitle}</p>
            <button className={styles.h1_btn} style={{ background: "#ff007f", boxShadow: "0 0 20px #ff007f" }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 11:
      return (
        <section className={styles.h11_container}>
          <div className={styles.h11_box}>
            <span style={{ color: "#ff595e", fontWeight: 700 }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.2rem", color: "#ffca3a", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#e0aaff" }}>{item.subtitle}</p>
            <button className={styles.h4_btn} style={{ background: "#ff595e", color: "#fff", borderColor: "#ffca3a" }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 12:
      return (
        <section className={styles.h12_container}>
          <div className={styles.h12_card}>
            <span style={{ color: "#a5b4fc" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", color: "#fff", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#cbd5e1" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", marginTop: "1.5rem" }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 13:
      return (
        <section className={styles.h13_container}>
          <div className={styles.h13_sun} />
          <h1 style={{ fontSize: "4rem", fontWeight: 900 }}>{item.title}</h1>
          <p style={{ maxWidth: "600px", textAlign: "center", margin: "1rem 0" }}>{item.subtitle}</p>
          <button className={styles.h2_btn} style={{ background: "#ff0055" }}>{item.primaryAction}</button>
        </section>
      );

    case 14:
      return (
        <section className={styles.h14_container}>
          <div className={styles.h14_panel}>
            <span style={{ color: "#6fffe9" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#5bc0be" }}>{item.subtitle}</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
              <button className={styles.h2_btn} style={{ background: "#5bc0be", color: "#0b132b" }}>{item.primaryAction}</button>
              <button className={styles.h2_btn} style={{ background: "transparent", border: "1px solid #5bc0be" }}>{item.secondaryAction}</button>
            </div>
          </div>
        </section>
      );

    case 15:
      return (
        <section className={styles.h15_container}>
          <div className={styles.h15_ring}>
            <span style={{ color: "#0a9396" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.2rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#94d2bd" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#ee9b00", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 16:
      return (
        <section className={styles.h16_container}>
          <div className={styles.h16_layerCard}>
            <span style={{ color: "#fb5607" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", color: "#fff", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#d4d4d8" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#fb5607", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 17:
      return (
        <section className={styles.h17_container}>
          <div className={styles.h17_hud}>
            <span style={{ color: "#00b4d8" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#caf0f8" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#0077b6", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 18:
      return (
        <section className={styles.h18_container}>
          <div className={styles.h18_card}>
            <span style={{ color: "#d97706" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.2rem", color: "#fef3c7", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#d97706" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#b45309", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 19:
      return (
        <section className={styles.h19_container}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#a855f7" }}>{item.badge}</span>
            <h1 className={styles.h19_title}>{item.title}</h1>
            <p style={{ color: "#d8b4fe", fontSize: "1.2rem", margin: "1.5rem 0" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#8b5cf6" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 20:
      return (
        <section className={styles.h20_container}>
          <div className={styles.h20_card}>
            <span style={{ color: "#34d399" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", color: "#ecfdf5", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#a7f3d0" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#059669", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 21:
      return (
        <section className={styles.h21_container}>
          <div className={styles.h21_neon}>
            <span style={{ color: "#f43f5e" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", color: "#fff", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#fda4af" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#e11d48", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 22:
      return (
        <section className={styles.h22_container}>
          <div className={styles.h22_hud}>
            <span style={{ color: "#ca8a04" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.2rem", color: "#fef08a", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#a3e635" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#ca8a04", color: "#000", marginTop: "1.5rem", fontWeight: 800 }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 23:
      return (
        <section className={styles.h23_container}>
          <div className={styles.h23_card}>
            <span style={{ color: "#a855f7" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#94a3b8" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#6366f1", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 24:
      return (
        <section className={styles.h24_container}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#38bdf8" }}>{item.badge}</span>
            <h1 style={{ fontSize: "4rem", fontWeight: 900, margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#bae6fd", margin: "1.5rem 0" }}>{item.subtitle}</p>
            <button className={styles.h24_btn}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 25:
      return (
        <section className={styles.h25_container}>
          <div className={styles.h25_glass}>
            <span style={{ color: "#e2e8f0" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.8rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#cbd5e1" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "rgba(255,255,255,0.2)", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 26:
      return (
        <section className={styles.h26_container}>
          <div className={styles.h26_split}>
            <div className={styles.h26_box1}>
              <h2>🍔 ULTRA CYBER BURGER</h2>
              <p style={{ margin: "1rem 0" }}>1000 kcal sočnog užitka</p>
              <button className={styles.h2_btn} style={{ background: "#000" }}>Izaberi Burger</button>
            </div>
            <div className={styles.h26_box2}>
              <h2>🥗 BIO POWER BOWL</h2>
              <p style={{ margin: "1rem 0" }}>100% mikronutrijenati i proteini</p>
              <button className={styles.h2_btn} style={{ background: "#000" }}>Izaberi Bowl</button>
            </div>
          </div>
        </section>
      );

    case 27:
      return (
        <section className={styles.h27_container}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#10b981" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", margin: "1rem 0" }}>{item.title}</h1>
            <div className={styles.h27_eq}>
              <div className={styles.h27_bar} style={{ height: "40px" }} />
              <div className={styles.h27_bar} style={{ height: "70px" }} />
              <div className={styles.h27_bar} style={{ height: "90px" }} />
              <div className={styles.h27_bar} style={{ height: "50px" }} />
              <div className={styles.h27_bar} style={{ height: "80px" }} />
            </div>
            <p style={{ color: "#6ee7b7", margin: "1rem 0" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#10b981", color: "#000", fontWeight: 800 }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 28:
      return (
        <section className={styles.h28_container}>
          <div className={styles.h28_atomic}>
            <span style={{ color: "#caf0f8" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#e0f2fe" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#03045e", marginTop: "1.5rem" }}>{item.primaryAction}</button>
          </div>
        </section>
      );

    case 29:
      return (
        <section className={styles.h29_container}>
          <div className={styles.h29_lab}>
            <span style={{ color: "#bb86fc" }}>{item.badge}</span>
            <h1 style={{ fontSize: "3.5rem", margin: "1rem 0" }}>{item.title}</h1>
            <p style={{ color: "#e0e0e0" }}>{item.subtitle}</p>
            <button className={styles.h2_btn} style={{ background: "#bb86fc", color: "#000", marginTop: "1.5rem", fontWeight: 800 }}>
              {item.primaryAction}
            </button>
          </div>
        </section>
      );

    case 30:
    default:
      return (
        <section className={styles.h30_container}>
          <div className={styles.h30_editorial}>
            <span style={{ color: "#9ca3af", letterSpacing: 4, textTransform: "uppercase" }}>{item.badge}</span>
            <h1 className={styles.h30_title}>{item.title}</h1>
            <p style={{ color: "#9ca3af", fontSize: "1.3rem", margin: "2rem auto", maxWidth: "650px" }}>{item.subtitle}</p>
            <button className={styles.h30_btn}>{item.primaryAction}</button>
          </div>
        </section>
      );
  }
}
