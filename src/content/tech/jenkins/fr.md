---
title: "Jenkins"
description: "Démarrez avec Jenkins CI/CD en 5 minutes"
template: "tool"
tags: ["ci-cd", "devops", "automation"]
---

## TL;DR

**Quoi** : Serveur d'automatisation open-source pour les pipelines CI/CD.

**Pourquoi** : Hautement extensible, 1800+ plugins, pipeline-as-code, contrôle auto-hébergé.

## Quick Start

**Installation avec Docker** :
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Récupérer le mot de passe admin initial
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**Accès** : Ouvrez `http://localhost:8080`

**Installation avec Homebrew (macOS)** :
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

## Cheatsheet

| Action | Emplacement |
|--------|----------|
| Créer un job | Nouvel Item → Pipeline |
| Configurer un job | Job → Configurer |
| Voir les builds | Job → Historique des builds |
| Gérer les plugins | Administrer Jenkins → Plugins |
| Config système | Administrer Jenkins → Système |
| Identifiants | Administrer Jenkins → Identifiants |

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

- [Documentation Jenkins](https://www.jenkins.io/doc/) - Docs officielles
- [Syntaxe Pipeline](https://www.jenkins.io/doc/book/pipeline/syntax/) - Référence Jenkinsfile
- [Plugins Jenkins](https://plugins.jenkins.io/) - Index des plugins
- [Blue Ocean](https://www.jenkins.io/projects/blueocean/) - Interface moderne
