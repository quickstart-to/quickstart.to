---
title: "Kubernetes"
description: "快速入门 Kubernetes 容器编排"
tags: ["containers", "devops", "cloud-native"]
---

## TL;DR

**是什么**：容器编排平台，自动化部署、扩展和管理容器。

**为什么**：大规模运行容器，具备高可用、滚动更新和自愈能力。

## Quick Start

**安装 kubectl**：

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# 验证
kubectl version --client
```

**安装 Minikube（本地集群）**：

```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**启动集群**：

```bash
minikube start

# 验证
kubectl get nodes
```

**部署应用**：

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
minikube service nginx
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `kubectl get pods` | 列出 Pod |
| `kubectl get services` | 列出服务 |
| `kubectl get deployments` | 列出部署 |
| `kubectl describe pod NAME` | Pod 详情 |
| `kubectl logs POD` | 查看 Pod 日志 |
| `kubectl exec -it POD -- bash` | 进入 Pod Shell |
| `kubectl apply -f file.yaml` | 应用配置 |
| `kubectl delete -f file.yaml` | 删除资源 |
| `kubectl scale deploy NAME --replicas=3` | 扩展部署 |
| `kubectl rollout restart deploy NAME` | 重启部署 |

## Gotchas

### Pod 卡在 Pending 状态

```bash
# 检查事件
kubectl describe pod POD_NAME

# 常见原因：
# - 资源不足 → 添加节点或减少资源请求
# - 镜像拉取错误 → 检查镜像名称和仓库访问权限
```

### CrashLoopBackOff

```bash
# 检查日志
kubectl logs POD_NAME --previous

# 常见原因：
# - 应用崩溃 → 修复应用代码
# - 缺少配置 → 检查 ConfigMaps/Secrets
```

### 无法连接集群

```bash
# 检查当前上下文
kubectl config current-context

# 列出所有上下文
kubectl config get-contexts

# 切换上下文
kubectl config use-context CONTEXT_NAME
```

### Apply 与 Create 的区别

```bash
kubectl create    # 创建新资源（已存在则失败）
kubectl apply     # 创建或更新（幂等操作）

# 生产环境始终使用 apply
kubectl apply -f deployment.yaml
```

## Next Steps

- [Kubernetes 官方文档](https://kubernetes.io/zh-cn/docs/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [K8s Lens IDE](https://k8slens.dev/)
- [Helm 包管理器](https://helm.sh/)
