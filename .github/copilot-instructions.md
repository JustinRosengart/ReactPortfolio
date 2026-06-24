# Copilot instructions for `react-portfolio`

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm start`
- Start builder mode: `npm run dev:builder`
- Production build: `npm run build`
- Tests: `npm test`
- Single test file or name: `npm test -- --watchAll=false <test-file-or-name>`

There is no separate lint script in `package.json`; CRA's ESLint/TypeScript checks run through the normal build/test flow.

## Architecture

- This is a React 18 + TypeScript SPA bootstrapped with CRA and routed with `react-router-dom`.
- `src/index.tsx` mounts `App`, and `App.tsx` wraps the app in `HelmetProvider`, `ThemeProvider`, `LanguageProvider`, `DataProvider`, and `BrowserRouter`.
- `DataContext` is the app's content layer: it fetches portfolio data from Supabase tables plus `website_config`, caches the result in `sessionStorage` for 24 hours, resolves `en`/`de` strings, and updates the runtime accent theme.
- The shared layout is `Header` + animated route content + `Footer`; page transitions use Framer Motion and `ScrollToTop` runs globally.
- Routes include the landing page, projects, project detail, gallery, contact, profile, and legal pages.

## Conventions

- Treat Supabase content as the source of truth for copy, projects, skills, gallery content, and site config. Avoid hardcoding content in components unless the structure itself changes.
- Theme styling should go through `src/config/theme.ts` and `themeClasses`; supported accent colors are the fixed set defined there.
- If you change the accent color flow, keep `website_config.accentColor`, `updateThemeClasses`, and the Tailwind-safe class definitions in sync.
- Use `useData`, `useTheme`, and `useLanguage` only inside their providers; provider order in `App.tsx` matters.
- Language values are `en`/`de`, persisted in `localStorage` under `portfolio_lang`. Translation objects are resolved recursively from `{ en, de }` pairs.
- Social links are rendered from Supabase data through string-to-icon maps in `src/components/SocialLinks.tsx`; add new supported icons there.
- Project detail pages resolve by `project.url`, so keep that field stable if you want existing links to continue working.
- The contact form uses Supabase Edge Functions plus Cloudflare Turnstile; keep `REACT_APP_TURNSTILE_SITE_KEY` and the `submit-contact` flow aligned with the backend.
- For content/layout changes, check `docs/CUSTOMIZATION.md` and the relevant page/component together, since many page labels come from `pageContent`, `footerContent`, and `quickLinks` JSON.
