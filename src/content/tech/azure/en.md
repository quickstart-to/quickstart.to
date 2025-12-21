---
title: "Azure"
description: "Get started with Microsoft Azure in 5 minutes"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**What**: Microsoft's cloud computing platform with 200+ services.

**Why**: Enterprise integration, hybrid cloud support, strong .NET ecosystem, AI/ML services.

## Quick Start

**Install Azure CLI**:
```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Windows
winget install Microsoft.AzureCLI

# Verify
az --version
```

**Login and configure**:
```bash
# Login (opens browser)
az login

# Set subscription
az account set --subscription "My Subscription"

# List subscriptions
az account list --output table
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `az login` | Login to Azure |
| `az account list` | List subscriptions |
| `az group list` | List resource groups |
| `az vm list` | List VMs |
| `az storage account list` | List storage accounts |
| `az webapp list` | List web apps |
| `az aks list` | List AKS clusters |

## Gotchas

### Core services

```
Compute:     Virtual Machines, App Service, Functions, AKS
Storage:     Blob Storage, File Storage, Disk Storage
Database:    SQL Database, Cosmos DB, Cache for Redis
Networking:  Virtual Network, Load Balancer, CDN
Identity:    Entra ID (Azure AD), Key Vault
```

### Resource groups

```bash
# Create resource group
az group create --name myResourceGroup --location eastus

# List resources in group
az resource list --resource-group myResourceGroup

# Delete resource group
az group delete --name myResourceGroup
```

### Virtual machines

```bash
# Create VM
az vm create \
  --resource-group myResourceGroup \
  --name myVM \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys

# Start/Stop VM
az vm start --resource-group myResourceGroup --name myVM
az vm stop --resource-group myResourceGroup --name myVM

# Delete VM
az vm delete --resource-group myResourceGroup --name myVM
```

### App Service

```bash
# Create web app
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name myUniqueAppName \
  --runtime "NODE:18-lts"

# Deploy from Git
az webapp deployment source config \
  --name myUniqueAppName \
  --resource-group myResourceGroup \
  --repo-url https://github.com/user/repo \
  --branch main
```

## Next Steps

- [Azure Documentation](https://docs.microsoft.com/azure/) - Official docs
- [Azure Free Account](https://azure.microsoft.com/free/) - Free tier
- [Azure Learn](https://docs.microsoft.com/learn/azure/) - Training paths
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/) - Best practices
