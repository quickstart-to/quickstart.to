---
title: "GitLab CI"
description: "Integrated GitLab CI/CD - pipelines, runners, auto DevOps, built into GitLab platform"
template: "tool"
tags: ["ci-cd", "devops", "gitlab"]
---

## TL;DR

**What**: Built-in CI/CD system integrated with GitLab repositories.

**Why**: Native GitLab integration, YAML config, auto DevOps, container registry included.

## Quick Start

**Create `.gitlab-ci.yml`** in repository root:
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

**Trigger**: Push to repository. View at **CI/CD → Pipelines**.

## Cheatsheet

| Concept | Description |
|---------|-------------|
| `stages` | Define pipeline stages |
| `script` | Commands to run |
| `only/except` | Branch filtering |
| `rules` | Advanced conditions |
| `artifacts` | Save build outputs |
| `cache` | Speed up builds |
| `services` | Linked containers |

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
    DEPLOY_KEY: $CI_DEPLOY_KEY  # Set in CI/CD Settings
```

### Include templates

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - local: .gitlab/ci/build.yml
  - remote: https://example.com/ci-template.yml
```

## Next Steps

- [GitLab CI Documentation](https://docs.gitlab.com/ee/ci/) - Official docs
- [CI/CD YAML Reference](https://docs.gitlab.com/ee/ci/yaml/) - Complete syntax
- [Predefined Variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - Built-in vars
- [CI/CD Examples](https://docs.gitlab.com/ee/ci/examples/) - Sample configs
