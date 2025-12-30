---
title: "Kubernetes"
description: "Containerisierte Anwendungen im großen Maßstab orchestrieren - automatisiertes Deployment, Skalierung und Verwaltung über Cluster"
template: "tool"
tags: ["containers", "devops", "cloud-native"]
---

## TL;DR

**Was**: Container-Orchestrierungsplattform zur Automatisierung von Deployment, Skalierung und Verwaltung.

**Warum**: Container im großen Maßstab mit Hochverfügbarkeit, Rolling Updates und Selbstheilung betreiben.

## Quick Start

**kubectl installieren**:

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# Überprüfen
kubectl version --client
```

**Minikube installieren (lokaler Cluster)**:

```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**Cluster starten**:

```bash
minikube start

# Überprüfen
kubectl get nodes
```

**Eine App deployen**:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
minikube service nginx
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `kubectl get pods` | Pods auflisten |
| `kubectl get services` | Services auflisten |
| `kubectl get deployments` | Deployments auflisten |
| `kubectl describe pod NAME` | Pod-Details |
| `kubectl logs POD` | Pod-Logs anzeigen |
| `kubectl exec -it POD -- bash` | Shell in Pod öffnen |
| `kubectl apply -f file.yaml` | Konfiguration anwenden |
| `kubectl delete -f file.yaml` | Ressourcen löschen |
| `kubectl scale deploy NAME --replicas=3` | Deployment skalieren |
| `kubectl rollout restart deploy NAME` | Deployment neu starten |

## Gotchas

### Pod stuck in Pending

```bash
# Events prüfen
kubectl describe pod POD_NAME

# Häufige Ursachen:
# - Unzureichende Ressourcen → Nodes hinzufügen oder Anforderungen reduzieren
# - Image Pull Error → Image-Namen und Registry-Zugang prüfen
```

### CrashLoopBackOff

```bash
# Logs prüfen
kubectl logs POD_NAME --previous

# Häufige Ursachen:
# - App-Crash → Anwendungscode reparieren
# - Fehlende Konfiguration → ConfigMaps/Secrets prüfen
```

### Can't connect to cluster

```bash
# Aktuellen Kontext prüfen
kubectl config current-context

# Kontexte auflisten
kubectl config get-contexts

# Kontext wechseln
kubectl config use-context CONTEXT_NAME
```

### Apply vs Create

```bash
kubectl create    # Neue Ressource erstellen (schlägt fehl wenn vorhanden)
kubectl apply     # Erstellen oder aktualisieren (idempotent)

# Für Produktion immer apply bevorzugen
kubectl apply -f deployment.yaml
```

## Next Steps

- [Kubernetes Offizielle Docs](https://kubernetes.io/docs/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [K8s Lens IDE](https://k8slens.dev/)
- [Helm Package Manager](https://helm.sh/)
