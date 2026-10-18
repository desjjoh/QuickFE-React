# Continuous integration

[Back to README](../README.md)

`.github/workflows/ci.yml` mirrors Vue's workflow triggers and job separation,
covering formatting, linting, and TypeScript checking.

- Pull requests into `dev`, `staging`, and `main` run CI.
- Pushes to those branches, merge-queue groups, manual dispatches, and reusable
  workflow calls also run CI.
- `Linting` runs `npm run lint` after `npm ci`.
- `Formatting` runs `npm run format:check` after `npm ci`. Run `npm run format`
  locally to apply formatting. Both commands cover source, manual fixtures,
  documentation, GitHub configuration, and root configuration files using Vue's
  Prettier settings (no semicolons, single quotes, and a 100-column print width).
- `Type checking` runs `npm run type-check` after `npm ci`. The root TypeScript
  configuration includes application/manual-fixture types and Vite configuration.
- `Check` runs even when a dependency fails and accepts only `success` from all three
  jobs. Failed, cancelled, skipped, or missing results do not pass.

The workflow uses Node 22, the same action versions as Vue, npm caching,
read-only repository permissions, timeouts, and cancellation of superseded runs.
This workflow does not run builds, security audits, or tests.

## Branch rules

`.github/rulesets/protect-major-branches.json` is the importable policy copied
from Vue's live `Protect major branches` ruleset, with source-repository metadata
removed. It targets `main`, `dev`, and `staging`, including branches created later.

- Require pull requests, with zero required approving reviews.
- Require `Check` from GitHub Actions.
- Block force pushes and deletion.
- Preserve Vue's repository-admin bypass and allowed merge methods.
- Do not require up-to-date branches or restrict all updates.

The JSON file documents the policy; GitHub rulesets are configured separately in
repository settings. Adding the file alone does not enforce protection.
The workflow must be committed and pushed before GitHub can produce its checks.
