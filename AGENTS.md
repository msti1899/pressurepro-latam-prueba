# AGENTS.md - PressurePro LATAM

## Tech Stack
- Next.js 13 (Pages router — NOT App router; `experimental.appDir: false`)
- React 18.2.0, Tailwind CSS, Framer Motion
- Plain JavaScript — no TypeScript

## Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint (next/core-web-vitals)
```
No test or typecheck scripts exist.

## Architecture

### Routing & Entry Points
- `pages/index.js` — the real homepage for all locale routes (`/mx`, `/ar`, `/en`, etc.)
- `pages/index-new.js` — landing page for `/` (root); detects user country via ipapi.co client-side and redirects to the appropriate locale route. Has `noindex,nofollow`.
- `pages/_app.js` wraps everything in `<LocaleProvider>` — required for `useLocale()` to work.
- Import alias `@/*` maps to project root (configured in `jsconfig.json`).
- Path aliases also configured in `jsconfig.json` as `@/*` → `./*`.

### i18n Routing (Next.js built-in)
- Locales: `es`, `en`, `pt`, `mx`, `ar`, `br`, `pe`, `cl`, `co`, `bo`, `uy`, `epa`
- Default locale: `es` (global Spanish). Spain uses **`epa`** — never use `es` for Spain.
- `localeDetection: false` in next.config.js — detection is done manually.

### Localization Resolution (4 layers)
1. Global language translations (`config/localization/translations.js` → `global.es`/`en`/`pt`)
2. Country-specific translations (same file → `countries[countryCode][language]`)
3. Country overrides (`config/countryOverrides.js` — only the changed keys)
4. Fallback to `es`

Key config files:
- `config/countries.js` — country definitions, terminology, ISO→locale mapping
- `config/localization/translations.js` — translation tree
- `config/localization/marketContent.js` — SEO/hero content
- `config/countryOverrides.js` — per-country text overrides (deep-merged)
- `config/runtime.js` — `DEFAULT_LOCALE`, `getBaseUrl()`
- `config/whatsapp.js` — centralized WhatsApp number

### Context / Hooks
- `useLocale()` from `context/LocaleContext.js` — returns `{ language, country, countryConfig, translations, marketContent, changeLanguage, changeCountry, getLocalTerm, getWhatsAppNumber, getPriorityIndustries, getSeoKeywords, getRegionalClients }`.
- **Critical**: if `useLocale()` is called outside `<LocaleProvider>`, it returns a silent fallback (Spanish defaults, empty arrays) instead of crashing. This can mask bugs.
- `changeLanguage(lang, country?)` — saves preference to localStorage, pushes new route.
- `changeCountry(countryCode)` — pushes to `/{countryCode}` via Next.js router.

### Geolocation (dual path)
- **Server-side** (`middleware.js`): reads `x-vercel-ip-country`, `cf-ipcountry`, or `request.geo.country` headers; sets `NEXT_LOCALE` cookie (1 year). Skips if locale is already set (except `es` default — always re-checks).
- **Client-side** (`lib/geolocation.js`): fetches `https://ipapi.co/json/` for initial detection on `/` landing page.

## Critical Quirks

### Tailwind Colors — Remapped!
**`purple-*` classes map to brand blue `#0077b9`**, not purple. See `tailwind.config.js`:
- `purple-500` = `#0077b9` (brand blue)
- `purple-600` = `#005f94`
- This is intentional — all `bg-purple-*`, `text-purple-*`, `border-purple-*` used across the site are actually blue.

### Environment Variables
- `RESEND_API_KEY` — **required** for contact form (`pages/api/contact.js`); emails fail silently without it
- `CONTACT_EMAIL` — recipient for contact form (defaults to `info@pressurepro-latam.com`)
- `NEXT_PUBLIC_BASE_URL` — used for hreflang alternate URLs (defaults to `https://pressurepro-latam.com`)
- Copy `.env.example` → `.env.local` for local development

### Middleware / Static File Behavior
- Middleware skips: `/api/*`, `/_next/*`, any path containing `.` (files). Public static files are NOT processed.
- Aggressive cache headers set on `/imagenes_reales/*` and `/_next/image` (1 year immutable).

### Page Loading Pattern
Homepage sections use `next/dynamic` for lazy loading:
```js
const About = dynamic(() => import('../sections/About'), { loading: () => <div className="h-screen" /> });
```
All section components are in `/sections/`. Every page must include `<DynamicSEO />` for hreflangs and `<CountryBanner />` for geo-detection UI.