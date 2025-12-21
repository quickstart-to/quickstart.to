# quickstart.to

> 一切事物的精华指南

[English](./README.md)

一个开源的社区驱动的"无废话"知识库，为每种技术和技能提供最简可行的指南。

## 什么是 quickstart.to？

quickstart.to 是一个简洁、可操作的快速入门指南集合。每个指南都旨在让你在 5 分钟或更短时间内上手，没有废话。

- **无废话**：只有要点，没有冗长的解释
- **社区驱动**：任何人都可以贡献
- **多语言**：支持多种语言
- **开源**：MIT 许可证

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
│   │       ├── en.md   # 英文版
│   │       ├── zh.md   # 中文版
│   │       └── assets/ # 图片和资源
│   └── life/           # 生活技能类指南
├── components/         # Astro 组件
├── layouts/            # 页面布局
├── pages/              # 路由页面
└── i18n/               # 国际化
```

## 贡献

我们欢迎贡献！请参阅 [CONTRIBUTING.zh.md](./CONTRIBUTING.zh.md) 了解指南。

### 贡献类型

- **新 quickstart**：添加新指南
- **翻译**：翻译现有指南
- **改进**：修复错别字，提高清晰度

## 技术栈

- [Astro](https://astro.build/) - 静态网站生成器
- [Pagefind](https://pagefind.app/) - 静态搜索
- [Cloudflare Pages](https://pages.cloudflare.com/) - 托管

## 许可证

MIT
