# Deployment and operations

[Back to README](../README.md)

## Build and local preview

```sh
npm ci
npm run build
npm run preview
```

`build` runs TypeScript checks and writes the static application to `dist/`. `preview` serves that build locally on HTTP port 8080 with a strict port requirement. It is a local verification tool, not a production hosting configuration.

## Static hosting requirements

Deploy the complete `dist/` output to a static host. React Router uses browser history: requests for application routes such as `/playground` must fall back to `index.html`. Existing static assets must still resolve directly.

The app currently assumes root hosting. Vite has no custom `base`, the browser router has no `basename`, and public asset paths such as `/fonts/google/...` and `/assets/flags/...` are root-relative. Hosting under a subdirectory requires a coordinated configuration and asset-path change before deployment.

Preserve the fonts, flags, favicon, and other public assets copied into `dist/`; deploying JavaScript and CSS alone is insufficient. Configure cache behavior in the host. Public filenames are not all content-hashed, so do not apply immutable caching to every public asset indiscriminately.

No application API environment variables, database migrations, or backend startup steps are required for the current UI starter. Future integration must define its build-time configuration and origin/cookie requirements explicitly.

## Current operational boundary

No Docker image, nginx configuration, deployment workflow, production health endpoint, or rollback procedure is checked in. Choose and document the deployment target before adding provider-specific instructions.

CI currently checks formatting, lint, and types only. Run the production build separately and smoke-test direct route loads, refreshes, assets, themes, dropdowns, and narrow-screen scrolling on the target host. See [Testing](testing.md) and [Technical backlog](backlog.md).
