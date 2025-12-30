---
title: "GitLab CI"
description: "Comienza con GitLab CI/CD en 5 minutos"
template: "tool"
tags: ["ci-cd", "devops", "gitlab"]
---

## TL;DR

**Qué**: Sistema CI/CD integrado con repositorios GitLab.

**Por qué**: Integración nativa con GitLab, config YAML, auto DevOps, registro de contenedores incluido.

## Quick Start

**Crea `.gitlab-ci.yml`** en la raíz del repositorio:
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build

test:
  stage: test
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - echo "Deploying..."
  only:
    - main
```

**Disparar**: Haz push al repositorio. Ver en **CI/CD → Pipelines**.

## Cheatsheet

| Concepto | Descripción |
|---------|-------------|
| `stages` | Definir stages del pipeline |
| `script` | Comandos a ejecutar |
| `only/except` | Filtrado por rama |
| `rules` | Condiciones avanzadas |
| `artifacts` | Guardar outputs de build |
| `cache` | Acelerar builds |
| `services` | Contenedores enlazados |

## Gotchas

### Complete pipeline example

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

default:
  image: node:${NODE_VERSION}
  cache:
    paths:
      - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

test:
  stage: test
  script:
    - npm ci
    - npm test
  coverage: '/Coverage: \d+\.\d+%/'

deploy_staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.example.com
  rules:
    - if: $CI_COMMIT_BRANCH == "develop"

deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://example.com
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
  when: manual
```

### Using services (Docker in Docker)

```yaml
build_image:
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA
```

### Matrix jobs

```yaml
test:
  stage: test
  parallel:
    matrix:
      - NODE_VERSION: ["16", "18", "20"]
  image: node:${NODE_VERSION}
  script:
    - npm test
```

### Using secrets

```yaml
deploy:
  stage: deploy
  script:
    - echo "$DEPLOY_KEY" > key.pem
    - chmod 600 key.pem
    - scp -i key.pem dist/* user@server:/var/www/
  variables:
    DEPLOY_KEY: $CI_DEPLOY_KEY  # Configurar en ajustes CI/CD
```

### Include templates

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - local: .gitlab/ci/build.yml
  - remote: https://example.com/ci-template.yml
```

## Next Steps

- [Documentación de GitLab CI](https://docs.gitlab.com/ee/ci/) - Docs oficiales
- [Referencia YAML CI/CD](https://docs.gitlab.com/ee/ci/yaml/) - Sintaxis completa
- [Variables predefinidas](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - Variables integradas
- [Ejemplos CI/CD](https://docs.gitlab.com/ee/ci/examples/) - Configs de ejemplo
