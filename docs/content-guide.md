# Content guide

How a quickstart.to topic is structured and written. Enforced in part by `scripts/validate-topics.mjs`.

## 1. What a topic is

A topic is a **living book**: one quickstart that gets a reader to a concrete first milestone, plus chapters that cover the subject systematically. Readers should return for useful judgment, worked examples, practical evidence, explanatory visuals, and maintained facts. Structure, citations, and a public change history support that value; they do not create it on their own.

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
| `status` | ✓ | `draft` (incomplete or not yet editorially ready) · `beta` (quickstart + core chapters meet §8 and have been fact-checked) · `stable` (also survived a feedback + review cycle) |
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

### Start with the reader's decision

Before drafting, state the reader's starting situation, the decision this page helps them make, and the concrete result they should leave with. Finish the sentence: “After this page, the reader can ___ and can verify it by ___.” “Understands the risks” and “knows what to research” are insufficient outcomes for a practical guide.

Give a recommendation under explicit assumptions, explain why it fits, and name the condition that would change it. Comparisons must resolve a choice, not merely list vendors or options. Where the evidence cannot justify a recommendation, narrow the scope or identify the exact missing evidence; do not invent confidence to sound decisive.

**Quickstart** — readable in about 30 minutes, with one bounded starting scenario and one recommended route. Establish the scenario from relevant evidence or clearly label it as a teaching assumption; do not invent a country or market preference merely to make it look specific. Put detailed alternatives in linked chapters while briefly identifying when the main route does not fit. Explain prerequisites, actions, observable results, and recovery where they matter, without turning every section into the same worksheet. Separate reading time from external waiting time. The title's promised milestone must match what the guide can actually support.

**Chapters** — each solves one class of problem. Start from a concrete situation, develop the choice and trade-off, work through the action, then show how to recognize and fix a plausible failure. End with a usable output and a relevant next step. These are editorial functions, not a mandatory set of identical headings. Use prose for reasoning; use tables and lists when they clarify real comparisons or sequences.

### Show the work behind the advice

Each substantive practical chapter needs a worked example that reaches a result: a completed comparison, annotated configuration, tested procedure, sample document, calculation, or decision record. A blank checklist does not replace a completed example. Show the input, reasoning, output, verification, and the limit of what was demonstrated. Include an important rejected option or failure branch when it affects the choice.

Keep three kinds of evidence distinct:

- **Observed practice:** describe only actions actually performed, with dates, relevant environment, outcomes, and redacted evidence. A test-mode transaction is not a real sale or payout.
- **Attributed experience:** name and link the original account, preserve its circumstances, and separately verify any current policy claims. One person's success is not a general approval guarantee.
- **Worked hypothetical:** label it as an example or simulation, disclose assumptions, and use consistent numbers and constraints. Never imply that the example has customers, revenue, or real approval.

Use a recurring scenario where it helps connect chapters; it need not explain every type of reader or product. Develop the few cases that carry the argument: the starting situation, alternatives, choices, subsequent work, and what the outcome does or does not explain. Avoid dropping a founder's name or success figure into a paragraph merely to endorse generic advice. Do not manufacture “I tried this,” customer dialogue, failures, screenshots, testimonials, or revenue to imitate experience. Depth comes from showing reasoning and evidence, not performing a persona.

### Write with judgment and economy

Use the voice of a thoughtful practitioner: specific, candid, and willing to explain a trade-off. Make recommendations and their reasons clear, rather than repeating “choose according to your needs” or a fixed if/then formula. Respect the topic's `agent.md`.

Give the reader a continuous line of thought. Each paragraph should develop an idea and help the next one follow; headings mark meaningful turns, not a compulsory template. Let the reader see why a choice is difficult before resolving it. Use varied paragraph length and concrete language without manufactured banter, slogans, rhetorical oppositions, or a takeaway at the end of every section. Tables are for comparisons that benefit from side-by-side reading, lists for genuine sequences or parallel items, and quotations for material worth setting apart. None is a default substitute for prose. More words do not establish depth; remove passages that repeat a conclusion without adding reasoning, evidence, or a useful consequence.

Treat boundaries proportionately. Separate actions required before the next milestone from conditional obligations and later-stage work. Attach each consequential caveat to the decision it changes. When outside confirmation is necessary, provide the relevant facts to submit, the precise question, the expected answer or document, and what to do while it remains unresolved.

