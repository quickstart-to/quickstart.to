# Feedback acceptance record — 2026-10-10

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

## Still required before enabling production

Real D1 binding/migration, GitHub OAuth application, Turnstile widget, admin and rate-limit secrets, exact origin and scheduled cleanup configuration. If email is enabled, a verified sender plus actual receipt/retry checks are also required. Use a separate configured preview for those checks before production enablement. The current PR does not claim production feedback, independent reader acceptance, or completed beta fact-checking.
