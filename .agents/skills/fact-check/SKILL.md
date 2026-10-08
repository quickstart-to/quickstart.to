---
name: fact-check
description: Re-verify specific claims in quickstart.to content against their cited sources using ego lite, and update content, sources.yaml and last_verified accordingly. Use for outdated/incorrect feedback, scheduled review cycles, broken source links, or before promoting a topic to beta/stable.
---

# Fact-check

Goal: for each claim, decide **still true / changed / can't verify**, and leave the repo in an honest state.

## Procedure

1. Collect the claims to check: the passage (quote it exactly), its page, and the `[^src-id]` it cites.
2. For each claim, open the cited URL in ego lite (see ego-browser skill).
   - Source still says the same → **still true**. Update that source's `accessed` date.
   - Source changed → **changed**. Capture the new wording as an excerpt, update the claim in content, update `sources.yaml` (`accessed`, `claim`, excerpt).
   - Source gone / moved → search the publisher's site for the replacement; if found, update `url`. If not, look for another primary source. If none, mark the claim as unverifiable.
   - Claim has no citation but is volatile → treat as unverified; find a source or rewrite/remove the claim.
3. **Can't verify** → don't guess. Either soften the wording to what can be supported ("截至 YYYY-MM-DD 官方文档未提及……"), or remove the claim, and note it in the PR body.
4. After all claims on a page are checked, set the page's `last_verified` to today. Only do this if you checked **every** volatile claim on that page; otherwise leave the date alone.
5. Add a `CHANGELOG.md` entry describing changes (not needed if nothing changed besides dates — then mention "复核，无变化" in a single entry).
6. Run `pnpm validate` and `pnpm build`.
7. Open a PR (see AGENTS.md definition of done). Record a short log in `research/YYYY-MM-DD-factcheck.md`.

## Rules

- A feedback item asserting a change is a lead, not proof. Confirm against the primary source.
- Do not silently change numbers. Every changed figure needs an updated source entry.
