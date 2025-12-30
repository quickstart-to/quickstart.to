---
title: "Jenkins"
description: "Open-Source-Automatisierungsserver - Build-Pipelines, erweiterbare Plugins, selbstgehostetes CI/CD"
template: "tool"
tags: ["ci-cd", "devops", "automation"]
---

## TL;DR

**Was**: Open-Source-Automatisierungsserver für CI/CD-Pipelines.

**Warum**: Hochgradig erweiterbar, 1800+ Plugins, Pipeline-as-Code, selbst gehostete Kontrolle.

## Quick Start

**Installation mit Docker**:
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Initiales Admin-Passwort abrufen
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**Zugang**: Öffnen Sie `http://localhost:8080`

**Installation mit Homebrew (macOS)**:
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

## Cheatsheet

| Aktion | Ort |
|--------|----------|
| Job erstellen | Neues Item → Pipeline |
| Job konfigurieren | Job → Konfigurieren |
| Builds anzeigen | Job → Build-Verlauf |
| Plugins verwalten | Jenkins verwalten → Plugins |
| Systemkonfiguration | Jenkins verwalten → System |
| Anmeldedaten | Jenkins verwalten → Anmeldedaten |

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

- [Jenkins Dokumentation](https://www.jenkins.io/doc/) - Offizielle Docs
- [Pipeline-Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/) - Jenkinsfile-Referenz
- [Jenkins Plugins](https://plugins.jenkins.io/) - Plugin-Index
- [Blue Ocean](https://www.jenkins.io/projects/blueocean/) - Moderne UI
