---
version: 1.1
name: FocusMode — Ential Liquid Glass
description: Curated focus-music app on the Ential v4 Liquid Glass system. Fog canvas (ink in dark mode), frosted glass surfaces, one ember accent, molten-ember mode iconography, monospace timer. Depth does the work decoration used to do.
---

# FocusMode Design System v1.1 — Ential Liquid Glass

FocusMode follows the Ential "Liquid Glass" design language (inherits
`../Website/design.md`, Ential Design System v4.0), adapted for a full-screen
focus app with a light/dark theme and a timer as the hero element. Where this
document is silent, defer to the Website `design.md`.

## 1. Tokens

Core hues — no new hues, ever:

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#000000` | Dark-mode canvas, body text on light |
| `--paper` | `#FFFFFF` | Glass tint base, text on ink |
| `--stone` | `#D9D9D9` | Secondary text on ink only |
| `--ember` | `#F74603` | Sole accent — play state, active toggles, links, streaks (ration it) |
| `--signal` | `#DD0200` | Live/now dots ONLY |
| `--cherry` | `#55100D` | Ember hover state, headline gradient end |
| `--fog` | `#F4F4F6` | Light-mode canvas (never pure white) |

Derived glass tokens:

| Token | Value |
|---|---|
| `--glass` | `rgba(255,255,255,.72)` + `backdrop-filter: blur(24px)` |
| `--glass-border` | `rgba(0,0,0,.06)` |
| `--glass-highlight` | `inset 0 1px 0 rgba(255,255,255,.95)` |
| `--glass-shadow` | `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06), 0 24px 64px rgba(0,0,0,.07)` |
| `--glass-shadow-hover` | `0 2px 4px rgba(0,0,0,.05), 0 16px 40px rgba(0,0,0,.09), 0 40px 96px rgba(0,0,0,.1)` |

Ember glow shadows always use `rgba(247,70,3,…)` — e.g. buttons
`shadow-[0_8px_28px_rgba(247,70,3,.35)]`, molten icons
`drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)]`.

Molten text gradient (hero headlines only):
`linear-gradient(180deg, #ff9d5e 0%, #f74603 58%, #d63c05 100%)`.

FocusMode is a CSS-variable app: components consume app-level variables
(`--bg-primary`, `--text-primary`, `--accent`, …) that re-point per theme —
see the theme mapping table in §11.

## 2. Materials

1. **Light glass on fog** — cards, modals, toolbar buttons. Hover = lift
   (`translateY(-4px)` + deeper shadow), never a border-colour change.
2. **Dark glass** — the same components in dark mode
   (`rgba(255,255,255,.07)`, `blur(24px)`, border `rgba(255,255,255,.09)`,
   `inset 0 1px 0 rgba(255,255,255,.10)` lit edge).
3. **Liquid metal** — animated conic sheen border (`.liquid-metal`). Two
   sanctioned uses in this app, no more: the play-button ring while a session
   is running, and the shared Ential footer capsule (§6).
4. **Ambient blobs** — 1–2 large blurred ember/ink radial blobs behind the
   canvas at ≤7% opacity (`filter: blur(90px)`).
**Dark register (identical across the four Ential tools):** canvas `#0A0A0B` (never pure
black) · chrome — header + sidebar/rails share ONE material — `rgba(255,255,255,.045)` +
`blur(20px) saturate(1.4)`, border `rgba(255,255,255,.08)` · cards `rgba(255,255,255,.07)`,
border `rgba(255,255,255,.09)`, lit edge `inset 0 1px 0 rgba(255,255,255,.10)` · opaque
overlays `#151517` · ambient ember blobs boosted to `.10`/`.06` so the black has warmth.


Solid overlay surfaces: dropdowns, sheets and modals are NOT glass — they use
`.surface-panel` (opaque `--surface-solid` + border + shadow).

## 3. Typography

| Use | Font | Notes |
|---|---|---|
| Headings, mode names, display | **Funnel Display** (`font-display`) | weight 600, `tracking-[-0.02em]`; display sizes `-0.025em`. No periods on display headlines. Title Case. |
| Body / UI | **Inter** (`font-sans`) | body `leading-relaxed`, `tracking-[-0.01em]` |
| Timer, stats, durations | **JetBrains Mono** (`font-mono`) | FocusMode-specific extension — all time displays are monospace |

