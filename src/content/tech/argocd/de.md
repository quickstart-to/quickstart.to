---
title: "ArgoCD"
description: "Starten Sie mit ArgoCD GitOps in 5 Minuten"
template: "tool"
tags: ["kubernetes", "gitops", "devops"]
---

## TL;DR

**Was**: Deklaratives GitOps Continuous-Delivery-Tool für Kubernetes.

**Warum**: Git als einzige Wahrheitsquelle, automatische Synchronisierung, visuelles Dashboard, Multi-Cluster-Unterstützung.

## Quick Start

**In Kubernetes installieren**:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Auf Pods warten
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

**CLI installieren**:
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/
```

**UI aufrufen**:
```bash
# Port-Weiterleitung
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Initiales Passwort abrufen
argocd admin initial-password -n argocd

# Anmelden (Benutzer: admin)
argocd login localhost:8080
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `argocd app list` | Anwendungen auflisten |
| `argocd app create` | Anwendung erstellen |
| `argocd app sync name` | Anwendung synchronisieren |
| `argocd app get name` | App-Details abrufen |
| `argocd app delete name` | Anwendung löschen |
| `argocd cluster add ctx` | Cluster hinzufügen |
| `argocd repo add url` | Git-Repo hinzufügen |

## Gotchas

### Application manifest

```yaml
# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/user/repo.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

### Create app via CLI

```bash
argocd app create my-app \
  --repo https://github.com/user/repo.git \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace my-app \
  --sync-policy automated
```

### Helm application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx
  namespace: argocd
spec:
  source:
    repoURL: https://charts.bitnami.com/bitnami
    chart: nginx
    targetRevision: 15.0.0
    helm:
      values: |
        replicaCount: 2
        service:
          type: LoadBalancer
  destination:
    server: https://kubernetes.default.svc
    namespace: nginx
```

### Kustomize application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/user/repo.git
    path: overlays/production
    targetRevision: main
    kustomize:
      images:
        - myapp=myrepo/myapp:v2
  destination:
    server: https://kubernetes.default.svc
    namespace: production
```

### Sync operations

```bash
# Manuelle Synchronisierung
argocd app sync my-app

# Sync mit Prune
argocd app sync my-app --prune

# Force-Sync (ersetzen)
argocd app sync my-app --force

# Rollback
argocd app rollback my-app
```

## Next Steps

- [ArgoCD-Dokumentation](https://argo-cd.readthedocs.io/) - Offizielle Dokumentation
- [ArgoCD Erste Schritte](https://argo-cd.readthedocs.io/en/stable/getting_started/) - Tutorial
- [Application-Spezifikation](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/) - Vollständige Spezifikation
- [Best Practices](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/) - Richtlinien
