# Šeherezada Project Architecture & Design Rules

## 1. Typography Consistency (STRICT UNIVERSAL RULE)
- **Single Universal Font**: **`Plus Jakarta Sans`** (`var(--font-jakarta)` / `font-family: inherit`).
- **NO other fonts allowed** under any circumstances across any section, component, drawer, modal, or page.
- All titles, subtitles, body text, buttons, badges, cards, navigation items, prices, and food descriptions MUST inherit and use `Plus Jakarta Sans`.
- Weights used: `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold), `800` (Extra Bold), `900`/`950` (Black/Heavy).

## 2. Visual Style & Color Palette
- **Theme**: Warm Light Luxury Restaurant (Roastlux aesthetic) - *NO dark mode*.
- **Background**: `#fffcf8` / `#fffdfa` (Warm subtle glow).
- **Text Main**: `#1c1917` (Deep warm dark charcoal).
- **Text Muted**: `#57534e` / `#78716c`.
- **Brand Accents**: `#ea580c` (Rich warm orange), `#f59e0b` (Amber gold), `#ef4444` (Coral red).
- **Live Status Mint**: `#ecfdf5` background, `#a7f3d0` border, `#047857` / `#065f46` text.
- **Card Borders**: `#f2ede4` / `#fed7aa`.
- **Border Radii**: Cards (`18px` - `28px`), Buttons (`99px` / `14px`), Utility Buttons (`16px`), Squircles (`12px`).

## 3. Universal Section Margins & Padding Standards (STRICT UNIVERSAL RULE)
All sections on the website MUST adhere to these exact margin and padding values:
- **Container Max Width**: `max-width: 1360px; margin: 0 auto; width: 100%;`
- **Horizontal Section Padding**:
  - **Desktop (`> 1024px`)**: `2rem` (`32px`) on left and right (`padding: ... 2rem ...`).
  - **Tablet (`640px - 1024px`)**: `1.5rem` (`24px`) on left and right (`padding: ... 1.5rem ...`).
  - **Mobile (`<= 640px`)**: `1.25rem` (`20px`) on left and right (`padding: ... 1.25rem ...`).
- **Vertical Section Padding**:
  - **Desktop (`> 1024px`)**: `5rem` top, `5.5rem` bottom.
  - **Tablet (`640px - 1024px`)**: `4rem` top, `4.5rem` bottom.
  - **Mobile (`<= 640px`)**: `3.5rem` top, `4rem` bottom.

## 4. Food & Menu Item Presentation Rules
- **No Numerical Noise**: Do NOT display ratings (`★ 4.9`), preparation times (`⏱ 10-12 min`), calorie counts (`🔥 580 kcal`), or gram weights (`⚖️ 380 g`) on food items.
- **Clean Luxury Presentation**: Feature clean dish photography, category tag, title, description, and price.
- **Detailed Information**: Detailed ingredients and allergen warnings are accessible via the dedicated interactive Food Detail Modal popup.
