---
title: "Azure"
description: "Get started with Microsoft Azure in 5 minutes"
template: "service"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**One-liner**: Azure is Microsoft's cloud platform with 200+ services - best for enterprise, hybrid cloud, and .NET workloads.

**Core Capabilities**:
- Enterprise integration - Active Directory, Office 365, hybrid cloud
- Compute - VMs, App Service, Functions, AKS
- Data - SQL Database, Cosmos DB, Synapse Analytics
- AI/ML - Azure OpenAI, Cognitive Services, ML Studio

## Architecture

### Service Categories

- **Compute**: Virtual Machines, App Service, Functions, AKS (Kubernetes)
- **Storage**: Blob Storage, File Storage, Disk Storage, Archive
- **Database**: SQL Database, Cosmos DB, Cache for Redis, PostgreSQL
- **Networking**: Virtual Network, Load Balancer, CDN, Front Door
- **Identity**: Entra ID (Azure AD), Key Vault, Managed Identities

### Core Concepts

- **Subscription**: Billing container for Azure resources
- **Resource Group**: Logical container grouping related resources
- **Region**: Geographic location for resources
- **Tenant**: Organization's instance of Entra ID

## Quick Start

### Create Account

1. Go to [azure.microsoft.com](https://azure.microsoft.com/)
2. Click "Start free" ($200 credit for 30 days)
3. Sign in with Microsoft account
4. Create a resource group in Azure Portal

### Install CLI

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

### Login and Configure

```bash
# Login (opens browser)
az login

# Set subscription
az account set --subscription "My Subscription"

# Verify
az account show
```

### First Commands

```bash
# Create resource group
az group create --name myResourceGroup --location eastus

# List resource groups
az group list --output table
```

## Core Services

### Compute

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| Virtual Machines | IaaS VMs | Per hour |
| App Service | PaaS web hosting | Per plan |
| Functions | Serverless | Per execution |
| AKS | Managed Kubernetes | Control plane free |

### Storage & Database

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| Blob Storage | Object storage | Per GB + transactions |
| SQL Database | Managed SQL Server | DTU or vCore |
| Cosmos DB | Global NoSQL | RU/s + storage |
| Cache for Redis | In-memory cache | Per instance |

## Gotchas

### Cost Traps

- **Stopped VMs still charge for disks**: Deallocate instead of just stopping
- **Public IP addresses**: Static IPs charge when not attached
- **Cosmos DB RU/s**: Start low, scale as needed
- **Premium storage**: Regular storage is much cheaper for dev

### Permission Issues

- **Insufficient privileges**: Check role assignments in IAM
- **Resource provider not registered**: `az provider register --namespace Microsoft.Compute`

### Common Errors

```bash
# "The subscription is not registered to use namespace"
az provider register --namespace Microsoft.Web

# "AuthorizationFailed"
# → Check role assignment in resource group IAM

# "Resource group not found"
az group list --output table  # Verify group name
```

## Next Steps

- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Azure Free Account](https://azure.microsoft.com/free/)
- [Microsoft Learn](https://docs.microsoft.com/learn/azure/)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
