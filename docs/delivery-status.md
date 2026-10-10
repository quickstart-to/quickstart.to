# Delivery status and next acceptance

Updated 2026-10-10. This document replaces the early handoff draft; detailed content evidence remains in the topic's research notes.

## Current release boundary

- Production has one draft topic, a quickstart and 26 chapters. The last whole-book review distinguishes source verification, editorial repair and technical QA; it does not establish independent reader acceptance.
- The first feedback implementation adds GitHub login, quoted reports, moderation, evidence/PR-linked resolution, personal results, optional email, export and deletion. It stays disabled until production resources and real-provider checks are complete; see [feedback operations](feedback.md).
- CI runs content/build checks, types, typography, feedback lifecycle tests and existing published drills. The weekly review workflow produces a due-date artifact and job summary after it is merged and runs. It does not check external link reachability, research sources or modify content.
- The first reader round and beta promotion are still pending. Do not promote based on a passing build or this status document.

## Next acceptance work

1. Content: publish a finite beta scope and task-based reader protocol in `topics/go-global/research/`; deepen recurring payment and delivery recovery, with traceable current rules and a bounded worked lifecycle. Keep the topic in draft until its core fact-check/editorial gates are met.
2. Engineering: complete configured preview and production feedback checks, then handle a real report through research, a topic PR, merge, reply and notification. Content and unrelated engineering use separate PRs.
3. Readers: recruit approximately 5–8 target readers with permission, record what they can actually complete and where they stop, and prioritize concrete repairs. Do not manufacture interviews or treat synthetic test submissions as reader evidence.
4. Maintenance: inspect the first scheduled due-date report, arrange source checking and the review cadence, then assess stable status only after a real feedback/review cycle.

The second topic, full highlight heatmaps, more regional/platform branches and PDF/ePub exports remain later work. Scope can change based on reader findings rather than the number of completed chapters.
