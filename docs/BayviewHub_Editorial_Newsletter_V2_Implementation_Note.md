# BayviewHub Editorial / Newsletter Portal V2 Implementation Note

This V2 pass is an operational improvement release for the existing BayviewHub editorial and newsletter system. It is not the final Mendpress architecture, does not rename public routes, and does not introduce a broad refactor.

## 1. Current editorial type enum values

The current editorial type enum values are exactly:

- `essay`
- `field_note`
- `profile`
- `invitation`
- `project_brief`
- `dispatch`

The current editorial type enum values are internal operational content types and should not be treated as the final public-facing Mendpress section names.

## 2. Present role of `/journal`, editorial entries, and newsletter

- `/journal` is the public-facing archive and reading surface for published BayviewHub editorial content.
- `editorial_entries` are the Supabase-backed content records that power both the private editorial workflow and the public Journal output.
- `newsletter` is the distribution layer for BayviewHub updates, allowing subscribers to receive selected Journal pieces, invitations, and editorial updates by email.

## 3. Scope confirmation for this release

This release does not change the public information architecture.

It only improves:

- private editorial admin usability
- public Journal archive behavior
- newsletter admin workflow
- subscriber visibility for admin use
- lifecycle clarity around welcome, re-subscribe, and unsubscribe behavior

It does not:

- rename public routes
- rebrand the system around Mendpress
- replace the current editorial model
- introduce a broad CMS refactor
