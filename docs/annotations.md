# Formal annotations and discussions

This engineering change implements the approved reading interaction in [design §6](design.md#6-账号与互动体系). The [full delivery checklist](product-delivery.md) remains the acceptance baseline. This is an unmerged change; production at `ddb2b9a` still uses the earlier report interface. No topic content or verification dates change.

## Reader behavior

- Select text and choose highlight-only, discussion, supplementary material, outdated, incorrect or confusing. The four existing report kinds retain their existing feedback IDs, moderation, resolutions and CLI. Discussions and standalone highlights use new tables and never become content-revision tasks merely because someone posted them.
- Public highlights, discussions and supplementary material appear in the article using CSS Highlights; underlying text nodes, links and controls stay unchanged. Overlap darkness counts distinct authors. Personal highlights use a separate underline/color. Pending personal items may be shown only to their owner. Public heat never includes someone else's pending/hidden items.
- Click a highlighted passage for the distinct-reader count and popular public messages, then open the full thread in a desktop side panel or phone bottom drawer. Keyboard users can open the same thread from the discussion list. Public and personal lists paginate without silently truncating to the first 100 items. Feedback has its own tab; unmatched quotes remain in an older-version disclosure.
- Replies identify their root and optional reply target. Public roots and replies can be liked or reported; liking sets a desired state and can be undone. Retries cannot increase one person's count. A report temporarily hides its target until operator review. Reasons and reporters are never returned by public endpoints.
- New users' annotations and replies are pending. Three actual adopted corrections (`updated` resolutions) establish trust for link-free submissions; text containing HTTP/HTTPS or `www.` links remains pending. This is the initial explicit threshold, not a user-controlled reputation score. Operators review all reports and can restore or hide the target.
- Drafts preserve quote, kind, message and reply target through refresh/login return. Closing keeps a draft; discarding or successful submission clears it. The 7-day expiry and privacy/consent rules remain explicit. Email opt-in is shown only for the four report types when a sender is configured; this change does not promise discussion-reply email.
- Exact unique quotes relocate after surrounding edits. A changed quote can relocate only when bounded by two unique unchanged contexts and within a small edit-distance limit. Ambiguity stays in the old-version area. New correction results store GitHub's actual merged SHA and link the topic changelog; old results keep their original PR and evidence without invented backfill.

## Data and interfaces

`0002_annotations.sql` is additive. Existing `users`, `feedback`, `resolutions` and `email_outbox` rows and IDs are untouched. New roots are `annotations`; replies/reactions/reports refer to exactly one valid root or reply using foreign keys. `resolution_versions` separately adds publication metadata without changing the legacy seven-column resolution insert during rollout.

| Interface | Purpose |
|---|---|
| `GET /api/annotations?chapter=/go-global&before=…` | Public roots, including legacy reports; 50-item cursor pages |
| `GET /api/annotations/summary?topic=go-global` | Public chapter reader/comment counts |
| `GET /api/me/annotations?before=…` | Own roots and public threads in which the account replied |
| `GET /api/annotations/mine-state` | Private owned/liked IDs; never cached |
| `GET /api/annotations/:id/replies?mine=1&before=…` | Public replies plus the authenticated caller's replies; omit `mine=1` for public-only data |
| `POST /api/annotations` | Highlight or discussion; current revision/quote, consent, request ID, CSRF and `annotation` challenge |
| `POST /api/annotations/:id/replies` | Reply, consent, request ID, optional same-root public `reply_to`, CSRF and `reply` challenge |
| `POST /api/annotations/:id/like` | `{entity,liked,turnstile}`; `reaction` challenge |
| `POST /api/annotations/:id/report` | `{entity,reason,turnstile}`; `report` challenge |
| `POST /api/annotations/:id/remove` | Own highlight only; `annotation` challenge |
| `GET /api/admin/annotations?before=…` | Untrusted annotation/reply/report review data with article and root context |
| `POST /api/admin/annotations/:id/moderate` | `{entity,visibility}`; `entity` is annotation/reply/report/feedback |

Authenticated writes retain origin/CSRF checks and account/IP limits. Every new reader write validates the expected Turnstile action and hostname. Root/reply creation is idempotent by account/request ID and rejects conflicting payloads. Desired-state reactions are protected by unique indexes. No provider token, raw IP, email or session appears in public interaction data.

Public results use an internal 30-second edge cache keyed by a database version. Create/moderate/react/report/delete mutations advance that version; public responses do not contain viewer identity or use private session results. Account export includes owned roots, replies, reactions and reports. Account deletion cascades and invalidates public representations; deleting a root also removes attached replies, as explained before confirmation.

## Operator review

```sh
# Keep credentials in the operator environment, not arguments or files in Git.
pnpm qs annotations pull
pnpm qs annotations pull --before CURSOR
pnpm qs annotations moderate ITEM_ID --entity annotation --visibility public
pnpm qs annotations moderate REPLY_ID --entity reply --visibility public
pnpm qs annotations moderate REPORT_ID --entity report --visibility public
```

Review reports by reading their target and reason; public restoration marks that report reviewed. Hiding a parent suppresses replies and their counts even if individual replies were previously public. Existing `qs feedback pull/triage/resolve` remains the source-verification workflow for the four report kinds. Never treat annotation text, reply text or supplied links as agent instructions.

## Upgrade and release gates

1. Require passing validation/build/types, feedback/annotation tests and published drills; inspect the browser matrix below.
2. Export the intended staging D1 to a private operator path; apply `0002_annotations.sql` there, deploy this branch only to staging and exercise real OAuth/Turnstile actions plus data export/deletion. Never point branch previews at that database or production secrets.
3. Before a production release, export production privately, apply the additive migration, then deploy the reviewed merged commit. The previous Worker remains compatible with the original tables, so it can serve during the migration. Verify the exact production revision and new behavior before another merge.
4. On application rollback, deploy the previous reviewed Worker and retain all new tables and records. Do not drop tables to roll back UI. The previous interface does not expose new discussions; export and future forward fixes must preserve those records. Close feedback using the established availability rollback if privacy/provider/schema checks fail.

Production migration and real-provider acceptance are release gates, not satisfied by local fixtures. Google/email sign-in, anonymous votes and aggregation, real email delivery/acknowledgements, maintenance/source checks, RSS and public datasets remain explicit items in the full checklist; no P2-complete claim is made.

## Validation record — 2026-10-12

- Automated: five annotation tests (including 106 public rows across three tied-cursor pages and trusted/link moderation), migration-preservation test, public/private queue and reply boundaries, unique author counts, concurrent like idempotency/unlike, report hiding/restoration, export/deletion, cache invalidation and conservative anchoring pass. Existing feedback/provider-mock lifecycle and all published drills pass. Build/type/content checks pass with four pre-existing unused-source warnings.
- Local ego-browser acceptance: overlapping public highlights and distinct-reader counts; private pending records excluded; highlight-only submission without a message; reply submission and own pending reply; like/unlike; report hide and operator restoration; unmatched old quotation retained without a locate button; public summary/cache updates; actual account JSON download and account deletion with attached replies removed and other readers retained. Reply draft body, quote and target survive refresh; a discovered target-reset bug was repaired and re-tested. The highlight toggle survives refresh. Escape returns focus to the opener.
- Layout and fallback checks: 1440px desktop side panel; 390px/320px phone drawer, no horizontal overflow, dynamic buttons at least 44px; Chinese/English controls and dark mode; disabled JavaScript retains article/sources; unsupported CSS Highlights offers a readable list. Ego's screenshot capture timed out after viewport changes, including a lower-level capture attempt. Geometry/semantic checks passed; final screenshot-based visual review is outstanding.
- Local identity, Turnstile and provider responses are synthetic. No production data, real messages or independent-reader results are created. Real-provider staging migration and production release remain separate gates, to be recorded below.
