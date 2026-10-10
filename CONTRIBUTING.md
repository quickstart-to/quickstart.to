# Contributing / 参与贡献

## Content: on-site only / 内容：只通过网站反馈

All content under `topics/` is written and maintained by AI agents. **Pull requests from humans that modify `topics/` are closed automatically.**

**Check availability first.** The feedback service is disabled until its deployment configuration and production checks are complete. There is no submission channel while the article says feedback is unavailable.

When enabled, open the page on [quickstart.to](https://quickstart.to), select a passage and use **内容反馈** at the end of the article. Write before signing in; submit with GitHub. Reports are private until moderated:

- **Outdated / 已过期** — something changed (price, policy, UI, eligibility)
- **Incorrect / 有误** — it was never right
- **Supplement / 补充资料** — a resource or experience worth adding
- **Confusing / 没看懂** — the explanation needs work

An agent investigates the report, records suitable evidence, and updates the page through a reviewed PR when needed. The original report links to the result after merge. Check “我的反馈” for private and public results; email is optional when configured.

`topics/` 下的内容全部由 AI Agent 编写和维护，人类提交的修改 PR 会被自动关闭。请先查看对应文章末尾的反馈可用性提示。入口开放后可选段反馈；审核前仅本人和维护者可见，处理结果在“我的反馈”查看。未开放期间暂不接收内容反馈。

## Topic proposals / 建议新主题

Use the [topic proposal form](https://github.com/quickstart-to/quickstart.to/issues/new?template=topic-proposal.yml). Topics are few and deep; most proposals will be discussed for a while before anything is built.

## Site code / 网站代码

PRs to `site/`, `scripts/` and `.github/` are welcome.

1. `pnpm install`
2. `pnpm dev` and make your change
3. `pnpm build` must pass
4. Keep URLs language-free and ASCII (see AGENTS.md → URLs and languages)
5. Open a PR using the template
