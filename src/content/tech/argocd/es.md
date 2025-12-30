---
title: "ArgoCD"
description: "Comienza con ArgoCD GitOps en 5 minutos"
template: "tool"
tags: ["kubernetes", "gitops", "devops"]
---

## TL;DR

**Qué**: Herramienta de entrega continua GitOps declarativa para Kubernetes.

**Por qué**: Git como única fuente de verdad, sincronización automática, panel visual, soporte multi-cluster.

## Quick Start

**Instalar en Kubernetes**:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Esperar pods
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

**Instalar CLI**:
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/
```

**Acceder a la UI**:
```bash
# Reenvío de puerto
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Obtener contraseña inicial
argocd admin initial-password -n argocd

# Iniciar sesión (usuario: admin)
argocd login localhost:8080
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `argocd app list` | Listar aplicaciones |
| `argocd app create` | Crear aplicación |
| `argocd app sync name` | Sincronizar aplicación |
| `argocd app get name` | Obtener detalles de la app |
| `argocd app delete name` | Eliminar aplicación |
| `argocd cluster add ctx` | Añadir cluster |
| `argocd repo add url` | Añadir repo Git |

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
# Sincronización manual
argocd app sync my-app

# Sync con prune
argocd app sync my-app --prune

# Force sync (reemplazar)
argocd app sync my-app --force

# Rollback
argocd app rollback my-app
```

## Next Steps

- [Documentación de ArgoCD](https://argo-cd.readthedocs.io/) - Documentación oficial
- [Primeros pasos con ArgoCD](https://argo-cd.readthedocs.io/en/stable/getting_started/) - Tutorial
- [Especificación de aplicación](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/) - Especificación completa
- [Mejores prácticas](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/) - Directrices
