# Feedback service: first delivery

Production and the separate staging environment are explicitly configured to enable feedback; branch/PR previews stay disabled and have no reader database or credentials. The Worker still refuses submissions when any required binding or secret is missing. See [deployment environments](deploy.md#feedback-environments) and the dated [acceptance record](feedback-qa.md) for what has actually been exercised. Email remains disabled. Local tests use synthetic readers and mocked providers; they do not establish independent reader acceptance.

## Scope and architecture

Astro still builds static articles. A small Worker handles `/api/*`; unmatched non-API requests go to `ASSETS`. The first login method is GitHub OAuth with state, a browser-bound state cookie, PKCE, verified identity, and hashed server-side sessions. Email-code and Google login remain planned. No GitHub token is retained; accounts use the immutable provider ID, not an email match.

The first report types are outdated, incorrect, supplementary material and confusing. Reports default to pending visibility, regardless of links or account age. Public reports display as a list beside their original quotation; readers can relocate an unambiguous quote. General discussions, standalone highlights, reply threads, votes, trust levels, automatic heatmaps and fuzzy relocation remain later work. Missing or ambiguous text is never silently attached to a different passage.

The build generates an ignored manifest of the published article text and Git revision. Submission validates its path, revision and normalized quote/context. Request IDs prevent retry duplication; a changed payload with the same ID is rejected. Rate limits use salted, time-bucketed hashes; application records do not contain raw IP addresses. All reader mutations require a same-origin request and authenticated mutations also require the session CSRF token. Submission, login and account deletion verify Turnstile action and hostname on the server.

Admin responses explicitly label reader content as `untrusted_reader_data`; the CLI never turns that text into instructions. Resolution requires sources for updated/confirmed outcomes. An update also requires a PR in this repository, merged into `main`, verified through GitHub. Resolution, status and the mail outbox are committed in one D1 batch. Duplicate resolution requests are safe; conflicting outcomes fail. Visibility can be changed after resolution without reopening it.

## Local validation

```sh
pnpm build
pnpm check
pnpm test:feedback
pnpm test:drills
pnpm exec wrangler deploy --dry-run --config site/wrangler.jsonc
```

The feedback tests run the actual Worker and D1 migration in Miniflare. Only external provider responses are substituted, and unexpected external requests fail. Tests cover the disabled service, OAuth replay/CSRF, moderation, private/public boundaries, quote/revision mismatch, duplicate submissions, merged-PR requirements, account deletion and rate limits. The browser QA record must state which paths were actually exercised.

## Enable a deployment

Use a separate preview database and OAuth application for pre-production checks. Never bind a PR preview to the production feedback database or copy production secrets into it. Leave unconfigured previews disabled.

1. Create D1 `quickstart-feedback`, add its real `DB` binding and `migrations_dir: "migrations"` to the intended Wrangler environment, and apply `site/migrations/0001_feedback.sql` there. Export an existing database before later schema migrations; this first migration creates tables and does not drop data.
2. Register GitHub OAuth with the exact deployment origin and callback `${SITE_ORIGIN}/api/auth/callback`. Set `GITHUB_CLIENT_ID` and the secret `GITHUB_CLIENT_SECRET`. Only `user:email` is requested; repositories are not requested. Verify callback consent, cancellation, duplicate callback and account identity using a real test account.
3. Create a Turnstile widget for that hostname. Set `TURNSTILE_SITE_KEY` and secret `TURNSTILE_SECRET_KEY`. Test actual hostname/action verification, not just the widget's appearance.
4. Generate independent random secrets of at least 32 characters for `ADMIN_TOKEN` and `RATE_LIMIT_SALT`. Store them through Wrangler secrets; keep the admin token only in the operator environment as `QS_ADMIN_TOKEN`. No token belongs in a PR, command argument or research note.
5. Set `SITE_ORIGIN` to the exact HTTPS origin. Add an hourly Worker Cron (`0 * * * *`) for expiry cleanup and optional outbox delivery. Inspect a real scheduled invocation. A scheduler is not active merely because the handler exists.
6. Optionally configure a verified Resend sender with secret `RESEND_API_KEY` and `EMAIL_FROM`. The checkbox is hidden without this configuration. Send only to the verified GitHub primary email when the reporter opted in. Test actual receipt and failure handling with a consenting test account.
7. Set `FEEDBACK_ENABLED=true` only after the above checks. Submit one synthetic report clearly labeled as such, verify pending visibility, moderate it, resolve against a real merged test correction, inspect the original page and the reporter's personal result, then remove the synthetic account. Record what was tested without storing its private data.

The service also requires the admin token and salt before reporting itself enabled. Missing bindings keep the API closed and preserve static reading. Roll back availability by setting `FEEDBACK_ENABLED=false`; retain the database and outbox. Disabling does not delete reader records.

## Operator workflow

```sh
# Credentials are environment variables, never CLI arguments.
export QS_API_ORIGIN=https://quickstart.to
pnpm qs feedback pull --status open
pnpm qs feedback triage FEEDBACK_ID --status accepted --visibility public
pnpm qs feedback resolve FEEDBACK_ID --file /absolute/path/resolution.json
pnpm qs feedback notifications
```

Example resolution file (replace with actual evidence and a merged PR):

```json
{
  "outcome": "updated",
  "summary": "Describe the precise correction and verification scope.",
  "sources": ["https://responsible-authority.example/source"],
  "pr_url": "https://github.com/quickstart-to/quickstart.to/pull/123"
}
```

Use `confirmed` when the cited check supports leaving the content unchanged, and `rejected` with a concrete reason for an invalid report. Do not claim a fix before merge. Follow `.agents/skills/triage-feedback/SKILL.md` for research and content PRs. First delivery uses human-operated triage; there is no autonomous moderation or automatic content-writing loop.

Personal results remain available even if a report stays non-public. Optional email delivery leases each outbox item, retries at most five times inside its first 24 hours, and reuses an idempotency key. It does not claim delivery merely because a provider accepted a request. Inspect exhausted/pending items with the notifications command. After the retry window, investigate rather than silently sending again with a new key.

## Privacy and operations

The published `/privacy` page describes the implementation. Before production enablement, confirm actual hosting/log/backup settings match it and establish a private escalation channel if needed. Account deletion cascades through sessions, reports, resolutions and queued email. Already delivered email and third-party copies cannot be recalled. Access to the D1 database and admin token permits private-queue access and must remain restricted.

The public listing and personal listing currently return the most recent 100 reports. The complete personal export is available separately. The operator queue is paginated; process or page the queue rather than assuming the first page contains everything. No page view analytics or profiling is introduced by this service.

## References checked during implementation

- [Cloudflare static assets with a Worker](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/) — selective API routing.
- [GitHub OAuth authorization](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) — state, S256 PKCE and identity verification.
- [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) — token validation plus hostname/action checks.
- [D1 database API](https://developers.cloudflare.com/d1/worker-api/d1-database/) — transactional batch semantics.
- [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) — 24-hour retention of request keys.

Read on 2026-10-10 using ego-browser. Installed Miniflare 5 exposes the versioned `convertV4MiniflareOptions` adapter; tests use that public adapter for the Worker fixture configuration rather than relying on the older documentation's removed `createFetchMock` export.
