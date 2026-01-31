# 贡献指南

> 一切事物的精华指南

[English](./CONTRIBUTING.md)

感谢你有兴趣为 quickstart.to 做贡献！本指南将帮助你入门。

## 贡献类型

### 1. 新 Quickstart

为某项技术或技能添加新指南。

**要求：**
- 标题必须清晰具体
- 描述必须在 10-200 个字符之间
- 内容应该能在 5 分钟或更短时间内完成
- 只包含必要步骤，不要多余内容

**模板类型：**

| 模板 | 适用场景 | 示例 |
|------|----------|------|
| `tool` | CLI 工具、实用程序 | Docker、Git、Vim |
| `language` | 编程语言 | Python、Go、Rust |
| `framework` | Web 框架、UI 库 | React、Django |
| `service` | 云平台 | AWS、GCP、Vercel |
| `concept` | 协议、规范 | GraphQL、OAuth |
| `life` | 非技术内容 | 烹饪、健身 |
| `aha` | 自由形式 | 幽默、讽刺 |
| `collection` | 内容索引 | 主题中心 |
| `people` | 个人说明书 | 协作指南 |

### 2. 个人说明书

在 `quickstart.to/@username` 创建个人"使用说明书"。

**创建方式:**
```bash
pnpm new:people
```

**Frontmatter:**
```yaml
---
display_name: "你的名字"    # 显示名称（必需）
tagline: "一句话介绍"       # 10-160 字符（可选）
---
```

> **注意：** `owner_id` 会在你提交 PR 时由 CI 机器人自动建议添加。你只需点击接受建议即可，无需手动查找 GitHub User ID。

**规则:**
- 目录必须以 `@` 开头（如 `@octocat`）
- 每个 GitHub 用户只能有一个档案（通过 `owner_id` 强制）
- 只有你自己可以修改你的档案
- 变体文件（如 `zh.md`）继承 `default.md` 的所有权

**用户名验证:**
- **同名**：如果你的档案用户名与 GitHub 用户名相同，自动通过验证
- **别名**：如果你想使用不同的用户名（例如：GitHub 是 `john-doe` 但档案是 `@johnny`）：
  1. 正常提交你的 PR
  2. CI 会生成一个验证挑战码
  3. 将挑战码添加到你的社交媒体简介中（Twitter/GitHub 等）
  4. 请求维护者验证并添加 `verified-alias` 标签
  5. 添加标签后，你的 PR 即可合并

### 3. 变体

为现有的 quickstart 添加变体（例如：中文翻译、高级版本）。

**变体工作方式：**
- `default.md` - 必需的默认版本
- `zh.md` - 中文变体
- `advanced.md` - 高级变体
- 其他 `{name}.md` 文件

### 4. 改进

修复错别字、提高清晰度或更新过时信息。

### 5. 新模板

添加新的内容模板类型（维护者级别贡献）。

**步骤：**
1. 创建模板文件：`src/templates/{name}.md`
2. 更新类型定义：`scripts/validate/types.ts`
3. 更新文档：`CLAUDE.md`、`CONTRIBUTING.md`

## 开始

### 1. Fork 并克隆

```bash
git clone https://github.com/YOUR_USERNAME/quickstart.to.git
cd quickstart.to
pnpm install
```

### 2. 创建新 Quickstart

```bash
pnpm new
```

或手动创建：

```
src/content/{category}/{id}/
├── default.md      # 必需的默认版本
├── zh.md           # 可选的中文变体
├── advanced.md     # 可选的高级变体
└── assets/         # 可选的图片
```

### 3. Frontmatter 格式

```yaml
---
title: "你的标题"
description: "功能导向: [做什么] - [价值主张]"
template: "tool"  # 必需: tool/language/framework/service/concept/life/aha/collection
tags: ["标签1", "标签2"]
---
```

### 4. 内容结构

每种模板有不同的必需部分。运行 `pnpm new` 生成正确的结构，或查看 `src/templates/` 中的模板文件。

**示例（tool 模板）：**

```markdown
## TL;DR
一句话定义和重要性说明。

## Quick Start
安装和第一个示例。

## Cheatsheet
常用命令或技巧。

## Gotchas
常见问题和解决方案。

## Next Steps
资源链接。
```

> 不同模板有不同的必需部分。`aha` 和 `collection` 模板是自由形式，没有必需结构。

### 5. 验证内容

```bash
pnpm validate
```

### 6. 本地测试

```bash
pnpm dev
```

### 7. 提交 Pull Request

1. 创建新分支：`git checkout -b feat/my-quickstart`
2. 提交你的更改
3. 推送到你的 fork
4. 打开 Pull Request

## 风格指南

### 写作风格

- **简洁**：没有废话，只有要点
- **可操作**：每个部分都应该有清晰的步骤
- **具体**：包含确切的命令和代码

### 代码块

始终指定语言：

```bash
# 好的写法
npm install package
```

### 图片

- 放在 quickstart 目录内的 `assets/` 文件夹中
- 使用小写字母和连字符命名：`step-1-install.png`
- 使用相对路径引用：`![截图](./assets/screenshot.png)`

### Description 写作

描述功能，而非"快速入门"：

- **好**："在隔离容器中打包运行应用 - 从开发到生产环境始终一致"
- **不好**："5 分钟快速入门 Docker"

## ID 命名规则

- 使用小写字母、数字和连字符
- 不允许下划线、空格或特殊字符
- 示例：`docker`、`react-hooks`、`git入门`

## 验证规则

| 规则 | 描述 |
|------|------|
| ID 命名 | 不允许 `_` `/` 空格 `?#&=.` |
| ID 冲突 | 同一 ID 只能存在于一个分类中 |
| Frontmatter | 必须有 title、description 和 template |
| 描述长度 | 10-200 个字符 |
| 资源命名 | 小写字母和连字符 |
| 结构 | 必需部分因模板类型而异 |

## 需要帮助？

- 打开 [Issue](https://github.com/quickstart-to/quickstart.to/issues)
- 查看现有的 [Discussions](https://github.com/quickstart-to/quickstart.to/discussions)

## 许可证

通过贡献，你同意你的贡献将在 MIT 许可证下发布。
