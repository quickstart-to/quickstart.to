---
title: "GitLab CI"
description: "CI/CD integre a GitLab - pipelines, runners, auto DevOps, integre a la plateforme GitLab"
template: "tool"
tags: ["ci-cd", "devops", "gitlab"]
---

## TL;DR

**Quoi** : Système CI/CD intégré aux dépôts GitLab.

**Pourquoi** : Intégration native GitLab, config YAML, auto DevOps, registre de conteneurs inclus.

## Quick Start

**Créez `.gitlab-ci.yml`** à la racine du dépôt :
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

**Déclencher** : Poussez vers le dépôt. Voir dans **CI/CD → Pipelines**.

## Cheatsheet

| Concept | Description |
|---------|-------------|
| `stages` | Définir les stages du pipeline |
| `script` | Commandes à exécuter |
| `only/except` | Filtrage par branche |
| `rules` | Conditions avancées |
| `artifacts` | Sauvegarder les outputs |
| `cache` | Accélérer les builds |
| `services` | Conteneurs liés |

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
    DEPLOY_KEY: $CI_DEPLOY_KEY  # Définir dans les paramètres CI/CD
```

### Include templates

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - local: .gitlab/ci/build.yml
  - remote: https://example.com/ci-template.yml
```

## Next Steps

- [Documentation GitLab CI](https://docs.gitlab.com/ee/ci/) - Docs officielles
- [Référence YAML CI/CD](https://docs.gitlab.com/ee/ci/yaml/) - Syntaxe complète
- [Variables prédéfinies](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - Variables intégrées
- [Exemples CI/CD](https://docs.gitlab.com/ee/ci/examples/) - Configs exemple
