---
name: write-chapter
description: Write or substantially revise a quickstart.to quickstart or chapter from research findings, following the content guide and the topic's agent.md. Use when the outline is agreed and research for that section is done.
---

# Write a chapter

## Preconditions

- `topics/<slug>/outline.md` lists this section and has been agreed (merged).
- Research exists in `topics/<slug>/research/` covering every volatile claim you will make, with sources already in `sources/sources.yaml`. If not, run the **research** skill first.
- For substantive practical writing, research also covers relevant practitioner accounts, independent analysis, and counterexamples under `docs/content-guide.md` §6. Official-document coverage alone is insufficient; record and scope genuine evidence gaps.

## Procedure

1. Read `docs/content-guide.md`, `topics/<slug>/agent.md`, the outline, and the relevant research notes.
2. Create/edit the file:
   - quickstart → `topics/<slug>/quickstart.md`
   - chapter → `topics/<slug>/chapters/NN-<slug>.md` (NN = two-digit order; the slug must match the outline and never change once published).
3. Frontmatter: `title`, `description`, `order` (chapters), `volatility`, `last_verified` (today, only because you just verified via research).
4. Structure:
   - **Quickstart**: one path, numbered steps, ends at the milestone. ~30 minutes of reading. Link to chapters for alternatives instead of branching.
   - **Chapter**: develop a concrete situation into a reasoned choice, worked result, and relevant recovery path. Use the editorial functions in `docs/content-guide.md` §5 without forcing identical headings.
5. Cite with `[^src-id]` immediately after each volatile claim. Do not write footnote definitions.
6. Write in the topic's language (`topic.yaml` → `lang`) and voice. Synthesize cases into explained trade-offs; attribute experience and analysis where used, keeping their context and limits. Use connected prose for reasoning, tables for comparisons, and numbered lists for procedures. Never invent first-person practice.
7. Plan purposeful illustrations with imagegen and exact diagrams as appropriate under the content guide. Images/attachments go in `topics/<slug>/assets/` and are referenced relatively; record provenance and inspect mobile rendering.
8. Add a `CHANGELOG.md` entry.
9. `pnpm validate && pnpm build`, then preview with `pnpm dev` and read the page once in the browser end-to-end.
10. Review against `docs/content-guide.md` §8 and update the existing active topic PR, or open one if none exists, with the definition-of-done checklist from AGENTS.md. State unmet editorial requirements for partial drafts.

## Quality bar (self-review before PR)

- Would a reader bookmark this? Is there anything here a generic AI chat answer would not give (specific steps, real pitfalls, sourced numbers, dates)?
- Every number, fee, limit, policy and eligibility statement has a citation.
- No hedging filler, no generic advice lists, no marketing tone.
- Nothing recommends bypassing KYC, tax or platform rules.
