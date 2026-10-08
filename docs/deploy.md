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
| Non-production branch deploy command | `pnpm wrangler versions upload --config site/wrangler.jsonc` |
| Root directory | `/` |
| Node version | from `.node-version` (22) |

## Manual deploy (fallback)

```sh
pnpm deploy   # requires `wrangler login` on the maintainer machine
```

## P2 additions

D1 database, Turnstile keys, OAuth secrets and email credentials are added as Worker bindings/secrets in `site/wrangler.jsonc` and via `wrangler secret put` — never committed.
