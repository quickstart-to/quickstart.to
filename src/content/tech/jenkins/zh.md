---
title: "Jenkins"
description: "开源自动化服务器 - 构建流水线、可扩展插件、自托管 CI/CD"
template: "tool"
tags: ["ci-cd", "devops", "automation"]
---

## TL;DR

**是什么**：开源的 CI/CD 自动化服务器。

**为什么用**：高度可扩展、1800+ 插件、流水线即代码、自托管控制。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# 获取初始管理员密码
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**访问**：打开 `http://localhost:8080`

**使用 Homebrew 安装（macOS）**：
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

## Cheatsheet

| 操作 | 位置 |
|--------|----------|
| 创建任务 | New Item → Pipeline |
| 配置任务 | Job → Configure |
| 查看构建 | Job → Build History |
| 管理插件 | Manage Jenkins → Plugins |
| 系统配置 | Manage Jenkins → System |
| 凭证管理 | Manage Jenkins → Credentials |

## Gotchas

### 声明式 Pipeline（Jenkinsfile）

```groovy
pipeline {
    agent any

    environment {
        APP_NAME = 'myapp'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
```

### 使用 Docker 的 Pipeline

```groovy
pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
```

### 使用凭证

```groovy
pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('docker-hub-creds')
    }

    stages {
        stage('Push') {
            steps {
                sh '''
                    echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                    docker push myimage:latest
                '''
            }
        }
    }
}
```

### 并行阶段

```groovy
stage('Tests') {
    parallel {
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }
        stage('Integration Tests') {
            steps {
                sh 'npm run test:integration'
            }
        }
    }
}
```

## Next Steps

- [Jenkins 文档](https://www.jenkins.io/doc/) - 官方文档
- [Pipeline 语法](https://www.jenkins.io/doc/book/pipeline/syntax/) - Jenkinsfile 参考
- [Jenkins 插件](https://plugins.jenkins.io/) - 插件索引
- [Blue Ocean](https://www.jenkins.io/projects/blueocean/) - 现代 UI
