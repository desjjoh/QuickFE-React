# QuickFE-React

A React and TypeScript frontend starter following **QuickFE-Vue3**'s application shell, design tokens, and shared component conventions.

The current application provides a template page and a translated component playground. It establishes the UI foundation for future QuickAPI-NestJS integration; account flows, API adapters, and feature screens are not implemented yet.

## What's included

- React, TypeScript, Vite, React Compiler, React Router, Redux Toolkit, SCSS, and react-i18next.
- Responsive app frame, configuration-driven navigation, and translated browser titles.
- Shared buttons, links, typography, cards, layout primitives, dropdowns, and tabs.
- Persistent light/dark theme and English locale stores with cross-tab synchronization.
- A component playground, local fonts, and startup font/flag loading.
- Separate formatting, lint, and type-check CI jobs for `main`, `staging`, and `dev`.

## Getting started

Use Node.js 22.12 or newer within the Node 22 line and npm to match CI.

1. Install dependencies: `npm ci`.
2. Start the development server: `npm run dev`.
3. Open `http://localhost:8080` for the template or `/playground` for component examples.

No backend, environment file, or certificates are required for the current starter. Port **8080** is fixed; startup fails if it is occupied. See [Development](docs/development.md) for scripts and asset loading.

## Documentation

| Guide                                           | Contents                                                             |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| [Development](docs/development.md)              | Local setup, commands, styling, translations, and fonts              |
| [Architecture](docs/architecture.md)            | Folder boundaries, bootstrap, routing, state, and UI composition     |
| [API contracts](docs/api-contracts.md)          | Current integration boundary and preparation for QuickAPI            |
| [Testing](docs/testing.md)                      | Local checks, browser verification, CI, and current test limitations |
| [Deployment and operations](docs/deployment.md) | Static builds, routing fallback, assets, and hosting requirements    |
| [Technical backlog](docs/backlog.md)            | Current gaps and deferred work                                       |

Component references: [dropdown menus](docs/dropdowns.md) and [playground/tabs](docs/playground.md). Workflow details and the importable branch policy are in [Continuous integration](docs/ci.md).

Commands live in [package.json](package.json), development/build configuration in [vite.config.ts](vite.config.ts), and CI in [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Route overview

| Page                 | Route         |
| -------------------- | ------------- |
| Template             | `/`           |
| Component playground | `/playground` |

Navigation uses React Router's native path destinations. Several More navigation entries are placeholders pointing to `/`; they do not represent implemented pages.

## Quality checks

```sh
npm run format:check
npm run lint
npm run type-check
npm run build
```

CI runs formatting, lint, and type checks. Builds and browser checks are separate; no automated test suite is currently available. See [Testing](docs/testing.md) for verification boundaries.

## License

[MIT](LICENSE).
