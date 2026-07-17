---
name: brand-guidelines
description: Use this skill when styling components, creating new pages, or ensuring visual consistency across FocusMode. Follows the Ential "Liquid Glass" design system (see design.md) — ember accent, glass materials, molten iconography.
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Brand Guidelines — FocusMode (Ential Liquid Glass)

FocusMode follows the **Ential Design System v4 "Liquid Glass"**, adapted for a
dual-theme focus app. The authoritative spec is `design.md` in the repo root
(derived from `../Website/design.md`). Read it before styling anything. This
skill is the quick reference.

## Palette — no new hues, ever

| Token | Hex | Role |
|---|---|---|
| Ink | `#000000` | Dark-mode canvas, text on light |
| Paper | `#FFFFFF` | Glass tint base, text on ink |
| Stone | `#D9D9D9` | Secondary text on ink only |
| **Ember** | `#F74603` | Sole accent — active states, play button, links (ration it) |
| Signal | `#DD0200` | Live dots ONLY |
| Cherry | `#55100D` | Ember hover (light mode) |
| Fog | `#F4F4F6` | Light-mode canvas (never pure white) |

Ember glow shadows: `rgba(247,70,3,…)` — buttons
`shadow-[0_8px_28px_rgba(247,70,3,.35)]`, molten icons
`drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)]`.

## Theme variables (defined in `index.css`)

Components consume ONLY the app variables — never raw hexes:
`--bg-primary`, `--bg-secondary`, `--surface-solid`, `--text-primary`,
`--text-secondary`, `--accent`, `--accent-hover`, `--border`, `--chrome`.
Light = fog canvas + light glass; dark = ink canvas + dark glass.

## Typography

| Use | Font | Class |
|---|---|---|
| Headings, mode names | Funnel Display (auto on `h1–h4`) | `font-display` |
| Body / UI | Inter | `font-sans` (default) |
| Timer, stats, durations | JetBrains Mono | `font-mono` |

Display: weight 600, `tracking-[-0.02em]`, Title Case, no trailing periods.
Micro-labels: Inter semibold uppercase `tracking-[0.04em]`+. Buttons:
sentence case, never uppercase.

## Materials (classes in `index.css`)

- `.glass` (+ `.lift` for hover raise) — cards, tiles. Hover = lift + deeper
  shadow, NEVER a border-colour change.
- `.surface-panel` — modals, dropdowns, sheets. Solid, NOT glass.
- `.btn-mechanical` / `.btn-mechanical-active` — glass capsule buttons; active
  = ember fill + ember glow.
- `.liquid-metal` — animated conic sheen ring. Two sanctioned uses only: the
  play button while a session is running, and the shared Ential footer capsule.
- `.ambient` — 1–2 blurred ember blobs behind the canvas at ≤7% opacity.
- `.ember-gradient` — molten text gradient, hero headlines only.

Performance: ≤4 `backdrop-filter` layers per viewport.

## Radius

Buttons/pills `rounded-full` · glass cards `rounded-[1.25rem]`–`2rem` ·
modals `rounded-3xl` · mode tiles `rounded-2xl`.

## Molten ember iconography

Identity moments (mode tiles, empty states, og-image) use 3D molten ember
glass renders from `public/images/molten/`. The header logo and favicon
family are NOT molten renders — they are the shared ember-tile + Lucide
Headphones cluster (see `design.md` §6):

| Asset | Use |
|---|---|
| `headphones.webp` | Legacy identity moments / og-image only (not the header logo or favicon) |
| `brain.webp` | Focus |
| `bolt.webp` | Motivation |
| `star.webp` | Success |
| `coffee.webp` | Relax |
| `lotus.webp` | Meditate |
| `moon.webp` | Sleep |

Render as `<img>` with ember glow + hover pop:

```tsx
<img src="/images/molten/brain.webp" alt="" className="w-12 h-12 object-contain
  drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)]
  transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
```

Small functional glyphs (chevrons, close, settings, volume) stay Lucide line
icons in `currentColor`. New molten assets: use the `ember-molten-asset` skill
recipe (gpt-image-1, transparent, molten orange lava glass `#F74603`).

## Accent rationing

- One ember-filled control per screen (the active play button).
- Body text never ember. Signal red = live dots only.

## Motion

Cards lift `translateY(-4px)` 0.45s `cubic-bezier(.22,1,.36,1)`; buttons
`scale(1.02)` hover / `scale(0.98)` press; liquid-metal spins 7s linear.
Honour `prefers-reduced-motion`.

## Footer pattern (required)

Shared liquid-metal capsule, identical across all Ential free tools (see
`design.md` §6):

```tsx
<footer className="relative z-10 mt-auto py-6 flex justify-center print:hidden">
  <div className="liquid-metal">
    <a href="https://ential.com" target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-1.5 rounded-full bg-[#0c0c0d] px-5 py-2.5 text-xs font-medium text-stone hover:text-paper transition-colors">
      ❤️ Made with Love + Code by <span className="text-ember">Ential</span>
    </a>
  </div>
</footer>
```

## Voice

Banned verbs: empower, transform, leverage, unlock, supercharge,
revolutionise, disrupt, synergise, ignite, unleash, elevate, future-proof,
next-level. Banned number prefixes: "Up to", "About", "Roughly", "Around",
"Nearly".
