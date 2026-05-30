# Penthouse bathroom GLB — Devon & Devon luxury brief

Place the exported file at: **`public/home-v2/penthouse-suite.glb`**

The site loads it automatically. If missing, a procedural Devon-inspired fallback is shown.

## Primary prompt (copy-paste)

> Devon and Devon inspired ultra-luxury classical Italian bathroom showroom interior, architectural visualization. Calacatta or Statuario marble floors and walls with wainscoting panels, freestanding sculptural roll-top bathtub, double vanity with turned legs, cross-handle brushed brass widespread faucets, exposed brass rain shower pipe with vintage head, frameless glass shower, ornate framed mirror, warm 2700K wall sconces, subtle steam in shower. Cream ivory and antique gold palette, heritage residential luxury, no people. Optimized for real-time web: under 50,000 triangles, clean material zones, no tiny clutter.

## Negative prompt

> Modern minimalist box room, plastic fixtures, low-poly blockout, flat gray materials, cartoon style, people, text, logos, outdoor scene.

## Camera empties (required in Blender)

Add empty objects at eye height for scroll-driven camera targets, then export with glTF:

| Empty name | Suggested view |
|------------|----------------|
| `cam_establishing` | Wide from doorway, full suite |
| `cam_vanity` | Close on brass faucets and basins |
| `cam_shower` | Inside shower, steam visible |
| `cam_tub` | Low hero on freestanding tub |
| `cam_window` | Tub or window with warm city glow |

## Tool settings

| Setting | Recommendation |
|---------|----------------|
| Format | **GLB** (glTF 2.0 binary) |
| Scale | ~4–6m room width before export |
| Compression | Draco if file > 5MB |
| Textures | 2K max; marble + brass PBR maps |

## Optional textures (procedural fallback)

Drop tileable maps in `public/home-v2/textures/`:

- `marble-diffuse.jpg`
- `brass-normal.jpg`

## Tools

- [Meshy](https://www.meshy.ai/)
- [Tripo3D](https://www.tripo3d.ai/)
- [Luma Genie](https://lumalabs.ai/)

## After export

1. Drop `penthouse-suite.glb` in this folder.
2. Reload `/home-v2` — the hero journey uses the model instead of the procedural room.
