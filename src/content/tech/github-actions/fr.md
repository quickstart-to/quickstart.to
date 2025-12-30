---
title: "GitHub Actions"
description: "CI/CD natif GitHub - automatiser workflows sur push, PR, planification, gratuit pour repos publics"
template: "tool"
tags: ["devops", "ci-cd", "automation"]
---

## TL;DR

**Quoi** : Plateforme CI/CD et d'automatisation intégrée à GitHub.

**Pourquoi** : Intégration native GitHub, gratuit pour les repos publics, marketplace d'actions, builds matriciels.

## Quick Start

Créez `.github/workflows/ci.yml` :
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

Poussez pour déclencher le workflow.

## Cheatsheet

| Déclencheur | Syntaxe |
|---------|--------|
| Push | `on: push` |
| Pull request | `on: pull_request` |
| Planifié | `on: schedule: - cron: '0 0 * * *'` |
| Manuel | `on: workflow_dispatch` |
| Autre workflow | `on: workflow_call` |

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

- [Documentation GitHub Actions](https://docs.github.com/en/actions) - Docs officielles
- [Marketplace Actions](https://github.com/marketplace?type=actions) - Actions pré-construites
- [Syntaxe Workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) - Référence
- [Patterns GitHub Actions](https://github.com/sdras/awesome-actions) - Exemples
