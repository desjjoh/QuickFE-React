# Architecture

[Back to README](../README.md)

## Folder boundaries

| Location                 | Responsibility                                                        |
| ------------------------ | --------------------------------------------------------------------- |
| `src/main.tsx`           | Browser startup, asset warming, store synchronization, and React root |
| `src/App.tsx`            | React Router provider                                                 |
| `src/app`                | App frame, navigation configuration, and application widgets          |
| `src/router`             | Route definitions and page-title metadata                             |
| `src/library/components` | Shared UI primitives                                                  |
| `src/library/styles`     | SCSS tokens, palette, global styles, and font declarations            |
| `src/shared`             | Cross-feature hooks, helpers, layouts, i18n, and Redux stores         |
| `src/views/template`     | Starter landing page                                                  |
| `src/views/playground`   | Component examples and playground layouts                             |
| `public`                 | Static assets served at root-relative URLs                            |
| `docs`                   | Development and component documentation                               |

## Bootstrap lifecycle

`src/main.tsx` imports global styles and initializes i18next. It starts font and flag warming without waiting for completion, initializes theme and locale synchronization, then mounts React under `StrictMode` and the Redux provider. Synchronization cleanup functions are registered with Vite hot disposal.

`App` supplies the browser router. Its root route renders `AppFrame`, with child content placed in an `Outlet`. The frame owns the page scroll container and scrolls it to the top on pathname changes, respecting reduced motion.

## Routing and navigation

The index route renders the template at `/`. `/playground` lazy-loads the playground. The app frame also serves as the initial router fallback.

Use native React Router destinations (`to`, `href`, `useNavigate`) rather than a custom named-route resolver. Route metadata uses `handle.pageTitle`; `useDynamicPageTitle` merges matching parent-to-child title metadata and produces `Page — QuickFE`, or the brand alone when no title is set.

Main and More navigation are defined in `src/app/config/navigation.ts`. Several entries deliberately point to the template until their pages exist. Desktop navigation includes brand, main links, More, theme toggle, and language selector. The current smaller-screen frame shows a centered brand; a complete mobile navigation drawer has not been ported.

## State and browser effects

The Redux store combines `theme` and `locale` slices. Components use the typed hooks in `src/shared/hooks/useStore.ts`. Reducers update state; `themeSync.ts` and `localeSync.ts` own storage, document updates, and BroadcastChannel listeners.

Theme persists under `theme_mode`; locale persists under `i18n-locale`. Cross-tab messages are validated and applied without rebroadcast loops. Browser storage/channel failures do not prevent normal startup. English is the only supported locale.

Local UI state, including open dropdowns and uncontrolled tab selection, stays in the component rather than Redux.

## Component composition

Dropdowns use Floating UI for placement, a body portal, and focus-trap for focus containment. Presence, keyboard navigation, and dismissal belong to the dropdown lifecycle; shared hooks handle positioning and outside interaction. See [Dropdown menus](dropdowns.md).

Tabs support internal or controlled selection, keyboard navigation, nested groups, and route links. Only switching tabs animates panels; initial panels do not fade in. See [Playground and tabs](playground.md).

## Current feature boundary

The repository is a UI starter. QuickAPI clients, authentication, account settings, administration, and article features have not been ported. Do not infer their availability from placeholder navigation labels or from the Vue application's capabilities. See [API contracts](api-contracts.md) and [Technical backlog](backlog.md).