Micro-labels: Inter semibold uppercase `tracking-[0.04em]`–`[0.14em]`,
`text-black/45–55` on fog, `text-white/45` on ink.
Buttons: sentence case, weight 500, never uppercase.

Loaded from Google Fonts:
`Funnel Display:wght@300..800`, `Inter` variable, `JetBrains Mono:wght@400;500;700`.

## 4. Accent rationing

- Ember-filled control: effectively one per screen (the active play button).
- Active/selected states use ember; everything idle is glass.
- Body text is never ember. Signal red is live dots only.

## 5. Radius

| Element | Radius |
|---|---|
| Buttons, pills, play control | `rounded-full` |
| Glass cards | `rounded-[1.25rem]` (up to `2rem` by prominence) |
| Modals | `rounded-3xl` |
| Mode tiles / app-icon tiles | `rounded-2xl` |

## 6. Shared app chrome

This section is the canonical Ential shared chrome, identical word-for-word across the four
Ential free tools: **Invoicify**, **Conversio**, **FocusMode**, **Don't Be Late**. Markup is
byte-identical across apps wherever the app's token system allows (apps using CSS variables
map colors to their vars but keep geometry, radius, sizes, and the ember focus ring identical).

Per-app identity table:

| App | Wordmark (ember suffix) | Lucide glyph |
|---|---|---|
| Invoicify | `Invoic` + `<span class="text-ember">ify</span>` | `FileText` |
| Conversio | `Conver` + `<span class="text-ember">sio</span>` | `ArrowLeftRight` |
| FocusMode | `Focus` + `<span class="text-ember">Mode</span>` | `Headphones` |
| Don't Be Late | `Don't Be ` + `<span class="text-ember">Late</span>` | `AlarmClock` |

### 6.1 Header (shared)

Sticky glass bar, h-16. Left cluster: ember-tile logo + wordmark. Right cluster: icon
buttons. Container width strategy may stay per-app, but the two clusters are identical:

```tsx
<div className="flex items-center gap-3">
  <div className="ember-tile w-9 h-9 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
    <AppGlyph className="w-5 h-5 text-white" />
  </div>
  <h1 className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink dark:text-paper">
    App<span className="text-ember">Name</span>
  </h1>
