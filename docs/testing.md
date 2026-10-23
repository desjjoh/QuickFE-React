# Testing and verification

[Back to README](../README.md)

## Local checks

```sh
npm run format:check
npm run lint
npm run type-check
npm run build
```

These check formatting, ESLint rules, TypeScript projects, and production compilation. They do not exercise browser interactions or backend behavior. `npm run format` writes formatting changes; `format:check` does not.

ESLint uses the recommended JavaScript/TypeScript rules, React Hooks rules, and React Refresh rules. It does not currently enable TypeScript's type-aware ESLint configurations.

Source files also follow Vue's logical-spacing rules: separate class methods,
leave a blank line after variable declaration groups and block-like statements,
and before `return`, `throw`, or `try`. Consecutive variable declarations may stay
together. These rules cover `.ts`, `.mts`, and `.tsx` files under `src/`.
Run `npm run lint:fix` to apply ESLint's available fixes. Generated build,
coverage, report, and browser-test output directories are ignored.

## Automated tests: current gap

There is no checked-in `test/` suite, automated browser runner, or coverage gate in the current repository. The existing `test:theme` script points to `test/unit/stores/theme.test.mjs`, which is absent. It is not a passing or usable suite.

The TypeScript configuration includes `test/manual` for future fixtures, and formatter scripts tolerate missing test directories. These configuration entries do not establish that tests exist. Earlier standalone dropdown/tab fixture pages are no longer checked in; use the actual playground for manual checks.

## Browser regression checklist

Run `npm run dev` and inspect `/` and `/playground`:

- Follow Playground and Template navigation and the brand link. Check translated browser titles after navigation.
- Switch themes, refresh, and check synchronization in a second tab.
- Open the language selector repeatedly, confirm English is active, and check the app frame still scrolls normally.
- Switch local and nested tabs. Confirm arrow-key wrapping, Home/End, roving focus, independent selection, and no initial panel fade.
- Check dropdown keyboard opening, enabled-item navigation, Escape focus return, selection, outside click, and wheel/touch dismissal.
- Compare button tones, variants, sizes, disabled/loading states, link examples, and typography in both themes.
- Check narrow widths: example tables scroll internally without widening the app frame. Confirm the smaller-screen frame does not imply a working mobile navigation drawer.
- Check reduced-motion settings and the console for runtime or asset-loading errors.

Controlled tabs and route tabs require a consumer/fixture to exercise those APIs; the current playground's tab showcase is not comprehensive automated coverage. Component details are in [Dropdown menus](dropdowns.md) and [Playground and tabs](playground.md).

## CI and evidence

[CI](ci.md) runs separate Formatting, Linting, and Type checking jobs, then a final `Check` gate. It does not currently run the production build, automated tests, coverage, security audits, or browser checks.

Report local checks and GitHub Actions separately. Browser smoke checks provide interaction evidence for the exercised cases only; they do not establish accessibility conformance, backend compatibility, or production readiness.
