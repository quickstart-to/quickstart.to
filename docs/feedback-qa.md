# Feedback acceptance record

## Real-provider staging — 2026-10-11

Provisioned separate production/staging D1 databases and applied `0001_feedback.sql` to each. Registered separate organization-owned GitHub OAuth apps with exact callbacks and separate managed Turnstile widgets with one hostname each. Generated independent admin tokens and rate-limit salts; credentials are stored outside Git and uploaded as Worker secrets. Email remains unconfigured.

On `quickstart-to-feedback-staging.rewriteso.workers.dev`, used ego-browser and the actual providers to:

- Select a complete paragraph and write an explicitly synthetic report. Cancel GitHub authorization, return to the article and recover the draft and quote.
- Authorize identity/email access, return through the PKCE callback and recover the draft. Complete a new Turnstile challenge and submit; the report appeared only in the personal list, with zero public reports.
- Use the actual operator CLI to retrieve, publish and resolve the report. The Worker verified the real merged state of PR #10 through GitHub. Repeating resolution returned the same result.
- Observe the resolution and PR link in the personal view, relocate the original quote, and export the account/report as JSON.
- Complete the deletion challenge and delete the synthetic test account. Public results returned to zero; the session became anonymous. Direct D1 counts confirmed zero users, sessions, reports, resolutions and outbox rows.

The synthetic resolution explicitly says PR #10 predates the test report. This verifies the integration, not a reader-triggered correction. No independent reader acceptance, email receipt, real payment integration or full accessibility audit is claimed.

`pnpm build`, `pnpm check`, all five Worker/D1 lifecycle tests and all six published drills passed. Production and staging dry-runs resolved to different D1 bindings. Actual scheduled cleanup and production smoke checks remain pending in this record.

## Local validation — 2026-10-10

## What was exercised

- `pnpm build`: 31 static HTML pages and a manifest for 27 article bodies; four existing unused-source warnings, no new content validation errors.
- `pnpm check`: Astro and Worker types pass.
- `pnpm test:feedback`: actual Worker + D1 migration, synthetic identities and substituted external provider responses. Covered disabled configuration, OAuth state/browser binding/replay, PKCE parameters, logout, same-origin/CSRF checks, quote/version/consent rejection, wrong Turnstile hostname/action, per-user limits, private/public separation, idempotent submission/resolution, unmerged PR rejection, export and cascading account deletion. The email test exercises provider failure, retained outbox, retry success and no additional send after acceptance.
- `pnpm test:drills`: existing payment delivery, measurement, API job, credential rotation and infrastructure exercises pass. These are local synthetic exercises, not provider integration tests.
- `wrangler deploy --dry-run`: Worker and static assets bundle successfully with feedback disabled; no production deployment was performed.
- `pnpm review:due`: no metadata-overdue pages as of 2026-10-10. This did not check remote links or revisit the sources.

## Browser and operator path

Used ego-browser with `node scripts/feedback-preview.mjs` on localhost. The browser used a synthetic session and a local test Turnstile stub; no actual GitHub consent, real challenge or external email occurred.

Selected the entire first paragraph in the quickstart, opened the feedback dialog, filled a report, consented and submitted. It appeared in the personal list with pending visibility. The actual `pnpm qs feedback pull`, `triage` and `resolve` commands retrieved it, published it and added a clearly labeled synthetic confirmed result. The browser then displayed the original quotation and official reply; “定位原文” selected and scrolled to the exact paragraph.

The first selection check found that element-boundary ranges (for example a whole paragraph) were ignored. The implementation now computes offsets from cloned ranges, with the same source/script exclusions as the manifest, and the repeated browser submission succeeded. Selection also exposes a floating action, so a reader does not have to scroll to the end of a long chapter to open the form.

Inspected the dialog at 390 × 844 and 1440 × 1000, including screenshots. There was no horizontal page overflow; the narrow dialog scrolls within the viewport and the quote has a bounded scroll area. Escape closes the native modal. The receipt and personal result were observed after submission. These checks do not establish a full accessibility audit or real-device coverage.

## Original local-only release gate

The initial release required real D1 binding/migration, GitHub OAuth application, Turnstile widget, admin and rate-limit secrets, exact origin and scheduled cleanup configuration. Progress on those gates is recorded above. If email is later enabled, a verified sender plus actual receipt/retry checks are still required. Local synthetic tests do not establish production feedback, independent reader acceptance or completed beta fact-checking.
