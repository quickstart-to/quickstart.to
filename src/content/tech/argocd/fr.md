---
title: "ArgoCD"
description: "Démarrez avec ArgoCD GitOps en 5 minutes"
template: "tool"
tags: ["kubernetes", "gitops", "devops"]
---

## TL;DR

**Quoi**: Outil de livraison continue GitOps déclaratif pour Kubernetes.

**Pourquoi**: Git comme source unique de vérité, synchronisation automatique, tableau de bord visuel, support multi-cluster.

## Quick Start

**Installer dans Kubernetes**:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Attendre les pods
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

**Installer le CLI**:
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/
```

**Accéder à l'UI**:
```bash
# Redirection de port
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Obtenir le mot de passe initial
argocd admin initial-password -n argocd

# Se connecter (utilisateur: admin)
argocd login localhost:8080
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `argocd app list` | Lister les applications |
| `argocd app create` | Créer une application |
| `argocd app sync name` | Synchroniser l'application |
| `argocd app get name` | Obtenir les détails de l'app |
| `argocd app delete name` | Supprimer l'application |
| `argocd cluster add ctx` | Ajouter un cluster |
| `argocd repo add url` | Ajouter un repo Git |

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
# Synchronisation manuelle
argocd app sync my-app

# Sync avec prune
argocd app sync my-app --prune

# Force sync (remplacement)
argocd app sync my-app --force

# Rollback
argocd app rollback my-app
```

## Next Steps

- [Documentation ArgoCD](https://argo-cd.readthedocs.io/) - Documentation officielle
- [Premiers pas ArgoCD](https://argo-cd.readthedocs.io/en/stable/getting_started/) - Tutoriel
- [Spécification d'application](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/) - Spécification complète
- [Bonnes pratiques](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/) - Directives
