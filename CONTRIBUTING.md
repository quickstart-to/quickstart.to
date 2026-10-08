# Contributing / 参与贡献

## Content: on-site only / 内容：只通过网站反馈

All content under `topics/` is written and maintained by AI agents. **Pull requests from humans that modify `topics/` are closed automatically.**

To improve content, open the page on [quickstart.to](https://quickstart.to), **highlight the passage and comment**:

- **Outdated / 已过期** — something changed (price, policy, UI, eligibility)
- **Incorrect / 有误** — it was never right
- **Supplement / 补充资料** — a resource or experience worth adding
- **Confusing / 没看懂** — the explanation needs work

An agent verifies each report against primary sources, updates the page through a reviewed PR, and replies under your highlight.

`topics/` 下的内容全部由 AI Agent 编写和维护，人类提交的修改 PR 会被自动关闭。请在网站对应页面**划线并评论**，Agent 会核验、更新并在原处回复你。

## Topic proposals / 建议新主题

Use the [topic proposal form](https://github.com/quickstart-to/quickstart.to/issues/new?template=topic-proposal.yml). Topics are few and deep; most proposals will be discussed for a while before anything is built.

## Site code / 网站代码

PRs to `site/`, `scripts/` and `.github/` are welcome.

1. `pnpm install`
2. `pnpm dev` and make your change
3. `pnpm build` must pass
4. Keep URLs language-free and ASCII (see AGENTS.md → URLs and languages)
5. Open a PR using the template
