---
title: "Kubernetes"
description: "Orquesta aplicaciones en contenedores a escala - automatiza despliegue, escalado y gestión en clusters"
template: "tool"
tags: ["containers", "devops", "cloud-native"]
---

## TL;DR

**Qué**: Plataforma de orquestación de contenedores para automatizar despliegue, escalado y gestión.

**Por qué**: Ejecutar contenedores a escala con alta disponibilidad, rolling updates y auto-reparación.

## Quick Start

**Instalar kubectl**:

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# Verificar
kubectl version --client
```

**Instalar Minikube (cluster local)**:

```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**Iniciar un cluster**:

```bash
minikube start

# Verificar
kubectl get nodes
```

**Desplegar una aplicación**:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
minikube service nginx
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `kubectl get pods` | Listar pods |
| `kubectl get services` | Listar servicios |
| `kubectl get deployments` | Listar deployments |
| `kubectl describe pod NAME` | Detalles del pod |
| `kubectl logs POD` | Ver logs del pod |
| `kubectl exec -it POD -- bash` | Shell en el pod |
| `kubectl apply -f file.yaml` | Aplicar config |
| `kubectl delete -f file.yaml` | Eliminar recursos |
| `kubectl scale deploy NAME --replicas=3` | Escalar deployment |
| `kubectl rollout restart deploy NAME` | Reiniciar deployment |

## Gotchas

### Pod stuck in Pending

```bash
# Verificar eventos
kubectl describe pod POD_NAME

# Causas comunes:
# - Recursos insuficientes → añadir nodos o reducir requests
# - Error de pull de imagen → verificar nombre de imagen y acceso al registry
```

### CrashLoopBackOff

```bash
# Verificar logs
kubectl logs POD_NAME --previous

# Causas comunes:
# - Crash de la app → corregir código de la aplicación
# - Config faltante → verificar ConfigMaps/Secrets
```

### Can't connect to cluster

```bash
# Verificar contexto actual
kubectl config current-context

# Listar contextos
kubectl config get-contexts

# Cambiar contexto
kubectl config use-context CONTEXT_NAME
```

### Apply vs Create

```bash
kubectl create    # Crear nuevo recurso (falla si existe)
kubectl apply     # Crear o actualizar (idempotente)

# Siempre preferir apply para producción
kubectl apply -f deployment.yaml
```

## Next Steps

- [Documentación oficial de Kubernetes](https://kubernetes.io/docs/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [K8s Lens IDE](https://k8slens.dev/)
- [Helm Package Manager](https://helm.sh/)
