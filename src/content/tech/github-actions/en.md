---
title: "GitHub Actions"
description: "Get started with GitHub Actions CI/CD in 5 minutes"
tags: ["devops", "ci-cd", "automation"]
---

## TL;DR

**What**: GitHub's built-in CI/CD and automation platform.

**Why**: Native GitHub integration, free for public repos, marketplace of actions, matrix builds.

## Quick Start

Create `.github/workflows/ci.yml`:
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

Push to trigger the workflow.

## Cheatsheet

| Trigger | Syntax |
|---------|--------|
| Push | `on: push` |
| Pull request | `on: pull_request` |
| Schedule | `on: schedule: - cron: '0 0 * * *'` |
| Manual | `on: workflow_dispatch` |
| Other workflow | `on: workflow_call` |

## Gotchas

### Matrix builds

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

### Secrets and environment variables

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

### Caching dependencies

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### Conditional steps

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: ./deploy.sh
```

### Artifacts

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build
    path: dist/
```

## Next Steps

- [GitHub Actions Documentation](https://docs.github.com/en/actions) - Official docs
- [Actions Marketplace](https://github.com/marketplace?type=actions) - Pre-built actions
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) - Reference
- [GitHub Actions Patterns](https://github.com/sdras/awesome-actions) - Examples
