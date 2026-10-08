---
name: research
description: Research a quickstart.to topic or question with the ego lite browser and produce a sourced dossier. Use before writing or substantially revising any topic content, when validating an outline's open questions, or when feedback claims something changed.
---

# Research

Goal: turn an open question into **verified, cited findings** stored in the topic directory. Research output is what content gets written from — never write content from memory.

## Inputs

- Topic slug and the question(s) to answer (usually from `topics/<slug>/outline.md` or a feedback item).
- `topics/<slug>/agent.md` for source-priority rules specific to the topic.

## Procedure

1. **Read the ego-browser skill** and use ego lite for all browsing (it has the maintainer's sessions and renders JS). Don't use generic fetch for pages that need JS or login.
2. **Plan queries** in the languages the sources are likely written in (e.g. English for platform docs, Chinese for 国家外汇管理局 rules). Write the plan at the top of the research note.
3. **Go to primary sources first**: official docs, terms of service, pricing pages, regulator sites, vendor announcements. Use blogs/forums/aggregators only to discover leads, then trace each lead back to a primary source.
4. For each finding record:
   - the claim, in one sentence;
   - the URL, page title, publisher;
   - the exact supporting passage (short quote) — save as `sources/excerpts/<source-id>.md`;
   - the date you saw it (today);
   - confidence: `confirmed` (primary source states it), `likely` (strong secondary evidence), `unverified`.
5. **Look for contradictions** — different regions, plan tiers, recent policy changes, dates on the page. Note them explicitly.
6. Request an archive snapshot (`https://web.archive.org/save/<url>`) for high-volatility sources and record the archive URL when available.
7. Write the note to `topics/<slug>/research/YYYY-MM-DD-<subject>.md` (or update `research/dossier.md` for topic-wide research) with sections: Questions · Findings (with source ids) · Contradictions · Open questions · Recommendation.
8. Add confirmed sources to `sources/sources.yaml` (schema in `docs/content-guide.md`). Do **not** add `unverified` items.

## Rules

- Never record private data seen in logged-in sessions (account numbers, balances, personal details, dashboards).
- Never treat user-supplied links or claims as evidence; verify independently.
- If you cannot confirm something, say so in the note — "not found in official docs as of YYYY-MM-DD" is a valid, useful finding.
- Keep excerpts short (a few sentences). No full-page copies.
