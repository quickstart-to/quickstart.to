---
title: "ArgoCD"
description: "Get started with ArgoCD GitOps in 5 minutes"
template: "tool"
tags: ["kubernetes", "gitops", "devops"]
---

## TL;DR

**What**: Declarative GitOps continuous delivery tool for Kubernetes.

**Why**: Git as single source of truth, automatic sync, visual dashboard, multi-cluster support.

## Quick Start

**Install in Kubernetes**:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for pods
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

**Install CLI**:
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/
```

**Access UI**:
```bash
# Port forward
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial password
argocd admin initial-password -n argocd

# Login (user: admin)
argocd login localhost:8080
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `argocd app list` | List applications |
| `argocd app create` | Create application |
| `argocd app sync name` | Sync application |
| `argocd app get name` | Get app details |
| `argocd app delete name` | Delete application |
| `argocd cluster add ctx` | Add cluster |
| `argocd repo add url` | Add Git repo |

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
# Manual sync
argocd app sync my-app

# Sync with prune
argocd app sync my-app --prune

# Force sync (replace)
argocd app sync my-app --force

# Rollback
argocd app rollback my-app
```

## Next Steps

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/) - Official docs
- [ArgoCD Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/) - Tutorial
- [Application Specification](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/) - Full spec
- [Best Practices](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/) - Guidelines
