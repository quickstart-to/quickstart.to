---
title: "Kubernetes"
description: "Démarrez avec l'orchestration de conteneurs Kubernetes"
template: "tool"
tags: ["containers", "devops", "cloud-native"]
---

## TL;DR

**Quoi** : Plateforme d'orchestration de conteneurs pour automatiser le déploiement, la mise à l'échelle et la gestion.

**Pourquoi** : Exécuter des conteneurs à grande échelle avec haute disponibilité, mises à jour progressives et auto-réparation.

## Quick Start

**Installer kubectl** :

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# Vérifier
kubectl version --client
```

**Installer Minikube (cluster local)** :

```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**Démarrer un cluster** :

```bash
minikube start

# Vérifier
kubectl get nodes
```

**Déployer une application** :

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
minikube service nginx
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `kubectl get pods` | Lister les pods |
| `kubectl get services` | Lister les services |
| `kubectl get deployments` | Lister les déploiements |
| `kubectl describe pod NAME` | Détails du pod |
| `kubectl logs POD` | Voir les logs du pod |
| `kubectl exec -it POD -- bash` | Shell dans le pod |
| `kubectl apply -f file.yaml` | Appliquer la config |
| `kubectl delete -f file.yaml` | Supprimer les ressources |
| `kubectl scale deploy NAME --replicas=3` | Mettre à l'échelle |
| `kubectl rollout restart deploy NAME` | Redémarrer le déploiement |

## Gotchas

### Pod stuck in Pending

```bash
# Vérifier les événements
kubectl describe pod POD_NAME

# Causes courantes :
# - Ressources insuffisantes → ajouter des nœuds ou réduire les demandes
# - Erreur de pull d'image → vérifier le nom de l'image et l'accès au registry
```

### CrashLoopBackOff

```bash
# Vérifier les logs
kubectl logs POD_NAME --previous

# Causes courantes :
# - Crash de l'app → corriger le code de l'application
# - Config manquante → vérifier ConfigMaps/Secrets
```

### Can't connect to cluster

```bash
# Vérifier le contexte actuel
kubectl config current-context

# Lister les contextes
kubectl config get-contexts

# Changer de contexte
kubectl config use-context CONTEXT_NAME
```

### Apply vs Create

```bash
kubectl create    # Créer une nouvelle ressource (échoue si existe)
kubectl apply     # Créer ou mettre à jour (idempotent)

# Toujours préférer apply pour la production
kubectl apply -f deployment.yaml
```

## Next Steps

- [Documentation officielle Kubernetes](https://kubernetes.io/docs/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [K8s Lens IDE](https://k8slens.dev/)
- [Helm Package Manager](https://helm.sh/)
