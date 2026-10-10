# Mixed-script reading pass — 2026-10-09

The maintainer reported that Chinese, Latin text, and numbers run together. Apply ordinary source spaces to published prose and labels, then use native CSS spacing as a progressive enhancement. This pass changes typography only: source records, quotations, code contents, citation keys, page slugs, and verification dates remain unchanged.

## Implementation and limits

- Format the quickstart, chapter copy, public changelog, accessible SVG description, and calculator output. Most quickstart and compliance prose was already spaced. Preserve seven previous heading fragments with aliases where added spaces change generated slugs.
- Add `text-autospace: normal`, with code opted out. The earlier Ego check of [MDN's text-autospace documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/text-autospace) and actual browser behavior found that automatic spacing does not add copied characters; ordinary source spaces are therefore the baseline. Unsupported browsers keep those spaces.
- Extend `pnpm validate` to inspect rendered Chinese copy with an HTML parser, including boundaries crossing inline tags and text alternatives. Check code boundaries without checking code contents. Keep source titles, literal URLs, blockquotes, explicit verbatim spans, and Chinese quoted wording outside the check. The conservative quote exception still requires editorial attention to authored phrases.
- The static check does not execute scripts. Manually inspect dynamic results after input, preset, and reset. Keep the shared rule in the content guide, already read by the writing skill, and reference it from AGENTS.md.

## Verification

- Five parser/protection tests pass. Content validation reports zero typography issues; the eight pre-existing unused-source warnings remain.
- Build produces 15 pages; Astro check reports zero errors, warnings, or hints. Built-page comparison preserves all 324 previous IDs and all code text. All 291 internal page links, 310 fragment references, and 41 ARIA references resolve without duplicate IDs. Verification metadata is unchanged.
- Ego inspection at 1440px and 390px: first-article journey diagram and second-article prose remain readable; calculator labels/results wrap within the viewport. No horizontal overflow. Selected prose contains actual spaces; computed automatic spacing is `normal`, with `no-autospace` inside code.
- Calculator preset yields 96 versus 120 minutes, one keyboard increment yields 100 versus 120, and reset returns to 152 versus 120. Result text, numerical labels, and accessible chart description retain spacing after each update.

This pass does not reverify external claims or establish editorial acceptance of the remaining draft chapters.
