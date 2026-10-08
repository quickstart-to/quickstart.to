---
name: review-cycle
description: Run the scheduled re-verification of quickstart.to content — find pages whose last_verified is older than the topic's review interval for their volatility, and fact-check them. Use on a schedule (e.g. weekly) or when the maintainer asks for a freshness pass.
---

# Review cycle

## 1. Find due pages

For each `topics/<slug>/topic.yaml`, read `review` (e.g. `high: 30d, medium: 90d, low: 365d`; defaults are those values). For each page in `quickstart.md` and `chapters/*.md`, it is **due** when `today - last_verified > review[volatility]`, or when `last_verified` is missing on a non-draft topic.

Quick listing:

```sh
grep -H -E '^(volatility|last_verified):' topics/*/quickstart.md topics/*/chapters/*.md
```

Also check every `sources.yaml` URL for reachability (open in ego lite, or `curl -sI -L` for simple pages). Unreachable sources make their citing pages due.

## 2. Prioritise

1. `high` volatility pages that are overdue
2. pages with unreachable sources
3. pages with many open outdated/incorrect feedback items (from P2: `qs feedback pull`)
4. everything else due

Cap one run to what you can verify carefully (e.g. 5 pages). Quality over coverage.

## 3. Verify

Run the **fact-check** skill on each due page. Batch the results into one PR per topic: `review: <slug> YYYY-MM-DD`.

## 4. Report

Write `topics/<slug>/research/YYYY-MM-DD-review.md`: pages checked, changes made, claims that could not be verified, pages still due.
