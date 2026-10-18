# Technical backlog

[Back to README](../README.md)

This records visible gaps in the current React starter, not a commitment to port every Vue feature. Discuss the next area and its boundaries before implementing architectural changes.

## Verification

- Replace or remove the stale `test:theme` script; its target file is missing.
- Establish focused automated tests for consequential tab, dropdown, theme, and locale behavior.
- Decide when production builds and browser checks should join CI; neither currently runs there.
- Restore dedicated interaction fixtures only if they are maintained with the component APIs. The old fixture URLs are not available.

## Application frame and components

- Port mobile navigation when its scope is agreed; the current smaller-screen frame only centers the brand.
- Replace placeholder navigation destinations as their actual pages are implemented.
- Expand playground coverage alongside supported component behavior. It currently covers buttons, icon buttons, button links, links, dropdowns, tabs, and typography, rather than the full Vue component library.
- Add additional locales only when their translations and assets are ready. English is currently the sole locale.

## Integration and operations

- Agree on the QuickAPI client/model/feature boundaries before adding backend integration. See [API contracts](api-contracts.md).
- Define environment configuration, deployment target, route fallback, cache policy, and rollback procedures before the first hosted release.
- Establish a font asset update workflow: generated font declarations reference a downloader that is not included in this repository.
- Consider declaring the supported Node version explicitly in project configuration; CI currently selects Node 22.

Documentation of an importable GitHub branch policy is not confirmation of the repository's live ruleset. Verify saved GitHub settings when changing branch protection; see [CI](ci.md).
