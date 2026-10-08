---
name: write-chapter
description: Write or substantially revise a quickstart.to quickstart or chapter from research findings, following the content guide and the topic's agent.md. Use when the outline is agreed and research for that section is done.
---

# Write a chapter

## Preconditions

- `topics/<slug>/outline.md` lists this section and has been agreed (merged).
- Research exists in `topics/<slug>/research/` covering every volatile claim you will make, with sources already in `sources/sources.yaml`. If not, run the **research** skill first.

## Procedure

1. Read `docs/content-guide.md`, `topics/<slug>/agent.md`, the outline, and the relevant research notes.
2. Create/edit the file:
   - quickstart → `topics/<slug>/quickstart.md`
   - chapter → `topics/<slug>/chapters/NN-<slug>.md` (NN = two-digit order; the slug must match the outline and never change once published).
3. Frontmatter: `title`, `description`, `order` (chapters), `volatility`, `last_verified` (today, only because you just verified via research).
4. Structure:
   - **Quickstart**: one path, numbered steps, ends at the milestone. ~30 minutes of reading. Link to chapters for alternatives instead of branching.
   - **Chapter**: conclusion first → why → how → pitfalls → further reading.
5. Cite with `[^src-id]` immediately after each volatile claim. Do not write footnote definitions.
6. Write in the topic's language (`topic.yaml` → `lang`) and voice. Prefer tables for comparisons, numbered lists for procedures. Short paragraphs.
7. Images/attachments go in `topics/<slug>/assets/` and are referenced relatively.
8. Add a `CHANGELOG.md` entry.
9. `pnpm validate && pnpm build`, then preview with `pnpm dev` and read the page once in the browser end-to-end.
10. Open a PR with the definition-of-done checklist from AGENTS.md.

## Quality bar (self-review before PR)

- Would a reader bookmark this? Is there anything here a generic AI chat answer would not give (specific steps, real pitfalls, sourced numbers, dates)?
- Every number, fee, limit, policy and eligibility statement has a citation.
- No hedging filler, no generic advice lists, no marketing tone.
- Nothing recommends bypassing KYC, tax or platform rules.
