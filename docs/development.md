# Development

[Back to README](../README.md)

## Local setup

Use Node.js 22.12 or newer within Node 22 and npm. CI uses Node 22, and the installed Vite dependency requires at least Node 22.12 on that release line. The project does not currently declare its own `engines` field.

```sh
npm ci
npm run dev
```

Open `http://localhost:8080`. Development and preview both use `strictPort: true`, so stop an existing process on port 8080 before starting another server. The default configuration serves HTTP without local certificates.

The starter does not currently read application environment variables or require QuickAPI, a database, Docker, or an `.env` file.

## Commands

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Start Vite with hot module replacement                         |
| `npm run build`        | Check TypeScript projects and build static assets into `dist/` |
| `npm run preview`      | Serve the built application locally on port 8080               |
| `npm run format`       | Apply Prettier formatting                                      |
| `npm run format:check` | Check formatting without writing files                         |
| `npm run lint`         | Run ESLint                                                     |
| `npm run type-check`   | Check the application and Vite TypeScript projects             |

The format commands tolerate missing optional directories such as `test/`. They use the same Prettier settings as Vue: single quotes, no JavaScript/TypeScript semicolons, and a 100-column print width. Git normalizes text files to LF.

`test:theme` is a stale script targeting a missing file; it is not a working test command. See [Testing](testing.md).

## Styling and components

SCSS design tokens live in `src/library/styles`. Vite injects the globals and variables into component SCSS files. Components use SCSS modules, and buttons/button links share button styling. Global styles are imported once in `src/main.tsx`.

Keep reusable primitives in `src/library/components`, application widgets in `src/app/widgets`, and feature-specific examples in their view folder. Use the [playground](playground.md) to compare component variants and both themes. Discuss structural departures from Vue before introducing a custom abstraction.

## Translations and locale

English is the only configured locale. Add visible copy to `src/shared/i18n/locales/en` and register new translation groups in its `index.ts`. Locale metadata, display labels, and flag paths live in `src/shared/i18n/config.ts`.

Route titles use translated `handle.pageTitle` keys and `app.brand.name`. They update on navigation and locale changes. Navigation labels come from translation keys in `src/app/config/navigation.ts`.

## Fonts and flags

Font faces are declared in `src/library/styles/fonts.generated.scss` and served from `public/fonts/google`. The active families are Nunito Sans (base), Outfit (display), JetBrains Mono (code), and Merriweather (emphasis).

Startup calls `preloadFonts()` to load the configured CSS faces through `document.fonts.load`, including italic Merriweather. This runs without blocking React startup. It avoids page-level font preload hints that warn when a font is not used immediately. Fallback font stacks remain available when loading fails.

`preloadLocaleFlags()` warms and decodes images from the locale configuration and retains the image objects for the session. The language dropdown still unmounts normally when closed; it does not keep hidden menu content mounted to cache images. Browser caching and development-server revalidation remain browser/server behavior.

The generated font file refers to a download script that is not present in this repository. No font regeneration command is currently available; preserve the checked-in assets and declarations together when updating them.
