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

`pnpm build`, `pnpm check`, all five Worker/D1 lifecycle tests and all six published drills passed. Production and staging dry-runs resolved to different D1 bindings. The actual PR preview deployment for `b698b3f` exposed only `ASSETS` and `FEEDBACK_ENABLED=false` in Cloudflare's deployment binding list; its config endpoint returned disabled and `/api/me` returned 503. Actual scheduled cleanup and production smoke checks remain pending in this record.

## Production reading release — 2026-10-11

A final live check found `revision=70c4410` and no S-02 example, even though the main-branch `a280f27` build had passed. GitHub's Cloudflare checks completed at 16:37:14 UTC for `a280f27` and 16:37:56 for the older `70c4410`; the deployed version at 16:45:42 was a subsequent secret-triggered version of that older release. The observed outcome was an older release replacing the current main build.

Built the exact merged main commit `a280f27834d517aba0d4de5251f8593afb9668e6` in a clean, temporary worktree and deployed it with feedback disabled. Validation/build passed with the same four existing warnings. Production version `10d48815-76c3-434e-8486-32a6b87ce20c` then returned that exact revision, `enabled=false`, a null site key and email disabled; the pricing page contained S-02 and its subscription-recovery drill returned HTTP 200. No unmerged provider configuration or content fact-check branch was deployed.

This verifies the reading release and disabled feedback state, not production login/submission. See [deployment ordering safeguards](deploy.md#confirm-the-live-release-before-the-next-merge) for the current serial-merge procedure and remaining pipeline limitation.

## Scheduled-cleanup investigation — 2026-10-11

Production feedback remains disabled in both the live deployment and this PR configuration. Successful HTTP/provider tests do not satisfy the cleanup gate.

All times below are UTC on 2026-10-10 (the local acceptance date is 2026-10-11):

- Staging version `a8c98996-f13a-40ef-8443-3758878b5632` was deployed at 16:50:19. Cloudflare's version API lists both `fetch` and `scheduled`; the runtime has the staging D1 binding, complete feedback configuration and no email sender.
- After the hourly schedule did not produce an observed invocation, changed staging only to `* * * * *`. The schedules API reports creation/modification at 17:04:53.818695. The dashboard also displays every minute.
- Inserted uniquely named, synthetic expired OAuth and rate-limit rows plus an unexpired control. At 17:36:30, both expired rows and the control remained. A connected private live tail recorded 21 HTTP events and no scheduled events. The HTTP configuration endpoint remained ready. This is stronger evidence than an empty Cron history alone.
- Created a temporary independent Worker, `quickstart-to-cron-check`, with no assets, HTTP handler, secrets or feedback code. Its sole `scheduled` handler increments one synthetic counter in staging D1. Version `36727de9-d75d-4253-8922-de5c882d3b85` exposes only `scheduled`; its DB binding was confirmed. Its every-minute schedule was saved at 17:24:20.294047.

- At 17:40:25 (more than 35 minutes after the staging schedule change and 16 minutes after the probe schedule was saved), the expired/control counts were still `1 / 1 / 1`, the probe counter was absent, and neither private tail had a scheduled event. The result is **not passed**; neither successful automatic invocation nor automatic deletion was established.
- Restored staging to `0 * * * *` at 17:40:39.196438 and confirmed it through the schedules API. Deleted only the temporary probe Worker, then manually removed the three synthetic fixture keys; staging users, sessions, reports and those fixture counts were zero. This manual test-data cleanup is not acceptance evidence. Stopped private tails and removed their files and temporary credential copies; durable operator configuration remains outside Git.

Cloudflare's [Cron Triggers documentation](https://developers.cloudflare.com/workers/configuration/cron-triggers/) was read in ego-browser on 2026-10-11: schedule changes can take up to 15 minutes to propagate, and a newly created Worker's past-event display can take up to 30 minutes. The D1 fixtures and private tail are therefore checked independently of the dashboard history. No dispatch root cause has been established; do not label this a Cloudflare-wide outage or claim manual deletion as scheduled cleanup.

### Next diagnostic step

Ask Cloudflare support to inspect dispatch for the two saved schedules and versions above. The narrow question is why no `scheduled` invocation or D1 effect was observed beyond the documented propagation window, despite the deployed handlers and schedule records. Supply the minimal scheduled-only reproduction if requested; do not send credentials, account exports or raw HTTP tails. No support message has been sent.

After dispatch is understood, repeat the expired/unexpired fixture test and require both a successful real scheduled invocation and the expected D1 difference. Only then enable production feedback, verify the independent production OAuth/Turnstile setup and run the synthetic account/report/export/delete smoke check. Production activation is still pending.

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
