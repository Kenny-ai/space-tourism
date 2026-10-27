# Space Tourism

A cinematic, responsive space travel journal built with Next.js 16 App Router, React 19, TypeScript, and Motion.

## Development

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. `npm run dev -- --port 3001` selects a different port.

## Production and validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`next build` prerenders all four pages. Deploy with a Next.js-compatible host or run `next start`; the old Create React App `build/` output and SPA fallback configuration are no longer used.

## Vercel deployment

The root `vercel.json` explicitly selects the Next.js framework, runs `npm run build`, and uses `.next` as the output directory. These values override any previous Create React App settings stored in Vercel, including the obsolete `build` output directory.

Deploy the latest Git commit after changing this configuration. If updating the dashboard manually, select **Next.js** as the Framework Preset and clear the old Output Directory override.

## Routes and structure

- `/`: Earth imagery, orbital Explore control, and destination discovery.
- `/destination`: animated Moon, Mars, Europa, and Titan views.
- `/crew`: crew biographies, portraits, and synchronized dot/arrow controls.
- `/technology`: an illustrated launch technology journal.

`src/app` contains server-rendered route entries, metadata, layout, and global styling. Interactive components live in `src/components`. Content lives in `src/data.ts`, and images are served from `public/assets` through Next.js Image. Fonts are self-hosted using `next/font/local`; their licenses are in `src/app/fonts`.

## Motion and accessibility

The shared shell crossfades photography between routes, pages enter with staggered reveals, active navigation markers glide between links, and section content transitions without remounting its controls. Orbital details, floating planets, and hover feedback add depth. OS reduced-motion preferences disable decorative loops and shorten content transitions.

Every page has a primary heading, metadata, and a main landmark. Keyboard controls have visible focus. The mobile navigation traps focus, closes with Escape, backdrop click, link selection, or a desktop resize, and restores focus on close.

Selections persist independently under the existing `destinationDisplay`, `crewDisplay`, and `technologyDisplay` storage keys. A stable server snapshot avoids hydration mismatches. Invalid saved values use defaults, blocked storage falls back to memory, and storage events synchronize open tabs.

## Interactive 3D explorer

The home page now renders a textured Earth with separate clouds, atmospheric glow, directional lighting, and a depth-based star field. The destination explorer provides four mapped spheres, an atlas with clickable world markers, smooth camera approaches, drag rotation, pause/resume, and reset controls. The existing destination tabs remain fully usable with a keyboard and continue to persist selections.

The WebGL renderer is split into a client-only bundle with `next/dynamic` and loaded when its scene approaches the viewport. Static imagery remains visible until textures load, and renderer/texture failures or a lost graphics context restore the static view. Visitors can switch back to static imagery at any time. Reduced-motion preferences select static mode by default; explicitly enabling 3D keeps automatic rotation and camera easing off.

Rendering stops while the page or scene is hidden. Paused scenes use on-demand rendering and still respond to direct interaction. Pixel density is capped at 1.5, texture dimensions at 1536 × 768 (smaller where the original source is smaller), and the scene uses lightweight geometry without postprocessing. Touch gestures preserve vertical page scrolling outside and through the view.

World spacing, sizes, camera paths, lighting, and rotation speeds are illustrative. Imagery sources and processing details appear on `/credits` and in `public/assets/textures/ATTRIBUTION.md`.
