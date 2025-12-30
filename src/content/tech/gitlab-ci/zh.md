---
title: "GitLab CI"
description: "GitLab 集成 CI/CD - 流水线、Runner、自动 DevOps，内置于 GitLab 平台"
template: "tool"
tags: ["ci-cd", "devops", "gitlab"]
---

## TL;DR

**是什么**：与 GitLab 仓库集成的内置 CI/CD 系统。

**为什么用**：原生 GitLab 集成、YAML 配置、自动 DevOps、内置容器镜像仓库。

## Quick Start

**在仓库根目录创建 `.gitlab-ci.yml`**：
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

**触发**：推送到仓库。在 **CI/CD → Pipelines** 查看。

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| `stages` | 定义流水线阶段 |
| `script` | 运行的命令 |
| `only/except` | 分支过滤 |
| `rules` | 高级条件 |
| `artifacts` | 保存构建输出 |
| `cache` | 加速构建 |
| `services` | 关联容器 |

## Gotchas

### 完整流水线示例

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

### 使用服务（Docker in Docker）

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

### 矩阵任务

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

### 使用密钥

```yaml
deploy:
  stage: deploy
  script:
    - echo "$DEPLOY_KEY" > key.pem
    - chmod 600 key.pem
    - scp -i key.pem dist/* user@server:/var/www/
  variables:
    DEPLOY_KEY: $CI_DEPLOY_KEY  # 在 CI/CD 设置中配置
```

### 包含模板

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - local: .gitlab/ci/build.yml
  - remote: https://example.com/ci-template.yml
```

## Next Steps

- [GitLab CI 文档](https://docs.gitlab.com/ee/ci/) - 官方文档
- [CI/CD YAML 参考](https://docs.gitlab.com/ee/ci/yaml/) - 完整语法
- [预定义变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - 内置变量
- [CI/CD 示例](https://docs.gitlab.com/ee/ci/examples/) - 示例配置
