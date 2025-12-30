---
title: "GitHub Actions"
description: "Starten Sie mit GitHub Actions CI/CD in 5 Minuten"
template: "tool"
tags: ["devops", "ci-cd", "automation"]
---

## TL;DR

**Was**: GitHubs eingebaute CI/CD- und Automatisierungsplattform.

**Warum**: Native GitHub-Integration, kostenlos für öffentliche Repos, Marktplatz mit Actions, Matrix-Builds.

## Quick Start

Erstellen Sie `.github/workflows/ci.yml`:
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

Pushen Sie, um den Workflow auszulösen.

## Cheatsheet

| Trigger | Syntax |
|---------|--------|
| Push | `on: push` |
| Pull Request | `on: pull_request` |
| Zeitplan | `on: schedule: - cron: '0 0 * * *'` |
| Manuell | `on: workflow_dispatch` |
| Anderer Workflow | `on: workflow_call` |

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

- [GitHub Actions Dokumentation](https://docs.github.com/en/actions) - Offizielle Docs
- [Actions Marktplatz](https://github.com/marketplace?type=actions) - Vorgefertigte Actions
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) - Referenz
- [GitHub Actions Patterns](https://github.com/sdras/awesome-actions) - Beispiele
