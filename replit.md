# Triwid Mui | Horror Archive

A deeply immersive horror story archive web app for Indonesian horror author Triwid Mui. Features animated title, loading screen, Buy/Read flow, multi-language blog stories (ID/EN/JP), horror ambient audio, and glitch/blood CSS effects.

## Run & Operate

- `pnpm --filter @workspace/horror-archive run dev` — run the frontend (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (handles blog feed proxy at `/api/feeds`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/horror-archive)
- API: Express 5 (artifacts/api-server) — used as CORS proxy for Blogger RSS feeds
- No database — content pulled live from Blogger JSON API and static assets

## Where things live

- `artifacts/horror-archive/src/screens/` — all screen components (Title, Loading, Menu, Buy, Read, StoryList)
- `artifacts/horror-archive/src/components/` — AudioPlayer, AdsgramBanner, LanguageSwitcher, SupportButton
- `artifacts/horror-archive/public/` — static images: diary-octavia-cover.jpg, zahra-cover.jpg, oni-demon.jpg
- `artifacts/api-server/src/routes/feeds.ts` — Blogger RSS feed proxy (fixes CORS)
- `artifacts/horror-archive/src/index.css` — horror theme: scanlines, blood drip, glitch, vignette

## Architecture decisions

- Blog feeds fetched server-side via `/api/feeds?url=...` proxy to avoid browser CORS restrictions
- Web Audio API generates procedural horror ambient drone (low-frequency oscillator + LFO) on first user click
- Screen state managed with simple React useState (no router) — type ScreenState covers all screens
- Adsgram.ai SDK loaded via script tag in index.html; AdsgramBanner component handles initialization
- Images stored in `public/` folder so Vite serves them at root paths

## Product

- Title screen: animated "TRIWID MUI | HORROR ARCHIVE" with blood drip + glitch effects
- Loading screen: rotating sigil + rotating eerie text phrases
- Main Menu: READ and BUY gothic buttons
- Buy: 2 novels (Diary Octavia + Zahra) with covers and purchase links
- Read: 3 language tabs → fetches live stories from Blogger (ID/EN) or links to Pixiv (JP)
- Persistent: language switcher (corner), support/donate button (Saweria)

## User preferences

_Populate as you build._

## Gotchas

- Blogger feed proxy only allows the 2 whitelisted feed URLs (see `artifacts/api-server/src/routes/feeds.ts`)
- Adsgram blockId must be set manually in AdsgramBanner.tsx (left as a TODO placeholder)
- Audio starts only on first user interaction (browser autoplay policy)
- After editing the API server, run `pnpm --filter @workspace/api-server run build` before restarting the workflow

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
