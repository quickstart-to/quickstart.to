---
title: "Helm"
description: "Kubernetes-Paketmanager - Apps mit wiederverwendbaren Charts und Templating definieren, installieren, aktualisieren"
template: "tool"
tags: ["kubernetes", "devops", "package-manager"]
---

## TL;DR

**Was**: Der Paketmanager für Kubernetes, verwaltet Charts (Pakete).

**Warum**: Vereinfacht K8s-Deployments, Versionskontrolle für Releases, wiederverwendbare Templates, einfache Rollbacks.

## Quick Start

**Installation**:
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Überprüfen
helm version
```

**Repository hinzufügen und Chart installieren**:
```bash
# Offizielles Repo hinzufügen
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Nginx installieren
helm install my-nginx bitnami/nginx

# Releases auflisten
helm list
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `helm repo add name url` | Chart-Repo hinzufügen |
| `helm repo update` | Repos aktualisieren |
| `helm search repo keyword` | Charts suchen |
| `helm install name chart` | Chart installieren |
| `helm upgrade name chart` | Release upgraden |
| `helm uninstall name` | Release deinstallieren |
| `helm list` | Releases auflisten |
| `helm rollback name rev` | Release zurücksetzen |

## Gotchas

### Chart structure

```
mychart/
  Chart.yaml          # Chart-Metadaten
  values.yaml         # Standardwerte
  charts/             # Abhängigkeiten
  templates/          # K8s-Manifeste
    deployment.yaml
    service.yaml
    _helpers.tpl      # Template-Helfer
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
# Mit benutzerdefinierten Werten installieren
helm install my-app ./mychart -f custom-values.yaml

# Mit set-Werten installieren
helm install my-app ./mychart --set replicaCount=3

# Dry-Run (Vorschau)
helm install my-app ./mychart --dry-run --debug

# Release upgraden
helm upgrade my-app ./mychart --set image.tag=v2

# Auf vorherige Version zurücksetzen
helm rollback my-app 1

# Release-Historie anzeigen
helm history my-app
```

## Next Steps

- [Helm Dokumentation](https://helm.sh/docs/) - Offizielle Docs
- [Artifact Hub](https://artifacthub.io/) - Charts finden
- [Chart Template Guide](https://helm.sh/docs/chart_template_guide/) - Templating
- [Helm Best Practices](https://helm.sh/docs/chart_best_practices/) - Richtlinien
