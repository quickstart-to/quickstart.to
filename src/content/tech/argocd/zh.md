---
title: "ArgoCD"
description: "5 分钟快速入门 ArgoCD GitOps"
tags: ["kubernetes", "gitops", "devops"]
---

## TL;DR

**是什么**：Kubernetes 的声明式 GitOps 持续交付工具。

**为什么用**：Git 作为唯一真实来源、自动同步、可视化仪表板、多集群支持。

## Quick Start

**在 Kubernetes 中安装**：
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 等待 Pod 就绪
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

**安装 CLI**：
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/
```

**访问 UI**：
```bash
# 端口转发
kubectl port-forward svc/argocd-server -n argocd 8080:443

# 获取初始密码
argocd admin initial-password -n argocd

# 登录（用户：admin）
argocd login localhost:8080
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `argocd app list` | 列出应用 |
| `argocd app create` | 创建应用 |
| `argocd app sync name` | 同步应用 |
| `argocd app get name` | 获取应用详情 |
| `argocd app delete name` | 删除应用 |
| `argocd cluster add ctx` | 添加集群 |
| `argocd repo add url` | 添加 Git 仓库 |

## Gotchas

### 应用清单

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

### 通过 CLI 创建应用

```bash
argocd app create my-app \
  --repo https://github.com/user/repo.git \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace my-app \
  --sync-policy automated
```

### Helm 应用

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

### Kustomize 应用

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

### 同步操作

```bash
# 手动同步
argocd app sync my-app

# 同步并清理
argocd app sync my-app --prune

# 强制同步（替换）
argocd app sync my-app --force

# 回滚
argocd app rollback my-app
```

## Next Steps

- [ArgoCD 文档](https://argo-cd.readthedocs.io/) - 官方文档
- [ArgoCD 入门](https://argo-cd.readthedocs.io/en/stable/getting_started/) - 教程
- [应用规范](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/) - 完整规范
- [最佳实践](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/) - 指南
