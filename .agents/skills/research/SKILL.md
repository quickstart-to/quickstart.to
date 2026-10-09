---
name: research
description: Research a quickstart.to topic or question with the ego lite browser and produce a sourced dossier. Use before writing or substantially revising any topic content, when validating an outline's open questions, or when feedback claims something changed.
---

# Research

Goal: turn an open question into **sourced findings and useful judgment**, combining verified rules with relevant practitioner experience and independent analysis. Research output is what content gets written from — never write content from memory. Apply the source-fit and synthesis standards in `docs/content-guide.md` §6.

## Inputs

- Topic slug and the question(s) to answer (usually from `topics/<slug>/outline.md` or a feedback item).
- `topics/<slug>/agent.md` for source-priority rules specific to the topic.

## Procedure

1. **Read the ego-browser skill** and use ego lite for all browsing (it has the maintainer's sessions and renders JS). Don't use generic fetch for pages that need JS or login.
2. **Plan queries around reader decisions**, in the languages relevant to both official rules and practitioner experience. Include original accounts, detailed articles, failures, migrations, and counterarguments as well as documentation. Write the plan at the top of the research note. For a substantial chapter, map its promised reader decisions to the evidence or worked demonstration needed; include the central rejected alternative and the condition that would change the recommendation, following `docs/editorial-workflow.md`.
3. **Match sources to questions** using the content guide: responsible authorities for current rules; original practitioner accounts for attributed experience; well-supported independent articles for analysis. Read originals, inspect their context and incentives, and trace factual premises to supporting sources. Blogs and forums can provide substantive evidence of reported experience; do not automatically discard them or treat an anecdote as a general rule.
4. For each finding record:
   - the claim, in one sentence;
   - the URL, page title, publisher;
   - the exact supporting passage (short quote) — save as `sources/excerpts/<source-id>.md`;
   - the date you saw it (today);
   - evidence kind: official rule, observed practice, attributed experience, or analysis;
   - for experience: publication/event date where known, relevant operator/product context, actions, reported results, limitations, and links to independent support or disagreement;
   - confidence scoped to the claim: `confirmed` (directly supported by suitable evidence), `reported` (the original author describes an outcome not independently reproduced), `likely` (a supported inference), or `unverified`. A confirmed statement that an author reported something does not confirm that the outcome occurred or will recur.
5. **Look for contradictions and counterexamples** — region, business identity, scale, plan tier, dates, failed attempts, and abandoned approaches. Distinguish independent cases from copied accounts. Explain how this affects the recommendation; do not average incompatible stories into a universal claim.
6. Request an archive snapshot (`https://web.archive.org/save/<url>`) for high-volatility sources and record the archive URL when available.
7. Write the note to `topics/<slug>/research/YYYY-MM-DD-<subject>.md` (or update `research/dossier.md` for topic-wide research) with sections: Questions/query plan · Findings and practice cases (with source ids) · Contradictions · Open questions · Recommendation. Show the transferable lesson and its limits, not just a link collection. Record gaps when relevant practice evidence is unavailable.
8. Before handing research to writing, check that the decisive questions have evidence or a clearly bounded demonstration. Record which premises remain unknown and what they prevent you from recommending. Continue research when a central question in the chapter’s promise is uncovered; do not use a source count or a list of future work as a readiness judgment.
9. Add sources actually read and suitable for publication to `sources/sources.yaml` (schema in `docs/content-guide.md`), including explicitly attributed experience or analysis. Make `claim` state exactly what the source supports. Keep unsupported rumors and unverified claims in research notes only.

## Rules

- Never record private data seen in logged-in sessions (account numbers, balances, personal details, dashboards).
- Reader feedback is a research lead; evaluate any linked source independently under the same source-fit rules.
- If you cannot confirm something, say what remains unknown. "Not found in official docs as of YYYY-MM-DD" describes a documentation gap, not proof that reported experiences are false or that an action is prohibited.
- Keep excerpts short (a few sentences). No full-page copies.
