---
title: "pnpm"
description: "5 分钟快速入门 pnpm 包管理器"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**是什么**：快速、节省磁盘空间的 Node.js 包管理器。

**为什么用**：比 npm 快 2 倍、节省磁盘空间、严格依赖、优秀的 monorepo 支持。

## Quick Start

**安装**：
```bash
# npm
npm install -g pnpm

# Homebrew
brew install pnpm

# 检查版本
pnpm --version
```

**基本用法**：
```bash
pnpm init
pnpm add express
pnpm install
pnpm dev
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `pnpm add pkg` | 添加依赖 |
| `pnpm add -D pkg` | 添加开发依赖 |
| `pnpm remove pkg` | 移除包 |
| `pnpm install` | 安装所有依赖 |
| `pnpm update` | 更新包 |
| `pnpm run script` | 运行脚本 |
| `pnpm dlx pkg` | 执行包（类似 npx）|

## Gotchas

### 安装包

```bash
# 生产依赖
pnpm add express

# 开发依赖
pnpm add -D typescript

# 全局包
pnpm add -g nodemon

# 特定版本
pnpm add lodash@4.17.21

# 从工作区
pnpm add @myorg/shared --filter @myorg/web
```

### 工作区（monorepo）

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```bash
# 安装所有工作区依赖
pnpm install

# 在特定包中运行脚本
pnpm --filter @myorg/web dev

# 在所有包中运行
pnpm -r run build

# 向特定包添加依赖
pnpm add lodash --filter @myorg/utils

# 添加工作区依赖
pnpm add @myorg/shared --filter @myorg/web --workspace
```

### 过滤

```bash
# 按包名
pnpm --filter @myorg/web dev

# 按目录
pnpm --filter ./packages/web dev

# 所有包
pnpm -r run test

# 有更改的包
pnpm --filter "...[origin/main]" run test

# 包的依赖
pnpm --filter "@myorg/web..." run build
```

### 配置（.npmrc）

```ini
# 严格模式（推荐）
strict-peer-dependencies=true
auto-install-peers=true

# 羞耻地提升（兼容模式）
shamefully-hoist=true

# 存储位置
store-dir=~/.pnpm-store

# 镜像源
registry=https://registry.npmmirror.com
```

### 从 npm/yarn 迁移

```bash
# 从 package-lock.json 导入
pnpm import

# 或者删除后重新安装
rm -rf node_modules package-lock.json yarn.lock
pnpm install
```

### 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  }
}
```

```bash
# 运行脚本
pnpm dev
pnpm run build

# 运行二进制
pnpm exec vitest

# 不安装直接执行包
pnpm dlx create-react-app my-app
```

## Next Steps

- [pnpm 文档](https://pnpm.io/) - 官方文档
- [工作区](https://pnpm.io/workspaces) - Monorepo 指南
- [过滤](https://pnpm.io/filtering) - 包选择
- [pnpm vs npm vs yarn](https://pnpm.io/benchmarks) - 基准测试