</div>
```

The **ember-tile is the app mark everywhere** — no 3D molten render in the header (renders
remain for in-app iconography and og-images).

Canonical `.ember-tile` CSS:

```css
.ember-tile {
  background:
    radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 42%),
    linear-gradient(160deg, #ff9d5e 0%, #f74603 55%, #d63c05 100%);
  box-shadow:
    0 8px 20px rgba(247, 70, 3, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

### 6.2 Icon buttons — theme toggle & profile (shared)

```tsx
<button
  onClick={toggleTheme}
  title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
  aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
  className="p-2 rounded-full text-black/50 hover:text-ink hover:bg-black/5 dark:text-white/50 dark:hover:text-paper dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40"
>
  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
</button>
```

- Convention: the icon shows the mode you'll switch TO (Moon in light, Sun in dark).
- Profile button (FocusMode): identical classes, `<UserCircle className="w-4 h-4" />`,
  `aria-label="Open profile"`.
- CSS-var apps (FocusMode): keep geometry + `focus-visible:ring-2 ring-[#F74603]/40`,
  map colors to their vars.
- The blue default browser focus ring must never appear — the ember focus-visible ring
  replaces it on all interactive chrome.

### 6.3 Footer — Ential credit capsule (shared, exact)

```tsx
{/* Ential credit — shared liquid-metal capsule, identical across all Ential free tools */}
<footer className="relative z-10 mt-auto py-6 flex justify-center print:hidden">
  <div className="liquid-metal">
    <a
      href="https://ential.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-full bg-[#0c0c0d] px-5 py-2.5 text-xs font-medium text-stone hover:text-paper transition-colors"
    >
      ❤️ Made with Love + Code by <span className="text-ember">Ential</span>
    </a>
  </div>
</footer>
```

- The ❤️ leads the string. "Ential" is ember.
- In-flow at the bottom of the page — no black band, no fixed pinning.
- The `.liquid-metal` treatment is **one use only** — the Ential credit capsule. Nothing
  else in the app may use it.
- If the app has no `text-stone` token, use `text-[#D9D9D9]`.

```css
@property --lm-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.liquid-metal {
  position: relative;
  border-radius: 9999px;
  padding: 2px;
  background: conic-gradient(
    from var(--lm-angle),
    #232326 0%,
    #d9d9d9 10%,
    #5a5a5f 20%,
    #f74603 33%,
    #8a3015 42%,
    #232326 52%,
    #cfcfd4 66%,
    #45454a 78%,
    #f74603 90%,
    #232326 100%
  );
  animation: lm-spin 7s linear infinite;
  box-shadow:
    0 0 24px rgba(247, 70, 3, 0.18),
    0 0 60px rgba(255, 255, 255, 0.05);
}
@keyframes lm-spin {
  to { --lm-angle: 360deg; }
}
@media (prefers-reduced-motion: reduce) {
  .liquid-metal { animation: none; }
}
```

### 6.4 Favicon + app icon family (shared pipeline)

Source of truth: `public/favicon.svg` — 64 viewBox, 22% radius tile (rx=14), molten ember
gradient, radial gloss, white Lucide glyph stroke-2:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="ember" x1="0" y1="0" x2="0.34" y2="0.94">
      <stop offset="0" stop-color="#ff9d5e"/>
      <stop offset="0.55" stop-color="#f74603"/>
      <stop offset="1" stop-color="#d63c05"/>
    </linearGradient>
    <radialGradient id="gloss" cx="0.3" cy="0.22" r="0.5">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#ember)"/>
  <rect width="64" height="64" rx="14" fill="url(#gloss)"/>
  <g transform="translate(9.4,9.4) scale(1.88)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- 24×24 Lucide glyph paths for this app -->
  </g>
</svg>
```

Generated set per app (in `public/`):
1. `favicon.svg` — as above.
2. `favicon-32.png`, `favicon-16.png` — render SVG at 512 via qlmanage, downscale.
3. `favicon.ico` — from the 16 + 32 PNGs.
4. `icon-192.png`, `icon-512.png` — rounded tile with alpha.
5. `apple-touch-icon.png` — 180×180, **full-square (rx=0), NO alpha channel** (iOS masks
   it; transparency renders grey). Render a square variant of the SVG, then strip alpha.

Pipeline note: ImageMagick cannot rasterize these SVGs (black box) — rasterize with
qlmanage; magick is fine for PNG→PNG/ICO.

index.html link set (standardized):

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### 6.5 Buttons, pills, cards (shared conventions)

- **Primary ink pill**: `rounded-full bg-ink text-paper dark:bg-paper dark:text-ink px-4 py-2 text-xs font-medium shadow-sm hover:scale-[1.02] active:scale-95 transition-all`.
- **Ember pill** — at most ONE per view, the conversion moment (e.g. Invoicify's
  Download PDF): `rounded-full bg-ember text-white … hover:scale-[1.02] active:scale-95`,
  ember glow shadow allowed here only.
- **Ghost pill**: glass hairline `rounded-full border border-black/[.06] dark:border-white/10 bg-white/60 dark:bg-white/[.04]`, lift on hover.
- **Cards**: `.glass rounded-[1.25rem]` (feature tiles may use `rounded-2xl`), hover = lift
  + shadow growth, never a border-colour-only change.
- **Focus**: every interactive element uses the ember focus-visible ring, never the
  browser default.
- Buttons sentence case, weight 500, never uppercase. Pills/inputs `rounded-full` /
  `rounded-xl`, modals `rounded-3xl`, opaque never glass.
- Do not re-skin app-specific controls beyond aligning them to these conventions where
  they obviously drift (wrong radius, missing focus ring, uppercase button text).

## 7. Motion

- Hover: cards lift (`translateY(-4px)`, 0.45s `cubic-bezier(.22,1,.36,1)`);
  buttons `scale(1.02)`; press `scale(0.98)`.
- Reveals: fade-up 28px, 0.8s, same easing, 70–200ms stagger.
- Liquid-metal sheen: 7s linear conic rotation.
- Honour `prefers-reduced-motion` (liquid metal stops, transitions off).

## 8. Iconography & app icons

### App mark & favicon family — ember tile + Headphones

The FocusMode app mark is the shared **ember-tile + Lucide `Headphones`**
cluster (§6) — in the header, and as the favicon/app-icon family per the §6
favicon spec with the Headphones glyph path:

```
<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
```

Generated family in `public/`: `favicon.svg`, `favicon-32.png`,
`favicon-16.png`, `favicon.ico`, `icon-192.png`, `icon-512.png`,
`apple-touch-icon.png` (180×180 full-square, no alpha).
`theme-color`: `#F74603`. The legacy 3D-render `favicon.png` is gone.

### Molten Ember renders — mode tiles & identity moments only

Feature and mode icons are 3D "molten orange lava glass" renders (colour
`#F74603`, glossy, transparent background), stored in `public/images/molten/`
and rendered as `<img>` with an ember glow:

```tsx
<img src="/images/molten/brain.webp" alt="" className="w-12 h-12
  drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)]
  transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
```

They are for mode tiles and identity moments (and the og-image) only — never
the header logo, never the favicon, never controls.

New assets follow the `ember-molten-asset` skill recipe (gpt-image-1,
1024×1024, transparent, "molten orange lava glass, colour #F74603, thick
rounded liquid-candy-glass form, high-gloss specular highlights and soft
internal glow…").

Small functional UI glyphs (chevrons, close, settings, volume) are Lucide
line icons in `currentColor`.

## 9. Performance & security guardrails

- ≤4 `backdrop-filter` layers per viewport. The Player screen counts its
  overlays (mixer panel, modals) against this budget.
- Ambient blobs are `pointer-events: none` and sit behind everything (z-0).
- Animate only `transform`, `opacity`, and the registered `--lm-angle`
  custom property; no layout-thrashing animations.
- External links use `rel="noopener noreferrer"`.
- No third-party scripts beyond Google Fonts and the YouTube iframe API the
  player requires; user data (profile, favorites, streaks) stays in
  localStorage.

## 10. Voice

Banned verbs: empower, transform, leverage, unlock, supercharge,
revolutionise, disrupt, synergise, ignite, unleash, elevate, future-proof,
next-level. Banned number prefixes: "Up to", "About", "Roughly", "Around",
"Nearly". Sentence case everywhere except display headlines (Title Case) and
micro-labels (uppercase).

## 11. App anatomy

### Theme mapping (CSS-variable app)

FocusMode is dual-theme. The app-level variables re-point per theme;
components consume only the app variables:

| App variable | Light (fog) | Dark (ink) |
|---|---|---|
| `--bg-primary` | `#F4F4F6` (fog) | `#0A0A0B` (canonical dark canvas — never pure black) |
| `--bg-secondary` (chrome surface) | `rgba(255,255,255,.72)` | `rgba(255,255,255,.045)` |
| `--text-primary` | `#000000` | `#FFFFFF` |
| `--text-secondary` | `rgba(0,0,0,.60)` | `#D9D9D9` |
| `--accent` | `#F74603` | `#F74603` |
| `--accent-hover` | `#55100D` (cherry) | `#FF7A3D` (molten highlight) |
| `--border` | `rgba(0,0,0,.06)` | `rgba(255,255,255,.09)` |

Dark mode is the Website's "ink slab" material applied to the whole app.
Shared-chrome markup (§6) maps `text-ink dark:text-paper` →
`text-[var(--text-primary)]`, `text-ember` → `text-[var(--accent)]`, and the
icon-button colors → `--text-secondary`/`--text-primary`; geometry and the
ember focus ring `focus-visible:ring-2 focus-visible:ring-[#F74603]/40` stay
literal.

### Timer

All time displays (timer, stats, durations) are **JetBrains Mono**
(`font-mono`) — a FocusMode-specific extension.

### Liquid metal budget

The two sanctioned liquid-metal uses in this app are the **play-button ring
while a session is running** and the **shared Ential footer capsule** —
nothing else gets the conic sheen.

### Mode assets

| Mode | Asset | Source |
|---|---|---|
| Focus | `brain.webp` | copied from Website `st-brain` |
| Motivation | `bolt.webp` | copied from Website `vp-bolt` |
| Success | `star.webp` | copied from Website `icon-star` |
| Relax | `coffee.webp` | generated (ember-molten-asset recipe) |
| Meditate | `lotus.webp` | generated |
| Sleep | `moon.webp` | generated |
| Legacy identity | `headphones.webp` | generated — retained for in-app identity moments only (the app mark is now the ember tile, §6) |

### Screens

- **Home** — sticky glass header (§6 chrome), bento grid of glass mode tiles
  with molten icons, shared footer capsule.
- **Player** — full-screen session view: top toolbar (back, activity
  selector, theme/profile/settings/fullscreen icon buttons), monospace timer
  hero with the liquid-metal play ring, ambient mixer overlay, quote mode.
