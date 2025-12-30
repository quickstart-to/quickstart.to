---
title: "Helm"
description: "Gestor de paquetes Kubernetes - definir, instalar, actualizar apps con Charts reutilizables y plantillas"
template: "tool"
tags: ["kubernetes", "devops", "package-manager"]
---

## TL;DR

**Qué**: El gestor de paquetes para Kubernetes, administrando charts (paquetes).

**Por qué**: Simplifica despliegues K8s, control de versiones de releases, plantillas reutilizables, rollbacks fáciles.

## Quick Start

**Instalación**:
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verificar
helm version
```

**Añadir repositorio e instalar chart**:
```bash
# Añadir repo oficial
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Instalar nginx
helm install my-nginx bitnami/nginx

# Listar releases
helm list
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `helm repo add name url` | Añadir repo de charts |
| `helm repo update` | Actualizar repos |
| `helm search repo keyword` | Buscar charts |
| `helm install name chart` | Instalar chart |
| `helm upgrade name chart` | Actualizar release |
| `helm uninstall name` | Desinstalar release |
| `helm list` | Listar releases |
| `helm rollback name rev` | Revertir release |

## Gotchas

### Chart structure

```
mychart/
  Chart.yaml          # Metadatos del chart
  values.yaml         # Valores por defecto
  charts/             # Dependencias
  templates/          # Manifiestos K8s
    deployment.yaml
    service.yaml
    _helpers.tpl      # Helpers de plantillas
```

### Chart.yaml

```yaml
apiVersion: v2
name: mychart
description: A Helm chart for my app
version: 0.1.0
appVersion: "1.0.0"

dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: https://charts.bitnami.com/bitnami
```

### values.yaml

```yaml
replicaCount: 2

image:
  repository: nginx
  tag: "1.25"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  limits:
    cpu: 100m
    memory: 128Mi
```

### Template example

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ include "mychart.name" . }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
```

### Common operations

```bash
# Instalar con valores personalizados
helm install my-app ./mychart -f custom-values.yaml

# Instalar con valores set
helm install my-app ./mychart --set replicaCount=3

# Dry-run (vista previa)
helm install my-app ./mychart --dry-run --debug

# Actualizar release
helm upgrade my-app ./mychart --set image.tag=v2

# Revertir a versión anterior
helm rollback my-app 1

# Mostrar historial de releases
helm history my-app
```

## Next Steps

- [Documentación de Helm](https://helm.sh/docs/) - Docs oficiales
- [Artifact Hub](https://artifacthub.io/) - Encontrar charts
- [Guía de plantillas Chart](https://helm.sh/docs/chart_template_guide/) - Templating
- [Mejores prácticas de Helm](https://helm.sh/docs/chart_best_practices/) - Directrices
