---
title: "Jenkins"
description: "Get started with Jenkins CI/CD in 5 minutes"
template: "tool"
tags: ["ci-cd", "devops", "automation"]
---

## TL;DR

**What**: Open-source automation server for CI/CD pipelines.

**Why**: Highly extensible, 1800+ plugins, pipeline-as-code, self-hosted control.

## Quick Start

**Install with Docker**:
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**Access**: Open `http://localhost:8080`

**Install with Homebrew (macOS)**:
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

## Cheatsheet

| Action | Location |
|--------|----------|
| Create job | New Item → Pipeline |
| Configure job | Job → Configure |
| View builds | Job → Build History |
| Manage plugins | Manage Jenkins → Plugins |
| System config | Manage Jenkins → System |
| Credentials | Manage Jenkins → Credentials |

## Gotchas

### Declarative Pipeline (Jenkinsfile)

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

### Pipeline with Docker

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

### Using credentials

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

### Parallel stages

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

- [Jenkins Documentation](https://www.jenkins.io/doc/) - Official docs
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/) - Jenkinsfile reference
- [Jenkins Plugins](https://plugins.jenkins.io/) - Plugin index
- [Blue Ocean](https://www.jenkins.io/projects/blueocean/) - Modern UI
