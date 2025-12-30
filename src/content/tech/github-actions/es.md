---
title: "GitHub Actions"
description: "Comienza con GitHub Actions CI/CD en 5 minutos"
template: "tool"
tags: ["devops", "ci-cd", "automation"]
---

## TL;DR

**Qué**: Plataforma de CI/CD y automatización integrada en GitHub.

**Por qué**: Integración nativa con GitHub, gratis para repos públicos, marketplace de actions, builds matriciales.

## Quick Start

Crea `.github/workflows/ci.yml`:
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

Haz push para disparar el workflow.

## Cheatsheet

| Disparador | Sintaxis |
|---------|--------|
| Push | `on: push` |
| Pull request | `on: pull_request` |
| Programado | `on: schedule: - cron: '0 0 * * *'` |
| Manual | `on: workflow_dispatch` |
| Otro workflow | `on: workflow_call` |

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

- [Documentación de GitHub Actions](https://docs.github.com/en/actions) - Docs oficiales
- [Marketplace de Actions](https://github.com/marketplace?type=actions) - Actions pre-construidas
- [Sintaxis de Workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) - Referencia
- [Patrones de GitHub Actions](https://github.com/sdras/awesome-actions) - Ejemplos
