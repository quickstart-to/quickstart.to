---
title: "Helm"
description: "Kubernetes package manager - define, install, upgrade apps with reusable Charts and templating"
template: "tool"
tags: ["kubernetes", "devops", "package-manager"]
---

## TL;DR

**What**: The package manager for Kubernetes, managing charts (packages).

**Why**: Simplify K8s deployments, version control releases, reusable templates, easy rollbacks.

## Quick Start

**Install**:
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

**Add repository and install chart**:
```bash
# Add official repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install nginx
helm install my-nginx bitnami/nginx

# List releases
helm list
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `helm repo add name url` | Add chart repo |
| `helm repo update` | Update repos |
| `helm search repo keyword` | Search charts |
| `helm install name chart` | Install chart |
| `helm upgrade name chart` | Upgrade release |
| `helm uninstall name` | Uninstall release |
| `helm list` | List releases |
| `helm rollback name rev` | Rollback release |

## Gotchas

### Chart structure

```
mychart/
  Chart.yaml          # Chart metadata
  values.yaml         # Default values
  charts/             # Dependencies
  templates/          # K8s manifests
    deployment.yaml
    service.yaml
    _helpers.tpl      # Template helpers
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
# Install with custom values
helm install my-app ./mychart -f custom-values.yaml

# Install with set values
helm install my-app ./mychart --set replicaCount=3

# Dry run (preview)
helm install my-app ./mychart --dry-run --debug

# Upgrade release
helm upgrade my-app ./mychart --set image.tag=v2

# Rollback to previous
helm rollback my-app 1

# Show release history
helm history my-app
```

## Next Steps

- [Helm Documentation](https://helm.sh/docs/) - Official docs
- [Artifact Hub](https://artifacthub.io/) - Find charts
- [Chart Template Guide](https://helm.sh/docs/chart_template_guide/) - Templating
- [Helm Best Practices](https://helm.sh/docs/chart_best_practices/) - Guidelines
