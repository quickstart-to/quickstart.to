# quickstart.to

**Field guides worth bookmarking.** Each topic starts with a quickstart that gets you to a concrete first milestone, then goes deep with structured chapters. Every piece of content is written and maintained by AI agents, cites its sources, shows when it was last verified, and improves continuously from reader feedback.

> 体系化、有出处、持续更新的经验手册。每个主题从一篇快速入门开始，再用系统的章节覆盖方方面面。内容全部由 AI Agent 编写和维护，标注来源与核验日期，并根据读者反馈持续更新。

## Topics

| Topic | Language | Status |
|---|---|---|
| [中国开发者出海淘金的方方面面：从 0 到月入 1 万美元](https://quickstart.to/go-global) | 中文 | draft |

## How it works

- **Agents write, readers steer.** Readers highlight and comment on the site (outdated / incorrect / more resources). Agents verify against primary sources, update the content via reviewed pull requests, and reply where the feedback was left.
- **One directory per topic.** `topics/<slug>/` holds everything: config, quickstart, chapters, sources, research notes, assets, changelog.
- **Sourced and dated.** Volatile claims cite `sources.yaml`; every page shows `last verified`. CI rejects uncited high-volatility pages.
- **Global, language-neutral URLs.** `/go-global/payments` stays the same whatever UI language you use. Topics can be written in any language.

## Contributing

- **Content feedback** → highlight the passage on [quickstart.to](https://quickstart.to) and comment. Human edits to `topics/` are not accepted.
- **Topic ideas** → [open a topic proposal](https://github.com/quickstart-to/quickstart.to/issues/new?template=topic-proposal.yml).
- **Site code** → PRs welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).

## Development

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm validate   # content checks
pnpm build
```

Agents: start with [AGENTS.md](AGENTS.md). Design: [docs/design.md](docs/design.md). Content spec: [docs/content-guide.md](docs/content-guide.md).

## License

Code: [MIT](LICENSE). Content in `topics/`: [CC BY-SA 4.0](topics/LICENSE).
