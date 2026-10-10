---
name: write-chapter
description: Write, substantially revise, or editorially review a quickstart.to quickstart or chapter. Use sourced research for writing and the shared editorial workflow to diagnose existing content and make focused repairs.
---

# Write a chapter

## Context

- The section belongs to the agreed topic outline or is directly authorized by the maintainer. Preserve published slugs.
- Read `docs/content-guide.md`, `docs/editorial-workflow.md`, the topic's `agent.md`, and relevant research. Follow the topic's reference-article notes when provided.
- Before making or changing a recommendation, research must cover its decisive questions, including practitioner experience, alternatives and counterexamples where relevant. Register suitable evidence for volatile claims in `sources/sources.yaml`; use **research** to close consequential gaps.

## Reviewing an existing article

Start with the rejection pass in the shared workflow, using the current article and reference rather than the prior author's completion report. Identify the passage, reader impact and evidence for each material finding. Review the preferred option as critically as the rejected ones. Preserve working material, make focused repairs, and recheck affected prose, figures and conclusions together; do not automatically restart the entire chapter or invent defects to justify a review.

## Writing

1. Record the reader's starting situation, decision, usable output, and what this chapter adds beyond the quickstart. Identify the reference article/revision and qualities to preserve; do not assume it is fully approved. This brief belongs in the research record, not the published prose.
2. Check the research against that promise and the shared workflow's comparison criteria. A missing central premise cannot be moved into “later work” merely to finish the chapter. A clearly labeled hypothetical can demonstrate a decision method, but must show its inputs, alternatives and consequences rather than give an unexplained answer.
3. Write `quickstart.md` or `chapters/NN-<slug>.md` in the topic's language. Set title, description, chapter order and truthful volatility; update `last_verified` only for facts actually rechecked. Cite with `[^src-id]`, without footnote definitions.
4. Develop the reasoning in connected prose. A quickstart provides a bounded route; a chapter deepens its own class of decisions with a completed worked result and relevant recovery path. Use actual attributed experience and stated assumptions; never invent firsthand work. Do not force every section into the same headings, caveats or worksheets.
5. Compose visuals and media around reader questions under the content guide: imagegen for useful original scenes, editable diagrams for exact relationships, working examples for observable consequences, and verified original media where it adds value. A disclosure is a reading control, not evidence that an interactive demonstration exists. Keep provenance in the research record, assets in the topic, and essential explanations readable without scripts or video.

## Rejection pass and delivery

Make a separate end-to-end reading pass following `docs/editorial-workflow.md`. Compare the promised contribution and the reference article. Record concrete shortcomings, their reader impact, and repairs; then re-read the affected passages in context. Do not substitute a list of additions or successful UI tests for editorial evidence. If a material gap remains central to the promise, keep revising or clearly deliver it as unfinished; do not call it a completed refinement.

Add a dated `CHANGELOG.md` entry. Run `pnpm validate` and `pnpm build`, preview with `pnpm dev`, and inspect desktop and narrow-screen reading. Check relevant controls, keyboard operation, boundary/reset states, source links, asset delivery and static fallbacks. Run build and Astro diagnostics serially because they share generated caches.

Update the existing active topic PR under AGENTS.md. Report evidence, editorial and technical results separately, with sources, feedback IDs and genuine limitations. The actual revision is also a behavioral check of this workflow: its record should show a new reader capability and repaired rejection findings, not merely the presence of a review document. Self-review does not establish reader acceptance or authorize promotion to beta/stable.
