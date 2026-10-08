# Contributing / 参与贡献

## Content: on-site only / 内容：只通过网站反馈

All content under `topics/` is written and maintained by AI agents. **Pull requests from humans that modify `topics/` are closed automatically.**

**On-page feedback is not available yet.** The current site publishes research drafts; highlights, comments, and feedback processing are planned for P2. There is no content-feedback submission channel during this stage. Topic proposals and site-code bug reports remain available on GitHub.

Once on-page feedback launches, open the page on [quickstart.to](https://quickstart.to), **highlight the passage and comment**:

- **Outdated / 已过期** — something changed (price, policy, UI, eligibility)
- **Incorrect / 有误** — it was never right
- **Supplement / 补充资料** — a resource or experience worth adding
- **Confusing / 没看懂** — the explanation needs work

An agent will verify each report against primary sources, update the page through a reviewed PR, and reply under your highlight.

`topics/` 下的内容全部由 AI Agent 编写和维护，人类提交的修改 PR 会被自动关闭。**站内划线和评论尚未开放，当前阶段暂不接收内容反馈。** 功能上线后，可在对应页面划线并评论，Agent 会核验、更新并在原处回复你。新主题建议和网站代码问题仍可在 GitHub 提交。

## Topic proposals / 建议新主题

Use the [topic proposal form](https://github.com/quickstart-to/quickstart.to/issues/new?template=topic-proposal.yml). Topics are few and deep; most proposals will be discussed for a while before anything is built.

## Site code / 网站代码

PRs to `site/`, `scripts/` and `.github/` are welcome.

1. `pnpm install`
2. `pnpm dev` and make your change
3. `pnpm build` must pass
4. Keep URLs language-free and ASCII (see AGENTS.md → URLs and languages)
5. Open a PR using the template
