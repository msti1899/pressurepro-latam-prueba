# AGENTS.md - PressurePro LATAM

## Tech Stack
- Next.js 13 (Pages router, not App router)
- React 18.2.0
- Tailwind CSS
- Framer Motion
- Plain JavaScript (no TypeScript)

## Available Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint    # ESLint
```
Note: No test or typecheck scripts exist.

## Architecture

### i18n Routing (Next.js built-in)
- Locales: `es`, `en`, `pt`, `mx`, `ar`, `br`, `pe`, `cl`, `co`, `bo`, `uy`, `epa`
- Default locale: `es`
- Spain uses `epa`, NOT `es` (Spanish global)

### Localization Hierarchy
1. Global language (es/en/pt)
2. Country+language (mx+es, br+pt, etc.)
3. Country overrides
4. Fallback to `es`

Key config files:
- `config/countries.js` - Country definitions
- `config/localization/translations.js` - Translation tree
- `config/localization/marketContent.js` - SEO/hero content

### Geolocation (middleware.js)
- Vercel: Uses `x-vercel-ip-country`, `cf-ipcountry`, or `geo.country` headers
- Localhost: Uses ipapi.co API
- Saves preference to `NEXT_LOCALE` cookie (1 year)

## Important Quirks
- Static files in `/public` are NOT processed by middleware
- Middleware matcher excludes: `/_next/static`, `/_next/image`, `favicon.ico`, files with extensions
- Images use `flagcdn.com` CDN