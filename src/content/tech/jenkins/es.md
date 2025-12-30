---
title: "Jenkins"
description: "Servidor de automatizacion open-source - pipelines de build, plugins extensibles, CI/CD auto-alojado"
template: "tool"
tags: ["ci-cd", "devops", "automation"]
---

## TL;DR

**Qué**: Servidor de automatización open-source para pipelines CI/CD.

**Por qué**: Altamente extensible, 1800+ plugins, pipeline-as-code, control auto-alojado.

## Quick Start

**Instalación con Docker**:
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Obtener contraseña admin inicial
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**Acceso**: Abre `http://localhost:8080`

**Instalación con Homebrew (macOS)**:
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

## Cheatsheet

| Acción | Ubicación |
|--------|----------|
| Crear job | Nuevo Item → Pipeline |
| Configurar job | Job → Configurar |
| Ver builds | Job → Historial de builds |
| Gestionar plugins | Administrar Jenkins → Plugins |
| Config del sistema | Administrar Jenkins → Sistema |
| Credenciales | Administrar Jenkins → Credenciales |

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

- [Documentación de Jenkins](https://www.jenkins.io/doc/) - Docs oficiales
- [Sintaxis de Pipeline](https://www.jenkins.io/doc/book/pipeline/syntax/) - Referencia de Jenkinsfile
- [Plugins de Jenkins](https://plugins.jenkins.io/) - Índice de plugins
- [Blue Ocean](https://www.jenkins.io/projects/blueocean/) - UI moderna
