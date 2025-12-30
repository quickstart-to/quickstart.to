---
title: "Azure"
description: "Microsofts Enterprise-Cloud - nahtlose Integration mit Office 365, Active Directory und Hybrid-Infrastruktur"
template: "service"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**Eine Zeile**: Azure ist Microsofts Cloud-Plattform mit 200+ Services - am besten für Unternehmen, Hybrid Cloud und .NET-Workloads.

**Kernfähigkeiten**:
- Enterprise-Integration - Active Directory, Office 365, Hybrid Cloud
- Compute - VMs, App Service, Functions, AKS
- Daten - SQL Database, Cosmos DB, Synapse Analytics
- KI/ML - Azure OpenAI, Cognitive Services, ML Studio

## Architecture

### Service Categories

- **Compute**: Virtual Machines, App Service, Functions, AKS (Kubernetes)
- **Storage**: Blob Storage, File Storage, Disk Storage, Archive
- **Database**: SQL Database, Cosmos DB, Cache for Redis, PostgreSQL
- **Networking**: Virtual Network, Load Balancer, CDN, Front Door
- **Identity**: Entra ID (Azure AD), Key Vault, Managed Identities

### Core Concepts

- **Subscription**: Abrechnungscontainer für Azure-Ressourcen
- **Resource Group**: Logischer Container zur Gruppierung verwandter Ressourcen
- **Region**: Geografischer Standort für Ressourcen
- **Tenant**: Instanz von Entra ID einer Organisation

## Quick Start

### Create Account

1. Gehen Sie zu [azure.microsoft.com](https://azure.microsoft.com/)
2. Klicken Sie auf "Kostenlos starten" (200$ Guthaben für 30 Tage)
3. Mit Microsoft-Konto anmelden
4. Eine Ressourcengruppe im Azure Portal erstellen

### Install CLI

```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Windows
winget install Microsoft.AzureCLI

# Überprüfen
az --version
```

### Login and Configure

```bash
# Anmelden (öffnet Browser)
az login

# Subscription festlegen
az account set --subscription "Meine Subscription"

# Überprüfen
az account show
```

### First Commands

```bash
# Ressourcengruppe erstellen
az group create --name myResourceGroup --location eastus

# Ressourcengruppen auflisten
az group list --output table
```

## Core Services

### Compute

| Service | Anwendungsfall | Preismodell |
|---------|----------------|-------------|
| Virtual Machines | IaaS VMs | Pro Stunde |
| App Service | PaaS Web-Hosting | Pro Plan |
| Functions | Serverless | Pro Ausführung |
| AKS | Managed Kubernetes | Control Plane kostenlos |

### Storage & Database

| Service | Anwendungsfall | Preismodell |
|---------|----------------|-------------|
| Blob Storage | Objektspeicher | Pro GB + Transaktionen |
| SQL Database | Managed SQL Server | DTU oder vCore |
| Cosmos DB | Globales NoSQL | RU/s + Speicher |
| Cache for Redis | In-Memory-Cache | Pro Instanz |

## Gotchas

### Cost Traps

- **Gestoppte VMs berechnen weiterhin Disks**: Deallocate statt nur stoppen
- **Öffentliche IP-Adressen**: Statische IPs kosten, wenn nicht angehängt
- **Cosmos DB RU/s**: Niedrig starten, bei Bedarf skalieren
- **Premium Storage**: Regulärer Storage ist viel günstiger für Entwicklung

### Permission Issues

- **Unzureichende Berechtigungen**: Rollenzuweisungen in IAM prüfen
- **Resource Provider nicht registriert**: `az provider register --namespace Microsoft.Compute`

### Common Errors

```bash
# "The subscription is not registered to use namespace"
az provider register --namespace Microsoft.Web

# "AuthorizationFailed"
# → Rollenzuweisung in Ressourcengruppen-IAM prüfen

# "Resource group not found"
az group list --output table  # Gruppennamen überprüfen
```

## Next Steps

- [Azure-Dokumentation](https://docs.microsoft.com/azure/)
- [Azure-Gratiskonto](https://azure.microsoft.com/free/)
- [Microsoft Learn](https://docs.microsoft.com/learn/azure/)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
