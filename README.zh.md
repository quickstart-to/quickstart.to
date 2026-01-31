# quickstart.to

> 一切事物的精华指南

[English](./README.md)

一个开源的社区驱动的"无废话"知识库，为每种技术和技能提供最简可行的指南。

## 什么是 quickstart.to？

quickstart.to 是一个简洁、可操作的快速入门指南集合。每个指南都旨在让你在 5 分钟或更短时间内上手，没有废话。

- **无废话**：只有要点，没有冗长的解释
- **社区驱动**：任何人都可以贡献
- **变体支持**：每个主题支持多个版本（翻译、高级版本等）
- **开源**：MIT 许可证

## 个人说明书

在 `quickstart.to/@username` 创建你的个人"使用说明书"。

**理念:**

个人说明书不是简历或作品集——它是一份**协作指南**。我们鼓励这样的说明书：

- **帮助他人与你协作** - 最佳联系方式是什么？你能在哪些领域提供帮助？
- **保持可操作性** - 跳过人生故事，聚焦于协作相关的信息
- **保持更新** - 更新你正在做的事，而非静态的个人简介
- **真实呈现** - 你的工作风格、偏好和习惯都是有价值的信息

把它想象成属于*你*的 README。

**功能特点:**
- **专属页面**: `quickstart.to/@你的用户名`
- **身份验证**: 与你的 GitHub 账号绑定
- **多语言**: 支持变体（如 `/@username/zh`）

**快速开始:**
```bash
pnpm new:people
```

**建议章节:**
- 我是谁？*（简短介绍，当前状态）*
- 我擅长什么？*（核心技能和专长）*
- 我能帮什么忙？*（可以协作的方向）*
- 我正在做什么？*（当前项目）*
- 我的工作方式 *（工作风格和偏好）*
- 如何联系我？*（联系偏好）*

详见 [CONTRIBUTING.zh.md](./CONTRIBUTING.zh.md#2-个人说明书)。

## 快速开始

### 前提条件

- Node.js 20+
- pnpm

### 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 创建新的 Quickstart

```bash
pnpm new
```

这个交互式 CLI 将引导你创建一个新的 quickstart。

### 验证内容

```bash
pnpm validate
```

对内容文件运行所有验证检查。

## 项目结构

```
src/
├── content/
│   ├── tech/           # 技术类指南
│   │   └── {id}/
│   │       ├── default.md  # 默认版本（必需）
│   │       ├── zh.md       # 中文变体（可选）
│   │       └── assets/     # 图片和资源
│   ├── life/           # 生活技能类指南
│   └── people/         # 个人说明书
│       └── @{username}/
│           ├── default.md
│           └── zh.md
├── components/         # Astro 组件
├── layouts/            # 页面布局
├── pages/              # 路由页面
└── utils/              # 工具函数
```

## 贡献

我们欢迎贡献！请参阅 [CONTRIBUTING.zh.md](./CONTRIBUTING.zh.md) 了解指南。

### 贡献类型

- **新 quickstart**：添加新指南
- **个人说明书**：在 `/@username` 创建你的个人页面
- **变体**：添加翻译或其他版本
- **改进**：修复错别字，提高清晰度

## 技术栈

- [Astro](https://astro.build/) - 静态网站生成器
- [Pagefind](https://pagefind.app/) - 静态搜索
- [Cloudflare Pages](https://pages.cloudflare.com/) - 托管

## 许可证

MIT