Remove repeated disclaimers, generic “be careful” advice, repeated definitions, and explanations of the agent's research process. Attribute cases naturally and label a hypothetical when it first appears; collect recurring provenance limitations in a compact source note. Keep any limit that changes the immediate decision beside that decision. Keep research-tool failures in research notes; expose the unresolved reader-facing question where it matters. Put a rule's full explanation in one chapter and link to it elsewhere. A legal disclaimer cannot substitute for resolving an answerable question.

### Compose the reading experience with visuals, interaction, and media

Record the reader question, placement, and intended takeaway before creating a visual. Commission original editorial illustrations with the `imagegen` skill when a scene, metaphor, or narrative improves understanding or establishes a coherent topic identity. A chapter image must depict its actual situation, not be a generic laptop, globe, rocket, or money montage. Do not add an image to every chapter just to meet a quota.

Long articles should offer more than uninterrupted prose. Use labeled icons for orientation, diagrams for relationships, small working examples for cause and effect, and relevant original video or other media when readers benefit from seeing or hearing the practice. Place each beside the question it answers and remove duplicate explanation. Readers should be able to skim the visual structure, read the full argument, or explore a specific example without losing their place. This is a deliberate composition, not a quota of embeds or decorative breaks.

Interactive examples should have a clear action and observable consequence, explicit teaching assumptions, keyboard controls, visible labels, and a readable static state. Keep examples local when no external service is needed; do not ask for real private data to demonstrate a concept. Verify reset and boundary states, reduced-motion behavior where applicable, narrow screens, and operation without JavaScript.

For YouTube or other external media, verify the original publisher, title, relevant content, and any suggested timestamp. Explain in the article why to watch, the language, and what is covered; verify subtitles before claiming availability. Include an original-site link and a concise written alternative. Use a responsive click-to-load player, no autoplay or third-party thumbnail request before activation, and retain the link when embedding is unavailable. Do not invent viewing evidence or download/rehost someone else's video. Record playback or transcript limits honestly in research notes.

Use editable diagrams and standard charting tools for exact flows, state transitions, calculations, and policy comparisons. When a central explanation relies on sequence, branching, convergence, or a feedback loop, draw those relationships beside the relevant prose. Show the inputs and outcomes, connect the steps, and label consequential branches; a row of unrelated cards or an illustration of the scene does not explain the process. Preserve reading order and legibility on narrow screens by rearranging the diagram rather than shrinking its labels. Generated artwork can accompany these explanations but must not be the sole carrier of exact figures, legal conditions, or instructions. Use real, redacted captures for claims about a tested interface; generated illustrations must never masquerade as screenshots, receipts, identity documents, or proof of earnings.

For every published visual:

- Connect it to adjacent prose, provide useful alt text and a caption explaining the takeaway, and disclose a hypothetical or AI-created illustration where it could be mistaken for evidence.
- Match the topic's visual direction; ensure the composition and essential information remain readable at 390px. Avoid tiny embedded text and information conveyed only by color.
- Keep final assets in `topics/<slug>/assets/`, reference them relatively, and use the site's image pipeline to serve appropriately sized compressed files. Check desktop/mobile rendering and the actual built asset size.
- Record purpose, final generation prompt, tool/mode, date, provenance, and limitations in a compact non-published asset note. For sourced screenshots, record the source and redactions instead. Never include private session information.

An illustration improves the explanation; it does not repair thin reasoning or missing evidence.

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

Explain the publication's use of AI in a concise, clearly discoverable content-and-updates note: AI performs research, writing, source comparison, and revision so the guides can be maintained as the subject changes. Ground reader trust in traceable evidence, the scope and date of completed verification, and a public change history. AI authorship is not evidence for a claim or a guarantee of accuracy or real-time freshness. Distinguish intended review intervals from completed checks; do not claim continuous monitoring, automatic updates, or human review unless those processes actually operate. Consolidate ordinary AI illustration credits and production details in this note so captions can explain the images. Keep consequential provenance labels near the material they qualify, including hypothetical cases at first use and generated images that could otherwise be mistaken for observed evidence; avoid repeating the same disclosure throughout the article.

### Match the source to the claim

Research broadly; official documentation alone is insufficient for a practical guide. Source quality depends on what is being claimed, not simply whether a publisher is official.

