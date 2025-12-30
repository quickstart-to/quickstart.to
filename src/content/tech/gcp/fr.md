---
title: "Google Cloud"
description: "Infrastructure cloud de Google - berceau de Kubernetes, BigQuery et AI/ML de pointe avec réseau mondial"
template: "service"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**En une ligne** : Google Cloud est la plateforme cloud de Google avec plus de 100 services - le berceau de Kubernetes et leader en données/ML.

**Capacités principales** :
- Compute - VMs, conteneurs, serverless (Cloud Run est excellent)
- Données - BigQuery pour l'analytique, Firestore pour NoSQL
- ML/IA - Vertex AI, modèles pré-entraînés
- Kubernetes - GKE, la meilleure expérience K8s managée

## Architecture

### Service Categories

- **Compute** : Compute Engine (VMs), Cloud Run (serverless), GKE (Kubernetes), Cloud Functions
- **Storage** : Cloud Storage (objets), Persistent Disk, Filestore
- **Base de données** : Cloud SQL (relationnel), Firestore (NoSQL), Bigtable, Spanner
- **Analytics** : BigQuery, Dataflow, Pub/Sub, Dataproc
- **ML/IA** : Vertex AI, Vision AI, Speech-to-Text, Translation

### Core Concepts

- **Projet** : Conteneur pour les ressources et la facturation
- **Région/Zone** : Emplacements géographiques pour les ressources
- **Service Account** : Identité pour les applications (pas les utilisateurs)
- **IAM** : Identity and Access Management - rôles et permissions

## Quick Start

### Create Account

1. Allez sur [cloud.google.com](https://cloud.google.com/)
2. Cliquez sur "Commencer gratuitement" (300$ de crédit pour 90 jours)
3. Créez un projet dans la Cloud Console
4. Activez la facturation pour le projet

### Install CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Vérifier
gcloud --version
```

### Initialize and Authenticate

```bash
# Initialiser (ouvre le navigateur pour l'auth)
gcloud init

# Définir le projet
gcloud config set project PROJECT_ID

# Vérifier
gcloud config list
```

### First Commands

```bash
# Lister les projets
gcloud projects list

# Lister les instances compute
gcloud compute instances list
```

## Core Services

### Compute

| Service | Cas d'usage | Modèle de prix |
|---------|----------|---------------|
| Compute Engine | Machines virtuelles | À la seconde |
| Cloud Run | Conteneurs serverless | Par requête + CPU/mémoire |
| GKE | Kubernetes managé | Cluster + nodes |
| Cloud Functions | Fonctions événementielles | Par invocation |

### Storage & Database

| Service | Cas d'usage | Modèle de prix |
|---------|----------|---------------|
| Cloud Storage | Stockage objet | Par Go + opérations |
| Cloud SQL | MySQL/PostgreSQL managé | Instance + stockage |
| Firestore | DB document NoSQL | Par opération + stockage |
| BigQuery | Entrepôt de données | Par requête (To scannés) |

## Gotchas

### Cost Traps

- **Requêtes BigQuery** : Scannent des colonnes entières → **Utilisez LIMIT, le partitionnement et la prévisualisation**
- **Clusters GKE inactifs** : Frais du control plane → **Utilisez Autopilot ou supprimez les clusters inutilisés**
- **Egress réseau** : Frais cross-région → **Gardez les ressources dans la même région**
- **Persistent disks** : Les disques non attachés sont facturés → **Supprimez les disques inutilisés**

### Permission Issues

- **403 Forbidden** : Vérifiez les rôles IAM → Assurez-vous que le service account a les bons rôles
- **API non activée** : Activez l'API dans la console ou `gcloud services enable SERVICE_NAME`

### Common Errors

```bash
# "The project PROJECT_ID does not exist"
gcloud projects list  # Vérifiez le nom du projet

# "PERMISSION_DENIED: Request had insufficient authentication"
gcloud auth login  # Ré-authentifiez

# "API not enabled"
gcloud services enable compute.googleapis.com
```

## Next Steps

- [Documentation Google Cloud](https://cloud.google.com/docs)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
