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

Workers observability and Logpush are explicitly disabled in the deployment configuration. Temporary operator tails can still contain request metadata and must remain private. The production D1 dashboard showed a 30-day Time Travel window on 2026-10-11; the privacy page states that dated configuration and does not promise immediate erasure of historical copies. Re-check the published statement when changing the hosting plan or backup settings.