| Question | Suitable evidence | Boundary |
|---|---|---|
| What are the current rules, fees, eligibility, and legal obligations? | Responsible regulator, enacted text, platform terms/docs, or current official notices | Verify jurisdiction, effective date, and applicable account/product; vendor marketing is not neutral comparison evidence |
| What happened in practice, what did it take, and where did it fail? | Original practitioner accounts, postmortems, detailed tutorials, interviews, and substantive community discussions | Attribute the account and preserve its circumstances; verifying that an author reported an outcome does not independently verify the outcome or establish a general success rate |
| How should the reader compare approaches or interpret a pattern? | Substantive independent analysis, technical articles, well-supported comparisons, and a synthesis of independent cases | Cite borrowed reasoning, examine evidence and incentives, distinguish the author's interpretation from ours, and recheck volatile factual premises |

Search in the languages relevant to the audience and the practice; for go-global this includes Chinese and English. Seek successful, failed, abandoned, and migrated approaches, plus credible disagreement. Follow reposts and summaries to their originals where possible. Several retellings of one case are one case, not corroboration. Evaluate relevance and specificity rather than follower counts or search rank, and note sponsorship, affiliate incentives, missing costs, and survivorship bias where they affect the recommendation. Anonymous anecdotes may reveal a question to investigate; thin, unverifiable posts should not carry consequential advice.

For substantial practical writing, keep a compact research record of the decisions covered, original sources, publication/event/access dates where available, operating context, actions and outcomes reported, independent support or disagreement, and the lesson that does or does not transfer to this reader. If relevant practice evidence cannot be found, record the search gap and narrow or label the advice; do not substitute an invented experience. There is no source-count quota, but a central practical recommendation needs scrutiny beyond a vendor's explanation of its own product.

Synthesize the research into useful judgment: explain which circumstances produced which result, why accounts differ, and what the reader should do under the stated assumptions. Do not merely append a reading list, paraphrase posts in sequence, or turn an anecdote into “everyone does this.” When experience and documentation appear to conflict, preserve the discrepancy, investigate timing and context, and avoid implying that a reported exception changes a rule. Cite attributed experience and borrowed analysis with the same source registry and adjacent citation format as other claims; describe the supported claim precisely in `sources.yaml` rather than treating every listed source as officially confirmed.

For consequential eligibility, fee, legal, and tax claims, retain enough short supporting passages and exact section/article/table locators to reconstruct the inference. One generic quotation must not stand in for many unrelated assertions. Distinguish what the source explicitly states from the author's inference and recommendation. A `confirmed` research label applies only to the supported claim, not the whole page or a reader's individual case.

## 7. Changelog

Every content PR adds a dated entry to `CHANGELOG.md` in the topic's language: what changed and why, referencing feedback IDs where applicable.

## 8. Editorial acceptance

For a new guide or substantial rewrite, review these dimensions with concrete evidence in the PR or research note. Small corrections only need checks relevant to the change. This is an editorial review, not a word-count or image-count target.

| Dimension | Required evidence | Return for revision when |
|---|---|---|
| Reader outcome | A bounded starting situation, recommendation, and observable result | The reader still has to reconstruct the entire path from a list of options |
| Reasoning and depth | The decisive trade-off, a worked example, and relevant failure/recovery logic | Advice could be pasted into almost any topic unchanged |
| Executability | Concrete inputs, usable output, verification, and escalation details | The page mainly says to “check,” “prepare,” or “consult” without showing how |
| Evidence and honesty | Traceable claims, relevant practitioner/independent research alongside rule verification, counterevidence, exact scope/dates, and explicit example provenance | The guide only summarizes official documents, experience is invented or generalized without support, an inference is presented as fact, or a central recommendation depends on unresolved evidence |
| Reading experience | An end-to-end read for transitions, paragraph rhythm, explanatory depth, and mobile comfort | The page feels like an editing rubric, alternates generic instructions with disclaimers, uses many thin cases, or makes readers reconstruct the argument from tables |
| Visual and interactive explanation | Purposeful images/diagrams/media, useful captions, tested controls and fallbacks, and mobile inspection | Long prose has no useful visual entry points, media is decorative or misleading, controls are unusable, or the argument requires a video or script to work |
| Topic coherence | Consistent scenario, terminology, numbers, links, and allocation of detail across pages | Chapters contradict one another or repeatedly make the reader redo the same decision |

Facts, reasoning, and usability are independent gates: strong artwork cannot compensate for a factual gap, and plentiful citations cannot compensate for an unusable explanation. Keep explicitly partial work in `draft`. Before proposing `beta`, run the fact-check workflow and the editorial review; before `stable`, also complete the feedback/review cycle. Do not mark these gates passed merely because the build succeeded.
