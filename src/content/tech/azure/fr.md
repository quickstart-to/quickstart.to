---
title: "Azure"
description: "Démarrez avec Microsoft Azure en 5 minutes"
template: "service"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**En une ligne**: Azure est la plateforme cloud de Microsoft avec 200+ services - idéale pour l'entreprise, le cloud hybride et les workloads .NET.

**Capacités principales**:
- Intégration entreprise - Active Directory, Office 365, cloud hybride
- Compute - VMs, App Service, Functions, AKS
- Données - SQL Database, Cosmos DB, Synapse Analytics
- IA/ML - Azure OpenAI, Cognitive Services, ML Studio

## Architecture

### Service Categories

- **Compute**: Virtual Machines, App Service, Functions, AKS (Kubernetes)
- **Storage**: Blob Storage, File Storage, Disk Storage, Archive
- **Database**: SQL Database, Cosmos DB, Cache for Redis, PostgreSQL
- **Networking**: Virtual Network, Load Balancer, CDN, Front Door
- **Identity**: Entra ID (Azure AD), Key Vault, Managed Identities

### Core Concepts

- **Subscription**: Conteneur de facturation pour les ressources Azure
- **Resource Group**: Conteneur logique regroupant les ressources liées
- **Region**: Emplacement géographique pour les ressources
- **Tenant**: Instance de Entra ID d'une organisation

## Quick Start

### Create Account

1. Allez sur [azure.microsoft.com](https://azure.microsoft.com/)
2. Cliquez sur "Démarrer gratuitement" (200$ de crédit pour 30 jours)
3. Connectez-vous avec un compte Microsoft
4. Créez un groupe de ressources dans le portail Azure

### Install CLI

```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Windows
winget install Microsoft.AzureCLI

# Vérifier
az --version
```

### Login and Configure

```bash
# Connexion (ouvre le navigateur)
az login

# Définir la subscription
az account set --subscription "Ma Subscription"

# Vérifier
az account show
```

### First Commands

```bash
# Créer un groupe de ressources
az group create --name myResourceGroup --location eastus

# Lister les groupes de ressources
az group list --output table
```

## Core Services

### Compute

| Service | Cas d'usage | Modèle de tarification |
|---------|-------------|------------------------|
| Virtual Machines | VMs IaaS | Par heure |
| App Service | Hébergement web PaaS | Par plan |
| Functions | Serverless | Par exécution |
| AKS | Kubernetes managé | Control plane gratuit |

### Storage & Database

| Service | Cas d'usage | Modèle de tarification |
|---------|-------------|------------------------|
| Blob Storage | Stockage objet | Par Go + transactions |
| SQL Database | SQL Server managé | DTU ou vCore |
| Cosmos DB | NoSQL global | RU/s + stockage |
| Cache for Redis | Cache en mémoire | Par instance |

## Gotchas

### Cost Traps

- **VMs arrêtées facturent toujours les disques**: Désallouer au lieu de juste arrêter
- **Adresses IP publiques**: Les IPs statiques coûtent quand non attachées
- **Cosmos DB RU/s**: Commencer bas, monter en charge selon les besoins
- **Premium storage**: Le stockage standard est beaucoup moins cher pour le dev

### Permission Issues

- **Privilèges insuffisants**: Vérifier les attributions de rôles dans IAM
- **Resource provider non enregistré**: `az provider register --namespace Microsoft.Compute`

### Common Errors

```bash
# "The subscription is not registered to use namespace"
az provider register --namespace Microsoft.Web

# "AuthorizationFailed"
# → Vérifier l'attribution de rôle dans l'IAM du groupe de ressources

# "Resource group not found"
az group list --output table  # Vérifier le nom du groupe
```

## Next Steps

- [Documentation Azure](https://docs.microsoft.com/azure/)
- [Compte gratuit Azure](https://azure.microsoft.com/free/)
- [Microsoft Learn](https://docs.microsoft.com/learn/azure/)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
