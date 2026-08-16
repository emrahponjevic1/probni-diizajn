"use client";

import React, { useState, useEffect } from "react";
import { HEROS_DATA } from "./heros/HeroData";

interface HeroSwitcherProps {
  currentHeroId: number;
  onSelectHero: (id: number) => void;
}

export default function HeroSwitcher({ currentHeroId, onSelectHero }: HeroSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Svi");
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      onSelectHero(currentHeroId >= 30 ? 1 : currentHeroId + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentHeroId, onSelectHero]);

  const categories = ["Svi", "Cyberpunk", "Organic", "Quantum", "Brutalism", "Hologram", "Kinetic", "Minimal", "Retro", "AI Custom"];

  const filteredHeros = selectedCategory === "Svi" 
    ? HEROS_DATA 
    : HEROS_DATA.filter(h => h.category === selectedCategory);

  const currentHero = HEROS_DATA.find(h => h.id === currentHeroId) || HEROS_DATA[0];

  return (
    <>
      {/* Top Floating Cyber HUD Bar */}
      <div style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 20px",
        background: "rgba(10, 15, 30, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 240, 255, 0.3)",
        borderRadius: "99px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.15)",
        color: "#fff",
        fontSize: "0.9rem",
        fontFamily: "system-ui, sans-serif"
      }}>
        {/* Status Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#00f0ff",
            boxShadow: "0 0 10px #00f0ff"
          }} />
          <span style={{ fontWeight: 700, color: "#00f0ff" }}>CYBER-HUD 2040</span>
        </div>

        <div style={{ width: "1px", height: "16px", background: "rgba(255, 255, 255, 0.2)" }} />

        {/* Hero Navigation Controls */}
        <button
          onClick={() => onSelectHero(currentHeroId <= 1 ? 30 : currentHeroId - 1)}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "99px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "all 0.2s"
          }}
        >
          ◀ Prethodni
        </button>

        <span style={{ fontWeight: 800, minWidth: "90px", textAlign: "center", color: "#a5b4fc" }}>
          Hero {currentHeroId} / 30
        </span>

        <button
          onClick={() => onSelectHero(currentHeroId >= 30 ? 1 : currentHeroId + 1)}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "99px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "all 0.2s"
          }}
        >
          Sljedeći ▶
        </button>

        <div style={{ width: "1px", height: "16px", background: "rgba(255, 255, 255, 0.2)" }} />

        {/* Auto Play Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          style={{
            background: isAutoPlay ? "#ff0055" : "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "99px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.85rem"
          }}
        >
          {isAutoPlay ? "⏸ Auto (On)" : "▶ Auto (Off)"}
        </button>

        {/* Open Drawer Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            border: "none",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "99px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.85rem",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)"
          }}
        >
          {isOpen ? "Zatvori Meni ✕" : "Svi Layouti ☰"}
        </button>
      </div>

      {/* Full Modal Drawer for All 30 Heros */}
      {isOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(5, 7, 15, 0.95)",
          backdropFilter: "blur(25px)",
          padding: "90px 2rem 2rem",
          overflowY: "auto",
          color: "#fff",
          fontFamily: "system-ui, sans-serif"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>Kolekcija 30 Futuruističkih Hero Sekcija</h2>
                <p style={{ color: "#94a3b8" }}>Izaberite bilo koji od 30 Awwwards-grade layouta za brzu hranu budućnosti (2030-2040)</p>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "99px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: selectedCategory === cat ? "#6366f1" : "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Hero Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.2rem"
            }}>
              {filteredHeros.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    onSelectHero(h.id);
                    setIsOpen(false);
                  }}
                  style={{
                    background: currentHeroId === h.id ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.04)",
                    border: currentHeroId === h.id ? "2px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "1.2rem",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    boxShadow: currentHeroId === h.id ? "0 0 25px rgba(99, 102, 241, 0.3)" : "none"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6366f1" }}>HERO #{h.id}</span>
                    <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "99px" }}>{h.category}</span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{h.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#94a3b8", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {h.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
