# BayviewHub Editorial / Newsletter Portal V2 Implementation Note

This V2 pass is an operational improvement release for the existing BayviewHub editorial and newsletter system. It is not the final Mendpress architecture, does not rename public routes, and does not introduce a broad refactor.

## 1. Current editorial type enum values

The current editorial type enum values now include the active Mendpress desk set plus older legacy content types for compatibility:

- `editorial`
- `essay`
- `conversation`
- `interview`
- `audio_essay`
- `podcast_episode`
- `field_note`
- `profile`
- `invitation`
- `project_brief`
- `dispatch`

The current editorial type enum values remain internal operational content types and should not be treated as the final public-facing Mendpress section names.

## 2. Present role of `/mendpress`, editorial entries, and newsletter

- Mendpress is the public editorial and publishing destination.
- `/mendpress` is the primary public archive and reading surface for published BayviewHub editorial content.
- Legacy `/journal` URLs redirect to the matching Mendpress route so existing search and share access continues to work.
- `editorial_entries` are the Supabase-backed content records that power both the private editorial workflow and the public Mendpress output.
- `newsletter` is the distribution layer for BayviewHub updates, allowing subscribers to receive selected Mendpress pieces, invitations, and editorial updates by email.

## 3. Scope confirmation for this release

This release updates the public editorial information architecture from `/journal` to `/mendpress` while preserving existing editorial records, admin workflows, and legacy access through redirects.

It includes:

- private editorial admin usability
- public Mendpress archive behavior
- newsletter admin workflow
- subscriber visibility for admin use
- lifecycle clarity around welcome, re-subscribe, and unsubscribe behavior

It does not:

- replace the current editorial model
- introduce a broad CMS refactor
- redesign unrelated public site sections
