---
title: "Kubernetes"
description: "Get started with Kubernetes container orchestration"
tags: ["containers", "devops", "cloud-native"]
---

## TL;DR

**What**: Container orchestration platform for automating deployment, scaling, and management.

**Why**: Run containers at scale with high availability, rolling updates, and self-healing.

## Quick Start

**Install kubectl**:

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# Verify
kubectl version --client
```

**Install Minikube (local cluster)**:

```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**Start a cluster**:

```bash
minikube start

# Verify
kubectl get nodes
```

**Deploy an app**:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
minikube service nginx
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `kubectl get pods` | List pods |
| `kubectl get services` | List services |
| `kubectl get deployments` | List deployments |
| `kubectl describe pod NAME` | Pod details |
| `kubectl logs POD` | View pod logs |
| `kubectl exec -it POD -- bash` | Shell into pod |
| `kubectl apply -f file.yaml` | Apply config |
| `kubectl delete -f file.yaml` | Delete resources |
| `kubectl scale deploy NAME --replicas=3` | Scale deployment |
| `kubectl rollout restart deploy NAME` | Restart deployment |

## Gotchas

### Pod stuck in Pending

```bash
# Check events
kubectl describe pod POD_NAME

# Common causes:
# - Insufficient resources → add nodes or reduce requests
# - Image pull error → check image name and registry access
```

### CrashLoopBackOff

```bash
# Check logs
kubectl logs POD_NAME --previous

# Common causes:
# - App crash → fix application code
# - Missing config → check ConfigMaps/Secrets
```

### Can't connect to cluster

```bash
# Check current context
kubectl config current-context

# List contexts
kubectl config get-contexts

# Switch context
kubectl config use-context CONTEXT_NAME
```

### Apply vs Create

```bash
kubectl create    # Create new resource (fails if exists)
kubectl apply     # Create or update (idempotent)

# Always prefer apply for production
kubectl apply -f deployment.yaml
```

## Next Steps

- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [K8s Lens IDE](https://k8slens.dev/)
- [Helm Package Manager](https://helm.sh/)
