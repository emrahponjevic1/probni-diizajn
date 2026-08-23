<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Šeherezada Project Architecture & Design Rules

## 1. Typography Consistency (STRICT UNIVERSAL RULE)
- **Single Universal Font**: **`Plus Jakarta Sans`** (`var(--font-jakarta)` / `font-family: inherit`).
- **NO other fonts allowed** under any circumstances across any section, component, drawer, modal, or page.
- All titles, subtitles, body text, buttons, badges, cards, navigation items, prices, and food descriptions MUST inherit and use `Plus Jakarta Sans`.

## 2. Visual Style & Color Palette
- **Theme**: Warm Light Luxury Restaurant (Roastlux aesthetic) - *NO dark mode*.
- **Background**: `#fffcf8` / `#fffdfa` (Warm subtle glow).
- **Text Main**: `#1c1917` (Deep warm dark charcoal).
- **Text Muted**: `#57534e` / `#78716c`.
- **Brand Accents**: `#ea580c` (Rich warm orange), `#f59e0b` (Amber gold), `#ef4444` (Coral red).
- **Live Status Mint**: `#ecfdf5` background, `#a7f3d0` border, `#047857` / `#065f46` text.
- **Card Borders**: `#f2ede4` / `#fed7aa`.

## 3. Universal Section Margins & Padding Standards (STRICT UNIVERSAL RULE)
All sections on the website MUST adhere to this exact two-tier architecture:
- **Outer Element — Section (`width: 100%`)**:
  - `width: 100%; box-sizing: border-box; position: relative;`
  - **Horizontal Section Padding** (Applied on Section):
    - **Desktop (`> 1024px`)**: `2rem` (`32px`) left and right.
    - **Tablet (`640px - 1024px`)**: `1.5rem` (`24px`) left and right.
    - **Mobile (`<= 640px`)**: `1.25rem` (`20px`) left and right.
  - **Vertical Section Padding & Island Navbar Clearance**:
    - **Top-Level / First Subpage Section (under Floating Island Navbar)**:
      - **Desktop (`> 1024px`)**: `8.75rem` top, `5.5rem` bottom (`padding: 8.75rem 2rem 5.5rem;`).
      - **Tablet (`640px - 1024px`)**: `7.25rem` top, `4.5rem` bottom (`padding: 7.25rem 1.5rem 4.5rem;`).
      - **Mobile (`<= 640px`)**: `6.25rem` top, `4rem` bottom (`padding: 6.25rem 1.25rem 4rem;`).
    - **Subsequent Body Sections**:
      - **Desktop (`> 1024px`)**: `5rem` top, `5.5rem` bottom (`padding: 5rem 2rem 5.5rem;`).
      - **Tablet (`640px - 1024px`)**: `4rem` top, `4.5rem` bottom (`padding: 4rem 1.5rem 4.5rem;`).
      - **Mobile (`<= 640px`)**: `3.5rem` top, `4rem` bottom (`padding: 3.5rem 1.25rem 4rem;`).
- **Inner Element — Container (`max-width: 1360px`)**:
  - `max-width: 1360px; margin: 0 auto; width: 100%; box-sizing: border-box;`
  - (Never place content directly outside the container; padding is handled on the section).

## 4. Food & Menu Item Presentation Rules
- **No Numerical Noise**: Do NOT display ratings (`★ 4.9`), preparation times (`⏱ 10-12 min`), calorie counts (`🔥 580 kcal`), or gram weights (`⚖️ 380 g`) on food items.
- **Clean Luxury Presentation**: Feature clean dish photography, category tag, title, description, and price.
- **Detailed Information**: Detailed ingredients and allergen warnings are accessible via the dedicated interactive Food Detail Modal popup.

## 5. Universal Section Header & Typography Architecture (STRICT UNIVERSAL RULE)
- **STRICT PROHIBITION**: Generic rounded pill badges (`border-radius: 9999px` with emoji/sparkle icons like `✦ Sveže`, `❓ Center Pomoči`) and artificial split-colored titles (e.g. `Frequently Asked <span class="orange">Questions</span>` or `Vizualna <span class="orange">Zgodba</span>`) are STRICTLY FORBIDDEN.
- **MANDATORY EDITORIAL STANDARD**: Every section header across all pages MUST use the editorial chapter watermark architecture established in *Priljubljene izbire*:
  - **`chapterTagContainer`**: Relative container holding the watermark and the tag.
  - **`tagGhostWatermark`**: Large subtle uppercase watermark text directly behind the tag (`font-size: 3.2rem - 3.5rem; font-weight: 950; color: #1c1917; opacity: 0.055; letter-spacing: 0.06em; text-transform: uppercase; user-select: none; pointer-events: none; line-height: 1;`).
  - **`chapterIndexTag`**: Uppercase letter-spaced tag (`font-size: 0.82rem - 0.85rem; font-weight: 800; color: #ea580c; letter-spacing: 0.14em;`) flanked by horizontal dash lines (`chapterDash`: `width: 18px; height: 1.5px; background: #ea580c; opacity: 0.6;`).
  - **`sectionTitle` / `heroTitle`**: Clean, solid luxury charcoal title (`#1c1917`, `font-weight: 950`, `letter-spacing: -0.03em`, `line-height: 1.1`).
  - **`sectionSubtitle` / `heroSubtitle`**: Elegant muted subtitle (`#57534e`, `font-size: 1.05rem - 1.1rem`, `line-height: 1.6`).

