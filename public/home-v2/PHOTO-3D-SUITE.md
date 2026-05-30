# Photo-mapped 3D penthouse (from Manus hero images)

The scroll walkthrough uses your five Manus renders as **full-bleed panels inside a 3D room**, aligned to the same camera stations as the tour. This is not a reconstructed mesh GLB—it is a real-time Three.js environment that cross-fades panels as you scroll.

## Images used

| Station | File |
|---------|------|
| Establishing | `public/images/hero/scene-1-full-room.jpg` |
| Shower | `public/images/hero/scene-2-shower.jpg` |
| Bathtub | `public/images/hero/scene-3-bathtub.jpg` |
| Hardware | `public/images/hero/scene-4-hardware.jpg` |
| Window / CTA | `public/images/hero/scene-5-cta.jpg` |

Implementation: `components/home-v2/penthouse/PenthouseScenePhotoRoom.tsx`

## True 3D model (optional GLB)

For a walkable mesh with depth (not flat photo walls), export a GLB and place it at:

`public/home-v2/penthouse-suite.glb`

When that file exists, it **replaces** the photo room automatically.

### Recommended workflow (Meshy / Tripo / Luma)

1. Upload **all five** hero images as reference views of the same bathroom.
2. Prompt: *Ultra-luxury Manhattan penthouse master bathroom, Calacatta marble, dark walnut vanity, aged brass fixtures, freestanding tub, floor-to-ceiling window at dusk—consistent with reference images.*
3. Export GLB under 50k triangles with camera empties: `cam_establishing`, `cam_shower`, `cam_tub`, `cam_vanity`, `cam_window`.
4. See [GLB-GENERATION-BRIEF.md](./GLB-GENERATION-BRIEF.md) for full export notes.

Manus currently generates **images**, not GLB meshes. Use Manus for look development, then Meshy/Tripo for geometry.

## Fallback

If hero images fail to load, the app falls back to the procedural Devon-inspired room (`PenthouseSceneProcedural.tsx`). Set `hasGlb` path only when a real GLB is present.
