---
name: ios-app-icon
description: Generate iOS app icons for Ential apps. Creates 180x180 PNG icons with solid orange background and white Lucide icons using PIL. No alpha channel to prevent iOS rendering issues.
allowed-tools: Bash, Write, Read
---

# iOS App Icon Generator

Creates iOS-compatible app icons (apple-touch-icon.png) for Ential apps.

## Requirements

- **Size**: 180x180 pixels
- **Format**: PNG with NO alpha channel (RGB only)
- **Background**: Solid #f97316 (orange-500) filling entire canvas
- **Icon**: White Lucide icon centered

## Icon Assignments

| App | Icon | Lucide Path |
|-----|------|-------------|
| Conversio | ArrowLeftRight | Two arrows pointing left and right |
| Invoicible | FileText | Document with lines |
| Read-Fast | Zap | Lightning bolt |
| FocusMode | Headphones (ember-tile favicon family — see "FocusMode (Liquid Glass)" below) | Lucide Headphones |
| Don't Be Late | AlarmClock | Clock with alarm bells |

## FocusMode (Liquid Glass) — current pipeline

FocusMode no longer uses the PIL-drawn orange/white icon OR the molten
headphones render. Its app mark is the shared Ential **ember-tile + white
Lucide Headphones** favicon family: `public/favicon.svg` (64 viewBox, rx=14
molten-gradient tile, radial gloss, stroke-2 white glyph) is the source of
truth, rasterized via `qlmanage` (ImageMagick cannot rasterize the SVG) into
`favicon-32.png`, `favicon-16.png`, `favicon.ico`, `icon-192.png`,
`icon-512.png`, and `apple-touch-icon.png` (180×180, **full-square rx=0, RGB
no alpha**). `og-image.png` (1200×630, molten render on ink) stays. Theme
colour is ember `#F74603`, not `#f97316`. See `design.md` §6 and §8.

## Python Generation Script

Use PIL to generate icons. Install dependencies if needed:

```bash
pip3 install --user pillow
```

### Template Code

```python
from PIL import Image, ImageDraw

def create_app_icon(output_path, draw_icon_func):
    """Create a 180x180 iOS app icon with orange background."""
    size = 180
    img = Image.new('RGB', (size, size), color='#f97316')
    draw = ImageDraw.Draw(img)

    # Draw the icon (white, centered)
    draw_icon_func(draw, size)

    img.save(output_path, 'PNG')
    print(f'Created {output_path}')
```

### Icon Drawing Functions

Each icon is drawn at scale=5 with stroke_width=10 for crisp rendering.

#### Headphones (FocusMode)
```python
def draw_headphones(draw, size):
    stroke_width = 10
    center_x, center_y = 90, 95
    arc_radius = 35

    # Headband arc
    bbox = [center_x - arc_radius, center_y - arc_radius,
            center_x + arc_radius, center_y + arc_radius]
    draw.arc(bbox, start=180, end=360, fill='white', width=stroke_width)

    # Vertical lines
    draw.line([(55, 95), (55, 130)], fill='white', width=stroke_width)
    draw.line([(125, 95), (125, 130)], fill='white', width=stroke_width)

    # Earpieces (rounded rectangles)
    def rounded_rect(x, y, w, h, r, fill):
        draw.rectangle([x+r, y, x+w-r, y+h], fill=fill)
        draw.rectangle([x, y+r, x+w, y+h-r], fill=fill)
        draw.ellipse([x, y, x+2*r, y+2*r], fill=fill)
        draw.ellipse([x+w-2*r, y, x+w, y+2*r], fill=fill)
        draw.ellipse([x, y+h-2*r, x+2*r, y+h], fill=fill)
        draw.ellipse([x+w-2*r, y+h-2*r, x+w, y+h], fill=fill)

    rounded_rect(48, 105, 15, 25, 5, 'white')
    rounded_rect(118, 105, 15, 25, 5, 'white')
```

#### ArrowLeftRight (Conversio)
```python
def draw_arrow_left_right(draw, size):
    stroke_width = 10
    y_top, y_bottom = 70, 110

    # Top arrow (pointing right)
    draw.line([(45, y_top), (135, y_top)], fill='white', width=stroke_width)
    draw.line([(115, y_top-20), (135, y_top)], fill='white', width=stroke_width)
    draw.line([(115, y_top+20), (135, y_top)], fill='white', width=stroke_width)

    # Bottom arrow (pointing left)
    draw.line([(45, y_bottom), (135, y_bottom)], fill='white', width=stroke_width)
    draw.line([(45, y_bottom), (65, y_bottom-20)], fill='white', width=stroke_width)
    draw.line([(45, y_bottom), (65, y_bottom+20)], fill='white', width=stroke_width)
```

#### FileText (Invoicible)
```python
def draw_file_text(draw, size):
    stroke_width = 8
    # Document outline with folded corner
    points = [(55, 35), (105, 35), (125, 55), (125, 145), (55, 145), (55, 35)]
    draw.line(points, fill='white', width=stroke_width)
    # Fold
    draw.line([(105, 35), (105, 55), (125, 55)], fill='white', width=stroke_width)
    # Text lines
    for y in [80, 100, 120]:
        draw.line([(70, y), (110, y)], fill='white', width=6)
```

#### Zap (Read-Fast)
```python
def draw_zap(draw, size):
    # Lightning bolt polygon
    points = [
        (100, 30),   # Top
        (70, 95),    # Left middle
        (90, 95),    # Inner left
        (80, 150),   # Bottom
        (110, 85),   # Right middle
        (90, 85),    # Inner right
        (100, 30)    # Back to top
    ]
    draw.polygon(points, fill='white')
```

#### AlarmClock (Don't Be Late)
```python
def draw_alarm_clock(draw, size):
    stroke_width = 8
    cx, cy = 90, 95
    radius = 45

    # Clock face circle
    draw.ellipse([cx-radius, cy-radius, cx+radius, cy+radius],
                 outline='white', width=stroke_width)

    # Clock hands
    draw.line([(cx, cy), (cx, cy-25)], fill='white', width=stroke_width)  # Hour
    draw.line([(cx, cy), (cx+20, cy)], fill='white', width=stroke_width)  # Minute

    # Alarm bells (top)
    draw.line([(55, 55), (70, 70)], fill='white', width=stroke_width)
    draw.line([(125, 55), (110, 70)], fill='white', width=stroke_width)

    # Bell tops
    draw.ellipse([48, 42, 62, 56], outline='white', width=6)
    draw.ellipse([118, 42, 132, 56], outline='white', width=6)
```

## File Structure

Each app needs:
```
public/
  apple-touch-icon.png   # 180x180 PNG (no alpha)
  apple-touch-icon.svg   # Optional SVG source
```

## index.html Integration

Add these lines to `<head>`:

```html
<!-- Theme Color -->
<meta name="theme-color" content="#f97316" />
<meta name="msapplication-TileColor" content="#f97316" />

<!-- App Icons -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" href="/apple-touch-icon.png" />
```

## Important Notes

1. **No Alpha Channel**: iOS shows white/gray behind transparent areas. Always use RGB mode, not RGBA.
2. **No Rounded Corners**: iOS applies its own mask. The icon should be a full square.
3. **Cache Clearing**: After updating, users must clear Safari cache or delete/re-add the home screen app.
4. **Testing**: Use Safari on iOS, tap Share > Add to Home Screen to test.
