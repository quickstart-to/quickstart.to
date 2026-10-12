# Deployment

Fully automated via **Cloudflare Workers Builds** (Cloudflare's Git integration). No API tokens are stored in GitHub.

| Event | What happens |
|---|---|
| Push / merge to `main` | Cloudflare clones the repo, runs `pnpm build` (validate → redirects → Astro build) and `pnpm wrangler deploy --config site/wrangler.jsonc`. Live on https://quickstart.to within minutes. |
| Push to any other branch / PR | Cloudflare builds a **preview version** and posts the preview URL back to the PR. Production is untouched. |
| Validation fails | `pnpm build` exits non-zero → deploy is skipped; production keeps the previous version. |

GitHub Actions `CI` runs the same validate + build on every PR so problems show up before merge.

## Workers Builds settings (Cloudflare dashboard → Workers & Pages → quickstart-to → Settings → Build)

| Setting | Value |
|---|---|
| Git repository | `quickstart-to/quickstart.to` |
| Production branch | `main` |
| Build command | `pnpm build` |
| Deploy command | `pnpm wrangler deploy --config site/wrangler.jsonc` |
| Preview command (branches / PRs) | `pnpm wrangler preview --config site/wrangler.jsonc` (needs the `previews` block in wrangler.jsonc) |
| Root directory | `/` |
| Node version | from `.node-version` (22) |

## Confirm the live release before the next merge

A successful build check is not the final production state. After each main-branch merge, wait for its Workers Build to finish, then read `https://quickstart.to/api/feedback/config` and require `revision` to equal the merged commit. Also inspect a distinctive changed page. The config endpoint exposes the revision even while feedback is disabled. Do not merge the next release until this check passes.

On 2026-10-11, the newer `a280f27` build completed before the older `70c4410` build, and a subsequent live check returned the older revision with its older pricing page. This establishes an out-of-order release outcome; the build checks alone did not reveal it. If it recurs, inspect active build/deployment history, rebuild and deploy the current merged main commit from a clean checkout, then verify the live revision again. Do not deploy an unmerged feature branch as the repair.

Serial merges with an exact live-revision check are the current operational safeguard, not a guarantee that the provider prevents stale deployments. Before allowing concurrent releases, add and verify deployment ordering or stale-build protection in the hosting pipeline; a pre-deploy revision check alone can still race with another deployment.

## Domains

| Host | Behavior |
|---|---|
| `quickstart.to` | Worker custom domain (production). |
| `www.quickstart.to` | Proxied placeholder A record `192.0.2.1` + Redirect Rule "www → quickstart.to (301)": `*://www.quickstart.to/*` → `https://quickstart.to/${2}`, query string preserved. |
| `*.workers.dev` | Production `workers_dev` is off. Branch/PR previews are on (`preview_urls: true`): `<branch>-quickstart-to.rewriteso.workers.dev` and `<deployment-id>-quickstart-to.rewriteso.workers.dev`. The setting is applied by the production `wrangler deploy`, not by preview builds. |

## Repository settings

- Branch protection on `main`: PR required, CI `build` must pass, conversations resolved, no force-push/deletion. Admins can bypass in emergencies.
- Required approvals: **0 for now** — the agent currently runs as the maintainer account (`linheitu`), which cannot approve its own PRs. The maintainer reviews by merging. Raise to 1 once the dedicated `quickstart-to-agent` machine account exists.
- Repository variable `AGENT_ACTORS = linheitu,quickstart-to-agent` (used by `guard-content`). Remove `linheitu` once the machine account is active.

## Manual deploy (fallback)

```sh
pnpm deploy   # requires `wrangler login` on the maintainer machine
```

## Feedback environments

`site/wrangler.jsonc` declares two independent D1 bindings. Database IDs and OAuth client IDs are public configuration; credentials are Worker secrets and never committed.

| Deployment | Database | OAuth callback | Availability |
|---|---|---|---|
| Production (`--env ''`) | `quickstart-feedback` | `https://quickstart.to/api/auth/callback` | Controlled by the top-level `FEEDBACK_ENABLED` |
| Staging (`--env staging`) | `quickstart-feedback-staging` | `https://quickstart-to-feedback-staging.rewriteso.workers.dev/api/auth/callback` | Real-provider acceptance; synthetic reports only |
| Branch/PR preview | None | None | Always disabled in `previews.vars` |

Production and staging have separate GitHub OAuth apps, hostname-bound managed Turnstile widgets, admin tokens and rate-limit salts. Neither has email sending configured. Preview bindings come from the `previews` block, not the production bindings; do not add production credentials through the dashboard's preview base configuration or `wrangler preview secret`.

On a machine with multiple Cloudflare accounts, set `CLOUDFLARE_ACCOUNT_ID` to the account owning this project's Worker before running Wrangler. Keep that operator setting outside the repository.

```sh
# Build once before deploying the separate staging Worker.
pnpm build
pnpm exec wrangler d1 migrations apply quickstart-feedback-staging --remote --env staging --config site/wrangler.jsonc
pnpm exec wrangler deploy --env staging --config site/wrangler.jsonc

# Production schema migrations are explicit; Workers Builds does not run them.
pnpm exec wrangler d1 migrations apply quickstart-feedback --remote --env '' --config site/wrangler.jsonc
```

Both databases received `0001_feedback.sql` on 2026-10-11. Later migrations require an export and a deployment plan. Both environments declare hourly cleanup; acceptance of actual scheduled execution is recorded separately in [feedback QA](feedback-qa.md).

After adding or changing a Cron Trigger, allow for propagation before diagnosing a missed invocation: Cloudflare documents up to 15 minutes ([Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/), read 2026-10-11). For staging acceptance, insert uniquely named synthetic expired session/OAuth/rate-limit rows and matching unexpired controls, observe a real scheduled invocation, then confirm only the expired rows disappeared. A temporary faster staging schedule can shorten this check; restore the committed hourly schedule afterward and remove remaining synthetic fixtures. Keep any live tail private and retain only the invocation outcome and aggregate counts in the acceptance record.

Workers observability and Logpush are explicitly disabled in the deployment configuration. Temporary operator tails can still contain request metadata and must remain private. The production D1 dashboard showed a 30-day Time Travel window on 2026-10-11; the privacy page states that dated configuration and does not promise immediate erasure of historical copies. Re-check the published statement when changing the hosting plan or backup settings.

## Feedback activation and rollback

Prepare activation in the existing engineering PR after real staging cleanup passes. Setting `FEEDBACK_ENABLED=true` in that PR is a proposed release configuration; production remains closed until the reviewed PR is merged and its exact revision is deployed. Keep content PRs separate and serialize releases using the live-revision check above.

Before merge, require the dated staging acceptance record, passing CI, independent production OAuth/Turnstile configuration, all five required production secrets, applied D1 migrations and a production dry-run with the production database. The OAuth callback must be exactly `https://quickstart.to/api/auth/callback`; the production Turnstile widget must allow `quickstart.to`. These configuration checks do not replace the following production smoke test.

After merge and deployment:

1. Require the live config revision to equal the merged commit, `enabled=true`, the production site key and `email_enabled=false`. Inspect reading and `/privacy` as well as the feedback controls. Branch/PR previews must still return disabled configuration and have no database binding.
2. In ego-browser, use a consenting test account for real GitHub login and Turnstile submission. Label the report as a synthetic acceptance test; verify pending visibility and its personal result. Exercise operator triage/resolution against an already merged PR, stating explicitly if that PR predates the test report. Do not claim a reader-triggered correction.
3. Export and delete the synthetic account through the real interface. Confirm only its account, sessions, reports, resolutions and outbox rows are gone; do not delete unrelated reader data. Record aggregate outcomes without account details or credentials.
4. Observe production's hourly scheduled execution after activation. Check that overdue session/OAuth/rate-limit rows are removed and live controls survive, using uniquely named synthetic fixtures. Retain only invocation outcomes and scoped counts. A successful invocation while feedback is disabled is insufficient: `maintenance()` returns without work unless the full feedback configuration is ready.

If the live revision, provider flow, privacy boundary or cleanup check fails, close feedback promptly by deploying the current merged revision with `FEEDBACK_ENABLED=false`, then require the config endpoint to report disabled and `/api/me` to return 503. Keep static reading available and retain D1 data; never roll back by dropping the database. Record the temporary override and prepare the matching reviewed configuration change before the next deployment. With feedback disabled, maintenance is also inactive; resume and verify overdue cleanup when restoring the service.

Scheduled deletes already select all expired records, so a later successful run can recover overdue cleanup and repeat runs leave live records intact. This is recovery behavior, not evidence that Cron never misses a run. During activation acceptance, inspect Cron history and overdue counts; no automatic missed-run alert is currently installed. Email stays unavailable until a sender and actual delivery/retry acceptance are separately completed.

## Formal annotation upgrade

The merged PR #15 adds `0002_annotations.sql`. Follow [the annotation release gates](annotations.md#upgrade-and-release-gates): export D1 privately before each remote migration, test staging first, then apply the additive production migration before deploying the reviewed merged Worker. Preserve the new tables on application rollback; the previous Worker continues to use the untouched original tables. No remote migration or feature activation is established by a passing PR preview, which intentionally has no feedback database.

On 2026-10-12, the separate staging database received `0002_annotations.sql` after a private export; real-provider annotation acceptance and final staging revision `66f50be` are recorded in [annotation QA](annotations.md#real-provider-staging-acceptance--2026-10-12). Production was subsequently exported privately and migrated; before/after original business tables compared identically (all empty). PR #15 merged as `f017313`; the exact live revision and production annotation writes/export passed. Final account deletion is waiting for an interactive Turnstile challenge, as recorded in annotation QA. Screenshot visual QA passed after two UI fixes; synthetic screenshot evidence is linked in the annotation record.
