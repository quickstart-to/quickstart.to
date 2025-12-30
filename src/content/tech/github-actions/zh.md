---
title: "GitHub Actions"
description: "GitHub 原生 CI/CD - 在 push、PR、定时触发时自动化工作流，公开仓库免费"
template: "tool"
tags: ["devops", "ci-cd", "automation"]
---

## TL;DR

**是什么**：GitHub 内置的 CI/CD 和自动化平台。

**为什么用**：原生 GitHub 集成、公开仓库免费、市场中有大量 actions、矩阵构建。

## Quick Start

创建 `.github/workflows/ci.yml`：
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

推送代码触发工作流。

## Cheatsheet

| 触发器 | 语法 |
|---------|--------|
| 推送 | `on: push` |
| Pull request | `on: pull_request` |
| 定时 | `on: schedule: - cron: '0 0 * * *'` |
| 手动 | `on: workflow_dispatch` |
| 其他工作流 | `on: workflow_call` |

## Gotchas

### 矩阵构建

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
```

### 密钥和环境变量

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
    steps:
      - run: echo ${{ secrets.API_KEY }}
      - run: echo $NODE_ENV
```

### 缓存依赖

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 条件步骤

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: ./deploy.sh
```

### 构建产物

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build
    path: dist/
```

## Next Steps

- [GitHub Actions 文档](https://docs.github.com/en/actions) - 官方文档
- [Actions 市场](https://github.com/marketplace?type=actions) - 预构建 actions
- [工作流语法](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) - 参考
- [GitHub Actions 模式](https://github.com/sdras/awesome-actions) - 示例
