---
title: "Yarn"
description: "5 分钟快速入门 Yarn 包管理器"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**是什么**：快速、可靠、安全的 JavaScript 包管理器。

**为什么用**：确定性安装、工作区、即插即用、离线缓存。

## Quick Start

**安装**：
```bash
# npm
npm install -g yarn

# Homebrew
brew install yarn

# 检查版本
yarn --version
```

**基本用法**：
```bash
yarn init
yarn add express
yarn install
yarn dev
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `yarn add pkg` | 添加依赖 |
| `yarn add -D pkg` | 添加开发依赖 |
| `yarn remove pkg` | 移除包 |
| `yarn install` | 安装所有依赖 |
| `yarn upgrade` | 升级包 |
| `yarn run script` | 运行脚本 |
| `yarn dlx pkg` | 执行包 |

## Gotchas

### 安装包

```bash
# 生产依赖
yarn add express

# 开发依赖
yarn add -D typescript

# 全局包（Yarn 1）
yarn global add nodemon

# 特定版本
yarn add lodash@4.17.21

# 从 git
yarn add git+https://github.com/user/repo.git
```

### 工作区

```json
// package.json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

```bash
# 安装所有工作区依赖
yarn install

# 在特定工作区运行脚本
yarn workspace @myorg/web dev

# 向工作区添加依赖
yarn workspace @myorg/utils add lodash

# 在所有工作区运行
yarn workspaces foreach run build
```

### Yarn Berry（v2+）

```bash
# 启用 Yarn Berry
yarn set version berry

# 启用即插即用
yarn config set nodeLinker pnp

# 或使用 node_modules
yarn config set nodeLinker node-modules

# 安装
yarn install
```

### 配置（.yarnrc.yml）

```yaml
# Yarn Berry 配置
nodeLinker: node-modules

# 镜像源
npmRegistryServer: "https://registry.npmmirror.com"

# 插件
plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    spec: "@yarnpkg/plugin-workspace-tools"
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
yarn dev
yarn run build

# 执行二进制
yarn exec vitest

# 不安装直接执行
yarn dlx create-react-app my-app
```

### 有用的命令

```bash
# 检查包为什么被安装
yarn why lodash

# 交互式升级
yarn upgrade-interactive

# 检查过时的包
yarn outdated

# 清理缓存
yarn cache clean

# 列出包
yarn list --depth=0
```

## Next Steps

- [Yarn 文档](https://yarnpkg.com/) - 官方文档
- [Yarn Berry](https://yarnpkg.com/getting-started) - v2+ 指南
- [工作区](https://yarnpkg.com/features/workspaces) - Monorepo
- [即插即用](https://yarnpkg.com/features/pnp) - 零安装
