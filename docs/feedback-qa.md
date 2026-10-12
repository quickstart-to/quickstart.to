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

### Support follow-up

With explicit maintainer authorization, a diagnostic request was submitted to Cloudflare support on 2026-10-11 asking why no `scheduled` invocation or D1 effect was observed beyond the documented propagation window, despite the deployed handlers and schedule records. The portal confirmed submission. In the reply read on 2026-10-12, support said the observation matched a known missed-invocation pattern and that a scheduler recovery improvement had been deployed; engineering reliability work continues. This is support's explanation, not an independently established account-specific root cause. The private case receipt and correspondence stay outside Git.

## Scheduled-cleanup repeat acceptance — 2026-10-12

**Passed on staging.** Kept the existing Worker name and version `a8c98996-f13a-40ef-8443-3758878b5632`; no alternate handler or HTTP cleanup endpoint was deployed. Prior hourly Cron history already showed successful runs, but deletion was verified independently as follows. All times below are UTC on 2026-10-12.

- Inserted one synthetic user and six uniquely named fixture rows: expired and unexpired controls in each of `sessions`, `oauth_states` and `rate_limits`. Direct D1 reads confirmed all six existed before testing. The expired rows were one hour overdue and controls had one day remaining.
- Temporarily changed only staging's schedule to `* * * * *` and connected a private live tail. At **01:14:20.025**, the real scheduled invocation returned `ok`, with zero exceptions. D1 then showed **expired=0 / control=1 in all three tables**. Cron history also displayed this invocation as successful.
- At **01:15:38.430**, another scheduled invocation returned `ok`, with zero exceptions. A subsequent D1 read confirmed all three controls still existed. This verifies that repeating cleanup preserves live records.
- Changed only the three synthetic controls' expiry to the past; direct reads confirmed the changed expiry. At **01:16:19.950**, the next scheduled invocation returned `ok`, with zero exceptions. All three fixture-table counts then became **0** without manual deletion of those rows. This verifies cleanup after previously live records expire.
- Restored `0 * * * *` through Wrangler and confirmed **Every hour** in the dashboard, with the next event at 02:00 UTC. Manually removed only the remaining synthetic user after the automatic-deletion assertions. Final counts for users, sessions, feedback, resolutions and outbox were all zero; all six fixture keys were absent. Stopped the tail and removed raw private tail files, retaining only sanitized outcomes outside Git. Persisted Workers Logs and Logpush were not enabled.

Added a local regression exercising the same three tables, repeated invocation, live-record preservation, later expiry and retained parent account. All six feedback tests, Astro/Worker type checks, build and six local published drills passed; the build retained four existing unused-source warnings. Local results support the remote acceptance but do not substitute for it. Three observed successful invocations do not establish a guarantee against future missed runs or an automatic monitoring service.

### Production release preparation

The production OAuth app's client ID matches the proposed configuration; its sole callback is `https://quickstart.to/api/auth/callback`. Its separate managed Turnstile widget allows only `quickstart.to`. Wrangler confirms the five required production secret names and no pending D1 migrations. Production and staging dry-runs use their respective databases. These checks do not claim production login or challenge success.

The proposed production configuration now sets `FEEDBACK_ENABLED=true`, while branch/PR previews remain disabled with no database. At the pre-release live check, production still returned revision `a280f27834d517aba0d4de5251f8593afb9668e6`, `enabled=false`, null site key and email disabled. Production account/report/session/resolution/outbox counts were zero. No unmerged activation configuration was deployed.

Remaining release work: review/merge the engineering PR, verify its exact live revision, then perform the real production account/report/export/delete smoke test and production scheduled-cleanup check using the [activation and rollback procedure](deploy.md#feedback-activation-and-rollback). Email and independent reader acceptance remain separate, uncompleted gates.

## Production activation and acceptance — 2026-10-12

Merged [PR #11](https://github.com/quickstart-to/quickstart.to/pull/11) at 01:51:03 UTC. Main-branch CI and the Cloudflare production build passed. The live config returned the exact merged revision `f934b24f95721ef0d61e3b90d24f4da2d5e42f3b`, `enabled=true`, the production Turnstile site key and `email_enabled=false`. Inspected the live quickstart and privacy page; reading remains available. PR #12 remains unmerged.

Used ego-browser and the actual production providers for an explicitly synthetic acceptance report:

- Completed the login Turnstile challenge and GitHub identity/email authorization. GitHub's authorization button required a human browser interaction; after the maintainer authorized, the real PKCE callback returned to production with the account authenticated and the saved draft restored.
- Completed a new submission challenge and submitted the report with consent and a 91-character paragraph quotation. It appeared in the personal list as pending; the public list contained zero reports before moderation.
- Retrieved the report using the actual operator CLI, published it and resolved it against already merged PR #11. The personal view displayed the result and PR link. “定位原文” selected the complete original 91-character paragraph. The synthetic resolution explicitly states that PR #11 predates the report and does not represent a reader-triggered correction.
- Downloaded the actual JSON export through account settings. It contained the account fields and exactly the synthetic report, quotation, resolved status and PR #11 link. Removed the downloaded personal-data copy after checking it.
- Completed the separate deletion challenge and used the real deletion interface. The page reported deletion, `/api/me` became anonymous and the public list returned to zero. Scoped D1 reads confirmed zero remaining test-account, session, report, resolution and outbox rows. No unrelated reader records were deleted.

The production schedules API reports the hourly trigger was created at **01:52:05.545819 UTC**. At 02:03 UTC, the private live tail had no scheduled event and all three overdue fixture rows remained alongside their live controls. The 02:00 slot was only eight minutes after trigger creation, within the documented propagation window; this is not a passed cleanup check or an established dispatch failure. The production frequency remains `0 * * * *`; the next acceptance slot is 03:00 UTC. Synthetic cleanup fixtures remain in place for that observation.

Production scheduled cleanup remains pending. Email delivery, independent reader acceptance and content beta promotion are separate, uncompleted gates.

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
