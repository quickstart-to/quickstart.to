# Delivery status and next acceptance

Updated 2026-10-11. This document replaces the early handoff draft; detailed content evidence remains in the topic's research notes.

## Current release boundary

- Production has one draft topic, a quickstart and 26 chapters. The last whole-book review distinguishes source verification, editorial repair and technical QA; it does not establish independent reader acceptance.
- The first feedback implementation adds GitHub login, quoted reports, moderation, evidence/PR-linked resolution, personal results, optional email, export and deletion. It stays disabled until production resources and real-provider checks are complete; see [feedback operations](feedback.md).
- PRs #9 (feedback) and #10 (subscription recovery and beta scope) are merged. CI and the main Cloudflare build passed for `a280f27`.
- CI runs content/build checks, types, typography, feedback lifecycle tests and existing published drills. The weekly review workflow is installed on `main`; its first manual run [38068409515](https://github.com/quickstart-to/quickstart.to/actions/runs/38068409515) succeeded with zero metadata-overdue pages as of 2026-10-11. It does not check external link reachability, research sources or modify content. A successful manual run is not evidence of a scheduled invocation.
- The first reader round and beta promotion are still pending. Do not promote based on a passing build or this status document.

## Next acceptance work

1. Content: the finite beta scope, T1–T6 reader protocol and local subscription recovery exercise are published in PR #10. Re-check the core route's claims and apply its editorial gates; keep the topic in draft until those pass. Provider payment integration remains outside the completed local exercise.
2. Engineering: complete configured preview and production feedback checks, then handle a real report through research, a topic PR, merge, reply and notification. Content and unrelated engineering use separate PRs.
3. Readers: recruit approximately 5–8 target readers with permission, record what they can actually complete and where they stop, and prioritize concrete repairs. Do not manufacture interviews or treat synthetic test submissions as reader evidence.
4. Maintenance: inspect the first scheduled due-date report, arrange source checking and the review cadence, then assess stable status only after a real feedback/review cycle.

The second topic, full highlight heatmaps, more regional/platform branches and PDF/ePub exports remain later work. Scope can change based on reader findings rather than the number of completed chapters.
