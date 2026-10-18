# API contracts

[Back to README](../README.md)

## Current status

QuickFE-React does not currently contain an HTTP client, backend DTOs, authentication flows, or QuickAPI endpoint adapters. The template and playground work without a backend. There is no configured API base URL or supported API environment-variable contract yet.

Vue and NestJS documentation are references for future integration, not evidence that the React application implements those contracts:

- [QuickFE-Vue3 API contracts](https://github.com/desjjoh/QuickFE-Vue3/blob/dev/docs/api-contracts.md)
- [QuickAPI-NestJS API contracts](https://github.com/desjjoh/QuickAPI-NestJS/blob/dev/docs/api-contracts.md)

## Before adding integration

Compare the frontend requirement with the current backend controllers and DTOs. Discuss the intended adapter/model boundaries before implementation, then document the supported environment settings, authentication/cookie behavior, request/response models, and error handling alongside the feature.

Verify mutation-specific concurrency and idempotency behavior against the backend rather than inferring it from Vue components. Record actual endpoint support and verification results when adapters are added. Do not treat an independent frontend build as proof of backend compatibility.
