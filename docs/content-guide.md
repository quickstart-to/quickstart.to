# Content guide

How a quickstart.to topic is structured and written. Enforced in part by `scripts/validate-topics.mjs`.

## 1. What a topic is

A topic is a **living book**: one quickstart that gets a reader to a concrete first milestone, plus chapters that cover the subject systematically. It must be worth bookmarking — something a one-off AI chat cannot give: structure, sources, verification dates, and a public change history.

Topics are few by design. A new topic is only started after the previous one reaches `stable`, and only after a topic proposal is accepted (see `.agents/skills/new-topic/`).

## 2. Directory layout

```
topics/<slug>/
├── topic.yaml            # config (schema below)
├── outline.md            # agreed outline; changed via PR
├── quickstart.md         # required
├── chapters/NN-<slug>.md # ordered chapters
├── sources/
│   ├── sources.yaml      # every citation target
│   └── excerpts/         # short quoted passages backing claims
├── research/             # dossiers and verification logs (not published)
├── assets/               # images and attachments used by this topic
├── agent.md              # topic-specific voice, glossary, constraints
└── CHANGELOG.md          # public, dated
```

Everything a topic needs lives in its directory. User feedback does not — it lives in the site database.

## 3. `topic.yaml`

| Field | Required | Notes |
|---|---|---|
| `slug` | ✓ | equals the directory name; lowercase ASCII kebab-case |
| `lang` | ✓ | BCP 47 tag of the content language, e.g. `zh-CN`, `en`, `ja` |
| `title` | ✓ | in the content language |
| `title_en` | | English title for global index and share cards |
| `summary` | | one sentence, content language |
| `audience` | ✓ | who exactly this is for |
| `status` | ✓ | `draft` (outline/research only) · `beta` (quickstart + core chapters) · `stable` (survived a feedback + review cycle) |
| `aliases` | | marketing shortcuts in any language; 301 to `/<slug>` |
| `disclaimer` | | shown on every page (required in practice for legal/tax/finance/health topics) |
| `review` | | re-verification interval per volatility, e.g. `high: 30d` |

## 4. Page frontmatter

```yaml
---
title: 收款方案全景
description: One-line summary for search and share cards
order: 2                 # chapters only, unique per topic
volatility: high         # high | medium | low — required unless topic is draft
last_verified: 2026-10-08 # required unless topic is draft
slug: payments           # optional; default = filename minus NN- prefix
---
```

`volatility: high` pages must cite at least one source.

## 5. Writing

**Quickstart** — readable in ~30 minutes; one recommended path, no branching; ends at a verifiable milestone ("you received your first dollar"). Alternatives go into chapters and are linked.

**Chapters** — each solves one class of problem. Default shape:

1. **Conclusion first** — what to do, in two or three sentences.
2. **Why** — the reasoning and trade-offs.
3. **How** — concrete steps.
4. **Pitfalls** — what goes wrong in practice.
5. **Further reading** — curated, not exhaustive.

**Voice** — an experienced peer sharing what works. Specific over generic, decisions over lists of options. No filler, no moralising. Respect the topic's `agent.md`.

## 6. Citations

Write `[^src-id]` right after the claim. The id must exist in `sources/sources.yaml`:

```yaml
- id: src-stripe-pricing
  url: https://stripe.com/pricing
  title: Stripe Pricing
  publisher: Stripe
  accessed: 2026-10-08
  claim: Standard card fee for US cards
  excerpt: excerpts/stripe-pricing.md   # optional
  archive: https://web.archive.org/...   # optional
```

The site renders numbered superscripts and a "Sources" list automatically. Do not write Markdown footnote definitions for sources.

Source priority: official docs / regulators → vendor's own blog/announcements → named first-hand accounts. Aggregator articles are research leads only.

## 7. Changelog

Every content PR adds a dated entry to `CHANGELOG.md` in the topic's language: what changed and why, referencing feedback IDs where applicable.
