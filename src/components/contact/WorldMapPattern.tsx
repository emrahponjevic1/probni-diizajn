import React from "react";

export default function WorldMapPattern({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "120%",
        maxWidth: "1400px",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.12,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 500"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", color: "#ea580c" }}
      >
        {/* Simplified aesthetic world map polygons / continents */}
        {/* North America */}
        <path d="M120 70 Q160 50 210 60 Q260 70 270 90 Q290 120 280 150 Q260 180 230 190 Q210 220 180 230 Q160 210 140 180 Q110 150 100 110 Z" />
        <path d="M210 190 Q230 220 220 250 Q200 270 180 260 Q170 230 190 200 Z" />
        <path d="M80 70 Q110 50 130 70 Q120 90 90 90 Z" />
        <path d="M280 40 Q330 30 350 60 Q330 90 290 70 Z" />

        {/* South America */}
        <path d="M250 270 Q300 280 320 310 Q340 350 320 400 Q300 450 270 470 Q250 440 240 380 Q230 330 240 290 Z" />

        {/* Europe */}
        <path d="M460 70 Q510 60 530 90 Q540 120 510 140 Q470 150 450 130 Q440 100 460 70 Z" />
        <path d="M430 90 Q450 80 450 110 Q430 120 420 100 Z" />
        <path d="M490 50 Q520 40 530 60 Q500 70 480 60 Z" />

        {/* Africa */}
        <path d="M460 160 Q520 160 550 190 Q580 240 560 300 Q540 360 500 390 Q460 370 440 300 Q430 240 450 180 Z" />
        <path d="M570 320 Q590 320 590 350 Q570 370 560 350 Z" />

        {/* Asia */}
        <path d="M540 70 Q620 50 720 60 Q820 80 850 120 Q880 180 840 230 Q780 250 720 220 Q680 240 640 250 Q600 220 580 180 Q560 140 540 70 Z" />
        <path d="M680 260 Q730 250 750 280 Q730 310 690 300 Z" />
        <path d="M780 250 Q830 250 840 290 Q810 320 770 290 Z" />
        <path d="M850 160 Q880 160 880 200 Q850 210 840 180 Z" />

        {/* Australia & Oceania */}
        <path d="M780 340 Q850 330 880 360 Q890 410 850 430 Q800 440 770 400 Q760 360 780 340 Z" />
        <path d="M890 430 Q910 420 920 440 Q900 460 880 450 Z" />

        {/* Dot Matrix Highlights across Ljubljana / Europe coordinates */}
        <circle cx="495" cy="115" r="5" fill="#ea580c" opacity="0.9" />
        <circle cx="495" cy="115" r="12" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Network Connection Lines & Subtle Nodes */}
        <line x1="495" y1="115" x2="220" y2="150" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,4" opacity="0.4" />
        <line x1="495" y1="115" x2="720" y2="180" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,4" opacity="0.4" />
        <line x1="495" y1="115" x2="500" y2="280" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,4" opacity="0.4" />
        <line x1="720" y1="180" x2="820" y2="380" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,4" opacity="0.3" />

        <circle cx="220" cy="150" r="3" fill="#ea580c" opacity="0.5" />
        <circle cx="720" cy="180" r="3" fill="#ea580c" opacity="0.5" />
        <circle cx="500" cy="280" r="3" fill="#ea580c" opacity="0.5" />
        <circle cx="820" cy="380" r="3" fill="#ea580c" opacity="0.5" />
      </svg>
    </div>
  );
}
