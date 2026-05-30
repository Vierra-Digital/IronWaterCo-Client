# Hero scene images (16:9, Manus-generated)

| File | Scene | Source |
|------|--------|--------|
| `scene-1-full-room.jpg` | Wide establishing (penthouse + skyline) | Manus |
| `scene-2-shower.jpg` | Brass rainfall shower | Manus |
| `scene-3-bathtub.jpg` | Freestanding tub + window | Manus |
| `scene-4-hardware.jpg` | Brass faucet macro | Manus |
| `scene-5-cta.jpg` | Golden-hour penthouse wide (vanity + tub + skyline) | Manus (`vXQRXpUaoaRLMDms`) |

Paths used in `data/homepage.ts` → `heroScenes` → `CinematicScrollHero`.

Regenerate via tasks API (not `/images/generate` — returns 404):

```bash
node scripts/generate-hero-images-manus.mjs
# Allow ~3 min per image; set MANUS_MAX_ATTEMPTS=70 if needed
```

Manual download from CDN URLs is also supported.
