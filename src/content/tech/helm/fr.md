---
title: "Helm"
description: "Gestionnaire de paquets Kubernetes - definir, installer, mettre a jour des apps avec Charts reutilisables"
template: "tool"
tags: ["kubernetes", "devops", "package-manager"]
---

## TL;DR

**Quoi** : Le gestionnaire de paquets pour Kubernetes, gérant les charts (paquets).

**Pourquoi** : Simplifie les déploiements K8s, contrôle de version des releases, templates réutilisables, rollbacks faciles.

## Quick Start

**Installation** :
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Vérifier
helm version
```

**Ajouter un dépôt et installer un chart** :
```bash
# Ajouter le dépôt officiel
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Installer nginx
helm install my-nginx bitnami/nginx

# Lister les releases
helm list
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `helm repo add name url` | Ajouter un dépôt de charts |
| `helm repo update` | Mettre à jour les dépôts |
| `helm search repo keyword` | Rechercher des charts |
| `helm install name chart` | Installer un chart |
| `helm upgrade name chart` | Mettre à jour une release |
| `helm uninstall name` | Désinstaller une release |
| `helm list` | Lister les releases |
| `helm rollback name rev` | Rollback d'une release |

## Gotchas

### Chart structure

```
mychart/
  Chart.yaml          # Métadonnées du chart
  values.yaml         # Valeurs par défaut
  charts/             # Dépendances
  templates/          # Manifestes K8s
    deployment.yaml
    service.yaml
    _helpers.tpl      # Helpers de template
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
# Installer avec des valeurs personnalisées
helm install my-app ./mychart -f custom-values.yaml

# Installer avec des valeurs set
helm install my-app ./mychart --set replicaCount=3

# Dry-run (aperçu)
helm install my-app ./mychart --dry-run --debug

# Mettre à jour une release
helm upgrade my-app ./mychart --set image.tag=v2

# Revenir à la version précédente
helm rollback my-app 1

# Afficher l'historique des releases
helm history my-app
```

## Next Steps

- [Documentation Helm](https://helm.sh/docs/) - Docs officielles
- [Artifact Hub](https://artifacthub.io/) - Trouver des charts
- [Guide des templates Chart](https://helm.sh/docs/chart_template_guide/) - Templating
- [Bonnes pratiques Helm](https://helm.sh/docs/chart_best_practices/) - Directives
