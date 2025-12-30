---
title: "GitLab CI"
description: "Integriertes GitLab CI/CD - Pipelines, Runner, Auto DevOps, in GitLab-Plattform eingebaut"
template: "tool"
tags: ["ci-cd", "devops", "gitlab"]
---

## TL;DR

**Was**: Eingebautes CI/CD-System integriert mit GitLab-Repositories.

**Warum**: Native GitLab-Integration, YAML-Konfiguration, Auto DevOps, Container Registry inklusive.

## Quick Start

**Erstellen Sie `.gitlab-ci.yml`** im Repository-Root:
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

**Trigger**: Pushen Sie zum Repository. Ansicht unter **CI/CD → Pipelines**.

## Cheatsheet

| Konzept | Beschreibung |
|---------|-------------|
| `stages` | Pipeline-Stages definieren |
| `script` | Auszuführende Befehle |
| `only/except` | Branch-Filterung |
| `rules` | Erweiterte Bedingungen |
| `artifacts` | Build-Outputs speichern |
| `cache` | Builds beschleunigen |
| `services` | Verlinkte Container |

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
    DEPLOY_KEY: $CI_DEPLOY_KEY  # In CI/CD-Einstellungen setzen
```

### Include templates

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - local: .gitlab/ci/build.yml
  - remote: https://example.com/ci-template.yml
```

## Next Steps

- [GitLab CI Dokumentation](https://docs.gitlab.com/ee/ci/) - Offizielle Docs
- [CI/CD YAML Referenz](https://docs.gitlab.com/ee/ci/yaml/) - Vollständige Syntax
- [Vordefinierte Variablen](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - Eingebaute Variablen
- [CI/CD Beispiele](https://docs.gitlab.com/ee/ci/examples/) - Beispielkonfigurationen
