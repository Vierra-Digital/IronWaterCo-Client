# Home V2 — Framer design system

## What lives here

| Path | Purpose |
|------|---------|
| [`ui/`](ui/) | React components used by `/home-v2` (Framer homepage parity: nav, sections, footer) |
| [`framer-sections.module.css`](framer-sections.module.css) | Below-fold section styles (sharp edges, gold `#c9a96e`, grain) |
| [`framer-ui.module.css`](framer-ui.module.css) | Shared tokens and styles |
| [`adapters/`](adapters/) | Thin re-exports for scene integration |

Framer Desktop project also has matching code files (`HeroOverlayBeat.tsx`, `GlassScenePanel.tsx`, …) created via Framer MCP.

## Update loop (design change)

1. Edit components in **Framer Desktop** (or use Framer MCP `updateCodeFile`).
2. Export with React Export / unframer (requires subscription):

   ```bash
   npx -y unframer@latest 642655a4e6a20fc0 --out ./components/home-v2/framer/generated
   ```

3. Copy or adapt generated files into `ui/`, or point adapters at `generated/`.
4. Run `npm run build` and check `/home-v2`.

Until unframer export is available, edit [`ui/`](ui/) directly — it mirrors the Framer components and brand tokens (`/Brand/*`, `/Type/*` in Framer).

## Brand tokens (Framer project)

- Colors: `/Brand/Navy`, `/Brand/Gold`, `/Brand/Text`, `/Brand/Glass`, …
- Type: `/Type/Label`, `/Type/HeroXL`, `/Type/DisplayMD`, `/Type/BodyLG`
